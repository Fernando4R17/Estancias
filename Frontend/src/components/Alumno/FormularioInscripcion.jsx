import { useEffect, useState } from "react";
import { useAlumno } from "../../context/AlumnoProvider";
import Alerta from "../Alerta";

const FormularioInscripcion = () => {

    const [semestre, setSemestre] = useState('');
    const [empresa_fk, setEmpresa_fk] = useState('');
    const [inicio, setInicio] = useState('');
    const [termino, setTermino] = useState('');
    const [id, setId] = useState(null);

    const { empresas, guardarSolicitud } = useAlumno();
    const [alerta, setAlerta] = useState({});

    // useEffect(()=> {
    //     if(empresa?.sector){
    //         setCarrera(empresa.carrera_fk);
    //         setNombreEmpresa(empresa.nombre);
    //         setDireccion(empresa.direccion);
    //         setSector(empresa.sector);
    //         setRazonSocial(empresa.razon_social);
    //         setGiro(empresa.giro_empresarial);
    //         setRemoto(empresa.remoto);
    //         setNombreContacto(empresa.nombre_contacto);
    //         setDepartamento(empresa.departamento);
    //         setCargo(empresa.cargo);
    //         setTelefono(empresa.telefono);
    //         setCorreo(empresa.correo);
    //         setId(empresa._id);
    //     }
    // }, [empresa])

    const handleSubmit = (e) => {
        e.preventDefault();

        if ([semestre, empresa_fk, inicio, termino].includes('')) {
            setAlerta({
                msg: 'Hay Campos Vacios',
                error: true
            })
            return
        }

        setAlerta({})
        guardarSolicitud({ semestre, empresa_fk, inicio, termino })


    }

    const { msg } = alerta
    return (
        <>
            {(empresas.length > 0) && (
                <div className="p-4 md:p-8 lg:p-12 bg-gray-100">

                    <div className="mb-8">
                        <h1 className="text-3xl font-semibold">Solicitud de Registro</h1>
                    </div>

                    <div className="mt-20 hadow-lg px-5 py-10 rounded-xl bg-white">
                        {msg && <Alerta alerta={alerta} />}
                        <form onSubmit={handleSubmit}>

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
                                        value={semestre}
                                        onChange={e => setSemestre(e.target.value)}
                                    />
                                </div>

                                <div className="my-5 md:basis-1/2">
                                    <label
                                        className="text-gray-600 block text-xl font-bold mb-2"
                                    >   Empresa
                                    </label>
                                    <select className="border w-full p-2 bg-gray-50 rounded-xl" value={empresa_fk} onChange={e => setEmpresa_fk(e.target.value)}>
                                        <option value="">Escoge una Empresa</option>
                                        {empresas.map((empresa, index) => (
                                            <option key={index} value={empresa._id}>
                                                {empresa.nombre} / {empresa.nombre_contacto}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                            </div>


                            <div className="md:flex md:flex-row gap-5">

                                <div className="my-5 md:basis-1/2">
                                    <label
                                        className="text-gray-600 block text-xl font-bold mb-2"
                                    >   Fecha de iniciación
                                    </label>
                                    <input
                                        type="date"
                                        placeholder="(dia) de (mes) de (año)"
                                        className="border w-full p-2 bg-gray-50 rounded-xl"
                                        value={inicio}
                                        onChange={e => setInicio(e.target.value)}
                                    />
                                </div>

                                <div className="my-5 md:basis-1/2">
                                    <label
                                        className="text-gray-600 block text-xl font-bold mb-2"
                                    >   Fecha de Finalización
                                    </label>
                                    <input
                                        type="date"
                                        placeholder=""
                                        className="border w-full p-2 bg-gray-50 rounded-xl"
                                        value={termino}
                                        onChange={e => setTermino(e.target.value)}
                                    />
                                </div>



                            </div>


                            <input
                                type="submit"
                                value={id ? 'Guardar Cambios' : 'Agregar Empresa'}
                                className="bg-red-600 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-poiter hover:bg-red-700 md:w-auto"
                            />

                        </form>
                    </div>

                </div>
            )}
        </>
    )
}

export default FormularioInscripcion