import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import { Navigate } from 'react-router-dom';
import Loading from '../components/Loading/Loading';

function IsPrivate({ children }) {
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  // If the authentication is still loading ⏳
  if (isLoading)
    return (
      <div className="loading">
        <Loading />
      </div>
    );

  if (!isLoggedIn) {
    // If the user is not logged in ❌
    return <Navigate to="/login" />;
  } else {
    // If the user is logged in, allow to see the page ✅
    return children;
  }
}

export default IsPrivate;
