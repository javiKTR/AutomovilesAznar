import { useState } from "react"
import Axios from "axios"
import { Link } from '../link.jsx'


export default function Singin(){
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const addUser = () => {
        Axios.post("http://localhost:3001/createusr", {
            nombre:nombre,
            apellidos:apellido,
            email:email,
            password:password
        }).then(() => {
            console.log("Empleado registrado");
        })
    }

    return(
        <>
            <div className="datos">
                <label>Nombre: <input 
                onChange={(event) => {
                    setNombre(event.target.value)
                }}
                type="text"/></label><br/>
                <label>Apellido: <input 
                onChange={(event) => {
                    setApellido(event.target.value)
                }}
                type="text"/></label><br/>
                <label>Email: <input 
                onChange={(event) => {
                    setEmail(event.target.value)
                }}
                type="email"/></label><br/>
                <label>Password: <input 
                onChange={(event) => {
                    setPassword(event.target.value)
                }}
                type="password"/></label>
                <Link to = "/"><button onClick={addUser}>Singin</button></Link>
            </div>
        </>
    )
}