import { useContext, createContext, useEffect, useState } from 'react';
import {
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
    getIdToken,
    FacebookAuthProvider,
    updateProfile,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
} from 'firebase/auth';
import { auth, db } from './firebase';
import { setDoc, addDoc, doc, getDocs, onSnapshot, collection, where, query } from 'firebase/firestore';

const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [userInfo, setUserInfo] = useState({});
    const [videoList, setVideoList] = useState([]);

    const googleSignIn = () => {
        const ggProvider = new GoogleAuthProvider();
        signInWithPopup(auth, ggProvider)
            .then((data) => {
                setDoc(doc(db, 'user_video', data.user?.email), {
                    user_id: data.user.email,
                    bio: 'No bio yet',
                    followers: [],
                    following: [],
                    like: [],
                    nickname: `userGG${Math.floor(Math.random() * 9000) + 1000}`,
                    username: `userGG${Math.floor(Math.random() * 9000) + 1000}`,
                    avatar: data.user.photoURL,
                    video: [],
                });
                console.log('signin GG');
            })
            .catch((error) => {});
    };

    const facebookSignIn = () => {
        const fbProvider = new FacebookAuthProvider();
        signInWithPopup(auth, fbProvider);
        // .then((data) => {})
        // .catch((error) => {});
    };

    const EaPSignIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    // khi tạo acc mới sẽ tạo ra id và video[] rỗng
    // lưu thông tin user mới luôn : nick name, fl = 0 ...
    const EaPSignUp = (email, password) => {
        createUserWithEmailAndPassword(auth, email, password);
        console.log('setdoc');
        setDoc(doc(db, 'user_video', email), {
            user_id: user?.email ? user?.email : email,
            bio: 'No bio yet',
            followers: [],
            following: [],
            like: [],
            nickname: `user${Math.floor(Math.random() * 9000) + 1000}`,
            username: `user${Math.floor(Math.random() * 9000) + 1000}`,
            avatar: '',
            video: [],
        });
        console.log('nguu');
    };

    const logOut = () => {
        signOut(auth);
    };

    useEffect(() => {
        onSnapshot(doc(db, 'user_video', `${user?.email}`), (doc) => {
            setUserInfo(doc.data());
            console.log(userInfo);
        });
    }, [user?.email]);

    console.log(userInfo);

    useEffect(() => {
        const videoRef = [];
        const ngu = async () => {
            const querySnapshot = await getDocs(collection(db, 'user_video'));
            querySnapshot.forEach((doc) => {
                videoRef.push(doc.data());
            });
        };
        ngu();
        setVideoList(videoRef);
    }, []);

    useEffect(() => {
        console.log('use effect');
        const unsubcribe = onAuthStateChanged(auth, async (currentUser) => {
            // if (!currentUser) {
            //     return;
            // }
            setUser(currentUser);
        });
        return () => {
            unsubcribe();
        };
    }, [user?.email]);

    return (
        <AuthContext.Provider value={{ googleSignIn, facebookSignIn, EaPSignIn, EaPSignUp, logOut, user, userInfo, videoList }}>
            {children}
        </AuthContext.Provider>
    );
};
export const UserAuth = () => {
    return useContext(AuthContext);
};

console.log(auth.currentUser);
