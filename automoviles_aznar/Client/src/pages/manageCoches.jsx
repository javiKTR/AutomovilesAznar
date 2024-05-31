
import React, { useState, useEffect } from 'react';
import { ManagerCoche } from '../dbClases/coches';
import { parseJwt } from "../paretoken.js"
import { Header } from "../componenets/header.jsx"

export default function ManageCars() {
    const [managerCoche] = useState(new ManagerCoche());
    const [cars, setCars] = useState([]);
    const [car, setCar] = useState({ id: '', marca: '', modelo: '', descripcion: '', kilometros: 0, potencia: 0, transmision: '',combustible: '', carroceria: '' });
    const [editing, setEditing] = useState(false);
    let tokenExitst
    try {
        tokenExitst = (parseJwt(localStorage.getItem('login')).exp * 1000 > Date.now());
    } catch (error) {
        tokenExitst = false;
    }
    
    useEffect(() => {
        const fetchData = async () => {
            await managerCoche.fetchCoches();
            setCars(managerCoche.coches);
        };
        fetchData();
    }, [managerCoche]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCar({ ...car, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        await managerCoche.addCoche(car);
        
        await managerCoche.fetchCoches();
        setCars(managerCoche.coches);
        setCar({ id: '', marca: '', modelo: '', descripcion: '', kilometros: 0, potencia: 0, transmision: '',combustible: '', carroceria: '' });
    };


    return (
        <div>
            <Header tokenExitst={ tokenExitst }/>
            <form className='formCoche' onSubmit={handleSubmit}>
                <label>marca:</label>
                <input type="text" name="marca" value={car.marca} onChange={handleInputChange} placeholder="Marca" required /><br/>
                <label>modelo:</label>
                <input type="text" name="modelo" value={car.modelo} onChange={handleInputChange} placeholder="Modelo" required /><br/>
                <label>descripcion:</label>
                <textarea name="descripcion" value={car.descripcion} onChange={handleInputChange} placeholder="Descripción" required /><br/>
                <label>kilometros:</label>
                <input type="number" name="kilometros" value={car.kilometros} onChange={handleInputChange} placeholder="Modelo" required /><br/>
                <label>carroceria:</label>
                <input type="text" name="carroceria" value={car.carroceria} onChange={handleInputChange} placeholder="Modelo" required /><br/>
                <label>combustible:</label>
                <input type="text" name="combustible" value={car.combustible} onChange={handleInputChange} placeholder="Modelo" required /><br/>
                <label>potencia:</label>
                <input type="number" name="potencia" value={car.potencia} onChange={handleInputChange} placeholder="Modelo" required /><br/>
                <label>transmision:</label>
                <input type="text" name="transmision" value={car.transmision} onChange={handleInputChange} placeholder="Modelo" required /><br/>
                <button type="submit">Crear</button>
            </form>
            <footer>
                <div className="contacto">
                    <p>nº de teléfono: 976 969 696</p>
                    <p>WhatsApp: 676 565 454</p>
                    <p>Email: AutomovilesAznar@gmail.com</p>
                </div>
            </footer>
            
        </div>
    );
}
