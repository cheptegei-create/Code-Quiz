//targeting elements in the HTML section
var question = document.querySelector('#question');
var choices = document.querySelectorAll('#choices');
var message = document.querySelector('#message');
var timer = document.querySelector('#timer');
var startBtn = document.querySelector('#start-btn');
var highScoreBtn = document.querySelector('#highscore-btn');

//Declaring empty variables to help with the events
var currentQuestion = {};
var correctAnswer = true;
var questionCounter = 0;
var availableQuestions = {};

//Creating an object for questions
var questions = {
     
}
//WHEN I click the start button THEN a timer starts and I am presented with a question
//WHEN I answer a question THEN I am presented with another question
//WHEN I answer a question incorrectly THEN time is subtracted from the clock
//WHEN all questions are answered or the timer reaches 0 THEN the game is over
//WHEN the game is over THEN I can save my initials and my score