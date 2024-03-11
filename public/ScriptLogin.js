const errorContainer = document.getElementById('errorContainer');
errorContainer.style.display = "none";
document.getElementById('formCriarUsuario').addEventListener('submit', function(event) {
    const usuarioInput = document.querySelector('#formCriarUsuario input[type="text"]');
    const senhaInput = document.querySelector('#formCriarUsuario input[type="password"]');

    if (!usuarioInput.value.trim() || !senhaInput.value.trim()) {
        event.preventDefault(); // Impede o envio do formulário
        errorContainer.style.display = "block";
    } else {
        errorContainer.style.display = "none";
    }
});