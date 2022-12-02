//targeting elements in the HTML section
var question = document.querySelector('#question');
var choices = document.querySelectorAll('#choices');
var message = document.querySelector('#message');
var timer = document.querySelector('#timer');
var startBtn = document.querySelector('#start-btn');
var highScoreBtn = document.querySelector('#highscore-btn');
var scores = document.querySelector('.scores');
var timeElement = document.querySelector('#timer-count');

//Declaring empty variables to help with the events
var currentQuestion = {};
var correctAnswer = true;
var scoreCounter = 0;
var availableQuestions = {};
var timerCount;
var timer;

//Creating an object for questions
var questions = {
    q1: {
        question: 'what is 2 + 2?',
        choice1: '2',
        choice2: '4',
        choice3: '22',
        choice4: '0',
        answer: 2,
     },
     q2: {
        question: 'what is 2 + 2?',
        choice1: '2',
        choice2: '4',
        choice3: '22',
        choice4: '0',
        answer: 2,
     },
     q3: {
        question: 'what is 2 + 2?',
        choice1: '2',
        choice2: '4',
        choice3: '22',
        choice4: '0',
        answer: 2,
     },
     q4: {
        question: 'what is 2 + 2?',
        choice1: '2',
        choice2: '4',
        choice3: '22',
        choice4: '0',
        answer: 2,
     },
};

console.log(questions.q4.question);

//creating an init function which will be called when the page loads
function init() {
    getScores();
} 
//WHEN I click the start button THEN a timer starts and I am presented with a question
//WHEN I answer a question THEN I am presented with another question
//WHEN I answer a question incorrectly THEN time is subtracted from the clock
//WHEN all questions are answered or the timer reaches 0 THEN the game is over
//WHEN the game is over THEN I can save my initials and my score