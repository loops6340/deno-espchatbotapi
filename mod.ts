import levenshtein from "https://deno.land/x/levenshtein/mod.ts";

const racentos = (text: string) => {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

interface Customs {
  input: string;
  output: string;
}

let customs: Customs[] = [];

const url = `https://chatbotapi.glitch.me/api?`;

interface Datos {
  resultado: string;
}

function similarity(a: string, b: string) {
  const left = a || "";
  const right = b || "";
  const longest = Math.max(left.length, right.length);
  return longest === 0 ? 1 : (longest - levenshtein(left, right)) / longest;
}

export async function enseñar(texto: string, respuesta: string, contraseña?: string) {
  if (!texto) return "debe decirme el texto";
  if (!respuesta) return "debe decirme la respuesta al texto";
  if (!contraseña) {
    customs.push({ input: texto, output: respuesta });
    return "Añadida con exito";
  } else {
    respuesta = encodeURIComponent(respuesta);
    const postUrl = `${url}tipo=post&contraseña=${contraseña}&texto=${texto}&respuesta=${respuesta}`;
    const bot = await fetch(postUrl);
    const datos: Datos = await bot.json();
    if (datos.resultado == "error") return "hubo un error";
    else return datos.resultado;
  }
}


function DateMonthYear(fecha: Date) {
  return `${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}`;
}

type Modo = 0 | 1

export async function hablar(texto: string, modo: Modo) {
  if (!texto) return "debe decirme el texto";
  if (typeof texto !== "string") return "El texto no debe ser un array";
  if (!modo) modo = 0;
  if (modo !== 0 && modo !== 1) return "Elija un modo valido";

  texto = racentos(texto);
  
  const valores = customs.map((custom) => custom.input).map((input) => similarity(input, texto));
  if (valores.some((similaridad) => similaridad > 0.6)) {
    const maximo = Math.max(...valores);
    const index = valores.indexOf(maximo);
    if (customs[index] == undefined) {
      let respuesta: string;
      texto = encodeURIComponent(texto);
      const bot = await fetch(`${url}tipo=get&texto=${texto}`);
      const datos: Datos = await bot.json();
      if (datos.resultado == "error") return "hubo un error";
      else respuesta = datos.resultado;
      let fecha: Date | string = new Date();
      fecha = DateMonthYear(fecha);
      respuesta = respuesta.replace(/{fechaactual}/g, fecha);
      respuesta = decodeURIComponent(respuesta);
      return respuesta;
    } else {
      return customs[index].output;
    }
  } else {
    texto = encodeURIComponent(texto);
    let respuesta: string;
    const bot = await fetch(`${url}tipo=get&modo=${modo}&texto=${texto}`);
    const datos: Datos = await bot.json();
    if (datos.resultado == "error") respuesta = "hubo un error";
    else respuesta = datos.resultado;
    let fecha: Date | string = new Date();
    fecha = DateMonthYear(fecha)
    respuesta = respuesta.replace(/{fechaactual}/g, fecha);
    respuesta = decodeURIComponent(respuesta);
    return respuesta;
  }
}

export async function pendientes(contraseña: string) {
  let respuesta: string;
  if (!contraseña) return "debe decirme la contraseña";
  const bot = await fetch(`${url}tipo=pendientes&contraseña=${contraseña}`);
  const datos: Datos = await bot.json();
  if (datos.resultado == "error") respuesta = "hubo un error";
  else respuesta = datos.resultado;
  return respuesta;
}
export async function todos(contraseña: string) {
  let respuesta: string;
  if (!contraseña) return "debe decirme la contraseña";
  const bot = await fetch(`${url}tipo=todos&contraseña=${contraseña}`);
  const datos: Datos = await bot.json();
  if (datos.resultado == "error") respuesta = "hubo un error";
  else respuesta = datos.resultado;
  return respuesta;
}
export async function registro(contraseña: string) {
  let respuesta: string;
  if (!contraseña) return "debe decirme la contraseña";
  const bot = await fetch(`${url}tipo=registro&contraseña=${contraseña}`);
  const datos: Datos = await bot.json();
  if (datos.resultado == "nada") respuesta = "no hay nada en el registro";
  else respuesta = datos.resultado;
  return respuesta;
}

interface Total {
  resultado1: number;
  resultado2: number;
}

export async function total() {
  const bot = await fetch(`${url}tipo=ntotal`);
  const datos: Total = await bot.json();
  return { total: datos.resultado1, asignados: datos.resultado2 };
}
