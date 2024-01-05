import { FaUserGraduate } from "react-icons/fa";
import { useMaestro } from "../../context/MaestroProvider";

const MaestroContent = ({ user }) => {

    let display;

    const { obtenerArchivo } = useMaestro()

    if (user.Datos.Grupo === 'No tiene grupo asignado') {
        display = <p className="text-gray-500 mb-8 text-center"><span className="text-red-500 font-bold">NO</span> tiene Grupo Asignado!</p>
    } else {
        display = <p className="text-gray-500 mb-8">Se Encontraron <span className="text-red-500 font-bold"></span> Solicitudes!</p>
    }



    return (
        <>
            <div className="p-4 md:p-8 lg:p-12 bg-gray-100">

                <div className="mb-8">
                    <h1 className="text-3xl font-semibold">Grupo</h1>
                </div>

                <div>
                    {display}
                </div>

                {Object.entries(user.Datos.Grupo).map((alumno) => {

                    let nombre = `${alumno[1].nombre} ${alumno[1].app}`

                    return (

                        // Cards

                        <div key={alumno[0]} className="bg-white rounded-2xl p-7 flex items-center flex-col md:flex-row gap-8 w-full drop-shadow-lg border-2 border-transparent hover:border-red-500 transition-all mb-4">

                                {/* Icon */}
                                <div className="w-full md:w-[10%] flex items-center justify-start md:justify-center">
                                    <FaUserGraduate className="text-7xl bg-red-200 text-red-500 p-4 rounded-md" />
                                </div>

                                {/* Title */}

                                <div className="w-full md:w-[70%] flex items-center">
                                    <h1 className="text-xl md:justify-center items-center gap-4 mb-3">{nombre}</h1>
                                </div>

                                <div className="w-full md:w-[20%] flex  flex-col">
                                    <div>
                                        <button onClick={() => {obtenerArchivo(alumno[1]._id)}} className='flex w-full items-center justify-center gap-3 bg-green-500 hover:bg-green-600 transition-all text-white font-bold p-2 rounded-lg m-1'>
                                            <FaUserGraduate /> Editar
                                        </button>
                                    </div>
                                </div>

                            </div>

                    )
                })}

            </div>
        </>
    )
}

export default MaestroContent