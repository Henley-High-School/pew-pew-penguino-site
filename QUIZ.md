---
layout: default
title: "Penguino Game Quiz"
permalink: /quiz
---
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f0f8ff;
      text-align: center;
      margin: 0;
      padding: 0;
    }
    h1 {
      color: #2a9d8f;
    }
    .quiz-container {
      margin: 20px auto;
      padding: 20px;
      max-width: 600px;
      background-color: #fff;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      border-radius: 10px;
    }
    .question {
      font-size: 18px;
      margin-bottom: 10px;
    }
    .options label {
      display: block;
      margin: 5px 0;
    }
    .submit-btn, .reset-btn {
      padding: 10px 20px;
      margin: 15px 5px;
      border: none;
      border-radius: 5px;
      background-color: #2a9d8f;
      color: white;
      cursor: pointer;
    }
    .submit-btn:hover, .reset-btn:hover {
      background-color: #21867a;
    }
    .result {
      font-size: 18px;
      margin-top: 20px;
      color: #264653;
    }
    .perfect-score {
      margin-top: 20px;
      display: none;
    }
    .perfect-score a {
      color: #2a9d8f;
      font-weight: bold;
      text-decoration: none;
    }
  </style>
</head>
<body>

  <h1>Penguin and Penguino Game Quiz 🐧</h1>
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
      6. What is the name of the final boss in Penguino Game?
    </div>
    <div class="options">
      <label><input type="radio" name="q6" value="a"> Emperor Penguin</label>
      <label><input type="radio" name="q6" value="b"> Snow King</label>
      <label><input type="radio" name="q6" value="c"> Icy Dragon</label>
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
      9. In Penguino Game, what can you buy with coins?
    </div>
    <div class="options">
      <label><input type="radio" name="q9" value="a"> New Skills</label>
      <label><input type="radio" name="q9" value="b"> Penguin Outfits</label>
      <label><input type="radio" name="q9" value="c"> Extra Health</label>
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
        q1: 'a', q2: 'b', q3: 'b', q4: 'a', q5: 'a', q6: 'b',
        q7: 'b', q8: 'a', q9: 'b', q10: 'a'
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
  </script>

</body>
