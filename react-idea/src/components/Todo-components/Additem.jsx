import React, { useState } from "react";
import Navbar from "../navbar/Navbar";

function addItem({addItemToDatabase}) {
    const [input, setInput] = useState("")

    function handleChange(event) {
        setInput(event.target.value)
    }

    const handleClick = () => {
        if (input.trim() ) {
            addItemToDatabase(input)
            setInput("")
        }
    }

    return (
        <div className="header">
            <Navbar/>
            <div className="input-button">
                <input id="text-input" onChange={handleChange} type="text" value={input} />
                <button onClick={handleClick} >Add</button>
            </div>
        </div>
    )
}

export default addItem