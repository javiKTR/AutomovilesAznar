import { useState, useEffect } from "react";
import Axios from 'axios';
import { Link } from '../link.jsx';
import { ManagerCoche } from "../dbClases/coches.js"
import { Coche } from "../clases/coche.js"
import { parseJwt } from "../paretoken.js"
import { Header } from "../componenets/header.jsx"

export default function AlquilerPage({ routeParams }) {
  const [coches, setCoches] = useState([]);
  const coche = new Coche();
  const [rango, setRango] = useState(0);
  
  const userAdmin = (email) => {
    Axios.post("http://localhost:3001/getuser",{
      email:email
    }).then((response) => {
      setRango(response.data[0].rango);
    })
  }

  let tokenExitst
  try {
    tokenExitst = (parseJwt(localStorage.getItem('login')).exp * 1000 > Date.now());
    userAdmin(parseJwt(localStorage.getItem('login')).email);
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

    const filteredCoche = coches.find(c => c.modelo === routeParams.query);
    //console.log(filteredCoche);
    try {
      coche.setCoche({ 
        id:filteredCoche.id,
        modelo:filteredCoche.modelo,
        marca:filteredCoche.marca,
        carroceria:filteredCoche.carroceria,
        combustible:filteredCoche.combustible,
        kilometros:filteredCoche.kilometros,
        potencia:filteredCoche.potencia,
        transmision:filteredCoche.transmision,
        descripcion:filteredCoche.descripcion
  
       }); 
    } catch (error) {
      
    }
    function admin(){
      if(rango > 0){
        return <Link to={`/cocheAdmin/${coche.modelo}`}>Editar Coche</Link>
      }
    }
  return (
    <>
      <Header tokenExitst={ tokenExitst }/>
      <main className="cocheVista">
        <h2>{coche.marca} - {coche.modelo}</h2>
        <div className="cochedata">
          <img src={`../public/images/${coche.modelo}.png`} alt="" className="ImgCoche"/>
          <div className="datos">
            <p>{coche.descripcion}</p><br/>
            <p>Kilómetros: {coche.kilometros}</p><br/>
            <p>Carrocería: {coche.carroceria}</p><br/>
            <p>Combustible: {coche.combustible}</p><br/>
            <p>Potencia: {coche.potencia} CV</p><br/>
            <p>Transmisión: {coche.transmision}</p><br/>
            {admin()}
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
        <p> {modelo}</p>
      </div>
    </div>
  );
}

function LogoCoche({ logo }) {
  return (<Link><img src={`/images/${logo}-logo.png`} alt={logo} /></Link>);
}
