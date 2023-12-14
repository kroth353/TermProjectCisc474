
// Game 2 Settings

/*
Color List
d:1 baby pink: #F4DFF5
d:2 blue gray: #CEDDDE
d:3 bright green: #37FF00
d:4 bright yellow: #FFEE00
d:5 hot pink: #FD0095
d:6 lavender: #B38EED
d:7 light blue: #8EDAEC
d:8 light green: #96ED8F
d:9 light pink: #ED8E9D
l:1 bright orange: #FE9104
l:2 bright red: #FD0000
l:3 brown: #755614
l:4 burnt orange: #FD724D
l:5 dark blue: #112D82
l:6 dark purple: #553462
l:7 deep red: #D1302F
l:8 forest green: #137414
l:9 light brown: #D6A654
d/l:0 gray: #D1D1D1

Color Picker Default Value
old color (Muted Cyan): #1c87c9
new color (Bright Cyan): #007BFF

(lime): #92dd55
*/

function setInputElements() {
    // input elements
    let sizeInput = document.querySelector("#sizePick");
    let diffInput1 = document.querySelector("#diffPick1");
    let diffInput2 = document.querySelector("#diffPick2");
    let diffInput3 = document.querySelector("#diffPick3");
    let colorInput = document.querySelector("#colorPick");
    let keepInput1 = document.querySelector("#keepPick1");
    let keepInput2 = document.querySelector("#keepPick2");
    // output elements
    let sizeOutput = document.querySelector("#sizeOutput");
    let diffOutput; // unused
    let colorOutput = document.querySelector("#colorValue");
    let keepOutput; // unused
    let settingOutput = document.querySelector("#settingValues");
    // value variables
    let sizeValue;
    let diffValue;
    let colorValue;
    let keepValue;

    if (localStorage.getItem("keep") == "true") { // kept setting values
        console.log("Keep Is On!");
        // size
        sizeInput.value = localStorage.getItem("size");
        sizeInput.oninput = function() {
            sizeOutput.innerHTML = sizeInput.value + " x " + sizeInput.value;
        }
        // difficulty
        if (localStorage.getItem("difficulty") == "easy") {
            diffInput1.checked = true;
        } else if (localStorage.getItem("difficulty") == "medium") {
            diffInput2.checked = true;
        } else if (localStorage.getItem("difficulty") == "hard") {
            diffInput3.checked = true;
        }
        // color
        colorInput.value = localStorage.getItem("color");
        colorInput.oninput = function() {
            colorOutput.innerHTML = colorInput.value;
        }
        // keep
        if (localStorage.getItem("keep") == "true") {
            keepInput2.checked = true;
        } else {
            keepInput1.checked = true;
        }
    } else { // default setting values
        console.log("Keep Is Off!");
        sizeInput.value = 2;
        sizeOutput.innerHTML = "2 x 2";
        diffInput1.checked = true;
        colorInput.value = "#1c87c9";
        colorOutput.innerHTML = "#1c87c9";
        keepInput1.checked = true;
    }
}

window.onclick = getValues;

function getValues() {
    window.addEventListener("load", startup, false);

    // input elements
    let sizeInput = document.querySelector("#sizePick");
    let diffInput1 = document.querySelector("#diffPick1");
    let diffInput2 = document.querySelector("#diffPick2");
    let diffInput3 = document.querySelector("#diffPick3");
    let colorInput = document.querySelector("#colorPick");
    let keepInput1 = document.querySelector("#keepPick1");
    let keepInput2 = document.querySelector("#keepPick2");
    // output elements
    let sizeOutput = document.querySelector("#sizeOutput");
    let diffOutput; // unused
    let colorOutput = document.querySelector("#colorValue");
    let keepOutput; // unused
    let settingOutput = document.querySelector("#settingValues");
    // value variables
    let sizeValue;
    let diffValue;
    let colorValue;
    let keepValue;

    function startup() {
        // add eventlisteners
        sizeInput.addEventListener("input", updateFirst, false);
        diffInput1.addEventListener("input", updateFirst, false);
        diffInput2.addEventListener("input", updateFirst, false);
        diffInput3.addEventListener("input", updateFirst, false);
        colorInput.addEventListener("input", updateFirst, false);
        keepInput1.addEventListener("input", updateFirst, false);
        keepInput2.addEventListener("input", updateFirst, false);
    }

    function updateFirst(event) {
        console.clear();
        sizeValue = sizeInput.value;
        if (diffInput1.checked) diffValue = diffInput1.value;
        if (diffInput2.checked) diffValue = diffInput2.value;
        if (diffInput3.checked) diffValue = diffInput3.value;
        colorValue = colorInput.value;
        if (keepInput1.checked) keepValue = keepInput1.value;
        if (keepInput2.checked) keepValue = keepInput2.value;
        
        localStorage.setItem("size",sizeValue);
        localStorage.setItem("difficulty",diffValue);
        localStorage.setItem("color",colorValue);
        localStorage.setItem("pulse","#ffffff");
        localStorage.setItem("keep",keepValue);
        localStorage.setItem("easy",1);
        localStorage.setItem("medium",0.5);
        localStorage.setItem("hard",0.25)

        console.log("size: " + sizeValue);
        console.log("diff: " + diffValue);
        console.log("color: " + colorValue);
        console.log("keep: " + keepValue);

        // size
        sizeInput.oninput = function() {
            sizeOutput.innerHTML = sizeInput.value + " x " + sizeInput.value;
        }
        sizeOutput.innerHTML = sizeInput.value + " x " + sizeInput.value;

        // color
        colorInput.oninput = function() {
            colorOutput.innerHTML = colorInput.value;
        }
        colorOutput.innerHTML = colorInput.value;
        // settings
        settingOutput.innerHTML = "Setting Values: " + sizeValue + " " + diffValue + " " + colorValue + " " + keepValue;
    }
}

