import mongoose from "mongoose";

const grupoSchema = mongoose.Schema({
    
    nombre_grupo: {
        type: String,
        required: true,
        trim: true
    },
    alumno_fk: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Alumno', // Referencia al modelo Alumno
        required: true,
    },
    carrera_fk: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Carrera', // Referencia al modelo Alumno
        required: true,
    },
    maestro_fk: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Maestro', // Referencia al modelo Alumno
        default: undefined
    }
})

const Grupo = mongoose.model('Grupo', grupoSchema);

export default Grupo;