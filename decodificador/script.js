// Función para realizar el cifrado o descifrado de César
function cesar(texto, clave, modo) {
    // Función auxiliar para realizar el cifrado o descifrado de un solo carácter
    function cifrarDescifrarCaracter(char, clave, modo) {
        var charCode = char.charCodeAt(0);

        if (char.match(/[a-zA-Z]/)) {
            var base = char >= 'a' ? 'a'.charCodeAt(0) : 'A'.charCodeAt(0);
            var shift = modo === 'encriptar' ? clave : -clave;
            var encryptedCharCode = (charCode - base + shift + 26) % 26 + base;
            return String.fromCharCode(encryptedCharCode);
        } else {
            return char;
        }
    }

    // Aplicar cifrado o descifrado a cada carácter del texto
    return texto.split('').map(char => cifrarDescifrarCaracter(char, clave, modo)).join('');
}

// Función para encriptar el texto utilizando el cifrado de César
function encriptarTexto() {
    var inputText = document.getElementById("inputText").value;
    var clave = 3; // Clave de cifrado (puedes ajustar según tus necesidades)
    var outputText = cesar(inputText, clave, 'encriptar');
    document.getElementById("outputText").value = outputText;
}

// Función para desencriptar el texto
function desencriptarTexto() {
    var inputText = document.getElementById("inputText").value;
    var clave = 3; // Clave de cifrado (debe ser la misma que la usada para encriptar)

    // Intentar desencriptar utilizando la clave actual
    var possibleDecryption = cesar(inputText, clave, 'desencriptar');

    // Si el resultado parece legible, asumimos que es la desencriptación correcta
    if (/^[a-zA-Z\s]+$/.test(possibleDecryption)) {
        document.getElementById("outputText").value = possibleDecryption;
    } else {
        // Si no parece encriptado, simplemente copiamos el texto como está
        document.getElementById("outputText").value = inputText;
    }
}

// Función para copiar el texto encriptado o desencriptado al portapapeles
function copiarTexto() {
    var textToCopy = document.getElementById("outputText");

    if (textToCopy.value) {
        textToCopy.select();
        document.execCommand("copy");
        alert("Texto copiado al portapapeles");
    } else {
        alert("No hay texto para copiar");
    }
}

// Función para pegar el texto encriptado o desencriptado en el cuadro de entrada
function pegarTexto() {
    navigator.clipboard.readText()
        .then((text) => {
            document.getElementById("inputText").value = text;
        })
        .catch((err) => {
            console.error('Error al pegar texto: ', err);
        });
}

// Función para limpiar los campos de texto
function limpiarCampos() {
    document.getElementById("inputText").value = "";
    document.getElementById("outputText").value = "";
}