import { IoDocumentTextOutline } from "react-icons/io5";
import { MdOutlineFileDownload, MdOutlineCreate } from "react-icons/md";
import { useAlumno } from "../../context/AlumnoProvider";

const EvaluacionPrestador = './EvaluacionPrestador.docx';
const PlanTrabajo = './PlanTrabajo.docx';
const InformeFinal = './InformeFinal.docx';
const ReporteActividades = './ReporteActividades.docx';

const Content = () => {

    const DownloadFileAtURL = (url) => {
        const fileName = url.split('/').pop()
        const aTag = document.createElement('a')
        aTag.href = url
        aTag.setAttribute('download', fileName);
        document.body.appendChild(aTag)
        aTag.click()
        aTag.remove()
    }

    const { formulario, solicitud, descargarSolicitud } = useAlumno();

    let estado;
    let activado = 'bg-gray-500';
    let btnCrear = 'bg-green-500 hover:bg-green-600';

    let tipo = solicitud


    if (tipo === null) {
        estado = <span className="text-sm py-1 px-2 bg-red-100 text-red-500 font-semibold">No Iniciado</span>;
    } else if (tipo !== null) {
        btnCrear = 'bg-gray-500'
        estado = <span className="text-sm py-1 px-2 bg-yellow-100 text-yellow-500 font-semibold">Pendiente</span>;
    }
    if (tipo !== null && tipo?.aceptado === '1') {
        estado = <span className="text-sm py-1 px-2 bg-green-100 text-green-500 font-semibold">Aceptado</span>;
        btnCrear = 'bg-gray-500'
        activado = 'bg-blue-500 hover:bg-blue-600';

    }



    return (
        <>

            <div className="p-4 md:p-8 lg:p-12 bg-gray-100">

                <div className="mb-8">
                    <h1 className="text-3xl font-semibold">Formatos</h1>
                </div>

                <div className="bg-white rounded-2xl p-7 flex flex-col md:flex-row gap-8 w-full drop-shadow-lg border-2 border-transparent hover:border-red-500 transition-all mb-4">

                    {/* Icon */}
                    <div className="w-full md:w-[10%] flex items-center justify-start md:justify-center">
                        <IoDocumentTextOutline className="text-7xl bg-red-200 text-red-500 p-4 rounded-md" />
                    </div>

                    {/* Title */}
                    <div className="w-full md:w-[70%]">
                        <h1 className="text-xl flex flex-wrap items-center gap-4 mb-3">Solicitud de Inscripción
                            {estado}
                        </h1>
                        <p className="text-gray-500">Luis Fernando Alvarez Ramirez</p>
                    </div>

                    {/* Document */}
                    <div className="w-full md:w-[20%] flex flex-col justify-between">
                        <div>
                            <button onClick={btnCrear !== 'bg-gray-500' ? formulario : undefined} className={`flex w-full items-center justify-center gap-3 ${btnCrear} transition-all text-white font-bold p-2 rounded-lg m-1`}>
                                <MdOutlineCreate /> Crear
                            </button>
                        </div>

                        <div>
                            <button onClick={activado !== 'bg-gray-500' ? descargarSolicitud : undefined} className={`flex w-full items-center justify-center gap-3  ${activado} transition-all text-white font-bold p-2 rounded-lg m-1`}>
                                <MdOutlineFileDownload /> Descargar
                            </button>
                        </div>

                    </div>

                </div>

                <div className="bg-white rounded-2xl p-7 flex items-center flex-col md:flex-row gap-8 w-full drop-shadow-lg border-2 border-transparent hover:border-red-500 transition-all mb-4">

                    {/* Icon */}
                    <div className="w-full md:w-[10%] flex items-center justify-start md:justify-center">
                        <IoDocumentTextOutline className="text-7xl bg-red-200 text-red-500 p-4 rounded-md" />
                    </div>

                    {/* Title */}
                    <div className="w-full md:w-[70%] flex items-center">
                        <h1 className="text-xl md:justify-center items-center gap-4 mb-3">Plan de trabajo</h1>
                    </div>

                    {/* Document */}


                    <div className="w-full md:w-[20%] flex  flex-col">
                        <div>
                            <button onClick={() => { DownloadFileAtURL(PlanTrabajo) }} className='flex w-full items-center justify-center gap-3 bg-blue-500 hover:bg-blue-600 transition-all text-white font-bold p-2 rounded-lg m-1'>
                                <MdOutlineFileDownload /> Descargar
                            </button>
                        </div>
                    </div>

                </div>

                <div className="bg-white rounded-2xl p-7 flex items-center flex-col md:flex-row gap-8 w-full drop-shadow-lg border-2 border-transparent hover:border-red-500 transition-all mb-4">

                    {/* Icon */}
                    <div className="w-full md:w-[10%] flex items-center justify-start md:justify-center">
                        <IoDocumentTextOutline className="text-7xl bg-red-200 text-red-500 p-4 rounded-md" />
                    </div>

                    {/* Title */}
                    <div className="w-full md:w-[70%] flex items-center">
                        <h1 className="text-xl md:justify-center items-center gap-4 mb-3">Reporte de Actividades</h1>
                    </div>

                    {/* Document */}


                    <div className="w-full md:w-[20%] flex  flex-col">
                        <div>
                            <button onClick={() => { DownloadFileAtURL(ReporteActividades) }} className='flex w-full items-center justify-center gap-3 bg-blue-500 hover:bg-blue-600 transition-all text-white font-bold p-2 rounded-lg m-1'>
                                <MdOutlineFileDownload /> Descargar
                            </button>
                        </div>
                    </div>

                </div>

                <div className="bg-white rounded-2xl p-7 flex items-center flex-col md:flex-row gap-8 w-full drop-shadow-lg border-2 border-transparent hover:border-red-500 transition-all mb-4">

                    {/* Icon */}
                    <div className="w-full md:w-[10%] flex items-center justify-start md:justify-center">
                        <IoDocumentTextOutline className="text-7xl bg-red-200 text-red-500 p-4 rounded-md" />
                    </div>

                    {/* Title */}
                    <div className="w-full md:w-[70%] flex items-center">
                        <h1 className="text-xl md:justify-center items-center gap-4 mb-3">Evaluacion de Prestador Servicio Social</h1>
                    </div>

                    {/* Document */}


                    <div className="w-full md:w-[20%] flex  flex-col">
                        <div>
                            <button onClick={() => { DownloadFileAtURL(EvaluacionPrestador) }} className='flex w-full items-center justify-center gap-3 bg-blue-500 hover:bg-blue-600 transition-all text-white font-bold p-2 rounded-lg m-1'>
                                <MdOutlineFileDownload /> Descargar
                            </button>
                        </div>
                    </div>

                </div>

                <div className="bg-white rounded-2xl p-7 flex items-center flex-col md:flex-row gap-8 w-full drop-shadow-lg border-2 border-transparent hover:border-red-500 transition-all mb-4">

                    {/* Icon */}
                    <div className="w-full md:w-[10%] flex items-center justify-start md:justify-center">
                        <IoDocumentTextOutline className="text-7xl bg-red-200 text-red-500 p-4 rounded-md" />
                    </div>

                    {/* Title */}
                    <div className="w-full md:w-[70%] flex items-center">
                        <h1 className="text-xl md:justify-center items-center gap-4 mb-3">Reporte Final</h1>
                    </div>

                    {/* Document */}


                    <div className="w-full md:w-[20%] flex  flex-col">
                        <div>
                            <button onClick={() => {DownloadFileAtURL(InformeFinal)}} className='flex w-full items-center justify-center gap-3 bg-blue-500 hover:bg-blue-600 transition-all text-white font-bold p-2 rounded-lg m-1'>
                                <MdOutlineFileDownload /> Descargar
                            </button>
                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}

export default Content