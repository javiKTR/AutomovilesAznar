export class Coche {
    constructor(id = 0, marca = "", modelo = "", descripcion = "", kilometros = 0, potencia = 0, transmision = "", combustible = "", carroceria = "") {
        this.id = id;
        this.marca = marca;
        this.modelo = modelo;
        this.descripcion = descripcion;
        this.kilometros = kilometros;
        this.potencia = potencia;
        this.transmision = transmision;
        this.combustible = combustible;
        this.carroceria = carroceria;
    }

    setCoche(coche) {
        this.setId(coche[0]);
        this.setMarca(coche[1]);
        this.setModelo(coche[2]);
        this.setDescripcion(coche[3]);
        this.setKilometros(coche[4]);
        this.setPotencia(coche[5]);
        this.setTransmision(coche[6]);
        this.setCombustible(coche[7]);
        this.setCarroceria(coche[8]);
    }

    getCoche() {
        return [this.id, this.marca, this.modelo, this.descripcion, this.kilometros, this.potencia, this.transmision, this.combustible, this.carroceria];
    }

    setId(id) {
        this.id = id;
    }

    getId() {
        return this.id;
    }

    setMarca(marca) {
        this.marca = marca;
    }

    getMarca() {
        return this.marca;
    }

    setModelo(modelo) {
        this.modelo = modelo;
    }

    getModelo() {
        return this.modelo;
    }

    setDescripcion(descripcion) {
        this.descripcion = descripcion;
    }

    getDescripcion() {
        return this.descripcion;
    }

    setKilometros(kilometros) {
        this.kilometros = kilometros;
    }

    getKilometros() {
        return this.kilometros;
    }

    setPotencia(potencia) {
        this.potencia = potencia;
    }

    getPotencia() {
        return this.potencia;
    }

    setTransmision(transmision) {
        this.transmision = transmision;
    }

    getTransmision() {
        return this.transmision;
    }

    setCombustible(combustible) {
        this.combustible = combustible;
    }

    getCombustible() {
        return this.combustible;
    }

    setCarroceria(carroceria) {
        this.carroceria = carroceria;
    }

    getCarroceria() {
        return this.carroceria;
    }
}
