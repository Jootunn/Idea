import React, {useState, useEffect} from "react";
import AddItem from "../components/Todo-components/Additem.jsx";
import ListItem from "../components/Todo-components/Listitem.jsx";
import Cookies from "universal-cookie";
import axios from "axios"

const cookies = new Cookies()

function ToDoList() {
    const [items, setItems] = useState([])
    const userID= cookies.get("user_data").id

    useEffect(() => {
        async function fetchData() {
            try {
                let response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/get-items`, {
                    params: {
                        userID: userID
                    },
                });
                setItems(response.data["_list"] || []);
                
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchData();

    }, []);


    async function addNewItemToDatabase(input) {
        try {
            const response = await axios.post(`${import.meta.env.VITE_APP_API_URL}/to-do-list`, {
                toDoItem: input,
                userID: userID,
            });
            const newItemId = response.data.id   
            setItems(prevItems => [...prevItems,{id: newItemId, item_text: input }]);
        } catch (error) {
            console.error("Errore durante l'invio dell'elemento", error);
        }
    }

    async function deleteFromDatabase(itemId) {
        setItems(prevItems => prevItems.filter(item => item.id !== itemId));
        try {
            await axios.post(`${import.meta.env.VITE_APP_API_URL}/delete-item-list`, {
                userID: userID,
                itemID: itemId
            });
            
        } catch (error) {
            console.error("Errore durante l'eliminazione dell'elemento", error);
        }
    }

    return <div className="todolist-page">
        <div className="header">
            <AddItem addItemToDatabase={addNewItemToDatabase} />
        </div>
        <div className="content-body">
            <ListItem items={items} onDeleteFromDatabase={deleteFromDatabase} />
        </div>
    </div>
}

export default ToDoList