export class Compra {
    constructor(idCoche = 0, precio = "", idUsuario = null) {
        this.idCoche = idCoche;
        this.precio = precio;
        this.idUsuario = idUsuario;
    }

    setCompra(compra) {
        this.setIdCoche(compra[0]);
        this.setPrecio(compra[1]);
        this.setIdUsuario(compra[2]);
    }

    getCompra() {
        return [this.idCoche, this.precio, this.idUsuario];
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

    setIdUsuario(idUsuario) {
        this.idUsuario = idUsuario;
    }

    getIdUsuario() {
        return this.idUsuario;
    }
}
