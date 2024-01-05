import { useState, useEffect, createContext, useContext } from "react";
import clienteAxios from "../config/axios";
import { useAuth } from "./AuthProvider";

const encargadoContext = createContext();

const EncargadoProvider = ({ children }) => {

    const [empresa, setEmpresa] = useState({});
    const [grupo, setGrupo] = useState({});
    const [idGrupo, setIdGrupo] = useState({})
    const [asesor, setAsesor] = useState({});
    const { setEmpresas, setGrupos, setCarreras, empresas, setContent, content } = useAuth()

    

    const handleGrupos = async () => {

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
            const { data } = await clienteAxios('/admin/grupos', config)
            setGrupos(data);
        } catch (error) {
            console.log(error.response.data.msg);
            setGrupos({})
        }

    }

    const handleEmpresas = async () => {
        
        setEmpresa({})

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

        const { data } = await clienteAxios('/admin/carreras', config)
        setCarreras(data);
        try {
            const { data } = await clienteAxios('/admin/empresas', config)
            setEmpresas(data);

        } catch (error) {
            console.log(error.response.data.msg);
            setEmpresas({})
            setCarreras({})
        }

    }
    const handleComponenteEmpresa = async () => {
        if (content !== 'FormularioEmpresa') {
            setContent('FormularioEmpresa')
        }
    }

    const guardarEmpresa = async (empresa) => {
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

        if (empresa.id) {

            try {
                const { data } = await clienteAxios.put(`/admin/empresas/${empresa.id}`, empresa, config)
                setEmpresa(data)
                handleEmpresas()
                setContent('Empresa')
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                setEmpresa({})
                await clienteAxios.post('admin/empresas', empresa, config)
                handleEmpresas()
                setContent('Empresa')
            } catch (error) {
                console.log(error);
            }
        }
    }

    const setEdicionEmpresas = (empresa) => {
        setEmpresa(empresa)
        setContent('FormularioEmpresa');
    }

    const eliminarEmpresa = async id => {
        const confirmar = confirm('¿Confirmas Que Deseas Eliminar La Empresa?');

        if (confirmar) {
            try {
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

                const { data } = await clienteAxios.delete(`/admin/empresas/${id}`, config)
                const empresasActualizadas = empresas.filter(empresasState => empresasState._id !== id);
                setEmpresas(empresasActualizadas);
            } catch (error) {

            }
        }
    }

    const setEdicionGrupo = async (id) => {
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

        const { data } = await clienteAxios(`/admin/grupos/${id}/asesor`, config);
        setAsesor(data);
        setIdGrupo(id)
        try {
            const { data } = await clienteAxios(`/admin/grupos/${id}`, config)
            setGrupo(data);
            setContent('GrupoContent')
        } catch (error) {
            console.log(error.response.data.msg);
            setGrupo({})
        }
    }

    const handleAsignarAsesor = async (grupo) => {
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
            const {data} = await clienteAxios.put(`/admin/maestros/${grupo.nombre_grupo}`, grupo, config)
            setContent('Grupo')
        } catch (error) {
            alert(error);
        }
    }

    const Grupos = () => {
        handleGrupos();
        setContent('Grupo');
    }

    const grupoContent = (id) => {
        setEdicionGrupo(id);
    }

    const Empresa = () => {
        handleEmpresas();
        setContent('Empresa')
        
    }

    const formularioEmpresa = () => {
        setContent('FormularioEmpresa');
    }

    return (
        <encargadoContext.Provider
            value={{
                empresa,
                grupo,
                asesor,
                idGrupo,
                Grupos,
                grupoContent,
                Empresa,
                formularioEmpresa,
                setEdicionEmpresas,
                handleAsignarAsesor,
                guardarEmpresa,
                eliminarEmpresa,
                handleComponenteEmpresa,
                handleGrupos,
                setEdicionGrupo,
                handleEmpresas
            }}>
            {children}
        </encargadoContext.Provider>
    )
}

const useEncargado = () => {
    return useContext(encargadoContext);
}

export {
    EncargadoProvider,
    useEncargado
}

export default EncargadoProvider