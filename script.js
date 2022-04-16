'use strict';

const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

const score0 = document.getElementById('score--0');
const score1 = document.getElementById('score--1');
const currentScore0 = document.getElementById('current--0');
const currentScore1 = document.getElementById('current--1');

const newGame = document.querySelector('.btn--new');
const rollDice = document.querySelector('.btn--roll');
const holdPlayer = document.querySelector('.btn--hold');
const dice = document.querySelector('.dice');

let currentScore = 0;
let scores = [0, 0];
let active = 0;
let playing = true;

function initial(){
    score0.textContent = 0;
    score1.textContent = 0;
    currentScore0.textContent = 0;
    currentScore1.textContent = 0;
    active0();
    document.querySelector(`.player--${active}`).classList.remove('player--winner');
    dice.style.visibility = 'hidden';
}

function active0(){
    player0.classList.add('player--active');
    player1.classList.remove('player--active');
}

function active1(){
    player1.classList.add('player--active');
    player0.classList.remove('player--active');
}

function hold(){
    let player0IsActive = player0.classList.contains('player--active');
    scores[active] += currentScore;
    document.getElementById(`score--${active}`).textContent = scores[active];

    if(scores[active] >= 100){
        playing = false;
        console.log(`My score is ${scores[active]}`);
        document.querySelector(`.player--${active}`).classList.add('player--winner');
        document.querySelector(`.player--${active}`).classList.remove('player--active'); 
    }
    
    else{
        if(player0IsActive) {
            currentScore0.textContent = 0 
            currentScore = 0;  
            active1();
        }
        else {
            currentScore1.textContent = 0 
            currentScore = 0; 
            active0();
        }
    }
    active = active === 0 ? 1 : 0;
}

function diceRoll(){
    if(playing){
        let number = Math.trunc(Math.random() * 6) + 1;
        dice.style.visibility = "visible";
        dice.src = `dice-${number}.png`;
        if(number === 1) {
            active = active === 0 ? 1 : 0;
            currentScore = 0;
            hold();
            active = active === 0 ? 1 : 0;
        }
        else{
            currentScore += number;
            document.getElementById(`current--${active}`).textContent = currentScore;
        }
    }
}


initial();
holdPlayer.addEventListener('click', hold);
newGame.addEventListener('click', initial);
rollDice.addEventListener('click', diceRoll);



