// Agregar al inicio de tu archivo script.js
document.addEventListener("DOMContentLoaded", function () {
    // Funcionalidad del cambio de tema
    const themeToggle = document.getElementById("themeToggle");
    const root = document.documentElement;
    const themeIcon = themeToggle.querySelector("i");

    // Verificar si hay un tema guardado
    const savedTheme = localStorage.getItem("theme") || "light";
    root.setAttribute("data-theme", savedTheme);
    updateThemeIcon(savedTheme);

    // Función para actualizar el ícono según el tema
    function updateThemeIcon(theme) {
        if (theme === "light") {
            themeIcon.className = "fas fa-moon";
        } else {
            themeIcon.className = "fas fa-sun";
        }
    }

    // Evento para cambiar el tema
    themeToggle.addEventListener("click", () => {
        const currentTheme = root.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        
        root.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        updateThemeIcon(newTheme);
    });
    
});

document.addEventListener("DOMContentLoaded", function () {
    // Elementos del DOM
    const billAmount = document.getElementById("billAmount");
    const peopleCount = document.getElementById("peopleCount");
    const tipButtons = document.querySelectorAll(".tip-btn");
    const customTip = document.getElementById("customTip");
    const resetBtn = document.getElementById("resetBtn");

    // Elementos de resultado
    const totalTip = document.getElementById("totalTip");
    const tipPerPerson = document.getElementById("tipPerPerson");
    const totalPerPerson = document.getElementById("totalPerPerson");
    const totalBill = document.getElementById("totalBill");

    // Variables para mensajes de error
    const errorMessageBill = createErrorMessage(billAmount);
    const errorMessagePeople = createErrorMessage(peopleCount);
    const errorMessageCustomTip = createErrorMessage(customTip);

    let selectedTip = null; // Cambiado de 0 a null para controlar si se ha seleccionado propina

    // Función para crear mensaje de error
    function createErrorMessage(element) {
        const errorMessage = document.createElement("div");
        errorMessage.className = "error-message";
        element.parentNode.parentNode.appendChild(errorMessage);
        return errorMessage;
    }

    // Manejar los botones de propina
    tipButtons.forEach(button => {
        if (button.tagName === "BUTTON") {
            button.addEventListener("click", function () {
                tipButtons.forEach(btn => {
                    if (btn.tagName === "BUTTON") {
                        btn.classList.remove("selected");
                    }
                });
                this.classList.add("selected");
                selectedTip = parseFloat(this.dataset.tip);
                customTip.value = "";
                calculate();
            });
        }
    });

    // Capturar la propina personalizada
    customTip.addEventListener("input", function () {
        tipButtons.forEach(btn => {
            if (btn.tagName === "BUTTON") {
                btn.classList.remove("selected");
            }
        });
        selectedTip = parseFloat(this.value) || null; // Cambiado de 0 a null
        calculate();
    });

    // Validación y cálculo automático al modificar valores
    billAmount.addEventListener("input", function () {
        validateInput(billAmount, errorMessageBill, "Por favor, ingresa un monto válido.");
        calculate();
    });

    peopleCount.addEventListener("input", function () {
        validateInput(peopleCount, errorMessagePeople, "Por favor, ingresa un número válido de personas.");
        calculate();
    });

    // Función para validar campos
    function validateInput(input, errorMessage, message) {
        const value = parseFloat(input.value);
        if (isNaN(value) || value <= 0) {
            errorMessage.textContent = message;
            errorMessage.style.display = "block";
            input.classList.add("input-error");
            return false;
        } else {
            errorMessage.style.display = "none";
            input.classList.remove("input-error");
            return true;
        }
    }

    // Función de cálculo modificada
    function calculate() {
        const bill = parseFloat(billAmount.value);
        const people = parseInt(peopleCount.value);
        
        // Restablecer valores si no hay propina seleccionada
        if (selectedTip === null) {
            totalTip.textContent = "$0.00";
            tipPerPerson.textContent = "$0.00";
            totalPerPerson.textContent = "$0.00";
            totalBill.textContent = "$0.00";
            return;
        }

        // Validar que todos los campos tengan valores válidos
        if (isNaN(bill) || bill <= 0 || isNaN(people) || people <= 0) {
            return;
        }

        // Cálculos
        const tipAmount = (bill * (selectedTip / 100));
        const totalBillAmount = bill + tipAmount;
        const tipEach = tipAmount / people;
        const totalEach = totalBillAmount / people;

        // Mostrar resultados
        totalTip.textContent = `$${tipAmount.toFixed(2)}`;
        tipPerPerson.textContent = `$${tipEach.toFixed(2)}`;
        totalPerPerson.textContent = `$${totalEach.toFixed(2)}`;
        totalBill.textContent = `$${totalBillAmount.toFixed(2)}`;
    }

    // Funcionalidad del botón reset
    resetBtn.addEventListener("click", function() {
        // Limpiar todos los campos
        billAmount.value = "";
        peopleCount.value = "";
        customTip.value = "";
        selectedTip = null; // Cambiado de 0 a null
        
        // Quitar las clases selected de los botones
        tipButtons.forEach(btn => {
            if (btn.tagName === "BUTTON") {
                btn.classList.remove("selected");
            }
        });
        
        // Resetear resultados
        totalTip.textContent = "$0.00";
        tipPerPerson.textContent = "$0.00";
        totalPerPerson.textContent = "$0.00";
        totalBill.textContent = "$0.00";
        
        // Limpiar mensajes de error
        errorMessageBill.style.display = "none";
        errorMessagePeople.style.display = "none";
        errorMessageCustomTip.style.display = "none";
        
        // Quitar clases de error
        billAmount.classList.remove("input-error");
        peopleCount.classList.remove("input-error");
        customTip.classList.remove("input-error");
    });

    
    // Agregar después de las constantes iniciales en tu script.js
const shareWhatsappBtn = document.getElementById("shareWhatsappBtn");

// Agregar la función para compartir por WhatsApp
function shareViaWhatsapp() {
    const bill = parseFloat(billAmount.value);
    const people = parseInt(peopleCount.value);
    
    if (isNaN(bill) || bill <= 0 || isNaN(people) || people <= 0 || isNaN(selectedTip) || selectedTip < 0) {
        alert("Por favor, completa todos los campos correctamente antes de compartir");
        return;
    }

    const message = `
 *Resumen de la cuenta*
 -Monto: $${billAmount.value}
 -Personas: ${peopleCount.value}
 -Propina: ${selectedTip}%

*Resultados:*
-Total de propina: ${totalTip.textContent}
-Propina por persona: ${tipPerPerson.textContent}
-Total por persona: ${totalPerPerson.textContent}
-Total a pagar: ${totalBill.textContent}
`.trim();

    // Codificar el mensaje para la URL
    const encodedMessage = encodeURIComponent(message);
    
    // Crear el enlace de WhatsApp
    const whatsappURL = `https://wa.me/?text=${encodedMessage}`;
    
    // Abrir en una nueva pestaña
    window.open(whatsappURL, '_blank');
}

// Agregar el evento click al botón de compartir
shareWhatsappBtn.addEventListener("click", shareViaWhatsapp);

});