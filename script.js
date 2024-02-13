$(document).ready(function () {
  var currentQuestion;
  var interval;
  var timeLeft = 10;
  var score = 0;
  var highScore = 0;
  var numberLimit = 10;

  $('#numberLimit').on('input', function () {
    numberLimit = parseInt($(this).val(), 10);
    $('#number-limit-label').text("Number Limit: " + numberLimit);
    renderNewQuestion();
  });

  var updateTimeLeft = function (amount) {
    timeLeft += amount;
    $('#time-left').text(timeLeft);
  };

  var updateScore = function (amount) {
    score += amount;
    $('#score').text(score);
  };

  var updateHighScore = function () {
    if (score > highScore) {
      highScore = score;
      $('#high-score').text(highScore);
    }
  };

  var startGame = function () {
    if (!interval) {
      if (timeLeft === 0) {
        updateTimeLeft(10);
        updateScore(-score);
      }
      interval = setInterval(function () {
        updateTimeLeft(-1);
        if (timeLeft === 0) {
          clearInterval(interval);
          interval = undefined;
        }
      }, 1000);
    }
  };

  var randomNumberGenerator = function (size) {
    return Math.ceil(Math.random() * size);
  };

  var questionGenerator = function () {
    var question = {};
    var num1 = randomNumberGenerator(numberLimit);
    var num2 = randomNumberGenerator(numberLimit);
    question.answer = num1 + num2;
    question.equation = String(num1) + " + " + String(num2);
    return question;
  };

  var renderNewQuestion = function () {
    currentQuestion = questionGenerator();
    $('#equation').text(currentQuestion.equation);
  };

  var checkAnswer = function (userInput, answer) {
    if (userInput === answer) {
      renderNewQuestion();
      $('#user-input').val('');
      updateTimeLeft(+1);
      updateScore(+1);
      updateHighScore();
    }
  };

  $('#reset-button').on('click', function () {
    clearInterval(interval);
    interval = undefined;
    timeLeft = 10;
    score = 0;
    $('#time-left').text(timeLeft);
    $('#score').text(score);
    updateHighScore();
    $('#user-input').val('');
    renderNewQuestion();
  });

  $('#user-input').on('keyup', function () {
    startGame();
    checkAnswer(Number($(this).val()), currentQuestion.answer);
  });

  renderNewQuestion();
});
