import Axios from 'axios';
import { Coche } from '../clases/coche';

export class ManagerCoche {
    constructor(){
        this.coches = [];
        this.cochesA = [];  // Coches de alquiler
        this.cochesC = [];  // Coches de compra
        this.cochesF = [];  // Coches filtrados para alquiler
        this.cochesComprados = [];  // Coches filtrados para compra
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
            const res = await Axios.get("http://localhost:3001/getecarsa");
            this.cochesA = res.data;
            this.filtrarCochesAlquiler();
        } catch (error) {
            console.error("Error fetching rental cars:", error);
        }
    }

    async fetchCochesCompra() {
        try {
            const res = await Axios.get("http://localhost:3001/getecarsc");
            this.cochesC = res.data;
            this.filtrarCochesCompra();
        } catch (error) {
            console.error("Error fetching purchased cars:", error);
        }
    }

    filtrarCochesAlquiler() {
        const idsCochesA = new Set(this.cochesA.map(coche => coche.idCoche));
        this.cochesF = this.coches.filter(coche => idsCochesA.has(coche.id));
    }

    filtrarCochesCompra() {
        const idsCochesC = new Set(this.cochesC.map(coche => coche.idCoche));
        this.cochesComprados = this.coches.filter(coche => idsCochesC.has(coche.id));
    }

    getCochesAlquiler() {
        return this.cochesF;
    }

    getCochesCompra() {
        return this.cochesComprados;
    }
}
