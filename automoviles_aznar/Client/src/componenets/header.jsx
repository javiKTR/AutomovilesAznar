import { useState, useEffect } from "react";
import Axios from 'axios';
import { Link } from '../link.jsx';
import { parseJwt } from "../paretoken.js"

export function Header({ tokenExitst }) {
    const [rango, setRango] = useState(0);
    let flag = false;
    const userAdmin = (email) => {
        Axios.post("http://localhost:3001/getRangoUser",{
          email:email
        }).then((response) => {
          setRango(response.data[0].rango);
        })
    }
    try {
      userAdmin(parseJwt(localStorage.getItem('login')).email);
    } catch (error) {
      
    }
    
    if(rango > 0){
        flag = true
    }
    
    return (
        <header>
            <Link to="/"><h1>Automóviles Aznar</h1></Link>
            <nav className="enlaces">
            {flag ?  <Link to="/alquilerAdmin">Alquiler</Link> : <Link to="/alquiler">Alquiler</Link>}
            {flag ?  <Link to="/compraAdmin">Compra</Link> : <Link to="/compra">Compra</Link>}
            <Link to="/cita">Pedir cita</Link>
            {tokenExitst ?  <Link to="/Logout">Logout</Link> : <Link to="/Singin">Singin</Link>}
            </nav>
      </header>
    )
}