import Alumno from '../models/Alumno.js';
import Carrera from '../models/Carrera.js';
import Administrador from '../models/Administrador.js';
import Usuario from '../models/Usuario.js';
import Grupo from '../models/Grupo.js';
import Maestro from '../models/Maestro.js';
import Empresa from '../models/Empresa.js';

export default async function verificarBasedeDatos() {
    try {
        // DEPENDEN DE CARRERA: EMPRESA, ALUMNO, GRUPO, MAESTRO
        // DEPENDE DE EMPRESA: SOLICITUDINSCRIPCION
        // DEPENDEN DE ALUMNO: USUARIO, GRUPO, EVALUACIONPRESTADOR,  INFORMEFINAL, PLANTRABAJO, REPORTEACTIVIDADES, SOLICITUDINSCRIPCION
        // DEPENDE DE GRUPO: MAESTRO
        // DEPENDE DE MAESTRO: USUARIO
        // DEPENDE DE ADMINISTRADOR: USUARIO, SOLICITUDINSCRIPCION,
        // NO DEPENDEN: ADMINISTRADOR, CARRERA,

        const cantidadUsuarios = await Usuario.countDocuments();

        if(cantidadUsuarios === 0){
            try {
                const carrerasCreadas = await Carrera.create(CARRERAS);

                const idCarrera = carrerasCreadas.map((carrera) => carrera._id)

                const Alumnos = ALUMNOS.map((alumno) => ({
                    ...alumno,
                    carrera_fk: idCarrera[0]
                }))

                const alumnosCreados = await Alumno.create(Alumnos);

                
                alumnosCreados.map((alumno) => {
                    GRUPOS.push({
                        nombre_grupo: 'ISOF01',
                        alumno_fk: alumno._id,
                        carrera_fk: idCarrera[0],
                    })

                    const password = alumno.app.substring(0,2) + alumno.matricula % 1000

                    USUARIOS.push({
                        matricula: alumno.matricula,
                        password,
                        alumno_fk: alumno._id
                    })
                })
                
                await Grupo.create(GRUPOS);

                const Maestros = MAESTROS.map((maestro) => ({
                    ...maestro,
                    carrera_fk: idCarrera[0]
                }));

                const maestrosCreados = await Maestro.create(Maestros);

                maestrosCreados.map((maestro) => {
                    const password = maestro.app.substring(0,2) + maestro.matricula % 1000
                    
                    USUARIOS.push({
                        matricula: maestro.matricula,
                        password,
                        maestro_fk: maestro._id
                    })
                })

                const Empresas = EMPRESAS.map((empresa) => ({
                    ...empresa,
                    carrera_fk: idCarrera[0]
                }));

                await Empresa.create(Empresas);

                const AdministradoresCreados = await Administrador.create(ADMINISTRADORES);

                AdministradoresCreados.map((admin) => {
                    const password = admin.app.substring(0,2) + admin.matricula % 1000
                    
                    USUARIOS.push({
                        matricula: admin.matricula,
                        password,
                        administrador_fk: admin._id
                    })
                })

                await Usuario.create(USUARIOS)


            } catch (error) {
                console.log(error);
            }
            
            console.log('Registros creados con éxito.');

        }else {
            console.log('Ya hay registros  en la base de datos.');
        }
    } catch (error) {
        console.error('Error al verificar y crear registros:', error);
    }
}

const USUARIOS = [

]

const MAESTROS = [
    {
        matricula: 2320,
        nombre: 'Monica',
        app: 'Sanchez',
        apm: '',
        grupo_fk: null,
        carrera_fk: null
    }
]

const GRUPOS = [
    
]

const EMPRESAS = [
    {
        nombre: 'CHEVROLET DE MAZATLÁN S.A DE C.V.',
        direccion: 'AV. REFORMA 312',
        sector: 'PRIVADO',
        razon_social: 'DISTRIBUIDORA DE AUTOS Y CAMIONES, S. A. DE C. V.',
        giro_empresarial: '',
        remoto: 'VIRTUAL',
        nombre_contacto: 'LIC. YAJAIRA PERAZA',
        departamento: 'RECURSOS HUMANOS',
        cargo: 'JEFA RECURSOS HUMANOS',
        telefono: 6699159000,
        correo: '',
        carrera_fk: 'ISOF01'
    },
    {
        nombre: 'COMPAÑÍA COMERCIAL CIMACO S.A. DE C.V.',
        direccion: 'AV REFORMA 2206',
        sector: 'PRIVADO',
        razon_social: 'DISTRIBUIDORA DE AUTOS Y CAMIONES, S. A. DE C. V.',
        giro_empresarial: '',
        remoto: 'VIRTUAL',
        nombre_contacto: 'LIC.VANESSA JASMYN RODRIGUEZ ZAMORA',
        departamento: 'RECURSOS HUMANOS',
        cargo: 'JEFA RECURSOS HUMANOS',
        telefono: 6699895700,
        correo: '',
        carrera_fk: 'ISOF01'
    },
    {
        nombre: 'GRUPO PREMIER DE ORIENTE MAZATLÀN, S. DE R.L. DE C.V.',
        direccion: 'AV REFORMA 309',
        sector: 'PRIVADO',
        razon_social: 'DISTRIBUIDORA DE AUTOS Y CAMIONES, S. A. DE C. V.',
        giro_empresarial: '',
        remoto: 'VIRTUAL',
        nombre_contacto: 'LIC. YAJAIRA PERAZA',
        departamento: 'RECURSOS HUMANOS',
        cargo: 'JEFA RECURSOS HUMANOS',
        telefono: 6699159000,
        correo: '',
        carrera_fk: 'ISOF01'
    },
    {
        nombre: 'GRUPO PETROMAR (APOYOS ADMINISTRATIVOS PPA S.C)',
        direccion: 'AV. CAMARÓN SÁBALO LOMAS DE MAZATLÁN',
        sector: 'PRIVADO',
        razon_social: 'DISTRIBUIDORA DE AUTOS Y CAMIONES, S. A. DE C. V.',
        giro_empresarial: '',
        remoto: 'VIRTUAL',
        nombre_contacto: 'LIC. JESÚS LIZÁRRAGA MORA',
        departamento: 'RECURSOS HUMANOS',
        cargo: 'JEFA RECURSOS HUMANOS',
        telefono: 6699159000,
        correo: '',
        carrera_fk: 'ISOF01'
    }
]

