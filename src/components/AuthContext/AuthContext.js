import { useContext, createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, getIdToken } from 'firebase/auth';
import { auth, db } from './firebase';
import { addDoc, collection } from 'firebase/firestore/lite';

const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState({});

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
        const unsubcribe = onAuthStateChanged(auth, async (currentUser) => {
            // if (!currentUser) {
            //     return;
            // }
            setUser(currentUser);
            // const docRef = await addDoc(collection(db, 'profile'), {
            //     avatar: currentUser.photoURL,
            //     bio: currentUser.email,
            //     displayName: currentUser.displayName,
            //     follower: 0,
            //     following: 0,
            //     nickName: currentUser.uid,
            // });
            // console.log(docRef.id);
            //cũng là accessToken
            // const token = await currentUser.getIdToken();
        });
        return () => {
            unsubcribe();
        };
    }, [user]);

    return <AuthContext.Provider value={{ googleSignIn, logOut, user }}>{children}</AuthContext.Provider>;
};
export const UserAuth = () => {
    return useContext(AuthContext);
};

console.log(auth.currentUser);
