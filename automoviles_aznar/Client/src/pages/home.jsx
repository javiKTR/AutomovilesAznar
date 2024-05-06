import { Link } from '../link.jsx'

export default function HomePage () { 
    return(
        <>
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
      
      <main className="container">
        {/* Suponiendo que tendrás un carrusel o algo similar para mostrar los automóviles */}
        <h2>Coches de alquiler</h2>
        <div className="carrousel">
          <ImagenCoche coche={"Rx7"}/>
          <ImagenCoche coche={"AE86"}/>
          <ImagenCoche coche={"WolgsvagenGTI"}/>
        </div>
        <h2>Coches para comprar</h2>
        <div className="carrousel">
          <ImagenCoche coche={"Rx7"}/>
          <ImagenCoche coche={"AE86"}/>
          <ImagenCoche coche={"WolgsvagenGTI"}/>
        </div>
        
        <section className="marcas">
          <h2>Nuestras marcas</h2>
          <div className="logos-marcas">
            {/* Suponiendo que tendrás logos de las marcas aquí */}
            <LogoCoche logo={"Wolgsvagen"}/>
            <LogoCoche logo={"Nissan"}/>
            <LogoCoche logo={"mazda"}/>
          </div>
        </section>
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
  return(<Link to={coche}><img src={`/images/${coche}.png`} alt={coche}/></Link>)
}
  function LogoCoche ({logo}){
    return(<Link><img src={`/images/${logo}-logo.png`} alt={logo}/></Link>)
  }