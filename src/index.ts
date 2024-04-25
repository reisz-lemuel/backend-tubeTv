import express, { Request, Response, NextFunction} from 'express';
import advertisementRoutes from './routes/advertisements';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 1000;

app.use(express.json());
app.use(cors());
app.use('/advertisements', advertisementRoutes); // 

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