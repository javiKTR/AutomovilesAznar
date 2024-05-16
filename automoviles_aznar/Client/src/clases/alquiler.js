export class Alquiler {
    constructor(idCoche = 0, precio = 0, precioSeguro = 0, idUsuario = null) {
        this.idCoche = idCoche;
        this.precio = precio;
        this.precioSeguro = precioSeguro;
        this.idUsuario = idUsuario;
    }

    setAlquiler(alquiler) {
        this.setIdCoche(alquiler[0]);
        this.setPrecio(alquiler[1]);
        this.setPrecioSeguro(alquiler[2]);
        this.setIdUsuario(alquiler[3]);
    }

    getAlquiler() {
        return [this.idCoche, this.precio, this.precioSeguro, this.idUsuario];
    }

    setIdCoche(idCoche) {
        this.idCoche = idCoche;
    }

    getIdCoche() {
        return this.idCoche;
    }

    setPrecio(precio) {
        this.precio = precio;
    }

    getPrecio() {
        return this.precio;
    }

    setPrecioSeguro(precioSeguro) {
        this.precioSeguro = precioSeguro;
    }

    getPrecioSeguro() {
        return this.precioSeguro;
    }
    setIdUsuario(idUsuario) {
        this.idUsuario = idUsuario;
    }
    
    getIdUsuario() {
        return this.idUsuario;
    }
    
}
