import mongoose from "mongoose";

const alumnoSchema = mongoose.Schema({
    matricula: {
        type: Number,
        unique: true,
        required: true,
    },
    nombre: {
        type: String,
        required: true,
    },
    app: {
        type: String,
        required: true,
        trim: true
    },
    amp: {
        type: String,
        default: null,
        trim: true
    },
    lugar_fecha_nacimiento: {
        type: String,
        required: true,
    },
    numero_afiliacion: {
        type: Number,
        required: true,
        trim: true
    },
    correo: {
        type: String,
        required: true,
        trim: true
    },
    telefono: {
        type: Number,
        required: true,
        trim: true
    },
    direccion: {
        type: String,
        required: true,
    },
    estado: {
        type: String,
        required: true,
        trim: true
    },
    municipio: {
        type: String,
        required: true,
        trim: true
    },
    unidad: {
        type: String,
        required: true,
    },
    carrera_fk: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Carrera', // Referencia al modelo Alumno
        default: null
    },
    departamento: {
        type: String,
        required: true,
    },
    creditos_academicos: {
        type: Number,
        required: true,
        trim: true
    },
    promedio: {
        type: Number,
        required: true,
        trim: true
    }
})

const Alumno = mongoose.model('Alumno', alumnoSchema);

export default Alumno;