function updateSetVals() {
    // input elements
    let sizeInput = document.querySelector("#sizePick");
    let diffInput1 = document.querySelector("#diffPick1");
    let diffInput2 = document.querySelector("#diffPick2");
    let diffInput3 = document.querySelector("#diffPick3");
    let colorInput = document.querySelector("#colorPick");
    let keepInput1 = document.querySelector("#keepPick1");
    let keepInput2 = document.querySelector("#keepPick2");
    // output elements
    let sizeOutput = document.querySelector("#sizeOutput");
    let diffOutput; // unused
    let colorOutput = document.querySelector("#colorValue");
    let keepOutput; // unused
    let settingOutput = document.querySelector("#settingValues");
    // value variables
    let sizeValue;
    let diffValue;
    let colorValue;
    let keepValue;
    sizeValue = sizeInput.value;
        if (diffInput1.checked) diffValue = diffInput1.value;
        if (diffInput2.checked) diffValue = diffInput2.value;
        if (diffInput3.checked) diffValue = diffInput3.value;
        colorValue = colorInput.value;
        if (keepInput1.checked) keepValue = keepInput1.value;
        if (keepInput2.checked) keepValue = keepInput2.value;
    sizeOutput.innerHTML = sizeValue + " x " + sizeValue;
    colorOutput.innerHTML = colorValue;
    settingOutput.innerHTML = "Setting Values: " + sizeValue + " " + diffValue + " " + colorValue + " " + keepValue;
}

// Game 2

window.onresize = setValues;

