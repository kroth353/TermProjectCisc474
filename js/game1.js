var numCards = 16;
let animals = ["Alligator", "Cow", "Giraffe", "Koala", "Otter", "Rabbit", "Wolf", "Capybara", "Dog", "Goose", "Lion", "Owl", "Rhino", "Yak", "Cat", "Duck", "Gorilla", "Meerkat", "Panda", "SeaLion", "Cheetah", "Flamingo", "Horse", "Monkey", "Parrot", "Snake", "Chicken", "Frog", "Kangaroo", "MountainGoat", "Penguin", "Tiger"];
let colors = ["Brown", "ForestGreen", "Lavender", "Magenta", "Mint", "Teal", "babyPink", "blueGray", "brightGreen", "brightOrange", "brightRed", "brightYellow", "burntOrange", "darkBlue", "darkPurple", "deepRed", "gray", "hotPink", "lightBlue", "lightBrown", "lightGreen", "lightPink", "maroon", "mediumBlue", "mediumOrange", "middleYellow", "paleOrange", "paleYellow", "peach", "royalPurple", "skyBlue", "turquoise"];
let numbers = ["1", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "2", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "3", "30", "31", "32", "4", "5", "6", "7", "8", "9"];
var matchStr = "";
var imgOption = 1;

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
    for(let i = 0; i < numCards; i++){
        arrayOption.push(i);
        arrayOption.push(i);
     }

     //array should be sequence of number with two of each number
    suffleArray(arrayOption)

    for(let i = 0; i<(numCards); i++) {
        cardStr = imgs[arrayOption[i]];
        htmlStr += "<div id='" + cardStr + "class='item-card' style='width: " + cardWidth + "px; height: " + cardHeight + "px;'><img class='front-face' src='images/" + cardStr + ".png'><img class='back-face' src='images/card.png'></div>";
    }

    document.getElementById('memory-game').innerHTML = htmlStr;
    for(let j = 0; j<(numCards/2); j++) {
        cardStr = imgs[j];
        document.getElementById(cardStr+"1").addEventListener('click', flipCard);
        document.getElementById(cardStr+"2").addEventListener('click', flipCard);
    }
    console.log("flip listener created");
}

function hideStartButton() {
    document.getElementById('start-button').style.display = "none";
    console.log("start button hidden");
}

function startGame() {
    console.log("game started");
    hideStartButton();
    createCards();
    console.log("before first flip");
    flipCard();
    sleep(2000);
    flipCard();
}

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

function flipCard() {
    console.log("flip: " + this.id);
    this.classList.toggle('flip');
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