import PlanTrabajo from "../../models/PlanTrabajo.js";
import Usuario from "../../models/Usuario.js";
import Alumno from "../../models/Alumno.js"

const crearPlan = async (req, res) => {
    const usuario = await Usuario.findById(req.usuario._id);
    const alumno = await Alumno.findById(usuario.alumno_fk);
   
    if(alumno === null){
        return res.json({msg: 'Accion no valida'})
    }

    const validacion = await PlanTrabajo.findOne({alumno_fk: usuario.alumno_fk});

    if(validacion !== null){
        return res.json({msg: 'Alumno Ya Tiene Plan de Trabajo'});
    }

    const solicitud = new PlanTrabajo(req.body);
    solicitud.alumno_fk = req.usuario.alumno_fk;
    try {
        const solicitudGuardada = await solicitud.save();
        res.json(solicitudGuardada);
    } catch (error) {
        console.log(error);
    }
}

const planActividad = async (req, res) => {
    const usuario = await Usuario.findById(req.usuario._id);
    const alumno = await Alumno.findById(usuario.alumno_fk);
   
    if(alumno === null){
        return res.json({msg: 'Accion no valida'})
    }

    const archivo = await PlanTrabajo.find().where('alumno_fk').equals(req.usuario.alumno_fk);
    res.json(archivo);
}

const obtenerPlan = async (req,res) => {
    const usuario = await Usuario.findById(req.usuario._id);
    const alumno = await Alumno.findById(usuario.alumno_fk);
   
    if(alumno === null){
        return res.json({msg: 'Accion no valida'})
    }

    const { id } = req.params;
    const archivo = await PlanTrabajo.findById(id);

    if(!archivo){
        return res.status(404).json({ msg: "No encontrado"})
    }

    if(archivo.alumno_fk._id.toString() !== req.usuario.alumno_fk.toString()){
        return res.json({msg: 'Accion no valida'})
    }

    res.json(archivo);
}

const editarPlan = async (req,res) => {
    const usuario = await Usuario.findById(req.usuario._id);
    const alumno = await Alumno.findById(usuario.alumno_fk);
   
    if(alumno === null){
        return res.json({msg: 'Accion no valida'})
    }

    const { id } = req.params;
    const archivo = await PlanTrabajo.findById(id);

    if(!archivo){
        return res.status(404).json({ msg: "No encontrado"})
    }

    if(archivo.alumno_fk._id.toString() !== req.usuario.alumno_fk.toString()){
        return res.json({msg: 'Accion no valida'})
    }

    // Actualizar paciente
    archivo.r1 = req.body.r1 || archivo.r1;
    archivo.r2 = req.body.r2 || archivo.r2;
    archivo.r3 = req.body.r3 || archivo.r3;
    archivo.r4 = req.body.r4 || archivo.r4;
    archivo.r5 = req.body.r5 || archivo.r5;
    archivo.r6 = req.body.r6 || archivo.r6;
    archivo.r7 = req.body.r7 || archivo.r7;
    archivo.r8 = req.body.r8 || archivo.r8;
    archivo.r9 = req.body.r9 || archivo.r9;
    archivo.r10 = req.body.r10 || archivo.r10;
    archivo.r11 = req.body.r11 || archivo.r11;
    archivo.r12 = req.body.r12 || archivo.r12;
    archivo.aceptado = req.body.aceptado || archivo.aceptado;
    
    try {
        const archivoActualizado = await archivo.save()
        res.json(archivoActualizado);
    } catch (error) {
        console.log(error);
    }
}

const eliminarPlan = async (req,res) => {
    const usuario = await Usuario.findById(req.usuario._id);
    const alumno = await Alumno.findById(usuario.alumno_fk);
   
    if(alumno === null){
        return res.json({msg: 'Accion no valida'})
    }

    const { id } = req.params;
    const archivo = await PlanTrabajo.findById(id);

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
    crearPlan, 
    planActividad, 
    obtenerPlan, 
    editarPlan, 
    eliminarPlan
}