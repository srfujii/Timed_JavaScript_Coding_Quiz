//  Timed JavaScript Coding Quiz
//
//  View High Scores                                        Time: 0
//                         Coding Quiz Challenge
//
//          Try to answer the following code-related questions within the time limit.
//          Keep in mind that incorrect answers will penalize your time remaining by 
//          10 seconds.
//
//                             Start Quiz
//
//
//  Need to display initial "start" page ^^^^^^^^^^^
//  Need initial "Start Quiz" button and eventListener and eventHandler for "click" event.
//      onClick start the countdown timer and show the first question
//
//  Need to store array of objects (question objects...have a question, list of answers, correct answer)
//  Need to display them one at a time on screen.
//  User clicks answer (a, b, c, d)
//      Check if answer they clicked is right or wrong
//          while still have more questions to ask....
//              display question and possible answers (Question object)
//              retrieve user answer choice (a, b, c, d)
//                  compare user answer to correct answer,
//                      if wrong, display "Wrong!", deduct 10 seconds from timer, and advance to next question
//                      else if right, display "Correct!", add to total points, and advance to next question
//          if no more questions to ask/answer, then 
//              Display message "All Done!"
//              Final Score: final winning point total
//                  INPUT BOX FOR USER INITIALS, SUBMIT BUTTON

// Question Objects
var question0 = {
    questionText: "Commonly used data types do NOT include:",
    answer1: "1.  Strings",
    answer2: "2.  Booleans",
    answer3: "3.  Alerts",
    answer4: "4.  Numbers",
    correctAnswer: function() {
        return this.answer3;
    }
};
var question1 = {
    questionText: "The condition in an if/else statement is enclosed within________________.",
    answer1: "1.  Quotation Marks",
    answer2: "2.  Curly Brackets",
    answer3: "3.  Parentheses",
    answer4: "4.  Square Brackets",
    correctAnswer: function() {
        return this.answer3;
    }
};
var question2 = {
    questionText: "Arrays in JavaScript can be used to store________________.",
    answer1: "1.  Numbers and Strings",
    answer2: "2.  Other Arrays",
    answer3: "3.  Booleans",
    answer4: "4.  All of the above",
    correctAnswer: function() {
        return this.answer4;
    }
};
var question3 = {
    questionText: "Strings must be enclosed within ________________ when being assigned to variables.",
    answer1: "1.  Commas",
    answer2: "2.  Curly Brackets",
    answer3: "3.  Quotation Marks",
    answer4: "4.  Parentheses",
    correctAnswer: function() {
        return this.answer3;
    }
};
var question4 = {
    questionText: "A very useful tool used during development and debugging for printing content to the debugger is:",
    answer1: "1.  JavaScript",
    answer2: "2.  Terminal / Bash",
    answer3: "3.  For Loops",
    answer4: "4.  console.log",
    correctAnswer: function() {
        return this.answer4;
    }
};

var questionArray = [question0, question1, question2, question3, question4];    // Array of question objects
var numSeconds = 30;                                                            // Set our timer
var ulArray = [];                                                               // Array of <ul> elements
var score = 0;                                                                  // Player's score
var numCorrect = 0;                                                             // Player number of correct answers
var startGameEl = document.querySelector("#startgame");                         // Get a reference to the Start Game button
var rightWrongDisplay = document.querySelector("div.center");                   // Get a reference to where we will display Correct/Incorrect
var content = document.querySelector("section");                                // Get a reference to our content section (where our questions will go)
var qToDisplay = 0;                                                             // Question we are displaying
var myForm;
var timer;
var submitButton;
var highScoreObject = {
    userInitials: "",
    userScore: 0
  };


