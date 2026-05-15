const express = require('express'); // requiere el modulo express
const path=require("path")            // requiero path 
const app = express();
app.use(express.static('./'));


app.listen(3050, ()=>{console.log('Servidor corriendo en http://localhost:3050/');});

//app.get('/', (req,res)=>{res.sendFile(__dirname + '/home.html');});
app.get("/"               ,(req,res)=> {res.sendFile(path.resolve( "./home.html"       ))}); 

app.get("/login"      ,(req,res)=>{ res.sendFile(path.resolve("./login.html"    ))});
app.get("/register"      ,(req,res)=>{ res.sendFile(path.resolve("./register.html"    ))});
app.get("/home"      ,(req,res)=>{ res.sendFile(path.resolve("./home.html"    ))});