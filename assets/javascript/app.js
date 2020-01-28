
var card = $("#quiz");

// Question set
var questions = [
  {
    question: "What bear is best?",
    answers: ["Black", "Grizzly", "Polar" ,"False"],
    correctAnswer: "False"
  },
  {
    question: "Which of these is NOT a Letter ?",
    answers: ["C", "G", "7", "K"],
    correctAnswer: "7"
  },
  {
    question: "Which TV Show is Funniest",
    answers: ["Cops", "The Office",  "Star Trek", "NDA"],
    correctAnswer: "The Office"
  },
  {
    question: "Which Number is smallest",
    answers: ["3", "7", "six", "three"],
    correctAnswer: "three"
  },
];

//Variable that will hold the timer//
var timer;


//variable that will hold that game along with the start and end functions of the game//

var game = {
  correct: 0,
  incorrect: 0,
  counter: 90,


  //Function that counts down and lets the player no if they have lost//
  countdown: function() {
    game.counter--;
    $("#counter").html(game.counter);
    if (game.counter === 0) {
      console.log("TIME UP");
      game.done();
    }
  },

  // Function that begins the game by resseting timer and loading question//
  begin: function() {
    timer = setInterval(game.countdown, 1000);

    $("#sub-wrapper").prepend(
      "<h2>Time Remaining: <span id='counter'>90</span> Seconds</h2>"
    );


//Removes the start  button 
    $("#Game-Start").remove();
// adds the questions based on length of the question array and there possible answers //
    for (var i = 0; i < questions.length; i++) {
      card.append("<h2>" + questions[i].question + "</h2>");

    // For each question append the possible answers//
      for (var j = 0; j < questions[i].answers.length; j++) {
        card.append("<input type='radio' name='question-" + i +
          "' value='" + questions[i].answers[j] + "''>" + questions[i].answers[j]);
      }
    }

    card.append("<button id='done'>Done</button>");
  },


  // Function that runs when the user clicks thes done button,  adds  the correct and incorrect responses  scores inside the game variable //
  done: function() {
    var inputs = card.children("input:checked");
    for (var i = 0; i < inputs.length; i++) {
      if ($(inputs[i]).val() === questions[i].correctAnswer) {
        game.correct++;
      } else {
        game.incorrect++;
      }
    }

    // runs the result function
    this.result();
  },

  result: function() {
    clearInterval(timer);

    // removes bottom wrapper
    $("#sub-wrapper h2").remove();

    //displays correct, incorect score//
    card.html("<h2>All Done!</h2>");
    card.append("<h3>Correct Answers: " + this.correct + "</h3>");
    card.append("<h3>Incorrect Answers: " + this.incorrect + "</h3>");
  }
};

//Click Event To STart Game//
$(document).on("click", "#Game-Start", function() {
  game.begin();
});


//Click Event to End Game//
$(document).on("click", "#done", function() {
  game.done();
});
