import React, { useContext } from 'react';
import { AuthContext } from '../provider/Auth';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoutes = ({children}) => {
    const {user} = useContext(AuthContext);
    const locaton = useLocation()

    if (user ) {
        return children
    }

    return <Navigate to={'/login'} state={locaton?.pathname || '/'}/>
};

export default PrivateRoutes;