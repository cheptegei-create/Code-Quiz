//targeting elements in the HTML section
var quiz = document.querySelector(".quiz");
/*var choices = document.querySelectorAll("#choices");*/
/*var message = document.querySelector("#message");*/
/*var timer = document.querySelector("#timer");*/
var startBtn = document.querySelector("#start-btn");
var highScoreBtn = document.querySelector("#highscore-btn");
var scores = document.querySelector(".result");
var timeElement = document.querySelector("#timer-count");
var container = document.querySelectorAll(".container");
/*var ch1 = document.querySelectorAll(".choice1");
var ch2 = document.querySelectorAll(".choice2");
var ch3 = document.querySelectorAll(".choice3");
var ch4 = document.querySelectorAll(".choice4");*/
/*
//Declaring variables
var currentQuestion;
var complete = false;
var scoreCounter = 0;
var timerCount;
var timer;
*/
//Creating an object for questions
var questions = [
    {
    question: "Which among the following is not a JavaScript data type?",
    answers: {
    1: "null",
    2: "string",
    3: "boolean",
    4: "integer",
    },
    correctAnswer: 4
  },
  {
    question: "Which among the following is not a JavaScript data type?",
    answers: {
    1: "null",
    2: "string",
    3: "boolean",
    4: "integer",
    },
    correctAnswer: 4
  },
  {
    question: "Which among the following is not a JavaScript data type?",
    answers: {
    1: "null",
    2: "string",
    3: "boolean",
    4: "integer",
    },
    correctAnswer: 4
  },
  {
    question: "Which among the following is not a JavaScript data type?",
    answers: {
    1: "null",
    2: "string",
    3: "boolean",
    4: "integer",
    },
    correctAnswer: 4
  },
];

var askedQuestions = [];
var leaderBoard = [];
var totalScore = 60;
var deductedPoints = 10;

//Creating a resetQuiz function
function resetQuiz() {
    questions = Object.assign(askedQuestions);
    askedQuestions = [questions.pop()];
    removeElement('leaderboard');
    quiz.style.display = "block";
    scores.style.display = "none";
    container.style.display = "none";
    timeElement;
    totalScore = 60;

    startTimer(totalScore, timeElement);
}

//creating the time function
function startTimer(duration, timeElement) {
    var timer = duration, seconds;
    var timerInterval = setInterval(function () {
        timeElement.textContent = timer;
        --totalScore;
        timer = totalScore;

        if (--timer < 0 || questions.length === 0) {
            document.querySelector('score-count').innerHTML = totalScore;
            quiz.style.display = "none";
            scores.style.display = "block";
            container.style.display = "none";
            clearInterval(timerInterval);
        }
    }, 1000);
}

//creating a send form details for the leader board
function sendFormDetails(event) {
    event.preventDefault();
    var username = localStorage.getItem("username");
    var leaderBoardData = {
        username: username,
        score: totalScore
    }

    leaderBoard.push(leaderBoardData);
    var leaderBoardContainer = document.createElement('div');
    var headerElm = document.createElement('h1');
    headerElm.textContent = 'Highscores';
    leaderBoardContainer.setAttribute("id", "leaderboard");
    var list = document.createElement('ol');
    var btnClear = document.createElement('button');

    btnClear.setAttribute('class', 'btn');
    btnClear.textContent = 'Go Back';
    btnClear.addEventListener('click', resetQuiz);

    var sortedLeaderBoard = leaderBoard.sort((a, b) => b.score-a.score);

    for (var x=0; x<sortedLeaderBoard.length; x++) {
        var listItem = document.createElement('li');
        //https://developer.mozilla.org/en-US/docs/Web/API/Document/createTextNode
        listItem.appendChild(document.createTextNode('${leaderBoard[x].username} - ${leaderBoard[x].score}'));
        list.appendChild(listItem);
    }
    leaderBoardContainer.appendChild(headerElm);
    leaderBoardContainer.appendChild(list);
    leaderBoardContainer.appendChild(btnClear);

    document.querySelector('.main').appendChild(leaderBoardContainer);
    scores.style.display = "none";
}

//Creating a removeElement function

function removeElement(id) {
    var elem = document.getElementById(id);
    return elem.parentNode.removeChild(elem);
}
//creating a function for choice selection by the user
function onClickHandler(event) {
    var userAnswer = event.target.getAttribute('data-value'), message;
    if (userAnswer === askedQuestions[askedQuestions.length-1]['answer']) {
        message = 'correct';
    } else {
        message = 'wrong';
        totalScore -= deductedPoints;
    }
    var messageElem = document.createElement('div');
    messageElem.setAttribute("id", "message");
    messageElem.appendChild(document.createTextNode(message));
    document.querySelector('#quiz-container').appendChild(messageElem);

    var renderTimeout = setTimeout(() => {
        var elementExists = document.querySelector('#message');
        if (elementExists) {
            removeElement('quiz-container');
            var currentQuestion = questions.pop();
            if (currentQuestion == undefined) {
                clearTimeout(renderTimeout);
                return;
            }
            quiz.appendChild(renderQuizView(currentQuestion));
            askedQuestions.push(currentQuestion);
        }
    }, 1000);
}


