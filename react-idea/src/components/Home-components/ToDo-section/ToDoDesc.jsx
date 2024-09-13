import React from "react";
import Todolistbutton from "./RedirectTodolist.jsx"

function TitleDescription() {
   

    return (
        <div className="ToDoList">
            <h2>To Do List</h2>
            <p>Set up your routine, write down things you want to do.</p>
            <Todolistbutton/>
        </div>
    )
}

export default TitleDescription