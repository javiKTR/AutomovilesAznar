import { useState } from "react"
import Axios from "axios"
import { Link } from '../link.jsx'
import { Usuario } from '../clases/usuario.js'
import { Header } from "../componenets/header.jsx"


export default function Login(){
    const usr = new Usuario();
    const [usuarios, setUsuarios] = useState([]);
    
    

    const getUser = () => {
        Axios.post("http://localhost:3001/login",{
        email: usr.getEmail(),
        password: usr.getPassword() 
        }).then((response) => {
            if(response.data.token){
                localStorage.setItem('login', response.data.token)
            }
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
                <Link to = "/"><button onClick={getUser}>Login</button></Link>
            </div>
        </>
    )
}