function setValues() {
    //console.clear();
    // getting local variables
    let gridSize = localStorage.getItem("size");
    let gridDiff =  localStorage.getItem("difficulty");
    let gridColor = localStorage.getItem("color");
    let gridKeep = localStorage.getItem("keep");
    console.log("size: " + gridSize + " difficulty: " + gridDiff + " color: " + gridColor);
    // game output values
    let gameOutput = document.querySelector("#gameValues");
    gameOutput.innerHTML = "| Grid: " + gridSize + " x " + gridSize + " | Difficulty: " + gridDiff + " | Color: " + gridColor + " | Keep Settings: " + gridKeep + " |";
    // getting grid element
    let gameGrid = document.querySelector("#game2Grid");
    let gridWidth = gameGrid.clientWidth;
    let gridHeight = gameGrid.clientHeight;
    //gridWidth = (gridWidth > 600) ? 600: (gridWidth < 100) ? 100: gridWidth;
    gridHeight = (gridHeight > 600) ? 600: (gridHeight < 100) ? 100: gridHeight;
    //let minSize = Math.min(gridWidth,gridHeight);
    //gridWidth = minSize;
    //gridHeight = minSize;
    let gridPixelSize = gridWidth;
    let gridGap = 5;
    console.log("Grid gap: "+ gridGap);
    let cellSize = ((gridPixelSize-(gridGap*(gridSize-1)))/gridSize);
    // show values on console
    console.log("Width: " + gridWidth);
    console.log("Height: " + gridHeight);
    console.log("cell size: " + cellSize);
    // start level btn
    disableStartLevelBtn();
    // HTML game grid
    let autos = "";
    for (let row = 0; row < gridSize; row++) {
        autos += " auto";
    }
    gameGrid.style.setProperty("grid-template-columns",autos);
    gameGrid.setAttribute('gap',gridGap+"px");
    gameGrid.setAttribute('height',gridPixelSize+"px");
    gameGrid.style.setProperty("padding-top","0px");
    gameGrid.innerHTML = "";
    // JS game grid
    const cellRows = [];
    // populate gameGrid with div gameCells
    for (let row = 0; row < gridSize; row++) {
        cellCols = [];
        for (let col = 0; col < gridSize; col++) {
            let index = (row * gridSize) + col;
            let gridCell = '<div id="cell' + index + '" class="gameCell" style="width:' + cellSize + 'px; height:' + cellSize + 'px; background:' + gridColor + ';"></div>';
            console.log("Showing grid cell: " + gridCell);
            console.log("row: " + row + " col: " + col);
            gameGrid.innerHTML += gridCell;
            cellCols[col] = gridCell.toString();
        }
        cellRows[row] = cellCols;
    }

    // clicked cell sequence
    const cellSeq = [];
    let cellSeqStr = JSON.stringify(cellSeq);
    localStorage.setItem("cellSequence",cellSeqStr);
    // set toggle on
    localStorage.setItem("isClickOn","false");

    // add onclick function to gameCells
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            let gridCell = document.querySelector("#cell"+((row*gridSize)+col));
            const clickCell = function() {
                // get cell sequence
                let sequenceStr = localStorage.getItem("cellSequence");
                let seqArr = JSON.parse(sequenceStr);
                // cell id
                let cellId = this.id.replace("cell","");
                let isClickOn = localStorage.getItem("isClickOn");
                if (isClickOn == "true") {
                    //console.log("Click Game Cell is On!");
                    seqArr.push(cellId);
                    // call to console
                    if (isEqualSequence() == 1) {
                        console.log("Random and Cell are equal!");
                    } else if (isEqualSequence() == 0) {
                        console.log("Random and Cell are not equal!");
                    }
                    console.log("Cell Id: " + cellId);
                    console.log("Cell sequence: " + seqArr);
                }
                // store cell id in cell sequence
                sequenceStr = JSON.stringify(seqArr);
                localStorage.setItem("cellSequence",sequenceStr);
            }
            gridCell.onclick = clickCell;
        }
    }
    localStorage.setItem("cellGridHTML",gameGrid);
    localStorage.setItem("cellGridJS",cellRows);
}

function makeSequence(iter) {
    //console.clear();
    /*
    let gameGridHTML = localStorage.getItem("cellGridHTML");
    console.log("HTML Grid: " + gameGridHTML);
    let gameGridJS = localStorage.getItem("cellGridJS");
    console.log("JS Grid: " + gameGridJS);*/

    // get local variables
    iter = (iter < 0) ? 1: iter;
    let gridSize = localStorage.getItem("size");
    let gridDiff =  localStorage.getItem("difficulty");
    let gridColor = localStorage.getItem("color");
    let diffTime = (gridDiff == "easy") ? 1: (gridDiff == "medium") ? 0.5: (gridDiff == "hard") ? 0.25: 1;
    
    // generate index and delay sequences
    const randomIndexSeq = [];
    const randomDelaySeq = [];
    for (let count = 0; count < iter; count++) {
        let row = Math.floor(Math.random() * gridSize);
        let col = Math.floor(Math.random() * gridSize);
        let index = (row * gridSize) + col;
        randomIndexSeq.push(index);
        randomDelaySeq.push(diffTime * count);
    }
    let indexSeqStr = JSON.stringify(randomIndexSeq);
    let delaySeqStr = JSON.stringify(randomDelaySeq);
    // set difficulty time, random sequence, and delay sequence
    localStorage.setItem("time",diffTime);
    localStorage.setItem("randomSequence",indexSeqStr);
    localStorage.setItem("randomDelays",delaySeqStr);

/*
    for (let count = 0; count < iter; count++) {
        let cell = document.querySelector("#cell"+indexSeq[count]);
        //cell.classList.add("easyPulse");
        cell.style.setProperty("--startColor", gridColor);
        cell.style.setProperty("--pulseColor", "#FFFFFF");
        cell.style.setProperty("animation-duration", diffTime + "s");
        //cell.style.setProperty("animation-iteration", values.get(indexSeq[]))
        cell.style.setProperty("animation-delay", delaySeq[count] + "s");
        //console.log("Row: " + row + " Col: " + col + " Index: " + index);
        console.log(cell);
        //setTimeout(() => console.log(count),1000 * count);
    }
*/
/*
    for (let count = 0; count < iter; count++) {
        setTimeout(() => updateCell(count), 1000*delaySeq[count]);
    }
    */
    console.log("Index sequence: " + indexSeqStr);
}

