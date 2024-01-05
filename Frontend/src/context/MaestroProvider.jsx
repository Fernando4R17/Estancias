import { useState, useEffect, createContext, useContext } from "react";
import clienteAxios from "../config/axios";
import { useAuth } from "./AuthProvider";

const maestroContext = createContext();

const MaestroProvider = ({ children }) => {

    const [archivo, setArchivo] = useState({});
    const {content, setContent} = useAuth();

    const obtenerArchivo = async (id) => {
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
            const {data} = await clienteAxios(`maestro/alumno/${id}`, config);
            if(data === 'No ha llenado la solicitud'){
                return alert('No ha llenado la solicitud')
            } else if(data.aceptado === '1'){
                return alert('Ya puede descargar el documento');
            }
            setArchivo(data)
            setContent('formularioAlumno')
        } catch (error) {
            console.log(error);
        }

    }

    const aceptarArchivo = async (id) => {
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
            const {data} = await clienteAxios(`maestro/alumno/${id}/aceptar`, config);
            if(data.aceptado === '1'){
                setContent('')
            }
        } catch (error) {
            console.log(error);
        }
    }

    const denegarArchivo = async (id) => {
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
            const {data} = await clienteAxios(`maestro/alumno/${id}/denegar`, config);
            if(data === 'Archivo Eliminado'){
                setContent('')
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <maestroContext.Provider
            value={{
                obtenerArchivo,
                aceptarArchivo,
                denegarArchivo,
                archivo
            }}>
            {children}
        </maestroContext.Provider>
    )
}

const useMaestro = () => {
    return useContext(maestroContext);
}

export {
    MaestroProvider,
    useMaestro
}

export default MaestroProvider