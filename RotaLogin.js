const express = require('express');
const router = express.Router();
const Usuario = require('./usuarios.js');

// Rota para renderizar a página de login
router.get('/login', (req, res) => {
    res.render('Pagelogin', { pageTitle: 'Login', stylesheet: 'PageLogin.css' });
});

// Rota para processar o login
router.post("/login", (req, res) => {
    const { usuario, senha } = req.body;
    // Procurar o usuário no banco de dados
    Usuario.findOne({
        where: {
            usuario: usuario,
            senha: senha
        }
    }).then(usuario => {
        if (usuario) {
            // Se o usuário existir, definir a sessão de login
            req.session.login = usuario.usuario;
            res.redirect('/catalogo');
        } else {
            // Se as credenciais estiverem incorretas, redirecionar para a página de login com uma mensagem de erro
            res.render("Pagelogin", { error: "Credenciais inválidas. Por favor, tente novamente." });
        }
    }).catch(error => {
        // Em caso de erro, lidar com ele adequadamente
        console.error("Erro ao buscar usuário no banco de dados:", error);
        res.status(500).send("Erro ao tentar fazer login. Por favor, tente novamente mais tarde.");
    });
});

// Exporte o router para ser usado em outros arquivos
module.exports = router;