import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario.js';

const checkAuth = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.usuario = await Usuario.findOne({'matricula':decoded.matricula}).select("-password")
            
            return next();
        } catch (error) {
            const e = new Error('Token no Válido');
            res.status(403).json({ msg: e.message })
        }
    }

    if(!token){
        const e = new Error('Token no Válido o inexistente');
        res.status(403).json({ msg: e.message })
    }
    
    next();
    
}

export default checkAuth;