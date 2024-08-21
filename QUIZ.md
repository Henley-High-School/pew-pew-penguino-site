---
layout: default
title: "Penguino Game Quiz"
permalink: /quiz
---
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Penguin and Antarctica Quiz</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: #e0f7fa;
      text-align: center;
      margin: 0;
      padding: 0;
    }
    h1 {
      color: #00796b;
      margin-top: 30px;
    }
    .quiz-container {
      margin: 20px auto;
      padding: 30px;
      max-width: 600px;
      background-color: #ffffff;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      border-radius: 15px;
    }
    .question {
      font-size: 20px;
      margin-bottom: 10px;
      color: #004d40;
    }
    .options label {
      display: block;
      margin: 8px 0;
      font-size: 18px;
    }
    .submit-btn, .reset-btn {
      padding: 12px 25px;
      margin: 20px 10px;
      border: none;
      border-radius: 10px;
      background-color: #00796b;
      color: white;
      font-size: 16px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }
    .submit-btn:hover, .reset-btn:hover {
      background-color: #004d40;
    }
    .result {
      font-size: 20px;
      margin-top: 25px;
      color: #004d40;
    }
    .perfect-score {
      margin-top: 25px;
      display: none;
      font-size: 18px;
    }
    .perfect-score a {
      color: #00796b;
      font-weight: bold;
      text-decoration: none;
    }
    .confetti {
      position: absolute;
      width: 10px;
      height: 10px;
      background-color: #00796b;
      animation: confetti-fall 3s infinite;
    }
    @keyframes confetti-fall {
      0% { transform: translateY(0); opacity: 1; }
      100% { transform: translateY(800px); opacity: 0; }
    }
  </style>
</head>
<body>

  <h1>Penguin and Antarctica Quiz 🐧❄️</h1>
  <div class="quiz-container">
    <!-- Quiz Questions -->
    <div class="question">
      1. What is the main character of Penguino Game?
    </div>
    <div class="options">
      <label><input type="radio" name="q1" value="a"> A Penguin 🐧</label>
      <label><input type="radio" name="q1" value="b"> A Polar Bear 🐻</label>
      <label><input type="radio" name="q1" value="c"> A Walrus 🦭</label>
    </div>
    <div class="question">
      2. Penguins primarily live in which region?
    </div>
    <div class="options">
      <label><input type="radio" name="q2" value="a"> The Arctic</label>
      <label><input type="radio" name="q2" value="b"> Antarctica</label>
      <label><input type="radio" name="q2" value="c"> Australia</label>
    </div>
    <div class="question">
      3. In Penguino Game, where does the penguin travel first after Antarctica?
    </div>
    <div class="options">
      <label><input type="radio" name="q3" value="a"> Japan</label>
      <label><input type="radio" name="q3" value="b"> Australia</label>
      <label><input type="radio" name="q3" value="c"> Mexico</label>
    </div>
    <!-- More questions (4 to 10) -->
    <div class="question">
      4. What do penguins primarily eat?
    </div>
    <div class="options">
      <label><input type="radio" name="q4" value="a"> Fish</label>
      <label><input type="radio" name="q4" value="b"> Insects</label>
      <label><input type="radio" name="q4" value="c"> Grass</label>
    </div>
    <div class="question">
      5. How many species of penguins are there?
    </div>
    <div class="options">
      <label><input type="radio" name="q5" value="a"> 17</label>
      <label><input type="radio" name="q5" value="b"> 25</label>
      <label><input type="radio" name="q5" value="c"> 10</label>
    </div>
    <div class="question">
      6. What percentage of Antarctica is covered by ice?
    </div>
    <div class="options">
      <label><input type="radio" name="q6" value="a"> 50%</label>
      <label><input type="radio" name="q6" value="b"> 70%</label>
      <label><input type="radio" name="q6" value="c"> 98%</label>
    </div>
    <div class="question">
      7. Penguins use their wings for what purpose?
    </div>
    <div class="options">
      <label><input type="radio" name="q7" value="a"> Flying</label>
      <label><input type="radio" name="q7" value="b"> Swimming</label>
      <label><input type="radio" name="q7" value="c"> Walking</label>
    </div>
    <div class="question">
      8. Which penguin species is the largest?
    </div>
    <div class="options">
      <label><input type="radio" name="q8" value="a"> Emperor Penguin</label>
      <label><input type="radio" name="q8" value="b"> Adelie Penguin</label>
      <label><input type="radio" name="q8" value="c"> King Penguin</label>
    </div>
    <div class="question">
      9. How cold can temperatures get in Antarctica during winter?
    </div>
    <div class="options">
      <label><input type="radio" name="q9" value="a"> -20°C</label>
      <label><input type="radio" name="q9" value="b"> -50°C</label>
      <label><input type="radio" name="q9" value="c"> -80°C</label>
    </div>
    <div class="question">
      10. What is the smallest species of penguin?
    </div>
    <div class="options">
      <label><input type="radio" name="q10" value="a"> Little Blue Penguin</label>
      <label><input type="radio" name="q10" value="b"> Gentoo Penguin</label>
      <label><input type="radio" name="q10" value="c"> Chinstrap Penguin</label>
    </div>
    <button class="submit-btn" onclick="submitQuiz()">Submit Quiz</button>
    <button class="reset-btn" onclick="resetQuiz()">Reset Quiz</button>
    <div class="result"></div>
    <!-- Perfect Score Message and Link -->
    <div class="perfect-score">
      <p>Congratulations! You got all the answers right! 🎉</p>
      <p>Fill out <a href="https://tally.so/r/nrVkbo" target="_blank">this form</a> to join the winners section!</p>
    </div>
  </div>

  <script>
    function submitQuiz() {
      const answers = {
        q1: 'a', q2: 'b', q3: 'b', q4: 'a', q5: 'a', q6: 'c',
        q7: 'b', q8: 'a', q9: 'c', q10: 'a'
      };

      let score = 0;
      for (let q in answers) {
        const selected = document.querySelector(`input[name="${q}"]:checked`);
        if (selected && selected.value === answers[q]) {
          score++;
        }
      }

      document.querySelector('.result').innerHTML = `You got ${score}/10 correct!`;
      
      // Check if all answers are correct
      if (score === 10) {
        document.querySelector('.perfect-score').style.display = 'block';
        launchConfetti();
      } else {
        document.querySelector('.perfect-score').style.display = 'none';
      }
    }

    function resetQuiz() {
      const inputs = document.querySelectorAll('input[type="radio"]');
      inputs.forEach(input => input.checked = false);
      document.querySelector('.result').innerHTML = '';
      document.querySelector('.perfect-score').style.display = 'none';
    }

    function launchConfetti() {
      for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.animationDelay = `${Math.random() * 2}s`;
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 3000);
      }
    }
  </script>

</body>