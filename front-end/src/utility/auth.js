import { useState, createContext } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { isUserLoggedIn } from './Utils';
import { toastErro } from '../components/Toast';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  const logIn = user => {
    setUser(user)
  }

  const logOut = () => {
    localStorage.removeItem("token");
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const RequireAuth = ({ children }) => {
  const location = useLocation()
  if (!isUserLoggedIn()) {
    return <Navigate to='/login' state={{ path: location.pathname }} />
  }
  return children
}
