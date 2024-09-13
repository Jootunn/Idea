import React, {useState} from "react";

function clock() {
    const [time, setTime] = useState(new Date().toLocaleTimeString())

    function updateTime() {
        const newTime = new Date().toLocaleTimeString()
        setTime(newTime)
    }
    
    setInterval(() => {
        updateTime()
    }, 1000);

    return (
        <div>
            <p>{time}</p>
        </div>
    )
}

export default clock