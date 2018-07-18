let questionNumber = 0;
let score = 0;

function renderTest(){
   $('.startButton').on('click', renderQuestion,);
  
  //this function will render test 
  console.log('`renderTest ran`');
}
function renderQuestion(event){
  event.preventDefault();
  $('.startPage').addClass('hideElement');
  $('.quizLegend').html(`<div class ="questionTitle"> ${STORE[questionNumber].question} </div>`);
  let newQuestion = `
    <div class= "answerBubbles">
      <div class="questionContainer">
        <h2> 
          <label>
            <div class= "answerOne"> 
              <input data-answer="${STORE[questionNumber].answer[0]}" type="radio" name="pickOne"> ${STORE[questionNumber].answer[0]}
            </div>
          </label>
          <br>
          <label>
            <div class= "answerTwo">
              <input data-answer="${STORE[questionNumber].answer[1]}" type="radio" name="pickOne"> ${STORE[questionNumber].answer[1]}
            </div>
          </label> 
          <br>
          <label>
            <div class= "answerThree">
              <input data-answer="${STORE[questionNumber].answer[2]}" type="radio" name="pickOne"> ${STORE[questionNumber].answer[2]}
            </div>
          </label> 
          <br>
          <label>
            <div class="answerFour">
              <input data-answer="${STORE[questionNumber].answer[3]}" type="radio" name="pickOne"> ${STORE[questionNumber].answer[3]} 
            </div>
          </label> 
        </h2>
          <label>
            <button type="submit" class="submitButton"> SUBMIT 
            </button>
            <div class="errorMessage">
          </div>
          </label>
          <p>
          <div class="tracker">question: ${questionNumber + 1}  / 10 &emsp;&emsp;&emsp;&emsp;score: ${score} / 10
          </div>
    </div> 
  </div> `; 
                     
                             
  //this function will generate questions for test
 $('.questions').html(newQuestion);
}

//score update
function updateScore() {
  score++;
}

function newScore() {
  updateScore();
  $('.score').text(score);
}
// question feedback function
function rightAnswer() {
  $('.questions').on('click','.submitButton', function (event){
    event.preventDefault();
    let theirAnswer = $('input:checked');

    if( theirAnswer.length != 0){
      let selectedAnswer = theirAnswer.data('answer');
      let theAnswer = `${STORE[questionNumber].correctAnswer}`;
      if (selectedAnswer === theAnswer) {
        renderQuestionFeedback("Positive");
      }
      else {
        renderQuestionFeedback("Negative");
      }
    }
    else{
      $('.errorMessage').html(`<div class = "error"><br> -Please select an option before you continue- </div>`);
    }
  });
}

function renderQuestionFeedback(feedback){
  if (feedback == "Positive"){
    right();
    newScore();
  }
  else{
    wrong();
  };
} 
//function if right
function right() {
  let displayAnswer = `${STORE[questionNumber].correctAnswer}`;
  $('.questions').html(`
  <div class = "questionContainer">
    <div class="answerFeedback">
      <div class="icon">
      <h2> you are correct </h2>
      <p>
        <img class="answerImage" src= "${STORE[questionNumber].icon}" alt="${STORE[questionNumber].alt}"/>
      </div>
      <p> 
      <button type="submit" class="nextButton"> NEXT 
      </button>
    </div>
  </div>`);
}
// function if wrong answer
function wrong(){
    let wrongAnswer = `${STORE[questionNumber].correctAnswer}`;
    $('.questions').html(`
    <div class = "questionContainer">
      <div class = "answerFeedback">
      <p>
        <div class="icon">
        <h2> You are wrong </h2>
        <p>
        <img "answerImage" src= "${STORE[questionNumber].icon}" alt= "${STORE[questionNumber].alt}"/>
        <p>
        <h2>the correct answer is <u> ${STORE[questionNumber].correctAnswer} </u> </h2>
        </div>
      </div>
    <p> 
    <button type="submit" class="nextButton">NEXT</button
    </div>`);
    }

//this function will go to the next question when you press 'next'
function nextQuestion() {
  $('.questions').on('click', '.nextButton', function(event){
    if (questionNumber < STORE.length -1) {
      questionNumber ++;
      $('.questionNumber').text(questionNumber+1);
      renderQuestion(event);
    }
      
    else {
      results(event);
      $('.tracker').hide();
    } 
    });
}

function results(){
  if (score > 8) {goodResults();}
  else {badResults();}
}

function goodResults () {
  let restartButton = $('.questions').html(`
    <div class="questionContainer">
    <h1> treat yourself to ramen </h1>
      <h2> YOUR SCORE IS ${score} out of 10 
          <p> 
            <img "answerImage"src="https://media.giphy.com/media/iOz3p2txHIo4U/giphy.gif" alt="Ron Swanson dancing"/> 
          <p>
          treat yourself to ramen!
      </h2>
      <button type="submit" class="restartButton">RESTART
      </button>
    </div>`);
}

function badResults() {
  let restartButton = $('.questions').html(`
    <div class="questionContainer">
      <h2>
      were you even paying attention?
      <p>
        <img "answerImage" src="https://media.giphy.com/media/SlJQGUYmdwj2E/giphy.gif" alt="Mortal Combat character Shang Tsung" class="icon"/>
      <p>
      your score is ${score} out of 10
      </h2> 
      <button type="submit" class="restartButton">RESTART
      </button>
    </div>`);
}

function restartTest(){
  $('.questions').on('click', '.restartButton', function(event) {
    let score=0;
    let questionNumber=0;
      renderQuestion();
    }
  );
}

//this function updates question number
function updateQuestion() {
  let updateQuestionNumber = $('.questionNumber').text(questionNumber);
}

function narutoTest(){
  renderTest();
  rightAnswer();
  updateQuestion();
  nextQuestion();
  //this function will initially render the test, and activate questions and score functions.
}

$(narutoTest);