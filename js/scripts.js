function dimslider() {
    var slider = document.getElementById("myRange");
    var output = document.getElementById("demo");
    output.innerHTML = slider.value;
    output.innerHTML = this.value;
}

function renderPage(page) {
    let htmlStr = "";
    if(page == "game1settings") {
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
                        <input type="radio" name="gameModeSelector">
                            <label>Casual</label>
                        <input type="radio" name="gameModeSelector">
                            <label>Arcade</label>    
                    </div>
                    <h2>Level Select</h2>
                    <p>
                        Pick a level below.
                        The level will be the number of matches in the grid.
                    </p>
                    <div class="container">
                        <input type="radio" name="LevelSelector">
                        <label>5</label>
                        <input type="radio" name="LevelSelector">
                        <label>10</label>
                        <input type="radio" name="LevelSelector">
                        <label>20</label>
                    </div>
                    <h2>Theme Select</h2>
                    <p>
                        Pick a theme below.
                        The theme will determine what images will be displayed on the cards.
                    </p>
                    <div class="container">
                        <input type="radio" name="themeSelector">
                        <label>Animals</label>
                        <input type="radio" name="themeSelector">
                        <label>Numbers</label>
                        <input type="radio" name="themeSelector">
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
                <button onclick="renderPage('game1')" class="option">Play</a> <br>
            </div>
        </nav>`;
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
        <button id="start-button" onclick="startGame()">Start Game</button>
        <div class='header-box'>
            <div id='lives'></div>
            <div id='score'></div>
        </div>
        <section id="memory-game" class="memory-game"></section>
        `;
    } else if (page == "game2") {
        htmlStr = `
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
        htmlStr = `
        <header>
            <h1>Game Library</h1>
                <p>
                    Kayla Roth, Jason Hensley, Michael Arocho, Regis Jet Puebla, Rohan Yarlagadda
                </p>
        </header>
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
        `;
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

function signup() {
    $.ajax({
        url: "/api/v1/addUser?username=" + document.getElementById("signup_username").value
            + "&email=" + document.getElementById("signup_email").value
            + "&password=" + document.getElementById("signup_password").value,
        type: 'POST',
        success: function (result) {
            console.log("Add Returned");
        }
    });
}

function login() {
    $.ajax({
        url: "/api/v1/login?username=" + document.getElementById("login_username").value
            + "&password=" + document.getElementById("login_password").value,
        type: 'GET',
        success: function (result) {
            console.log("logged in");
            const url = new URL(window.location.href);
            url.searchParams.set("id", JSON.stringify(result));
            history.pushState({}, "", url)
        },
    });
}

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

// Code for Dark Mode functionality
document.addEventListener('DOMContentLoaded', function () {
    var selectedTheme = sessionStorage.getItem('selectedTheme') || 'light';
    applyTheme(selectedTheme);

    var radioButtons = document.querySelectorAll('input[name="theme"]');
    radioButtons.forEach(function (radioButton) {
        radioButton.addEventListener('click', function () {
            sessionStorage.setItem('selectedTheme', this.value);
            applyTheme(this.value);
        });
    });

    var selectedRadioButton = document.querySelector('input[name="theme"][value="' + selectedTheme + '"]');
    if (selectedRadioButton) {
        selectedRadioButton.checked = true;
    }
});

function darkMode() {
    var selectedTheme = document.querySelector('input[name="theme"]:checked').value;
    var element = document.body;

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