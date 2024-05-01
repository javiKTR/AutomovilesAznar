import { Link } from '../link.jsx'

export default function AlquilerPage () { 
    return(
        <>
        <header>
        <Link to = '/'><h1>Automóviles Aznar</h1></Link>
        
        <nav className="enlaces">
          <a href="/marcas">Nuestras marcas</a>
          <a href="/alquiler">Alquilar</a>
          <a href="/compra">Compra</a>
          <a href="/cita">Pedir cita</a>
        </nav>
      </header>
      
      <main className="container">
        {/* Suponiendo que tendrás un carrusel o algo similar para mostrar los automóviles */}
        <h2>Coches de alquiler</h2>
        <div className="carrousel">
          <ImagenCoche coche={"rx7"}/>
          <ImagenCoche coche={"AE86"}/>
          <ImagenCoche coche={"WolgsvagenGTI"}/>
        </div>
        
      </main>
      
      <footer>
        <div className="contacto">
          <p>nº de telefono : 976 969 696</p>
          <p>WhatsApp : 676 565 454</p>
          <p>Email: AutomovilesAznar@gmail.com</p>
          {/* Agregar aquí más información de contacto si es necesario */}
        </div>
      </footer>
    </>
    )
}


function ImagenCoche ({coche}){
    return(<a><img src={`/images/${coche}.png`} alt={coche}/></a>)
  }
  function LogoCoche ({logo}){
    return(<a><img src={`/images/${logo}-logo.png`} alt={logo}/></a>)
  }