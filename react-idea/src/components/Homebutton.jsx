import React from 'react';
import { useNavigate } from 'react-router-dom';

function HomeButton() {
    
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/home');
    };

    return (
        <button id='homeButton' onClick={handleClick}>
        Home
        </button>
    );

}


export default HomeButton;