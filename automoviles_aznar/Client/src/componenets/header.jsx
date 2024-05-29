import { useState, useEffect } from "react";
import Axios from 'axios';
import { Link } from '../link.jsx';

export function Header({ tokenExitst }) {
    
    return (
        <header>
            <Link to="/"><h1>Automóviles Aznar</h1></Link>
            <nav className="enlaces">
            <Link to="/alquiler">Alquiler</Link>
            <Link to="/compra">Compra</Link>
            <Link to="/cita">Pedir cita</Link>
            {tokenExitst ?  <Link to="/Logout">Logout</Link> : <Link to="/Singin">Singin</Link>}
            </nav>
      </header>
    )
}