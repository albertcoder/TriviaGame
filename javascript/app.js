// ------------------------VARIABLES-----------------------//

// //questionOne object
// var questionOne = {
//     question: "Who holds the record for most points scored in a single game?",
//     option1: "Michael Jordan",
//     option2: "Wilt Chamberlain",
//     option3: "LeBron James",
//     option4: "Kobe Bryant",
//     correctAnswer: "Wilt Chamberlain"
// }

// //questionTwo object
// var questionTwo = {
//     question: "What player has the most career assists?",
//     option1: "Steve Nash",
//     option2: "Gary Payton",
//     option3: "Chris Paul",
//     option4: "John Stockton",
//     correctAnswer: "John Stockton"
// }

// //questionThree object

// var questionThree = {
//     question: "What player has the highest career 3-pt FG percentage?",
//     option1: "Ray Allen",
//     option2: "Stephen Curry",
//     option3: "Steve Kerr",
//     option4: "Reggie Miller",
//     correctAnswer: "Steve Kerr"
// }

// //questionFour object
// var questionFour = {
//     question: "Who was the last player drafted by the Seattle Supersonics?",
//     option1: "Sasha Kahn",
//     option2: "Kevin Durant",
//     option3: "Russell Westbrook",
//     option4: "Carl Landry",
//     correctAnswer: "Sasha Kahn"
// }

// //questionFive object
// var questionFive = {
//     question: "What player won the most NBA championships in his career?",
//     option1: "Bill Russell",
//     option2: "LeBron James",
//     option3: "Larry Bird",
//     option4: "Magic Johnson",
//     correctAnswer: "Bill Russell"
// }

// // array to hold all question objects
// var questionsArray = [questionOne, questionTwo, questionThree, questionFour, questionFive];


// starting time for all questions
var number = 50;

//  Variable that will hold our interval ID when we execute
//  the "run" function
var intervalId;

// count variable to keep track of question number
var count = 0;

// variable to indicate user progress in game by question
var questionNum = 0;

// variable to store the answer selected by user
var userAnswer;

// count of correct answers
var numCorrect = 0;

// count of incorrect answers
var numIncorrect = 0;

// count of unanswered answers
var numUnanswered = 10;



// ------------------------FUNCTIONS-----------------------//

// initialize function to start the game
function init() {
    // page loads, with start button in middle
    // when start button is clicked -->
    $(".start-btn").on("click", function () {
        $("#game-box").empty();
        startTimer();
        var queryURL = "https://opentdb.com/api.php?amount=10";
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                var tenQuestionsArray = response.results;
                // console.log(tenQuestionsArray);
                for (var i = 0; i < tenQuestionsArray.length; i++) {
                    var correctA = tenQuestionsArray[i]["correct_answer"];
                    console.log(correctA);
                    var incorrectArray = tenQuestionsArray[i]["incorrect_answers"];
                    incorrectArray.push(correctA);
                    // console.log(incorrectArray);
                    var question = tenQuestionsArray[i]["question"];
                    // console.log(question);
                    var p0 = $("<p>");
                    p0.addClass("question");
                    p0.text(question);
                    $("#question-area").append(p0);
                    $.each(incorrectArray, function (index, value) {
                        var answerPara = $("<p>");
                        answerPara.addClass("answers");
                        answerPara.text(incorrectArray[index]);
                        $("#question-area").append(answerPara);
                    });
                }
                // checkAnswer();
                $(".answers").on("click", function () {
                    //store the text of the div user clicks in variable userAnswer
                    var userAnswer = $(this).text();
                    console.log(userAnswer);
                    //check if userAnswer is equal to correctAnswer
                    if (userAnswer == tenQuestionsArray[count].correct_answer) {
                        $(this).css("background", "green");
                        numCorrect++;
                        console.log("numCorrect: " + numCorrect);
                    }
                    else {
                        numIncorrect++;
                        $(this).css("background", "red");
                        console.log("numIncorrect: " + numIncorrect);
                    }
                    //
                    numUnanswered--;
                    console.log("numUnanswered: " + numUnanswered);
                    // increase the count variable to move to next question when createQuestion function is called
                    count++
                    // createQuestion();
                });
            });
    })
}

// function to start timer downtown with increment every 1 sec
function startTimer() {
    clearInterval(intervalId);
    intervalId = setInterval(decrement, 1000);
}

// function to decrease 
function decrement() {
    //decrease the value of number by 1
    number--;
    // need push number decrement to HTML and add HTML to stylize text
    $("#timer").html("<div>" + "Only " + number + " seconds left" + "</div>").addClass("timer");
    // once number hits zero...
    if (number === 0) {
        //end the timer
        stopTimer();
        // Alert user time is up
        alert("Time's up!");
    }
}

//The stop function
function stopTimer() {
    //clears intervalId
    clearInterval(intervalId);
    //empties all question and answer div to clear the page
    $("#timer").empty();
    $("#questioncounter").empty();
    $("#question,#answerone,#answertwo,#answerthree,#answerfour,#answervive").remove();
    $("#correct").html(numCorrect);
    $("#incorrect").html(numIncorrect);
    $("#unanswered").html(numUnanswered);

    correctAnswers();

    //create the 'play again' button
    $("#questioncounter").html("<button id='playagain' class='btn btn-primary start-btn' type='submit'>Ready to play again?</button>")

    $("#playagain").on('click', function () {
        console.log('test')
        init();
    })
}

// function question and answers from a question object
function createQuestion() {

}

// function to check if answer chosen by user is the correct answer
function checkAnswer() {

}

function correctAnswers() {
    //add the correct answers
    $("#question").html("The correct answers are: ").addClass('finalanswers');
    $("#correctanswerone").html("1: " + questionOne.question + " " + questionOne.correctAnswer).addClass('finalanswers');
    $("#correctanswertwo").html("2: " + questionTwo.question + " " + questionTwo.correctAnswer).addClass('finalanswers');
    $("#correctanswerthree").html("3: " + questionThree.question + " " + questionThree.correctAnswer).addClass('finalanswers');
    $("#correctanswerfour").html("4: " + questionFour.question + " " + questionFour.correctAnswer).addClass('finalanswers');
    $("#correctanswerfive").html("5: " + questionFive.question + " " + questionFive.correctAnswer).addClass('finalanswers');
}


// ------------------------EVENT LISTENERES-----------------------//

$(document).ready(function () {
    init();
});