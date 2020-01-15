function Quiz(questions) {
	this.score = 0;
	this.questions = questions;
	this.questionIndex = 0;
}

Quiz.prototype.getQuestionIndex = function () {
	return this.questions[this.questionIndex];
}

Quiz.prototype.guess = function (answer) {
	if (this.getQuestionIndex().isCorrectAnswer(answer)) {
		this.score++;
	}

	this.questionIndex++;
}

Quiz.prototype.isEnded = function () {
	return this.questionIndex === this.questions.length;
}


function Question(text, choices, answer) {
	this.text = text;
	this.choices = choices;
	this.answer = answer;
}

Question.prototype.isCorrectAnswer = function (choice) {
	return this.answer === choice;
}


function populate() {
	if (quiz.isEnded()) {
		showScores();
	}
	else {
		// show question
		var element = document.getElementById("question");
		element.innerHTML = quiz.getQuestionIndex().text;

		// show options
		var choices = quiz.getQuestionIndex().choices;
		for (var i = 0; i < choices.length; i++) {
			var element = document.getElementById("choice" + i);
			element.innerHTML = choices[i];
			guess("btn" + i, choices[i]);
		}

		showProgress();
	}
};

function guess(id, guess) {
	var button = document.getElementById(id);
	button.onclick = function () {
		quiz.guess(guess);
		populate();
	}
};


function showProgress() {
	var currentQuestionNumber = quiz.questionIndex + 1;
	var element = document.getElementById("progress");
	element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};

function showScores() {
	var gameOverHTML = "<h1>Result</h1>";
	gameOverHTML += "<h2 id='score'> Your Score: " + quiz.score + "</h2>";
	var element = document.getElementById("quiz");
	element.innerHTML = gameOverHTML;
};

// create questions here
var questions = [
	new Question("What was president Harry S Truman's middle name?", ["Shane", "Steven", "S", "Scott"], "S"),
	new Question("Who composed some of the music for Sonic the Hedgehog 3?", ["Michael Jackson", "Trent Reznor", "Gwen Stefani", "Jay Z"], "Michael Jackson"),
	new Question("What is the seventh planet from the sun?", ["Neptune", "Uranus", "Pluto", "Venus"], "Uranus"),
	new Question("Which European country eats the most chocolate per capita?", ["Germany", "Belgium", "France", "Switzerland"], "Switzerland"),
	new Question("What color is the ‘black box’ in an aeroplane?", ["Black", "White", "Orange", "Red"], "Orange"),
	new Question("What sport has been played on the moon?", ["Soccer", "Golf", "Archery", "Powerlifting"], "Golf"),
	new Question("How many bones are in the human body?", ["265", "233", "219", "206"], "206"),
	new Question("How many teeth are in an adult human's mouth?", ["30", "32", "34", "36"], "32"),
	new Question("Who voiced Winnie The Pooh and Tigger?", ["Jim Cummings", "A.A. Milne", "Sterling Holloway", "Roger Carel"], "Jim Cummings"),
	new Question("When did the cold war end?", ["1986", "1987", "1988", "1989"], "1989")

];

// create quiz
var quiz = new Quiz(questions);

// display quiz
populate();