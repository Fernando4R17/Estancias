import mongoose from "mongoose";

const maestroSchema = mongoose.Schema({
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
    carrera_fk: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Carrera', // Referencia al modelo Alumno
    }
})

const Maestro = mongoose.model('Maestro', maestroSchema);

export default Maestro;