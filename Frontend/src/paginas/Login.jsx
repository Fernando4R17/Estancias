import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import Alerta from '../components/Alerta';
import clienteAxios from "../config/axios";

const Login = () => {

    const [matricula, setMatricula] = useState('');
    const [password, setPassword] = useState('');
    const [alerta, setAlerta] = useState({});

    const { setAuth, setUsuario, setCargando } = useAuth();

    const navigate = useNavigate()

    const { msg } = alerta;

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if ([password, matricula].includes('')) {
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            });
    
            return;
        }
    
        try {
            const { data } = await clienteAxios.post('/usuarios/login', { matricula, password });
    
            localStorage.setItem('token', data.token);
            setAuth(data);
    
            if (data?._id) {
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${data.token}`
                    }
                };
    
                if (data.maestro_fk === null && data.administrador_fk === null) {
                    const { data: usuario } = await clienteAxios.get('/alumnos', config);
                    setUsuario(usuario);
                    localStorage.setItem('usuario', JSON.stringify(usuario));
                    setCargando(false)
                    navigate('/dashboard');
                } else if (data.maestro_fk === null && data.alumno_fk === null) {
                    const { data: usuario } = await clienteAxios.get('/admin', config);
                    setUsuario(usuario);
                    localStorage.setItem('usuario', JSON.stringify(usuario));
                    setCargando(false)
                    navigate('/dashboard');
                } else if (data.alumno_fk === null && data.administrador_fk === null) {
                    const { data: usuario } = await clienteAxios.get('/maestro', config);
                    setUsuario(usuario);
                    localStorage.setItem('usuario', JSON.stringify(usuario));
                    setCargando(false)
                    navigate('/dashboard');
                }
            }
    
            
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            });
        }
    };

    return (
        <>
            <main className="container mx-auto md:grid md:grid-cols-2 mt-12 gap-10 p-5 items-center">
                <div>
                    <h1 className="text-red-700 font-black text-6xl">Portal de Estancias UAdeO</h1>
                    <p className="text-black font-black text-6xl">Inicia Sesión</p>
                </div>
                <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
                    {msg && <Alerta alerta={alerta} />}

                    <form className="mx-2" onSubmit={handleSubmit}>
                        <div className="my-5">
                            <label className="uppercase text-gray-600 block text-xl font-bold">Matricula</label>
                            <input
                                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                                type="number"
                                placeholder="Matricula"
                                value={matricula}
                                onChange={e => setMatricula(e.target.value)}
                            />
                        </div>

                        <div className="my-5">
                            <label className="uppercase text-gray-600 block text-xl font-bold">Contraseña</label>
                            <input
                                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                                type="password"
                                placeholder="Contraseña"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>

                        <input className="bg-red-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-red-800 md:w-auto" type="submit" value="Iniciar Sesión" />

                    </form>
                </div>
            </main>
        </>
    )
}

export default Login