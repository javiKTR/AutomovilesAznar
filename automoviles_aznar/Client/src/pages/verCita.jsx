import { useState, useEffect } from "react";
import { parseJwt } from "../paretoken.js";
import { Header } from "../componenets/header.jsx";
import { ManageCita } from '../dbClases/citas.js';
import { ManageUsuario } from '../dbClases/users.js';
import { ManagerCoche } from '../dbClases/coches.js';
import { Link } from "../link.jsx";

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
    const [user, setUser] = useState([]);
    const [cochesA, setCochesA] = useState([]);
    const [cochesC, setCochesC] = useState([]);
    const ManagerCita = new ManageCita();
    const ManagerUsuario = new ManageUsuario();
    const ManageCoche = new ManagerCoche();


    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        setFecha(today);

        const fetchUserCitas = async () => {
            async function loadCoches() {
                await ManageCoche.fetchCoches();
                setCochesA(cocheManager.getCochesAlquiler());
                setCochesC(cocheManager.getCochesCompra());
            }
            loadCoches();
            const userEmail = parseJwt(localStorage.getItem('login')).email;
            const userId = await ManagerUsuario.getIdUser(userEmail);
            const userCitas = await ManagerCita.getCitasEmp(userId);
            setUser(await ManagerUsuario.getUser(userId));
            const formattedCitas = userCitas.map(cita => ({
                ...cita,
                fecha: new Date(cita.fecha).toISOString().split('T')[0]
            }));
            const finalCitas = formattedCitas.filter(cita => cita.idCoche !== 0);
            setCitas(finalCitas);
        };

        fetchUserCitas();
    }, []);
    /*const autorice = (id) =>{
        ManageCoche.reservaCoche(id);
    }*/
    async function autorice(id){
        console.log(cochesA)
    }
    return (
        <>
            <Header tokenExitst={tokenExitst} />
            <div className="formCita">
                <div className="citas">
                    <h2>Tus Citas</h2>
                    {citas.length > 0 ? (
                        <ul >
                            {citas.map(cita => (
                                <div className="ListCitas">
                                <p>
                                    Fecha: {cita.fecha}, Hora: {cita.hora}, Cliente: {user.nombre} {user.apellidos}
                                </p>
                                <Link to={"autorice/"+cita.idCoche+"-"+cita.idUsuario}> Autorizar </Link>
                                </div>
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
