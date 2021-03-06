//                      Timed JavaScript Coding Quiz
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
// This timed JS Coding Quiz contains 5 questions displayed to the user in sequential order.
// Players have 4 answer choices per question, and lose 5 seconds of time when they guess a wrong
// answer. When they finish the quiz, they see their score and can enter their initials 
// to save their score and see how they compare to others who have played.

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

//*** Global Variables ***/
var questionArray = [question0, question1, question2, question3, question4];    // Array of question objects
var numSeconds = 30;                                                            // Set our timer
var ulArray = [];                                                               // Array of <ul> elements
var score = 0;                                                                  // Player's score
var startGameEl = document.querySelector("#startgame");                         // Get a reference to the Start Game button
var rightWrongDisplay = document.querySelector("div.center");                   // Get a reference to where we will display Correct/Incorrect
var content = document.querySelector("section");                                // Get a reference to our content section (where our questions will go)
var qToDisplay = 0;                                                             // Question we are displaying
var viewHighScoresEl = document.querySelector("#viewhighscores");               // Get a reference to our View High Scores link
var myForm;                                                                     // Form to enter initials & score & submit
var timer;                                                                      // Timer
var submitButton;                                                               // Form submit button
var highScoreObject = {                                                         // High score object to store in local Storage
    userInitials: "",
    userScore: 0
  };

/*** Function askQuestions; Loops through question objects and presents them to player one at a time ***/
function askQuestions() {

    // Get a reference to our ul's
    ulArray = document.querySelectorAll("ul");

    // Loop through our ul's that are hidden on the page
    for (i = 0; i < questionArray.length; i++) {
        
        // First time through, hide instructions and "Start Game" button
        if (i === 0) {          
            var p = document.querySelector(".gameDescription");
            p.setAttribute("style", "display:none;");
            var button = document.querySelector("button");
            button.setAttribute("style", "display:none");
            var viewscores = document.querySelector("#viewhighscores");
            viewscores.setAttribute("style", "display:none");
        }

        // For each question <ul>, add an event listener so can see if user clicked the correct answer
        ulArray[i].addEventListener("click", function checkAnswer(e) {
            // Make sure they clicked an actual list item, not the space between
            if ((e.target.tagName) === "LI") {
        
                // If they guess the correct answer, turn that answer's background green and display "Correct" message at bottom of page
                if ((e.target.textContent === correctAnswer)) {
                    e.target.classList.add("success");
                    rightWrongDisplay.innerHTML = "<h3>Correct!!! You're a rockstar!!!</h3>";
                    score += 10;    // Add 10 to their score
                } 
                // If they guessed incorrectly, turn that answer's background red and display "Sorry" message at bottom of page
                else {
                    e.target.classList.add("error");
                    rightWrongDisplay.innerHTML = "<h3>Sorry, That is incorrect.</h3>";
                    numSeconds = numSeconds - 5;    // Subtract 5 seconds from the clock
                }
                // Pause for one second before moving to next question...allows player to see result of guess
                // Hide current question and reset Correct/Incorrect message
                setTimeout(() => { ulArray[qToDisplay].setAttribute("style", "display: none");
                rightWrongDisplay.innerHTML = "";
                // Advance to next question and make sure we're not at the end of all questions
                qToDisplay++;
                    if (qToDisplay < questionArray.length){
                        ulArray[qToDisplay].setAttribute("style", "display: block"); 
                        correctAnswer = questionArray[qToDisplay].correctAnswer();
                    }
                    // If we're at the last question, then time to show results
                    else {
                        showResults();
                    }
                }, 1000);
            }
        }); // End Click Event Listener
    }

    // Set our first correct answer
    var correctAnswer = questionArray[qToDisplay].correctAnswer();

    // Show the first question and possible answers
    ulArray[qToDisplay].setAttribute("style", "display: block");
}


/*** Function showResults() : Ends timer, says thank you for playing, shows user form to enter in their initials/score ***/
function showResults() {

    clearInterval(timer);
    document.getElementById("timer").textContent = "Game Over";
    // Show game results
    var p = document.querySelector(".gameDescription");
    p.innerHTML = `Thank you for playing! ???????????? Final score: ${score}.`;
    p.setAttribute("style", "display:block;");

    myForm = document.querySelector(".myscoresform");
    myForm.setAttribute("style", "display:flex; justify-content:center;");
    
    submitButton = document.querySelector("#submitButton");
    submitButton.addEventListener("click", storeNewScore);
}


