function dimslider() {
    var slider = document.getElementById("myRange");
    var output = document.getElementById("demo");
    output.innerHTML = slider.value;
    output.innerHTML = this.value;
}

// used in getTopTen
var topTen = new Array();

/* This is how we render different pages of our website. Based on the page parameter different portions of the website
will be rendered. htmlStr has the html code for each individual page that can be rendered. */
async function renderPage(page) {
    let htmlStr = `
    <div class='home-button-div' onclick="renderPage('home')">
        <i class="fa-solid fa-house"></i>
    </div>
    `;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');
    if(id) {
    htmlStr += `
        <div id='logout-button-div' class='logout-button-div' onclick="logout()">
            <i class="fa-solid fa-door-open"></i>
        </div>
        `;
    }
    if(page == "game1settings") {
       htmlStr += `
        <h1 class='directions-header'>Match</h2>
        <p class='directions-text'>Flip over cards that match to gain points!</p>
        <p class='mode-text'>Pick a game mode:</p>
        <div class='radio-div-mode'>
            <input type="radio" name="gameModeSelector" value="Survive" checked="true">
            <label class='settings-text'>Survive</label>
            <input type="radio" name="gameModeSelector" value="Timed">
            <label class='settings-text'>Timed</label>
        </div>
        <p class='theme-text'>Pick a theme for your game:</p>
        <div class='radio-div-theme'>
            <input type="radio" name="ThemeSelector" value="1" checked="true">
            <label class='settings-text'>Animals</label>
            <input type="radio" name="ThemeSelector" value="2">
            <label class='settings-text'>Numbers</label>
            <input type="radio" name="ThemeSelector" value="3">
            <label class='settings-text'>Colors</label>
        </div>
        <div id='card-easy' class='item-card-settings' onclick="flipMenuCard('card-easy')">
            <div class='front-face-menu' onclick="startGame(5, false)">
                <img class='front-face-img-menu' src='images/menuCardFront.png'>
                <p class="menu-card-text">Easy</p>
            </div>
            <img class='back-face-menu' src='images/cardBack.svg'>
        </div>
        <div id='card-medium' class='item-card-settings' onclick="flipMenuCard('card-medium')">
            <div class='front-face-menu' onclick="startGame(10, false)">
                <img class='front-face-img-menu' src='images/menuCardFront.png'>
                <p class="menu-card-text">Medium</p>
            </div>
            <img class='back-face-menu' src='images/cardBack.svg'>
        </div>
        <div id='card-hard' class='item-card-settings' onclick="flipMenuCard('card-hard')">
            <div class='front-face-menu' onclick="startGame(15, false)">
                <img class='front-face-img-menu' src='images/menuCardFront.png'>
                <p class="menu-card-text">Hard</p>
            </div>
            <img class='back-face-menu' src='images/cardBack.svg'>
        </div>
        `;
        if(!id) {
            htmlStr += `<p class='home-footer'>Remember to log in to get your high score on the leaderboard!</p>`;
        }
    } else if (page == "game2settings") {
        htmlStr += `
        <div class="row">
            <div class="leftcolumn">
                <div class="clearbox"></div>
            </div>
            <div class="middlecolumn">
                <div class="box">
                    <h1>Copy Creation</h1>
                    <h2>Grid Size</h2>
                    <p> 
                        Using the slider below, please select the size of grid you would like to start with. <br>
                        The size will become larger as the pattern continues to get larger. 
                    </p>
                    <div class="slidecontainer">
                        <h3>Size: <input type="range" min="1" max="5" value="1" class="slider" id="myRange"> <span id="demo">1</span></h3>
                    </div>
                    <script>
                        var slider = document.getElementById("myRange");
                        var output = document.getElementById("demo");
                        output.innerHTML = slider.value + " x " + slider.value;
                        slider.oninput = function() {
                            output.innerHTML = this.value + " x " + this.value;
                        }
                    </script>
                    <h2>Level Select</h2>
                    <p>
                        Pick a level below. <br>
                        Each level corresponds to the amount of time each square in the pattern will flash <br>
                        The harder the level, the less time you will have to look at the lit up square.
                    </p>
                    <div class="container">
                        <input type="radio" name="LevelSelector">
                        <label>Easy</label>
                        <input type="radio" name="LevelSelector">
                        <label>Medium</label>
                        <input type="radio" name="LevelSelector">
                        <label>Hard</label>
                    </div>
                    <h2>Directions</h2>
                    <p>
                        Once the game begins, a card in the grid will light up. When the light turns off you will<br>
                        click it. Once again the card will light up, with a second light afterwards. You will then <br>
                        click the cards in the right order. You have beat the level when you have reached the <br>
                        longest pattern for that sized grid. You will then move to a new, larger grid where the <br>
                        pattern will restart with one light.
                    </p>
                </div>
            </div>
            <div class="rightcolumn">
                <div class="clearbox"></div>
            </div>
        </div>
        <nav>
            <div class="black-box">
                <button onclick="renderPage('home')" class="option">Home</a> <br>
                <button onclick="renderPage('game2')" class="option">Play</a> <br>
            </div>
        </nav>
        `;
    } else if (page == "game1") {
        htmlStr += `
        <div class='game-page-div'>
            <div id='lives-timer' class='lives-timer'></div>
            <div id='score' class= 'score'></div>
            <section id="memory-game" class="memory-game"></section>
        `;
        var ele = document.getElementsByName('LevelSelector');
        for (i = 0; i < ele.length; i++) {
            if (ele[i].checked) {
                matches = ele[i].value;
            }
        }
        var ele = document.getElementsByName('ThemeSelector');
        for (i = 0; i < ele.length; i++) {
            if (ele[i].checked) {
                imgOption = ele[i].value;
            }
        }
        game = "game1-" + imgOption + "-" + matches + "-" + mode;
        console.log(game);
        const result = await getTopTen(game);
        console.log("topTen in render: " + topTen);
        if(topTen != "") {
            htmlStr += `<div id='leaderboard' class='leaderboard'><div class='leaderboard-header-box'><p class='leaderboard-header'>LEADERBOARD</p></div>`;
            for(let i=topTen.length-1; i>-1; i--) {
                console.log("topTen[" + i + "]: " + topTen[i]);
                let val = JSON.parse(topTen[i]);
                let username = val["username"];
                let score = val["score"];
                htmlStr += `
                <div id="leaderboard-item${i+1}" class="leaderboard-item"><p class='leaderboard-text'>${username}</p><p class='leaderboard-text'>${score}</p></div>
                `;
            }
            htmlStr += "</div></div></div>";
        } else {
            htmlStr += "</div>";
        }
    } else if (page == "game2") {
        htmlStr += `
        <div class="heading">
            <header>
                <h1 class="title">Game Library</h1>
                    <p>
                        Kayla Roth, Jason Hensley, Michael Arocho, Regis Jet Puebla, Rohan Yarlagadda
                    </p>
            </header>
        </div>
        <nav>
            <div class="black-box">
                <a href = "index.html" class="option">Home</a> <br>
                <a href = "game2settings.html" class="option">Game 2 Settings</a> <br>
            </div>
        </nav>
        `;
    } else if (page == "homesettings") {
        htmlStr += `
        <div id='card-dark-menu' class='item-card-login'>
            <div class='front-face-menu'>
                <img class='front-face-img-menu' src='images/menuCardFront.png'>
                <div id="darkForm" class="card-form">
                    <p class='card-login-header'>Appearance</p>
                    <div class='radio-div-dark'>
                        <input type="radio" name="theme" onclick="darkMode()" value="light">
                        <label class="radio-label-dark">Light</label>
                        <br>
                        <input type="radio" name="theme" onclick="darkMode()" value="dark">
                        <label class="radio-label-dark">Dark</label>
                    </div>
                </div>
            </div>
            <img class='back-face-menu' src='images/cardBack.svg' onclick="flipMenuCard('card-dark-menu')">
        </div>
        `;
    } else if (page == "home") {
        htmlStr = `
        <h1 class='home-header'>MindMatch</h1>
        <p class='home-subheader'>a match for your mind</p>
        <div id='card-login' class='item-card-menu' onclick="flipMenuCard('card-login')">
            <div class='front-face-menu' onclick="renderPage('login')">
                <img class='front-face-img-menu' src='images/menuCardFront.png'>
                <p class="menu-card-text">Login</p>
            </div>
            <img class='back-face-menu' src='images/cardBack.svg'>
        </div>
        <div id='card-game1' class='item-card-menu' onclick="flipMenuCard('card-game1')">
            <div class='front-face-menu' onclick="renderPage('game1settings')">
                <img class='front-face-img-menu' src='images/menuCardFront.png'>
                <p class="menu-card-text">Match</p>
            </div>
            <img class='back-face-menu' src='images/cardBack.svg'>
        </div>
        <div id='card-game2' class='item-card-menu' onclick="flipMenuCard('card-game2')">
            <div class='front-face-menu' onclick="renderPage('game2settings')">
                <img class='front-face-img-menu' src='images/menuCardFront.png'>
                <p class="menu-card-text">Lights</p>
            </div>
            <img class='back-face-menu' src='images/cardBack.svg'>
        </div>
        <div id='card-settings' class='item-card-menu' onclick="flipMenuCard('card-settings')">
            <div class='front-face-menu' onclick="renderPage('homesettings')">
                <img class='front-face-img-menu' src='images/menuCardFront.png'>
                <p class="menu-card-text">Settings</p>
            </div>
            <img class='back-face-menu' src='images/cardBack.svg'>
        </div>
        <p class='home-footer'>Kayla Roth | Jason Hensley | Michael Arocho | Regis Jet Puebla | Rohan Yarlagadda</p>
        `;
    } else if (page == "login") {
        htmlStr += `
        <div id='card-login-menu' class='item-card-login'>
            <div class='front-face-login'>
                <img class='front-face-img-menu' src='images/menuCardFront.png'>
                <div id="loginForm" class="card-form">
                    <p class='card-login-header'>Log In</p>
                    <form name="loginForm" class='card-form-content' onsubmit="return false;">
                        <div>
                            <input name="login_username" class="userInfo" type="email" id="login_username" placeholder="Enter Username">
                            <br>
                            <input id="login_password" class="userInfo" name="login_password" type="text" placeholder="Enter Password">
                        </div>
                        <p class='loginFormError' id="loginFormError"> </p>
                    </form>
                    <button class="login-option" role="button" onClick="login()">Log in</button>
                </div>
            </div>
            <img class='back-face-menu' src='images/cardBack.svg' onclick="flipMenuCard('card-login-menu')">
        </div>
        <div id='card-signup' class='item-card-login'>
            <div class='front-face-login'>
                <img class='front-face-img-menu' src='images/menuCardFront.png'>
                <div id="signupForm" class="card-form">
                    <p class='card-login-header'>Sign Up</p>
                    <form name="signupForm" class='card-form-content' onsubmit="return false;">
                        <div>
                            <input id="signup_username" class="userInfo" name="signup_username" type="text" placeholder="Enter Username">
                            <br>
                            <input name="signup_email" class="userInfo" type="email" id="signup_email" placeholder="Enter Email">
                            <br>
                            <input id="signup_password" class="userInfo" name="signup_password" type="text" placeholder="Enter Password">
                            <br>
                            <input id="signup_password_con" class="userInfo" name="signup_password_con" type="text" placeholder="Confirm Password">
                        </div>
                        <p id="signupFormError" class='loginFormError'> </p>
                    </form>
                    <button id="signup" class="login-option" role="button" onclick="signup()">Sign Up</button>
                </div>
            </div>
            <img class='back-face-menu' src='images/cardBack.svg' onclick="flipMenuCard('card-signup')">
        </div>
        `;
    }
    document.body.innerHTML = htmlStr;
}

