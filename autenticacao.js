// Middleware para verificar se o usuário está autenticado
function verificarAutenticacao(req, res, next) {
    // Verifica se a sessão de login está definida
    if (req.session.login) {
        // Se o usuário estiver autenticado, continua para a próxima rota
        next();
    } else {
        // Se o usuário não estiver autenticado, redireciona para a página de login
        res.redirect("/login");
    }
}

// Exporte o middleware para ser usado em outros arquivos
module.exports = verificarAutenticacao;