/** Function: storeNewScore(): Stores the user's score into localStorage when they enter in their initials & submit ***/
function storeNewScore (e) {

    e.preventDefault();

    // Sanitize user input
    highScoreObject.userInitials = document.querySelector("#initials").value.trim();
    highScoreObject.userScore = score;

    // Make sure they entered *something*
    if (highScoreObject.userInitials !== "") {

        // Pull old local storage items and store in array
        // Get stored value from client storage, if it exists
        var storedScores = JSON.parse(localStorage.getItem("highScores"));
        
        if (storedScores == null) {
            var storedScores = [];
        } 
        
        // Add new score to our array of high scores
        storedScores.push(highScoreObject);
        // Stringify and set key in localStorage to storedScores array
        localStorage.setItem("highScores", JSON.stringify(storedScores));
        // Disable Submit...only allowed to enter one high score per game
        submitButton = document.querySelector("#submitButton");
        submitButton.disabled = true;
        displayHighScores();
    } else {
        alert("Please type your initials.");    // User must enter *something*
    }
}


/*** Function displayHighScores(): Display existing high scores to the user ***/
function displayHighScores () {
    // Get existing high scores and a reference to our high scores class
    var storedScores = JSON.parse(localStorage.getItem("highScores"));
    var display = document.querySelector(".highscores");

    // Show the new buttons ("Clear" and "Go Back")
    display.setAttribute("style", "display: block; text-align: center");
    display.innerHTML += `<button type="button" class="btn" id="clear">Clear All High Scores</button><button type="button" class="btn" id="goback">Go Back</button>`;
    display.innerHTML += `<ul>`;

    // For each high score, print out user's initials and score
    for(var i = 0; i<storedScores.length; i++) {

        display.innerHTML += `<li>${storedScores[i].userInitials}:      ${storedScores[i].userScore}</li>`;
    }

    display.innerHTML += `</ul>`;

    var goBackButton = document.querySelector("#goback");
    var clearAllButton = document.querySelector("#clear");

    // Give our new buttons some things to do when clicked
    // Go back to beginning when "Go Back" is clicked
    goBackButton.addEventListener("click", function (e) {
        e.preventDefault();
        document.location.reload();
    });

    // Clear all high scores from local storage if "Clear All High Scores" is clicked
    clearAllButton.addEventListener("click", function (e) {
        e.preventDefault();
        localStorage.removeItem("highScores");
        display.innerHTML = `<button type="button" class="btn" id="playagain">Play Again?</button>`;

        // Show a new "Play Again" button
        var playAgainButton = document.querySelector("#playagain");
        playAgainButton.addEventListener("click", function (e) {
            e.preventDefault();
            document.location.reload();
        });

    })


}

/*** Function populateGame: Populate game with our hidden questions and answer choices ***/
function populateGame() {

    // Create 5 <ul>'s on our page and hide them
    for (var i = 0; i < questionArray.length; i++) {

        content.innerHTML += `<ul id="${i}" style="display:none;">${questionArray[i].questionText}<li>${questionArray[i].answer1}</li><li>${questionArray[i].answer2}</li><li>${questionArray[i].answer3}</li><li>${questionArray[i].answer4}</li></ul>`;
    }
}

/*** Function playGame(): Called once when user clicks "Start Game" button ***/
function playGame () {

    populateGame();
    askQuestions();
}

/*** Function startTimer(): Called by Start function when user clicks "Start Game" button ***/
function startTimer(){
    timer = setInterval(function() {
        numSeconds--;
    
        if (numSeconds >= 0) {
            document.getElementById("timer").textContent = numSeconds;
        } else {
            clearInterval(timer);
            document.getElementById("timer").textContent = "Sorry, you're out of time!";
            
            var x = document.getElementsByTagName("UL");

            for (var i = 0; i < x.length; i++) {
            x[i].style.display = "none";
            }
            showResults();
        }
    }, 1000);
}

/*** Function start(): Called when user clicks "Start Game" button ***/
function start()
{
    startTimer();
    playGame();
};

/*** Main Code ***/
document.getElementById("timer").textContent = numSeconds;


/*** START THE GAME WHEN USER CLICKS START BUTTON ***/
startGameEl.addEventListener("click", function() {
    //Start the game when user clicks the "Start Game" button
    start();
});

/*** Event Listener for "View High Scores" link  ***/
viewHighScoresEl.addEventListener("click", function() {

    // Hide game instructions & "Start Game" button
    var p = document.querySelector(".gameDescription");
    p.setAttribute("style", "display:none;");
    var button = document.querySelector("button");
    button.setAttribute("style", "display:none");

    displayHighScores();
});
