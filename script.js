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