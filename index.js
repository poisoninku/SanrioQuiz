(function(){
    // Functions
    function buildQuiz(){
      // variable to store the HTML output
      const output = [];
  
      // for each question...
      myQuestions.forEach(
        (currentQuestion, questionNumber) => {
  
          // variable to store the list of possible answers
          const answers = [];
  
          // and for each available answer...
          for(letter in currentQuestion.answers){
  
            // ...add an HTML radio button
            answers.push(
              `<label>
                <input type="radio" name="question${questionNumber}" value="${letter}"/>
                ${letter} :
                ${currentQuestion.answers[letter]}
              </label>`
            );
          }
  
          // add this question and its answers to the output
          output.push(
            `<div class="slide">
              <div class="question"> ${currentQuestion.question} </div>
              <div class="answers"> ${answers.join("")} </div>
            </div>`
          );
        }
      );
  
      // finally combine our output list into one string of HTML and put it on the page
      quizContainer.innerHTML = output.join('');
    }
  
    function showResults(){
  
      // gather answer containers from our quiz
      const answerContainers = quizContainer.querySelectorAll('.answers');
  
      // keep track of user's answers
      let numCorrect = 0;
  
      // for each question...
      myQuestions.forEach( (currentQuestion, questionNumber) => {
  
        // find selected answer
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;
  
        // if answer is correct
        if(userAnswer === currentQuestion.correctAnswer){
          // add to the number of correct answers
          numCorrect++;
  
          // color the answers green
          answerContainers[questionNumber].style.color = 'lightgreen';
        }
        // if answer is wrong or blank
        else{
          // color the answers red
          answerContainers[questionNumber].style.color = 'red';
        }
      });
  
      // show number of correct answers out of total
      resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  
      // Show the submit button
      submitButton.style.display = 'none';
      restartButton.style.display = 'inline-block';
    }
  
    function showSlide(n) {
      slides[currentSlide].classList.remove('active-slide');
      slides[n].classList.add('active-slide');
      currentSlide = n;
      if(currentSlide === 0){
        previousButton.style.display = 'none';
      }
      else{
        previousButton.style.display = 'inline-block';
      }
      if(currentSlide === slides.length-1){
        nextButton.style.display = 'none';
        submitButton.style.display = 'inline-block';
      }
      else{
        nextButton.style.display = 'inline-block';
        submitButton.style.display = 'none';
      }
    }
  
    function showNextSlide() {
      showSlide(currentSlide + 1);
    }
  
    function showPreviousSlide() {
      showSlide(currentSlide - 1);
    }
  
    function restartQuiz() {
      // Reset the quiz state
      const answerContainers = quizContainer.querySelectorAll('.answers');
      answerContainers.forEach(container => {
        const inputs = container.querySelectorAll('input');
        inputs.forEach(input => input.checked = false);
      });
  
      // Reset the results
      resultsContainer.innerHTML = '';
      submitButton.style.display = 'inline-block';
      restartButton.style.display = 'none';
  
      // Rebuild the quiz and show the first slide
      buildQuiz();
      showSlide(0);
    }
  
    // Variables
    const quizContainer = document.getElementById('quiz');
    const resultsContainer = document.getElementById('results');
    const submitButton = document.getElementById('submit');
    const restartButton = document.getElementById('restart');  // New restart button
    const myQuestions = [
      {
        question: "What is Hello Kitty's real name?",
        answers: {
          a: "Keiichi Hiiragi",
          b: "Charmmy Kitty",
          c: " Kitty White",
          d: "Chiffon"
        },
        correctAnswer: "c"
      },
      {
        question: "What is the name of the lazy egg character from Sanrio?",
        answers: {
          a: "Pochacco",
          b: "Gudetama",
          c: "Pompompurin",
          d: "Kuromi"
        },
        correctAnswer: "c"
      },
      {
        question: "Who is considered the oldest Sanrio character?",
        answers: {
          a: "Cinnamaroll",
          b: "Pochacco",
          c: "Hello Kitty",
          d: "Coro Chan"
        },
        correctAnswer: "d"
      },

      {
        question: "What color is Hello Kitty's signature bow?",
        answers: {
          a: "Red",
          b: "Blue",
          c: "Pink",
          d: "Orange"
        },
        correctAnswer: "a"
      }
    ];
    // Kick things off
    buildQuiz();
    // Pagination
    const previousButton = document.getElementById("previous");
    const nextButton = document.getElementById("next");
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;
    // Show the first slide
    showSlide(currentSlide);
    // Event listeners
    submitButton.addEventListener('click', showResults);
    restartButton.addEventListener('click', restartQuiz);  // Add restart quiz listener
    previousButton.addEventListener("click", showPreviousSlide);
    nextButton.addEventListener("click", showNextSlide);
  })();
  