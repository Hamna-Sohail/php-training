$(document).ready(function(){
    document.getElementById('start-btn').addEventListener('click', startQuiz);
    document.getElementById('submit-btn').addEventListener('click', submitAnswer);
    document.getElementById('next-btn').addEventListener('click', nextQuestion);
    document.getElementById('retryButton').addEventListener('click', resetQuiz);
    let questions = [];
    let currentQuestionIndex = 0;
    let score = 0;
    let userAnswers = [];
    let timerInterval;
    let timeRemaining = 60;

    function startQuiz(){
        fetch('questions.json')
        .then(response => response.json())
        .then(data => {questions =  data;
            document.getElementById('start-btn').style.display = "none";
            document.getElementById('quiz-container').classList. remove('hidden');
            showQuestion();
            startTimer();
        })
        .catch(error => console.error('Error fetching quiz data:', error));
    }
    function showQuestion(){
        
        const currentQuestion = questions[currentQuestionIndex];
        document.getElementById('question').textContent = currentQuestion.question;

        const answerChoices = document.getElementById('answer');
        answerChoices.innerHTML = '';

         currentQuestion.answers.forEach((answer, index) => {
            const label = document.createElement('label');
            const input = document.createElement('input');
            input.type = 'radio';
            input.name = 'answer';
            input.value = index;
            label.appendChild(input);
            label.appendChild(document.createTextNode(answer));
            answerChoices.appendChild(label);
            answerChoices.appendChild(document.createElement('br'));
         });
         document.getElementById('submit-btn').classList.remove('hidden');
         document.getElementById('next-btn').classList.add('hidden');
         document.getElementById('feedback').classList.add('hidden');
         document.getElementById('feedback').textContent = ''; 
    }

    function submitAnswer(){
        const selectedOption = document.querySelector('input[name = "answer"]:checked');
        if(!selectedOption){
            alert("Please seleect an answer");
            return;
        }
        const selectedIndex = parseInt(selectedOption.value);
        const currentQuestion = questions[currentQuestionIndex];

        document.getElementById('submit-btn').classList.add('hidden');
        document.getElementById('next-btn').classList.remove('hidden');

        const answerChoices = document.querySelectorAll('input[name = "answer"]');
        answerChoices.forEach((input, index) => {
            const label = input.parentNode;
            label.classList.remove('correct', 'incorrect');
            if(index === currentQuestion.correctAnswer){
                label.classList.add('correct');
            }
            if(index === selectedIndex && currentQuestion.answers[selectedIndex] !== currentQuestion.correct){
                label.classList.add('incorrect');
            }
            console.log("Selected Index:", selectedIndex);
            console.log("Correct Answer Index:", currentQuestion.correctAnswer);
        });
        const feedback = document.getElementById('feedback');
        feedback.classList.remove('hidden');
        if (currentQuestion.answers[selectedIndex] === currentQuestion.correct) {
          feedback.textContent = 'Correct!';
          feedback.classList.add('correct');
          score++;
        } else {
          feedback.textContent = 'Incorrect!';
          feedback.classList.add('incorrect');
        }
      
        userAnswers.push({
          question: currentQuestion.question,
          correctAnswer: currentQuestion.correct,
          userAnswer: currentQuestion.answers[selectedIndex]
        });
      
    }
    function nextQuestion() {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
          showQuestion();
        } else {
          displaySummary();
          clearInterval(timerInterval);
        }
    }
    function displaySummary() {
        document.getElementById('quiz-container').classList.add('hidden');
        document.getElementById('summaryContainer').classList.remove('hidden');
        document.getElementById('retryButton').classList.remove('hidden');
      
        const scoreElement = document.getElementById('score');
        scoreElement.textContent = `Your score: ${score} out of ${questions.length}`;
      
        const summary = document.getElementById('summary');
        summary.innerHTML = ''; 
        userAnswers.forEach((answer, index) => {
            const summaryItem = document.createElement('div');
            summaryItem.innerHTML = `
                <h4>Question ${index + 1}: ${answer.question}</h4>
                <p>Your Answer: <strong>${answer.userAnswer}</strong></p>
                <p>Correct Answer: <strong>${answer.correctAnswer}</strong></p>`;
            summary.appendChild(summaryItem);
        });
    }
    function startTimer() {
        const timeElement = document.getElementById('time');
        timeRemaining = 60; 
        
        timerInterval = setInterval(() => {
          timeRemaining--;
          timeElement.textContent = timeRemaining;
      
          if (timeRemaining <= 10) {
            document.getElementById('timer').classList.add('warning');
          }
      
          if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            alert('Time is up!');
            displaySummary(); 
          }
        }, 1000);
    }
    function resetQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        userAnswers = [];
        document.getElementById('quiz-container').classList.add('hidden');
        document.getElementById('summaryContainer').classList.add('hidden');
        document.getElementById('start-btn').style.display = 'block';
        document.getElementById('submit-btn').classList.add('hidden');
        document.getElementById('next-btn').classList.add('hidden');
        document.getElementById('retryButton').classList.add('hidden');
        document.getElementById('feedback').classList.add('hidden');
        document.getElementById('timer').classList.remove('warning'); 
        clearInterval(timerInterval); 

        document.getElementById('time').textContent = "60";  
        document.getElementById('question').textContent = ''; 
        document.getElementById('answer').innerHTML = ''; 
        document.getElementById('feedback').classList.add('hidden');
        document.getElementById('feedback').textContent = ''; 
    }
});