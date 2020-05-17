//select all elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");
const reset = document.getElementById("Reset");

//counter render
let count = 0;
const questionTime = 20; //10s
const gaugeWidth = 150;
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

//create our questions
let questions = [
	{
		question : "What does HTML stand for?",
		imgSrc : "img/html.png",
		choiceA : "Correct",
		choiceB : "Wrong",
		choiceC : "Wrong",
		correct : "A",
	},
	{
		question : "What does CSS stand for?",
		imgSrc : "img/css.png",
		choiceA : "Wrong",
		choiceB : "Correct",
		choiceC : "Wrong",
		correct : "B",
	},
	{
		question : "What does JS stand for?",
		imgSrc : "img/js.png",
		choiceA : "Wrong",
		choiceB : "Wrong",
		choiceC : "Correct",
		correct : "C",
	},
];

//create some variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;

//render a question
function renderQuestion(){
	let q = questions[runningQuestion];

	question.innerHTML = "<p>"+ q.question + "</p>";
	qImg.innerHTML = "<img src="+q.imgSrc+">";
	choiceA.innerHTML = q.choiceA;
	choiceB.innerHTML = q.choiceB;
	choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click", startQuiz);

function startQuiz(){
	runningQuestion =0;
	start.style.display = "none";
	renderQuestion();
	quiz.style.display = "block";
	renderProgress();
	renderCounter();
	TIMER = setInterval(renderCounter, 1000);
}


//render progress
function renderProgress(){
	for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
		progress.innerHTML += "<div class='prog' id="+qIndex+"></div>";
	}
}


function renderCounter(){
	if(count <= questionTime){
		counter.innerHTML = count;
		timeGauge.style.width = count * gaugeUnit + "px";
		count++
	}else{
		answerIsWrong();
		if (runningQuestion < lastQuestion) {
			runningQuestion++;
			renderQuestion();
		}else{
			clearInterval(TIMER);
			scoreRender();
		}
		count = 0;
	}
}

//check Answer
function checkAnswer (answer){
	if(answer == questions[runningQuestion].correct){
		//answer is correct
		score++;
		//change color to green
		answerIsCorrect();
		count = 0;
	}else{
		//answer is wrong
		answerIsWrong();
		count = 0;
	}
	if (runningQuestion < lastQuestion) {
		runningQuestion++;
		renderCounter();
		renderQuestion();
	}else{
		//end quiz and show the score
		clearInterval(TIMER);
		scoreRender();
	}
}

function answerIsCorrect() {
	document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

function answerIsWrong() {
	document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

function scoreRender () {
	scoreDiv.style.display = "block";

	//calculate the percentage correct
	const scorePerCent = Math.round(100 * score/questions.length);

	//choose an image
	let img = (scorePerCent >= 80) ? "img/5.png" :
			  (scorePerCent >= 60) ? "img/4.png" :
			  (scorePerCent >= 40) ? "img/3.png" :
			  (scorePerCent >= 20) ? "img/2.png" : "img/1.png"

	scoreDiv.innerHTML = "<img src=" + img + ">";
	scoreDiv.innerHTML += "<p>" + scorePerCent + "%</p>";
	reset.innerHTML = "Try Again";
}