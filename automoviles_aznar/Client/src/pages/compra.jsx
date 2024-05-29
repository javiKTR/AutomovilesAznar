import { useState, useEffect } from "react";
import Axios from 'axios';
import { Link } from '../link.jsx';
import { ManagerCoche } from "../dbClases/coches.js"
import { parseJwt } from "../paretoken.js"
import { Header } from "../componenets/header.jsx"

export default function CompraPage() {
  const [coches, setCoches] = useState([]);
  let tokenExitst
  try {
      tokenExitst = (parseJwt(localStorage.getItem('login')).exp * 1000 > Date.now());
  } catch (error) {
      tokenExitst = false;
  }
  
  useEffect(() => {
      const cocheManager = new ManagerCoche();
      async function loadCochesCompra() {
          await cocheManager.fetchCoches();  // Esto también carga los datos necesarios para alquileres, si es un problema, se puede optimizar más tarde
          setCoches(cocheManager.getCochesCompra());
      }
      loadCochesCompra();
  }, []);


  return (
    <>
      <Header tokenExitst={ tokenExitst }/>
      <main className="container">
        <h2>Coches para comprar</h2>
        <div className="carrousel">
        {coches.reduce((chunks, item, index) => {
            if (index % 4 === 0) {
              chunks.push([]);
            }
            chunks[chunks.length - 1].push(item);
            return chunks;
          }, []).map((chunk, index) => (
            <div className="carrousel-row" key={index}>
              {chunk.map((val, key) => (
                <ImagenCoche coche={val.modelo} marca={val.marca} modelo={val.modelo} />
              ))}
            </div>
          ))}
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

function ImagenCoche({ coche, marca, modelo }) {
  return (
    <div className="Cochec">
    <Link to={`/coche/${coche}`}><img src={`/images/${coche}.png`} alt={coche} /></Link>
      <div className="CocheData">
        <h3>{marca}</h3>
        <p> {modelo}</p>
      </div>
    </div>
  );
}

function LogoCoche({ logo }) {
  return (<Link><img src={`/images/${logo}-logo.png`} alt={logo} /></Link>);
}
