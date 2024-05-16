import { useState } from "react"
import Axios from "axios"
import { Link } from '../link.jsx'
import { Usuario } from '../clases/usuario.js'


export default function Singin(){
    const usr = new Usuario();

    const addUser = () => {
        Axios.post("http://localhost:3001/createusr", {
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
                <label>Nombre: <input 
                onChange={(event) => {
                    usr.setNombre(event.target.value);
                }}
                type="text"/></label><br/>
                <label>Apellido: <input 
                onChange={(event) => {
                    usr.setApellidos(event.target.value);
                }}
                type="text"/></label><br/>
                <label>Email: <input 
                onChange={(event) => {
                    usr.setEmail(event.target.value);
                }}
                type="email"/></label><br/>
                <label>Password: <input 
                onChange={(event) => {
                    usr.setPassword(event.target.value);
                }}
                type="password"/></label>
                <Link to = "/"><button onClick={addUser}>Singin</button></Link>
            </div>
        </>
    )
}