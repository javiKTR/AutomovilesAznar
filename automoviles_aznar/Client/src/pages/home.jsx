import React, { useState, useEffect } from 'react';
import { Link } from '../link.jsx';
import { ManagerCoche } from "../dbClases/coches.js"
import { parseJwt } from "../paretoken.js"

export default function HomePage() {
  const [cochesAlquiler, setCochesAlquiler] = useState([]);
  const [cochesCompra, setCochesCompra] = useState([]);
  let tokenExitst
  try {
    tokenExitst = (parseJwt(localStorage.getItem('login')).exp * 1000 > Date.now());
  } catch (error) {
    tokenExitst = false;
  }
  

  useEffect(() => {

    const manager = new ManagerCoche();
    async function fetchData() {
      await manager.fetchCoches(); 
      setCochesAlquiler(manager.getCochesAlquiler().slice(0, 4));
      setCochesCompra(manager.getCochesCompra().slice(0, 4)); 
    }
    fetchData();
  }, []);

  return (
    <>
      <header>
        <h1>Automóviles Aznar</h1>
        <nav className="enlaces">
          <Link to="/marcas">Nuestras marcas</Link>
          <Link to="/alquiler">Alquiler</Link>
          <Link to="/compra">Compra</Link>
          <Link to="/cita">Pedir cita</Link>
          {tokenExitst ?  <Link to="/Logout">Logout</Link> : <Link to="/Singin">Singin</Link>}
        </nav>
      </header>

      <main className="container">
        <h2>Coches de alquiler</h2>
        <div className="preVista">
          {cochesAlquiler.map(coche => (
            <ImagenCochea key={coche.id} coche={coche.modelo} marca={coche.marca} modelo={coche.modelo} />
          ))}
        </div>
        <h2>Coches para comprar</h2>
        <div className="preVista">
          {cochesCompra.map(coche => (
            <ImagenCochec key={coche.id} coche={coche.modelo} marca={coche.marca} modelo={coche.modelo} />
          ))}
        </div>

        <section className="marcas">
          <h2>Nuestras marcas</h2>
          <div className="logos-marcas">
            <LogoCoche logo="Wolgsvagen" />
            <LogoCoche logo="Nissan" />
            <LogoCoche logo="Mazda" />
          </div>
        </section>
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

function ImagenCochea({ coche, marca, modelo }) {
  return (
    <div className="Cochea">
      <Link to={`/coche/${coche}`}><img src={`/images/${coche}.png`} alt={coche} /></Link>
      <div className="CocheData">
        <h3>{marca}</h3>
        <p>{modelo}</p>
      </div>
    </div>
  );
}

function ImagenCochec({ coche, marca, modelo }) {
  return (
    <div className="Cochec">
      <Link to={`/coche/${coche}`}><img src={`/images/${coche}.png`} alt={coche} /></Link>
      <div className="CocheData">
        <h3>{marca}</h3>
        <p>{modelo}</p>
      </div>
    </div>
  );
}

function LogoCoche({ logo }) {
  return (<Link><img src={`/images/${logo}-logo.png`} alt={logo} /></Link>);
}
