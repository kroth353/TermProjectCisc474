let matches = 10;
let imgOption = 1;
let game = "";
let mode ="";
let animals = ["Alligator", "Cow", "Giraffe", "Koala", "Otter", "Rabbit", "Wolf", "Capybara", "Dog", "Goose", "Lion", "Owl", "Rhino", "Yak", "Cat", "Duck", "Gorilla", "Meerkat", "Panda", "SeaLion", "Cheetah", "Flamingo", "Horse", "Monkey", "Parrot", "Snake", "Chicken", "Frog", "Kangaroo", "MountainGoat", "Penguin", "Tiger"];
let colors = ["Brown", "ForestGreen", "Lavender", "Magenta", "Mint", "Teal", "babyPink", "blueGray", "brightGreen", "brightOrange", "brightRed", "brightYellow", "burntOrange", "darkBlue", "darkPurple", "deepRed", "gray", "hotPink", "lightBlue", "lightBrown", "lightGreen", "lightPink", "maroon", "mediumBlue", "mediumOrange", "middleYellow", "paleOrange", "paleYellow", "peach", "royalPurple", "skyBlue", "turquoise"];
let numbers = ["one", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen", "two", "twenty", "twentyone", "twentytwo", "twentythree", "twentyfour", "twentyfive", "twentysix", "twentyseven", "twentyeight", "twentynine", "three", "thirty", "thirtyone", "thirtytwo", "four", "five", "six", "seven", "eight", "nine"];
var matchStr = "";
var score = 0;
var lives = 3;
var numLeft = 0;
var seconds = 60;
let timer;

function createCards(numCards) {
    console.log("creating " + numCards + " cards");
    let numCol = Math.ceil(Math.sqrt(numCards));
    let numRow = Math.ceil(numCards/numCol);
    console.log("numCol: " + numCol + "numRow: " + numRow);
    console.log("game width: " + document.getElementById('memory-game').clientWidth);
    let cardHeightNum = Math.ceil((document.getElementById('memory-game').clientHeight*0.9)/numRow);
    let cardWidthNum = Math.ceil((cardHeightNum*4.5)/7);
    let cardWidth = cardWidthNum.toString();
    console.log("card width: " + cardWidth);
    let cardHeight = cardHeightNum.toString();
    var imgs = [];
    if(imgOption == 1) {
        imgs = animals;
    } else if (imgOption == 2) {
        imgs = numbers;
    } else {
        imgs = colors;
    }
    shuffleArray(imgs);
    htmlStr = '';
    
    var arrayOption= []
    for(let i = 0; i < numCards/2; i++){
        arrayOption.push(i);
        arrayOption.push(i);
     }

     //array should be sequence of number with two of each number
    shuffleArray(arrayOption);
    
    for(let i = 0; i<(numCards); i++) {
        cardStr = imgs[arrayOption[i]];
        console.log(cardStr);
        htmlStr += "<div id='" + cardStr + i + "' class='item-card' style='width: " + cardWidth + "px; height: " + 
                    cardHeight + "px'><img class='front-face' src='images/" + cardStr + ".png'><img class='back-face' src='images/cardBack.svg'></div>";
    }
    console.log("htmlStr" + htmlStr);
    document.getElementById('memory-game').innerHTML = htmlStr;
    document.getElementById('lives').innerHTML = "<p style='padding-top:75px'>Lives: " + lives + "</p>";
    document.getElementById('score').innerHTML = "<p style='padding-top:75px'>Score: " + score + "</p>";
}

async function startGame(numMatches, restart) {
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
    }
    await renderPage('game1');
    console.log("game started");
    let numCards = matches*2;
    numLeft = numCards;
    //hideStartButton();
    createCards(numCards);
    console.log("before first flip");
    await sleep(1000);
    flipAllCards();
    await sleep(10000);
    flipAllCards();
    addClickListenerToAll();
    if(mode == 'Timed') {
        seconds = 60;
        timer = setInterval(() => updateTimer(), 1000);
    }
}

function addClickListenerToAll() {
    document.querySelectorAll('.item-card').forEach(c => {
        c.addEventListener('click', flipCard);
    });
    console.log("flip listener created");
}

function addClickListenerToAllNotFlipped() {
    document.querySelectorAll('.item-card').forEach(c => {
        if(!(c.classList.contains('flip'))) {
            c.addEventListener('click', flipCard);
        }
    });
    console.log("flip listener created");
}

function removeClickListenerFromAll() {
    document.querySelectorAll('.item-card').forEach(c => {
        c.removeEventListener('click', flipCard);
    });
    console.log("flip listener removed");
}

function flipAllCardsNotFlipped() {
    document.querySelectorAll('.item-card').forEach(c => {
        if(!(c.classList.contains('flip'))) {
            c.classList.toggle('flip');
        }
    });
    console.log("flip listener created");
}

function shakeAllCards() {
    document.querySelectorAll('.item-card').forEach(c => {
        c.classList.toggle('shake');
    });
}

function dropAllCards() {
    document.querySelectorAll('.item-card').forEach(c => {
        c.classList.toggle('drop');
    });
}

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

async function flipCard() {
    this.removeEventListener('click', flipCard);
    this.classList.toggle('flip');
    let id = this.id;
    console.log("id: " + id);
    console.log("matchStr: " + matchStr);
    if(matchStr == "") {
        matchStr = id;
    } else if (matchStr.replace(/[0-9]/g, '') == id.replace(/[0-9]/g, '')) {
        numLeft -= 2;
        matchStr = "";
        score += 10;
        document.getElementById('score').innerHTML = "<p>Score: " + score + "</p>";
        if (numLeft == 0) {
            await sleep(2000);
            startGame(matches, true);
        }
    } else {
        removeClickListenerFromAll();
        await sleep(2000);
        //document.getElementById(matchStr).addEventListener('click', flipCard);
        if(mode == 'Survive') {
            lives -= 1;
            document.getElementById('lives').innerHTML = "<p>Lives: " + lives + "</p>";
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
                //dropAllCards();
                //await sleep(5000);
                document.getElementById('memory-game').innerHTML = `
                <button class='option' onclick='startGame(${matches}, true)'>Restart</button>
                <button onclick="renderPage('home')" class="option">Home</button><br>
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

function flipAllCards() {
    document.querySelectorAll('.item-card').forEach(c => {
        c.classList.toggle('flip');
    });
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    console.log("Ready");
});

//need to add different game values depending on settings
function highscore(score) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');
    if(id) {
        $.ajax({
            url: `/api/v1/highscore?id=${id}&score=${score}&game=${game}`,
            type: 'POST',
            success: function (result) {
                console.log("highscore");
                const url = new URL(window.location.href);
                const resultStr = JSON.stringify(result);
                const unquoted = resultStr.replace(/\"/g, "");
                url.searchParams.set("id", unquoted);
                history.pushState({}, "", url)
            }
        });
    }
}

function updateTimer() {
    seconds--;
    document.getElementById('timer').innerHTML = seconds;
    console.log(seconds);
    if (seconds === 0) {
        clearInterval(timer);
        document.getElementById('timer').innerHTML = 0;
        endGame();
    }
}

async function endGame() {
    highscore(score);
    await sleep(1000);
    flipAllCardsNotFlipped();
    removeClickListenerFromAll();
    await sleep(2000);
    flipAllCards();
    await sleep(500);
    shakeAllCards();
    await sleep(2000);
    document.getElementById('memory-game').innerHTML = `
    <button class='option' onclick='startGame(${matches}, true)'>Restart</button>
    <button onclick="renderPage('home')" class="option">Home</button><br>
    `;
    score = 0;
    matchStr = "";
}