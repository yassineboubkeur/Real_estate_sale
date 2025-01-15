import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './auth/AuthContext.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
// import { AuthContext } from './auth/AuthProvider.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="1035733174130-fi2ivpj7gf7jesm1f2rpbi8r72959nqi.apps.googleusercontent.com">  {/* Wrap with the provider */}
    <AuthProvider>
       <App />
       <ToastContainer /> 
   </AuthProvider>
  </GoogleOAuthProvider>
    
   
  
     
    
    
  </StrictMode>,
)
