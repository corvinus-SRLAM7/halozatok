var hotList = [];
var questionsInHotList = 3;
var displayedQuestion;
var numberOfQuestions;
var nextQuestion = 853;
var timeoutHandler;

window.onload = function () {
    init();
    utolsoKerdes();
}

function kerdesbetoltes(questionNumber, destination) {
    fetch(`/questions/${questionNumber}`)
        .then(response => {
            if (!response.ok) {
                console.error(`Hibás válasz: ${response.status}`)
            }
            else {
                return response.json()
            }

        }
        )
        .then(data => {
            hotList[destination].question = data;
            hotList[destination].goodAnswers = 0;
            console.log(`A ${questionNumber}. kérdés letöltve a hot list ${destination}. helyére`)
            if (displayedQuestion == undefined && destination == 0) {
                displayedQuestion = 0;
                kerdesmegjelenites();
            }
        }
        );
}

function init() {
    for (var i = 0; i < questionsInHotList; i++) {
        let data = {
            question: {},
            goodAnswers: 0
        }
        hotList[i] = data;
    }

    for (var i = 0; i < questionsInHotList; i++) {
        kerdesbetoltes(nextQuestion, i);
        nextQuestion++;
    }
}

function kerdesmegjelenites() {
    let kerdes = hotList[displayedQuestion].question;
    console.log(kerdes);
    document.getElementById("kérdés_szöveg").innerText = kerdes.questionText;
    document.getElementById("válasz1").innerText = kerdes.answer1;
    document.getElementById("válasz2").innerText = kerdes.answer2;
    document.getElementById("válasz3").innerText = kerdes.answer3;
    document.getElementById("kép").innerHTML = `<img id="kép1" src="https://szoft1.comeback.hu/hajo/${kerdes.image}">`;
    helyesvalasz = kerdes.correctAnswer;
}

function Vissza() {
    displayedQuestion--;
    if (displayedQuestion < 0) {
        displayedQuestion = questionsInHotList - 1;
    }
    kerdesmegjelenites();
    kattintasFeloldas();
    szinezesKi();
}

function Elore() {
    clearTimeout(timeoutHandler);
    displayedQuestion++;
    if (displayedQuestion == questionsInHotList) {
        displayedQuestion = 0;
    }
    kerdesmegjelenites();
    kattintasFeloldas();
    szinezesKi();
}

function szinezesKi() {
    for (var i = 1; i <= 3; i++) {
        document.getElementById(`válasz${i}`).style.backgroundColor = "lightgrey";
    }
}

function kattintasLetiltas() {
    for (var i = 1; i <= 3; i++) {
        document.getElementById(`válasz${i}`).style.pointerEvents = "none";
    }
}

function KattintásFeloldás() {
    for (var i = 1; i <= 3; i++) {
        document.getElementById(`válasz${i}`).style.pointerEvents = "auto";
    }
}



function Valasz1() {
    document.getElementById("válasz1").style.backgroundColor = "red";
    document.getElementById(`válasz${helyesVálasz}`).style.backgroundColor = "green";

    if (document.getElementById("válasz1").style.backgroundColor == "green") {
        hotList[displayedQuestion].goodAnswers++;
        if (hotList[displayedQuestion].goodAnswers == 3) {
            kerdesbetoltes(nextQuestion, displayedQuestion);
            nextQuestion++;
        }
    }
    else {
        hotList[displayedQuestion].goodAnswers = 0;
    }
    kattintasLetiltas();
    timeoutHandler = setTimeout(Elore, 3000);
}

function Valasz2() {
    document.getElementById("válasz2").style.backgroundColor = "red";
    document.getElementById(`válasz${helyesVálasz}`).style.backgroundColor = "green";

    if (document.getElementById("válasz2").style.backgroundColor == "green") {
        hotList[displayedQuestion].goodAnswers++;
        if (hotList[displayedQuestion].goodAnswers == 3) {
            kérdésBetöltés(nextQuestion, displayedQuestion);
            nextQuestion++;
        }
    }
    else {
        hotList[displayedQuestion].goodAnswers = 0;
    }
    kattintasLetiltas();
    timeoutHandler = setTimeout(Elore, 3000);
}

function Valasz3() {
    document.getElementById("válasz3").style.backgroundColor = "red";
    document.getElementById(`válasz${helyesVálasz}`).style.backgroundColor = "green";

    if (document.getElementById("válasz3").style.backgroundColor == "green") {
        hotList[displayedQuestion].goodAnswers++;
        if (hotList[displayedQuestion].goodAnswers == 3) {
            ke(nextQuestion, displayedQuestion);
            nextQuestion++;
        }
    }
    else {
        hotList[displayedQuestion].goodAnswers = 0;
    }
    kattintasLetiltas();
    timeoutHandler = setTimeout(Elore, 3000);
}
