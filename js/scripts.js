function dimslider() {
    var slider = document.getElementById("myRange");
    var output = document.getElementById("demo");
    output.innerHTML = slider.value;
    output.innerHTML = this.value;
}

var topTen = new Array();

async function renderPage(page) {
    let htmlStr = "";
    if(page == "game1settings") {
        /*
        htmlStr = `
        <div class="row">
            <div class="leftcolumn">
                <div class="clearbox"></div>
            </div>
            <div class="middlecolumn">
                <div class="box">
                    <h1>Matching</h1>
                    <h2>Game mode</h2>
                    <p>
                        Pick a game mode below. Arcade mode tests how many matches you can make<br>
                        in SET AMOUNT OF TIME. Casual mode allows you to take your time and work <br>
                        your way through the grid sizes.
                    </p>
                    <div class="container">
                        <input type="radio" name="gameModeSelector" value="Casual" checked="true">
                            <label>Casual</label>
                        <input type="radio" name="gameModeSelector" value="Arcade">
                            <label>Arcade</label>
                    </div>
                    <h2>Level Select</h2>
                    <p>
                        Pick a level below.
                        The level will be the number of matches in the grid.
                    </p>
                    <div class="container">
                        <input type="radio" name="LevelSelector" value="5">
                        <label>5</label>
                        <input type="radio" name="LevelSelector" value="10" checked="true">
                        <label>10</label>
                        <input type="radio" name="LevelSelector" value="15">
                        <label>15</label>
                    </div>
                    <h2>Theme Select</h2>
                    <p>
                        Pick a theme below.
                        The theme will determine what images will be displayed on the cards.
                    </p>
                    <div class="container">
                        <input type="radio" name="ThemeSelector" value="1"  checked="true">
                        <label>Animals</label>
                        <input type="radio" name="ThemeSelector" value="2">
                        <label>Numbers</label>
                        <input type="radio" name="ThemeSelector" value="3">
                        <label>Colors</label>
                    </div>
                    <h2>Directions</h2>
                    <p>
                        Flip over cards over by clicking on them. Remember the images on the ones you have<br>
                        flipped so you can create a match! A match happens when you select two cards with <br>
                        the same image on them. 
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
                <button onclick="startGame(false)" class="option">Play</a> <br>
            </div>
        </nav>`;
        */
       htmlStr = `
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
            <input type="radio" name="ThemeSelector" value="1">
            <label class='settings-text'>Animals</label>
            <input type="radio" name="ThemeSelector" value="2">
            <label class='settings-text'>Numbers</label>
            <input type="radio" name="ThemeSelector" value="3">
            <label class='settings-text'>Colors</label>
        </div>
        <div id='card-easy' class='item-card-settings' onclick="flipMenuCard('card-easy')">
            <div class='front-face-menu' onclick="startGame('easy', 'false')">
                <img class='front-face-img-menu' src='images/menuCardFront.png'>
                <p class="menu-card-text">Easy</p>
            </div>
            <img class='back-face-menu' src='images/cardBack.svg'>
        </div>
        <div id='card-medium' class='item-card-settings' onclick="flipMenuCard('card-medium')">
            <div class='front-face-menu' onclick="startGame('medium', 'false')">
                <img class='front-face-img-menu' src='images/menuCardFront.png'>
                <p class="menu-card-text">Medium</p>
            </div>
            <img class='back-face-menu' src='images/cardBack.svg'>
        </div>
        <div id='card-hard' class='item-card-settings' onclick="flipMenuCard('card-hard')">
            <div class='front-face-menu' onclick="startGame('hard', 'false')">
                <img class='front-face-img-menu' src='images/menuCardFront.png'>
                <p class="menu-card-text">Hard</p>
            </div>
            <img class='back-face-menu' src='images/cardBack.svg'>
        </div>
       `;
    } else if (page == "game2settings") {
        htmlStr = `
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
        htmlStr = `
        <div class='header-box'>
            <div id='lives'></div>
            <div id='score'></div>
            <div id='timer'></div>
        </div>
        <section id="memory-game" class="memory-game"></section>
        <div id="game1-leaderboard" class="leaderboard">
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
        var ele = document.getElementsByName('gameModeSelector');
        for (i = 0; i < ele.length; i++) {
            if (ele[i].checked) {
                mode = ele[i].value;
            }
        }
        game = "game1-" + imgOption + "-" + matches + "-" + mode;
        const result = await getTopTen(game);
        console.log("topTen in render: " + topTen);
        if(topTen != "") {
            for(let i=0; i<topTen.length; i++) {
                console.log("topTen[" + i + "]: " + topTen[i]);
                let val = JSON.parse(topTen[i]);
                let username = val["username"];
                let score = val["score"];
                htmlStr += `
                <div id="leaderboard-item${i+1}" class="leaderboard-item"><p>${username}</p><p>${score}</p></div>
                `;
            }
            htmlStr += "</div>";
        }
    } else if (page == "game2") {
        htmlStr = `
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
        htmlStr = `
        <div class="heading">
            <header>
                <h1 class="title">Game Library</h1>
                    <p>
                        Kayla Roth, Jason Hensley, Michael Arocho, Regis Jet Puebla, Rohan Yarlagadda
                    </p>
            </header>
        </div>
        <div class="content">
            <div class="black-box">
                <button onclick="renderPage('home')" class="option">Home</button><br>
                <h2>Appearance</h2>
                <div class="dark-toggle">
                    <label class="radio-label">
                        <input type="radio" name="theme" onclick="darkMode()" value="light">
                        <span class="radio-button"></span> Light
                    </label><br>
                    <label class="radio-label">
                        <input type="radio" name="theme" onclick="darkMode()" value="dark">
                        <span class="radio-button"></span> Dark
                    </label>
                </div>
            </div>
        </div>
        `;
    } else if (page == "home") {
        /*
        htmlStr = `
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
                <!--<button onclick="renderPage('home')" class="option">Home</a> <br>-->
                <button onclick="renderPage('login')" class="option">Login</a> <br>
                <button onclick="renderPage('game1settings')" class="option">Game 1</a> <br>
                <button onclick="renderPage('game2settings')" class="option">Game 2</a> <br>
                <button onclick="renderPage('homesettings')" class="option">Settings</a>
                </div>
            </div>
        </nav>
        */
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
        <p class='home-footer'>Kayla Roth, Jason Hensley, Michael Arocho, Regis Jet Puebla, Rohan Yarlagadda</p>
        `;
        /*
        document.body.innerHTML = htmlStr;
        document.querySelectorAll('.item-card-menu').forEach(c => {
            c.addEventListener('mouseenter', (event) => {this.classList.toggle('flip');});
        });
        
        document.querySelectorAll('.item-card-menu').forEach(c => {
            c.addEventListener('mouseleave', (event) => {this.classList.toggle('flip');});
        });
        */
    } else if (page == "login") {
        htmlStr = `
        <div class="heading">
            <header>
                <h1 class="title">Game Library</h1>
                    <p>
                        Kayla Roth, Jason Hensley, Michael Arocho, Regis Jet Puebla, Rohan Yarlagadda
                    </p>
            </header>
        </div>
        <div class="content">
            <div class="black-box">
                <div class="tabs">
                    <button class="tabLinks" onClick="openPrompt(event, 'loginForm')" id="default">Log In</button>
                    <button class="tabLinks" onClick="openPrompt(event, 'signupForm')">Sign Up</button>
                </div>
    
                <div id="loginForm" class="userTab">
                    <h1>Log In</h1>
                    <form name="loginForm" onsubmit="return false;">
                        <div>
                            <input name="login_username" class="userInfo" type="email" id="login_username" placeholder="Enter Username">
                            <br>
                            <input id="login_password" class="userInfo" name="login_password" type="text" placeholder="Enter Password">
                        </div>
                    </form>
                    <p id="loginFormError"></p>
                    <button class="option" onClick="login()">Log in</button>
                </div>
    
                <div id="signupForm" class="userTab">
                    <h1>Sign Up</h1>
                    <form name="signupForm" onsubmit="return false;">
                        <div>
                            <input id="signup_username" class="userInfo" name="signup_username" type="text" placeholder="Enter Username">
                            <br>
                            <input name="signup_email" class="userInfo" type="email" id="signup_email" placeholder="Enter Email">
                            <br>
                            <input id="signup_password" class="userInfo" name="signup_password" type="text" placeholder="Enter Password">
                            <br>
                            <input id="signup_password_con" class="userInfo" name="signup_password_con" type="text" placeholder="Confirm Password">
                        </div>
                    </form>
                    <p id="signupFormError"></p>
                    <button id="signup" class="option" onclick="signup()">Sign Up</button>
                </div>
                <button onclick="renderPage('home')" class="option">Home</button><br>
            </div>
        </div>
        `;
    }
    document.body.innerHTML = htmlStr;
}

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

/*
function validateSignupForm() {
    var passed = false;
    let user_fname = document.getElementById("signup_fname").value;
    let user_lname = document.getElementById("signup_lname").value;
    let user_email = document.getElementById("signup_email").value;
    let user_phone = document.getElementById("signup_phone").value;
    let user_password = document.getElementById("signup_password").value;
    let user_password_con = document.getElementById("signup_password_con").value;
    var phoneRegex = /^([0-9]{3})-([0-9]{3})-([0-9]{4})$/;
    var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var errorMessage = "";
    if (user_fname == "") {
        errorMessage = "Please enter your first name";
    } else if (user_lname == "") {
        errorMessage = "Please enter your last name";
    } else if (user_email == "") {
        errorMessage = "Please enter your email";
    } else if (user_phone == "") {
        errorMessage = "Please enter your phone";
    } else if (!(phoneRegex.test(user_phone))) {
        errorMessage = "Invalid phone number";
    } else if (!(emailRegex.test(user_email))) {
        errorMessage = "Invalid email";
    } else if (!(user_password == user_password_con)) {
        errorMessage = "Passwords do not match";
    } else {
        passed = true;
    }
    setSignupError(errorMessage);
    console.log("passed " + passed);
    return passed;
}

function validateLoginForm() {
    var passed = false;
    let user_email = document.getElementById("login-email").value;
    let user_password = document.getElementById("login-password").value;
    var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var errorMessage = "";
    if (user_email == "") {
        errorMessage = "Please enter your email";
    } else if(!(emailRegex.test(user_email))) {
        errorMessage = "Invalid email";
    } else {
        passed = true;
    }
    setLoginError(errorMessage);
    console.log("passed " + passed);
    return passed;
}
*/

// Code for Dark Mode functionality
document.addEventListener('DOMContentLoaded', function () {
    //var selectedTheme = sessionStorage.getItem('selectedTheme') || 'light';
    //applyTheme(selectedTheme);
    darkMode();
    var radioButtons = document.querySelectorAll('input[name="theme"]');
    radioButtons.forEach(function (radioButton) {
        radioButton.addEventListener('click', function () {
            //sessionStorage.setItem('selectedTheme', this.value);
            //applyTheme(this.value);
            darkMode();
        });
    });
    /*
    var selectedRadioButton = document.querySelector('input[name="theme"][value="' + selectedTheme + '"]');
    if (selectedRadioButton) {
        selectedRadioButton.checked = true;
    }
    */
});

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

/*
function darkMode() {
    var selectedTheme = document.querySelector('input[name="theme"]:checked').value;
    localStorage.setItem('selectedTheme', selectedTheme);
    applyTheme(selectedTheme);
}


function applyTheme(selectedTheme) {
    var element = document.body;
    var transitionProperties = "background-color 0.5s, color 0.5s";
    var animation = selectedTheme === 'dark' ? "darkModeFadeIn 0.5s" : "darkModeFadeIn 0.5s reverse";

    element.style.transition = transitionProperties;
    element.style.animation = animation;

    if (selectedTheme === 'dark') {
        element.classList.add('dark');
    } else {
        element.classList.remove('dark');
    }
}
*/
// Code for Tab Switching 
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