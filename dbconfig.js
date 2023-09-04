const mysql = require('mysql')


const connection = mysql.createConnection({

    host : "localhost",
    user : "root",
    password : "error101",
    database : "todo-db"
})

connection.connect((err)=>{

    if (err) 
    {
        console.log(`Connection error occued => ${err}`)
        connection.end()
        return
        
    }

})


module.exports = connection