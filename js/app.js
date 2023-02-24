/**
 * Entrega Final - Javascript - Coderhouse
 * Marcelo Falasca 
 * 
 * ToDo App
 * ...
 */


let loggedUser = JSON.parse(localStorage.getItem("loggedUser")) || [];
let user = new User(loggedUser);

let BBDD = JSON.parse(localStorage.getItem("users")) || [];


//actualiza el array BBDD y lo sube al localStorage
const guardarSesion = () => {
    for (usuario of BBDD){
        if (usuario._user === user._user){
            usuario._tasks = user._tasks;
        }
    }

    localStorage.setItem("users", JSON.stringify(BBDD));       

    console.log(BBDD);
}

//carga sesion de usuario
const cargarSesion = () => {
    if(user._tasks !== undefined){

        const span = document.getElementById("perfil-usuario");
        span.innerHTML = `
            <a id="btn-user">${user._user}</a>
        `;

        for (usuario of BBDD){
            if ( usuario._user === user._user && usuario._tasks !== undefined ){
                const tareaHoy = document.getElementById("ul-hoy");
                const tareaMañana = document.getElementById("ul-mañana");
                const tareaCompras = document.getElementById("ul-compras");
    
                usuario._tasks.forEach(e => {
                    const li = document.createElement("LI");
    
                    if(e._type === "tarea-hoy"){
                        let content = document.createTextNode(e._content);
                        li.appendChild(content);
    
                        tareaHoy.appendChild(li);
                    }
                    if(e._type === "tarea-mañana"){
                        let content = document.createTextNode(e._content);
                        li.appendChild(content);
    
                        tareaMañana.appendChild(li);
                    }
                    if(e._type === "tarea-compras"){
                        let content = document.createTextNode(e._content);
                        li.appendChild(content);
    
                        tareaCompras.appendChild(li);
                    }
                });
                user._tasks = usuario._tasks;
            }
        }
    }
}
cargarSesion()

//cerrar sesion -> vuelve al login
const cerrarSesion = () => {
        localStorage.removeItem("loggedUser");
        window.location.replace("../index.html");
}


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
          
          for (usuario of BBDD){
            if (usuario._user === user._user){
                usuario._tasks.splice(i, 0);
            }
          }
          user.removerTarea(li.innerText.slice(0, li.innerText.length-2))

          li.remove();
          console.count()
          guardarSesion();
        }
    }
    console.log(user)
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
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'La tarea no puede estar vacia',
          })
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
    guardarSesion();
}
const addBtnHoy = document.getElementById("addHoy");
addBtnHoy.onclick = () => addTask("ul-hoy", "tarea-hoy");

const addBtnMañana = document.getElementById("addMañana");
addBtnMañana.onclick = () => addTask("ul-mañana", "tarea-mañana");

const addBtnCompras = document.getElementById("addCompras");
addBtnCompras.onclick = () => addTask("ul-compras", "tarea-compras");

//boton de perfil
const infoUser = document.getElementById("btn-user");
infoUser.addEventListener("click", () => {
    Swal.fire({
        title: 'Perfil',
        text: `Usuario: ${user._user} - Correo: ${user._mail} - Edad: ${user._age}`,
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Ok',
        confirmButtonText: 'Cerrar Sesion'
      }).then((result) => {
        if (result.isConfirmed) {
           cerrarSesion();
        }
      })
});

//api para consejo random
const pedirConsejo = async () => {
    const resp = await
        fetch("https://api.adviceslip.com/advice");

    const data = await resp.json();

    const span = document.getElementById("span-consejo");
    const h3 = document.createElement("H3");

    h3.innerText = `"${data.slip.advice}"`;

    span.appendChild(h3);
}

pedirConsejo()