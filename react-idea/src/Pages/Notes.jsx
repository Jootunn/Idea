import React, {useState, useEffect} from "react";
import Textarea from "../components/Note-components/Textarea.jsx";
import Note_component from "../components/Note-components/Notecomponent.jsx";
import Navbar from "../components/navbar/Navbar.jsx"
import axios from "axios"
import Cookies from "universal-cookie";

const cookies = new Cookies()

function Notes() {
    const [items, setItems] = useState([])
    const userID= cookies.get("user_data").id
    const [updateCount, setUpdateCount] = useState(0);

    useEffect(() => {
        async function fetchData() {
            try {
                let response = await axios.get("http://localhost:3000/get-notes", {
                    params: {
                        userID: userID
                    },
                });
                setItems(response.data["notes"]);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchData();
    }, []);


    async function addNewItemToDatabase(note) {
        try {
            const response = await axios.post("http://localhost:3000/add-note", {
                noteTitle: note.title,
                noteContent : note.content,
                userID : userID
            });
            const newItemId = response.data.id 
            setItems(prevItems => [...prevItems, { id: newItemId, item_text: note}]);
        } catch (error) {
            console.error("Errore durante l'invio dell'elemento", error);
        }
    }

    async function deleteFromDatabase(noteID) {
        try {
            await axios.post(`http://localhost:3000/del-note`, {
                userID: userID,
                noteID: noteID
            });
        } catch (error) {
            console.error("Errore durante l'eliminazione dell'elemento", error);
        }
    }

    async function deleteFromList(itemId) { 
        setItems(prevItems => prevItems.filter(item => item.id !== itemId));
    }

    async function updateNotes(updatedNotes) {
        try {
            const response = await axios.post("http://localhost:3000/update-note", {
                userID: userID,
                noteID: updatedNotes.id,
                itemTitle: updatedNotes.title,
                itemText: updatedNotes.content
            });
    
            
            if (response.data.success) {
                return true; 
            } else {
                console.error("Errore durante l'aggiornamento del backend:", response.data.message);
                return false;
            }
        } catch (error) {
            console.error("Errore durante la chiamata al backend:", error);
            return false;
        }
    }

    function updateFrontend(updatedNotes) {
        setItems(prevItems =>
            prevItems.map(item =>
                item.id === updatedNotes.id
                    ? { ...item, note_title: updatedNotes.title, note_content: updatedNotes.content }
                    : item
            )
        );
    }

    return (<div>
        <Navbar/>
        <Textarea addItemToDatabase={addNewItemToDatabase} />
        <div className="items-block">
            <ul>
                {items.map((note, index)=>{

                    return <Note_component
                        updateFrontend={updateFrontend}
                        deleteFromDatabase={deleteFromDatabase} 
                        deleteFromList={deleteFromList}
                        updateNotes = {updateNotes}
                        key={index} 
                        note={note}
                    />
                })}
            </ul>
        </div>
    </div>
    )
}

export default Notes