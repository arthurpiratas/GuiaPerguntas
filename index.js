const express = require('express')
const app = express()
const connection = require("./database/database")
const Pergunta = require("./database/Pergunta")
const Resposta = require("./database/Resposta")

var data = new Date() // Capture a data universal
var dataBrasilia = new Date(data.valueOf() - data.getTimezoneOffset() * 60000)

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

    // select * from Perguntas
    Pergunta.findAll({raw: true, order:[['id', 'DESC']]}).then((perguntas) => {
        res.render("index", {
            perguntas: perguntas
        })
    })
    
})

app.get("/perguntar", (req, res) => {
    res.render("perguntar")
})

app.post("/salvarPergunta", (req, res) => {
    let titulo = req.body.titulo
    let descricao = req.body.descricao
    Pergunta.create({ // insert into
        titulo: titulo,
        descricao: descricao,
        createdAt: dataBrasilia,
        updatedAt: dataBrasilia
    }).then(() => {
        res.redirect('/')
    })
})

app.get("/pergunta/:id", (req,res) => {
    var id = req.params.id
    Pergunta.findOne({
        where: {id:id}
    }).then(pergunta => {
        if(pergunta != undefined){
            res.render("pergunta",{
                pergunta: pergunta
            })
        }else{
            res.redirect("/")
        }
    })
})

app.listen(8000,()=>{console.log("App rodando!")})