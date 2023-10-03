var numCards = 16;
let animals = ["Alligator", "Cow", "Giraffe", "Koala", "Otter", "Rabbit", "Wolf", "Capybara", "Dog", "Goose", "Lion", "Owl", "Rhino", "Yak", "Cat", "Duck", "Gorilla", "Meerkat", "Panda", "SeaLion", "Cheetah", "Flamingo", "Horse", "Monkey", "Parrot", "Snake", "Chicken", "Frog", "Kangaroo", "MountainGoat", "Penguin", "Tiger"];
let colors = ["Brown", "ForestGreen", "Lavender", "Magenta", "Mint", "Teal", "babyPink", "blueGray", "brightGreen", "brightOrange", "brightRed", "brightYellow", "burntOrange", "darkBlue", "darkPurple", "deepRed", "gray", "hotPink", "lightBlue", "lightBrown", "lightGreen", "lightPink", "maroon", "mediumBlue", "mediumOrange", "middleYellow", "paleOrange", "paleYellow", "peach", "royalPurple", "skyBlue", "turquoise"];
let numbers = ["1", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "2", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "3", "30", "31", "32", "4", "5", "6", "7", "8", "9"];
var matchStr = "";
var imgOption = 2;

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

    if(imgOption == 1) {
        let imgs = animals;
    } else if (imgOption == 2) {
        let imgs = colors;
    } else {
        let imgs = numbers;
    }
    htmlStr = '';
    for(let i = 0; i<(numCards/2); i++) {
        cardStr = imgs[i];
        htmlStr += "<div id='" + cardStr + "1' class='item-card' style='width: " + cardWidth + "px; height: " + cardHeight + "px;'><img class='front-face' src='img/" + cardStr + ".png'><img class='back-face' src='img/card.png'></div>" + "<div id='" + cardStr + "2' class='item-card' style='width: " + cardWidth + "px; height: " + cardHeight + "px;'><img class='front-face' src='img/" + cardStr + ".png'><img class='back-face' src='img/card.png'></div>";
    htmlStr = '';
    for(let i = 0; i<numCards; i++) {
        htmlStr += "<div id='card" + i + "' class='item-card' style='width: " + cardWidth + "px; height: " + cardHeight + "px;'><img class='front-face' src='img/herc.svg'><img class='back-face' src='img/herc.svg'></div>";
    }
    document.getElementById('memory-game').innerHTML = htmlStr;
    for(let j = 0; j<numCards; j++) {
        document.getElementById("card"+j).addEventListener('click', flipCard);
    }
}

function hideStartButton() {
    document.getElementById('start-button').style.display = "none";
    console.log("start button hidden");
}

async function startGame() {
    console.log("game started");
    hideStartButton();
    createCards();
    flipCard();
    await new Promise(r => setTimeout(r, 2000));
    flipCard();
}

function flipCard() {
    console.log("do a flip");
    this.classList.toggle('flip');
}

document.addEventListener("DOMContentLoaded", () => {
    console.log("Ready");
});
