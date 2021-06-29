
import ChatBot from "./mod.ts";

const chatbot  = new ChatBot("publico")

const resp = await chatbot.obtener("hola")
console.log('test 1:')
console.log(resp)


import api from './mod.ts'  

console.log('test 2:')
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
