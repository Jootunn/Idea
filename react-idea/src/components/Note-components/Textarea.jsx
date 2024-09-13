import React, { useState } from "react";

function textArea({addItemToDatabase}) {
    const [note, setNote] = useState({
        title : '',
        content: ''
    })

    function handleChange(event) {
        const {value, name} = event.target

        setNote(prevValue =>{
            return {...prevValue,
                [name] : value
            }
        })
    }

    async function handleClick() {
        addItemToDatabase(note)
        setNote("")
    }

    return (
        <div className="note-header">
            <form> 
                <div className="text-area">
                    <input placeholder="Title" onChange={handleChange} type="text" name="title"  value={note.noteTitle}/>
                    <textarea placeholder="Content" onChange={handleChange} name="content" rows="3" value={note.noteContent}/>
                    <button onClick={handleClick} >Add</button>
                </div>
            </form>
        </div>
    )
}

export default textArea