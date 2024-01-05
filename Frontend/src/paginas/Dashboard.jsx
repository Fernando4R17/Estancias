import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useAuth } from "../context/AuthProvider";
import CartaPresentacion from "../components/Alumno/CartaPresentacion";

const Dashboard = () => {

  const { usuario, content } = useAuth();
  let tipoUsuario;

  if (usuario?.Datos?.alumno) {
    tipoUsuario = 'alumno';
  }

  if (usuario?.Datos?.maestro) {
    tipoUsuario = 'maestro';
  }

  if (usuario?.Datos?.encargado) {
    tipoUsuario = 'encargado';
  }

  return (

    <>
      {content === 'carta' ? <CartaPresentacion /> : (
        <div className="lg:flex lg:w-full">
          <div className="max-h-screen grid grid-col-1 lg:grid-cols-6">

            <Sidebar tipo={tipoUsuario} />
            <Header usuario={usuario} tipo={tipoUsuario} />

          </div>
        </div>
      )}

    </>


  )
}

export default Dashboard