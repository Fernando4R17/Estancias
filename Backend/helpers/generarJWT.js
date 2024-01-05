import jwt from 'jsonwebtoken';

const generarJWT = (matricula) =>{
    return jwt.sign({matricula}, process.env.JWT_SECRET,{
        expiresIn: '30d',

    });
}

export default generarJWT;