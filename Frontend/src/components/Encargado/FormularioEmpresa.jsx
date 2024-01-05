import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthProvider"
import { useEncargado } from "../../context/EncargadoProvider";
import Alerta from "../Alerta";
import clienteAxios from "../../config/axios";

const FormularioEmpresa = () => {

    const [carrera, setCarrera] = useState('');
    const [nombreEmpresa, setNombreEmpresa] = useState('');
    const [direccion, setDireccion] = useState('');
    const [sector, setSector] = useState('');
    const [razonSocial, setRazonSocial] = useState('');
    const [giro, setGiro] = useState('');
    const [remoto, setRemoto] = useState('');
    const [nombreContacto, setNombreContacto] = useState('');
    const [departamento, setDepartamento] = useState('');
    const [cargo, setCargo] = useState('');
    const [telefono, setTelefono] = useState('');
    const [correo, setCorreo] = useState('');
    const [id, setId] = useState(null);

    const [alerta, setAlerta] = useState({});
    const { carreras } = useAuth();
    const { empresa, guardarEmpresa } = useEncargado();
    
    useEffect(()=> {
        if(empresa?.sector){
            setCarrera(empresa.carrera_fk);
            setNombreEmpresa(empresa.nombre);
            setDireccion(empresa.direccion);
            setSector(empresa.sector);
            setRazonSocial(empresa.razon_social);
            setGiro(empresa.giro_empresarial);
            setRemoto(empresa.remoto);
            setNombreContacto(empresa.nombre_contacto);
            setDepartamento(empresa.departamento);
            setCargo(empresa.cargo);
            setTelefono(empresa.telefono);
            setCorreo(empresa.correo);
            setId(empresa._id);
        }
    }, [empresa])

    const handleSubmit = (e) => {
        e.preventDefault();

        if ([carrera, nombreEmpresa, direccion, sector, razonSocial, giro, remoto, nombreContacto, departamento, cargo ].includes('')) {
            setAlerta({
                msg: 'Hay Campos Vacios',
                error: true
            })
            return
        }

        setAlerta({})
        guardarEmpresa({carrera_fk:carrera, nombre: nombreEmpresa, direccion, sector, razon_social :razonSocial, giro_empresarial:giro, remoto, nombre_contacto:nombreContacto, departamento, cargo, telefono: Number(telefono), correo, id})

        
    }

    const { msg } = alerta
    return (
        <>
            {(carreras.length > 0) && (
                <div className="p-4 md:p-8 lg:p-12 bg-gray-100">

                    <div className="mb-8">
                        <h1 className="text-3xl font-semibold">Formulario Empresa</h1>
                    </div>

                    <div className="mt-20 hadow-lg px-5 py-10 rounded-xl bg-white">
                        {msg && <Alerta alerta={alerta} />}
                        <form onSubmit={handleSubmit}>

                            <div className="md:flex md:flex-row gap-5">
                                <div className="my-5 md:basis-1/2">
                                    <label
                                        className="text-gray-600 block text-xl font-bold mb-2"
                                    >   Nombre de la Empresa
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Nombre de la Empresa"
                                        className="border w-full p-2 bg-gray-50 rounded-xl"
                                        value={nombreEmpresa}
                                        onChange={e => setNombreEmpresa(e.target.value)}
                                    />
                                </div>

                                <div className="my-5 md:basis-1/2">
                                    <label
                                        className="text-gray-600 block text-xl font-bold mb-2"
                                    >   Dirección
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Dirección de la Empresa"
                                        className="border w-full p-2 bg-gray-50 rounded-xl"
                                        value={direccion}
                                        onChange={e => setDireccion(e.target.value)}
                                    />
                                </div>
                            </div>


                            <div className="md:flex md:flex-row gap-5">
                                <div className="my-5 md:basis-1/2">
                                    <label
                                        className="text-gray-600 block text-xl font-bold mb-2"
                                    >   Sector
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Sector de la Empresa(Privado/Publico)"
                                        className="border w-full p-2 bg-gray-50 rounded-xl"
                                        value={sector}
                                        onChange={e => setSector(e.target.value)}
                                    />
                                </div>

                                <div className="my-5 md:basis-1/2">
                                    <label
                                        className="text-gray-600 block text-xl font-bold mb-2"
                                    >   Razón Social
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Razón Social de la Empresa"
                                        className="border w-full p-2 bg-gray-50 rounded-xl"
                                        value={razonSocial}
                                        onChange={e => setRazonSocial(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="md:flex md:flex-row gap-5">
                                <div className="my-5 md:basis-1/2">
                                    <label
                                        className="text-gray-600 block text-xl font-bold mb-2"
                                    >   Giro Empresarial
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Giro Empresarial de la Empresa"
                                        className="border w-full p-2 bg-gray-50 rounded-xl"
                                        value={giro}
                                        onChange={e => setGiro(e.target.value)}
                                    />
                                </div>

                                <div className="my-5 md:basis-1/2">
                                    <label
                                        className="text-gray-600 block text-xl font-bold mb-2"
                                    >   Tipo de Servicio
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Tipo de Practicas de la Empresa(Remoto/Presencial)"
                                        className="border w-full p-2 bg-gray-50 rounded-xl"
                                        value={remoto}
                                        onChange={e => setRemoto(e.target.value)}
                                    />
                                </div>
                            </div>



                            <div className="md:flex md:flex-row gap-5">
                                <div className="my-5 md:basis-1/2">
                                    <label
                                        className="text-gray-600 block text-xl font-bold mb-2"
                                    >   Nombre del Encargado
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Nombre del Encargado"
                                        className="border w-full p-2 bg-gray-50 rounded-xl"
                                        value={nombreContacto}
                                        onChange={e => setNombreContacto(e.target.value)}
                                    />
                                </div>

                                <div className="my-5 md:basis-1/2">
                                    <label
                                        className="text-gray-600 block text-xl font-bold mb-2"
                                    >   Cargo
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Departamento del Encargado"
                                        className="border w-full p-2 bg-gray-50 rounded-xl"
                                        value={cargo}
                                        onChange={e => setCargo(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="md:flex md:flex-row gap-5">
                                <div className="my-5 md:basis-1/2">
                                    <label
                                        className="text-gray-600 block text-xl font-bold mb-2"
                                    >   Departamento
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Correo del Encargado"
                                        className="border w-full p-2 bg-gray-50 rounded-xl"
                                        value={departamento}
                                        onChange={e => setDepartamento(e.target.value)}
                                    />
                                </div>

                                <div className="my-5 md:basis-1/2">
                                    <label
                                        className="text-gray-600 block text-xl font-bold mb-2"
                                    >   Correo
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Correo del Encargado"
                                        className="border w-full p-2 bg-gray-50 rounded-xl"
                                        value={correo}
                                        onChange={e => setCorreo(e.target.value)}
                                    />
                                </div>

                            </div>

                            <div className="md:flex md:flex-row gap-5">
                                <div className="my-5 md:basis-1/2">
                                    <label
                                        className="text-gray-600 block text-xl font-bold mb-2"
                                    >   Telefono
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="Telefono del Encargado"
                                        className="border w-full p-2 bg-gray-50 rounded-xl"
                                        value={telefono}
                                        onChange={e => setTelefono(e.target.value)}
                                    />
                                </div>

                                <div className="my-5 md:basis-1/2">
                                    <label
                                        className="text-gray-600 block text-xl font-bold mb-2"
                                    >   Carrera
                                    </label>
                                    <select className="border w-full p-2 bg-gray-50 rounded-xl" value={carrera} onChange={e => setCarrera(e.target.value)}>
                                        <option value="">Escoge una carrera</option>
                                        {carreras.map((carre) => (
                                            <option key={carre.nombre_corto} value={carre.nombre_corto}>
                                                {carre.nombre_carrera}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                            </div>

                            <input
                                type="submit"
                                value={ id ? 'Guardar Cambios' : 'Agregar Empresa'}
                                className="bg-red-600 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-poiter hover:bg-red-700 md:w-auto"
                            />

                        </form>
                    </div>

                </div>
            )}
        </>
    )
}

export default FormularioEmpresa