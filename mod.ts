interface Datos {
    resultado: string;
}

interface DatosRespuesta {
    respuesta: string;
}

interface DatosObtener extends DatosRespuesta {
    fiabilidad: boolean;
}

class Chatbot {
    private token: string;
    private url: string;
    
    constructor(token:string){
        if(!token) throw new Error('Falta el token.')
        this.token = token
        this.url = `https://seyron-api-noseque.vicente015.repl.co/api/${this.token}/`
    }
    /**
     * 
     * @param texto Para este ejemplo necesitara un token que no sea el publico
     * @returns 
     */
    async enseñar(texto:string,respuesta:string) {
        if(!texto) throw new Error('Debe introducir el texto de entrada')
        if(!respuesta) throw new Error('Debe decirme la salida al texto de entrada')
        texto = encodeURIComponent(texto);
        respuesta = encodeURIComponent(respuesta);
        const response = await fetch(`${this.url}subir/${texto}/${respuesta}`)
        const datos:Datos = await response.json()
        return datos.resultado
    }
    /**
     * 
     * @param texto (obligatorio)
     * @param fiabilidad lo podeis dejar sin poner y lo tomara como false si usas fiabilidad podras obtener que tan fiable es la respuesta que ha dado el bot hacia tu texto siendo el rango de 0(nada parecido) hasta 1(exactamente igual) 
     * @returns respuesta
     */
    async obtener(texto:string,fiabilidad?:boolean){
        if(!texto) throw new Error('Debe introducir el texto de entrada')
        texto = encodeURIComponent(texto);
        const respuesta = await fetch(`${this.url}obtener/${texto}`)
        const datos:DatosObtener = await respuesta.json()
        return fiabilidad ? [datos.respuesta,datos.fiabilidad] : datos.respuesta
    }

    async borrar(texto:string) {
        if(!texto) throw new Error('Debe introducir el texto de entrada')
        texto = encodeURIComponent(texto);
        const respuesta = await fetch(`${this.url}borrar/${texto}`)
        const datos:DatosRespuesta = await respuesta.json()
        return datos.respuesta
    }
}

export default Chatbot