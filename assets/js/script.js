var startBtn = document.querySelector("#start-btn");
var time = 60;
var welcome_section = document.querySelector("#welcome");
var question_section = document.getElementById("questions");
var feedback_section = document.getElementById("feedback");
var question_h1 = document.getElementById("question-h1");
var possible_answers_div = document.getElementById("possible_answers");
var response_btn1 = document.getElementById("resp1-btn");
var response_btn2 = document.getElementById("resp2-btn");
var response_btn3 = document.getElementById("resp3-btn");
var response_btn4 = document.getElementById("resp4-btn");
var response1, response2, response3, response4;
var score = 0;
var highScoresBtn = document.querySelector("#high-score-button");
var startOverBtn = document.querySelector("#startover-button");

var questions = [
    {
        question: "Question 1 Text",
        possible_reponses: { 1: "Answer 1", 2: "Answer 2", 3: "Answer 3", 4: "Answer 4" },
        correct_response: 1
    },
    {
        question: "Question 2 Text",
        possible_reponses: { 1: "Answer 1", 2: "Answer 2", 3: "Answer 3", 4: "Answer 4" },
        correct_response: 2
    },
    {
        question: "Question 3 Text",
        possible_reponses: { 1: "Answer 1", 2: "Answer 2", 3: "Answer 3", 4: "Answer 4" },
        correct_response: 3
    },
    {
        question: "Question 4 Text",
        possible_reponses: { 1: "Answer 1", 2: "Answer 2", 3: "Answer 3", 4: "Answer 4" },
        correct_response: 4
    },
    {
        question: "Question 5 Text",
        possible_reponses: { 1: "Answer 1", 2: "Answer 2", 3: "Answer 3", 4: "Answer 4" },
        correct_response: 4
    }
];

var userResponses = [];

var userScores = [];

var startTimer = function () {

    setInterval(function () {
        var curTime = document.getElementById("timer").innerText;
        var curTimeNum = !isNaN(curTime) ? Number(curTime) : 0;
        var updatedTime = curTimeNum - 1;
        document.getElementById("timer").innerText = updatedTime.toString();
    }, 1000);
};

var manage_element_visi = function (element_list, doHide) {
    for (var i = 0; i < element_list.length; i++) {

        elem = element_list[i];

        if (doHide)
            elem.hidden = true;
        else
            elem.style.visibility = 'visible';
    }
};

var calcAndSaveScore = function() {
    var correctCount = 0;
    for(var i = 0; i < userResponses.length; i++)
    {   
        if(userResponses[i].resl === true)
            correctCount++;
    };

    /* only 10 questions */
    score = correctCount * 10;

    var score_input = document.querySelector("#score");
        score_input.value = score;
        score_input.readOnly = true;
};

var getInit_StoreScore = function() {    
    var storedScoreCount;

    var storedScores = JSON.parse(localStorage.getItem("userScores"));
    if(storedScores) {
        storedScoreCount = storedScores.length + 1;

        for (var i = 0; i < storedScores.length; i++)
            userScores.push(storedScores[i]);
    }
    else storedScoreCount = 1;

    var initials_input = document.querySelector("#init");
    var initials = initials_input.value;

    var userScoreObj = {
        scoreNum: storedScoreCount,
        init: initials,
        score: score
    };

    userScores.push(userScoreObj);
    console.log(userScores);
    
    localStorage.setItem("userScores", JSON.stringify(userScores));

};

var getInit_OpenScoresWindow = function () {

    getInit_StoreScore();
    // window.open("high-scores.html", '_blank', 'noreferrer');
    location.href = "./high-scores.html";
};

var getInit_StartOver = function () {

    getInit_StoreScore();
    // window.open("high-scores.html", '_blank', 'noreferrer');
    location.href = "./index.html";
};


// #region await
var waitForResolve;
function awaitResponse() {
    return new Promise(resolve => waitForResolve = resolve);
}

function respBtn1Resolver() {
    if (waitForResolve) waitForResolve();
    response1 = "1";


}

function respBtn2Resolver() {
    if (waitForResolve) waitForResolve();
    response2 = "2";


}

function respBtn3Resolver() {
    if (waitForResolve) waitForResolve();
    response3 = "3";

}

function respBtn4Resolver() {
    if (waitForResolve) waitForResolve();
    response4 = "4";

}
// #endregion

async function getAnswers_ReportScores() {
    response_btn1.addEventListener('click', respBtn1Resolver);
    response_btn2.addEventListener('click', respBtn2Resolver);
    response_btn3.addEventListener('click', respBtn3Resolver);
    response_btn4.addEventListener('click', respBtn4Resolver);

    for (var i = 0; i < questions.length; i++) {

        var response;
        var question = questions[i].question;
        var responses = questions[i].possible_reponses;
        var answer = questions[i].correct_response;

        question_h1.innerHTML = question;
        for (var r in responses) {
            if (r === "1")
                response_btn1.textContent = responses[r];
            if (r === "2")
                response_btn2.textContent = responses[r];
            if (r === "3")
                response_btn3.textContent = responses[r];
            if (r === "4")
                response_btn4.textContent = responses[r];
        }

        await awaitResponse();

        // console.log(response1 + response2 + response3 + response4);

        if (response1 == "1") {
            response = response1;
            response1 = "-1";
        }
        if (response2 == "2") {
            response = response2;
            response2 = "-1";
        }
        if (response3 == "3") {
            response = response3;
            response3 = "-1";
        }
        if (response4 == "4") {
            response = response4;
            response4 = "-1";
        }

        if (response != undefined) {

            var userRespObj = {
                quest: question,
                resp: response,
                ans: answer,
                resl: response == answer
            };

            userResponses.push(userRespObj);

        }
    };

    response_btn1.removeEventListener('click', respBtn1Resolver);
    response_btn2.removeEventListener('click', respBtn2Resolver);
    response_btn3.removeEventListener('click', respBtn3Resolver);
    response_btn4.removeEventListener('click', respBtn4Resolver);
    

    manage_element_visi([question_section], true);
    manage_element_visi([feedback_section], false);

    //calculate score, save to storage and print to high scores
    calcAndSaveScore();

    highScoresBtn.addEventListener("click", getInit_OpenScoresWindow);
    startOverBtn.addEventListener("click", getInit_StartOver);
};

var start_function = function () {

    startTimer();

    manage_element_visi([welcome_section], true);
    manage_element_visi([question_section], false);

    getAnswers_ReportScores();

};

startBtn.addEventListener("click", start_function);



