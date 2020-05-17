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
		question : "What command would you use to create a new VM in the CLI?",
		imgSrc : "img/ComputeEngine.png",
		choiceA : "gcloud compute instances create <VM Name>",
		choiceB : "gcloud instances compute create <VM Name>",
		choiceC : "gcloud machines compute create <VM Name>",
		correct : "A",
	},
	{
		question : "How would you create a load balancer frontend for a Kubernetes deployment in GKE?",
		imgSrc : "img/KubernetesEngine.png",
		choiceA : "gcloud expose deployment <deployment name> --type LoadBalancer --port 8080",
		choiceB : "kubectl expose deployment <deployment name> --type LoadBalancer --port 8080",
		choiceC : "kubectl create frontend deployment <deployment name> --type LoadBalancer --port 8080",
		correct : "B",
	},
	{
		question : "Select the correct response",
		imgSrc : "img/KubernetesEngine.png",
		choiceA : "When you create a GKE cluster, you cannot define the machine type of the node",
		choiceB : "A container can contain only a single pod",
		choiceC : "The target number of pods for your app is defined in the deplyoment object as the number of replicas in the replica set",
		correct : "C",
	},
	{
		question : "Which is not true of network load balancing?",
		imgSrc : "img/CloudLoadBalancing.png",
		choiceA : "Network load balancing allows you to balance internal requests between VMs in your VPC",
		choiceB : "A network load balancer can balance HTTP/HTTPS requests between VMs in you VPC",
		choiceC : "A network load balancer can restart un-healthy VMs",
		correct : "B",
	},
		{
		question : "You have created a HTTP load balancer for your VM pool, however the http health check is failing even though the VMs are running properly. What might be the issue?",
		imgSrc : "img/CloudLoadBalancing.png",
		choiceA : "You haven't created a firewall rule to allow TCP traffic to your VMs on port 80",
		choiceB : "GCP is broken and you need to submit a ticket to Google",
		choiceC : "You have used a network load balancer when you should have used a HTTP/HTTPS load balancer",
		correct : "A",
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
	document.getElementById("banner").style.display = "none";
	document.getElementById("welcome").style.display = "none";
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
	scoreDiv.innerHTML += "<p>Your score = " + scorePerCent + "%</p>";
	reset.innerHTML = "Try Again";
}