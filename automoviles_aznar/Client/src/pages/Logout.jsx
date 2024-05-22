import { useState } from "react"
import Axios from "axios"
import { Link } from '../link.jsx'
import { Usuario } from '../clases/usuario.js'

localStorage.removeItem('login');

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
                
                <Link to = "/"><button>Go home</button></Link>
            </div>
        </>
    )
}