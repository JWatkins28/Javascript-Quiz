// ELEMENT SELECTORS
let timerText = document.getElementById('timer-text');
let startButton = document.getElementById('start-button');
let restartButton = document.getElementById('restart-button');
let gameBoard = document.getElementById('game-board');
let correctorNot = document.getElementById('isitcorrect');
let questionList = document.getElementById('question-list');
let scoreForm = document.getElementById('score-form');
let scoreSubmit = document.getElementById('score-sub');
let highscoreButton = document.getElementById('high-score-button');
let clearScores = document.getElementById('clear-scores');
let scoreName = document.querySelector('#score-submission');
let highScores = document.querySelector('#high-scores');

// GLOBAL VARIABLES FOR FUNCTIONS
let playerScore = 0;
let gameEnder = false;
let didgameStart = false;
var scores = [];
var timeLeft = 60;

// VARIABLES FOR THE QUESTIONS AND ANSWERS
var qT = document.getElementById("question-text");
var a1 = document.getElementById("a1");
var a2 = document.getElementById("a2");
var a3 = document.getElementById("a3");
var a4 = document.getElementById("a4");

// ARRAY OF QUESTIONS
var questions = [
    function question1() {
        qT.textContent = "Which of the below does NOT create a variable?";
        a1.textContent = "var";
        a2.textContent = "let";
        a3.textContent = "const";
        a4.textContent = "set";
        a1.dataset.correct = "wrong";
        a2.dataset.correct = "wrong";
        a3.dataset.correct = "wrong";
        a4.dataset.correct = "correct";
    return;
    },
    function question2() {
        qT.textContent = "How do you get a message to display in the console?";
        a1.textContent = "console.message('message')";
        a2.textContent = "console.output('message')";
        a3.textContent = "console.log('message')";
        a4.textContent = "console.show('message')"
        a1.dataset.correct = "wrong";
        a2.dataset.correct = "wrong";
        a3.dataset.correct = "correct";
        a4.dataset.correct = "wrong";
        return;
    },
    function question3() {
        qT.textContent = "What does '!==' mean?";
        a1.textContent = "Equal (type irrelevant)";
        a2.textContent = "Strictly Not Equal";
        a3.textContent = "Not Equal (type irrelevant)";
        a4.textContent = "Strictly Equal"
        a1.dataset.correct = "wrong";
        a2.dataset.correct = "correct";
        a3.dataset.correct = "wrong";
        a4.dataset.correct = "wrong";
        return;
    },
    function question4() {
        qT.textContent = "What statement can go with an 'if' statement?";
        a1.textContent = "and";
        a2.textContent = "when";
        a3.textContent = "else";
        a4.textContent = "then"
        a1.dataset.correct = "wrong";
        a2.dataset.correct = "wrong";
        a3.dataset.correct = "correct";
        a4.dataset.correct = "wrong";
        return;
    },
    function question5() {
        qT.innerHTML = 'In: var flavors = ["Chocolate", "Vanilla", "Strawberry"] <br> What is "flavors"?';
        a1.textContent = "string";
        a2.textContent = "array";
        a3.textContent = "group";
        a4.textContent = "cluster"
        a1.dataset.correct = "wrong";
        a2.dataset.correct = "correct";
        a3.dataset.correct = "wrong";
        a4.dataset.correct = "wrong";
        return;
    },
    function question6() {
        qT.innerHTML = "In: for (var i = 0; i < 10; i++) {} <br> How many times would this loop execute?";
        a1.textContent = "0";
        a2.textContent = "10";
        a3.textContent = "1";
        a4.textContent = "9"
        a1.dataset.correct = "wrong";
        a2.dataset.correct = "correct";
        a3.dataset.correct = "wrong";
        a4.dataset.correct = "wrong";
        return;
    },
    function question7() {
        qT.innerHTML = "How would you call the example function? <br> Example: function randomNames() {}";
        a1.textContent = "randomNames.start";
        a2.textContent = "run(randomNames)";
        a3.textContent = "call(randomNames)";
        a4.textContent = "randomNames()"
        a1.dataset.correct = "wrong";
        a2.dataset.correct = "wrong";
        a3.dataset.correct = "wrong";
        a4.dataset.correct = "correct";
        return;
    },
    function question8() {
        qT.textContent = "Which of these will let you add an element to an array?";
        a1.textContent = "arrayName.plus()";
        a2.textContent = "arrayName.insert()";
        a3.textContent = "arrayName.inc()";
        a4.textContent = "arrayName.push()"
        a1.dataset.correct = "wrong";
        a2.dataset.correct = "wrong";
        a3.dataset.correct = "wrong";
        a4.dataset.correct = "correct";
        return;
    },
    function question9() {
        qT.innerHTML = "When embedding Javascript into HTML, how do you reference the js file?";
        a1.textContent = "<script src=''>";
        a2.textContent = "<script rel=''>";
        a3.textContent = "<script loc=''>";
        a4.textContent = "<script link=''>"
        a1.dataset.correct = "correct";
        a2.dataset.correct = "wrong";
        a3.dataset.correct = "wrong";
        a4.dataset.correct = "wrong";
        return;
    },
    function question10() {
        qT.textContent = "How do you create a function called Name()? ";
        a1.textContent = "let function Name() {}";
        a2.textContent = "function Name() {}";
        a3.textContent = "function.create(Name) {}";
        a4.textContent = "add.function(Name) {}"
        a1.dataset.correct = "wrong";
        a2.dataset.correct = "correct";
        a3.dataset.correct = "wrong";
        a4.dataset.correct = "wrong";
        return;
    }
];


