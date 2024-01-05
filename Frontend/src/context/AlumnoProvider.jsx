import { useState, useEffect, createContext, useContext } from "react";
import clienteAxios from "../config/axios";
import { useAuth } from "./AuthProvider";

const AlumnoContext = createContext();

const AlumnoProvider = ({ children }) => {

    const [empresas, setEmpresas] = useState({});
    const [solicitud, setSolicitud] = useState({});
    const [carta, setCarta] = useState({});
    

    const {setContent} = useAuth();

    const obtenerEmpresas = async () => {
        
        const token = localStorage.getItem('token');

        if (!token) {
            setCargando(false)
            return
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const {data} = await clienteAxios('alumnos/empresas', config);
            setEmpresas(data)
        } catch (error) {
            console.log(error);
        }

    }

    const obtenerArchivo = async () => {
        const token = localStorage.getItem('token');

        if (!token) {
            setCargando(false)
            return
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const {data} = await clienteAxios('alumnos/solicitud', config);
            setSolicitud(data)
        } catch (error) {
            console.log(error);
        }
    }

    const vistaEmpresas = () => {
        setContent('Empresas')
        obtenerEmpresas()  
    }

    const solicitudes = () => {
        setContent('Solicitudes')
    }

    const formulario = () => {
        setContent('formulario')     
        obtenerEmpresas()   
    }

    const guardarSolicitud = async (solicitud) => {
        const token = localStorage.getItem('token');

        if (!token) {
            setCargando(false)
            return
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            await clienteAxios.post('alumnos/solicitud',solicitud, config);
            setContent('Formatos')
        } catch (error) {
            console.log(error);
        }
    }

    const descargarSolicitud = async () => {
        const token = localStorage.getItem('token');

        if (!token) {
            setCargando(false)
            return
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const {data} = await clienteAxios('alumnos/solicitud', config);
            setCarta(data)
            setContent('carta')
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <AlumnoContext.Provider
            value={{
                obtenerEmpresas,
                solicitudes,
                formulario,
                guardarSolicitud,
                vistaEmpresas,
                obtenerArchivo,
                descargarSolicitud,
                carta,
                solicitud,
                empresas
            }}>
            {children}
        </AlumnoContext.Provider>
    )
}

const useAlumno = () => {
    return useContext(AlumnoContext);
}

export {
    AlumnoProvider,
    useAlumno,
    
}

export default AlumnoProvider