const mysql = require('mysql')
const dotenv = require('dotenv');
dotenv.config();
//SA .ENV PEDE KA GUMAWA NETO EXAMPLE  HOST:localhost or pede rin dirrect na kagaya ng naka OR jan na ||  'localhost' 

const connection = mysql.createConnection({
  host:process.env.HOST ||'localhost' , //LOCALHOST LNG TO
  user: process.env.USER || 'root',//username ng mysql mo
  password: process.env.PASSWORD || 'password ng mysql mo',//password ng msysql mo pag wala wag mona lagyan
  database: process.env.DATABASE || 'database name mo',
})


connection.connect()


export default connection;