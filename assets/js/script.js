var startBtn = document.querySelector("#start-btn");
var time = 60;
var subtractTime = 1;
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
var score_input = document.querySelector("#score");
var initials_input = document.querySelector("#init");

var questions = [
  {
    question: "1: What type of variable is declared, but not given a value?",
    possible_reponses: {
      1: "A: Object",
      2: "B: Undeclared",
      3: "C: Undefined",
      4: "D: Empty"
    },
    correct_response: 3
  },
  {
    question: "2: Which operator is used to assign value to a variable?",
    possible_reponses: {
      1: "A: <",
      2: "B: =",
      3: "C: ===",
      4: "D: =="
    },
    correct_response: 2
  },
  {
    question: "3: What is the correct syntax for adding to local storage?",
    possible_reponses: {
      1: "A: localStorage\n.setItem(<objectName>)",
      2: "B: localStorage\n.SetItem(<objectName>)",
      3: "C: localStorage\n.getItem(<objectName>)",
      4: "D: localStorage\n.GetItem(<objectName>)"
    },
    correct_response: 1
  },
  {
    question: "4: Which of the following values is falsey?",
    possible_reponses: {
      1: "A: 0",
      2: "B: NaN",
      3: "C: undefined",
      4: "D: All of the Above"
    },
    correct_response: 4
  },
  {
    question: "5: Which of the following is NOT true about anonymous functions?",
    possible_reponses: {
      1: "A: Have no name",
      2: "B: Can't be assigned to variables",
      3: "C: Can't be called from other functions",
      4: "D: Can't be arguments"
    },
    correct_response: 4
  }
];

var userResponses = [];

var userScores = [];

var startTimer = function () {
  setInterval(function () {
    var curTime = document.getElementById("timer").innerText;
    var curTimeNum = !isNaN(curTime) ? Number(curTime) : 0;
    var updatedTime = curTimeNum - subtractTime;
    if(updatedTime <= 0)
        document.getElementById("timer").innerText = "Out of Time";
    else
        document.getElementById("timer").innerText = updatedTime.toString();
  }, 1000);
};

var manage_element_visi = function (element_list, doHide) {
  for (var i = 0; i < element_list.length; i++) {
    elem = element_list[i];

    if (doHide) elem.hidden = true;
    else {
        elem.hidden = false;
        elem.style.visibility = "visible";
    }
  }
};

var pause = () => new Promise((resolve, reject) => {
      setTimeout(function(){
        resolve('Count')
      }, 1000)
});
  
var calcAndSaveScore = function () {
  var correctCount = 0;

  for (var i = 0; i < userResponses.length; i++)
    if (userResponses[i].resl === true) correctCount++;

  /* only 5 questions */
  score = correctCount * 20;

  score_input.value = score;
  score_input.readOnly = true;
};

var getInit_StoreScore = function () {
  var storedScoreCount;

  var storedScores = JSON.parse(localStorage.getItem("userScores_sorted"));

  if (storedScores) {
    storedScoreCount = storedScores.length + 1;

    for (var i = 0; i < storedScores.length; i++)
      userScores.push(storedScores[i]);
  }
  else {
       storedScoreCount = 1;
  }

  
  var initials = initials_input.value;

  //NEED CODE TO FORCE USER TO ENTER INITIALS

  var userScoreObj = {
    init: initials,
    score: score
  };

  userScores.push(userScoreObj);

  var userScores_sorted = userScores.sort((a,b) => parseInt(b.score) - parseInt(a.score))

  localStorage.setItem("userScores_sorted", JSON.stringify(userScores_sorted));
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
  return new Promise((resolve) => (waitForResolve = resolve));
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
  response_btn1.addEventListener("click", respBtn1Resolver);
  response_btn2.addEventListener("click", respBtn2Resolver);
  response_btn3.addEventListener("click", respBtn3Resolver);
  response_btn4.addEventListener("click", respBtn4Resolver);

  for (var i = 0; i < questions.length; i++) {
    
    var time = document.getElementById("timer").innerText;
    var timeNum = !isNaN(time) ? Number(time) : 0;

    if(timeNum <= 0) 
        break;

    var response;
    var question = questions[i].question;
    var responses = questions[i].possible_reponses;
    var answer = questions[i].correct_response;

    question_h1.innerHTML = question;
    for (var r in responses) {
      if (r === "1") response_btn1.textContent = responses[r];
      if (r === "2") response_btn2.textContent = responses[r];
      if (r === "3") response_btn3.textContent = responses[r];
      if (r === "4") response_btn4.textContent = responses[r];
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

    var isCorrect = response == answer;
    var feedback = isCorrect ? "Correct!" : "Wrong!";
    
    if(!isCorrect) {
        subtractTime = 30;
        var hold = await pause(20);
    }
    
    subtractTime = 1;

    var feedback_input = document.getElementById("question-feedback");
        feedback_input.readOnly = true;
    
    feedback_input.value = feedback;

    var hold = await pause(20);
    feedback_input.value = "";

    if (response != undefined) {
      var userRespObj = {
        quest: question,
        resp: response,
        ans: answer,
        resl: isCorrect
      };

      userResponses.push(userRespObj);
    }
    
    if(i + 1 === questions.length) {
        subtractTime = 0;
    }
    
  }

  response_btn1.removeEventListener("click", respBtn1Resolver);
  response_btn2.removeEventListener("click", respBtn2Resolver);
  response_btn3.removeEventListener("click", respBtn3Resolver);
  response_btn4.removeEventListener("click", respBtn4Resolver);

  var hold = await pause(40);

  manage_element_visi([welcome_section], true);
  manage_element_visi([question_section], true);
  manage_element_visi([feedback_section], false);

  calcAndSaveScore();

  highScoresBtn.addEventListener("click", getInit_OpenScoresWindow);
  startOverBtn.addEventListener("click", getInit_StartOver);
}

var start_function = function () {
  
  var curTime_input = document.getElementById("timer");
  if( Number(curTime_input.innerText) != 60) {
    location.reload();    
  }

  startTimer();

  manage_element_visi([welcome_section], true);
  manage_element_visi([question_section], false);

  getAnswers_ReportScores();
};

startBtn.addEventListener("click", start_function);
