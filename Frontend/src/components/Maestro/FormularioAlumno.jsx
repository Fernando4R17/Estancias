import { useEffect, useState } from "react";
import Alerta from "../Alerta";
import { useMaestro } from "../../context/MaestroProvider";

const FormularioAlumno = () => {

    const { archivo, denegarArchivo, aceptarArchivo  } = useMaestro();

    const [alerta, setAlerta] = useState({});

    const { msg } = alerta
    return (
        <>
            {(archivo !== null) && (
                <div className="p-4 md:p-8 lg:p-12 bg-gray-100">

                    <div className="mb-8">
                        <h1 className="text-3xl font-semibold">Solicitud de Registro</h1>
                    </div>

                    <div className="mt-20 hadow-lg px-5 py-10 rounded-xl bg-white">


                        <div className="md:flex md:flex-row gap-5">
                            <div className="my-5 md:basis-1/2">
                                <label
                                    className="text-gray-600 block text-xl font-bold mb-2"
                                >   Semestre Actual
                                </label>
                                <input
                                    type="text"
                                    placeholder="7/8/etc."
                                    className="border w-full p-2 bg-gray-50 rounded-xl"
                                    value={archivo.semestre}
                                    disabled
                                />
                            </div>

                            <div className="my-5 md:basis-1/2">
                                <label
                                    className="text-gray-600 block text-xl font-bold mb-2"
                                >   Empresa
                                </label>
                                <input
                                    type="text"
                                    placeholder="Empresa"
                                    className="border w-full p-2 bg-gray-50 rounded-xl"
                                    value={`${archivo.empresa_nombre}/${archivo.empresa_encargado}`}
                                    disabled
                                />
                            </div>

                        </div>


                        <div className="md:flex md:flex-row gap-5">

                            <div className="my-5 md:basis-1/2">
                                <label
                                    className="text-gray-600 block text-xl font-bold mb-2"
                                >   Fecha de iniciación
                                </label>
                                <input
                                    type="text"
                                    placeholder="(dia) de (mes) de (año)"
                                    className="border w-full p-2 bg-gray-50 rounded-xl"
                                    value={archivo.inicio}
                                    disabled
                                />
                            </div>

                            <div className="my-5 md:basis-1/2">
                                <label
                                    className="text-gray-600 block text-xl font-bold mb-2"
                                >   Fecha de Finalización
                                </label>
                                <input
                                    type="text"
                                    placeholder=""
                                    className="border w-full p-2 bg-gray-50 rounded-xl"
                                    value={archivo.termino}
                                    disabled
                                />
                            </div>



                        </div>

                        <div className="md:flex md:justify-between">
                            <button onClick={() => {aceptarArchivo(archivo._id)}} className="bg-green-600 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-poiter hover:bg-green-700 md:w-auto">
                                Aceptar
                            </button>

                            <button onClick={() => {denegarArchivo(archivo._id)}} className="bg-red-600 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-poiter hover:bg-red-700 md:w-auto">
                                Rechazar
                            </button>
                        </div>



                    </div>

                </div>
            )}
        </>
    )
}

export default FormularioAlumno