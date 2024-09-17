import express, { query, response } from "express"
import dotenv from "dotenv"
import cors from "cors"
import axios from "axios"
import bodyParser from "body-parser"
import pg from "pg"
import cookieParser from "cookie-parser"

const app = express()
const port = 3000
dotenv.config()
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true
}))
app.use(bodyParser.urlencoded({extended: true}))

const db = new pg.Client({
    user : process.env.PG_USER,
    password : process.env.PG_PASSWORD,
    host : process.env.PG_HOST,
    database : process.env.PG_DATABASE,
    port : process.env.PG_PORT
})
db.connect()

var jsonParser = bodyParser.json()

let _list = []
let notes = []

//#region LOGIN FUNCTION
async function checkUser(userEmail, userID) {
    try {
        const result = await db.query("SELECT * FROM users WHERE user_email = $1 AND user_id = $2", [userEmail, userID]);
        
        if (result.rows.length === 0) {
            await db.query("INSERT INTO users (user_email, user_id) VALUES ($1, $2)", [userEmail, userID]);
            return { message: "User created", status: 201 };
        }
        
        return { message: "User already exists", status: 200 };
        
    } catch (error) {
        console.error("Error checking or creating user:", error);
        throw error;
    }
     
}
//#endregion

//#region TO DO FUNCTIONES
async function addItem(userID, toDoItem) {
    try {
        const result = await db.query("SELECT id FROM users WHERE id = ($1)", [userID])
        const insertResult = await db.query("INSERT INTO to_do_list (item_text, check_user_id) VALUES ($1, $2) RETURNING id", [toDoItem, result.rows[0].id])    
        return {id :insertResult.rows[0].id}
        
    } catch (error) {
        console.error("Error adding items: ", error)
    }

}


async function getItems(userID, list) {
    try {
        const text = await db.query("SELECT item_text, id FROM to_do_list WHERE check_user_id = $1 ORDER BY id", [userID])
        text.rows.forEach((item)=> {
            list.push(item);
        })
        return {message: "Get Item have succeeded:", status: 200}
    } catch (error) {
        console.error("Error getting items: ", error)
    }

}

async function deleteItem(userID, itemID) { 
    try {      
        const result = await db.query("SELECT id FROM users WHERE id = ($1)", [userID])
        const id = result.rows[0].id
        await db.query("DELETE FROM to_do_list WHERE check_user_id = ($1) AND id = ($2)", [id, itemID])
        return {message: "Item delete succeded:", status: 200}
    } catch (error) {
        console.error("Error deleting items: ", error)
    }

}
//#endregion

//#region NOTE FUNCTIONES
async function addNote(noteTitle, noteContent, userID) {
    try {
        const result = await db.query("SELECT id FROM users WHERE id = ($1)", [userID])
        const id = result.rows[0].id
        const newID = await db.query("INSERT INTO notes (note_title, note_content, check_user_id) VALUES ($1, $2,$3) RETURNING ID", [noteTitle, noteContent, id])
        return {id : newID.rows[0].id}
    } catch (error) {
        console.log(error)
    }
}

async function getNotes(userID, list) {
    try {
        const result = await db.query("SELECT id FROM users WHERE id = ($1)", [userID])
        const text = await db.query("SELECT id, note_title, note_content FROM notes WHERE check_user_id = $1 ORDER BY id;", [result.rows[0].id])
        text.rows.forEach((item)=> {
            list.push(item);
        })
    } catch (error) {
        console.log(error)
    }
}

async function deleteNote(userID, noteID) {
    try {
        const result = await db.query("SELECT id FROM users WHERE id = ($1)", [userID])
        const id = result.rows[0].id
        await db.query("DELETE FROM notes WHERE check_user_id = ($1) AND id =($2)", [id, noteID])
        
    } catch (error) {
        console.log(error)
    }

}

async function updateNote(userID, noteID, noteTitle, noteText) {
    try {
        const userResult = await db.query("SELECT id FROM users WHERE id = $1", [userID]);
        if (userResult.rows.length === 0) {
            throw new Error('user dont found');
        }
        const id = userResult.rows[0].id;

        const updateResult = await db.query(
            "UPDATE notes SET note_title = $1, note_content = $2 WHERE id = $3 AND check_user_id = $4",
            [noteTitle, noteText, noteID, id]
        );

    } catch (error) {
        console.error('Errore durante l\'aggiornamento della nota:', error);
        throw error; 
    }
}
//#endregion

//#region LOGIN ROUTES

async function get_user_by_email_id(email, id) {
    try {
        
        const result = await db.query("SELECT id FROM users WHERE user_email = $1 AND user_id = $2", [email, id]);
        return result.rows[0].id
    } catch (error) {
        console.log(error)
    }

}

app.post("/login", jsonParser, async (req, res) =>{
    const access_token = req.body.user
    try {
        const response = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`, {
            headers: {
                Authorization: `Bearer ${access_token}`,
                Accept: 'application/json',
            },
        });
        await checkUser(response.data.email, response.data.id)

        const result = await get_user_by_email_id(response.data.email, response.data.id)
        
        res.cookie("user_data", JSON.stringify({"name" : response.data.name, "id": result}), {
            maxAge: 3600000,
            sameSite: "strict",
            secure: true,
        });

        res.status(200).send({ message: "Login successful" });

    } catch (error) {
        console.error('Error fetching user info:', error);
        console.log(error)
    }
})

//#endregion

//#region TO DO ROUTES
app.get("/get-items", jsonParser, async (req, res) => {
    const userID = req.query.userID
    _list = []
    try {
        await getItems(userID, _list)
        res.json({_list})
       
    } catch (error) {
        console.log(error)    
    }

})

app.post("/to-do-list", jsonParser, async (req, res) => {
    const userID = req.body.userID
    const toDoItem = req.body.toDoItem
    try {
        const result = await addItem(userID, toDoItem)
        res.json({id :result.id});
        
    } catch (error) {
        console.log(error)    
    }
})

app.post("/delete-item-list", jsonParser,async (req, res) =>{
    const userID = req.body.userID
    const itemID = req.body.itemID
    try {
        await deleteItem(userID, itemID)
        res.json("Success")
    } catch (error) {
        console.log(error)    
    }
    
})



//#endregion

//#region NOTE ROUTES

app.post("/add-note", jsonParser, async (req, res) => {
    const note_title = req.body.noteTitle
    const note_content = req.body.noteContent
    const userID = req.body.userID
    try {
        const result = await addNote(note_title, note_content, userID)
        res.json({id : result.id})
        
    } catch (error) {
        console.log(error)    
    }

})

app.get("/get-notes", jsonParser, async (req, res) =>{
    const userID = req.query.userID
    notes = []
    try {
        await getNotes(userID, notes)
        res.json({notes})
    } catch (error) {
        console.log(error)    
    }
    
})

app.post("/del-note", jsonParser, async (req, res) =>{
    const userID = req.body.userID
    const noteID = req.body.noteID
    try {
        await deleteNote(userID, noteID)
        res.json("Success")
    } catch (error) {
        console.log(error)    
    }
    
})

app.post("/update-note", jsonParser, async (req, res) => {
    const userID = req.body.userID;
    const noteID = req.body.noteID;
    const itemTitle = req.body.itemTitle;
    const itemText = req.body.itemText;

    try {
        await updateNote(userID, noteID, itemTitle, itemText);
        res.json("Success")
    } catch (error) {
        console.error("Errore nell'aggiornamento della nota:", error);
        console.log(error)    
    }
})

//#endregion

app.listen(port, ()=>{
    console.log("server is running on port 3000")
})