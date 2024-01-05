import { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '/UAdeO_R.png';
import { useAuth } from '../context/AuthProvider';

import { MdGroups, MdLogout, MdWorkOutline } from "react-icons/md";
import { FaUserGraduate } from "react-icons/fa";
import { RiCloseLine } from "react-icons/ri";
import { IoMenu } from "react-icons/io5";
import { useEncargado } from '../context/EncargadoProvider';
import { useAlumno } from '../context/AlumnoProvider';

const Sidebar = ({ tipo }) => {

    const { cerrarSesion } = useAuth();

    const { handleGrupos, Empresa, Grupos } = useEncargado()

    const {vistaEmpresas, solicitudes} = useAlumno()

    const { grupos, content } = useAuth()

    const [sidebar, setSidebar] = useState(false);

    const handleSidebar = () => {
        setSidebar(!sidebar)
    }

    if (Object.entries(grupos).length === 0) {
        handleGrupos()
    }

    return (
        <>
            <div className="col-span-1">
                <aside className="lg:h-screen lg:sticky lg:top-0">
                    <div className={`fixed lg:static w-[80%] md:w-[50%] lg:w-full top-0 z-20 bg-white transition-all ${sidebar ? '-left-0' : '-left-full'}  h-[100vh] overflow-y-scroll md:overflow-hidden col-span-1 p-8 border-r`}>

                        {/* Logotipo */}
                        <div className="p-8">
                            <img src={Logo} alt="Logo" />
                        </div>

                        {/* Menú */}
                        <div className='flex flex-col justify-between h-[80vh] md:h-[81vh]'>
                            <nav>
                                <ul>
                                    {(tipo !== 'encargado') && (
                                    <li>
                                        <button onClick={solicitudes} className={`flex w-full items-center gap-4 hover:bg-red-700 text-gray-400 font-semibold p-4 hover:text-white rounded-lg transition-colors`}>
                                            <FaUserGraduate /> {tipo === 'alumno' ? 'Formatos' : 'Alumnos'}
                                        </button>
                                    </li>
                                    )}
                                    {(tipo === 'encargado') && (
                                        <li>
                                            <button onClick={Grupos} className={`flex w-full items-center gap-4 hover:bg-red-700 text-gray-400 font-semibold p-4 hover:text-white rounded-lg transition-colors`}>
                                                <MdGroups /> Grupos
                                            </button>
                                        </li>
                                    )}
                                    {(tipo === 'alumno' || tipo === 'encargado') && (
                                        <li>
                                            <button onClick={tipo === 'encargado' ? Empresa : vistaEmpresas} className={`flex w-full items-center gap-4 hover:bg-red-700 text-gray-400 font-semibold p-4 hover:text-white rounded-lg transition-colors`}>
                                                <MdWorkOutline /> Empresas
                                            </button>
                                        </li>
                                    )}
                                </ul>

                            </nav>
                            <div>
                                <Link onClick={cerrarSesion} className={`flex items-center gap-4 hover:bg-red-700 text-gray-400 font-semibold p-4 hover:text-white rounded-lg transition-colors`}>
                                    <MdLogout /> Cerrar Sesión
                                </Link>
                            </div>
                        </div>
                    </div>
                </aside>

            </div>

            <button onClick={handleSidebar} className='block lg:hidden fixed bottom-4 right-4 bg-red-700 text-2xl p-2 z-40 text-white rounded-full'>
                {sidebar ? <RiCloseLine /> : <IoMenu />}
            </button>
        </>
    )
}

export default Sidebar