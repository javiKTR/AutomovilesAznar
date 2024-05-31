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

app.post("/getIdUser", (req, res) => {
    const { email } = req.body;
    db.query("SELECT id, nombre, apellidos, email, rango FROM usuario WHERE email = ?",[email], 
        (err, result) => {
            if (err) {
                console.error("ERROR: " + err);
                res.status(500).send(err);
            } else {
                res.send(result);
            }
        });
});
app.post("/getUser", (req, res) => {
    const { id } = req.body;
    db.query("SELECT id, nombre, apellidos, email, rango FROM usuario WHERE id = ?",[id], 
        (err, result) => {
            if (err) {
                console.error("ERROR: " + err);
                res.status(500).send(err);
            } else {
                res.send(result);
            }
        });
});
app.post("/getRangoUser", (req, res) => {
    const { email } = req.body;
    db.query("SELECT rango FROM usuario WHERE email = ?",[email], 
        (err, result) => {
            if (err) {
                console.error("ERROR: " + err);
                res.status(500).send(err);
            } else {
                res.send(result);
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
app.post("/getcoche", (req, res) => {
    const modelo = req.body.modelo;
    db.query("SELECT * FROM coche WHERE modelo = ?", 
        [modelo], 
        (err, result) => {
            if (err) {
                console.error("ERROR " + err);
                res.status(500).send(err);
            } else {
                res.send(result);
            }
        });
});

app.post("/createcar", (req, res) => {
    const { marca, modelo, descripcion, kilometros, potencia, transmision,combustible, carroceria } = req.body;
    db.query("INSERT INTO coche(marca, modelo, descripcion, kilometros, potencia, transmision, combustible, carroceria ) VALUES(?, ?, ?, ?, ?, ?, ?, ?)", 
        [marca, modelo, descripcion, kilometros, potencia, transmision,combustible, carroceria ], 
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

// coche
app.put("/updatecar/:id", (req, res) => {
    const { id } = req.params;
    const { marca, modelo, descripcion, kilometros, potencia, transmision, combustible, carroceria } = req.body;
    db.query(
        "UPDATE coche SET marca = ?, modelo = ?, descripcion = ?, kilometros = ?, potencia = ?, transmision = ?, combustible = ?, carroceria = ? WHERE id = ?",
        [marca, modelo, descripcion, kilometros, potencia, transmision, combustible, carroceria, id],
        (err, result) => {
            if (err) {
                console.error("ERROR: " + err);
                res.status(500).send(err);
            } else {
                res.send("Coche actualizado");
            }
        }
    );
});
app.put("/alquilerReservado", (req, res) => {
    const {  id, idUser } = req.body;
    db.query(
        "UPDATE alquiler SET idUsuario = ? WHERE idCoche = ?",
        [idUser, id],
        (err, result) => {
            if (err) {
                console.error("ERROR: " + err);
                res.status(500).send(err);
            } else {
                res.send("Coche actualizado");
            }
        }
    );
});
app.put("/compraReservado", (req, res) => {
    const {  id, idUser } = req.body;
    db.query(
        "UPDATE compra SET idUsuario = ? WHERE idCoche = ?",
        [idUser, id],
        (err, result) => {
            if (err) {
                console.error("ERROR: " + err);
                res.status(500).send(err);
            } else {
                res.send("Coche actualizado");
            }
        }
    );
});

app.delete("/deletecar/:id", (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM coche WHERE id = ?", [id], (err, result) => {
        if (err) {
            console.error("ERROR: " + err);
            res.status(500).send(err);
        } else {
            res.send("Coche eliminado");
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

app.post("/getrental", (req, res) => {
    const { modelo } = req.body;
    db.query("SELECT * FROM alquiler WHERE modelo = ?", [modelo],
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
// Citas
app.post("/addappointment", (req, res) => {
    const { idUsuario, idEmpleado, fecha, hora } = req.body;
    db.query("INSERT INTO cita(idUsuario, idEmpleado, fecha, hora) VALUES(?, ?, ?, ?)", 
        [idUsuario, idEmpleado, fecha, hora],
        (err, result) => {
            if (err) {
                console.error("ERROR: " + err);
                res.status(500).send(err);
            } else {
                res.send({ id: result.insertId, fecha, hora });
            }
        });
});
app.post("/addappointmentCoche", (req, res) => {
    const { idUsuario, idEmpleado,idCoche, fecha, hora } = req.body;
    db.query("INSERT INTO cita(idUsuario, idEmpleado, idCoche, fecha, hora) VALUES(?, ?, ?, ?, ?)", 
        [idUsuario, idEmpleado,idCoche, fecha, hora],
        (err, result) => {
            if (err) {
                console.error("ERROR: " + err);
                res.status(500).send(err);
            } else {
                res.send({ id: result.insertId, fecha, hora });
            }
        });
});

app.get("/getappointments", (req, res) => {
    db.query("SELECT * FROM cita", 
        (err, result) => {
            if (err) {
                console.error("ERROR: " + err);
                res.status(500).send(err);
            } else {
                res.send(result);
            }
        });
});
app.post("/getappointmentUsr", (req, res) => {
    const usr = req.body.id;
    db.query("SELECT * FROM cita WHERE idUsuario = ?", 
        [usr],
        (err, result) => {
            if (err) {
                console.error("ERROR: " + err);
                res.status(500).send(err);
            } else {
                res.send(result);
            }
        });
});
app.post("/getappointmentEmp", (req, res) => {
    const usr = req.body.id;
    db.query("SELECT * FROM cita WHERE idEmpleado = ?", 
        [usr],
        (err, result) => {
            if (err) {
                console.error("ERROR: " + err);
                res.status(500).send(err);
            } else {
                res.send(result);
            }
        });
});

app.put("/updateappointment/:id", (req, res) => {
    const { id } = req.params;
    const { fecha, hora } = req.body;
    db.query("UPDATE cita SET fecha = ?, hora = ? WHERE id = ?", 
        [fecha, hora, id],
        (err, result) => {
            if (err) {
                console.error("ERROR: " + err);
                res.status(500).send(err);
            } else {
                res.send("Cita actualizada");
            }
        });
});

app.delete("/deleteappointment/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM cita WHERE id = ?", [id], (err, result) => {
        if (err) {
            console.error("ERROR: " + err);
            res.status(500).send(err);
        } else {
            res.send("Cita eliminada");
        }
    });
});
app.listen(3001, 'localhost', () => {
    console.log('Server is running on port 3001');
});
