import React from "react";
import { useNavigate } from "react-router-dom";

function RedirectToNotes(){
    const navigate = useNavigate()

    function handleClick(){
        navigate('/notes')
    }

    return (
        <button onClick={handleClick}>Go to Notes</button>
    )
}

export default RedirectToNotes