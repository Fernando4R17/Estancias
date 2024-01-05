import Grupo from '../models/Grupo.js';
import Alumno from '../models/Alumno.js';
import Usuario from '../models/Usuario.js';
import Maestro from '../models/Maestro.js';
import SolicitudInscripcion from '../models/SolicitudInscripcion.js';

const obtenerMaestro = async (req, res) => {
    const maestro = await Maestro.findById(req.usuario.maestro_fk);

    if (!maestro) {
        return res.json({ msg: 'Accion no valida' })
    }

    const Info = {
        Datos: {
            maestro,
            Grupo: {}
        }
    };

    const grupo = await Grupo.findOne({ maestro_fk: maestro._id });

    if (grupo === null) {
        Info.Datos.Grupo = 'No tiene grupo asignado'
    }

    const alumnos = await Grupo.find({ maestro_fk: maestro._id })

    if (!alumnos) {
        return res.json({ msg: 'Algo salió mal' })
    }

    let alumnosInfo = [];

    try {
        
    } catch (error) {
        
    }


    for(const alumno of alumnos){
        try {
            alumnosInfo.push(await Alumno.findById(alumno.alumno_fk));
        } catch (error) {
            console.log(error)
        }
    }

    Info.Datos.Grupo = alumnosInfo

    res.json(Info);

}

const mostrarGrupo = async (req, res) => {
    const usuario = await Usuario.findById(req.usuario._id);
    const maestro = await Maestro.findById(usuario.maestro_fk);


    if (maestro === null) {
        return res.json({ msg: 'Accion no valida' })
    }

    const { id } = req.params;
    const asesor = await Grupo.findOne().where('maestro_fk').equals(id);

    if (asesor.maestro_fk === undefined) {
        return res.json('Asesor No asignado');
    }
    res.json(asesor.maestro_fk);
}

const obtenerAlumnos = async (req, res) => {
    const usuario = await Usuario.findById(req.usuario._id);
    const maestro = await Maestro.findById(usuario.maestro_fk);

    if (maestro === null) {
        return res.json({ msg: 'Accion no valida' })
    }

    const { id } = req.params;

    const alumnosObtenidos = await Grupo.find().where('nombre_grupo').equals(id);
    res.json(alumnosObtenidos);
}

const verAlumno = async (req, res) => {
    const maestro = await Maestro.findById(req.usuario.maestro_fk);

    if (!maestro) {
        return res.json({ msg: 'Accion no valida' })
    }
    const { id } = req.params;

    const archivo = await SolicitudInscripcion.findOne({ alumno_fk: id })
    
    if(!archivo){
        return res.json('No ha llenado la solicitud');
    }

    res.json(archivo);
}

const aceptarArchivo = async (req, res) => {

    const maestro = await Maestro.findById(req.usuario.maestro_fk);

    if (!maestro) {
        return res.json({ msg: 'Accion no valida' })
    }
    const { id } = req.params;

    const archivo = await SolicitudInscripcion.findOne({ _id: id })
    
    if(!archivo){
        return res.json('No ha llenado la solicitud');
    }

    archivo.aceptado = 1

    const archivoNuevo = await archivo.save()

    res.json(archivoNuevo);
}

const denegarArchivo = async (req, res) => {

    const maestro = await Maestro.findById(req.usuario.maestro_fk);

    if (!maestro) {
        return res.json({ msg: 'Accion no valida' })
    }
    const { id } = req.params;

    const archivo = await SolicitudInscripcion.findOne({ _id: id })
    
    if(!archivo){
        return res.json('No ha llenado la solicitud');
    }

    try {
        await archivo.deleteOne()
        res.json('Archivo Eliminado')
    } catch (error) {
        
    }
}

export {
    obtenerMaestro,
    aceptarArchivo,
    denegarArchivo,
    mostrarGrupo,
    obtenerAlumnos,
    verAlumno
}