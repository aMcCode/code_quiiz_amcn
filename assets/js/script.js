var startBtn = document.querySelector("#start-btn");
var time = 60;
var welcome_section = document.querySelector("#welcome");
var question_section = document.getElementById("questions");
var question_h1 = document.getElementById("question-h1");
var possible_answers_div = document.getElementById("possible_answers");
var response_btn1 = document.getElementById("resp1-btn");
var response_btn2 = document.getElementById("resp2-btn");
var response_btn3 = document.getElementById("resp3-btn");
var response_btn4 = document.getElementById("resp4-btn");
var response1, response2, response3, response4;

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
        correct_response: 5
    }
];

var startTimer = function () {

    setInterval(function () {
        var curTime = document.getElementById("timer").innerText;
        var curTimeNum = !isNaN(curTime) ? Number(curTime) : 0;
        var updatedTime = curTimeNum - 1;
        document.getElementById("timer").innerText = updatedTime.toString();
    }, 1000);
}

var manage_element_visi = function (element_list, doHide) {
    for (var i = 0; i < element_list.length; i++) {

        elem = element_list[i];

        if (doHide)
            elem.hidden = true;
        else
            elem.style.visibility = 'visible';
    }
}


var main_function = function () {

    startTimer();

    manage_element_visi([welcome_section], true);
    manage_element_visi([question_section], false);

    var waitForResolve;
    function awaitResponse() {
        return new Promise(resolve => waitForResolve = resolve);
    }
    
    function respBtn1Resolver() {
        response1 = "1";
        if (waitForResolve) waitForResolve();
    }

    function respBtn2Resolver() {
        if (waitForResolve) waitForResolve();
        response2 = "2";
    }

    function respBtn3Resolver() {
        response3 = "3";
        if (waitForResolve) waitForResolve();
    }

    function respBtn4Resolver(resp) {
        response4 = "4";
        if (waitForResolve) waitForResolve();
    }
    
    async function doWork() {
        response_btn1.addEventListener('click', respBtn1Resolver);
        response_btn2.addEventListener('click', respBtn2Resolver);
        response_btn3.addEventListener('click', respBtn3Resolver);
        response_btn4.addEventListener('click', respBtn4Resolver);    
    
        for (var i = 0; i < questions.length; i++) {
            var response = undefined;
            var question = questions[i].question;
            var responses = questions[i].possible_reponses;
            var answer = questions[i].correct_response;

            question_h1.innerHTML = question;
            for(var r in responses) {
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

            if (response1 == "1")
                response = response1;

            if (response2 == "2")
                response = response2;

            if (response3 == "3")
                response = response3;

            if (response4 == "4")
                response = response4;

            if(response != undefined)
            {
                console.log(`${question}: ${response}`)
                continue;
            }
            
            console.log("This should not print.");
        }

        response_btn1.removeEventListener('click', respBtn1Resolver);
        response_btn2.removeEventListener('click', respBtn2Resolver);
        response_btn3.removeEventListener('click', respBtn3Resolver);
        response_btn4.removeEventListener('click', respBtn4Resolver);
    }

    doWork();      

}

startBtn.addEventListener("click", main_function);
// response_btn1.addEventListener("click", respHandler("1"));

