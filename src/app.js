const express=require('express');
const app=express();
const path=require('path');
const indexRouter=require('./routes/room');


//app seting
app.set('port',process.env.PORT||3000);
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
//app routes
app.use(indexRouter);


//static files
app.use(express.static(path.join(__dirname,'public')));
//server listening
const server=app.listen(app.get('port'),()=>{
   // console.log(path.join(__dirname,'views'));

    console.log("Server on port ",app.get('port'));
});
const io=require('socket.io')(server);
const {ExpressPeerServer}=require('peer');
const peerServer=ExpressPeerServer(server,{
    debug:true
});

app.use('/peerjs',peerServer);
io.on('connection', socket => {
    socket.on('join-room', (roomId,userId) => {
        socket.join(roomId);
        socket.to(roomId).broadcast.emit('user-connected',userId);
    });
});