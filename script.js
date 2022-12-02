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
        [0,1,2,5,5,0],
        [3,4,5,5,15,0],
        [6,7,8,5,25,0],
        [0,3,6,-5,15,90],
        [1,4,7,5,15,90],
        [2,5,8,15,15,90],
        [0,4,8,5,15,45],
        [2,4,6,5,15,135]
    ]
    wins.forEach(e=>{
        if((boxtext[e[0]].innerText === boxtext[e[1]].innerText) && (boxtext[e[1]].innerText === boxtext[e[2]].innerText) && (boxtext[e[0]].innerText !== "")){
            document.querySelector(".info").innerText = boxtext[e[0]].innerText + " Won";
            gameWon=true;
            gameOver.play();
            document.querySelector(".imgbox").getElementsByTagName('img')[0].style.width = "250px"
            document.querySelector(".line").style.width = "25vw";
            document.querySelector(".line").style.transform = `translate(${e[3]}vw,${e[4]}vw) rotate(${e[5]}deg)`
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
    document.querySelector(".line").style.width = "0";
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