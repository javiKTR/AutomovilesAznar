import { useState, useEffect } from "react";
import { Link } from '../link.jsx';
import { ManagerCoche } from "../dbClases/coches.js";
import { parseJwt } from "../paretoken.js"
import { Header } from "../componenets/header.jsx"

export default function AlquilerPage({ routeParams }) {
  const [coches, setCoches] = useState([]);
  const [coche, setCoche] = useState({
    id: "",
    modelo: "",
    marca: "",
    carroceria: "",
    combustible: "",
    kilometros: "",
    potencia: "",
    transmision: "",
    descripcion: ""
  });
  const [coche2, setCoche2] = useState({
    id: "",
    modelo: "",
    marca: "",
    carroceria: "",
    combustible: "",
    kilometros: "",
    potencia: "",
    transmision: "",
    descripcion: ""
  });
  let tokenExitst
    try {
        tokenExitst = (parseJwt(localStorage.getItem('login')).exp * 1000 > Date.now());
    } catch (error) {
        tokenExitst = false;
    }
    

  useEffect(() => {
    const cocheManager = new ManagerCoche();
    async function loadCoches() {
      await cocheManager.fetchCoches();
      setCoches(cocheManager.getCoches());
    }
    loadCoches();
  }, []);
  
  useEffect(() => {
    const filteredCoche = coches.find(c => c.modelo === routeParams.query);
    if (filteredCoche) {
      setCoche(filteredCoche);
      setCoche2(filteredCoche);
    }
  }, [coches, routeParams.query]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCoche(prevCoche => ({
      ...prevCoche,
      [name]: value
    }));
  };

  const editeCoche = () => {
    const cocheManager = new ManagerCoche();
    cocheManager.updateCoche(coche);
  }
  const removeCoche = () => {
    const cocheManager = new ManagerCoche();
    cocheManager.deleteCoche(coche.id);
  }

  return (
    <>
      <Header tokenExitst={ tokenExitst }/>
      <main className="cocheVista">
        <h2>{coche2.marca} - {coche2.modelo}</h2>
        <div className="cochedata">
          <img src={`../public/images/${coche2.modelo}.png`} alt="" className="ImgCoche"/>
          <div className="datos">
            <label>Marca:</label>
            <input 
              type="text" 
              name="marca"
              value={coche.marca} 
              onChange={handleChange}
            /><br/>
            <label>Modelo:</label>
            <input 
              type="text" 
              name="modelo"
              value={coche.modelo} 
              onChange={handleChange}
            /><br/>
            <label>Descripción:</label>
            <input 
              type="text" 
              name="descripcion"
              value={coche.descripcion} 
              onChange={handleChange}
            /><br/>
            <label>Kilómetros:</label>
            <input 
              type="number" 
              name="kilometros"
              value={coche.kilometros} 
              onChange={handleChange}
            /><br/>
            <label>Carrocería:</label>
            <input 
              type="text" 
              name="carroceria"
              value={coche.carroceria} 
              onChange={handleChange}
            /><br/>
            <label>Combustible:</label>
            <input 
              type="text" 
              name="combustible"
              value={coche.combustible} 
              onChange={handleChange}
            /><br/>
            <label>Potencia (CV):</label>
            <input 
              type="number" 
              name="potencia"
              value={coche.potencia} 
              onChange={handleChange}
            /><br/>
            <label>Transmisión:</label>
            <input 
              type="text" 
              name="transmision"
              value={coche.transmision} 
              onChange={handleChange}
            /><br/><br/>
            <input className="ActionButton" type="button" value="Editar" onClick={editeCoche}/>
            <input className="ActionButton" type="button" value="Eliminar" onClick={removeCoche} />
          </div>
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
    <div className="Cochea">
      <Link to={coche}><img src={`/images/${coche}.png`} alt={coche} /></Link>
      <div className="CocheData">
        <h3>{marca}</h3>
        <p>{modelo}</p>
      </div>
    </div>
  );
}

function LogoCoche({ logo }) {
  return (<Link><img src={`/images/{logo}-logo.png`} alt={logo} /></Link>);
}
