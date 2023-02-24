/*
Login:
    La aplicacion es un simulador de Login, crea usuario e inicia sesion.
    Proximamente esté login va a llevar a la aplicación de la entrega final.

    El sistema compara el usuario y contraseña ingresado contra los datos almacenados en el localStorage.
    Si el usuario no existe, no entra.
    Cuenta con la opcion de registrarse para guardar al usuario en el localStorage
    Mientras cumpla que:
        - No existe un usuario con el mismo nombre
        - El mail ingresado no esté registrado con otro usuario
        - Coincidan las contraseñas ingresadas
        - Edad mayor de 18
*/


//cargo en una variable el contenido del Local Storage
//si es la primera vez, crea un array vacio
let BBDD = JSON.parse(localStorage.getItem("users")) || [];

//Abre modal de registro
const btnRegistro = document.getElementById("btn-register");
btnRegistro.addEventListener("click", (e) => {
    e.preventDefault();
    
    //abre el modal de registro
    const dialog = document.getElementById("dialogReg");
    dialog.showModal();

    //para cerrar el modal
    const salir = document.getElementById("salir");
    salir.addEventListener("click", () => {
        dialog.close();
        dialog.removeAttribute(open);
    });
});


//Registro - Valida los datos y guarda el usuario
const formReg = document.getElementById("formReg");
formReg.addEventListener("submit", (e) => {
    e.preventDefault();

    const dialog = document.getElementById("dialogReg")
    const user = document.getElementById("userReg");
    const mail = document.getElementById("mailReg");
    const pass = document.getElementById("passReg");
    const pass2 = document.getElementById("pass2Reg");
    const date = document.getElementById("dateReg");
    const edad = calcularEdad(date.value);

    if(validarUsuario(user.value, mail.value, pass.value, pass2.value, date.value)){
        guardarUsuario(user.value, mail.value, pass.value, date.value, edad);

        Swal.fire({
            icon: 'success',
            title: 'Ususario creado con exito',
            text: `Nombre: ${user.value}
                   Correo: ${mail.value}`,
          })
        dialog.close();
        limpiarForm(formReg);
    }
});

//Login - valida el usuario e inicia sesion
const miForm = document.getElementById("form");
    miForm.addEventListener("submit", (e) => {

    const user = document.getElementById("user");
    const pass = document.getElementById("pass");


    //compara los datos ingresados con el Local Storage, si no existen, previene la accion del form, si existe, inicia sesion
    let found = BBDD.find(e => (e._user === user.value && e._pass === pass.value));
    if(!found){
        e.preventDefault();
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Usuario o contraseña incorectos',
          });
    }else{
        //guarda al usuario logeado
        localStorage.setItem("loggedUser",JSON.stringify(found));

    }
});

//boton de info
const info = document.getElementById("infoIcon");
info.addEventListener("click", () => {
    clickAfuera();

    Swal.fire({
        icon: 'info',
        title: 'Proyecto Final Javascript',
        text: 'Alumno: Marcelo Falasca'
      })

});

// ------------------ Funciones ------------------

//agrega el usuario al storage mientras no sea un string vacio o null
const guardarUsuario = (user, mail, pass, date, edad) => {
    BBDD.push(new User({_user: user, _mail: mail, _pass: pass, _date: date, _age: edad}));
    localStorage.setItem("users", JSON.stringify(BBDD));
 }

//devuelve false si no se valida la creacion y true si es valida
const validarUsuario = (user, mail, pass, pass2, date) => {
    const dialog = document.getElementById("dialogReg");

    let error = "Error en registro";

    if(BBDD.find(e => e._user === user) !== undefined){
        Swal.fire({
            icon: 'error',
            title: error,
            text: `El ususario "${user} ya está registrado"`,
        })
        dialog.close();

        return false;
    }
    if(BBDD.find(e => e._mail === mail) != undefined){
        Swal.fire({
            icon: 'error',
            title: error,
            text: `Ya existe una cuenta con el correo: "${mail}"`,
        })
        dialog.close();

        return false;
    }
    if(calcularEdad(date) < 18 || calcularEdad(date) > 100){
        Swal.fire({
            icon: 'error',
            title: error,
            text: `La edad debe estár entre 18 y 99 años`,
        })
        dialog.close();

        return false;
    }
    if(pass != pass2){
        Swal.fire({
            icon: 'error',
            title: error,
            text: `Las contraseñas no coinciden`,
          })
        dialog.close();

        return false;
    }
    return true;
}

// --- Dejo comentada esta funcion que habia hecho para modales, porque me pareció interesante el uso de la tag Dialog para modales rapidos, ademas de que se me ocurrió solo --
//crea un modal y lo muestra -> reemplazado por SweetAlert
// const createModal = (titulo, mensaje) => {
//     const modal = document.getElementById("dialog-alert");
//     modal.innerHTML = `
//     <h2> ${titulo} </h2>
//     <div> ${mensaje} </div>
//     <button id="btn-salir" class="exit" type="button"> X </button>
//     `;
//     modal.showModal();

//     clickAfuera();
//     const salir = document.getElementById("btn-salir");
//     salir.addEventListener("click", () => {
//         modal.removeAttribute(open);
//         modal.close();
//     });
//  }

//limpia los valores del form
const limpiarForm = (form) => {
    form.reset();
}

//calcula la edad y la devuelve
const calcularEdad = (date) => {
    let cumple = new Date(date);
    let diferencia = new Date(Date.now() - cumple.getTime());
    let edad = diferencia.getFullYear() - 1970;
    return edad;
}

//verifica si se hace click fuera del modal, lo cierra
//como alternativa al boton salir
const clickAfuera = () => {
    const modal = document.getElementById("dialog-alert");
    window.onclick = (e) => {
        if (e.target == modal) {
            modal.close();
        }
    }
}