// QUIZ TIMER
function timer() {
    
    timerText.textContent = "Time Remaining: " + timeLeft;
    gameStart();
    var timeInterval = setInterval(function () {
      timerText.textContent = "Time Remaining: " + timeLeft;
      timeLeft--;  
      if(timeLeft < 0 || gameEnder == true) {

        clearInterval(timeInterval);
        gameOver();
      }}, 1000)
  };

// START BUTTON
startButton.addEventListener("click", function(event) {
    event.preventDefault();
    startButton.setAttribute("style", "display:none");
    timer();
});

// RESTART BUTTON 
restartButton.addEventListener("click", function(event) {
    event.preventDefault();
    window.location.reload();
})

// ANSWER PICKER EVENT
gameBoard.addEventListener('click', function(event) {
    event.preventDefault();
    var chosenAnswer = event.target;
    var correct = chosenAnswer.getAttribute("data-correct");
    if (chosenAnswer.matches("li") && correct == "correct") {
        correctorNot.textContent = "That's Correct!";
        playerScore++;
        questionChooser();
    }   else if (chosenAnswer.matches("li") && correct == "wrong") {
        correctorNot.textContent = "That's Incorrect!";
        timeLeft = (timeLeft - 5);
        questionChooser();
    }});

// QUESTION CHOOSER
function questionChooser() {
    let q = (questions[Math.floor(Math.random() * questions.length)]);
    var questionsRemain = (questions.length);
    if (questionsRemain !== 0) {
    q();
    questions.splice (questions.indexOf(q), 1);
    }   else {
        gameOver();
    }
};

// GO STRAIGHT TO HIGH SCORES
highscoreButton.addEventListener('click', function(event) {
    event.preventDefault();
    didgameStart = false;
    gameOver();
})

// CLEAR SCORES BUTTON
clearScores.addEventListener('click', function(event) {
    event.preventDefault();
    scores.length = 0;
    storeScores();
    renderhighScores();
})

// GAME OVER SCREEN
function gameOver() {
    gameEnder = true;
    if (!didgameStart) {
       renderhighScores();
       return; 
    }   else if (questions.length == 0) {
            correctorNot.innerHTML = `Congratulations!<br>Your score is: ${playerScore}!<br>Submit your score below.`;
    }   else {
            correctorNot.innerHTML = "Time ran out!<br>How did you do?<br>Submit your score below.";
    }
    scoreForm.setAttribute("style", "display: flex");
    questionList.setAttribute("style", "display: none");
    scoreSubmit.addEventListener('click', function(event) {
        event.preventDefault();
        var newScore = {
            name: scoreName.value.trim(),
            score: playerScore,
        }
        if (newScore.name === "") {
            return;
        }
        scores.push(newScore);
        scoreName.value = "";
        storeScores();
        renderhighScores();
    }
    )}

// RENDERS THE SCORES ON THE SCORE PAGE
function renderhighScores() {
    highScores.innerHTML = "";
    for (var i = 0; i < scores.length; i++) {
        var score = scores[i];
        var li = document.createElement("li");
        li.textContent = (`${score.name}: ${score.score}`);
        highScores.appendChild(li);
      }
      questionList.setAttribute("style", "display: none");
      correctorNot.textContent = "High Scores";
      correctorNot.setAttribute("style", "text-decoration: underline")
      scoreForm.setAttribute("style", "display: none");
      restartButton.setAttribute("style", "display: flex");
      clearScores.setAttribute("style", "display: flex");
}

// STORES THE SCORES TO LOCAL STORAGE
function storeScores() {
    localStorage.setItem('scores', JSON.stringify(scores));
}

// STARTS THE GAME
function gameStart() {
    didgameStart = true;
    questionList.setAttribute("style", "display: flex");
    questionChooser();
}

// INITIAL SCRIPT TO GRAB THE LOCAL STORAGE
function init() {
    var storedScores = JSON.parse(localStorage.getItem("scores"))
    if (storedScores !== null) {
        scores = storedScores;
    }
}

init();

