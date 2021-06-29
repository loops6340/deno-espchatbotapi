[![Logo](https://i.imgur.com/r74nCr1.png)](https://www.npmjs.com/package/espchatbotapi/)

Una API funcional gratuita y en español dedicada a responder de forma divertida y amena a los mensajes que se solicitan, una manera sencilla de hacer que su app sea interactiva con los usuarios y agregarle una entretenida funcionalidad.

  ![Respuestas](https://raster.shields.io/badge/Respuestas-2083-yellow)
  ![Creador](https://raster.shields.io/static/v1?label=Creador&message=Seyron#5532&color=RED?style=flat&logo=appveyor)

## Instalación
Antes de instalarlo, debe tener instalado [Deno](https://deno.land

## Características
* API es gratuita sin necesidad de ninguna API Key de pago.
* Respuestas interactivas y graciosas.
* Actualizaciones constantes.

## Constructor
En el constructor debera pasar el token(en el caso de que no quiera tener respuestas propias sino las mas comunes use el token:'publico') si quiere un token para tener sus propias respuestas personalizadas contacte con: Seyron#5532 por discord dando [Click Aqui](https://discord.gg/pzg3RmN)

## obtener
El metodo obtener tiene dos parametros
* texto(obligatorio)
* fiabilidad:Booleano(true o false)
Fiabilidad lo podeis dejar sin poner y lo tomara como false
si usas fiabilidad podras obtener que tan fiable es la respuesta que ha dado el bot hacia tu texto siendo el rango de 0(nada parecido) hasta 1(exactamente igual)

## Ejemplos

### Ejemplo 1: Petición básica
```js
import Chatbot from 'https://deno.land/x/espchatbotapi/mod.ts' 

const chatbot = new Chatbot('publico') //en publico iria el token si tiene uno propio
try {
  respuesta = await chatbot.obtener("hola")
  console.log(respuesta) //respuesta al texto
} catch (err) {
  console.log(err) //Solo saltara si hay un error mandando el error a la consola
}
```
### Ejemplo 2: Petición básica con fiabilidad
```js
import Chatbot from 'https://deno.land/x/espchatbotapi/mod.ts'  
chatbot = new Chatbot('publico') //en publico iria el token si tiene uno propio
const respuesta = await chatbot.obtener("hola",true)
try {
  console.log(respuesta[0]) //respuesta al texto
  console.log(respuesta[1]) //fiabilidad de la respuesta
} catch (err) {
  console.log(err) //Solo saltara si hay un error mandando el error a la consola
}
```

### Ejemplo 3: Enseñar al bot(usando token privado)
Para este ejemplo necesitara un token que no sea el publico
```js
import Chatbot from 'https://deno.land/x/espchatbotapi/mod.ts'

chatbot = new Chatbot('publico')
try {
  const respuesta = await chatbot.enseñar('hola','hola que tal estas?')
  console.log(respuesta) //deberia decirte que se enseño correctamente
} catch (err) {
  console.log(err) //Si ocurre un error
}
```
Si necesitas actualizar una palabra puedes volver a ejecutar el comando,el npm se encarga de borrar la antigua palabra.
### Ejemplo 4: Borrar algo enseñado al bot(usando token privado)
Para este ejemplo necesitara un token que no sea el publico
```js
import Chatbot from 'https://deno.land/x/espchatbotapi/mod.ts'  

chatbot = new Chatbot('publico')
try {
  const respuesta = await chatbot.enseñar('hola','hola que tal estas?')
  console.log(respuesta) //deberia decirte que se enseño correctamente
} catch (err) {
  console.log(err) //Si ocurre un error
}

try {
  const respuesta = await chatbot.borrar('hola')
  console.log(respuesta) //deberia decirte que se borro correctamente
} catch (err) { 
  console.log(err) //Si ocurre un error
}
```

### Ejemplo 5:Peticion basica con token + respuestas publicas(recomendado)
Este ejemplo te enseñara como mezclar las respuestas añadidas por tu bot y las respuestas publicas
```js
import api from 'https://deno.land/x/espchatbotapi/mod.ts'  

const chatbotpublico = new api('publico')
const chatbottoken = new api('tutoken')

let minimo = 0.45
const respuesta = await chatbottoken.obtener("hola",true)
if(respuesta[1] > minimo) { //Si el factor de fiabilidad es menor al minimo definido previamente usara la respuesta de la api publica
  console.log(respuesta[0]) //respuesta al texto(respuesta de tu propio bot)
} else {
  const resp = await chatbotpublico.obtener("hola").catch(console.log)
  console.log(resp) //respuesta de la api publica
}

```