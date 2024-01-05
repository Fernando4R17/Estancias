import mongoose from "mongoose";

const empresaSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    direccion: {
        type: String,
        required: true,
    },
    sector: {
        type: String,
        default: null,
        trim: true
    },
    razon_social: {
        type: String,
        required: true,
    },
    giro_empresarial: {
        type: String,
        default: null
    },
    remoto: {
        type: String,
        required: true,
    },
    nombre_contacto: {
        type: String,
        required: true,
    },
    departamento: {
        type: String,
        required: true,
    },
    cargo: {
        type: String,
        required: true
    },
    telefono: {
        type: Number,
        trim: true
    },
    correo: {
        type: String,
        trim: true
    },
    carrera_fk: {
        type: String,
        ref: 'Carrera' // Referencia al modelo Alumno
    },
})

const Empresa = mongoose.model('Empresa', empresaSchema);

export default Empresa;