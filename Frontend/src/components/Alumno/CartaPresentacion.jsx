import { useState, useEffect } from "react";
import { useAlumno } from "../../context/AlumnoProvider";


const CartaPresentacion = () => {

    const { carta } = useAlumno();

    const [contenidoCargado, setContenidoCargado] = useState(false);

    useEffect(() => {
        setContenidoCargado(true);

        window.addEventListener("afterprint", handleAfterPrint);

        return () => {

            window.removeEventListener("afterprint", handleAfterPrint);
        };
    }, []); 

    useEffect(() => {

        if (contenidoCargado) {
            window.print();
        }
    }, [contenidoCargado]);

    const handleAfterPrint = () => {

        window.location.reload();
    };

    return (
        <div>
            {contenidoCargado && console.log('cargado')}
            <div className="clear-both">
                <div className="text-right">
                    <p className="Header text-base" style={{ fontSize: "12pt" }}>
                        <span className=" text-red-700">
                            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                            &nbsp; &nbsp;
                        </span>
                        <span className=" text-red-700">
                            "2018, Año de Nuestra Autonomía Universitaria"
                        </span>
                    </p>
                </div>
                <p className="Header ml-27 -ml-27">
                    <span className="absolute block h-0 z-0">
                        <img className="m-0 block" alt="" src="data:image/png;base64,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" />
                    </span>
                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    &nbsp; &nbsp; &nbsp;&nbsp;
                </p>
                <p className="text-right  font-bold">
                    <span className="font-Arial">CARTA DE PRESENTACIÓN</span>
                </p>
                <p className="text-right  font-bold">
                    <span className="font-Arial">ESTANCIA ACADÉMICA PROFESIONAL</span>
                </p>
                <p className="text-right  font-bold">
                    <span className="font-Arial">Mazatlán, Sinaloa, a {carta.fecha}</span>
                </p>


                <p className="text-justify leading-8 ">
                    <span className="font-Arial">{carta.empresa_encargado}</span>
                </p>
                <p className="text-justify leading-8 ">
                    <span className="font-Arial">{carta.empresa_encargado_puesto}</span>
                </p>
                <p className="text-justify leading-8 ">
                    <span className="font-Arial">{carta.empresa_nombre}</span>
                </p>
                <p className="text-justify leading-8 ">
                    <span className="font-Arial">{carta.empresa_direccion}</span>
                </p>
                <p className="text-justify leading-8 mb-8">
                    <span className="font-Arial"></span>
                    <br />
                    <span >
                        La Universidad Autónoma de Occidente agradece de antemano el apoyo brindado al alumno&nbsp;
                        {carta.alumno_nombre} con matrícula {carta.alumno_matricula} que cursa el {carta.semestre}° semestre del Programa&nbsp;
                    </span>
                    <strong>
                        <span >
                            Educativo {carta.alumno_carrera}
                        </span>
                    </strong>
                    <span >
                        . Asimismo, se informa que su número de afiliación de seguridad social es&nbsp;
                        {carta.alumno_seguro} para que realice su
                    </span>
                    <strong>
                        <span >
                            &nbsp;Estancia Académica Profesional
                        </span>
                    </strong>
                    <span >
                        , durante el periodo comprendido del {carta.inicio} al {carta.termino} en ese organismo receptor, lo que le permitirá aplicar sus
                        conocimientos teóricos y competencias profesionales que adquirió durante su trayectoria académica.
                    </span>
                </p>

                <p className="text-justify leading-8">
                    <span>
                        Es importante hacer de su conocimiento que el alumno deberá elaborar un
                        programa de actividades en donde cubrirá 640 horas, por ello, solicito su
                        valiosa colaboración para que le brinden la información necesaria en la
                        elaboración del programa respectivo. Asimismo se les informa que el
                        alumno será deslindado de cualquier responsabilidad laboral a la empresa,
                        excluyendo a ésta de cualquier responsabilidad de las actividades que el
                        alumno realice.
                    </span>
                </p>
                <p className="text-justify leading-8">
                    <span>
                        Sin más por el momento, me despido de usted quedando cordialmente a sus
                        órdenes.
                    </span>
                </p>
                <p className="leading-8 ">
                    <span>&nbsp;</span>
                </p>
                <p className="text-center leading-8 ">
                    <strong>
                        <span >Atentamente.</span>
                    </strong>
                </p>
                <p className="text-center leading-8 ">
                    <strong>
                        <span >"Por la Cultura a la Libertad"</span>
                    </strong>
                </p>
                <p className="text-center leading-8 ">
                    <strong>
                        <span>&nbsp;</span>
                    </strong>
                    <strong>
                        <span>Dr. Antonio Sánchez Velazco</span>
                    </strong>
                </p>
                <p className="text-center leading-8 ">
                    <strong>
                        <span>
                            Responsable de Estancia Académica Profesional
                        </span>
                    </strong>
                    <span className="leading-5 text-xs">&nbsp;</span>
                </p>
                <p className="text-center leading-8 ">
                    <strong>
                        <span >Unidad Regional Mazatlán</span>
                    </strong>
                </p>
                <div className="clear-both">
                    <p className="Footer">
                        <br />
                    </p>
                    <p className="Footer">
                        <span className="text-red-700">
                            &nbsp;
                            <span className="text-red-700">
                                Ave. Gabriel Leyva No.300 Norte, CP 81200, Los Mochis, Sinaloa, México
                                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                            </span>
                        </span>
                        <span className="text-red-700">
                            Blvd. Lola Beltrán y Blvd. Rolando Arjona. CP 80020, Culiacán, Sinaloa,
                            México
                        </span>

                    </p>
                </div>
            </div>
        </div>

    )
}

export default CartaPresentacion