const ADMINISTRADORES = [
    {
        matricula: 1010,
        nombre: 'Antonio',
        app: 'Sanchez',
        apm: 'Velazco',
        cargo: 'Encargado',
    }
]

const CARRERAS = [
    {
        nombre_carrera: 'Ingenieria de Software',
        nombre_coordinador: 'Juan Carlos Ojeda Alarcon',
        nombre_corto: 'ISOF'
    },
    {
        nombre_carrera: 'Música',
        nombre_coordinador: 'Victor Osuna',
        nombre_corto: 'IMUS'
    }
]


const ALUMNOS = [
    {
        matricula: 20053456,
        nombre: 'Carlos',
        app: 'Martínez',
        apm: 'López',
        lugar_fecha_nacimiento: 'Los Mochis, Sinaloa. 10/03/02',
        numero_afiliacion: 555555555,
        correo: 'carlos.m@example.com',
        telefono: 9871234567,
        direccion: 'Avenida Principal 456, Col. Reforma',
        estado: 'Sinaloa',
        municipio: 'Los Mochis',
        unidad: 'Los Mochis',
        carrera_fk: '1',
        departamento: 'Programación Comercial',
        creditos_academicos: 300,
        promedio: 8.0
    },
    {
        matricula: 20054567,
        nombre: 'Elena',
        app: 'Hernández',
        apm: 'Gómez',
        lugar_fecha_nacimiento: 'Guasave, Sinaloa. 20/11/99',
        numero_afiliacion: 111222333,
        correo: 'elena.h@example.com',
        telefono: 7894561230,
        direccion: 'Callejón 789, Col. Juárez',
        estado: 'Sinaloa',
        municipio: 'Guasave',
        unidad: 'Guasave',
        carrera_fk: '1',
        departamento: 'Programación Comercial',
        creditos_academicos: 450,
        promedio: 9.5
    },
    {
        matricula: 20055678,
        nombre: 'Mario',
        app: 'López',
        apm: 'García',
        lugar_fecha_nacimiento: 'Mazatlán, Sinaloa. 15/06/01',
        numero_afiliacion: 999888777,
        correo: 'mario.l@example.com',
        telefono: 4567890123,
        direccion: 'Paseo Costero 789, Col. Vista Hermosa',
        estado: 'Sinaloa',
        municipio: 'Mazatlán',
        unidad: 'Mazatlán',
        carrera_fk: '1',
        departamento: 'Programación Comercial',
        creditos_academicos: 350,
        promedio: 8.8
    },
    {
        matricula: 20057890,
        nombre: 'Javier',
        app: 'Hernández',
        apm: 'García',
        lugar_fecha_nacimiento: 'Los Mochis, Sinaloa. 12/09/00',
        numero_afiliacion: 777888999,
        correo: 'javier.h@example.com',
        telefono: 7890123456,
        direccion: 'Calle Principal 789, Col. Reforma',
        estado: 'Sinaloa',
        municipio: 'Los Mochis',
        unidad: 'Los Mochis',
        carrera_fk: '1',
        departamento: 'Programación Comercial',
        creditos_academicos: 420,
        promedio: 8.7
    },
    {
        matricula: 20052345,
        nombre: 'Ana',
        app: 'García',
        apm: 'Pérez',
        lugar_fecha_nacimiento: 'Culiacán, Sinaloa. 05/08/00',
        numero_afiliacion: 987654321,
        correo: 'ana.garcia@example.com',
        telefono: 1239876543,
        direccion: 'Calle Principal 123, Col. Centro',
        estado: 'Sinaloa',
        municipio: 'Culiacán',
        unidad: 'Culiacán',
        carrera_fk: '1',
        departamento: 'Programación Comercial',
        creditos_academicos: 400,
        promedio: 8.5
    },
    {
        matricula: 20050113,
        nombre: 'Luis Fernando',
        app: 'Alvarez',
        apm: 'Ramirez',
        lugar_fecha_nacimiento: 'Mazatlan, Sinaloa. 17/12/01',
        numero_afiliacion: 987654321,
        correo: 'fer@example.com',
        telefono: 1239876543,
        direccion: 'Calle Principal 123, Col. Centro',
        estado: 'Sinaloa',
        municipio: 'Mazatlán',
        unidad: 'Mazatlán',
        carrera_fk: '1',
        departamento: 'Programación Comercial',
        creditos_academicos: 500,
        promedio: 9.9
    },

]