
/* El método MediaDevices.getUserMedia() solicita al usuario 
permisos para usar un dispositivo de entrada de vídeo y/o 
uno de audio como una cámara o compartir la pantalla y/o micrófono.
Si el usuario proporciona los permisos, entonces le retornará un Promise
que es resuelto por el resultado del objeto MediaStream. 
Si el usuario niega el permiso, o si el recurso multimedia no es válido,
 entonces el promise es rechazado con PermissionDeniedError o 
 NotFoundError respectivamente. Nótese que es posible que el 
 promise retornado no sea ni resuelto ni rechazado, 
ya que no se requiere que el usuario tome una decisión.  */
const socket=io('/');
const videoGrid=document.getElementById('video-grid');
//console.log(videoGrid);
const myVideo=document.createElement('video');
myVideo.muted=true;

let myVideoStream;
navigator.mediaDevices.getUserMedia({
    video:true,
    audio:true
}).then(stream =>{
    myVideoStream=stream;
    addVideoStream(myVideo,stream);
});
socket.emit('join-room ',ROOM_iD);
socket.on('user-connected',()=>{
    connectToNewUser();
});
const connectToNewUser=()=>{
    console.log('new user');
}
const addVideoStream=(video,stream)=>{
    video.srcObject = stream
    video.addEventListener('loadedmetadata', () => {
        video.play()
    })
    videoGrid.append(video)
    
}