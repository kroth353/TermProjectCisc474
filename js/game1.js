//Sets the default number of matches to 10
let matches = 10;
//Sets the original images to be the animals
let imgOption = 1;
let game = "";
let mode ="";
//Lists of all the possible cards for each of the three categories 
let animals = ["Alligator", "Cow", "Giraffe", "Koala", "Otter", "Rabbit", "Wolf", "Capybara", "Dog", "Goose", "Lion", "Owl", "Rhino", "Yak", "Cat", "Duck", "Gorilla", "Meerkat", "Panda", "SeaLion", "Cheetah", "Flamingo", "Horse", "Monkey", "Parrot", "Snake", "Chicken", "Frog", "Kangaroo", "MountainGoat", "Penguin", "Tiger"];
let colors = ["Brown", "ForestGreen", "Lavender", "Magenta", "Mint", "Teal", "babyPink", "blueGray", "brightGreen", "brightOrange", "brightRed", "brightYellow", "burntOrange", "darkBlue", "darkPurple", "deepRed", "gray", "hotPink", "lightBlue", "lightBrown", "lightGreen", "lightPink", "maroon", "mediumBlue", "mediumOrange", "middleYellow", "paleOrange", "paleYellow", "peach", "royalPurple", "skyBlue", "turquoise"];
let numbers = ["one", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen", "two", "twenty", "twentyone", "twentytwo", "twentythree", "twentyfour", "twentyfive", "twentysix", "twentyseven", "twentyeight", "twentynine", "three", "thirty", "thirtyone", "thirtytwo", "four", "five", "six", "seven", "eight", "nine"];
var matchStr = "";
//Sets the original values for game play, such as 
//lives, the original score and the timer for the timed mode
var score = 0;
var lives = 3;
var numLeft = 0;
var seconds = 60;
let timer;

function createCards(numCards) {
    //Sets the size and placement of the cards
    let numCol = Math.ceil(Math.sqrt(numCards));
    let cardWidthNum = Math.ceil((document.getElementById('memory-game').clientWidth*0.47)/numCol);
    let cardHeightNum = Math.ceil((cardWidthNum*7)/4.5);
    let cardWidth = cardWidthNum.toString();
    let cardHeight = cardHeightNum.toString();
    //Initializes any empty list to eventually fill with the elements of one of the 
    //three categories, the number will be based on the numCards (function line 88)
    var imgs = [];
    //Assigns imgs to the correct theme, based on radio button selection
    //imgs will now contain all of the possible options of the correct theme
    if(imgOption == 1) {
        imgs = animals;
    } else if (imgOption == 2) {
        imgs = numbers;
    } else {
        imgs = colors;
    }

    //ShuffeArray function defined later in file, this instance of shuffle makes the order of 
    //imgs different everytime, so that the order of animals is different every time
    shuffleArray(imgs);
    htmlStr = '';
    
    //arrayOption will hold the matches in order of how they will be displayed, with two of
    //each, to create a matching pair
    var arrayOption= []

    for(let i = 0; i < numCards/2; i++){
        //for half the number of cards, two of the same card are created, ensuring a match
        //is present
        arrayOption.push(i);
        arrayOption.push(i);
     }

     //array should be sequence of number with two of each number, now shuffled so the 
     //matches aren't necessarily directly next to each other
    shuffleArray(arrayOption);
    
    //Displays cards
    for(let i = 0; i<(numCards); i++) {
        cardStr = imgs[arrayOption[i]];
        htmlStr += "<div id='" + cardStr + i + "' class='item-card' style='width: " + cardWidth + "px; height: " + 
                    cardHeight + "px'><img class='front-face' src='images/" + cardStr + ".png'><img class='back-face' src='images/cardBack.svg'></div>";
    }
    document.getElementById('memory-game').innerHTML = htmlStr;
    document.getElementById('score').innerHTML = "<p class='score-text'>" + score + "</p>";
}
//Runs when user clicks start game
async function startGame(numMatches, restart) {
    //Sets the game up, as long as it is not restarted (the users first time playing with these settings)
    if(!restart) {
        matches = numMatches;
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
        await renderPage('game1');
    }
    //Typical mode with three lives, when user loses a life, a heart is removed from the screen
    if(mode == 'Survive') {
        let livesHtmlStr = `<div class='lives-box'>`;
        for(let i=0; i<3; i++){
            if(i<lives) {
                livesHtmlStr += `<i class="fa-solid fa-heart"></i>`;
            } else {
                livesHtmlStr += `<i class="fa-solid fa-heart" style="opacity: 0%"></i>`;
            }
        }
        livesHtmlStr += "</div>";
        document.getElementById('lives-timer').innerHTML = livesHtmlStr;
    }
    //When user starts the game, all the cards will flip,
    //the user will have some time to look at all the cards then 
    //the cards will flip back over and the user will try to match 
    let numCards = matches*2;
    numLeft = numCards;
    createCards(numCards);
    await sleep(1000);
    flipAllCards();
    await sleep(10000);
    flipAllCards();
    addClickListenerToAll();
    //Sets a timer for 60 seconds, during which the user will try for as many matches as possible,
    //after 60 seconds the game ends
    if(mode == 'Timed') {
        if(!restart) {
            seconds = 60;
            document.getElementById('lives-timer').innerHTML = `<p class='timer-text'>${seconds}</p>`;
        }
        timer = setInterval(() => updateTimer(), 1000);
    }
}

//Adds flip functionality to all cards
function addClickListenerToAll() {
    document.querySelectorAll('.item-card').forEach(c => {
        c.addEventListener('click', flipCard);
    });
}

//This ensures after a match is made, the cards that have not been flipped yet, are able to be flipped
function addClickListenerToAllNotFlipped() {
    document.querySelectorAll('.item-card').forEach(c => {
        if(!(c.classList.contains('flip'))) {
            c.addEventListener('click', flipCard);
        }
    });
}

//Ensures when things aren't supposed to be clicked, they won't be
// i.e. when two cards are already flipped, before they turn back over no other 
//cards should be clicked
function removeClickListenerFromAll() {
    document.querySelectorAll('.item-card').forEach(c => {
        c.removeEventListener('click', flipCard);
    });
}

//This function flips cards, such that all cards are flipped face up, regardless of their previous status
function flipAllCardsNotFlipped() {
    document.querySelectorAll('.item-card').forEach(c => {
        if(!(c.classList.contains('flip'))) {
            c.classList.toggle('flip');
        }
    });
}

//This is the animation at the end of a game when the cards do a little dance
function shakeAllCards() {
    document.querySelectorAll('.item-card').forEach(c => {
        c.classList.toggle('shake');
    });
}

//This is the animation at the end of a game or round when the cards move to the bottom
//of the screen
function dropAllCards() {
    document.querySelectorAll('.item-card').forEach(c => {
        c.classList.toggle('drop');
    });
}

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

//this functioin sets the specs for when a card can be flipped, and when a card cannot
//based on the status of other cards, lives left, and time left
async function flipCard() {
    this.removeEventListener('click', flipCard);
    this.classList.toggle('flip');
    let id = this.id;
    if(matchStr == "") {
        matchStr = id;
    } else if (matchStr.replace(/[0-9]/g, '') == id.replace(/[0-9]/g, '')) {
        numLeft -= 2;
        matchStr = "";
        score += 10;
        document.getElementById('score').innerHTML = "<p class='score-text'>" + score + "</p>";
        if (numLeft == 0) {
            clearInterval(timer);
            await sleep(1000);
            flipAllCardsNotFlipped();
            await sleep(500);
            flipAllCards();
            await sleep(500);
            dropAllCards();
            await sleep(900);
            startGame(matches, true);
        }
    } else {
        removeClickListenerFromAll();
        await sleep(2000);
        if(mode == 'Survive') {
            lives -= 1;
            let livesHtmlStr = `<div class='lives-box'>`;
            for(let i=0; i<3; i++){
                if(i<lives) {
                    livesHtmlStr += `<i class="fa-solid fa-heart"></i>`;
                } else {
                    livesHtmlStr += `<i class="fa-solid fa-heart" style="opacity: 0%"></i>`;
                }
            }
            livesHtmlStr += "</div>";
            document.getElementById('lives-timer').innerHTML = livesHtmlStr;
            if(lives == 0) {
                highscore(score);
                lives = 3;
                await sleep(1000);
                flipAllCardsNotFlipped();
                removeClickListenerFromAll();
                await sleep(2000);
                flipAllCards();
                await sleep(500);
                shakeAllCards();
                await sleep(2000);
                document.getElementById('memory-game').innerHTML = `
                <button class='login-option' onclick='startGame(${matches}, false)'>Restart</button>
                `;
                score = 0;
                matchStr = "";
            }
        }
        this.classList.toggle('flip');
        document.getElementById(matchStr).classList.toggle('flip');
        matchStr = "";
        addClickListenerToAllNotFlipped();
    }
}

//This function flips all cards, like in the beginning of a round
function flipAllCards() {
    document.querySelectorAll('.item-card').forEach(c => {
        c.classList.toggle('flip');
    });
}

//This function shuffles an array by randomizing cards to swap however many times
//such that the amount of switches is equal to the length of the array
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

//Just a console statement to ensure all content is ready
document.addEventListener("DOMContentLoaded", () => {
    console.log("Ready");
});

//need to add different game values depending on settings
async function highscore(score) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');
    if(id) {
        $.ajax({
            url: `/api/v1/highscore?id=${id}&score=${score}&game=${game}`,
            type: 'POST',
            success: function (result) {
                const url = new URL(window.location.href);
                const resultStr = JSON.stringify(result);
                const unquoted = resultStr.replace(/\"/g, "");
                url.searchParams.set("id", unquoted);
                history.pushState({}, "", url);
            }
        });
    }
}

//Every second the timer will decrease by one second, and changes the ability to click cards or if cards are shown
//based on how much time is left on the timer
function updateTimer() {
    seconds--;
    document.getElementById('lives-timer').innerHTML = `<p class='timer-text'>${seconds}</p>`;
    if (seconds == 0) {
        clearInterval(timer);
        document.getElementById('lives-timer').innerHTML = `<p class='timer-text'>0</p>`;
        endGame();
    } else if (seconds == 1) {
        removeClickListenerFromAll();
    }
}

//This handles all the animations at the end of the game, using eventListeners that were 
//previously created
async function endGame() {
    highscore(score);
    await sleep(1000);
    flipAllCardsNotFlipped();
    removeClickListenerFromAll();
    await sleep(2000);
    flipAllCardsNotFlipped();
    await sleep(500);
    flipAllCards();
    await sleep(500);
    shakeAllCards();
    await sleep(2000);
    document.getElementById('memory-game').innerHTML = `
    <button class='login-option' onclick='startGame(${matches}, false)'>Restart</button>
    `;
    score = 0;
    seconds = 60;
    matchStr = "";
}

//When the window resizes the cards will too, to ensure they all stay on the screen
window.onresize = resizeCards;

//the function that actually resizes cards when window size is adjusted
function resizeCards() {
    if(document.getElementById('memory-game')) {
        let numCards = matches*2;
        let numCol = Math.ceil(Math.sqrt(numCards));
        let numRow = Math.ceil(numCards/numCol);
        let cardWidthNum = Math.ceil((document.getElementById('memory-game').clientWidth*0.47)/numCol);
        let cardHeightNum = Math.ceil((cardWidthNum*7)/4.5);
        let cardWidth = cardWidthNum.toString() + "px";
        let cardHeight = cardHeightNum.toString() + "px";
        document.querySelectorAll('.item-card').forEach(c => {
            c.style.width = cardWidth;
            c.style.height= cardHeight;
        });
    }
}