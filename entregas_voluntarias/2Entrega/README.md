En esta carpeta se encuentra el .js .html y el .css necesarios para la ejecución del ejercicio guiado 2. 

El programa principal se basan en 3 eventos. El primero es el que registra cuando el usuario selecciona el boton para dar "permiso" a que
el programa empiece a escuchar la voz y registrar movimientos del giroscopio. Los otros dos eventos se inciaran cuando demos permiso, uno se encarga de recibir la informacion a partir de la voz para reproducir, pausar, subir y bajar el volumen del video y el otro evento se encargara de registrar los movimientos que hagamos nosotros inclinando el movil para avanzar o retroceder en el video. 

Para este ejercicio hemos usado las 2 APIs SpeechRecognition y  SpeechSynthesis  y Motion Gestures tal y como se indica en el enunciado. 

Para activar el microfono, al ver como esta congifurando la API vemos que con reconocimiento.start() funciona de forma directa.
Para activar el giroscopio, cuando nuestra API detecte el movimiento tendremos que llamar a la funcion para hacer el calculo matematico del giroscopio y que funcione de forma correcta. 
Todos estos eventos funcionan despues de darle al boton de inciar programa. 

Como decisiones de diseño queremos dejar claro que hemos tenido problemas con que el Android de forma nativa nos pausa el video sin nosotros quererlo, por ello tuvimos que implementar la variable de IntencionDePausa, para que se pause solo cuando nosotros digamos y si el video se pausa debido a que lo pause el Android y IntencionDePausa==False el video se reanudara ya que nostros no lo hemos pausado pero si el movil. 
