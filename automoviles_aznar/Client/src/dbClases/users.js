import Axios from 'axios';
import { Usuario } from '../clases/usuario';
import { Empleado } from '../clases/empleado';

export class ManagerUsuario {
    constructor() {
        this.usuarios = [];
        this.empleados = [];
    }

    // Métodos para usuarios
    async fetchUsuarios() {
        try {
            const res = await Axios.get("http://localhost:3001/getusers");
            this.usuarios = res.data.map(user => new Usuario(user.id, user.nombre, user.apellidos, user.email, user.password));
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    }

    async addUser(userData) {
        try {
            const res = await Axios.post("http://localhost:3001/adduser", userData);
            this.usuarios.push(new Usuario(res.data.id, res.data.nombre, res.data.apellidos, res.data.email, res.data.password));
        } catch (error) {
            console.error("Error adding user:", error);
        }
    }

    async updateUser(userData) {
        try {
            await Axios.put(`http://localhost:3001/updateuser/${userData.id}`, userData);
            let index = this.usuarios.findIndex(user => user.id === userData.id);
            if (index !== -1) {
                this.usuarios[index] = new Usuario(userData.id, userData.nombre, userData.apellidos, userData.email, userData.password);
            }
        } catch (error) {
            console.error("Error updating user:", error);
        }
    }

    async deleteUser(userId) {
        try {
            await Axios.delete(`http://localhost:3001/deleteuser/${userId}`);
            this.usuarios = this.usuarios.filter(user => user.id !== userId);
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    }

    // Métodos para empleados
    async fetchEmpleados() {
        try {
            const res = await Axios.get("http://localhost:3001/getemployees");
            this.empleados = res.data.map(emp => new Empleado(emp.id, emp.idUsuario, emp.rango));
        } catch (error) {
            console.error("Error fetching employees:", error);
        }
    }

    async addEmpleado(empData) {
        try {
            const res = await Axios.post("http://localhost:3001/addemployee", empData);
            this.empleados.push(new Empleado(res.data.id, res.data.idUsuario, res.data.rango));
        } catch (error) {
            console.error("Error adding employee:", error);
        }
    }

    async updateEmpleado(empData) {
        try {
            await Axios.put(`http://localhost:3001/updateemployee/${empData.id}`, empData);
            let index = this.empleados.findIndex(emp => emp.id === empData.id);
            if (index !== -1) {
                this.empleados[index] = new Empleado(empData.id, empData.idUsuario, empData.rango);
            }
        } catch (error) {
            console.error("Error updating employee:", error);
        }
    }

    async deleteEmpleado(empId) {
        try {
            await Axios.delete(`http://localhost:3001/deleteemployee/${empId}`);
            this.empleados = this.empleados.filter(emp => emp.id !== empId);
        } catch (error) {
            console.error("Error deleting employee:", error);
        }
    }
}
