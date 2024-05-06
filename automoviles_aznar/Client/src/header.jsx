import { Link } from './link.jsx';

export default function ComunHeader(){
    return(
        <header>
        <h1>Automóviles Aznar</h1>
        <nav className="enlaces">
          <Link to="/marcas">Nuestras marcas</Link>
          <Link to='/alquiler'>Alquiler</Link>
          <Link to="/compra">Compra</Link>
          <Link to="/cita">Pedir cita</Link>
          <Link to="/Singin">Singin</Link>
        </nav> 
      </header>  
    );
}