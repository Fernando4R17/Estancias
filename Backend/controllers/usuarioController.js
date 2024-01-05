import Usuario from '../models/Usuario.js';
import generarJWT from '../helpers/generarJWT.js';

const registrar = async (req, res) => {

    const { matricula } = req.body;

    // Prevenir registros repetidos
    const existeRegistro = await Usuario.findOne({ matricula });

    if (existeRegistro) {
        const error = new Error('Usuario Registrado');
        return res.status(400).json({ msg: error.message });
    }

    try {

        // Obtencion de datos y guardado
        const usuario = new Usuario(req.body);
        const usuarioGuardado = await usuario.save();

        res.json(usuarioGuardado);
    } catch (error) {
        console.log(error);
    }


}

const perfil = (req, res) => {

    const { usuario } = req;


    res.json(usuario);
}

const autenticar = async (req, res) => {
    const { matricula, password } = req.body;

    // Comprobar si usuario existe
    const usuario = await Usuario.findOne({ matricula });

    if (!usuario) {
        const error = new Error('El usuario no existe');
        return res.status(404).json({ msg: error.message })
    }

    // Revisar password
    if (await usuario.comprobarPassword(password)) {
        // Autenticar al usuario
        res.json({
            _id: usuario._id,
            matricula: usuario.matricula,
            alumno_fk: usuario.alumno_fk,
            maestro_fk: usuario.maestro_fk,
            administrador_fk: usuario.administrador_fk,
            token: generarJWT(usuario.matricula)
        })
    } else {
        const error = new Error('La contraseña es incorrecta');
        return res.status(404).json({ msg: error.message })
    }
}

export {
    registrar,
    perfil,
    autenticar
}