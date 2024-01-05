import express from 'express';
const router = express.Router();

import { obtenerAlumno, mostrarEmpresas, solicitudInscripcion, obtenerArchivo } from '../controllers/alumnoController.js';
import checkAuth from '../middleware/AuthMiddleWare.js';

router.route('/')
    .get(checkAuth, obtenerAlumno)

router.route('/empresas')
    .get(checkAuth, mostrarEmpresas)

router.route('/solicitud')
    .get(checkAuth, obtenerArchivo)
    .post(checkAuth, solicitudInscripcion)
    

router.route('/solicitud/:id')
    
//     .put(checkAuth, editarArchivoInscripcion)
    


export default router;