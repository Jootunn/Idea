import React from "react";
import Cookies from "universal-cookie";

function name() {
    const cookie = new Cookies(null, {path:"/"})
    return (
        <div>
            <p>{cookie.get("user_data").name}</p>
        </div>
    )
}
export default name