const express = require('express');
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const jwt = require('jsonwebtoken');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "automovilesaznar",
});

// Rutas de usuario
app.post("/adduser", (req, res) => {
    const { nombre, apellidos, email, password } = req.body;
    db.query("INSERT INTO usuario(nombre, apellidos, email, password) VALUES(?, ?, ?, ?)", 
        [nombre, apellidos, email, password], 
        (err, result) => {
            if (err) {
                console.error("ERROR: " + err);
                res.status(500).send(err);
            } else {
                res.send("Usuario registrado");
            }
        });
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    console.log("Login attempt for:", email); // Log para verificar que se recibe el correo
    db.query("SELECT * FROM usuario WHERE email = ? AND password = ? ", [email, password], 
        (err, result) => {
            if (err) {
                console.error("ERROR: " + err);
                res.status(500).send(err);
            } else {
                if (result.length > 0) {
                    const token = jwt.sign({email}, "Stack", {
                        expiresIn: '365d'
                    });
                    console.log("Login successful:", result);
                    res.send({token});
                } else {    
                    console.log("Login failed for user:", email);
                    res.status(401).send("Credenciales incorrectas");
                }
            }
        });
});
app.get("/getusers", (req, res) => {
    db.query("SELECT * FROM usuario", 
        (err, result) => {
            if (err) {
                console.error("ERROR: " + err);
                res.status(500).send(err);
            } else {
                res.send(result);
            }
        });
});

app.delete("/deleteuser/:id", (req, res) => {
    const userId = req.params.id;
    db.query("DELETE FROM usuario WHERE id = ?", [userId], (err, result) => {
        if (err) {
            console.error("ERROR: " + err);
            res.status(500).send(err);
        } else {
            res.send("Usuario eliminado");
        }
    });
});


// Rutas de coches
app.post("/createcar", (req, res) => {
    const { marca, modelo, descripcion } = req.body;
    db.query("INSERT INTO coche(marca, modelo, descripcion) VALUES(?, ?, ?)", 
        [marca, modelo, descripcion], 
        (err, result) => {
            if (err) {
                console.error("ERROR " + err);
                res.status(500).send(err);
            } else {
                res.send("Coche registrado");
            }
        });
});

app.get("/getecars", (req, res) => {
    db.query("SELECT * FROM coche", 
        (err, result) => {
            if (err) {
                console.error("ERROR: " + err);
                res.status(500).send(err);
            } else {
                res.send(result);
            }
        });
});


// Rutas para alquileres
app.post("/addrental", (req, res) => {
    const { idCoche, precio, precioSeguro, idUsuario } = req.body;
    db.query("INSERT INTO alquiler(idCoche, precio, precioSeguro, idUsuario) VALUES(?, ?, ?, ?)", 
        [idCoche, precio, precioSeguro, idUsuario],
        (err, result) => {
            if (err) {
                console.error("ERROR: " + err);
                res.status(500).send(err);
            } else {
                res.send("Alquiler registrado");
            }
        });
});

app.get("/getrentals", (req, res) => {
    db.query("SELECT * FROM alquiler", 
        (err, result) => {
            if (err) {
                console.error("ERROR: " + err);
                res.status(500).send(err);
            } else {
                res.send(result);
            }
        });
});

app.delete("/deleterental/:idCoche", (req, res) => {
    const idCoche = req.params.idCoche;
    db.query("DELETE FROM alquiler WHERE idCoche = ?", [idCoche], (err, result) => {
        if (err) {
            console.error("ERROR: " + err);
            res.status(500).send(err);
        } else {
            res.send("Alquiler eliminado");
        }
    });
});
// Rutas para compras
app.post("/addpurchase", (req, res) => {
    const { idCoche, precio, idUsuario } = req.body;
    db.query("INSERT INTO compra(idCoche, precio, idUsuario) VALUES(?, ?, ?)", 
        [idCoche, precio, idUsuario],
        (err, result) => {
            if (err) {
                console.error("ERROR: " + err);
                res.status(500).send(err);
            } else {
                res.send("Compra registrada");
            }
        });
});

app.get("/getpurchases", (req, res) => {
    db.query("SELECT * FROM compra", 
        (err, result) => {
            if (err) {
                console.error("ERROR: " + err);
                res.status(500).send(err);
            } else {
                res.send(result);
            }
        });
});

app.delete("/deletepurchase/:idCoche", (req, res) => {
    const idCoche = req.params.idCoche;
    db.query("DELETE FROM compra WHERE idCoche = ?", [idCoche], (err, result) => {
        if (err) {
            console.error("ERROR: " + err);
            res.status(500).send(err);
        } else {
            res.send("Compra eliminada");
        }
    });
});

app.listen(3001, 'localhost', () => {
    console.log('Server is running on port 3001');
});