/* This code is how we fetch the top ten leaderboard positions. It works by getting the parameter 'id' before 
making a GET request to the leaderboard of the specified game (1 or 2) and creating an array of the top
ten.
*/
const getTopTen = (game) => new Promise((resolve) => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');
    $.ajax({
        url: `/api/v1/leaderboard?game=${game}`,
        type: 'GET',
        async: false,
        success: function (result) {
            if(id) {
                const url = new URL(window.location.href);
                url.searchParams.set("id", id);
                history.pushState({}, "", url)
            }
            let returnStr = result.substring(1, result.length-1);
            let returnArr = returnStr.split(/,(?<=},)/);
            console.log("parsed: " + result);
            topTen = returnArr;
        }
    });
    resolve('success');
});

/* This is our signup function which works by making a POST request to an API with the username, password, and email provided by the user.
Once successful it displays a message before updating the URL with 'id' and updating the browser. */
function signup() {
    $.ajax({
        url: `/api/v1/addUser?username=${document.getElementById("signup_username").value}&email=${document.getElementById("signup_email").value}&password=${document.getElementById("signup_password").value}`,
        type: 'POST',
        success: function (result) {
            console.log("Add Returned");
            const url = new URL(window.location.href);
            const resultStr = JSON.stringify(result);
            const unquoted = resultStr.replace(/\"/g, "");
            url.searchParams.set("id", unquoted);
            history.pushState({}, "", url)
            renderPage("home");
        }
    });
}

/* This is our login function which works by making a GET request to an API with the username and password provided by the user.
Once successful it displays a message before updating the URL with 'id' and updating the browser. */
function login() {
    $.ajax({
        url: `/api/v1/login?username=${document.getElementById("login_username").value}&password=${document.getElementById("login_password").value}`,
        type: 'GET',
        success: function (result) {
            console.log("logged in");
            const url = new URL(window.location.href);
            const resultStr = JSON.stringify(result);
            const unquoted = resultStr.replace(/\"/g, "");
            url.searchParams.set("id", unquoted);
            history.pushState({}, "", url)
            renderPage("home");
        }
    });
}


// Code for Dark Mode functionality
document.addEventListener('DOMContentLoaded', function () {
    darkMode();
    var radioButtons = document.querySelectorAll('input[name="theme"]');
    radioButtons.forEach(function (radioButton) {
        radioButton.addEventListener('click', function () {
            darkMode();
        });
    });
});

/* This is our darkMode function which allows the user to swith between light and dark mode on our website. It works by
first checking if a mode is selected, if a mode is selected then the website will switch the color scheme to that of the selected mode. 
If not it checks what mode the user prefers by querying the browser and will then set the mode to light or dark based on the preference. 
The last portion of the function is simple style adjustment based on the mode selected.*/
function darkMode() {
    var selectedTheme = 'light';
    if(document.querySelector('input[name="theme"]:checked')) {
        selectedTheme = document.querySelector('input[name="theme"]:checked').value;
    } else {
        if(window.matchMedia('(prefers-color-scheme: dark)').matches) {
            localStorage.setItem('selectedTheme', 'dark');
            selectedTheme = 'loadInDark';
        } else {
            localStorage.setItem('selectedTheme', 'light');
            selectedTheme = 'loadInLight';
        }
    }
    var element = document.body;   
    element.classList.toggle("dark");

    if (selectedTheme === 'dark') {
        element.classList.add('dark');
        element.style.transition = "background-color 0.5s, color 0.5s";
        element.style.animation = "darkModeFadeIn 0.5s";
    } else if (selectedTheme === 'light') {
        element.classList.remove('dark');
        element.style.transition = "background-color 0.5s, color 0.5s";
        element.style.animation = "darkModeFadeIn 0.5s reverse";
    } else if (selectedTheme === 'loadInDark') {
        element.classList.add('dark');
    } else if (selectedTheme === 'loadInLight') {
        element.classList.remove('dark');
    }
}


/* This function is used for tab switching between different content sections. It takes parameters evt (an event representing user interaction like a mouse click) and 
status (an element id). It hides the elements containing class 'userTab' and removes 'active' from elements with class name 'tabLinks'. It will display elements
based on the status parameter provided and adds class name 'active' back to tabs with the event provided to it. */
function openPrompt(evt, status) {
    var i, userTab, tabLinks;

    userTab = document.getElementsByClassName("userTab");
    for (i = 0; i < userTab.length; i++) {
        userTab[i].style.display = "none";
    }

    tabLinks = document.getElementsByClassName("tabLinks");
    for (i = 0; i < tabLinks.length; i++) {
        tabLinks[i].className = tabLinks[i].className.replace(" active", "");
    }

    document.getElementById(status).style.display = "block";
    evt.currentTarget.className += " active";
}

document.addEventListener("DOMContentLoaded", () => {
    renderPage('home');
});

//flip menu card
async function flipMenuCard(id) {
    document.getElementById(id).classList.toggle('flip');
}


/* This is our logout function which works by clearing the content of 'logout-button-div'
and updating the URL by deleting 'id' from it via url.searchParams before updating the browser */
function logout() {
    document.getElementById('logout-button-div').innerHTML = "";
    const url = new URL(window.location.href);
    url.searchParams.delete("id");
    history.pushState({}, "", url)
}