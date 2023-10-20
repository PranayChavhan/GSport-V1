import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { userApi } from '../../redux/api/userApi';
import { useAppSelector } from '../../redux/store';
import Cookies from 'universal-cookie'

const RequireAuth = ({ allowedRoles })=> {
  const location = useLocation();
  const cookie = new Cookies()

  const token = cookie.get('jwt_auth_token')

  return (allowedRoles.includes('player') && token) ? 
    <Outlet />
   : 
    <Navigate to='/user/login' state={{ from: location }} replace />
  ;
};

export default RequireAuth;