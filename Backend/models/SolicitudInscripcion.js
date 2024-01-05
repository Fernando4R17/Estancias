import mongoose from "mongoose";

const solicitudInscripcionSchema = mongoose.Schema({
    alumno_fk: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Alumno', // Referencia al modelo Alumno
        unique: true
    },
    semestre: {
        type: String,
        required: true,
    },
    alumno_matricula: {
        type: Number,
        required: true,
    },
    alumno_nombre: {
        type: String,
        required: true,
    },
    alumno_seguro: {
        type: Number,
        required: true,
    },
    alumno_carrera: {
        type: String,
        required: true,
    },
    empresa_nombre: {
        type: String,
        required: true,
    },
    empresa_encargado: {
        type: String,
        ref: 'Empresa', // Referencia al modelo Alumno
    },
    empresa_direccion: {
        type: String,
        required: true,  // Referencia al modelo Alumno
    },
    empresa_encargado_puesto: {
        type: String,
        required: true,
    },
    inicio: {
        type: String,
        required: true,
    },
    termino: {
        type: String,
        required: true,
    },
    fecha: {
        type: String,
        required: true,
    },
    aceptado: {
        type: String,
        default: '0'
    }
})

const SolicitudInscripcion = mongoose.model('SolicitudInscripcion', solicitudInscripcionSchema);

export default SolicitudInscripcion;