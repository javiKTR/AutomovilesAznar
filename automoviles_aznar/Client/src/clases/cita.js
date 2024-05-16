export class Cita {
    constructor(id = 0, idUsuario = 0, idEmpleado = 0, idCoche = 0, fecha = null, hora = null, autorizacion = null) {
        this.id = id;
        this.idUsuario = idUsuario;
        this.idEmpleado = idEmpleado;
        this.idCoche = idCoche;
        this.fecha = fecha;
        this.hora = hora;
        this.autorizacion = autorizacion;
    }

    setCita(cita) {
        this.setId(cita[0]);
        this.setIdUsuario(cita[1]);
        this.setIdEmpleado(cita[2]);
        this.setIdCoche(cita[3]);
        this.setFecha(cita[4]);
        this.setHora(cita[5]);
        this.setAutorizacion(cita[6]);
    }

    getCita() {
        return [this.id, this.idUsuario, this.idEmpleado, this.idCoche, this.fecha, this.hora, this.autorizacion];
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

    setIdEmpleado(idEmpleado) {
        this.idEmpleado = idEmpleado;
    }

    getIdEmpleado() {
        return this.idEmpleado;
    }

    setIdCoche(idCoche) {
        this.idCoche = idCoche;
    }

    getIdCoche() {
        return this.idCoche;
    }

    setFecha(fecha) {
        this.fecha = fecha;
    }

    getFecha() {
        return this.fecha;
    }

    setHora(hora) {
        this.hora = hora;
    }

    getHora() {
        return this.hora;
    }

    setAutorizacion(autorizacion) {
        this.autorizacion = autorizacion;
    }

    getAutorizacion() {
        return this.autorizacion;
    }
}