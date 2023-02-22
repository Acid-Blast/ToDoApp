/**
 * Entrega Final - Javascript - Coderhouse
 * Marcelo Falasca 
 * 
 * ToDo App
 * ...
 */

// const guardarSesion = (userData) => {
//     //guarda las tareas en el array
//     const tareas = document.getElementsByTagName("LI");
//     for ( let i = 0; i < tareas.length; i++){
//         userData.push(tareas[i].innerText.slice(0, tareas[i].innerText.length-2))
//     }

// }
// let userDataHoy = [];
// guardarSesion(userDataHoy);

let loggedUser = JSON.parse(localStorage.getItem("loggedUser")) || [];
let user = new User(loggedUser);
console.log(user)


//agregar boton para eliminar tarea
const agregarCloseBtn = () => {
    const li = document.getElementsByTagName("LI");
    for ( let i = 0; i < li.length; i++){
        let span = document.createElement("SPAN");
        span.className = "closeBtn";
        
        let content = document.createTextNode("x")
        span.appendChild(content)
        
        li[i].appendChild(span);
    }
}
agregarCloseBtn();

// eliminar una tarea
const eliminarTarea = () => {
    let close = document.getElementsByClassName("closeBtn");
    
    for (i = 0; i < close.length; i++) {
        close[i].onclick = function() {
          let li = this.parentElement;
          
          user.removerTarea(li.innerText.slice(0, li.innerText.length-2))

          li.remove();

          console.log(user)
        }
    }
}
eliminarTarea();

//marcar una tarea
let lista = document.querySelectorAll("UL");
for (let i = 0; i < lista.length; i++){
    lista[i].addEventListener("click", (e) => {
        if ( e.target.tagName === "LI") e.target.classList.toggle("checked");
    });
}

//agregar una tarea
const addTask = (listaID, inputID) => {
    const input = document.getElementById(inputID);
    const close = document.getElementsByClassName("closeBtn");
    const li = document.createElement("LI");
    const txt = document.createTextNode(input.value);

    li.appendChild(txt);

    if(input.value !== ""){
        document.getElementById(listaID).appendChild(li);
        user.agregarTarea(input.value, inputID);
        console.log(user)
    }
    
    input.value = "";

    //agregar boton de eliminar para la nueva tarea
    let span = document.createElement("SPAN");
    let btnValue = document.createTextNode("x");
    span.className = "closeBtn";
    span.appendChild(btnValue);
    li.appendChild(span);

    //funcionalidad de eliminar a la nueva tarea
    for (i = 0; i < close.length; i++) {
        close[i].onclick = function() {
          let liParent = this.parentElement;
        //   li.style.display = "none";
          liParent.remove();
        }
    }

    eliminarTarea();
}

const addBtnHoy = document.getElementById("addHoy");
addBtnHoy.onclick = () => addTask("ul-hoy", "tarea-hoy");

const addBtnMañana = document.getElementById("addMañana");
addBtnMañana.onclick = () => addTask("ul-mañana", "tarea-mañana");

const addBtnCompras = document.getElementById("addCompras");
addBtnCompras.onclick = () => addTask("ul-compras", "tarea-compras");

