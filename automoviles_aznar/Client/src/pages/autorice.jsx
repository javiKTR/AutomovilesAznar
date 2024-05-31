import { useState, useEffect } from "react";
import { Header } from "../componenets/header.jsx";
import { ManageCita } from '../dbClases/citas.js';
import { Link } from '../link.jsx'
import { parseJwt } from "../paretoken.js";
import { ManagerCoche } from '../dbClases/coches.js';
import { ManageUsuario } from '../dbClases/users.js';

export default function citaCoche({ routeParams }) {
    const ManageCoche = new ManagerCoche();
    const ManagerUsuario = new ManageUsuario();
    const [cochesA, setCochesA] = useState([]);
    const [cochesC, setCochesC] = useState([]);

    useEffect(() => {
            async function loadCoches() {
                await ManageCoche.fetchCoches();
                setCochesA(ManageCoche.getCochesAlquiler());
                setCochesC(ManageCoche.getCochesCompra());
            }
            loadCoches();
    }, []);    

    async function autorice(){
        const [idCoche, idUsuario] = routeParams.query.split('-').map(Number);
        const cocheAlquiler = cochesA.find(coche => coche.id == idCoche);
        const cocheCompra = cochesC.find(coche => coche.id == idCoche);
        if (cocheAlquiler) {
            ManageCoche.reservaCocheAlquiler(idCoche, idUsuario)
        }else{
            if (cocheCompra) {
                ManageCoche.reservaCocheCompra(idCoche, idUsuario)
            }
        }

    }
    return (
        <>
            <input type="button" onClick={autorice} value={"Autorizar"}/>
        </>
    )
}