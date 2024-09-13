import React, { useEffect, useState } from "react";
import axios from "axios"
import Cookies from "universal-cookie";

function note_component({note, deleteFromDatabase, deleteFromList, updateNotes, updateFrontend}) {
    const [isClick, setClick] = useState(false)
    const [updatedNotes, setUpdatedNotes] = useState({
        id : note.id,
        title : note.note_title,
        content : note.note_component
    })
    const cookies = new Cookies(null, {path:"/"})

    function handleChange(event) {
        const {value, name} = event.target

        setUpdatedNotes(prevValue =>{
            return {...prevValue,
                [name] : value
            }
        })
    }

    function handleClick() {
        setClick(prevValue => !prevValue)
    }

    async function submitChange() {
        const backendSuccess = await updateNotes(updatedNotes);
        if (backendSuccess) {
            updateFrontend(updatedNotes);
            setClick(false);
        } 
    }

    function handleDel() {
        deleteFromDatabase(note.id)
        deleteFromList(note.id)
    }

    return (
        <div className="block">
            {isClick ? (
                <div className="items">
                    <input 
                            onChange={handleChange} 
                            id={note.id} name="title" 
                            type="text" 
                            placeholder={note.note_title} 
                            value={note.title}
                        />
                    <textarea 
                            onChange={handleChange} 
                            id={note.id} 
                            name="content" 
                            placeholder={note.note_content} 
                            value={updatedNotes.content}/>
                    <div className="items-buttons">
                        <button onClick={()=>{
                                handleClick();
                                submitChange();
                            }}>Save</button>
                        <button onClick={()=>{setClick(false)}}>
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <div className="items">
                    <h3>{note.note_title}</h3>
                    <p>{note.note_content}</p>
                    <div className="items-buttons">
                        <button onClick={handleClick} >Edit</button>
                        <button onClick={handleDel} >Delete</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default note_component