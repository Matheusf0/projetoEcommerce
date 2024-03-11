const { Sequelize } = require('sequelize');
const sequelize = new Sequelize("atacado", "root", "12345", {
    host: "localhost",
    dialect: "mysql"
})
const Usuario = sequelize.define("contas", {
    usuario: {
        type: Sequelize.STRING,
        validate: {
            len: [6, Infinity]
        }
    },
    senha: {
        type: Sequelize.STRING,
        validate: {
            len: [6, Infinity]
        }
    }
});

module.exports = Usuario;

//Usuario.sync({ force: true })