import mongoose from "mongoose";

const carreraSchema = mongoose.Schema({
    
    nombre_carrera: {
        type: String,
        required: true,
        trim: true
    },
    nombre_coordinador: {
        type: String,
        required: true,
    },
    nombre_corto: {
        type: String,
        unique: true,
        required: true
    }
})

const Carrera = mongoose.model('Carrera', carreraSchema);

export default Carrera;