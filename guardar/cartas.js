"use strict";
const fs = require('fs');
const prompt = require('prompt-sync')();

let lista_cartas=[];
let tipo_archivo="";
let nombre_archivo="";

/*Funcion carga de datos*/
function leerdatos(){
    console.log("\nTipos de Archivo \n1.Json \n2.Txt");
    let opcion=prompt("Seleccione el tipo de archivo: ").toLowerCase();
    switch(opcion){
        case "1":
            tipo_archivo="json";
            nombre_archivo="cartas.json"
            break;
        case "2":
            tipo_archivo="txt";
            nombre_archivo="cartas.txt";
            break;
        default:
            console.log("Error, el tipo de archivo es inválido....");
            break;
    }
    if(fs.existsSync(nombre_archivo)){
        let data=fs.readFileSync(nombre_archivo,"utf-8");
        if(data.length>0){
            if(tipo_archivo==="json"){
                lista_cartas=JSON.parse(data);
            }else{
                let info=data.split("\n");
                for(let i=0;i<info.length;i++){
                    if(info[i]!==""){
                        lista_cartas.push(JSON.parse(info[i]));
                    }
                }
            }
        }
    }
    console.log("Datos Cargados...");
}

/*Funcion guardar de datos*/
function guardardatos(){
    if(tipo_archivo==="json"){
        fs.writeFileSync(nombre_archivo,JSON.stringify(lista_cartas,null,2));
    }else{
        let texto="";
        for(let i=0;i<lista_cartas.length;i++){
            texto+= JSON.stringify(lista_cartas[i])+"\n";
        }
        fs.writeFileSync(nombre_archivo,texto);
    }
}

/*Funciones*/
function alta_ficha(){
    const nombre=prompt("Ingrese Nombre: ");
    const apellidos=prompt("Ingrese Apellodo: ");
    const edad=parseInt(prompt("Ingrese Edad: "));
    const departamento=prompt("Ingrese Departamento: ");
    const posicion=prompt("Ingrese Posicion: ");
    if(isNaN(edad) || edad<=0){
        console.log("Error, la edad es inválida....");
        alta_ficha();
        return;
    }
    let ficha={nombre,apellidos,edad,departamento,posicion};
    lista_cartas.push(ficha);
    guardardatos();
    console.log("Nueva Ficha Agregada...");
}

function mostrar(){
    console.log("Opciones de visualización \n1.Mostra todos \n2.Busqueda por nombre \n3.Volver");
    let opcion=prompt("Seleccione opción: ");
    switch(opcion){
        case "1":
            console.log(lista_cartas);
            break;
        case "2":
            let nombre= prompt("Nombre a buscar: ").toLowerCase();
            let objetivo=[];
            for(let i=0;i<lista_cartas.length;i++){
                if(lista_cartas[i].nombre.toLowerCase()===nombre){
                    objetivo.push(lista_cartas[i]);
                }
            }
            if(objetivo.length>0){
                console.log(objetivo);
            }else{
                console.log("No se ha encontrado la ficha deseada....");
            }
            break;
        default:
            console.log("Error con el dato....");
            break;
    }
}

function modificar(){
    for(let i=0;i<lista_cartas.length;i++){
        console.log((i+1),"-",lista_cartas[i].nombre,"-",lista_cartas[i].apellidos);
    }
    let ide=parseInt(prompt("Ingrese el número de la ficha a modificar: "))-1;
    if(ide>=0 && ide<lista_cartas.length){
        console.log("1. Nombre \n2. Apellido \n3. Edad \n4. Departamento \n5. Posición");
        let opcion=parseInt(prompt("Seleccione apartado a modificar: "));
        switch(opcion){
            case 1:
                lista_cartas[ide].nombre=prompt("Nuevo Nombre: ");
                break;
            case 2:
                lista_cartas[ide].apellidos=prompt("Nuevo Apellodo: ");
                break;
            case 3:
                lista_cartas[ide].edad=parseInt(prompt("Nuevo Edad: "));
                break;
            case 4:
                lista_cartas[ide].departamento=prompt("Nuevo Departamento: ");
                break;
            case 5:
                lista_cartas[ide].posicion=prompt("Nuevo Posicion: ");
                break;
            default:
                console.log("Opción Inválida....");
                break;
        }
        guardardatos();
        console.log("Ficha modificada");
    }else{
        console.log("Error, opción inválida");
    }
}

