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
                console.error(`Hib�s v�lasz: ${response.status}`)
            }
            else {
                return response.json()
            }

        }
        )
        .then(data => {
            hotList[destination].question = data;
            hotList[destination].goodAnswers = 0;
            console.log(`A ${questionNumber}. k�rd�s let�ltve a hot list ${destination}. hely�re`)
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
    document.getElementById("k�rd�s_sz�veg").innerText = kerdes.questionText;
    document.getElementById("v�lasz1").innerText = kerdes.answer1;
    document.getElementById("v�lasz2").innerText = kerdes.answer2;
    document.getElementById("v�lasz3").innerText = kerdes.answer3;
    document.getElementById("k�p").innerHTML = `<img id="k�p1" src="https://szoft1.comeback.hu/hajo/${kerdes.image}">`;
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
        document.getElementById(`v�lasz${i}`).style.backgroundColor = "lightgrey";
    }
}

function kattintasLetiltas() {
    for (var i = 1; i <= 3; i++) {
        document.getElementById(`v�lasz${i}`).style.pointerEvents = "none";
    }
}

function Kattint�sFelold�s() {
    for (var i = 1; i <= 3; i++) {
        document.getElementById(`v�lasz${i}`).style.pointerEvents = "auto";
    }
}



function Valasz1() {
    document.getElementById("v�lasz1").style.backgroundColor = "red";
    document.getElementById(`v�lasz${helyesV�lasz}`).style.backgroundColor = "green";

    if (document.getElementById("v�lasz1").style.backgroundColor == "green") {
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
    document.getElementById("v�lasz2").style.backgroundColor = "red";
    document.getElementById(`v�lasz${helyesV�lasz}`).style.backgroundColor = "green";

    if (document.getElementById("v�lasz2").style.backgroundColor == "green") {
        hotList[displayedQuestion].goodAnswers++;
        if (hotList[displayedQuestion].goodAnswers == 3) {
            k�rd�sBet�lt�s(nextQuestion, displayedQuestion);
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
    document.getElementById("v�lasz3").style.backgroundColor = "red";
    document.getElementById(`v�lasz${helyesV�lasz}`).style.backgroundColor = "green";

    if (document.getElementById("v�lasz3").style.backgroundColor == "green") {
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
