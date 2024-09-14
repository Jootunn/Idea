import React from "react"; 
import Navbar from "../components/navbar/Navbar";


function aboutMe() {
   
    return ( 
   
    <section class="about-section"> 
    <Navbar/>
        <div class="about-container">
            <h1>About Me</h1>
            <p>Hello! I'm <strong>Jacopo Salta</strong>, a passionate Web Developer (Junior) based in Ancona, Italy.</p>

            <h2>My Journey</h2>
            <p>I started programming for fun and then I switched it into an hobby and now I aspire to make it my job. 
                My journey has taken me through various headache, but as always I was determined enough to always complete what i started.</p>

            <h2>What I Do</h2>
            <p>I'm skilled in:</p>
            <ul>
                <li>JavaScript</li>
                <li>React</li>
                <li>Node.js</li>
                <li>Python</li>
                <li>PostgreSQL</li>
            </ul>

            <h2>Achievements</h2>
            <p>Here are some highlights of my work:</p>
            <ul>
                <li>A JavaScript bootcamp</li>
                <li><a href="https://github.com/Jootunn/Idea">My github repositories</a></li>
            </ul>
                <h2>Let's Connect!</h2>
                <p>If you'd like to work with me or just say hello, feel free to <a href="https://github.com/Jootunn">get in touch!</a></p>
        </div>
    </section>
    )
}

export default aboutMe