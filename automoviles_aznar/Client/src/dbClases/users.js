import Axios from 'axios';
import { Usuario } from '../clases/usuario';

export class ManageUsuario {
    constructor() {
        this.usuarios = [];
        this.empleados = [];
    }

    // Métodos para usuarios
    async fetchUsuarios() {
        try {
            const res = await Axios.get("http://localhost:3001/getRangoUsers");
            this.usuarios = res.data.map(user => new Usuario(user.id, user.nombre, user.apellidos, user.email, user.password, user.rango));
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    }

    async login(userData) {
        try {
            const res = await Axios.post("http://localhost:3001/adduser", userData);
            this.usuarios.push(new Usuario(res.data.id, res.data.nombre, res.data.apellidos, res.data.email, res.data.password));
        } catch (error) {
            console.error("Error adding user:", error);
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

    async getIdUser(userEmail){
        try{
            const res = await Axios.post(`http://localhost:3001/getIdUser`, {email:userEmail});            
            return res.data[0].id
        }catch (error) {
            console.error("Error geting user:", error);
        }
    } 
    async getUser(id){
        try{
            const res = await Axios.post(`http://localhost:3001/getUser`, {id:id});            
            return res.data[0]
        }catch (error) {
            console.error("Error geting user:", error);
        }
    } 
}
