import express, { Request, Response, NextFunction} from 'express';
import cors from 'cors';


const app = express();
const port = process.env.PORT || 1000;
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(cors());



const advertisementRoute = require('./routes/Advertisements')


//etong route na to is yung nasa routes folder meaning magiging localhost:1000/advertisment na siya
app.use('/advertisement', advertisementRoute)



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









