import { useState, useEffect, createContext, useContext } from 'react';
import clienteAxios from '../config/axios';

const authContext = createContext();

const AuthProvider = ({ children }) => {

    const [cargando, setCargando] = useState(true);
    const [usuario, setUsuario] = useState({});
    const [auth, setAuth] = useState({});
    const [grupos, setGrupos] = useState({});
    const [empresas, setEmpresas] = useState({});
    const [carreras, setCarreras] = useState({});
    const [content, setContent] = useState('');

    useEffect(() => {
        const autenticarUsuario = async () => {
            const token = localStorage.getItem('token');
            const usuarioLocalStorage = localStorage.getItem('usuario');

            if (!token && !usuarioLocalStorage) {
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
                const { data } = await clienteAxios('/usuarios/perfil', config)
                const user = JSON.parse(usuarioLocalStorage);
                setUsuario(user);
                setAuth(data)
            } catch (error) {
                console.log(error.response.data.msg);
                setAuth({})
                setUsuario({})
            }
            setCargando(false)
        }
        autenticarUsuario()
    }, [])

    

    const cerrarSesion = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        setAuth({});
        setUsuario({});
        setGrupos({});
        setEmpresas({});
        setCarreras({});
        setGrupos({});
        setContent('')
    }


    return (
        <authContext.Provider
            value={{
                auth,
                cargando,
                usuario,
                grupos,
                empresas,
                carreras,
                content,
                setCarreras,
                setEmpresas,
                setAuth,
                setGrupos,
                setUsuario,
                setCargando,
                cerrarSesion,
                setContent
            }}
        >
            {children}
        </authContext.Provider>
    )
}

const useAuth = () => {
    return useContext(authContext)
}

export {
    AuthProvider,
    useAuth
}

export default authContext;