import Maestro from '../models/Maestro.js';
import Grupo from '../models/Grupo.js';
import Alumno from '../models/Alumno.js';
import Empresa from '../models/Empresa.js'
import Usuario from '../models/Usuario.js';
import Administrador from '../models/Administrador.js';
import Carrera from '../models/Carrera.js';

const obtenerEncargado = async (req, res) => {
    const encargado = await Administrador.findById(req.usuario.administrador_fk);

    if (!encargado) {
        return res.json({ msg: 'Accion no valida' })
    }

    const Info = {
        Datos: {
            encargado
        }

    };
    res.json(Info);

}

const mostrarCarreras = async (req, res) => {
    const encargado = await Administrador.findById(req.usuario.administrador_fk);

    if (!encargado) {
        return res.json({ msg: 'Accion no valida' })
    }

    const carreras = await Carrera.find();

    res.json(carreras);
}

const mostrarMaestros = async (req, res) => {
    const maestros = await Maestro.find();
    const usuario = await Usuario.findById(req.usuario._id);
    const admin = await Administrador.findById(usuario.administrador_fk);


    if (admin === null) {
        return res.json({ msg: 'Accion no valida' })
    }

    res.json(maestros);
}

const obtenerMaestro = async (req, res) => {
    const { id } = req.params;
    const maestro = await Maestro.findById(id);
    const usuario = await Usuario.findById(req.usuario._id);
    const admin = await Administrador.findById(usuario.administrador_fk);


    if (admin === null) {
        return res.json({ msg: 'Accion no valida' })
    }

    if (!maestro) {
        return res.status(404).json({ msg: "No encontrado" })
    }

    res.json(maestro);
}

const asignarGrupo = async (req, res) => {
    const encargado = await Administrador.findById(req.usuario.administrador_fk);

    if (!encargado) {
        return res.json({ msg: 'Accion no valida' })
    }

    const maestro = await Maestro.findOne({matricula: req.body.maestro_fk});

    if (!maestro){
        return res.status(404).json({ msg: "Maestro no encontrado" })
    }
    
    try {
        await Grupo.updateMany({ nombre_grupo: req.body.nombre_grupo }, { maestro_fk: maestro._id  });
        const grupoActualizado = await Grupo.find().where('nombre_grupo').equals(req.body.nombre_grupo);
        res.json(grupoActualizado);
    } catch (error) {
        console.log(error);
    }
}

const removerGrupoAsignado = async (req, res) => {
    const { id } = req.params;
    const usuario = await Usuario.findById(req.usuario._id);
    const admin = await Administrador.findById(usuario.administrador_fk);


    if (admin === null) {
        return res.json({ msg: 'Accion no valida' })
    }

    const alumnosObtenidos = await Grupo.find().where('nombre_grupo').equals(id);

    alumnosObtenidos.map(async (alumno) => {
        alumno.maestro_fk = null;
        return await alumno.save();
    });

    const alumnosCompletos = await Promise.all(alumnosObtenidos);

    res.json(alumnosCompletos);
}

const mostrarGrupos = async (req, res) => {
    const admin = await Administrador.findById(req.usuario.administrador_fk);

    if (admin === null) {
        return res.json({ msg: 'Accion no valida' })
    }

    const grupos = await Grupo.find();
    const nombresUnicos = new Set();

    grupos.forEach((grupo) => {
        nombresUnicos.add(grupo.nombre_grupo);
    });

    const resultado = Array.from(nombresUnicos).map((nombre) => ({
        nombre_grupo: nombre,
    }));

    res.json(resultado);
}

const mostrarAlumnos = async (req, res) => {
    const usuario = await Usuario.findById(req.usuario._id);
    const admin = await Administrador.findById(usuario.administrador_fk);


    if (admin === null) {
        return res.json({ msg: 'Accion no valida' })
    }

    const { id } = req.params;
    const alumnosObtenidos = await Grupo.find().where('nombre_grupo').equals(id);

    const promesasAlumnos = alumnosObtenidos.map(async (alumno) => {
        return await Alumno.findById(alumno.alumno_fk);
    });

    const alumnosCompletos = await Promise.all(promesasAlumnos);

    res.json(alumnosCompletos);
}

