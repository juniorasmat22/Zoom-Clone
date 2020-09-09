const express=require('express');
const app=express();
const path=require('path');
//app seting
app.set('port',process.env.PORT||3000);
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
//app routes
app.get('/',(req,res)=>{
    res.render('room');
});

//server listening
app.listen(app.get('port'),()=>{
   // console.log(path.join(__dirname,'views'));
    console.log("Server on port ",app.get('port'));
});