import './style.css';
import { FaGoogle, FaGithub } from "react-icons/fa";
import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { getFirestore, collection, getDocs, setDoc } from "firebase/firestore";
import { doc, query, limit, where } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import firebaseConfig from '../../FirebaseData';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

function Registration({ setIsAuthenticated }) {

    const navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    // const [token, setToken] = useState('');
    const [uid, setUid] = useState('');
    const [username, setUsername] = useState('');
    const [isNewUser, setIsNewUser] = useState(false);

    const handleRegistration = (userid) => {
        setIsAuthenticated(true);
        console.log("uid is = " + userid);
        navigate('/dashboard', { state: { userId: userid } });
    };


    const handleGoogleLogin = () => {
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const accessToken = credential.accessToken;
                // setToken(accessToken);
                const userId = result.user.uid;
                setUid(userId)
                checkIfUserExists(userId);
                handleRegistration(userId);
            }).catch((error) => {
                console.log(error);
            })
    }

    const handleGithubLogin = () => {
        signInWithPopup(auth, githubProvider)
            .then((result) => {
                const credential = GithubAuthProvider.credentialFromResult(result);
                const accessToken = credential.accessToken;
                // setToken(accessToken);
                const userId = result.user.uid;
                setUid(userId)
                checkIfUserExists(userId);
                handleRegistration(userId);
            }).catch((error) => {
                console.log(error);
            })
    }

    const checkIfUserExists = async (uid) => {
        try {
            console.log(uid);
            const q = query(collection(db, "users"), where("userId", "==", uid), limit(1));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                console.log('User already set');
                setIsLoggedIn(true);
            } else {
                setIsNewUser(true);
            }
        } catch (error) {
            console.error("Error checking user:", error);
        }
    };

    const handleUsernameSubmit = async () => {
        if (!username.trim()) {
            alert('Please enter a username');
            return;
        }

        try {
            const user = auth.currentUser;
            if (user) {
                await setDoc(doc(db, "users", user.uid), {
                    userId: user.uid,
                    email: user.email,
                    username: username,
                    streak: 0,
                    lastSeen: new Date("10/14/2024").toLocaleDateString("en-us"),
                    logs: [],
                });
                setIsLoggedIn(true);
                setIsNewUser(false);
            }
        } catch (error) {
            console.error("Error saving user:", error);
        }
    };

    return (
        <div className="registration-container">
            {!isLoggedIn && !isNewUser ? (
                <div className="registration-box">
                    <h1>Welcome Back!</h1>
                    <div className="login-buttons">
                        <button className="login-btn google-btn" onClick={handleGoogleLogin}>
                            <FaGoogle />
                            <span>Continue with Google</span>
                        </button>

                        <button className="login-btn github-btn" onClick={handleGithubLogin}>
                            <FaGithub />
                            <span>Continue with GitHub</span>
                        </button>
                    </div>
                </div>
            ) : isNewUser ? (
                <div className="registration-box">
                    <h2>Set Your Username</h2>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter username"
                        className="username-input"
                        style={{
                            padding: '0.5rem',
                            margin: '1rem 0',
                            width: '100%',
                            borderRadius: '4px',
                            border: '1px solid #ccc'
                        }}
                    />
                    <button
                        className="copy-token-btn"
                        onClick={handleUsernameSubmit}
                    >
                        Confirm Username
                    </button>
                </div>
            ) : (
                <div className="success-box" style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    margin: '0 auto',
                    padding: '2rem',
                    maxWidth: '500px'
                }}>
                    <h2>Successfully Logged In!</h2>
                    <p>Your access token:</p>
                    <div className="token-display">
                        {uid}
                    </div>
                    <div style={{
                        display: 'flex',
                        gap: '1rem',
                        width: '100%'
                    }}>
                        <button className='copy-token-btn'
                            onClick={() => {
                                navigator.clipboard.writeText(uid);
                                alert('Token copied to clipboard!');
                            }}
                            style={{ flex: 1 }}
                        >
                            Copy Token
                        </button>

                        <button
                            className="copy-token-btn"
                            onClick={() => navigate('/dashboard')}
                            style={{
                                backgroundColor: 'black',
                                color: 'white',
                                border: 'solid black',
                                flex: 1,
                                ':hover': {
                                    backgroundColor: 'white',
                                    color: 'black',
                                    border: 'solid black'
                                }
                            }}
                        >
                            Continue
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Registration;