function askQuestions() {

    // Get a reference to our ul's
    ulArray = document.querySelectorAll("ul");
    console.log(ulArray);

    // Loop through our ul's that are hidden on the page
    for (i = 0; i < questionArray.length; i++) {
        
        console.log("UL Array: " + ulArray[i]);

        // First time through so hide instructions and "Start Game" button
        if (i === 0) {          
            // Hide game instructions & "Start Game" button
            var p = document.querySelector(".gameDescription");
            p.setAttribute("style", "display:none;");
            var button = document.querySelector("button");
            button.setAttribute("style", "display:none");
        }

        // For each question <ul>, add an event listener so can see if user clicked the correct answer
        // checkAnswer(e) .... a way to store things to do at a later time. e.g. we don't need to check
        // each answer NOW.... only when a particular question is displayed and a particular answer is 
        // clicked
        ulArray[i].addEventListener("click", function checkAnswer(e) {
            // Make sure they clicked an actual list item, not the space between
            if ((e.target.tagName) === "LI") {
        
                // If they guess the correct answer
                if ((e.target.textContent === correctAnswer)) {
                    e.target.classList.add("success");
                    rightWrongDisplay.innerHTML = "<h3>Correct!!! You're a rockstar!!!</h3>";
                    score += 10;    // Add 10 to their score
                    numCorrect++;   // Add 1 to the number they've gotten correct
                } else {
                    e.target.classList.add("error");
                    rightWrongDisplay.innerHTML = "<h3>Sorry, That is incorrect.</h3>";
                    numSeconds = numSeconds - 5;
                }
                setTimeout(() => { ulArray[qToDisplay].setAttribute("style", "display: none");
                rightWrongDisplay.innerHTML = "";
                qToDisplay++;
                    if (qToDisplay < questionArray.length){
                        ulArray[qToDisplay].setAttribute("style", "display: block"); 
                        correctAnswer = questionArray[qToDisplay].correctAnswer();
                    } 
                    else {
                        showResults();
                    }
                }, 1000);
            }
        }); // End Click Event Listener
    }

    // Set our first correct answer
    var correctAnswer = questionArray[qToDisplay].correctAnswer();

    // Show the question and possible answers
    ulArray[qToDisplay].setAttribute("style", "display: block");
}


function showResults() {

    clearInterval(timer);
    document.getElementById("timer").textContent = "Game Over";
    // Show game results
    var p = document.querySelector(".gameDescription");
    p.innerHTML = `Thank you for playing! 🏆🏆🏆 Final score: ${score}.`;
    p.setAttribute("style", "display:block;");

    myForm = document.querySelector(".myscoresform");
    myForm.setAttribute("style", "display:flex; justify-content:center;");
    
    submitButton = document.querySelector("#submitButton");
    console.log(submitButton);
    
    submitButton.addEventListener("click", storeNewScore);
}

function storeNewScore (e) {

    e.preventDefault();

    highScoreObject.userInitials = document.querySelector("#initials").value.trim();
    highScoreObject.userScore = score;

    if (highScoreObject.userInitials !== "") {

        // Pull old local storage items and store in array
        // Get stored value from client storage, if it exists
        var storedScores = JSON.parse(localStorage.getItem("highScores"));
        
        if (storedScores == null) {
            var storedScores = [];
        } 
        
        storedScores.push(highScoreObject);
        // Stringify and set key in localStorage to todos array
        localStorage.setItem("highScores", JSON.stringify(storedScores));
        displayHighScores();
    } else {
        alert("Please type your initials.");
    }
}

function displayHighScores () {
    var storedScores = JSON.parse(localStorage.getItem("highScores"));
    var display = document.querySelector(".highscores");

    console.log(storedScores);
    console.log(display);

    display.setAttribute("style", "display: block; text-align: center");
    display.innerHTML += `<button type="button" class="btn" id="clear">Clear All High Scores</button><button type="button" class="btn" id="goback">Go Back</button>`;
    display.innerHTML += `<ul>`;

    for(var i = 0; i<storedScores.length; i++) {

        display.innerHTML += `<li>${storedScores[i].userInitials}:      ${storedScores[i].userScore}</li>`;
    }

    display.innerHTML += `</ul>`;

    var goBackButton = document.querySelector("#goback");
    var clearAllButton = document.querySelector("#clear");

    goBackButton.addEventListener("click", function (e) {
        e.preventDefault();
        document.location.reload();
    });

    clearAllButton.addEventListener("click", function (e) {
        e.preventDefault();
        //localStorage.clear();
        display.innerHTML = `<button type="button" class="btn" id="goback">Go Back</button>`;
    })


}


function populateGame() {

    // Create 5 <ul>'s on our page and hide them
    for (var i = 0; i < questionArray.length; i++) {

        content.innerHTML += `<ul id="${i}" style="display:none;">${questionArray[i].questionText}<li>${questionArray[i].answer1}</li><li>${questionArray[i].answer2}</li><li>${questionArray[i].answer3}</li><li>${questionArray[i].answer4}</li></ul>`;
    }
}

// Called once when user clicks "Start Game" button
function playGame () {

    populateGame();
    askQuestions();
}

/*** Start Timer function called by Start function when user clicks "Start Game" button */
function startTimer(){
    timer = setInterval(function() {
        numSeconds--;
    
        if (numSeconds >= 0) {
            document.getElementById("timer").textContent = numSeconds;
        } else {
            clearInterval(timer);
            document.getElementById("timer").textContent = "Sorry, you're out of time!";
        }
    }, 1000);
}

/*** Start function called when user clicks "Start Game" button ***/
function start()
{
    startTimer();
    playGame();
};

/*** Main Code ***/
document.getElementById("timer").textContent = numSeconds;


/*** Event Listeners ***/
startGameEl.addEventListener("click", function() {
    //Start the game when user clicks the "Start Game" button
    start();
});
