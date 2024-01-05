import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthLayout from './layout/AuthLayout';
import RutaProtegida from './layout/RutaProtegida';

import Login from './paginas/Login';
import Dashboard from './paginas/Dashboard';

import { AuthProvider } from './context/AuthProvider';
import EncargadoProvider from './context/EncargadoProvider';
import MaestroProvider from './context/MaestroProvider';
import AlumnoProvider from './context/AlumnoProvider';

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <EncargadoProvider>
          
          <MaestroProvider>

            <AlumnoProvider>
              <Routes>
                <Route path='/' element={<AuthLayout />}>
                  <Route index element={<Login />} />
                </Route>

                <Route path='/dashboard' element={<RutaProtegida />}>
                  <Route index element={<Dashboard />} />
                </Route>
              </Routes>
            </AlumnoProvider>

          </MaestroProvider>

        </EncargadoProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