function updateCell(index,color) {
    //console.log("Updating cell: " + index);
    //get local variables
    let gridSize = localStorage.getItem("size");
    let gridDiff =  localStorage.getItem("difficulty");
    let gridColor = localStorage.getItem("color");
    let diffTime = localStorage.getItem("time");
    // validate index
    index = (index < 0) ? 0: (index >= gridSize * gridSize) ? gridSize * gridSize: index;
    //delayIndex = (delayIndex < 0) ? 0: (delayIndex >= gridSize * gridSize) ? gridSize * gridSize: delayIndex;
    // not in use
    let indexSeq = localStorage.getItem("randomSequence");
    let delaySeq = localStorage.getItem("randomDelays");

    let cell = document.querySelector("#cell"+index);
    cell.style.setProperty("background-color",color);
    //cell.classList.add("easyPulse");
    //cell.style.setProperty("--startColor", gridColor);
    //cell.style.setProperty("--pulseColor", "#FFFFFF");
    //cell.style.setProperty("animation-duration", diffTime + "s");
    //cell.style.setProperty("animation-iteration", values.get(indexSeq[]))
    //cell.style.setProperty("animation-delay", delaySeq[delayIndex] + "s");
    //console.log("Row: " + row + " Col: " + col + " Index: " + index);
    
    //setTimeout(() => console.log(count),1000 * count);
    
    //console.log(cell);
}

function pulseSequence() {
    console.log("Pulse Sequence!");
    let indexSeq = localStorage.getItem("randomSequence");
    let delaySeq = localStorage.getItem("randomDelays");
    let pulseColor = localStorage.getItem("pulse");
    let gridSize = localStorage.getItem("size");
    let gridDiff =  localStorage.getItem("difficulty");
    let gridColor = localStorage.getItem("color");
    let diffTime = localStorage.getItem("time");
    let indexes = JSON.parse(indexSeq);
    console.log("Seq length: " + indexes.length);
    console.log("Seq indexes: " + indexes);

    console.log("grid color: " + gridColor);
    console.log("pulse color: " + pulseColor);

    for (let index = 0; index < indexes.length + 1; index++) {
        console.log("Index: " + index);
        console.log("Index sequence: [" + indexes[index] + "]");
        if (index - 1 >= 0) {
            setTimeout(() => updateCell(indexes[index-1],gridColor),diffTime*1000*index);
        }
        if (index < indexes.length) {
            setTimeout(() => updateCell(indexes[index],pulseColor),diffTime*1000*index);
        }
    }
}

function memoryGame() {
    // start game
    console.log("Start Game!");

    
    //disableStartGameBtn();
    //enableStartLevelBtn();
}

function disableStartGameBtn() {
    let startGameBtn = document.querySelector("#startGameBtn");
    startGameBtn.disabled = true;
    startGameBtn.style.setProperty("background-color","gray");
}

function enableStartGameBtn() {
    let startGameBtn = document.querySelector("#startGameBtn");
    startGameBtn.disabled = false;
    startGameBtn.style.setProperty("background-color","#007bff");
}

function disableStartLevelBtn() {
    console.log("Start Level Disabled!");
    let startLevelBtn = document.querySelector("#startLevelBtn");
    startLevelBtn.disabled = true;
    startLevelBtn.style.setProperty("background-color","#gray");
}

function enableStartLevelBtn() {
    
    let startLevelBtn = document.querySelector("#startLevelBtn");
    startLevelBtn.disabled = false;
    startLevelBtn.style.setProperty("background-color","#007bff");
}

function startLevel() {
    // start level
    console.log("Start Level!");
    let count = 1;
    toggleClickOn();


    disableStartLevelBtn();
    clearCellSequence();
    makeSequence(count);
    pulseSequence();
    
    getRandomSequence();
    getCellSequence();
}

function toggleClickOn() {
    console.log("Click Set On!");
    localStorage.setItem("isClickOn","true");
}

function toggleClickOff() {
    console.log("Click Set Off!");
    localStorage.setItem("isClickOn","false");
}

function getRandomSequence() {
    let randomSeqStr = localStorage.getItem("randomSequence");
    let randomSequence = JSON.parse(randomSeqStr);
    console.log("Random Sequence: " + randomSequence)
    return randomSequence;
}

