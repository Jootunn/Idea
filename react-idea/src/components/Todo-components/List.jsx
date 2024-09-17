import React from "react";

function List({id, text, onDeleteFromDatabase}) {

    function onClick() {
        onDeleteFromDatabase(id)
    }

    return (
        <div className=" object">
            <div className="button-text">
                <li id={id}>{text}</li>
            </div>
            <div className="delete-button">
                <button onClick={onClick}>Delete</button>

            </div>
        </div>
    )
}

export default List