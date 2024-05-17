import Axios from 'axios';
import { Cita } from '../clases/cita';

export class ManagerCita {
    constructor() {
        this.citas = [];
    }

    async fetchCitas() {
        try {
            const res = await Axios.get("http://localhost:3001/getappointments");
            this.citas = res.data.map(appointment => new Cita(appointment.id, appointment.usuarioId, appointment.cocheId, appointment.fecha, appointment.estado));
        } catch (error) {
            console.error("Error fetching appointments:", error);
        }
    }

    async addCita(citaData) {
        try {
            const res = await Axios.post("http://localhost:3001/addappointment", citaData);
            this.citas.push(new Cita(res.data.id, res.data.usuarioId, res.data.cocheId, res.data.fecha, res.data.estado));
        } catch (error) {
            console.error("Error adding appointment:", error);
        }
    }

    async updateCita(citaData) {
        try {
            await Axios.put(`http://localhost:3001/updateappointment/${citaData.id}`, citaData);
            let index = this.citas.findIndex(cita => cita.id === citaData.id);
            if (index !== -1) {
                this.citas[index] = new Cita(citaData.id, citaData.usuarioId, citaData.cocheId, citaData.fecha, citaData.estado);
            }
        } catch (error) {
            console.error("Error updating appointment:", error);
        }
    }

    async deleteCita(citaId) {
        try {
            await Axios.delete(`http://localhost:3001/deleteappointment/${citaId}`);
            this.citas = this.citas.filter(cita => cita.id !== citaId);
        } catch (error) {
            console.error("Error deleting appointment:", error);
        }
    }
}
