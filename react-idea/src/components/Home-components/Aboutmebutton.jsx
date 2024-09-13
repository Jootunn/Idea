import React from "react";
import { useNavigate } from "react-router-dom";

function aboutMeButton(){
    const navigate = useNavigate()

    function handleClick(){
        navigate('/about-me')
    }

    return (
        <button onClick={handleClick}>About me</button>
    )
}

export default aboutMeButton