
var highscores = document.querySelector(".highscores");
var timeLeft = document.querySelector(".time");
var questionHeader = document.querySelector(".card-header");
var questionBody = document.querySelector(".card-body");
var questionFooter = document.querySelector(".card-footer");
var startButton = document.querySelector("#start");

var secondsLeft = 40;

var pos = 0, test, test_status, question, 
userChoice, choices, chA, chB, chC, userInitials, 
correct = 0;

var myQuestions = [
	{
		question: "What will you use to write Hello World in an alert box?",
		a: "msg();",
		b: "alert();",
		c: "alertBox();",
		correctAnswer: "B"
	},
	{
		question: "How can you add a comment in a JavaScript?",
		a: "//Comment",
		b: "&lt;!--Comment--&gt;",
		c: "{Comment}",
		correctAnswer: "A"
	},
	{
		question: "Which event occurs when the user clicks on an HTML element?",
		a: "click",
		b: "onmouseclick",
		c: "onclick",
		correctAnswer: "C"
	},
	{
		question: "How do you declare a JavaScript variable?",
		a: "var varname",
		b: "variable varname",
		c: "var = varname",
		correctAnswer: "A"
	}
];

startButton.addEventListener("click",function(event) {
	startButton.style.visibility = "hidden";
    questionHeader.textContent="";
    questionBody.textContent="";
	timeRemaining();
	renderQuestion();
})

function timeRemaining() {
	// Show first value of countdown, to show 30 instead of 29
	timeLeft.textContent=secondsLeft;
	var timerInterval = setInterval(function() {
	if( (secondsLeft <= 0) || (pos >= myQuestions.length) ) {
	questionBody.innerHTML = "";
	clearInterval(timerInterval);
	userInitials = prompt("GAME OVER! \nYour final score is "+secondsLeft+
	"\nPlease type in your initials");
	if (userInitials == null || userInitials == "") {
		alert("You did not enter anything");
		location.reload();
		return false;
	} else if (!/^[a-zA-Z]*$/g.test(userInitials) ) {
		alert("Letters are only accepted!");
		location.reload();
		return false;
	} else if (/^[a-zA-Z]*$/g.test(userInitials) ) {
		console.log("Hi "+userInitials+", you scored "+secondsLeft+ "!");
		timeLeft.textContent="";
		saveLastInitials();
		renderLastInitials();
	}
	}
	// This makes the countdown consistent with the text content
	secondsLeft--;
	timeLeft.textContent=secondsLeft;
}, 1000);
}

function renderQuestion(){
	questionHeader.textContent="";
    questionBody.textContent="";
	if(pos >= myQuestions.length){
	questionBody.innerHTML = "<h2>You got "+correct+" of "+myQuestions.length+" questions correct</h2>";
	questionHeader.innerHTML = "Test completed";
	  // stops rest of renderQuestion function running when test is completed
	  return false;
	}
	questionBody.innerHTML += "Question "+(pos+1)+" of "+myQuestions.length;
	question = myQuestions[pos].question;
	chA = myQuestions[pos].a;
	chB = myQuestions[pos].b;
	chC = myQuestions[pos].c;
	// display the question
	questionHeader.innerHTML += "<h3>"+question+"</h3>";
	// display the answer options
	// the += appends to the data we started on the line above
	questionBody.innerHTML += "<br><label> <input type='radio' name='choices' value='A'> "+chA+"</label><br>";
	questionBody.innerHTML += "<label> <input type='radio' name='choices' value='B'> "+chB+"</label><br>";
	questionBody.innerHTML += "<label> <input type='radio' name='choices' value='C'> "+chC+"</label><br><br>";
	questionBody.innerHTML += "<button onclick='checkAnswer()'>Submit Answer</button>";
}

function checkAnswer(){
	choices = document.getElementsByName("choices");
	for(var i=0; i<choices.length; i++){
	  if(choices[i].checked){
		userChoice = choices[i].value;
	  }
	}
	console.log(userChoice);
	// checks if answer matches the correct choice
	if(userChoice == myQuestions[pos].correctAnswer){
		questionFooter.innerHTML="YOU ARE CORRECT!";
		correct ++;
	} else if (userChoice == null) {
		alert("Please choose one!");
		return false;
	} else {
		questionFooter.innerHTML="SORRY, YOU ARE WRONG!";
		secondsLeft -= 10;
	}
	// changes position of which character user is on
	pos++;
	// then the renderQuestion function runs again to go to next question
	renderQuestion();
	userChoice="";
  }

  function saveLastInitials() {
	var hiScorer = {
	  initials: userInitials,
	  hiScore: secondsLeft,
	};
	// Use .setItem() to store object in storage and JSON.stringify to convert it as a string
	localStorage.setItem("HighScore", JSON.stringify(hiScorer));
  }

  function renderLastInitials() {
	// Use JSON.parse() to convert text to JavaScript object
	var lastPlayer = JSON.parse(localStorage.getItem("HighScore"));
	// Check if data is returned, if not exit out of the function
	if (lastPlayer !== null) {
		highscores.innerHTML += "<br>Last Player Initials: "+lastPlayer.initials;
		highscores.innerHTML += "<br>Score: "+lastPlayer.hiScore;
	} else {
		return;
	}
	
  }

  function init() {
	renderLastInitials();
  }
  init();