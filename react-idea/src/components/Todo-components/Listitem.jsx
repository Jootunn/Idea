import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import List from "./List";

const cookies = new Cookies()

function listItem({items = [], onDeleteFromDatabase, onDeleteFromList}) {

    return (
        <div className="content">
            <ul>
                {items.length !== 0 ? (
                    items.map((item,index) => {
                        return <List onDeleteFromDatabase={onDeleteFromDatabase} onDeleteFromList={onDeleteFromList} key={index} id={item.id} text={item.item_text}/>
                    })
                    ) : (
                        <p>No To Do available</p>
                    )
                }
            </ul>
        </div>
    )
}

export default listItem