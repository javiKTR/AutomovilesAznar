import { useState } from "react"
import Axios from "axios"
import { Link } from '../link.jsx'
import { Usuario } from '../clases/usuario.js'
import { Header } from "../componenets/header.jsx"


export default function Singin(){
    const usr = new Usuario();
    
    
    const addUser = () => {
        Axios.post("http://localhost:3001/adduser", {
            nombre: usr.getNombre(),
            apellidos: usr.getApellidos(),
            email: usr.getEmail(),
            password: usr.getPassword() 
        }).then(() => {
            console.log("Empleado registrado");
        })
    }

    return(
        <>
            <div className="datos">
                <input  className="controls" placeholder="Nombre"
                onChange={(event) => {
                    usr.setNombre(event.target.value);
                }}
                type="text"/><br/>
                <input  className="controls" placeholder="Apellido"
                onChange={(event) => {
                    usr.setApellidos(event.target.value);
                }}
                type="text"/><br/>
                <input  className="controls" placeholder="Email"
                onChange={(event) => {
                    usr.setEmail(event.target.value);
                }}
                type="email"/><br/>
                <input  className="controls" placeholder="Password"
                onChange={(event) => {
                    usr.setPassword(event.target.value);
                }}
                type="password"/>
                <Link to = "/"><button onClick={addUser}>Singin</button></Link>
                
                <div>
                    <p>Si ya tienes cuenta</p>
                    <Link to = "/Login"><button>Login</button></Link>
                <Link to = "/"><button>Home</button></Link>
                </div>
            </div>
        </>
    )
}