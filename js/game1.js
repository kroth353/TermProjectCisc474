var numCards = 16;
let animals = ["Alligator", "Cow", "Giraffe", "Koala", "Otter", "Rabbit", "Wolf", "Capybara", "Dog", "Goose", "Lion", "Owl", "Rhino", "Yak", "Cat", "Duck", "Gorilla", "Meerkat", "Panda", "SeaLion", "Cheetah", "Flamingo", "Horse", "Monkey", "Parrot", "Snake", "Chicken", "Frog", "Kangaroo", "MountainGoat", "Penguin", "Tiger"];
let colors = ["Brown", "ForestGreen", "Lavender", "Magenta", "Mint", "Teal", "babyPink", "blueGray", "brightGreen", "brightOrange", "brightRed", "brightYellow", "burntOrange", "darkBlue", "darkPurple", "deepRed", "gray", "hotPink", "lightBlue", "lightBrown", "lightGreen", "lightPink", "maroon", "mediumBlue", "mediumOrange", "middleYellow", "paleOrange", "paleYellow", "peach", "royalPurple", "skyBlue", "turquoise"];
let numbers = ["1", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "2", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "3", "30", "31", "32", "4", "5", "6", "7", "8", "9"];
var matchStr = "";
var imgOption = 1;
var score = 0;
var lives = 3;
var numLeft = 0;

function createCards() {
    console.log("creating " + numCards + " cards");
    let numCol = Math.ceil(Math.sqrt(numCards));
    let numRow = Math.ceil(numCards/numCol);
    console.log("numCol: " + numCol + "numRow: " + numRow);
    console.log("game width: " + document.getElementById('memory-game').clientWidth);
    let cardHeightNum = Math.ceil((document.getElementById('memory-game').clientHeight*0.9)/numRow);
    let cardWidthNum = Math.ceil((cardHeightNum*5)/7);
    let cardWidth = cardWidthNum.toString();
    console.log("card width: " + cardWidth);
    let cardHeight = cardHeightNum.toString();
    var imgs = [];
    if(imgOption == 1) {
        imgs = animals;
    } else if (imgOption == 2) {
        imgs = colors;
    } else {
        imgs = numbers;
    }
    shuffleArray(imgs);
    htmlStr = '';
    
    var arrayOption= []
    for(let i = 0; i < numCards/2; i++){
        arrayOption.push(i);
        arrayOption.push(i);
        //console.log(arrayOption);
     }

     //array should be sequence of number with two of each number
    shuffleArray(arrayOption);
    
    for(let i = 0; i<(numCards); i++) {
        cardStr = imgs[arrayOption[i]];
        console.log(cardStr);
        htmlStr += "<div id='" + cardStr + i + "' class='item-card' style='width: " + cardWidth + "px; height: " + 
                    cardHeight + "px'><img class='front-face' src='images/" + cardStr + ".png'><img class='back-face' src='images/card.png'></div>";
    }
    console.log("htmlStr" + htmlStr);
    document.getElementById('memory-game').innerHTML = htmlStr;
    document.getElementById('lives').innerHTML = "<p style='padding-top:75px'>Lives: " + lives + "</p>";
    document.getElementById('score').innerHTML = "<p style='padding-top:75px'>Score: " + score + "</p>";
}

function hideStartButton() {
    document.getElementById('start-button').style.display = "none";
    console.log("start button hidden");
}

async function startGame() {
    console.log("game started");
    numLeft = numCards;
    hideStartButton();
    createCards();
    console.log("before first flip");
    await sleep(1000);
    flipAllCards();
    await sleep(10000);
    flipAllCards();
    addClickListenerToAll();
}

function addClickListenerToAll() {
    document.querySelectorAll('.item-card').forEach(c => {
        c.addEventListener('click', flipCard);
    });
    console.log("flip listener created");
}

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

async function flipCard() {
    //console.log("flip: " + this.id);
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
            startGame();
        }
    } else {
        await sleep(2000);
        this.classList.toggle('flip');
        document.getElementById(matchStr).classList.toggle('flip');
        this.addEventListener('click', flipCard);
        document.getElementById(matchStr).addEventListener('click', flipCard);
        matchStr = "";
        lives -= 1;
        document.getElementById('lives').innerHTML = "<p>Lives: " + lives + "</p>";
        if(lives == 0) {
            lives = 3;
            document.getElementById('memory-game').innerHTML = "<button class='option' onclick='startGame()'>Restart</button>";
            score = 0;
        }
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