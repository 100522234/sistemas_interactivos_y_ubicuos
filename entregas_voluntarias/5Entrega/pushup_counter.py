import cv2
import mediapipe as mp
from mediapipe.tasks.python.vision import PoseLandmarker
from mediapipe.tasks.python import BaseOptions
from mediapipe.tasks.python.vision.pose_landmarker import PoseLandmarkerOptions
import numpy as np
import urllib.request
import os

# Descargar modelo si no existe
MODEL_PATH = "pose_landmarker_lite.task"
if not os.path.exists(MODEL_PATH):
    print("Descargando modelo...")
    urllib.request.urlretrieve(
        "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/latest/pose_landmarker_lite.task",
        MODEL_PATH
    )
    print("Modelo descargado.")

def calcular_angulo(a, b, c):
    a, b, c = np.array(a), np.array(b), np.array(c)
    radians = np.arctan2(c[1]-b[1], c[0]-b[0]) - np.arctan2(a[1]-b[1], a[0]-b[0])
    angulo = np.abs(radians * 180.0 / np.pi)
    if angulo > 180.0:
        angulo = 360 - angulo
    return angulo

contador = 0
postura = None

options = PoseLandmarkerOptions(
    base_options=BaseOptions(model_asset_path=MODEL_PATH),
    running_mode=mp.tasks.vision.RunningMode.IMAGE
)

cap = cv2.VideoCapture(0)

with PoseLandmarker.create_from_options(options) as landmarker:
    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        mp_image = mp.Image(image_format=mp.ImageFormat.SRGB, data=rgb)
        result = landmarker.detect(mp_image)

        try:
            lm = result.pose_landmarks[0]
            # 11=hombro izq, 13=codo izq, 15=muñeca izq
            hombro = [lm[11].x, lm[11].y]
            codo   = [lm[13].x, lm[13].y]
            muneca = [lm[15].x, lm[15].y]

            angulo = calcular_angulo(hombro, codo, muneca)

            if angulo > 160:
                postura_actual = "arriba"
            elif angulo < 90:
                postura_actual = "abajo"
            else:
                postura_actual = postura

            if postura == "abajo" and postura_actual == "arriba":
                contador += 1

            postura = postura_actual

            h, w, _ = frame.shape
            cx, cy = int(lm[13].x * w), int(lm[13].y * h)
            cv2.putText(frame, f'Angulo: {int(angulo)}', (cx, cy),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 255, 255), 2)
        except:
            pass

        cv2.rectangle(frame, (0, 0), (300, 80), (245, 117, 16), -1)
        cv2.putText(frame, 'REPS', (15, 20), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 0, 0), 1)
        cv2.putText(frame, str(contador), (15, 70), cv2.FONT_HERSHEY_SIMPLEX, 2, (255, 255, 255), 2)
        cv2.putText(frame, 'POSTURA', (130, 20), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 0, 0), 1)
        cv2.putText(frame, postura if postura else '-', (130, 70), cv2.FONT_HERSHEY_SIMPLEX, 1.2, (255, 255, 255), 2)

        cv2.imshow('Pushup Counter', frame)
        if cv2.waitKey(10) & 0xFF == ord('q'):
            break

cap.release()
cv2.destroyAllWindows()