// ============================================================
//   🎞️  GESTOR DE BUTACAS - SALA DE PROYECCIÓN
//   Autor: theazec34
//   Descripción: Sistema de reservas para una sala de proyección
//                con 8 filas y 10 columnas de butacas.
//   Convención: 0 = butaca libre | 1 = butaca ocupada
// ============================================================

type MatrizButacas = number[][];

// Inicializa la sala de proyección con todas las butacas libres (0)
function inicializarSala(): MatrizButacas {
  const filas = 8;
  const columnas = 10;
  const sala: MatrizButacas = [];

  for (let i = 0; i < filas; i++) {
    const fila: number[] = [];
    for (let j = 0; j < columnas; j++) {
      fila.push(0); // 0 = libre
    }
    sala.push(fila);
  }

  return sala;
}

// Muestra el estado actual de la sala de proyección en consola
// X = ocupada | L = libre
function mostrarSala(sala: MatrizButacas): void {
  console.log("\n🎞️  SALA DE PROYECCIÓN — MAPA DE BUTACAS");
  console.log("          " + Array.from({ length: sala[0].length }, (_, i) => String(i + 1).padStart(2)).join(" "));
  console.log("          " + "—".repeat(sala[0].length * 3));

  for (let i = 0; i < sala.length; i++) {
    const etiquetaFila = `  Fila ${i + 1}  |`;
    const visualFila = sala[i].map(butaca => (butaca === 1 ? " X" : " L")).join(" ");
    console.log(etiquetaFila + visualFila);
  }

  console.log("          " + "—".repeat(sala[0].length * 3));
  console.log("          X = Ocupada   L = Libre\n");
}

// Reserva una butaca en la fila y columna indicadas (numeración desde 1)
// Devuelve un mensaje indicando si la operación tuvo éxito o falló
function reservarButaca(sala: MatrizButacas, fila: number, columna: number): string {
  const indiceFila = fila - 1;
  const indiceColumna = columna - 1;

  // Validar que la posición existe dentro de la sala
  if (
    indiceFila < 0 || indiceFila >= sala.length ||
    indiceColumna < 0 || indiceColumna >= sala[0].length
  ) {
    return `❌ Error: La butaca (Fila ${fila}, Col ${columna}) no existe en esta sala.`;
  }

  // Comprobar si la butaca ya está ocupada
  if (sala[indiceFila][indiceColumna] === 1) {
    return `⚠️  La butaca (Fila ${fila}, Col ${columna}) ya está ocupada. Reserva fallida.`;
  }

  // Marcar la butaca como ocupada
  sala[indiceFila][indiceColumna] = 1;
  return `✅ Butaca (Fila ${fila}, Col ${columna}) reservada con éxito.`;
}

// Cuenta cuántas butacas están ocupadas y cuántas están libres en toda la sala
function contarButacas(sala: MatrizButacas): { ocupadas: number; libres: number } {
  let ocupadas = 0;
  let libres = 0;

  for (let i = 0; i < sala.length; i++) {
    for (let j = 0; j < sala[i].length; j++) {
      if (sala[i][j] === 1) {
        ocupadas++;
      } else {
        libres++;
      }
    }
  }

  return { ocupadas, libres };
}

// Busca el primer par de butacas libres contiguas horizontalmente (en la misma fila)
// Si hay varios pares, devuelve el primero encontrado
// Si no hay ninguno, lo indica claramente
function buscarButacasContiguas(sala: MatrizButacas): string {
  for (let i = 0; i < sala.length; i++) {
    for (let j = 0; j < sala[i].length - 1; j++) {
      if (sala[i][j] === 0 && sala[i][j + 1] === 0) {
        return `✅ Par de butacas contiguas encontrado: Fila ${i + 1}, columnas ${j + 1} y ${j + 2}.`;
      }
    }
  }

  return "❌ No hay butacas contiguas disponibles en ninguna fila.";
}

// ============================================================
//   PROGRAMA PRINCIPAL — ESCENARIOS DE PRUEBA
// ============================================================

console.log("🎬 GESTOR DE BUTACAS — SALA DE PROYECCIÓN");
console.log("   por theazec34\n");

// --- ESCENARIO 1: Sala vacía ---
console.log("─── ESCENARIO 1: Sala vacía (todas las butacas libres) ───");
const sala1 = inicializarSala();
mostrarSala(sala1);
const conteo1 = contarButacas(sala1);
console.log(`Ocupadas: ${conteo1.ocupadas} | Libres: ${conteo1.libres}`);
console.log(buscarButacasContiguas(sala1));

// --- ESCENARIO 2: Sala parcialmente ocupada ---
console.log("\n─── ESCENARIO 2: Sala parcialmente ocupada ───");
const sala2 = inicializarSala();
console.log(reservarButaca(sala2, 1, 3));
console.log(reservarButaca(sala2, 2, 5));
console.log(reservarButaca(sala2, 3, 7));
console.log(reservarButaca(sala2, 1, 3)); // Intento de reservar una butaca ya ocupada
mostrarSala(sala2);
const conteo2 = contarButacas(sala2);
console.log(`Ocupadas: ${conteo2.ocupadas} | Libres: ${conteo2.libres}`);
console.log(buscarButacasContiguas(sala2));

// --- ESCENARIO 3: Sala casi llena (solo butacas sueltas disponibles) ---
console.log("\n─── ESCENARIO 3: Sala casi llena (solo butacas aisladas) ───");
const sala3 = inicializarSala();
// Se ocupan todas excepto tres butacas aisladas sin contiguas
for (let i = 0; i < 8; i++) {
  for (let j = 0; j < 10; j++) {
    const esAislada =
      (i === 0 && j === 0) ||
      (i === 2 && j === 4) ||
      (i === 5 && j === 8);
    if (!esAislada) {
      reservarButaca(sala3, i + 1, j + 1);
    }
  }
}
mostrarSala(sala3);
const conteo3 = contarButacas(sala3);
console.log(`Ocupadas: ${conteo3.ocupadas} | Libres: ${conteo3.libres}`);
console.log(buscarButacasContiguas(sala3));

// --- ESCENARIO 4: Sala completamente llena ---
console.log("\n─── ESCENARIO 4: Sala completamente llena ───");
const sala4 = inicializarSala();
for (let i = 0; i < 8; i++) {
  for (let j = 0; j < 10; j++) {
    reservarButaca(sala4, i + 1, j + 1);
  }
}
mostrarSala(sala4);
const conteo4 = contarButacas(sala4);
console.log(`Ocupadas: ${conteo4.ocupadas} | Libres: ${conteo4.libres}`);
console.log(reservarButaca(sala4, 5, 5)); // Intento de reserva en sala llena
console.log(buscarButacasContiguas(sala4));