import { useAlumno } from "../../context/AlumnoProvider"
const Empresas = () => {

    const { empresas } = useAlumno()

    return (
        <div className="p-4 md:p-8 lg:p-12 bg-gray-100">

            <div className="mb-8">
                <h1 className="text-3xl font-semibold">Empresas</h1>
            </div>



            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="table-auto">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Nombre de la Empresa
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Dirección
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Publico/Privado
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Virtual/Presencial
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Nombre del Contacto
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Departamento
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Cargo
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Telefono
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Correo
                            </th>
                        </tr>
                    </thead>
                    <tbody>



                        {Object.entries(empresas).map((empresa) => {

                            return (
                                <tr className="bg-white border-b text-white dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={empresa[0]}>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {empresa[1].nombre}
                                    </th>
                                    <td className="px-6 py-4">
                                        {empresa[1].direccion}
                                    </td>
                                    <td className="px-6 py-4">
                                        {empresa[1].sector}
                                    </td>
                                    <td className="px-6 py-4">
                                        {empresa[1].remoto}
                                    </td>
                                    <td className="px-6 py-4">
                                        {empresa[1].nombre_contacto}
                                    </td>
                                    <td className="px-6 py-4">
                                        {empresa[1].departamento}
                                    </td>
                                    <td className="px-6 py-4">
                                        {empresa[1].cargo}
                                    </td>
                                    <td className="px-6 py-4 ">
                                        {empresa[1].telefono}
                                    </td>
                                    <td className="px-6 py-4">
                                        {empresa[1].correo}
                                    </td>
                                </tr>
                            )

                        })}


                    </tbody>
                </table>
            </div>


        </div>
    )
}

export default Empresas