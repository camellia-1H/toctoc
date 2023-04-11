import { useContext, createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState([]);

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider);
        // .then((data) => {})
        // .catch((error) => {});
    };

    const logOut = () => {
        signOut(auth);
    };

    useEffect(() => {
        console.log('use effect');
        const unsubcribe = onAuthStateChanged(auth, (currentUser) => {
            console.log(currentUser);
            setUser((prev) => [...prev, currentUser]);
            console.log(user);
        });
        return () => {
            unsubcribe();
            console.log(user);
        };
    }, []);

    return <AuthContext.Provider value={{ googleSignIn, logOut, user }}>{children}</AuthContext.Provider>;
};
export const UserAuth = () => {
    return useContext(AuthContext);
};

console.log(auth.currentUser);
