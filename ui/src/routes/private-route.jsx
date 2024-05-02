import { useSelector } from 'react-redux';
import { Navigate  } from 'react-router-dom';

export const PrivateRoute = ({ element }) => {
    const user = useSelector(state => state.user);

    if (user.token) {
      return element;
    } else {
      return <Navigate to="/login" />;
    }
};