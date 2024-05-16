
import React, { useState, useEffect } from 'react';
import { ManagerCoche } from '../dbClases/coches';

function ManageCars() {
    const [managerCoche] = useState(new ManagerCoche());
    const [cars, setCars] = useState([]);
    const [car, setCar] = useState({ id: '', marca: '', modelo: '', descripcion: '' });
    const [editing, setEditing] = useState(false);

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
        if (editing) {
            await managerCoche.updateCar(car);
        } else {
            await managerCoche.createCar(car);
        }
        await managerCoche.fetchCoches();
        setCars(managerCoche.coches);
        setCar({ id: '', marca: '', modelo: '', descripcion: '' });
        setEditing(false);
    };

    const handleEdit = (car) => {
        setCar(car);
        setEditing(true);
    };

    const handleDelete = async (id) => {
        await managerCoche.deleteCar(id);
        await managerCoche.fetchCoches();
        setCars(managerCoche.coches);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="marca" value={car.marca} onChange={handleInputChange} placeholder="Marca" required />
                <input type="text" name="modelo" value={car.modelo} onChange={handleInputChange} placeholder="Modelo" required />
                <textarea name="descripcion" value={car.descripcion} onChange={handleInputChange} placeholder="Descripción" required />
                <button type="submit">{editing ? 'Actualizar' : 'Crear'}</button>
            </form>
            <ul>
                {cars.map((car) => (
                    <li key={car.id}>
                        {car.marca} {car.modelo} - {car.descripcion}
                        <button onClick={() => handleEdit(car)}>Editar</button>
                        <button onClick={() => handleDelete(car.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ManageCars;
