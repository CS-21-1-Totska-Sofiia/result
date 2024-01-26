import express from 'express';
import * as CategoryController from './controllers/CategoryController.js';
import * as GoodController from './controllers/GoodController.js';

const router = express.Router();


router.get('/categories', CategoryController.getAll);
router.get('/goods/:category', GoodController.getByCategory);

router.get('/goods/:partitionKey/:rowKey', GoodController.getOne);

export default router;