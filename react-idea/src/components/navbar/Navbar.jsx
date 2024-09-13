import React from "react";
import Clock from "./Navbar-components/Clock.jsx"
import Name from "./Navbar-components/Name.jsx";
import Homebutton from "../Homebutton.jsx"
import Logout from "../Logoutbutton.jsx";

function navbar() {
    return (
        <div className="navbar">
            <Logout/>
            <Homebutton/>
            <Clock/>
            <Name/>
        </div>
    )
}

export default navbar