const mostrarAsesor = async (req, res) => {
    const usuario = await Usuario.findById(req.usuario._id);
    const admin = await Administrador.findById(usuario.administrador_fk);


    if (admin === null) {
        return res.json({ msg: 'Accion no valida' })
    }

    const { id } = req.params;
    const asesor = await Grupo.findOne().where('nombre_grupo').equals(id);

    if(asesor.maestro_fk === undefined){
        
    }

    const maestro = await Maestro.findOne({_id: asesor.maestro_fk});

    if(!maestro){
        return res.json('Asesor No asignado');
    }

    const nombre = `${maestro.nombre} ${maestro.app}`

    res.json(nombre);
    
}

const mostrarEmpresas = async (req, res) => {
    const usuario = await Usuario.findById(req.usuario._id);
    const admin = await Administrador.findById(usuario.administrador_fk);


    if (admin === null) {
        return res.json({ msg: 'Accion no valida' })
    }

    const empresas = await Empresa.find();
    res.json(empresas);
}

const crearEmpresa = async (req, res) => {

    const encargado = await Administrador.findById(req.usuario.administrador_fk);



    if (!encargado) {
        return res.json({ msg: 'Accion no valida' })
    }


    const empresa = new Empresa(req.body);
    try {
        const empresaGuardada = await empresa.save();
        res.json(empresaGuardada);
    } catch (error) {
        console.log(error);
    }
}

const obtenerEmpresa = async (req, res) => {
    const usuario = await Usuario.findById(req.usuario._id);
    const admin = await Administrador.findById(usuario.administrador_fk);


    if (admin === null) {
        return res.json({ msg: 'Accion no valida' })
    }

    const { id } = req.params;
    const empresa = await Empresa.findById(id);

    if (!empresa) {
        return res.status(404).json({ msg: "No encontrado" })
    }
    res.json(empresa);
}

const editarEmpresa = async (req, res) => {
    const encargado = await Administrador.findById(req.usuario.administrador_fk);

    if (!encargado) {
        return res.json({ msg: 'Accion no valida' })
    }

    const empresa = await Empresa.findById(req.body.id);

    if (!empresa) {
        return res.status(404).json({ msg: "No encontrado" })
    }
    
    // Actualizar paciente
    empresa.nombre = req.body.nombre || empresa.nombre;
    empresa.direccion = req.body.direccion || empresa.direccion;
    empresa.sector = req.body.sector || empresa.sector;
    empresa.razon_social = req.body.razon_social || empresa.razon_social;
    empresa.giro_empresarial = req.body.giro_empresarial || empresa.giro_empresarial;
    empresa.nombre_contacto = req.body.nombre_contacto || empresa.nombre_contacto;
    empresa.departamento = req.body.departamento || empresa.departamento;
    empresa.cargo = req.body.cargo || empresa.cargo;
    empresa.telefono = req.body.telefono.toString() || empresa.telefono.toString();
    empresa.correo = req.body.correo || empresa.correo;
    empresa.carrera_fk = req.body.carrera_fk || empresa.carrera_fk;
    
    try {
        const empresaActualizada = await empresa.save()
                
        res.json(empresaActualizada);
    } catch (error) {
        console.log(error);
    }
}

const eliminarEmpresa = async (req, res) => {
    const encargado = await Administrador.findById(req.usuario.administrador_fk);

    if (!encargado) {
        return res.json({ msg: 'Accion no valida' })
    }

    const { id } = req.params;
    const empresa = await Empresa.findById(id);

    if (!empresa) {
        return res.status(404).json({ msg: "No encontrado" })
    }

    try {
        await empresa.deleteOne()
        res.json({ msg: 'Empresa Eliminada' })
    } catch (error) {
        console.log(error);
    }
}

export {
    obtenerEncargado,
    mostrarMaestros,
    obtenerMaestro,
    removerGrupoAsignado,
    asignarGrupo,
    mostrarGrupos,
    mostrarAsesor,
    mostrarAlumnos,
    mostrarEmpresas,
    crearEmpresa,
    obtenerEmpresa,
    editarEmpresa,
    eliminarEmpresa,
    mostrarCarreras
}