function getCellSequence() {
    let cellSeqStr = localStorage.getItem("cellSequence");
    let cellSequence = JSON.parse(cellSeqStr);
    console.log("Cell Sequence: " + cellSequence)
    return cellSequence;
}

function clearCellSequence() {
    let cellSequence = [];
    let cellSeqStr = JSON.stringify(cellSequence);
    localStorage.setItem("cellSequence",cellSeqStr);
}

function isEqualSequence() {
    console.log("Equal Sequence?");
    let isEqual = 1;
    let randomSequence = getRandomSequence();
    let cellSequence = getCellSequence();
    let randomSize = randomSequence.length;
    let cellSize = cellSequence.length;
    if (randomSize != cellSize) {
        isEqual = 0;
    } else {
        for (let index = 0; index < cellSize; index++) {
            let randomCell = randomSequence[index];
            let sequenceCell = cellSequence[index];
            if (randomCell != sequenceCell) {
                isEqual = 0;
            }
        }
    }
    return isEqual;
}

/*
function updateSeqCell(count) {
    //get local variables
    let gridSize = localStorage.getItem("size");
    let gridDiff =  localStorage.getItem("difficulty");
    let gridColor = localStorage.getItem("color");
    let diffTime = localStorage.getItem("time");

    count = (count < 0) ? 0: (count >= gridSize * gridSize) ? gridSize * gridSize: count;

    let indexSeq = localStorage.getItem("sequence");
    let delaySeq = localStorage.getItem("delays");
    let indexs = indexSeq.split(",");
    console.log("indexSeq: " + indexSeq);
    console.log("indexSeq: " + indexs[count]);

    let cell = document.querySelector("#cell"+indexs[count]);
    
    /* (ANIMATION CSS)
    //cell.classList.add("easyPulse");
    cell.style.setProperty("--startColor", gridColor);
    cell.style.setProperty("--pulseColor", "#FFFFFF");
    cell.style.setProperty("animation-duration", diffTime + "s");
    //cell.style.setProperty("animation-iteration", values.get(indexSeq[]))
    cell.style.setProperty("animation-delay", delaySeq[count] + "s");
    

    //console.log("Row: " + row + " Col: " + col + " Index: " + index);
    console.log(cell);
    //setTimeout(() => console.log(count),1000 * count);
}
*/

/*
function cellPairs(index,color,indexSize,colorPulse) {
    console.log("Cell pair: " + index);
    // set to grid color
    if (index - 1 >= 0) {
        updateCell(index-1,color);
    }
    // set to pulse color
    if (index < indexSize) {
        updateCell(index,colorPulse);
    }
}
*/

/*
function indexToCoord(index,size) {
    const coord = [];
    coord[0] = (size > 0) ? Math.floor(index/size): 0;
    coord[1] = (size > 0) ? Math.floor(index%size): 0;
    return coord;
}

function coordToIndex(row, col, size) {
    return (size > 0) ? Math.floor((row * size) + col): 0;
}
*/

    /*
    const values = [];
    console.log("Duplicates:");
    for (let count = 0; count < iter; count++) {
        let value = indexSeq[count];
        delaySeq[count] = [];
        if(!values.includes(value)) {
            values.push(value);
            delaySeq.push(diffTime*count);
            console.log(value + " " + diffTime*count);
        } else {
            let dupIndex = 0;
            while (dupIndex < iter) {
                if (values[dupIndex] == value) {
                    delaySeq[dupIndex].push(diffTime*count);
                    console.log(value + " " + diffTime*count);
                    break;
                }
                dupIndex++;
            }
        }
    }
    */

/*
function updateHTMLGameGrid() {
    //console.clear();
    // getting grid element
    let gameGrid = document.querySelector("#game2Grid");
    // JS game grid
    const cellRows = localStorage.getItem("cellGridJS");
    // getting local variables
    let gridSize = localStorage.getItem("size");
    let gridDiff = localStorage.getItem("difficulty");
    let gridColor = localStorage.getItem("color");
    gameGrid.innerHTML = "";
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            let cellID = (row * gridSize) + col;
            console.log(cellID);
            let divCell = document.querySelector("#cell"+cellID);
            if (row == 0 & col == 0) {
                console.log("divCell: " + divCell);
                //divCell.style.setProperty("--diff-animation-duration","4s");
                //divCell.style.setProperty("--startColor",gridColor);
                //divCell.style.setProperty("--pulseColor","white");
            }
            console.log("row: " + row + " col: " + col);
            gameGrid.innerHTML += divCell;
        }
    }
    localStorage.setItem("cellGridHTML",gameGrid);
}
*/