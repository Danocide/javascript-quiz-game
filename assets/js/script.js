var timer = document.querySelector("#countdown");
var gameWindow = document.querySelector(".gameWindow")
var questionCount = document.querySelector("#question-counter")
var question = document.querySelector(".question")
var startBtn = document.querySelector("#startBtn")
var userInput = document.querySelector("#user")
var answers = document.querySelector(".answers")
var questionsSec = document.querySelector("#questionBox")
var time = 100;
var questionIndex = 0;

// start game
function start() {
    var hideGameWindow = document.querySelector(".gameWindow");
    hideGameWindow.setAttribute("class", "hide");
    questionsSec.removeAttribute("class");
    timer.textContent = time;
    getQuestions();   
    console.log("one problem down, 100 more to go"); 
    console.log(questions.length);
}


// fetch question and answers
function getQuestions(){
    var selQuestion = questions[questionIndex];
    var askQuestion = document.querySelector(".question");
    question.textContent = selQuestion.question;
    answers.textContent = "";
    for(var i=0; i < selQuestion.question.length; i++){
        var answer = selQuestion.answers[i];
        var answerBtn = document.createElement("button");
        answerBtn.setAttribute("class", "answer");
        answerBtn.setAttribute("value", answer);
        answerBtn.textContent = i + 1 + "." + answer;
        answers.appendChild(answerBtn);
    }
}

function answerQuestion(event) {
    var buttonSel = event.target;
    if (!buttonSel.matches(".correct")){
        return;
    }
    if (buttonSel.value !== questions[questionIndex].correct) {
        countdown -=10;
        if(countdown <= 0) {
            countdown = 0;
        }
        countdown.textContent = time;
    }
}

// array for questions
const questions = [
    {
        id: "0",
        question: "test 1",
        answers: ["A" , "b" , "c" , "d"],
        correct: "A",
    },

    {
        id: "1",
        question: "test 2",
        answers: ["a" , "B" , "c" , "d"],
        correct: "B",
    },

    {
        id: "2",
        question: "test 3",
        answers: ["a" , "b" , "C" , "d"],
        correct: "C",
    },

    {
        id: "3",
        question: "test 4",
        answers: ["a" , "b" , "c" , "D"],
        correct: "D",
    },

    {
        id: "4",
        question: "",
        answers: ["A" , "b" , "c" , "d"],
        correct: "A",
    }
];

// Sends score to highscore page

function openHighScores() {
    window.location="./highscores.html";
    window.location.href = "./highscores.html";
}

// sets timer/time limit

function timer() {
    time--;
    timer.textcontent = time;
    if (time <=0){
        gameEnd();
    }
} 1000

// function for game end
function gameEnd() {
    clearInterval(timer);
    gameWindow.setAttribute("id", "hide");

    var gameOverEl = document.querySelector("#gameOver");
    gameOverEl.removeAttribute("id", "hide");

    var endScore = document.querySelector("#endScore");
    endScore.textContent = time;
}

// function to save score and add score to highscores page
function saveScore() {
    var user = userInput.value.trim();
    if (user !== ""){
        var highscore = JSON.parse(window.localStorage.getItem("highscore"))
        var newScore = {
            score: time,
            user: user,
        }
        highscore.push(newScore)
        window.localStorage.setItem("highscore", JSON.stringify(highscore));
        window.location.href = "./highscores.html";
    }
}

startBtn.addEventListener("click", start);
