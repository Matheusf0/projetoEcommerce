CREATE TABLE USUARIOS(
usuario VARCHAR(50),
email VARCHAR(100),
senha VARCHAR(30),
numero VARCHAR(20),
cpf VARCHAR(20) 

);

PARA VER A TABELA
DESCRIBE 

PARA INSERIR DADOS NA TABELA
INSERT INTO produtos(nome, img, quantidade, valor, createdAt, updatedAt) VALUES(
    "fone",
    "/img/IphoneIcon.jpeg",
    123,
    44.34,
    NOW(),
    NOW()
);
LISTAR DADOS
SELECT * FROM USUARIOS;

SELECT * FROM USUARIOS WHERE usuario = "matheus";

DELETE FROM USUARIOS;

DELETE WHERE usuario = "matheus";

UPDATE USUARIOS SET usuario = "nome de teste" WHERE nome = "matheus";







// Verifica se algum campo está vazio
    const camposVazios = Array.from(document.querySelectorAll('#formCriarUsuario input')).some(input => input.value.trim() === '');
    if (camposVazios) {
        event.preventDefault();
        mensagemErroCamposVazios.textContent = "Todos os campos devem ser preenchidos";
    } else {
        mensagemErroCamposVazios.textContent = "";
    }
