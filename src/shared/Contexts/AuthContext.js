import { createContext } from 'react';

const AuthContext = createContext({
    loggedIn: false,
    signIn: () => { },
    signOut: () => { }
});

export default AuthContext;

