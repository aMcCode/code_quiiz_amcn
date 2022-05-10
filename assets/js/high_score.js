
window.onload = () => {

    // var responses = function() {
    //     var savedResponses = localStorage.getItem("userResponses");
    //     // if there are no responses, set responses to an empty array and return out of the function
    //     if (!savedResponses) {
    //         return false;
    //     }

    //     alert("Saved responses found!");
    //     // else, load up saved responses

    //     // parse into array of objects
    //     return JSON.parse(savedResponses);
    // };

    var doc = window.document;
    alert(doc);

    var highScoreMain = doc.body.querySelector("#highscores-main");
    console.log(highScoreMain);

    var highScoreSect = highScoreMain.querySelector("#highscores-sect");
    console.log(highScoreSect);


        var questTxt = doc.createElement("input");
        questTxt.setAttribute("type", "text");
        questTxt.value = "qtxt";
        questTxt.readOnly = true;
        highScoreSect.appendChild(questTxt);

        console.log(questTxt);

        // var respTxt = document.createElement("input");
        // respTxt.setAttribute("type", "text");
        // respTxt.value = resp;
        // respTxt.readOnly = true;

        // var answTxt = document.createElement("input");
        // answTxt.setAttribute("type", "text");
        // answTxt.value = answer;
        // answTxt.readOnly = true;
    }



        // for (var i = 0; i < responses.length; i++)
        // {
        //     qtxt = responses[i].quest;
        //     createScoreRecord(qtxt, "", "");
        // }

