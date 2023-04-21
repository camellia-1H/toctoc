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
import { setDoc, addDoc, doc, getDoc, onSnapshot } from 'firebase/firestore';

const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [userInfo, setUserInfo] = useState({});
    const [videoList, setVideoList] = useState([]);

    const googleSignIn = () => {
        const ggProvider = new GoogleAuthProvider();
        signInWithPopup(auth, ggProvider);
        // .then((data) => {})
        // .catch((error) => {});
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
        setDoc(doc(db, 'user_video', email), {
            user_id: user?.email ? user.email : email,
            video: [],
        });
        console.log('nguu');
        setDoc(doc(db, 'user', email), {
            user_id: user?.email ? user.email : email,
            avatar: '',
            bio: 'm nguu',
            followers: 0,
            following: 0,
            like: 0,
            nickname: 'manhdontcare',
            username: 'nopem',
        });
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

    const userRef = doc(db, 'user', `${user?.email}`);

    useEffect(() => {
        try {
            console.log('effect2');
            const ngu = async () => {
                const result = await getDoc(userRef);
                setUserInfo(result.data());
            };
            ngu();
        } catch (error) {}
    }, [user?.email]);

    console.log(userInfo);

    // const videoFeedRef = doc(db, 'video_feed', 'video_feed');
    useEffect(() => {
        onSnapshot(doc(db, 'video_feed', 'video_feed'), (doc) => {
            setVideoList(doc.data());
            console.log(videoList);
        });
    }, []);

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
