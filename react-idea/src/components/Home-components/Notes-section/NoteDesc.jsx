import React from "react";
import RedirectToNotes from "./RediretctToNotes.jsx"

function noteDesc() {
    return(
        <div className="Notes">
            <h1>Notes</h1>
            <p>Write down your ideas.</p>
            <RedirectToNotes/>
        </div>
    )
}

export default noteDesc