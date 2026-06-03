Ejercicio: Reconocer y contar pushups con heurísticas
Equipo: 03

DESCRIPCIÓN:
Programa en Python que usa la webcam para detectar posturas del cuerpo
en tiempo real y contar repeticiones de pushups automáticamente.

TECNOLOGÍAS USADAS:
- OpenCV: captura y procesamiento de video en tiempo real
- MediaPipe: detección de landmarks del cuerpo (pose estimation)
- NumPy: cálculo de ángulos entre articulaciones

HEURÍSTICA IMPLEMENTADA:
Se calcula el ángulo del codo izquierdo (hombro - codo - muñeca).
- Ángulo > 160° → postura ARRIBA (brazos extendidos)
- Ángulo < 90°  → postura ABAJO (pecho al suelo)
- Transición abajo → arriba cuenta como 1 repetición

CÓMO EJECUTAR:
1. pip install -r requirements.txt
2. python pushup_counter.py
3. Ponerse de perfil ante la cámara y hacer flexiones
4. Pulsar Q para salir