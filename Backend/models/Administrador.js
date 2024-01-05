import mongoose from "mongoose";

const administradorSchema = mongoose.Schema({
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
    cargo: {
        type: String,
        required: true,
        trim: true
    }
})

const Administrador = mongoose.model('Administrador', administradorSchema);

export default Administrador;