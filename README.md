# Pew Pew Penguino Offical Home

# You found the offical website for Pew Pew Penguino!

## Have a look to see what we've done via our blogs or browse around the place!

<a href="https://penguinogame.me/blog">
  <button class="cayman-button">Blogs</button>
</a>

<style>
  .cayman-button {
    background-color: #0366d6; /* Blue background */
    color: #fff; /* White text */
    border: none;
    padding: 10px 20px;
    font-size: 16px;
    font-weight: bold;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .cayman-button:hover {
    background-color: #0056b3; /* Darker blue on hover */
  }
  
  .cayman-button:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(3, 102, 214, 0.5); /* Blue outline on focus */
  }
</style>

## Here's some pictures of whats been made so far!
<body>
    <div class="carousel">
        <div class="slides">
            <input type="radio" name="radio-btn" id="img-1" checked>
            <input type="radio" name="radio-btn" id="img-2">
            <input type="radio" name="radio-btn" id="img-3">
            <input type="radio" name="radio-btn" id="img-4">

            <div class="slide first">
                <img src="image1.jpg" alt="Offical HHS Coding Club Logo">
            </div>
            <div class="slide">
                <img src="image2.jpg" alt="Enemy Concept Art">
            </div>
            <div class="slide">
                <img src="image3.jpg" alt="Jellyfish Concept Art">
            </div>
            <div class="slide">
                <img src="image4.jpg" alt="Bowerbird Concept Art">
            </div>

            <div class="navigation-auto">
                <div class="auto-btn1"></div>
                <div class="auto-btn2"></div>
                <div class="auto-btn3"></div>
                <div class="auto-btn4"></div>
            </div>
        </div>

        <div class="navigation-manual">
            <label for="img-1" class="manual-btn"></label>
            <label for="img-2" class="manual-btn"></label>
            <label for="img-3" class="manual-btn"></label>
            <label for="img-4" class="manual-btn"></label>
        </div>
    </div>
</body>