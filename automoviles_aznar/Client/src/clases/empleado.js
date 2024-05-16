export class Empleado {
    constructor(id = 0, idUsuario = 0, rango = 0) {
        this.id = id;
        this.idUsuario = idUsuario;
        this.rango = rango;
    }

    setEmpleado(empleado) {
        this.setId(empleado[0]);
        this.setIdUsuario(empleado[1]);
        this.setRango(empleado[2]);
    }

    getEmpleado() {
        return [this.id, this.idUsuario, this.rango];
    }

    setId(id) {
        this.id = id;
    }

    getId() {
        return this.id;
    }

    setIdUsuario(idUsuario) {
        this.idUsuario = idUsuario;
    }

    getIdUsuario() {
        return this.idUsuario;
    }

    setRango(rango) {
        this.rango = rango;
    }

    getRango() {
        return this.rango;
    }
}
