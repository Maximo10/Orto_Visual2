import java.util.Random;

public class GeneradorSudoku {
    // Definición tamaño tablero
    // declaración de dato global que no se modifica
    private static final int tamaño = 9;    // Tamaño total del tablero (9x9)
    private static final int sub_tamaño = 3; // Tamaño de cada subcuadrante (3x3)

    // Definición tablero (matriz 9x9)
    private int[][] tablero = new int[tamaño][tamaño];
    private Random random = new Random(); // Generador de números aleatorios
    
    public static void main(String[] args) {
        GeneradorSudoku generador = new GeneradorSudoku();

        System.out.println("Generando un tablero de Sudoku...");
        generador.generarTablero();

        System.out.println("\nTablero generado:");
        generador.imprimirTablero();
    }
    
    // Creación del tablero
    public void generarTablero(){
        // Llenar el tablero con ceros inicialmente
        for (int i = 0; i < tamaño; i++) {
            for (int j = 0; j < tamaño; j++) {
                tablero[i][j] = 0; // Inicializa cada celda a 0 (vacía)
            }
        }
        // Intentamos colocar números aleatorios en cada posición
        for (int fila = 0; fila < tamaño; fila++) {
            for (int columna = 0; columna < tamaño; columna++) {
                // Para cada celda llamamos a colocarNumeroAleatorio.
                // Si devuelve false, se imprime un mensaje de fallo para esa posición.
                if (!colocarNumeroAleatorio(fila, columna)) {
                    System.out.println("No se pudo generar un número válido para la posición (" + fila + "," + columna + ")");
                }
            }
        }
    }

    private boolean colocarNumeroAleatorio(int fila, int columna){
        // Si la posición ya tiene un número distinto de 0, no hacemos nada y devolvemos true
        if (tablero[fila][columna] != 0) {
            return true;
        }
        // Probamos números del 1 al 9 en orden aleatorio sin repetir intentos
        boolean[] numerosUsados = new boolean[10]; // índices 0..9, usaremos 1..9
        for (int intentos = 0; intentos < 9; intentos++) {
            int numero = random.nextInt(9) + 1; // genera 1..9 aleatorio
            // Si ya probamos este número, continuamos al siguiente intento
            if (numerosUsados[numero]) {
                continue;
            }
            numerosUsados[numero] = true; // marcamos que ya probamos ese número
            // Verificamos si es válido colocar este número en la fila/columna/cuadrante
            if (esMovimientoValido(fila, columna, numero)) {
                tablero[fila][columna] = numero; // colocamos el número si es válido
                return true; // éxito
            }
        }
        // Si después de probar hasta 9 números no encontramos ninguno válido, devolvemos false
        return false;
    }

    private boolean esMovimientoValido(int fila, int columna, int numero){
        // Verificamos la fila: si el número ya existe en la fila, no es válido
        for (int i = 0; i < tamaño; i++) {
            if (tablero[fila][i] == numero) {
                return false;
            }
        }
        // Verificamos la columna:
        for (int i = 0; i < tamaño; i++) {
            //si el número ya existe en la columna, no es válido
            if (tablero[i][columna] == numero) {
                return false;
            }
        }
        // Verificamos el cuadrante 3x3 correspondiente
        int inicio_fila = fila - fila % sub_tamaño; //declarmos la fila donde empieza el bloque 3x3
        int inicio_columna = columna - columna % sub_tamaño; //declarmos la columna donde empieza el bloque 3x3
        for (int i = 0; i < sub_tamaño; i++) {
            for (int j = 0; j < sub_tamaño; j++) {
                if (tablero[inicio_fila + i][inicio_columna + j] == numero) {
                    return false;
                }
            }
        }
        // Si pasa todas las comprobaciones, el movimiento es válido
        return true;
    }

    public void imprimirTablero() {
        for (int i = 0; i < tamaño; i++) {
            // Imprime una línea separadora cada 3 filas para la visualización tipo Sudoku
            if (i > 0 && i % sub_tamaño == 0) {
                System.out.println("---------------------");
            }
            for (int j = 0; j < tamaño; j++) {
                // Imprime una barra vertical cada 3 columnas para separar subcuadrantes
                if (j > 0 && j % sub_tamaño == 0) {
                    System.out.print("| ");
                }
                System.out.print(tablero[i][j] + " "); // imprime el valor (0 si está vacío)
            }
            System.out.println(); // nueva línea al terminar cada fila
        }
    }
}