import java.util.Random;

public class GeneradorSudoku {
    // Tamaño del tablero
    private static final int TAMANO = 9;
    private static final int SUBTAMANO = 3;
    
    // Tablero del Sudoku
    private int[][] tablero = new int[TAMANO][TAMANO];
    private Random random = new Random();
    
    public static void main(String[] args) {
        GeneradorSudoku generador = new GeneradorSudoku();
        
        System.out.println("Generando un tablero de Sudoku...");
        generador.generarTablero();
        
        System.out.println("\nTablero generado:");
        generador.imprimirTablero();
    }
    
    public void generarTablero() {
        // Llenamos el tablero con ceros inicialmente
        for (int i = 0; i < TAMANO; i++) {
            for (int j = 0; j < TAMANO; j++) {
                tablero[i][j] = 0;
            }
        }
        
        // Intentamos colocar números aleatorios en cada posición
        for (int fila = 0; fila < TAMANO; fila++) {
            for (int columna = 0; columna < TAMANO; columna++) {
                if (!colocarNumeroAleatorio(fila, columna)) {
                    System.out.println("No se pudo generar un número válido para la posición (" + 
                                     fila + "," + columna + ")");
                }
            }
        }
    }
    
    private boolean colocarNumeroAleatorio(int fila, int columna) {
        // Si la posición ya tiene un número, no hacemos nada
        if (tablero[fila][columna] != 0) {
            return true;
        }
        
        // Probamos números del 1 al 9 en orden aleatorio
        boolean[] numerosUsados = new boolean[10]; // 0-9
        
        for (int intentos = 0; intentos < 9; intentos++) {
            int numero = random.nextInt(9) + 1;
            
            // Si ya probamos este número, seguimos
            if (numerosUsados[numero]) {
                continue;
            }
            
            numerosUsados[numero] = true;
            
            // Verificamos si es válido colocar este número
            if (esMovimientoValido(fila, columna, numero)) {
                tablero[fila][columna] = numero;
                return true;
            }
        }
        
        return false;
    }
    
    private boolean esMovimientoValido(int fila, int columna, int numero) {
        // Verificar fila
        for (int i = 0; i < TAMANO; i++) {
            if (tablero[fila][i] == numero) {
                return false;
            }
        }
        
        // Verificar columna
        for (int i = 0; i < TAMANO; i++) {
            if (tablero[i][columna] == numero) {
                return false;
            }
        }
        
        // Verificar cuadrante 3x3
        int inicioFila = fila - fila % SUBTAMANO;
        int inicioColumna = columna - columna % SUBTAMANO;
        
        for (int i = 0; i < SUBTAMANO; i++) {
            for (int j = 0; j < SUBTAMANO; j++) {
                if (tablero[inicioFila + i][inicioColumna + j] == numero) {
                    return false;
                }
            }
        }
        
        return true;
    }
    
    public void imprimirTablero() {
        for (int i = 0; i < TAMANO; i++) {
            if (i > 0 && i % SUBTAMANO == 0) {
                System.out.println("- - - - - - - - - - -");
            }
            for (int j = 0; j < TAMANO; j++) {
                if (j > 0 && j % SUBTAMANO == 0) {
                    System.out.print("| ");
                }
                System.out.print(tablero[i][j] + " ");
            }
            System.out.println();
        }
    }
}