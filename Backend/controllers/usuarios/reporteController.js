import ReporteActividades from "../../models/ReporteActividades.js";
import Usuario from "../../models/Usuario.js";
import Alumno from "../../models/Alumno.js"

const crearReporte = async (req, res) => {
    const usuario = await Usuario.findById(req.usuario._id);
    const alumno = await Alumno.findById(usuario.alumno_fk);
   
    if(alumno === null){
        return res.json({msg: 'Accion no valida'})
    }

    const validacion = await ReporteActividades.countDocuments({alumno_fk: usuario.alumno_fk});

    if(validacion === 3){
        return res.json({msg: 'Alumno Ya Creó Los Reportes Necesitados'});
    }
    const solicitud = new ReporteActividades(req.body);
    solicitud.alumno_fk = req.usuario.alumno_fk;
    try {
        const solicitudGuardada = await solicitud.save();
        res.json(solicitudGuardada);
    } catch (error) {
        console.log(error);
    }
}

const reporteActividad = async (req, res) => {
    const usuario = await Usuario.findById(req.usuario._id);
    const alumno = await Alumno.findById(usuario.alumno_fk);
   
    if(alumno === null){
        return res.json({msg: 'Accion no valida'})
    }

    const archivo = await ReporteActividades.find().where('alumno_fk').equals(req.usuario.alumno_fk);
    res.json(archivo);
}

const obtenerReporte = async (req,res) => {
    const usuario = await Usuario.findById(req.usuario._id);
    const alumno = await Alumno.findById(usuario.alumno_fk);
   
    if(alumno === null){
        return res.json({msg: 'Accion no valida'})
    }

    const { id } = req.params;
    const archivo = await ReporteActividades.findById(id);

    if(!archivo){
        return res.status(404).json({ msg: "No encontrado"})
    }

    if(archivo.alumno_fk._id.toString() !== req.usuario.alumno_fk.toString()){
        return res.json({msg: 'Accion no valida'})
    }

    res.json(archivo);
}

const editarReporte = async (req,res) => {
    const usuario = await Usuario.findById(req.usuario._id);
    const alumno = await Alumno.findById(usuario.alumno_fk);
   
    if(alumno === null){
        return res.json({msg: 'Accion no valida'})
    }

    const { id } = req.params;
    const archivo = await ReporteActividades.findById(id);

    if(!archivo){
        return res.status(404).json({ msg: "No encontrado"})
    }

    if(archivo.alumno_fk._id.toString() !== req.usuario.alumno_fk.toString()){
        return res.json({msg: 'Accion no valida'})
    }

    // Actualizar paciente
    archivo.periodo = req.body.periodo || archivo.periodo;
    archivo.horas_semana = req.body.horas_semana || archivo.horas_semana;
    archivo.total_horas = req.body.total_horas || archivo.total_horas;
    archivo.objetivo_periodo = req.body.objetivo_periodo || archivo.objetivo_periodo;
    archivo.descripcion_actividad = req.body.descripcion_actividad || archivo.descripcion_actividad;
    archivo.observaciones = req.body.observaciones || archivo.observaciones;
    archivo.numero_reporte = req.body.numero_reporte || archivo.numero_reporte;
    archivo.aceptado = req.body.aceptado || archivo.aceptado;

    try {
        const archivoActualizado = await archivo.save()
        res.json(archivoActualizado);
    } catch (error) {
        console.log(error);
    }
}

const eliminarReporte = async (req,res) => {
    const usuario = await Usuario.findById(req.usuario._id);
    const alumno = await Alumno.findById(usuario.alumno_fk);
   
    if(alumno === null){
        return res.json({msg: 'Accion no valida'})
    }
    
    const { id } = req.params;
    const archivo = await ReporteActividades.findById(id);

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
    crearReporte, 
    reporteActividad, 
    obtenerReporte, 
    editarReporte, 
    eliminarReporte
}