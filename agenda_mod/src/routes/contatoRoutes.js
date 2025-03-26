// src/routes/contatoRoutes.js

import express from 'express';
import contatoController from '../controllers/contatoController.js';

const router = express.Router();

router.get('/', contatoController.getAllContatos);
router.get('/:id', contatoController.getContatoById);
router.post('/', contatoController.createContato);
router.put('/:id', contatoController.updateContato);
router.delete('/:id', contatoController.deleteContato);

export default router;