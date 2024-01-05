import mongoose from "mongoose";

const usuarioSchema = mongoose.Schema({
    matricula: {
        type: Number,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    alumno_fk: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Alumno', // Referencia al modelo Alumno
        default: null
    },
    maestro_fk: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Maestro', // Referencia al modelo Alumno
        default: null
    },
    administrador_fk: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Administrador', // Referencia al modelo Alumno
        default: null
    },
    token: {
        type: String,
        strim: true,
        default: null
    }
}, {timestamps: true})

usuarioSchema.methods.comprobarPassword = async function (passwordFormulario){
    return await passwordFormulario === this.password;
}

const Usuario = mongoose.model('Usuario', usuarioSchema);

export default Usuario;