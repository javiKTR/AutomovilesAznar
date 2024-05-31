import { useState, useEffect } from "react";
import { parseJwt } from "../paretoken.js";
import { Header } from "../componenets/header.jsx";
import { ManageCita } from '../dbClases/citas.js';
import { ManageUsuario } from '../dbClases/users.js';

export default function Cita() {
    
    let tokenExitst;
    try {
        tokenExitst = (parseJwt(localStorage.getItem('login')).exp * 1000 > Date.now());
    } catch (error) {
        tokenExitst = false;
    }
    
    const [fecha, setFecha] = useState('');
    const [hora, setHora] = useState('');
    const [citas, setCitas] = useState([]);
    const ManagerCita = new ManageCita();
    const ManagerUsuario = new ManageUsuario();

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        setFecha(today);

        const fetchUserCitas = async () => {
            const userEmail = parseJwt(localStorage.getItem('login')).email;
            const userId = await ManagerUsuario.getIdUser(userEmail);
            const userCitas = await ManagerCita.getCitasUsr(userId);

            const formattedCitas = userCitas.map(cita => ({
                ...cita,
                fecha: new Date(cita.fecha).toISOString().split('T')[0]
            }));

            setCitas(formattedCitas);
        };

        fetchUserCitas();
    }, []);

    const handleHoraChange = (e) => {
        const inputHora = e.target.value;
        const [inputHoras, inputMinutos] = inputHora.split(':').map(Number);
        const validacion = inputHoras >= 8 && inputHoras < 20;

        if (validacion) {
            setHora(inputHora);
        } else {
            if (inputHoras < 8) {
                if (inputMinutos < 10) {
                    setHora('08:0' + inputMinutos);
                } else {
                    setHora('08:' + inputMinutos);
                }
            } else {
                if (inputMinutos < 10) {
                    setHora('20:0' + inputMinutos);
                } else {
                    setHora('20:' + inputMinutos);
                }
            }
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const userEmail = parseJwt(localStorage.getItem('login')).email;
        const idUser = await ManagerUsuario.getIdUser(userEmail);
        const citaData = { idUsuario: idUser, idEmpleado: 1, fecha, hora };
        await ManagerCita.addCita(citaData);
        setFecha('');
        setHora('');
        
        const userCitas = await ManagerCita.getCitasUsr(idUser);

        const formattedCitas = userCitas.map(cita => ({
            ...cita,
            fecha: new Date(cita.fecha).toISOString().split('T')[0]
        }));

        setCitas(formattedCitas);
    };

    return (
        <>
            <Header tokenExitst={tokenExitst} />
            <div className="formCita">
                <div className="formC">
                    <form onSubmit={handleSubmit} className="datos">
                        <div>
                            <label>Fecha:</label>
                            <input
                                type="date"
                                value={fecha}
                                onChange={(e) => setFecha(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label>Hora:</label>
                            <input
                                type="time"
                                value={hora}
                                onChange={handleHoraChange}
                                required
                            />
                        </div>
                        <button type="submit">Añadir Cita</button>
                    </form>
                    <p>Horario: 8:00 - 20:00</p>
                </div>
                <div className="citas">
                    <h2>Tus Citas</h2>
                    {citas.length > 0 ? (
                        <ul>
                            {citas.map(cita => (
                                <p>
                                    Fecha: {cita.fecha}, Hora: {cita.hora}
                                </p>
                            ))}
                        </ul>
                    ) : (
                        <p>No tienes citas.</p>
                    )}
                </div>
            </div>
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
