
var highscores = document.querySelector(".highscores");
var timeLeft = document.querySelector(".time");
var questionBody = document.querySelector(".card-body");
var questionHeader = document.querySelector(".card-header");
var startButton = document.querySelector("#start");

var myQuestions = [
	{
		question: "Inside which HTML element do we put the JavaScript?",
		choices: {
			a: "<scripting>",
			b: "<script>",
			c: "<javascript>"
		},
		correctAnswer: "b"
	},
	{
		question: "What is the correct syntax for referring to an external script called "+"xxx.js"+"?",
		choices: {
			a: "<script src="+"xxx.js"+">",
			b: "<script name="+"xxx.js"+">",
			c: "<script href="+"xxx.js"+">"
		},
		correctAnswer: "a"
	}
];

startButton.addEventListener("click",function(event) {

	startButton.style.visibility = "hidden";
    questionHeader.textContent="";
    questionBody.textContent="";

	index= Math.floor(Math.random()*myQuestions.length);
	// console.log(myQuestions[index].question);

	var choices = new Array(myQuestions[index].choices);
	// console.log(choices);

	questionHeader.textContent=(myQuestions[index].question);

	for (i=0;i<choices.length;i++) {

		var answerChoices = (JSON.stringify(choices[i]));
		var A = document.createElement("button");
		A.textContent = (JSON.parse(answerChoices).a);
		var B = document.createElement("button");
		B.textContent = (JSON.parse(answerChoices).b);
		var C = document.createElement("button");
		C.textContent = (JSON.parse(answerChoices).c);

		questionBody.appendChild(A);

		var br = document.createElement("br");
		questionBody.appendChild(br);

		questionBody.appendChild(B);

		var br = document.createElement("br");
		questionBody.appendChild(br);
		
		questionBody.appendChild(C);

		console.log((JSON.parse(answerChoices).a));
		console.log((JSON.parse(answerChoices).b));
		console.log((JSON.parse(answerChoices).c));

	}


	// How to fix the stringified form, make them into each button

})

