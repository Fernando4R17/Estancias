import express from 'express';
const router = express.Router();
import {registrar, perfil, autenticar} from '../controllers/usuarioController.js';
import checkAuth from '../middleware/AuthMiddleWare.js';

router.post('/', registrar);
router.post('/login', autenticar);

router.get('/perfil', checkAuth, perfil);

export default router;