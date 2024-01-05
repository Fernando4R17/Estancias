import { useEncargado } from "../../context/EncargadoProvider";
import { useAuth } from "../../context/AuthProvider";
import { FaUserGraduate } from "react-icons/fa";
import { useState, useEffect } from "react";

const GrupoContent = () => {


    const [matricula, setMatricula] = useState('');    

    const { grupo, asesor, handleAsignarAsesor, idGrupo } = useEncargado()

    let numero = Object.entries(grupo).length;

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if([matricula].includes('')){
            alert('Hay campos vacios')
            return
        }

        handleAsignarAsesor({maestro_fk: matricula, nombre_grupo: idGrupo})

    }

    return (
        <>

            {(Object.entries(grupo).length > 0) && (
                <div className="p-4 md:p-8 lg:p-12 bg-gray-100">

                    <div className="mb-8">
                        <h1 className="text-3xl font-semibold">ISOF 01</h1>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-1 gap-4 items-center mb-8 lg:mb-14">
                        <div className="md:col-span-1">
                            <div className="">
                                <h1 className="text-gray-400 font-semibold">{asesor}</h1>

                            </div>
                        </div>



                        <form onSubmit={handleSubmit}>
                            <div className="my-5 md:basis-1/2">
                                <label
                                    className="text-gray-600 block text-xl font-bold mb-2"
                                >   Matricula Asesor
                                </label>
                                <input
                                    type="number"
                                    placeholder="Matricula Asesor"
                                    className="border w-[20%] p-2 bg-gray-50 rounded-xl"
                                    value={matricula}
                                    onChange={e => setMatricula(e.target.value)}
                                />
                            </div>



                            <div className="md:col-span-1">
                                <div className="">
                                    <button type="submit" className="items-center justify-center bg-blue-500 hover:bg-blue-600 transition-all text-white font-bold p-2 rounded-lg ">
                                        {asesor !== 'Asesor No asignado' ? 'Cambiar Asesor': 'Asignar'}
                                    </button>
                                </div>

                            </div>
                        </form>




                    </div>

                    <div>
                        <p className="text-gray-500 mb-8">Se Encontraron <span className="text-red-500 font-bold">{numero}</span> Alumnos!</p>
                    </div>

                    {Object.entries(grupo).map((alumno) => {
                        return (

                            // Cards

                            <div key={alumno[0]} className="bg-white rounded-2xl p-7 flex items-center flex-col md:flex-row gap-8 w-full drop-shadow-lg border-2 border-transparent hover:border-red-500 transition-all mb-4">

                                {/* Icon */}
                                <div className="w-full md:w-[10%] flex items-center justify-start md:justify-center">
                                    <FaUserGraduate className="text-7xl bg-red-200 text-red-500 p-4 rounded-md" />
                                </div>

                                {/* Title */}

                                <div className="w-full md:w-[70%]">
                                    <h1 className="text-xl flex flex-wrap items-center gap-4 mb-3">{`${alumno[1].nombre} ${alumno[1].app}`}

                                    </h1>
                                    <p className="text-gray-500">Matricula: {alumno[1].matricula}</p>
                                </div>

                                

                            </div>

                        )
                    })}
                </div>
            )}
        </>
    )
}

export default GrupoContent