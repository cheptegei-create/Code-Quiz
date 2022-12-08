//Creating an object for questions
var startBtn = document.querySelector("#start-btn");
var highScoreBtn = document.querySelector("#highscore-btn");

var questions = [
  {
    question: "what is 22 + 10?",
    choices: {
      one: "2",
      two: "4",
      three: "22",
      four: "32",
    },
    answer: "four",
  },
  {
    question: "what is 2 + 2?",
    choices: {
      one: "2",
      two: "4",
      three: "22",
      four: "0",
    },
    answer: "two",
  },
  {
    question: "what is 16 + 7?",
    choices: {
      one: "23",
      two: "4",
      three: "22",
      four: "0",
    },
    answer: "one",
  },
  {
    question: "what is 20 + 4?",
    choices: {
      one: "2",
      two: "24",
      three: "22",
      four: "0",
    },
    answer: "two",
  },
];

var askedQuestions = [];
var leaderBoard = [];
var totalScore = 60;
var deductedPoints = 10;

//Creating a resetQuiz function
function resetQuiz() {
  location.reload();
}

//creating the time function
function startTimer(duration, display) {
  var timer = duration;
  var timerInterval = setInterval(function () {
    display.textContent = timer;
    --totalScore;
    timer = totalScore;

    if (--timer < 0 || questions.length === 0) {
      document.getElementById("score-count").innerHTML = totalScore;
      document.getElementById("quiz").style.display = "none";
      document.getElementById("result").style.display = "block";
      clearInterval(timerInterval);
    }
  }, 1000);
}

//creating a send form details for the leader board
function sendFormDetails(event) {
  event.preventDefault();
  var otherArray = JSON.parse(localStorage.getItem("leaderBoardData")) || [];
  var formEl = document.forms.usernameForm;
  var formData = new FormData(formEl);
  var username = formData.get("username");
  var leaderBoardData = {
    username: username,
    score: totalScore,
  };
 otherArray.push(leaderBoardData);
  localStorage.setItem("leaderBoardData", JSON.stringify(otherArray));
  
  
  var leaderboardContainer = document.createElement("div");
  var headerElm = document.createElement("h1");
  headerElm.textContent = "Highscores";
  leaderboardContainer.setAttribute("id", "leaderboard");
  var list = document.createElement("ol");
  var btnClear = document.createElement("button");

  btnClear.setAttribute("class", "btn");
  btnClear.textContent = "Go Back";
  btnClear.addEventListener("click", resetQuiz);

  var sortedLeaderBoard = otherArray.sort((a, b) => {
    if (a === null) {
      return 1;
    }
    if (b === null) {
      return -1;
    }
    if (a === b) {
      return 0;
    }

    return b.score - a.score? -1 : 1;
  });

  console.log(sortedLeaderBoard);

  for (var x = 0; x < sortedLeaderBoard.length; x++) {

    var listItem = document.createElement("li");
    //https://developer.mozilla.org/en-US/docs/Web/API/Document/createTextNode
    listItem.appendChild(
      document.createTextNode(
        `${sortedLeaderBoard[x].username} - ${sortedLeaderBoard[x].score}`
      )
    );
    list.appendChild(listItem);
  }
  leaderboardContainer.appendChild(headerElm);
  leaderboardContainer.appendChild(list);
  leaderboardContainer.appendChild(btnClear);

  document.getElementById("main").appendChild(leaderboardContainer);
  document.getElementById("result").style.display = "none";

}

//Creating a removeElement function

