// on document load
$(document).ready(function() {
    
    var correct = 0;
    var incorrect = 0;
    var unAnswered = 0;

    var questions = [];
    var answerBank = [];
    var gameInterval;
    var timeLeft = 120;
  
    function newGame() {
        answerBank = [];

        function timer() {
            timeLeft = 120;
            gameInterval = setInterval(function () {
            timeLeft--;
            
            $(".timer").text("Time left: " +  timeLeft);

            if (timeLeft === 0) {
                endGame();
            }
        }, 1000);    
        }   

        function endGame() {
            for (var i = 0; i < questions.length; i++) {
            var answer = $('input[type="radio"][name=' + i + ']:checked').attr("data-answer");
            console.log(answer);
            answerBank.push(answer);
            }
        
            for (var i = 0; i < questions.length; i++) {
                if (questions[i].answer === answerBank[i]) {
                    correct++;
                    
                } else if (answerBank[i] === undefined) {
                        unAnswered++;
                        console.log("unAnswered: " + unAnswered);
                } else {
                    incorrect++;
                    console.log("incorrect! " + incorrect);
                }
            }// end for loop

            // set up arrays to hold answer count
            var correctArray = [];
            correctArray.push(correct);
            console.log('correctArray ' +  correctArray);
            var inCorrectArray = [];
            inCorrectArray.push(incorrect);
            var unAnsweredArray = [];
            unAnsweredArray.push(unAnswered);
            
            //Clear out HTML elements
            $('.form-element').empty();
            $('.submitBtn').empty();
            $('.timer').remove();

            // Print answer counts to DOM
            var allDoneDiv = $('<div>').addClass('total');       
            $("<p>").html('Correct Answers: ' + correctArray).appendTo(allDoneDiv);
            $("<p>").html('Incorrect Answers: ' + inCorrectArray).appendTo(allDoneDiv); 
            $("<p>").html('Unanswered: ' + unAnsweredArray).appendTo(allDoneDiv);
            $('<div>').html('<button type="button" class="btn btn-danger btn-lg try-again">Try Again</button>').appendTo(allDoneDiv);
            $('.form-element').append(allDoneDiv);




        }
        $('body').on('click', '.try-again', function() {
            location.reload();
        
        })

  
        // Set up questions and answers
        var questions = [
            {
                question: "In what city does a Creole lady of the night strut her stuff, according to the original 1974 song “Lady Marmalade”?",
                choices: ["Newark", "New York", "Boston", "New Orleans"],
                answer: "New Orleans"
            },
        
            {
                question: "Who is the lead singer for the rock band Guns N’ Roses?",
                choices: ["Led Zeppelin IV","Led Zeppelin II", "Axl Rose", "Coda"],
                answer: "Axl Rose"
            },
        
            {
                question: "What American punk rock band released their best-selling album 'Dookie' in 1994?",
                choices: ["Green Day","Rancid", "Blink-182", "The Offspring"],
                answer: "Green Day"
            },
        
            {
                question: "American singer-songwriter Johny Cash passed away in what year?",
                choices: ["2003","2001", "1997", "2005"],
                answer: "2003"
            },

            {
                question: "What was the name of Seattle grunge band Nirvana's first album, released in 1989?",
                choices: ['Nevermind','In Utero','Bleach','Smells Like Teen Spirit'],
                answer: "Bleach"
            },
            {
                question: 'Who wrote and recorded the one hit wonder "Spirit in the Sky" released in late 1969?',
                choices: ['Roy Orbison', 'Norman Greenbaum', 'James Brown', 'Sam Cooke'],
                answer: "Norman Greenbaum"
            },
            {
                question: 'What was the highest-selling album of the 1980s in the United States?',
                choices: ["Michael Jackson: Thriller", "AC/DC: Back in Black", "Bruce Springsteen: Born in the USA", "Guns n' Roses: Appetite for Destruction"],
                answer: "Michael Jackson: Thriller"
            },
            {
                question: 'Who was the lead singer of the band Audioslave?',
                choices: ['Eddie Vedder', 'Chris Cornell', 'Lane Stanly', 'Scott Weiland'],
                answer: "Chris Cornell"
            },
         
        ] // end questions.
        


    // On page load show title and start button.


        $('.start-game-btn').html('<button type="button" class="btn btn-danger btn-lg">Start Game</button>');
        
        // When user clicks start button start timer and populate questions.

        // on click hide button start timer load questions.

        $('body').on('click', '.start-game-btn', function(){

            timer();

            // hide question btn
            $('.start-game-btn').hide();

                // Loops through questions and prints
                for (var i = 0; i < questions.length; i++) {
                    // Creates question section
                    var printQuestion = $("<div>");

                    // Add bootstrap class for styles
                    printQuestion.addClass("form-group");

                    // Create area for question to be actually printed
                    var question = $("<label>");

                    // Give that section it's question
                    question.html( '<h4 class ="question-title">' + questions[i].question + '<h4>' );
                    

                    // Loop through possible choices for each question and print them out (using j because i is already being used)
                    for (var j = 0; j < questions[i].choices.length; j++) {
                    // Create div for each radio button
                    var choice = $("<div>");
                    // Add bootstrap class to it
                    choice.addClass("form-check form-check-inline");

                    // Create area for choice/possible answer
                    var choiceText = $("<label>");
                    // Give them styles
                    choiceText.addClass("form-check-label");
                    // Give it text
                    choiceText.text(questions[i].choices[j])

                    // Create actual radio button
                    var choiceInput = $("<input>");
                    // Adds bootstrap class
                    choiceInput.addClass("form-check-input");	
                    // Sets input type to radio (instead of text, number, etc)
                    choiceInput.attr("type", "radio");
                    // Give radio buttons for each question same name so they are related to one another (select one and the others deselect)
                    choiceInput.attr("name", i);
                    // Give it a data attribute to potentially check against for correct question
                    choiceInput.attr("data-question", i);
                    // Give it a data attribute to check against for correct answer
                    choiceInput.attr("data-answer", questions[i].choices[j]);

                    // Place ChoiceText and ChoiceInput into Choice div
                    choice.append(choiceInput).append(choiceText);

                    // Append entire choice to question
                    question.append(choice);

                    }
                    // Append entire question to div
                    printQuestion.append(question)

                    // Append entire div to form
                    $(".form-element").append(printQuestion);

                }

           

                // add submit button
                $('.submitBtn').html('<button type="button" class="btn btn-danger btn-lg submit">Submit</button>');

                // Bind event handler for all elements with a radio type (see jQuery selectors)
                // Bind event handler for all elements with a radio type (see jQuery selectors)
                $("body").on("click", ".submit", function (e) {
                    
                        e.preventDefault();

                        endGame();
                        
                      
                    
                }); // end on click function
                                
        })// question button click / start game
    
    }; // new game function

    newGame();
    

}); // document on load funtion