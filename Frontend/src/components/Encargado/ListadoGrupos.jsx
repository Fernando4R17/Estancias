import { RiSearchLine } from "react-icons/ri";
import { MdGroups, MdOutlineRemoveRedEye } from "react-icons/md";
import { useEncargado } from "../../context/EncargadoProvider";
import { useAuth } from "../../context/AuthProvider";

const ListadoGrupos = () => {

    const { grupoContent } = useEncargado()
    const { grupos} = useAuth()

    let numero = Object.entries(grupos).length;

    return (
        <>

            {(Object.entries(grupos).length > 0) && (
                <div className="p-4 md:p-8 lg:p-12 bg-gray-100">

                    <div className="mb-8">
                        <h1 className="text-3xl font-semibold">Grupos</h1>
                    </div>

                    <div>
                        <p className="text-gray-500 mb-8">Se Encontraron <span className="text-red-500 font-bold">{numero}</span> Grupos!</p>
                    </div>

                    {Object.entries(grupos).map((grupo) => {
                        return (

                            // Cards

                            <div key={grupo[0]} className="bg-white rounded-2xl p-7 flex items-center flex-col md:flex-row gap-8 w-full drop-shadow-lg border-2 border-transparent hover:border-red-500 transition-all mb-4">

                                {/* Icon */}
                                <div className="w-full md:w-[10%] flex items-center justify-start md:justify-center">
                                    <MdGroups className="text-7xl bg-red-200 text-red-500 p-4 rounded-md" />
                                </div>

                                {/* Title */}

                                <div className="w-full md:w-[70%] flex items-center">
                                    <h1 className="text-xl md:justify-center items-center gap-4 mb-3">{grupo[1].nombre_grupo}</h1>
                                </div>

                                <div className="w-full md:w-[20%] flex  flex-col">
                                    <div>
                                        <button onClick={() => {grupoContent(grupo[1].nombre_grupo)}} className='flex w-full items-center justify-center gap-3 bg-green-500 hover:bg-green-600 transition-all text-white font-bold p-2 rounded-lg m-1'>
                                            <MdOutlineRemoveRedEye /> Ver
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

export default ListadoGrupos