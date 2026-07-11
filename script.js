// Arreglo de mascotas 
let mascotas = []; 

function validarFormulario(nombre, propietario, edad) {
    const contenedorError = document.getElementById("mensajeError");
    
    // Ocultar el error antes de validar de nuevo
    contenedorError.style.display = "none";
    contenedorError.textContent = "";

    // Validación: Campos vacíos aplicando trim 
    if (nombre.trim() === "" || propietario.trim() === "" || edad === "") {
        contenedorError.textContent = "Error: Todos los campos son obligatorios.";
        contenedorError.style.display = "block";
        return false;
    }

    // Validación: Nombre de al menos 2 caracteres
    if (nombre.trim().length < 2) {
        contenedorError.textContent = "Error: El nombre de la mascota debe tener al menos 2 caracteres.";
        contenedorError.style.display = "block";
        return false;
    }

    // Validación: Edad número positivo
    if (Number(edad) <= 0) {
        contenedorError.textContent = "Error: La edad debe ser un número positivo mayor a 0.";
        contenedorError.style.display = "block";
        return false;
    }

    // Si pasa todas las validaciones
    return true;
}

function registrarMascota() {
    // Obtener los datos desde el DOM formulario
    const nombreInput = document.getElementById("nombreMascota").value;
    const especieInput = document.getElementById("especieMascota").value;
    const propietarioInput = document.getElementById("propietarioMascota").value;
    const edadInput = document.getElementById("edadMascota").value;

    // Ejecutar la validación
    if (validarFormulario(nombreInput, propietarioInput, edadInput) === false) {
        return; 
    }

    // Crear el objeto de la mascota con trim aplicado a los textos
    const nuevaMascota = {
        nombre: nombreInput.trim(),
        especie: especieInput,
        propietario: propietarioInput.trim(),
        edad: Number(edadInput),
        atendido: false
    };

    // Almacenar en el arreglo
    mascotas.push(nuevaMascota);

    // Limpiar el formulario para la siguiente mascota
    document.getElementById("nombreMascota").value = "";
    document.getElementById("propietarioMascota").value = "";
    document.getElementById("edadMascota").value = "";

    // Actualizar la pantalla y estadísticas automáticamente
    mostrarMascotas();
    actualizarEstadisticas();
}


function mostrarMascotas() {
    const listaDIV = document.getElementById("listaMascotas");
    
    // Limpiar la lista antigua para no duplicar elementos
    listaDIV.innerHTML = "";

    // Recorrer el arreglo usando un ciclo obligatorio
    mascotas.forEach((mascota, indice) => {
        // Crear la tarjetita contenedora
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("mascota-card");

        // Definir la palabra del estado
        let estadoTexto = "Pendiente";
        if (mascota.atendido === true) {
            estadoTexto = "Atendido";
        }

        // Insertar la información básica de la mascota
        tarjeta.innerHTML = `
            <p><b>Mascota:</b> ${mascota.nombre} (${mascota.especie})</p>
            <p><b>Propietario:</b> ${mascota.propietario}</p>
            <p><b>Edad:</b> ${mascota.edad} años</p>
            <p><b>Estado:</b> ${estadoTexto}</p>
        `;

        // Si la mascota está pendiente, le creamos dinámicamente el botón "Atender"
        if (mascota.atendido === false) {
            const botonAtender = document.createElement("button");
            botonAtender.textContent = "Atender";
            botonAtender.classList.add("btn-atender");
            
            // Le pasamos el índice de la mascota para saber cuál cambiar
            botonAtender.onclick = function() {
                cambiarEstado(indice);
            };
            
            tarjeta.appendChild(botonAtender);
        }

        // Agregar la tarjetita a nuestra lista en el HTML
        listaDIV.appendChild(tarjeta);
    });
}