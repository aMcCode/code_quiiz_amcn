
var savedScores = localStorage.getItem("userScores_sorted");

if (savedScores)
    savedScores = JSON.parse(savedScores);

var highScoreMain = document.querySelector("#highscores-main");

var createScoreRec = function(rank, initials, score) {

    var rowDiv = document.createElement("div");
        rowDiv.className = "row-wrapper";

    highScoreMain.appendChild(rowDiv);

    var rankTxt = document.createElement("input");
        rankTxt.setAttribute("type", "text");
        rankTxt.className = "highScoreInput";
        rankTxt.id = "rankInput";
        rankTxt.value = rank;
        rankTxt.readOnly = true;
        rowDiv.appendChild(rankTxt);

    var initialsTxt = document.createElement("input");
        initialsTxt.setAttribute("type", "text");
        initialsTxt.className = "highScoreInput";
        initialsTxt.id = "initInput";
        initialsTxt.value = initials;
        initialsTxt.readOnly = true;
        rowDiv.appendChild(initialsTxt);

    var scoreTxt = document.createElement("input");
        scoreTxt.setAttribute("type", "text");
        scoreTxt.className = "highScoreInput";
        scoreTxt.id = "scoreInput";
        scoreTxt.value = score;
        scoreTxt.readOnly = true;
        rowDiv.appendChild(scoreTxt);
}

for (var i = 0; i < savedScores.length; i++) {
    rank = savedScores[i].scoreNum;
    init = savedScores[i].init;
    score = savedScores[i].score;

    createScoreRec(rank, init, score);
}

var reStart = document.createElement("button");
reStart.id = "restartBtn";
reStart.innerText = "Back to Start";
highScoreMain.appendChild(reStart);


var reStart_function = function() {
      location.href = "./index.html";
}

reStart.addEventListener("click", reStart_function);





