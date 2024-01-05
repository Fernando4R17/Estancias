import Content from "./Alumno/Content";
import ContentEmpresa from "./Encargado/ContentEmpresa";
import ListadoGrupos from "./Encargado/ListadoGrupos";
import FormularioEmpresa from "./Encargado/FormularioEmpresa";
import GrupoContent from "./Encargado/GrupoContent";
import MaestroContent from "./Maestro/MaestroContent";
import Empresas from "./Alumno/Empresas";
import FormularioInscripcion from "./Alumno/FormularioInscripcion";
import FormularioAlumno from "./Maestro/FormularioAlumno";

import { useAlumno } from "../context/AlumnoProvider";
import { useAuth } from "../context/AuthProvider";


const Header = ({ usuario, tipo }) => {

    const { content } = useAuth();
    const { obtenerArchivo, solicitud } = useAlumno();
    
    let realizada = false;

    if(tipo === 'alumno' && realizada === false){
        realizada = true;
        obtenerArchivo();
    }

    if(tipo === 'maestro' && realizada === false){
        realizada = true;
        obtenerArchivo();
    }

    const nombre = `${usuario.Datos[tipo].nombre} ${usuario.Datos[tipo].app}`;

    return (
        <div className="col-span-5">
            <header className="flex flex-col md:flex-row gap-4 items-center justify-between p-4 lg:pl-12 lg:pr-12 w-full">
                {/* Searcher */}
                <div className="">
                    <p className="flex items-center gap-1 font-semibold">{usuario?.Datos?.Grupo?.nombre_grupo}</p>
                </div>

                <nav className="w-full md:w-[100%] lg:w-[100%] flex justify-center md:justify-end">
                    <ul className="flex items-center gap-4">

                        <li>
                            <p className="flex items-center gap-1 font-semibold">{nombre}</p>
                        </li>
                    </ul>
                </nav>

            </header>

            { 
            (tipo === 'alumno' && content === 'Empresas') ? <Empresas /> : 
            (tipo === 'alumno' && content === 'formulario') ? <FormularioInscripcion /> : 
            (tipo === 'alumno') && <Content />
            }

            {
            (tipo === 'encargado' && content === 'GrupoContent') ? <GrupoContent /> : 
            (tipo === 'encargado' && content === 'FormularioEmpresa') ? <FormularioEmpresa /> : 
            (tipo === 'encargado' && content === 'Empresa') ? <ContentEmpresa /> : 
            (tipo === 'encargado') && <ListadoGrupos />
            }

            { 
            (tipo === 'maestro' && content === 'formularioAlumno') ? <FormularioAlumno /> : 
            (tipo === 'maestro') && <MaestroContent user={usuario}/>
            }
        </div>

    )
}

export default Header