// React import not required with the new JSX runtime
import { Navigate, useLocation } from 'react-router-dom';

const AdminRoute = ({ children }) => {

  const isAuthenticated = sessionStorage.getItem('token');
  const isAdmin = sessionStorage.getItem('isAdmin');
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate 
    to="/login" 
    state={{ from: location }} 
    replace 
  />
  }
  // sessionStorage stores strings — compare strictly to 'true'
  if (isAdmin !== 'true') {
    return (
      <Navigate to="/" state={{ from: location }} replace />
    );
  }

  return children;
};

export default AdminRoute;