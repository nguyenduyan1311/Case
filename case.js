let divblock,blockData,blockFrontImages,memoryBlockArr,blocksArray,blockFrontImagesAll,shuffledBlocks;
let currentlyFlippedArr,matchedCount,blockToMatch1,blockToMatch2;
let overlays = Array.from(document.getElementsByClassName('overlay-text'));
overlays.forEach(overlay => {
    overlay.addEventListener('click',() => {
        overlay.classList.remove('visible');
        resetGame();
        init();
    });
});
function startCountdown() {
      return setInterval(() => {
          this.timeRemaining--;
          this.timer.innerText = this.timeRemaining;
          if (this.timeRemaining === 0)
              this.gameOver();
          });
}
function resetGame() {
      let elements = document.getElementsByClassName("block");
      while (elements.length > 0) {
          elements[0].parentNode.removeChild(elements[0]);
      }
}
function init() {
    memoryBlockArr = new Array(18);
    blocksArray = [];
    blockFrontImagesAll = [];
    shuffledBlocks = [];
    currentlyFlippedArr = [];
    matchedCount = 0;
    let minutes = 1;
    let display = document.getElementById("Timer");
    blockFrontImages = ["https://i.imgur.com/bJajBG7.jpg",
        "https://i.imgur.com/w6kOG0P.jpg",
        "https://i.imgur.com/32wEs3L.jpg",
        "https://i.imgur.com/IHDWieg.jpg",
        "https://i.imgur.com/AM1qj3W.jpg",
        "https://i.imgur.com/g05dWbn.jpg",
        "https://i.imgur.com/BuvFrkz.jpg",
        "https://i.imgur.com/kdlo2jD.jpg",
        "https://i.imgur.com/RrbqHx1.jpg"];
    startTimer(minutes,display);
    blockFrontImagesAll = blockFrontImages.concat(blockFrontImages);
    shuffledBlocks = shuffleBlocks(blockFrontImagesAll);
    createElements();
}
function createElements() {
    let finalCount = shuffledBlocks.length;
    for (let i = 0; i < finalCount; i++) {
        let cardFront = shuffledBlocks.pop();
        blockData = new MemoryBlock(i,cardFront,"https://i.imgur.com/uKkXXsO.jpg");
        memoryBlockArr[i] = blockData;
        divblock = document.createElement("div");
        divblockFront = document.createElement("div");
        divblockBack = document.createElement("div");
        imgFront = document.createElement("img");
        imgBack = document.createElement("img");
        divblock.id = memoryBlockArr[i].id;
        divblock.className = memoryBlockArr[i].blockCSS;
        divblockFront.className = memoryBlockArr[i].frontCSS;
        divblockBack.className = memoryBlockArr[i].backCSS;
        imgFront.src = memoryBlockArr[i].frontImage;
        imgFront.className = memoryBlockArr[i].imgCSS;
        imgBack.src = memoryBlockArr[i].backImage;
        imgBack.className = memoryBlockArr[i].imgCSS;
        divblockFront.appendChild(imgFront);
        divblockBack.appendChild(imgBack);
        divblock.appendChild(divblockFront);
        divblock.appendChild(divblockBack);
        divblock.addEventListener('click',flipBlock);
        document.getElementById("gameMainBlock").appendChild(divblock);
    }
}
function shuffleBlocks(blocksArray) {
    let currentIndex = blocksArray.length,temporaryValue,randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = blocksArray[currentIndex];
        blocksArray[currentIndex] = blocksArray[randomIndex];
        blocksArray[randomIndex] = temporaryValue;
    }
    return blocksArray;
}
function flipBlock() {
        this.classList.add('visible');
        if (blockToMatch1 !== this.id) {
            if (currentlyFlippedArr.length === 0) {
                currentlyFlippedArr.push(this.innerHTML);
                blockToMatch1 = this.id;
            } else if (currentlyFlippedArr.length === 1) {
                currentlyFlippedArr.push(this.innerHTML);
                blockToMatch2 = this.id;
                if (currentlyFlippedArr[0] === currentlyFlippedArr[1]) {
                    blocksMatched();
                } else {
                    let wait = ms => new Promise(resolve => setTimeout(resolve,ms));
                    Promise.resolve(800).then(() => wait(800)).then(() => {revertFlip();});
                }
            }
        }
}
function blocksMatched() {
    currentlyFlippedArr = [];
    matchedCount +=2;
    document.getElementById(blockToMatch1).removeEventListener('click',flipBlock);
    document.getElementById(blockToMatch2).removeEventListener('click',flipBlock);
    if (matchedCount === memoryBlockArr.length) {
        showWin();
    }
}
function revertFlip() {
    document.getElementById(blockToMatch1).classList.remove('visible');
    document.getElementById(blockToMatch2).classList.remove('visible');
    currentlyFlippedArr = [];
}
function showWin() {
    document.getElementById('winText').classList.add('visible');
    clearInterval(countdown);
}
function gameOver() {
    document.getElementById('gameOverText').classList.add('visible');
    clearInterval(countdown);
}
