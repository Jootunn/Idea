import React from 'react';
import { googleLogout } from '@react-oauth/google';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';

const cookies = new Cookies()

function logOut(){

    const navigate = useNavigate();

    const log_out = () => {
            googleLogout();
            cookies.remove("user_data")
            navigate('/');
    };

    return (
        <button onClick={log_out}>Logout</button>
    )
}

export default logOut