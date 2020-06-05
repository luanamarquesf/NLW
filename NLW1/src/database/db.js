//importar a dependencia do sqlite3
const sqlite3 = require("sqlite3").verbose()

//iniciar o obj de bd
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db
//depois de criar o bd, comentei tudo para nao ficar sobescevendo
//utilizar o obj db para operações
db.serialize(() => {

    //criar uma tabela
    //chave primaria: campo principaçl para identificar
    /*db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            image TEXT,
            adress TEXT,
            adress2 TEXT,
            state TEXT,
            city TEXT,
            itens  TEXT
        );
    `)*
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
        "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        "Paperside",
        "Guilherme Guembala, Jardim America",
        "Numero 260",
        "Santa Catarina",
        "Rio do Sul",
        "Papéis e Papelão"
    ]
    function afterInsertData(err) {
        if (err) {
            return console.log(err)
        } else {
            console.log("Cadastrado com sucesso")
            console.log(this)
        }
    }
    //db.run(query, values, afterInsertData) //sem () dita q so executa quando chamar, ja com () executa imediatamente 

    //consultar dados
    db.all(`SELECT name FROM places`, function (err, rows) {
        if (err) {
            return console.log(err)
        } else {
            console.log("Aqui estão seus registros: ")
            console.log(rows)
        }
    })*/
    //deletar dados
    /*db.run(`DELETE FROM places WHERE id == ?`, [3], function(err, rows){
        if(err){
            return console.log(err)
        }
        console.log("Registro deletado com sucesso")
        console.log(rows)
    })*/
    
})