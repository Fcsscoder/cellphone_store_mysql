const mysql = require('mysql')

const pool = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'',
    database: 'nodesql'
})

pool.connect((err) => {
    if(err) {
        console.log(err)
        return
    }

    console.log('MySQL conectado!')
})

module.exports = pool
