const express = require('express')
const app = express()
const connection = require("./database/database")
const perguntaModel = require("./database/Pergunta")

connection.authenticate().then(() =>{
    console.log("conexão feita com banco de dados")
}).catch((msgErro) => {
    console.log(msgErro)
})


app.set('view engine', 'ejs')
app.use(express.static('public')) // carregar arquivos estaticos como css, js, fotos

//

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get("/", (req, res) => {
    res.render("index")
})

app.get("/perguntar", (req, res) => {
    res.render("perguntar")
})

app.post("/salvarPergunta", (req, res) => {
    let titulo = req.body.titulo
    let descricap = req.body.descricao


})

app.listen(8000,()=>{console.log("App rodando!")})