import SolicitudInscripcion from "../../models/SolicitudInscripcion.js";
import Administrador from "../../models/Administrador.js";
import Usuario from "../../models/Usuario.js";
import Alumno from "../../models/Alumno.js"

const solicitudInscripcion = async (req, res) => {
    const usuario = await Usuario.findById(req.usuario._id);
    const alumno = await Alumno.findById(usuario.alumno_fk);
   
    if(alumno === null){
        return res.json({msg: 'Accion no valida'})
    }

    const validacion = await SolicitudInscripcion.findOne({alumno_fk: usuario.alumno_fk});

    if(validacion !== null){
        return res.json({msg: 'Alumno Ya Tiene Evaluacion'});
    }

    const solicitud = new SolicitudInscripcion(req.body);
    const administrador = await Administrador.findOne({cargo: 'Encargado'})

    solicitud.alumno_fk = req.usuario.alumno_fk;
    solicitud.responsable_fk = administrador._id;

    try {
        const solicitudGuardada = await solicitud.save();
        res.json(solicitudGuardada);
    } catch (error) {
        console.log(error);
    }
}

const archivoInscripcion = async (req, res) => {
    const usuario = await Usuario.findById(req.usuario._id);
    const alumno = await Alumno.findById(usuario.alumno_fk);
   
    if(alumno === null){
        return res.json({msg: 'Accion no valida'})
    }

    const archivo = await SolicitudInscripcion.find().where('alumno_fk').equals(req.usuario.alumno_fk);
    res.json(archivo);
}

const obtenerArchivo = async (req,res) => {
    const usuario = await Usuario.findById(req.usuario._id);
    const alumno = await Alumno.findById(usuario.alumno_fk);
   
    if(alumno === null){
        return res.json({msg: 'Accion no valida'})
    }

    const { id } = req.params;
    const archivo = await SolicitudInscripcion.findById(id);

    if(!archivo){
        return res.status(404).json({ msg: "No encontrado"})
    }

    if(archivo.alumno_fk._id.toString() !== req.usuario.alumno_fk.toString()){
        return res.json({msg: 'Accion no valida'})
    }

    res.json(archivo);
}

const editarArchivoInscripcion = async (req,res) => {
    const usuario = await Usuario.findById(req.usuario._id);
    const alumno = await Alumno.findById(usuario.alumno_fk);
   
    if(alumno === null){
        return res.json({msg: 'Accion no valida'})
    }

    const { id } = req.params;
    const archivo = await SolicitudInscripcion.findById(id);

    if(!archivo){
        return res.status(404).json({ msg: "No encontrado"})
    }

    if(archivo.alumno_fk._id.toString() !== req.usuario.alumno_fk.toString()){
        return res.json({msg: 'Accion no valida'})
    }

    // Actualizar paciente
    archivo.empresa_fk = req.body.empresa_fk || archivo.empresa_fk;
    archivo.responsable_fk = req.body.responsable_fk || archivo.responsable_fk;
    archivo.plan_trabajo = req.body.plan_trabajo || archivo.plan_trabajo;
    archivo.objetivos = req.body.objetivos || archivo.objetivos;
    archivo.inicio = req.body.inicio || archivo.inicio;
    archivo.termino = req.body.termino || archivo.termino;
    archivo.horario_establecido = req.body.horario_establecido || archivo.horario_establecido;
    archivo.actividades_desarrollar = req.body.actividades_desarrollar || archivo.actividades_desarrollar;
    archivo.aceptado = req.body.aceptado || archivo.aceptado;

    try {
        const archivoActualizado = await archivo.save()
        res.json(archivoActualizado);
    } catch (error) {
        console.log(error);
    }
}

const eliminarArchivo = async (req,res) => {
    const usuario = await Usuario.findById(req.usuario._id);
    const alumno = await Alumno.findById(usuario.alumno_fk);
   
    if(alumno === null){
        return res.json({msg: 'Accion no valida'})
    }

    const { id } = req.params;
    const archivo = await SolicitudInscripcion.findById(id);

    if(!archivo){
        return res.status(404).json({ msg: "No encontrado"})
    }

    if(archivo.alumno_fk._id.toString() !== req.usuario.alumno_fk.toString()){
        return res.json({msg: 'Accion no valida'})
    }

    try {
        await archivo.deleteOne()
        res.json({msg: 'Archivo eliminado'})
    } catch (error) {
        console.log(error);
    }
}


export {
    solicitudInscripcion,
    archivoInscripcion,
    obtenerArchivo,
    editarArchivoInscripcion,
    eliminarArchivo
}