const tablero = document.getElementById("tablero");
const btnDado = document.getElementById("btn-dado");
const mensaje = document.getElementById("mensaje");
const turnoTexto = document.getElementById("turno");
const modal = document.getElementById("pregunta-modal");
const preguntaTexto = document.getElementById("pregunta-texto");
const inputRespuesta = document.getElementById("respuesta");

const preguntas = [
  { ejercicio: "f(x) = x^2", respuesta: "2x" },
  { ejercicio: "f(x) = x^3", respuesta: "3x^2" },
  { ejercicio: "f(x) = x^4", respuesta: "4x^3" },
  { ejercicio: "f(x) = x^5", respuesta: "5x^4" },
  { ejercicio: "f(x) = sin(x)", respuesta: "cos(x)" },
  { ejercicio: "f(x) = cos(x)", respuesta: "-sin(x)" },
  { ejercicio: "f(x) = tan(x)", respuesta: "sec^2(x)" },
  { ejercicio: "f(x) = ln(x)", respuesta: "1/x" },
  { ejercicio: "f(x) = e^x", respuesta: "e^x" },
  { ejercicio: "f(x) = 1/x", respuesta: "-1/x^2" },
  { ejercicio: "f(x) = sqrt(x)", respuesta: "1/(2sqrt(x))" },
  { ejercicio: "f(x) = x^3 + 2x^2 - 5x + 1", respuesta: "3x^2 + 4x - 5" },
  { ejercicio: "f(x) = x^2 + 3x", respuesta: "2x + 3" },
  { ejercicio: "f(x) = x^3 - 4x", respuesta: "3x^2 - 4" },
  { ejercicio: "f(x) = 2x^2 - x + 7", respuesta: "4x - 1" },
  { ejercicio: "f(x) = 1/(x^2)", respuesta: "-2/x^3" },
  { ejercicio: "f(x) = e^(2x)", respuesta: "2e^(2x)" },
  { ejercicio: "f(x) = ln(2x)", respuesta: "1/x" },
  { ejercicio: "f(x) = sin(2x)", respuesta: "2cos(2x)" },
  { ejercicio: "f(x) = cos(3x)", respuesta: "-3sin(3x)" },
  { ejercicio: "f(x) = tan(4x)", respuesta: "4sec^2(4x)" },
  { ejercicio: "f(x) = x^6 - 2x^3 + x", respuesta: "6x^5 - 6x^2 + 1" },
  { ejercicio: "f(x) = (x^2 + 1)^2", respuesta: "4x(x^2 + 1)" },
  { ejercicio: "f(x) = x/(x+1)", respuesta: "1/(x+1)^2" },
  { ejercicio: "f(x) = ln(x^2)", respuesta: "2/x" },
  { ejercicio: "f(x) = e^(x^2)", respuesta: "2x * e^(x^2)" },
  { ejercicio: "f(x) = x*sin(x)", respuesta: "x*cos(x) + sin(x)" },
  { ejercicio: "f(x) = x*ln(x)", respuesta: "ln(x) + 1" },
  { ejercicio: "f(x) = x^2 * e^x", respuesta: "x^2 * e^x + 2x * e^x" },
  { ejercicio: "f(x) = sin(x^2)", respuesta: "2x * cos(x^2)" },
  { ejercicio: "f(x) = ln(sin(x))", respuesta: "cot(x)" },
  { ejercicio: "f(x) = 5x^3 + 3x^2 + x + 10", respuesta: "15x^2 + 6x + 1" },
  { ejercicio: "f(x) = 1/(sqrt(x))", respuesta: "-1/(2x√x)" },
  { ejercicio: "f(x) = x^7", respuesta: "7x^6" },
  { ejercicio: "f(x) = x^10", respuesta: "10x^9" },
  { ejercicio: "f(x) = x^2 + 1/x", respuesta: "2x - 1/x^2" },
  { ejercicio: "f(x) = x^3 * ln(x)", respuesta: "3x^2 * ln(x) + x^2" },
  { ejercicio: "f(x) = e^(-x)", respuesta: "-e^(-x)" },
  { ejercicio: "f(x) = ln(e^x)", respuesta: "1" },
  { ejercicio: "f(x) = sin(x)/x", respuesta: "(x*cos(x) - sin(x))/x^2" }
];


const totalCasillas = 40;
const posiciones = [0, 0, 0, 0]; // hasta 4 jugadores
let turno = 0;
const totalJugadores = 2;

for (let i = 0; i < totalCasillas; i++) {
  const casilla = document.createElement("div");
  casilla.classList.add("casilla");
  casilla.textContent = i + 1;
  tablero.appendChild(casilla);
}

function actualizarFichas() {
  document.querySelectorAll(".ficha").forEach(f => f.remove());

  for (let j = 0; j < totalJugadores; j++) {
    const pos = posiciones[j];
    if (pos >= totalCasillas) continue;
    const ficha = document.createElement("div");
    ficha.classList.add("ficha", `jugador${j + 1}`);
    tablero.children[pos].appendChild(ficha);
  }
}

function lanzarDado() {
  return Math.floor(Math.random() * 6) + 1;
}

function siguienteTurno() {
  turno = (turno + 1) % totalJugadores;
  turnoTexto.textContent = `Turno: Jugador ${turno + 1}`;
}

btnDado.addEventListener("click", () => {
  const dado = lanzarDado();
  mensaje.textContent = `Jugador ${turno + 1} lanzó un ${dado}`;
  posiciones[turno] += dado;

  if (posiciones[turno] >= totalCasillas) {
    mensaje.textContent = `¡Jugador ${turno + 1} ha ganado!`;
    btnDado.disabled = true;
    return;
  }

  actualizarFichas();

  const pregunta = preguntas[Math.floor(Math.random() * preguntas.length)];
  modal.showModal();
  preguntaTexto.textContent = `Deriva ${pregunta.ejercicio}`;
  inputRespuesta.value = "";

  modal.addEventListener("close", () => {
    const resp = inputRespuesta.value.trim();
    if (resp === pregunta.respuesta) {
      mensaje.textContent += `. ¡Correcto! Avanzás 1 casilla más.`;
      posiciones[turno] += 1;
    } else {
      mensaje.textContent += `. Incorrecto. La respuesta correcta es: ${pregunta.respuesta}. Retrocedés 1 casilla.`;
      posiciones[turno] = Math.max(0, posiciones[turno] - 1);
    }
  

    actualizarFichas();
    siguienteTurno();
  }, { once: true });
});

actualizarFichas();
turnoTexto.textContent = `Turno: Jugador 1`;

