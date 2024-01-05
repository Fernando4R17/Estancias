import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import conectarBD from "./config/db.js";
import alumnoRoutes from './routes/alumnoRoutes.js'
import usuarioRoutes from './routes/usuarioRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import maestroRoutes from './routes/maestroRoutes.js'
import verificarBasedeDatos from './helpers/DB.js'

const app = express();
app.use(express.json());

dotenv.config();

conectarBD();

const dominiosPermitidos = [process.env.FRONTEND_URL];

const corsOptions = {
    origin: function(origin, callback) {
        if (dominiosPermitidos.indexOf(origin) !== -1 ){
            callback(null, true)
        } else{
            callback(new Error('No permitido por CORS'))
        }
    }
}

app.use(cors(corsOptions))

verificarBasedeDatos().then(() => {
    app.use('/api/alumnos', alumnoRoutes);
    app.use('/api/usuarios', usuarioRoutes);
    app.use('/api/admin', adminRoutes);
    app.use('/api/maestro', maestroRoutes);

    const PORT = process.env.PORT || 4000;

    app.listen(PORT, () =>{
        console.log(`Servidor Funcionando en el puerto ${PORT}`);
    });
}).catch((error) => {
    console.error('Error al verificar y crear registros de base de datos:', error);
});

