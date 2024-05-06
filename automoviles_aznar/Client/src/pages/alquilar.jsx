import { useState, useEffect } from "react";
import Axios from 'axios';
import { Link } from '../link.jsx';

export default function AlquilerPage() {
  const [coches, setCoches] = useState([]);
  const [cochesA, setCochesA] = useState([]);
  const [cochesF, setCochesF] = useState([]);

  useEffect(() => {
    getCoches();
  });

  const getCoches = () => {
    Axios.get("http://localhost:3001/getecars").then((response) => {
      setCoches(response.data);
    }).then(() => {
      Axios.get("http://localhost:3001/getecarsa").then((response) => {
        setCochesA(response.data);
        filtrarCoches();
      });
    });
  }

  const filtrarCoches = () => {
    const idsCochesA = new Set(cochesA.map(coche => coche.idCoche));
    const cochesFiltrados = coches.filter(coche => idsCochesA.has(coche.id));
    setCochesF(cochesFiltrados);
  };

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
        <h2>Coches de alquiler</h2>
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
