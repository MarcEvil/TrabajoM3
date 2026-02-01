console.log("Iniciando aplpicacion... espere un momento porfavor")

// variables 
let historial = [];
const pantalla = document.getElementById("consola");

// Objeto de operaciones matematicas
const operaciones = {
    sumar: (a, b) => a + b,
    restar: (a, b) => a - b,
    multiplicar: (a, b) => a * b,
    dividir: (a, b) => b !== 0 ? a / b : "Error: Division por cero"
}

// Funcion de salida que escribe en el HTML
function imprimirConsola(mensaje, limpiar = false) {
    console.log(mensaje);
    if (pantalla) {
        // Si 'limpiar' es true, borramos todo antes de escribir 
        if (limpiar) {
            pantalla.innerHTML = mensaje + "<br>";
        } else {
            // Si no, lo agregamos al final
            pantalla.innerHTML += mensaje + "<br>";
        }
    }
}

// funcion Principal de calculadora
function menuCalculadora() {
    let num1 = parseFloat(prompt("ingrese el primer número"));
    let num2 = parseFloat(prompt("ingrese el segundo número"));
    let opciones = prompt(
        "Elija la operacion: \n(+) Sumar\n(-) restar\n (*)multiplicar\n (/) Dividir");
//utilizamos  isNaN por si no se ingresan datos o el usuario ingrese letras
    if (isNaN(num1) || isNaN(num2)) {
        alert("Error: Por favor, ingrese un valor numerico valido.");
        return;
    }
    let resultado;

    switch (opciones) {
        case "+": resultado = operaciones.sumar(num1, num2); break;
        case "-": resultado = operaciones.restar(num1, num2); break;
        case "*": resultado = operaciones.multiplicar(num1, num2); break;
        case "/": resultado = operaciones.dividir(num1, num2); break;
        default:
            alert("Operacion invalida");
            return;
    }

    const registro = {
        id: historial.length + 1,
        operaciones: opciones,
        n1: num1,
        n2: num2,
        res: resultado
    };
    
    historial.push(registro);

    // Mostramos solo el resultado actual y limpiamos lo anterior
    imprimirConsola(`Calculoo #${registro.id}: ${num1} ${opciones} ${num2} = ${resultado}`, true);
}

// Funcion para mostrar el historial en el HTML
function mostrarHistorial() {
    if (historial.length === 0) {
        imprimirConsola("El historial está vacío.", true);
        return;
    }

    // Empezamos limpiando la pantalla y poniendo el título
    let contenidoHistorial = "<strong>--- MOSTRANDO HISTORIAL COMPLETO ---</strong><br>";

    // Acumulamos todo el historial en una sola variable de texto
    historial.forEach(item => {
        contenidoHistorial += `ID: ${item.id} | Operación: [${item.n1} ${item.operaciones} ${item.n2}] | Resultado: ${item.res}<br>`;
    });

    // Lo mandamos todo al HTML de una sola vez
    imprimirConsola(contenidoHistorial, true);
}