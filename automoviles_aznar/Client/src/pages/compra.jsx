import { useState, useEffect } from "react";
import Axios from 'axios';
import { Link } from '../link.jsx';

export default function CompraPage() {
  const [coches, setCoches] = useState([]);
  const [cochesC, setCochesC] = useState([]);
  const [cochesF, setCochesF] = useState([]);

  useEffect(() => {
    getCoches();
  },[]);

  const getCoches = () => {
    Axios.get("http://localhost:3001/getecars").then((response) => {
      setCoches(response.data);
    }).then(() => {
      Axios.get("http://localhost:3001/getecarsc").then((response) => {
        setCochesC(response.data);
        filtrarCoches();
      });
    });
  }

  const filtrarCoches = () => {
    const idsCochesC = new Set(cochesC.map(coche => coche.idCoche));
    const cochesFiltrados = coches.filter(coche => idsCochesC.has(coche.id));
    setCochesF(cochesFiltrados);
  };

  getCoches();
  return (
    <>
      <header>
        <Link to='/'> <h1>Automóviles Aznar</h1> </Link>
        <nav className="enlaces">
          <Link href="/marcas">Nuestras marcas</Link>
          <Link href="/alquiler">Alquilar</Link>
          <Link href="/compra">Compra</Link>
          <Link href="/cita">Pedir cita</Link>
        </nav>
      </header>
      <main className="container">
        <h2>Coches para comprar</h2>
        <div className="carrousel">
          {cochesF.map((val, key) => {
            return <ImagenCoche coche={val.modelo} key={key} />;
          })}
        </div>
      </main>
      <footer>
        <div className="contacto">
          <p>nº de teléfono: 976 969 696</p>
          <p>WhatsApp: 676 565 454</p>
          <p>Email: AutomovilesAznar@gmail.com</p>
        </div>
      </footer>
    </>
  );
}

function ImagenCoche({ coche }) {
  return (<Link to={coche}><img src={`/images/${coche}.png`} alt={coche} /></Link>);
}
function LogoCoche({ logo }) {
  return (<Link><img src={`/images/${logo}-logo.png`} alt={logo} /></Link>);
}
