import React from "react";
import { useNavigate } from "react-router-dom";

function ToDoButton(){
    const navigate = useNavigate()

    function handleClick(){
        navigate('/todolist')
    }

    return (
        <button onClick={handleClick}>Go to ToDoList</button>
    )
}

export default ToDoButton