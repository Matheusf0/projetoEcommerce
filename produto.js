const { Sequelize } = require('sequelize');
const sequelize = new Sequelize("atacado", "root", "12345", {
    host: "localhost",
    dialect: "mysql"
})
const Produto = sequelize.define('Produto', {
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    img: {
        type: Sequelize.STRING,
        allowNull: false
    },
    quantidade: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    valor: {
        type: Sequelize.FLOAT,
        allowNull: false
    }
});

module.exports = Produto;

//Produto.sync({force: true});