import ChatBot from "./mod.ts";

const chatbot  = new ChatBot("publico")

const resp = await chatbot.obtener("hola")

console.log(resp)