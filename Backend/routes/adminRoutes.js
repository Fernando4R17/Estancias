import express from 'express';
const router = express.Router();
import { obtenerEncargado,mostrarAsesor, mostrarCarreras, mostrarMaestros, asignarGrupo, obtenerMaestro, removerGrupoAsignado, mostrarGrupos, mostrarAlumnos, mostrarEmpresas, crearEmpresa, obtenerEmpresa, editarEmpresa, eliminarEmpresa } from '../controllers/adminController.js';
import checkAuth from '../middleware/AuthMiddleWare.js';

router.route('/')
    .get(checkAuth, obtenerEncargado)

router.route('/maestros')
    .get(checkAuth, mostrarMaestros)

router.route('/maestros/:id')
    .get(checkAuth, obtenerMaestro)
    .put(checkAuth, asignarGrupo)

router.route('/carreras')
    .get(checkAuth, mostrarCarreras)

router.route('/grupos')
    .get(checkAuth, mostrarGrupos)

router.route('/grupos/:id')
    .get(checkAuth, mostrarAlumnos)
    .put(checkAuth, removerGrupoAsignado)

router.route('/grupos/:id/asesor')
    .get(checkAuth, mostrarAsesor)

router.route('/empresas')
    .get(checkAuth, mostrarEmpresas)
    .post(checkAuth, crearEmpresa)

router.route('/empresas/:id')
    .get(checkAuth, obtenerEmpresa)
    .put(checkAuth, editarEmpresa)
    .delete(checkAuth, eliminarEmpresa)

export default router;