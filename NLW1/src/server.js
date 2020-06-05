const express = require("express")
const server = express()

//habilitar o uso do req.body
//configurar pasta public
server.use(express.static("public"))

//pegar banco de dados
const db = require("./database/db.js")

//habilitar o uso do req.body
server.use(express.urlencoded({ extended: true }))

//utilizando template 
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

//configurar caminhos 
server.get("/", (req, res) => {
    return res.render("index.html")
})

server.get("/create-point", (req, res) => {
    //para get, a reposta do formulado seria req.query
    return res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {
    //inserir dados

    const query = `
INSERT INTO places(
    image,
    name,
    adress,
    adress2,
    state,
    city,
    itens
) VALUES (?,?,?,?,?,?,?);

`
    const values = [
        req.body.image,
        req.body.name,
        req.body.adress,
        req.body.adress2,
        req.body.state,
        req.body.city,
        req.body.itens
    ]

    function afterInsertData(err) {
        if (err) {
            console.log(err)
            return res.send("Erro no Cadastro!")
        } else {
            console.log("Cadastrado com sucesso")
            console.log(values)
            return res.render("create-point.html", { saved: true })
        }
    }
    db.run(query, values, afterInsertData)


    //para o psoto, que é mais seguro e n exibe os dados no link da apgina, temos o req.body




})

server.get("/search", (req, res) => {

    const search = req.query.search

    if (search == "") {
        //pesquisa vazia
        return res.render("search-results.html", { total: 0 }) //ou somente { places: rows, total }, pois o nome é igual
    }

    //pegar os dados do bd
    db.all(`SELECT * FROM places WHERE city LIKE  '%${search}%'`, function (err, rows) {
        console.log("to aqui")
        if (err) {
            return console.log(err)
        }
        const total = rows.length

        // console.log("Aqui estão seus registros: ")
        //console.log(rows)
        //mostrar a pagina html com os dados do bd
        return res.render("search-results.html", { places: rows, total: total }) //ou somente { places: rows, total }, pois o nome é igual

    })

})

//ligar servidor
server.listen(3000)

