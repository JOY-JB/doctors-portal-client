import { useState, useEffect } from "react";
import initializeAuthentication from "../Pages/Login/Firebase/Firebase.init";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, getIdToken, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, updateProfile, signOut } from "firebase/auth";



// initialize authentication
initializeAuthentication()

const auth = getAuth();

const useFirebase = () => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [authError, setAuthError] = useState('');
    const [admin, setAdmin] = useState(false);
    const [token, setToken] = useState('')

    const googleProvider = new GoogleAuthProvider();

    const registerUser = (email, password, name, history) => {
        setLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setAuthError('')
                const newUser = { email, displayName: name }
                setUser(newUser);
                history.push('/')

                //send data to server
                saveUser(email, name, 'POST');

                // name update in firebase
                updateProfile(auth.currentUser, {
                    displayName: name
                }).then(() => {

                }).catch((error) => {

                });
            })
            .catch((error) => {
                setAuthError(error.message);
            })
            .finally(() => setLoading(false));
    }

    const loginUser = (email, password, history, location) => {
        setLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const destination = location?.state?.from || "/";
                history.replace(destination);
                setAuthError('');
            })
            .catch((error) => {
                setAuthError(error.message);
            })
            .finally(() => setLoading(false));
    }

    const googleSignIn = (history, location) => {
        setLoading(true);
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const destination = location?.state?.from || "/";
                history.push(destination);
                const user = result.user;
                saveUser(user.email, user.displayName, 'PUT');

            }).catch((error) => {
                setAuthError(error.message);

            }).finally(() => setLoading(false));
    }

    useEffect(() => {
        fetch(`https://salty-island-18444.herokuapp.com/user/${user.email}`)
            .then(res => res.json())
            .then(data => {
                setAdmin(data.admin);
            })
    }, [user.email])

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                getIdToken(user)
                    .then(idToken => {
                        setToken(idToken);
                    })
            } else {
                setUser({});
            }
            setLoading(false);
        });
    }, [])


    //send user to server
    const saveUser = (email, displayName, method) => {
        const user = { email, displayName };

        fetch('https://salty-island-18444.herokuapp.com/user', {
            method: method,
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json)
            .then(data => console.log(data));
    }

    const logout = () => {
        setLoading(true);
        signOut(auth).then(() => {
            setUser({});
            setAuthError('');
        }).catch((error) => {
            setAuthError(error.message);
        })
            .finally(() => setLoading(false));
    }


    return {
        user,
        loading,
        authError,
        admin,
        token,
        registerUser,
        googleSignIn,
        logout,
        loginUser
    }
}

export default useFirebase;