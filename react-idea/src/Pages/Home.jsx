import React from "react";
import Title from "../components/Home-components/Title.jsx";
import ToDoDesc from "../components/Home-components/ToDo-section/ToDoDesc.jsx"
import NotesDesc from "../components/Home-components/Notes-section/NoteDesc.jsx";
import Navbar from "../components/navbar/Navbar.jsx";
import Aboutmecomp from "../components/Home-components/Aboutmecomp.jsx";

function Home() {

    return (
        <div>
            <Navbar/>
            <div className="wrapper">
                
            <Title/>
                <div className="container">
                    <div className="home">
                        <ToDoDesc/>
                    </div>
                    <div className="home">
                        <NotesDesc/>
                    </div>
                    <div className="home about-me">
                        <Aboutmecomp/>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Home