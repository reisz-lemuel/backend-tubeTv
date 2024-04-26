const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost', 
  user: 'root', //username
  password: 'Lers12345*',//password ng sql mo pag wala wagmona lagyan
  database: 'tube_tv',//database name mo
})


connection.connect()


export default connection;