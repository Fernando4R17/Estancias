import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import Loading from '../components/Loading';

const RutaProtegida = () => {

    const { auth, cargando } = useAuth();

    if(cargando) return <Loading />
    
    return (

        <>
            {auth?._id ? (<Outlet />) : <Navigate to="/" />}
        </>
        

    )
}

export default RutaProtegida