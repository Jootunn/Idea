import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { GoogleOAuthProvider } from "@react-oauth/google"
import Home from './Pages/Home.jsx'
import PrivateRoute from './Privateroute.jsx'
import { isAuthenticated } from './App.jsx'
import ToDoList from './Pages/ToDoList.jsx'
import Notes from "./Pages/Notes.jsx"
import Aboutme from "./Pages/Aboutme.jsx"

ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId="556598167334-o3k5l69tjfemefio6p899nrudp5mgcvm.apps.googleusercontent.com">
    <BrowserRouter>
    
        <Routes>
          <Route path='/' element={<App />}/>

          <Route
            path="/home"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <Home />
              </PrivateRoute>
          }
        />

        <Route
          path='/about-me'
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Aboutme/>
            </PrivateRoute>
          }
        >

        </Route>

        <Route 
          path='/todolist'
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
                  <ToDoList/>
            </PrivateRoute>
          }
        />
        
        <Route 
          path='/notes'
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
                  <Notes/>
            </PrivateRoute>
          }
        />

        </Routes>
      
    </BrowserRouter>
  </GoogleOAuthProvider>
)