/*

//creating an init function which will be called when the page loads
function init() {
  getScores();
}

var maxQuiz = 4;
var scorePoints = 100;
//creating a start game function that initiates when the start button is clicked
startBtn.addEventListener("click", function(event) {
event.preventDefault()
console.log('game is starting');
timerCount = 100;
scoreCounter = 0;
complete = false;
getNewQuiz();
 /* initiateGame();
  complete = false;
  timerCount = 100;
  renderQuestions();
  startTimer();*/
/*});
//Hides the landing page when the code quiz starts and shows it after submitting or when time runs out
function hideLanding() {
    var mode = "show";
  if (mode === "show" && getNewQuiz) {
    mode = "hidden";
    container.setAttribute("class", "hidden");
  } else if (submitButton || timerCount === 0) {
    mode = "show"
    container.setAttribute("class", "show");
  }
}

//creating a funtion for getting a new question. Got idea from https://simplestepscode.com/javascript-quiz-tutorial/
function getNewQuiz() {
    console.log('quiz is reading');
    //Creating a place to store our current question and answer
currentQuestion = []
var answers;

//for loop for the questions
for (var x=0; x<questions.length; x++) {
    //reset all the answers
    answers= [];

    //for each answer
    for (number in questions[x].answers) {
        //add a radio button
        answers.push('<label>'
        + '<input type="radio" name="question"'+x+'value="'+number+'">'
        + number + ': '
        + questions[x].answers[number]
      + '</label>');
    }
    //add the question and answer to current Question
    currentQuestion.push('<div class="current">' + questions[x].question + '</div>' + '<div class="answers">' + answers.join('') + '</div>');
}

//dsiplay on the html page
quiz.innerHTML = currentQuestion.join('');
    
//moves to the next number question

//randomly selects the questions from the questions object
/*function getRandomObject(questions) {
    var indexQuiz = Object.keys(questions.q);
    
    return indexQuiz[Math.floor(Math.random() * indexQuiz.length)];
}*/
//appends the current question to the screen
/*var indexQuiz = Object.keys(questions);
console.log(indexQuiz);*/

//randomly selects the questions from the questions object
/*var indexQuiz = Object.entries(questions);
for (var x = 0; x < indexQuiz.length; x++) {
currentQuestion = indexQuiz[Math.floor(Math.random() * indexQuiz.length)];
console.log(JSON.stringify(currentQuestion));
//appends the current question to the screen
quiz.textContent = currentQuestion[1].question;
ch1.textContent = currentQuestion[1].choice1;
ch2.textContent = currentQuestion[1].choice2;
ch3.textContent = currentQuestion[1].choice3;
ch4.textContent = currentQuestion[1].choice4;
}*/
//adding event listener on the choices
/*choices.addEventListener("click", function(event) {
    var element = event.target;

    if (element.matches(currentQuestion[1].answer)) {
        
    }

});*/


/*
    console.log("I am here");
//Updates the scores for the quiz and stores it in local storage
 /*   if (currentQuestion.length === 0) {
        localStorage.setItem('mostRecentScore', scoreCounter);
    }*/
/*
}
*/

/*function initiateGame() {
    
    var mode = "hidden";
  if (divTags[0] === "show" && divTags[1] === "hidden") {
    mode = "show";
    divTags[0].setAttribute("class", "hidden");
    divTags[1].setAttribute("class", "show");
  }
}

function youWin() {
  message.textContent = "Correct Answer";
  scoreCounter++;
  setScores();
}
//when the chooses the wrong answer it displays "incorrect"
function youLose() {
  message.textContent = "Incorrect";
  timerCount = timerCount - 20;
}*/
// start timer function the initiates when the button is clicked
/*function startTimer() {
  //set timer
  timer = setInterval(function () {
    timerCount--;
    timeElement.textContent = timerCount;
    if (timerCount >= 0) {
      //clear interval and stops time
      if (complete && timerCount > 0) {
        clearInterval(timer);
        window.alert("Congrats, Good Job!");
      }
    }
    if (timerCount === 0) {
      //clear interval
      clearInterval(timer);
      window.alert("Try again next time!");
    }
  }, 1000);
}
*/
/*function renderQuestions() {
    currentQuestion = questions[Math.floor(Math.random() * questions.length)];
}*/
//WHEN I click the start button THEN a timer starts and I am presented with a question
//startBtn.addEventListener("click", startGame);
//WHEN I answer a question THEN I am presented with another question
//WHEN I answer a question incorrectly THEN time is subtracted from the clock
//WHEN all questions are answered or the timer reaches 0 THEN the game is over
//WHEN the game is over THEN I can save my initials and my score
