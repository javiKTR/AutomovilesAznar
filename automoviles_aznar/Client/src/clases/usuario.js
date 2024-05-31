export class Usuario{
    constructor(id = 0, nombre = "", apellidos = "", email = "", password = "", rango = 0){
        this.id = id;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.email = email;
        this.password = password;
        this.rango = rango;

    }

    setUser(user){
      this.setId(user[0]);  
      this.setNombre(user[1]);  
      this.setApellidos(user[2]);  
      this.setEmail(user[3]);  
      this.setPassword(user[4]);  
    }
    gerUser(){
        if(this.id == 0){
            return [this.nombre, this.apellidos, this.email, this.password]
        }else{
            return [this.id, this.nombre, this.apellidos, this.email, this.password]
        }
    }

    getId() {
        return this.id;
    }

    setId(id) {
        this.id = id;
    }
    
    getNombre() {
        return this.nombre;
    }

    setNombre(nombre) {
        this.nombre = nombre;
    }
    getApellidos() {
        return this.apellidos;
    }

    setApellidos(apellidos) {
        this.apellidos = apellidos;
    }
    getEmail() {
        return this.email;
    }

    setEmail(email) {
        this.email = email;
    }
    getPassword() {
        return this.password;
    }

    setPassword(password) {
        this.password = password;
    }
    getRango() {
        return this.rango;
    }

    setRango(rango) {
        this.rango = rango;
    }

}
