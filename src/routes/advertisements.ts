import { Router, Request, Response } from 'express';
import { Advertisement } from '../models/advertisement';
import { body, validationResult } from 'express-validator';

const router = Router();
let advertisements: Advertisement[] = [];

const advertisementValidationRules = [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required')
];

router.post('/', advertisementValidationRules, (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

   const task: Advertisement = {
    id: advertisements.length + 1,
    title: req.body.title,
    description: req.body.description,
    image: req.body.image
  };

  advertisements.push(task);
  res.status(201).json(task)
});

router.put('/:id', advertisementValidationRules, (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

const task = advertisements.find((t) => t.id === parseInt(req.params.id));

  if (!task) {
    res.status(404).send('Advertisement not found');
  } else {
    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;

    res.json(advertisements);
  }

});
//create an advertisement
router.post('/', (req: Request, res: Response) => {
  const newAdvertisement: Advertisement = {
    id: advertisements.length + 1,
    title: req.body.title,
    description: req.body.description,
    image: req.body.image
    
  };
  advertisements.push(newAdvertisement);
  res.status(201).json(newAdvertisement);
});
//read all advertisement
router.get('/', (req: Request, res: Response) => {
  res.json(advertisements)
});
//read a single advertisement
router.get('/:id', (req: Request, res: Response) => {
  const advertisement = advertisements.find((t) => t.id === parseInt(req.params.id));

  if(!advertisement) {
    res.status(404).send('Advertisement not found');

  } else {
    res.json(advertisement);
  }
});
//update advertisement
router.put('/id', (req: Request, res: Response) => {
  const advertisement = advertisements.find((t) => t.id === parseInt(req.params.id));
  
  if(!advertisement){
    res.status(404).send('Advertisement not found');
  } else {
    advertisement.title = req.body.title || advertisement.title;
    advertisement.description = req.body.description || advertisement.description;
    
    res.json(advertisement);
  }
})
//delete advertisement
router.delete('/:id', (req: Request, res: Response) => {
  const index = advertisements.findIndex((t) => t.id === parseInt(req.params.id));

  if (index === -1) {
    res.status(404).send('Advertisement not found');
  } else {
    const deletedAdvertisement = advertisements.splice(index, 1)[0];
    res.status(200).json({ message: 'Advertisement deleted', deletedAdvertisement });
  }
});

 


export default router;