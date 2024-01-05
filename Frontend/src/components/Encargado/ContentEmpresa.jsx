import { Link } from "react-router-dom";
import { MdOutlineCreate } from "react-icons/md";
import { RiSearchLine } from "react-icons/ri";
import { MdWorkOutline, MdOutlineAdd, MdOutlineEdit, MdOutlineDelete } from "react-icons/md";
import { useEncargado } from "../../context/EncargadoProvider";
import { useAuth } from "../../context/AuthProvider";

const ContentEmpresa = () => {

    const { handleComponenteEmpresa, setEdicionEmpresas, eliminarEmpresa } = useEncargado()
    const { empresas } = useAuth()
    

    let numero = Object.entries(empresas).length;

    return (
        <>

            {(Object.entries(empresas).length > 0) && (
                <div className="p-4 md:p-8 lg:p-12 bg-gray-100">

                    <div className="mb-8">
                        <h1 className="text-3xl font-semibold">Empresas</h1>
                    </div>

                    

                    <div>
                        <p className="text-gray-500 mb-8">Se Encontraron <span className="text-red-500 font-bold">{numero}</span> Empresas!</p>
                    </div>


                    <div className=" md:w-[20%] flex flex-col">
                        <div>
                            <button onClick={handleComponenteEmpresa} className='flex items-center justify-center mb-3 gap-3 bg-blue-500 hover:bg-blue-600 transition-all text-white font-bold p-2 rounded-lg m-1'>
                                <MdOutlineAdd /> Agregar
                            </button>
                        </div>
                    </div>


                    {Object.entries(empresas).map((empresa) => {

                        return (

                            // Cards

                            <div key={empresa[0]} className="bg-white rounded-2xl p-7 flex items-center flex-col md:flex-row gap-8 w-full drop-shadow-lg border-2 border-transparent hover:border-red-500 transition-all mb-4">

                                {/* Icon */}
                                <div className="w-full md:w-[10%] flex items-center justify-start md:justify-center">
                                    <MdWorkOutline className="text-7xl bg-red-200 text-red-500 p-4 rounded-md" />
                                </div>

                                {/* Title */}

                                <div className="w-full md:w-[70%]">
                                    <h1 className="text-xl flex flex-wrap items-center gap-4 mb-3">{empresa[1].nombre}

                                    </h1>
                                    <p className="text-gray-500">{empresa[1].nombre_contacto}</p>
                                </div>

                                <div className="w-full md:w-[20%] flex flex-col justify-between">
                                    <div>
                                        <button onClick={() => {setEdicionEmpresas(empresa[1])}} className='flex w-full items-center justify-center gap-3 bg-blue-500 hover:bg-blue-600 transition-all text-white font-bold p-2 rounded-lg m-1'>
                                            <MdOutlineEdit  /> Editar
                                        </button>
                                    </div>

                                    <div>
                                        <button onClick={() => {eliminarEmpresa(empresa[1]._id)}} className={`flex w-full items-center justify-center gap-3 bg-red-500 hover:bg-red-600 transition-all text-white font-bold p-2 rounded-lg m-1`}>
                                            <MdOutlineDelete /> Eliminar
                                        </button>
                                    </div>

                                </div>

                            </div>

                        )
                    })}
                </div>
            )}
        </>
    )
}

export default ContentEmpresa