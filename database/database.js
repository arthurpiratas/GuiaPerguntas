const Sequelize = require('sequelize')
const variaveis = require('./variaveisConexao')


const connection = new Sequelize('guiaperguntas', variaveis.usuario, variaveis.senha, {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection