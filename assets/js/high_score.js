
window.onload = () => {


    var saveResponses = function () {
        localStorage.setItem("userResponses", JSON.stringify(userResponses));
    };
    
    var savedResponses = localStorage.getItem("userResponses");
    if (!savedResponses)
        return false;
    else savedResponses = JSON.parse(savedResponses);

    var doc = window.document;

    var highScoreMain = doc.body.querySelector("#highscores-main");

    var createScoreRec = function(question, response, answer, isCorrect) {

        var rowDiv = doc.createElement("div");
            rowDiv.className = "row-wrapper";

        highScoreMain.appendChild(rowDiv);

        var statusIndicator = doc.createElement("div");
            statusIndicator.className = "highScoreInput";
            statusIndicator.id = "questInput";
            if(isCorrect)
                statusIndicator.innerHTML = "<h3 class=check> &#x2713; </h3>";
            else statusIndicator.innerHTML = "<h3 class=check> X </h3>";
            rowDiv.appendChild(statusIndicator);

        var questTxt = doc.createElement("input");
            questTxt.setAttribute("type", "text");
            questTxt.className = "highScoreInput";
            questTxt.id = "questInput";
            questTxt.value = question;
            questTxt.readOnly = true;
            rowDiv.appendChild(questTxt);

        var userRspTxt = doc.createElement("input");
            userRspTxt.setAttribute("type", "text");
            userRspTxt.className = "highScoreInput";
            userRspTxt.id = "userRspInput";
            userRspTxt.value = response;
            userRspTxt.readOnly = true;
            rowDiv.appendChild(userRspTxt);

        var correctRspTxt = doc.createElement("input");
            correctRspTxt.setAttribute("type", "text");
            correctRspTxt.className = "highScoreInput";
            correctRspTxt.id = "correctRspInput";
            correctRspTxt.value = answer;
            correctRspTxt.readOnly = true;
            rowDiv.appendChild(correctRspTxt);

    }

    for (var i = 0; i < savedResponses.length; i++)
    {
        qtxt = savedResponses[i].quest;
        resp = savedResponses[i].resp;
        answer = savedResponses[i].ans;
        isCorrect = savedResponses[i].resl;

        createScoreRec(qtxt, resp, answer, isCorrect);
        // console.log(`${qtxt}: ${resp}: ${answer}: ${isCorrect}`)
    }

}



var rowDiv = doc.createElement("div");
rowDiv.className = "row-wrapper";

highScoreMain.appendChild(rowDiv);

var statusIndicator = doc.createElement("div");
statusIndicator.className = "highScoreInput";
statusIndicator.id = "questInput";
if(isCorrect)
    statusIndicator.innerHTML = "<h3 class=check> &#x2713; </h3>";
else statusIndicator.innerHTML = "<h3 class=check> X </h3>";
rowDiv.appendChild(statusIndicator);

var questTxt = doc.createElement("input");
questTxt.setAttribute("type", "text");
questTxt.className = "highScoreInput";
questTxt.id = "questInput";
questTxt.value = question;
questTxt.readOnly = true;
rowDiv.appendChild(questTxt);

var userRspTxt = doc.createElement("input");
userRspTxt.setAttribute("type", "text");
userRspTxt.className = "highScoreInput";
userRspTxt.id = "userRspInput";
userRspTxt.value = response;
userRspTxt.readOnly = true;
rowDiv.appendChild(userRspTxt);

var correctRspTxt = doc.createElement("input");
correctRspTxt.setAttribute("type", "text");
correctRspTxt.className = "highScoreInput";
correctRspTxt.id = "correctRspInput";
correctRspTxt.value = answer;
correctRspTxt.readOnly = true;
rowDiv.appendChild(correctRspTxt);




