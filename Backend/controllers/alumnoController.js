import Alumno from '../models/Alumno.js';
import SolicitudInscripcion from '../models/SolicitudInscripcion.js';
import Usuario from '../models/Usuario.js';
import Empresa from '../models/Empresa.js';
import Carrera from '../models/Carrera.js';

const obtenerAlumno = async (req, res) => {
    const alumno = await Alumno.findById(req.usuario.alumno_fk);

    if(!alumno){
        return res.json({msg: 'Accion no valida'})
    }

    const Info = {
        Datos: {
            alumno, 
            Grupo: {}
        }
        
        
    };

    res.json(Info);

}

const obtenerArchivo = async (req,res) => {
    const alumno = await Alumno.findById(req.usuario.alumno_fk);

    if(!alumno){
        return res.json({msg: 'Accion no valida'})
    }

    

    try {
        const archivo = await SolicitudInscripcion.findOne({ alumno_fk: req.usuario.alumno_fk });
        res.json(archivo);
    } catch (error) {
        console.log(error);
    }
    
}

const mostrarEmpresas = async (req, res) => {
    const usuario = await Usuario.findById(req.usuario._id);
    const alumno = await Alumno.findById(usuario.alumno_fk);


    if (!alumno) {
        return res.json({ msg: 'Accion no valida' })
    }

    const empresas = await Empresa.find();
    res.json(empresas);
}

const solicitudInscripcion = async (req, res) => {

    const alumno = await Alumno.findById(req.usuario.alumno_fk);
   
    if(!alumno){
        return res.json({msg: 'Accion no valida'})
    }

    const validacion = await SolicitudInscripcion.findOne({alumno_fk: req.usuario.alumno_fk});

    if(validacion !== null){
        return res.json({msg: 'Alumno Ya Tiene Evaluacion'});
    }


    const solicitud = req.body;

    let fechaInicio = new Date(solicitud.inicio);
    let fechaFin = new Date(solicitud.termino);

    let diaInicio = fechaInicio.getDate();
    let mesInicio = fechaInicio.toLocaleString('es-ES', { month: 'long' }); 
    let añoInicio = fechaInicio.getFullYear();

    let diaFin = fechaFin.getDate();
    let mesFin = fechaFin.toLocaleString('es-ES', { month: 'long' }); 
    let añoFin = fechaFin.getFullYear();

    let fechaInicioFormateada = diaInicio + ' de ' + mesInicio + ' de ' + añoInicio;
    let fechaFinFormateada = diaFin + ' de ' + mesFin + ' de ' + añoFin;

    solicitud.inicio = fechaInicioFormateada;
    solicitud.termino = fechaFinFormateada;
    solicitud.alumno_fk = req.usuario.alumno_fk

    solicitud.responsable = 'Dr.Antonio Sánchez Velazco';

    
    solicitud.alumno_matricula = alumno.matricula;
    
    if(alumno?.amp !== null){
        solicitud.alumno_nombre = `${alumno.nombre} ${alumno.app} ${alumno.apm}`
    } else{
        solicitud.alumno_nombre = `${alumno.nombre} ${alumno.app}`
    }

    solicitud.alumno_seguro = alumno.numero_afiliacion

    const empresa = await Empresa.findById(req.body.empresa_fk);

    
    solicitud.empresa_nombre = empresa.nombre;
    solicitud.empresa_encargado = empresa.nombre_contacto;
    solicitud.empresa_encargado_puesto = empresa.cargo;
    solicitud.empresa_direccion = empresa.direccion;

    let opciones = { month: 'long' };
    const fecha = new Date()
    let year = fecha.getFullYear();
    let mes = fecha.toLocaleString('es-ES', opciones);
    let dia = fecha.getDate();

    solicitud.fecha = `${dia} de ${mes} de ${year}`;

    const carrera = await Carrera.findById(alumno.carrera_fk);

    solicitud.alumno_carrera = carrera.nombre_carrera;

    const nuevaSolicitud = new SolicitudInscripcion(solicitud);
    try {
        const solicitudGuardada = await nuevaSolicitud.save();
        res.json(solicitudGuardada);
    } catch (error) {
        console.log(error);
    }
}

export {
    obtenerAlumno,
    mostrarEmpresas,
    solicitudInscripcion,
    obtenerArchivo
}