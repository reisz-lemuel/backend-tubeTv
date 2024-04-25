import express, { Request, Response, NextFunction} from 'express';
import advertisementRoutes from './routes/advertisements';
import cors from 'cors';
import { Advertisement } from './models/advertisement';
const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost', 
  user: 'root', //username
  password: '',//password ng sql mo pag wala wagmona lagyan
  database: 'tube_tv',//database name mo
})
connection.connect()




let advertisements: Advertisement[] = [];

const app = express();
const port = process.env.PORT || 1000;

app.use(express.json());

app.use(express.urlencoded({extended:false}))
app.use(cors());
//app.use('/advertisements', advertisementRoutes); 


app.get('/advertisement', (req: Request, res: Response) => {
  
  connection.query('SELECT * FROM advertisement', (err:any, rows:any, fields:any)=>{

    if(err) throw err
    res.json(rows)

  });
});


app.get('/advertisement', (req: Request, res: Response) => {
  
  connection.query('SELECT * FROM advertisement', (err:any, rows:any, fields:any)=>{

    if(err) throw err
    res.json(rows)

  });
});

app.post('/advertisement', (req: Request, res: Response) => {

  const task: Advertisement = {
    id: advertisements.length + 1,
    title: req.body.title,
    description: req.body.description,
    image: req.body.image
  };

 

  connection.query(`INSERT INTO advertisement (title, description, image) VALUES ('${task.title}', '${task.description}', '${task.image}')`, (err:any, rows:any, fields:any)=>{
    if(err) throw err
        res.json({msg: '1 ads was inserted'})
       
} )
});


app.put('/advertisement', (req:Request, res:Response)=>{


  const task: Advertisement = {
    id: advertisements.length + 1,
    title: req.body.title,
    description: req.body.description,
    image: req.body.image
  };

  connection.query(`UPDATE advertisement SET title = '${task.title}', image = '${task.image}', description = '${task.description}' WHERE id= '${task.id}'`, (err:any, rows:any, fields:any)=>{
    if(err) throw err
        res.json({msg: '1 ads was updated'})
       
} )
  

} );



app.delete('/advertisement', (req, res)=>{
  const id = req.body.id

  connection.query(`DELETE FROM advertisement WHERE id= '${id}'`, (err:any, rows:any, fields:any)=>{
      if(err) throw err
          res.json({msg: '1 ads was DELETED'})
         
  } )

})


app.get('/', (req: Request, res: Response) => {
  res.send('Hello!');
});


app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong');
});
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});









export default connection;