function removeElement(id) {
  var elem = document.getElementById(id);
  return elem.parentNode.removeChild(elem);
}
//creating a function for choice selection by the user
function onClickHandler(event) {
  var userAnswer = event.target.getAttribute("data-value"),
    message;
  if (userAnswer === askedQuestions[askedQuestions.length - 1]["answer"]) {
    message = "correct";
  } else if (
    userAnswer != askedQuestions[askedQuestions.length - 1]["answer"]
  ) {
    message = "wrong";
    totalScore -= deductedPoints;
  } else if (!userAnswer) {
    return;
  }
  messageElem = document.createElement("div");
  messageElem.setAttribute("id", "message");
  messageElem.appendChild(document.createTextNode(message));
  document.querySelector("#quiz-container").appendChild(messageElem);

  var renderTimeout = setTimeout(() => {
    var elementExists = document.getElementById("message");
    if (elementExists) {
      removeElement("quiz-container");
      var currentQuestion = questions.pop();
      if (currentQuestion == undefined) {
        clearTimeout(renderTimeout);
        return;
      }
      document
        .getElementById("quiz")
        .appendChild(renderQuizView(currentQuestion));
      askedQuestions.push(currentQuestion);
    }
  }, 1000);
}
//Creating a function to render quiz view
function renderQuizView(questionObj) {
  //ask about questionObj
  var quizContainer, question, choices;
  quizContainer = document.createElement("div");
  quizContainer.setAttribute("id", "quiz-container");

  question = document.createElement("p");
  question.setAttribute("id", "question");
  question.appendChild(document.createTextNode(questionObj.question));

  //creating the list element
  choices = document.createElement("ul");
  choices.setAttribute("class", "choices");

  for (const prop in questionObj.choices) {
    //alternative for const
    //create list item
    var listItem = document.createElement("li");
    listItem.setAttribute("id", `choice-${prop}`);
    listItem.setAttribute("class", "choice");
    listItem.setAttribute("data-value", prop);
    //set its contents
    listItem.appendChild(document.createTextNode(questionObj.choices[prop]));
    listItem.addEventListener("click", onClickHandler);

    //add it to the list
    choices.appendChild(listItem);
  }
  quizContainer.appendChild(question);
  quizContainer.appendChild(choices);

  //returning the constructed list
  return quizContainer;
}

var currentQuestion = questions.pop();
document.getElementById("quiz").appendChild(renderQuizView(currentQuestion));
askedQuestions.push(currentQuestion);

startBtn.addEventListener("click", function (event) {
  event.preventDefault();
  var mode = "hidden";
  if (mode === "hidden") {
    mode = "show";
    document.querySelector(".quest").setAttribute("class", "show");
    document.querySelector(".landing").setAttribute("class", "hidden");
  }
  var display = document.querySelector("#timer-count");
  startTimer(totalScore, display);

  renderQuizView(questions);
});

highScoreBtn.addEventListener("click", function(event) {
  event.preventDefault();

  var leaderboardContainer = document.createElement("div");
  var headerElm = document.createElement("h1");
  headerElm.textContent = "Highscores";
  leaderboardContainer.setAttribute("id", "leaderboard");
  var list = document.createElement("ol");
  console.log(JSON.parse(localStorage.leaderBoardData));
  var newArray = [];
  var newObj = newArray.concat(JSON.parse(localStorage.leaderBoardData));

  for (var x=0; x < newObj.length; x++) {

      var listItem = document.createElement("li");
      //https://developer.mozilla.org/en-US/docs/Web/API/Document/createTextNode
      listItem.appendChild(
        document.createTextNode(
          `${newObj[x].username} - ${newObj[x].score}`
        )
      );
      list.appendChild(listItem);
   
  }

  console.log("button clicked");
  

  var removeBtn = document.createElement("button");
  var backBtn = document.createElement("button");

  removeBtn.setAttribute("class", "btn");
  backBtn.setAttribute("class", "btn");
  removeBtn.textContent = "Clear";
  backBtn.textContent = "Back";
  removeBtn.addEventListener("click", function() {
    window.localStorage.clear();
  });
  backBtn.addEventListener("click", function() {
    location.reload();
  });

  leaderboardContainer.appendChild(headerElm);
  leaderboardContainer.appendChild(list);
  leaderboardContainer.appendChild(removeBtn);
  leaderboardContainer.appendChild(backBtn);

  document.getElementById("build").appendChild(leaderboardContainer);
  document.getElementById("main").style.display = "none";
  document.getElementById("container").style.display = "none";
  document.getElementById("leaderboard").style.display = "block";
});


//WHEN I click the start button THEN a timer starts and I am presented with a question
//WHEN I answer a question THEN I am presented with another question
//WHEN I answer a question incorrectly THEN time is subtracted from the clock
//WHEN all questions are answered or the timer reaches 0 THEN the game is over
//WHEN the game is over THEN I can save my initials and my score
