import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  return (
    <>
      <header>
        <h1>Automóviles Aznar</h1>
        <nav className="enlaces">
          <a href="/marcas">Nuestras marcas</a>
          <a href="/alquilar">Alquilar</a>
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
        <h2>Coches para comprar</h2>
        <div className="carrousel">
          <ImagenCoche coche={"rx7"}/>
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
  );
}

function ImagenCoche ({coche}){
  return(<a><img src={`/images/${coche}.png`} alt={coche}/></a>)
}
function LogoCoche ({logo}){
  return(<a><img src={`/images/${logo}-logo.png`} alt={logo}/></a>)
}

export default App
