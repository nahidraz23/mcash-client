import React, { createContext, useState } from 'react';
// import useUser from '../hooks/useUser';

export const AuthContext = createContext(null);

const Auth = ({ children }) => {

    const [user, setUser] = useState(null);
    console.log(user);
    // const [loadedUser] = useUser(user);

    // console.log(loadedUser);

    const authInfo = {
        user,
        setUser,
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default Auth;