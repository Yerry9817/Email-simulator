//variables

//seleccionar el boton enviar
const BTNEnviar = document.querySelector('#enviar');

const BTNResetear= document.querySelector('#resetBtn');

// variables para los campos del email
const emailPara = document.querySelector('#email');
//asunto campo
const asuntoInput= document.querySelector('#asunto');

//el mensaje
const mensajeInput = document.querySelector('#mensaje');

//formulario para agregar los mensajes
const form = document.querySelector('#enviar-mail');

//validar email de forma profesional
//expresion regular
//no se pone comillas
const er= /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;



registraEvents();
function registraEvents(){
    document.addEventListener('DOMContentLoaded', iniciarApp);

    //blur cuando se salga del input
    emailPara.addEventListener('blur', validaFormulario);
    asuntoInput.addEventListener('blur', validaFormulario);
    mensajeInput.addEventListener('blur', validaFormulario);
    BTNEnviar.addEventListener('click', enviarMensaje);
    BTNResetear.addEventListener('click', resetearFormulario);
}


function iniciarApp(){
    BTNEnviar.disabled=true;
    BTNEnviar.classList.add('cursor-not-allowed', 'opacity-50');
    BTNEnviar.disabled=false;
}


function validaFormulario(event){
   if(event.target.value.length>0){
       event.target.classList.remove('border', 'border-red-500');
       event.target.classList.add('border', 'border-green-500');
       const error = document.querySelector('p.error');
       error?error.remove():'';
   }else{
       event.target.classList.remove('border', 'border-green-500');
       event.target.classList.add('border', 'border-red-500');
       const error = document.querySelector('p.error');
       mostrarError('todos los campos son necesarios');
   }

   //para validar el campo de email de type="email"
   if(event.target.type==='email'){
       if(er.test(event.target.value)){
        event.target.classList.remove('border', 'border-red-500');
        event.target.classList.add('border', 'border-green-500');
        const error = document.querySelector('p.error');
        error?error.remove():'';
       }else{
        event.target.classList.remove('border', 'border-green-500');
        event.target.classList.add('border', 'border-red-500');
        const error = document.querySelector('p.error');
        mostrarError('formato email necesario');
       }
   }

   //activar el boton enviar
   if(er.test(emailPara.value)&& asuntoInput.value.length>0 && mensajeInput.value.length>0)
   {
       BTNEnviar.classList.remove('cursor-not-allowed', 'opacity-50');
   }
}

function mostrarError(mensaje){
    const error=document.createElement('p');
    error.textContent=mensaje;
    error.classList.add('border', 'border-red-500', 'background-color-100', 'text-red-500', 'p-3', 'error');
    const errores = document.querySelectorAll('.error');
    if(errores.length===0){
        form.appendChild(error);
    }
}


function enviarMensaje(event){
    event.preventDefault();
    
    //seleccionar el spinner
    const spinner = document.querySelector('#spinner');

    //crea el mensaje de enviado
    const MensajeExito=document.createElement('p');
    MensajeExito.textContent='correo enviado con exito';
    MensajeExito.classList.add('border', 'border-green-500', 'background-color-100', 'text-green-500', 'p-3', 'success', 'my-10');

    //aparece el spinner
    spinner.style.display='flex';
    //desactiva el boton mientras carga
    BTNEnviar.classList.add('cursor-not-allowed', 'opacity-50');
    BTNResetear.classList.add('cursor-not-allowed', 'opacity-50');
    setTimeout(()=>{
        spinner.style.display='none';
        const mensajes = document.querySelectorAll('.success');
        mensajes.length===0 ? form.insertBefore(MensajeExito, spinner) : '';
        BTNEnviar.classList.remove('cursor-not-allowed', 'opacity-50');
        BTNResetear.classList.remove('cursor-not-allowed', 'opacity-50');
        setTimeout(()=>{
            MensajeExito.remove();
            resetearFormulario();
        },4000);

    },3000);
}

function resetearFormulario(event){
    event.preventDefault();
    form.reset();
    iniciarApp();
}
