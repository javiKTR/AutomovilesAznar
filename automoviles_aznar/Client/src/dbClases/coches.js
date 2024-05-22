import Axios from 'axios';
import { Coche } from '../clases/coche';
import { Alquiler } from '../clases/alquiler';
import { Compra } from '../clases/compra';

export class ManagerCoche {
    constructor(){
        this.coches = [];
        this.cochesA = []; 
        this.cochesC = []; 
        this.cochesAlquiler = []; 
        this.cochesComprados = [];  
    }
     
    async fetchCoches() {
        try {
            const res = await Axios.get("http://localhost:3001/getecars");
            this.coches = res.data.map(coche => new Coche(coche.id, coche.marca, coche.modelo, coche.descripcion, coche.kilometros, coche.potencia, coche.transmision, coche.combustible, coche.carroceria));
            await this.fetchCochesAlquiler();
            await this.fetchCochesCompra();
        } catch (error) {
            console.error("Error fetching cars:", error);
        }
    }

    async fetchCochesAlquiler() {
        try {
            const res = await Axios.get("http://localhost:3001/getrentals");
            this.cochesA = res.data;
            this.filtrarCochesAlquiler();
        } catch (error) {
            console.error("Error fetching rental cars:", error);
        }
    }

    async fetchCochesCompra() {
        try {
            const res = await Axios.get("http://localhost:3001/getpurchases");
            this.cochesC = res.data;
            this.filtrarCochesCompra();
        } catch (error) {
            console.error("Error fetching purchased cars:", error);
        }
    }
    async addAlquiler(alquilerData) {
        try {
            const res = await Axios.post("http://localhost:3001/addrental", alquilerData);
            this.alquileres.push(new Alquiler(res.data.idCoche, res.data.precio, res.data.precioSeguro, res.data.idUsuario));
        } catch (error) {
            console.error("Error adding rental:", error);
        }
    }

    async updateAlquiler(alquilerData) {
        try {
            await Axios.put(`http://localhost:3001/updaterental/${alquilerData.idCoche}`, alquilerData);
            let index = this.alquileres.findIndex(alq => alq.idCoche === alquilerData.idCoche);
            if (index !== -1) {
                this.alquileres[index] = new Alquiler(alquilerData.idCoche, alquilerData.precio, alquilerData.precioSeguro, alquilerData.idUsuario);
            }
        } catch (error) {
            console.error("Error updating rental:", error);
        }
    }

    async deleteAlquiler(idCoche) {
        try {
            await Axios.delete(`http://localhost:3001/deleterental/${idCoche}`);
            this.alquileres = this.alquileres.filter(alq => alq.idCoche !== idCoche);
        } catch (error) {
            console.error("Error deleting rental:", error);
        }
    }

    async addCompra(compraData) {
        try {
            const res = await Axios.post("http://localhost:3001/addpurchase", compraData);
            this.compras.push(new Compra(res.data.idCoche, res.data.precio, res.data.idUsuario));
        } catch (error) {
            console.error("Error adding purchase:", error);
        }
    }

    async updateCompra(compraData) {
        try {
            await Axios.put(`http://localhost:3001/updatepurchase/${compraData.idCoche}`, compraData);
            let index = this.compras.findIndex(comp => comp.idCoche === compraData.idCoche);
            if (index !== -1) {
                this.compras[index] = new Compra(compraData.idCoche, compraData.precio, compraData.idUsuario);
            }
        } catch (error) {
            console.error("Error updating purchase:", error);
        }
    }

    async deleteCompra(idCoche) {
        try {
            await Axios.delete(`http://localhost:3001/deletepurchase/${idCoche}`);
            this.compras = this.compras.filter(comp => comp.idCoche !== idCoche);
        } catch (error) {
            console.error("Error deleting purchase:", error);
        }
    }


    filtrarCochesAlquiler() {
        const idsCochesA = new Set(this.cochesA.map(coche => coche.idCoche));
        this.cochesAlquiler = this.coches.filter(coche => idsCochesA.has(coche.id));
    }

    filtrarCochesCompra() {
        const idsCochesC = new Set(this.cochesC.map(coche => coche.idCoche));
        this.cochesComprados = this.coches.filter(coche => idsCochesC.has(coche.id));
    }

    getCochesAlquiler() {
        return this.cochesAlquiler;
    }

    getCochesCompra() {
        return this.cochesComprados;
    }
}
