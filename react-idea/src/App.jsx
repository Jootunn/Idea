import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import Card from './components/Card/Card.jsx';
import HomeButton from './components/Homebutton.jsx';
import {getStoredUser} from "./components/utils.jsx"
import Cookies from "universal-cookie"


export let isAuthenticated = getStoredUser()

const cookies = new Cookies()

function App() {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);



    const login = useGoogleLogin({
        onSuccess: (codeResponse) => {
            setProfile(true)
            try {
                axios.post("http://localhost:3000/login", {
                user : codeResponse.access_token
                }, {
                    withCredentials: true
                })
            } catch (error) {
                console.log(error);
                
            }
        },
        
    });

    useEffect(() => {
        const storedUser = getStoredUser();
        if (storedUser) {
            setUser(storedUser);
            setProfile(true)
        }
    }, []);

    const logOut = () => {
        googleLogout();
        setProfile(null);
        setUser(null);
        cookies.remove("user_data")
    };

    return (
        <div className='card'>
            <div className='login'>
                <Card/>
                {profile ? (
                    <div>
                        <button onClick={logOut}>Logout</button>
                        <HomeButton/>
                    </div>
                ) : (
                    <button id='loginButton' onClick={() =>{
                        login()
                    }
                    }>Sign in with Google</button>
                )}
            </div>
        </div>
    )
}




export default App;