function borra(){
    for(let i=0;i<lista_cartas.length;i++){
        console.log((i+1),"-",lista_cartas[i].nombre,"-",lista_cartas[i].apellidos);
    }
    let num=parseInt(prompt("Ingrese el número de ficha a borrar: "))-1;
    if(num>=0 && num<lista_cartas.length){
        let confi=prompt("Elimonar a "+lista_cartas[num].nombre+"? (Si/No): ")
        if(confi.toLowerCase()==="si"){
            lista_cartas.splice(num,1);
            guardardatos();
            console.log("Ficha eliminada");
        }
    }else{
        console.log("Ficha inexistente...");
    }
}

/*Menu */
function menu_princi(){
    let fin=false;
    while(!fin){
        console.log("\n=== Menu Principal ===\n1.Alta Ficha \n2.Mostrar \n3.Modificar \n4.Borrado \n5.Salir")
        let opcion=prompt("Seleccione opción: ");
        switch(opcion){
            case "1":
                alta_ficha();
                break;
            case "2":
                mostrar();
                break;
            case "3":
                modificar();
                break;
            case "4":
                borra();
                break;
            case "5":
                guardardatos();
                console.log("Saliendo.....");
                fin=true;
                break;
            default:
                console.log("Opción Inválida");
        }
    }
}
leerdatos();
menu_princi();


/*
Crear un program de cartas
=> Se pide que el usuario seleccione las funciones en base 
    al tipo de archivo que seleccione el usuario: JSON y TXT
=> Un segundo Menu donde:
    1.Alta Ficha
    2.Modificar
    3.Mostrar Fichas con filtro
    4.Borrado
    5.Salir

Info Ficha
-Nombre
-Apellido
-Edad
-Departamento
-Posicion
*/

/*
Inicio 
    preguntar al usuario tipo de archivo
        si selecciona .json
            leer el archivi json y comenzar con el programa
        si selecciona .txt
            leer el archivo txt e iniciar el programa
        si selecciona otra opción
            mostrar mensaje de error
funciones programa
    Alta_ficha
        funcion que da de alta a la ficha seleccionada
        Mostrar fichas
        Preguntar por ficha a dar de alta
        si el usuario introduce una ficha correcta
            dar de altra a la ficha
            motrar un mensaje de con la actualuzacion de la ficha
        si no mostrar mensaje error y llamar a la funcion de nuevo
    Modificar
        Mostrar fichas
        Preguntar por ficha a modificar
        si la ficha es correcta
            mostrar menu de opciones de modificar eje: Nombre,Apellido...
            preguntar por opción
            si la opcion es correcta
                actualuzar el dato de la ficha
                mostrar mensaje de actualización
            si no mostrar mensaje de error 
                reintentar
        si la ficha no es correcta
            mensaje error
        si no salir
    Mostrar
        funcion que mustra las fichas
        submrenu
            mostra todas las fichas
            mostra ficha por nombre introducido
            salir
    Borrar
        mostrar la lista de fiochas
        preguntar por ficha a eliminar
            preguntar si esta seguro
                eliminar
            si no esta seguro regresar al menu del programa
    Salir 
        regresa al menu principal


Departamento de Finanzas
Departamento de Recursos Humanos
Departamento de Marketing y Publicidad
Departamento Comercial
Departamento de Compras
Departamento de Logística
Departamento de Gestión y Administración
Departamento Directivo
Departamento IT o departamento tecnológico
*/