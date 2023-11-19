import { Navigate  } from 'react-router-dom';

export const PrivateRoute = ({ element }) => {
    // this is going to query for a token in local storage
    if (false) {
      return element;
    } else {
      return <Navigate to="/login" />;
    }
};