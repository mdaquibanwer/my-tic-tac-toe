console.log("welcome to tic tac toe")

let audioTurn = new Audio("click.wav");
let gameOver = new Audio("winneraudio.wav");
let resetGame = new Audio("resetgame.wav");
let resetbtn = document.getElementById('reset');

let gameTurn = "X"
let gameWon = false;

// Function to change the turn
const changeTurn = ()=>{
    return gameTurn === "X"? "O" : "X"
}

// function to check for a win

const checkWinner = ()=>{
    let boxtext = document.getElementsByClassName('boxtext');
    let wins = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]
    wins.forEach(e=>{
        if((boxtext[e[0]].innerText === boxtext[e[1]].innerText) && (boxtext[e[1]].innerText === boxtext[e[2]].innerText) && (boxtext[e[0]].innerText !== "")){
            document.querySelector(".info").innerText = boxtext[e[0]].innerText + " Won";
            gameWon=true;
            gameOver.play();
            document.querySelector(".imgbox").getElementsByTagName('img')[0].style.width = "250px"
        }
    })
    
}

// reset the game 
resetbtn.addEventListener('click',()=>{
    let boxtext = document.querySelectorAll('.boxtext')
    Array.from(boxtext).forEach(element=>{
        element.innerText = ""
    })
    if(gameOver.play()){
        gameOver.pause();
        resetGame.play();
        document.querySelector(".imgbox").getElementsByTagName('img')[0].style.width = "0px"
    }
    gameTurn = "X";
    gameWon =false;
    document.getElementsByClassName("info")[0].innerText = "Turn For " + gameTurn;
    
})


// game logic 

const boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element=>{
    let boxtext = element.querySelector('.boxtext');
    element.addEventListener('click',(e)=>{
        if(boxtext.innerText === ""){
            boxtext.innerText = gameTurn;
            audioTurn.play();
            gameTurn = changeTurn();
            checkWinner();
            if(!gameWon){
                document.getElementsByClassName("info")[0].innerText = "Turn For " + gameTurn;
            }
        }
    })
})