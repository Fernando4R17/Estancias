import express from 'express';
const router = express.Router();
import {
    obtenerMaestro,
    obtenerAlumnos,
    verAlumno,
    aceptarArchivo,
    denegarArchivo
} from '../controllers/maestroController.js';
import checkAuth from '../middleware/AuthMiddleWare.js';

router.route('/')
    .get(checkAuth, obtenerMaestro)

router.route('/grupos/:id')
    .get(checkAuth, obtenerAlumnos)

router.route('/alumno/:id')
    .get(checkAuth, verAlumno)

router.route('/alumno/:id/aceptar')
    .get(checkAuth, aceptarArchivo)

router.route('/alumno/:id/denegar')
    .get(checkAuth, denegarArchivo)


export default router;