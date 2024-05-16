import { useState } from "react"
import Axios from "axios"
import { Link } from '../link.jsx'
import { Usuario } from '../clases/usuario.js'


export default function Login(){
    const usr = new Usuario();
    const [usuarios, setUsuarios] = useState([]);
    

    const getUser = () => {
        Axios.get("http://localhost:3001/getusr").then((response) => {
            setUsuarios(response.data);
        })
    }

    const isUser = () => {
        getUser();

    }

    return(
        <>
            <div className="datos">
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