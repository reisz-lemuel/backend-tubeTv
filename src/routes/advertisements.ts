import express, { Request, Response, NextFunction} from 'express';
const router = express.Router()
//connection sa db
import connection from '../config/db';
//para sa validation nagaling kay model pero temporary lng siya 
import { Advertisement } from '../models/advertisement';
let advertisements: Advertisement[] = [];
//require to para sa file upload
const path = require('path')
const multer  = require('multer')

//eto yung para sa file or image storing
const storage = multer.diskStorage({
  destination: (req:Request, file:Express.Multer.File, cb: (error: Error | null, destination: string)=> void) => {
    cb(null, 'uploads/');
  },
  filename: (req:Request, file:Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
    console.log(file)
    cb(null, Date.now() + path.extname(file.originalname) );
  }
});

const upload = multer({ storage: storage });


router.use("/uploads", express.static("uploads"));


//pagpush ng data and image sa db naitn
router.post('/', upload.single('image'), function (req:Request, res) {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const task: Advertisement = {
    id: req.body.id,
    title: req.body.title,
    description: req.body.description,
    image: req.file.filename
  };

  connection.query(`INSERT INTO advertisement (title, description, image) VALUES ('${task.title}', '${task.description}', '${task.image}')`, (err:any, rows:any[], fields:any)=>{
    if(err) throw err
        res.json({msg: '1 ads was inserted'})
       
} )

});



//pagdisplay ng data galing sa db 
router.get('/', (req: Request, res: Response) => {
  
  connection.query('SELECT * FROM advertisement', (err:any, rows:any[], fields:any)=>{

    if(err) throw err
    res.json(rows)

  });
});
router.get('/:id', (req: Request, res: Response) => {
  const {id} = req.params

  connection.query(`SELECT * FROM advertisement WHERE id = ${id}`, (err:any, rows:any[], fields:any)=>{


    if(err) throw err
    res.json(rows)

  });
}); 





//pagupdate ng data sa db natin 
router.put('/',upload.single('image'), (req:Request, res:Response)=>{
  
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  const task: Advertisement = {
    id: req.body.id,
    title: req.body.title,
    description: req.body.description,
    image: req.file.filename
  };

  connection.query(`UPDATE advertisement SET title = '${task.title}', image = '${task.image}', description = '${task.description}' WHERE id= '${task.id}'`, (err:any, rows:any[], fields:any)=>{
    if(err) throw err
        res.json({msg: '1 ads was updated'})
       
} )
  

} );


//pagdelete ng data sa db natin
router.delete('/', (req, res)=>{
  var id = req.body.id



  if (typeof id === 'undefined' || id === null) {
    return res.status(400).json({ error: 'Missing required parameter: id' });
  }
  connection.query(`DELETE FROM advertisement WHERE id ='${id}'`, (err:any, rows:any[], fields:any)=>{
      if(err) throw err
          res.json({msg: '1 ads was DELETED'})
         
  } )

})


module.exports = router;