[![Logo](https://i.imgur.com/r74nCr1.png)](https://www.npmjs.com/package/espchatbotapi/)

Una API funcional gratuita y en español dedicada a responder de forma divertida y amena a los mensajes que se solicitan, una manera sencilla de hacer que su app sea interactiva con los usuarios y agregarle una entretenida funcionalidad.

  ![Respuestas](https://raster.shields.io/badge/Respuestas-2083-yellow)
  ![Creador](https://raster.shields.io/static/v1?label=Creador&message=Seyron#5532&color=RED?style=flat&logo=appveyor)

## Instalación
Antes de instalarlo, debe tener instalado [Deno](https://deno.land/)

## Características
* API es gratuita sin necesidad de ninguna API Key de pago.
* Más de 2000 respuestas ¡y añadiendo!
* Respuestas interactivas y graciosas.
* Actualizaciones constantes.

## Ejemplos

### Ejemplo 1: Petición básica
```js
import * as chatbot from 'https://deno.land/x/espchatbotapi@1.0.0' // Tambien puedes usar destructuring object
//Manda la petición a la API y recibe una respuesta
//El 0 significa el modo
//El modo 0 => modo de respuestas moderadas y controladas
//El modo 1 => el bot aprende de todo lo que le dicen de todos lados asi que no tiene ningun tipo de control
   chatbot.hablar("hola",0).then(respuesta => {
     console.log(respuesta)
   })
//Salida de la consola: Hola ¿Qué tal?

```
### Usando await:

```js
//Puedes usar await en todos los demás ejemplos
import { hablar } from 'https://deno.land/x/espchatbotapi@1.0.0'
const respuesta = await chatbot.hablar("hola", 0)
console.log(respuesta)
```

### Ejemplo 2: Comando usando DiscordDeno
```js
import { createCommand } from "../utils/helpers.ts";
import { hablar } from 'https://deno.land/x/espchatbotapi@1.0.0'

createCommand({
  name: `hablar`,
  description: "commands/hablar:DESCRIPTION",
  botChannelPermissions: ["SEND_MESSAGES"],
  arguments: [
    {
      name: 'texto',
      type: '...string'
    }
  ]
  execute: function (message, args) {
    const respuesta = await hablar(args.texto, 0)
    message.send(respuesta);
  },
});
```

### Ejemplo 3: Obtiene la cantidad total de respuestas de la API
```js
import { total } from 'https://deno.land/x/espchatbotapi@1.0.0'
//Solicita el número de respuesta
   total().then(respuesta => {
     console.log(respuesta)
   })
//Salida de la consola: Número total de respuestas
```

### Ejemplo 4: Enseñandole algo customizado
```js
import { enseñar } from 'https://deno.land/x/espchatbotapi@1.0.0'
//Enseñale una frase customizada al bot
   enseñar("Quien eres?","yo soy tu padre").then(respuesta => {
     console.log(respuesta)
   })
//Salida de la consola: Añadido con exito
```

------

## Contribuir

Estamos buscando a personas que sean capaces de ayudar en el desarrollo de la API agregando respuestas entretenidas a las solicitudes de los usuarios para crear una API funcional y cada vez más grande. Tan solo necesitamos a personas con paciencia, creatividad y ganas de mejorar.

> Si estás interesad@ por favor contacta con **``Seyron#5532``** mediante Discord.