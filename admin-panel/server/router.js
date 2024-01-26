import express from 'express';
import multer from 'multer';

import * as EntityController from './controllers/Table/EntityController.js';
import * as BlobController from './controllers/Blob/BlobController.js';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/:tableName/allEntities', EntityController.getAll);


router.post('/:tableName/entity/', EntityController.createEntity);
router.patch('/:tableName/entity/', EntityController.editEntity);
router.delete('/:tableName/entity/', EntityController.deleteEntity);


router.post('/upload', upload.any(), BlobController.create);
router.post('/deleteBlob', BlobController.deleteBlob);


export default router;