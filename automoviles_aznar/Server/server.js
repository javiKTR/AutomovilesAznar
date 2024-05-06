const express = require('express');
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"automovilesaznar",
});

app.post("/createusr",(req,res) =>{
    const nombre = req.body.nombre;
    const apellidos = req.body.apellidos;
    const email = req.body.email;
    const password = req.body.password;

    db.query("INSERT INTO usuarios(nombre,apellidos,email,password) VALUES(?,?,?,?)", [nombre,apellidos,email,password],
    (err, result)=>{
        if(err){
            console.log("ERROR: " + err);
        }else{
            res.send("Usuario registrado")
        }
    });
    db.commit()
    /*db.query("INSERT INTO usrp(password) VALUES(?)",[password],
    (err, result)=>{
        if(err){
            console.log("ERROR: " + err);
        }else{
            res.send("Usuario registrado")
        }
    });
    db.commit()*/
});

app.get("/getusr",(req,res) =>{

    db.query("SELECT id,name,email FROM usuarios",
    (err, result)=>{
        if(err){
            console.log("ERROR: " + err);
        }else{
            res.send(result)
        }
    });
    db.commit()
});

app.get("/getecars",(req,res) =>{
    db.query("SELECT * FROM coche",
    (err, result)=>{
        if(err){
            console.log("ERROR: " + err);
        }else{
            res.send(result)
        }
    });
});

app.get("/getecarsa",(req,res) =>{
    db.query("SELECT * FROM alquiler",
    (err, result)=>{
        if(err){
            console.log("ERROR: " + err);
        }else{
            res.send(result)
        }
    });
});

app.get("/getecarsc",(req,res) =>{
    db.query("SELECT * FROM compra",
    (err, result)=>{
        if(err){
            console.log("ERROR: " + err);
        }else{
            res.send(result)
        }
    });
});

app.post("/createcar",(req,res) =>{
    const marca = req.body.marca;
    const modelo = req.body.marca;
    const descripcion = req.body.descripcion;

    db.query("INSERT INTO usuarios(marca,modelo,descripcion) VALUES(?,?,?)", [marca,modelo,descripcion],
    (err, result)=>{
        if(err){
            console.log("ERROR " + err);
        }else{
            res.send("Usuario registrado")
        }
    });
    db.commit()
});

app.listen(3001, 'localhost')
