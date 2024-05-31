export class Alquiler {
    constructor(idCoche = 0, precio = 0, precioSeguro = 0, idUsuario = null) {
        this.idCoche = idCoche;
        this.precio = precio;
        this.precioSeguro = precioSeguro;
        this.idUsuario = idUsuario;
    }

    setAlquiler(alquiler) {
        this.setIdCoche(alquiler.idCoche);
        this.setPrecio(alquiler.precio);
        this.setPrecioSeguro(alquiler.precioSeguro);
        this.setIdUsuario(alquiler.idUsuario);
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
