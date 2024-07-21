let penguin = document.getElementById('penguin');
let container = document.getElementById('game-container');
let finish = document.getElementById('finish');
let message = document.getElementById('message');
let currentLevel = 0;

const levels = [
    {
        backgroundImage: '/images/place1.png',
        obstacles: [
            { top: 100, left: 300 },
            { top: 300, left: 400 },
            { top: 400, left: 500 }
        ],
        platforms: [
            { top: 200, left: 150 },
            { top: 350, left: 350 },
            { top: 450, left: 600 }
        ],
        finish: { top: 500, left: 700 },
        message: 'Level 1: Australia'
    },
    {
        backgroundImage: '/images/place2.png',
        obstacles: [
            { top: 150, left: 200 },
            { top: 250, left: 400 },
            { top: 350, left: 600 }
        ],
        platforms: [
            { top: 100, left: 200 },
            { top: 300, left: 400 },
            { top: 400, left: 600 }
        ],
        finish: { top: 500, left: 700 },
        message: 'Level 2: Japan'
    },
    // Add more levels as needed
];

let isJumping = false;
let jumpSpeed = 0;
const gravity = 1;

function loadLevel(levelIndex) {
    const level = levels[levelIndex];
    container.style.backgroundImage = `url(${level.backgroundImage})`;
    message.innerText = level.message;

    // Remove previous obstacles and platforms
    const existingObstacles = document.querySelectorAll('.obstacle');
    existingObstacles.forEach(obstacle => obstacle.remove());

    const existingPlatforms = document.querySelectorAll('.platform');
    existingPlatforms.forEach(platform => platform.remove());

    // Add new obstacles
    level.obstacles.forEach(pos => {
        let obstacle = document.createElement('div');
        obstacle.classList.add('obstacle');
        obstacle.style.top = pos.top + 'px';
        obstacle.style.left = pos.left + 'px';
        container.appendChild(obstacle);
    });

    // Add new platforms
    level.platforms.forEach(pos => {
        let platform = document.createElement('div');
        platform.classList.add('platform');
        platform.style.top = pos.top + 'px';
        platform.style.left = pos.left + 'px';
        container.appendChild(platform);
    });

    // Position finish line
    finish.style.top = level.finish.top + 'px';
    finish.style.left = level.finish.left + 'px';
}

document.addEventListener('keydown', function(event) {
    event.preventDefault(); // Prevent page from scrolling

    let rect = penguin.getBoundingClientRect();
    let containerRect = container.getBoundingClientRect();
    let moveAmount = 10;

    switch(event.key) {
        case 'ArrowUp':
        case 'w':
            if (!isJumping) {
                isJumping = true;
                jumpSpeed = -15;
            }
            break;
        case 'ArrowDown':
        case 's':
            // No downward movement; can add crouch functionality here if desired
            break;
        case 'ArrowLeft':
        case 'a':
            if (rect.left > containerRect.left) penguin.style.left = (rect.left - moveAmount - containerRect.left) + 'px';
            break;
        case 'ArrowRight':
        case 'd':
            if (rect.right < containerRect.right) penguin.style.left = (rect.left + moveAmount - containerRect.left) + 'px';
            break;
    }
});

function applyGravity() {
    let penguinRect = penguin.getBoundingClientRect();
    let containerRect = container.getBoundingClientRect();

    if (isJumping) {
        jumpSpeed += gravity;
        penguin.style.top = (penguinRect.top + jumpSpeed - containerRect.top) + 'px';
        
        if (penguinRect.bottom + jumpSpeed >= containerRect.bottom) {
            penguin.style.top = (containerRect.bottom - penguinRect.height - containerRect.top) + 'px';
            isJumping = false;
            jumpSpeed = 0;
        }

        // Check collision with platforms to stop falling
        let platforms = document.getElementsByClassName('platform');
        for (let i = 0; i < platforms.length; i++) {
            let platformRect = platforms[i].getBoundingClientRect();
            if (penguinRect.left < platformRect.left + platformRect.width &&
                penguinRect.left + penguinRect.width > platformRect.left &&
                penguinRect.top + penguinRect.height <= platformRect.top + platformRect.height &&
                penguinRect.top + penguinRect.height + jumpSpeed >= platformRect.top) {
                penguin.style.top = (platformRect.top - penguinRect.height - containerRect.top) + 'px';
                isJumping = false;
                jumpSpeed = 0;
            }
        }
    } else {
        // Check if penguin is on the ground or platform
        if (penguinRect.bottom < containerRect.bottom) {
            isJumping = true;
            jumpSpeed = 1; // Start falling if not already jumping
        }
    }
    checkCollision();
}

function checkCollision() {
    let penguinRect = penguin.getBoundingClientRect();
    let obstacles = document.getElementsByClassName('obstacle');
    let platforms = document.getElementsByClassName('platform');

    // Check collision with obstacles
    for (let i = 0; i < obstacles.length; i++) {
        let obstacleRect = obstacles[i].getBoundingClientRect();
        if (penguinRect.left < obstacleRect.left + obstacleRect.width &&
            penguinRect.left + penguinRect.width > obstacleRect.left &&
            penguinRect.top < obstacleRect.top + obstacleRect.height &&
            penguinRect.top + penguinRect.height > obstacleRect.top) {
            alert('Game Over! You hit an obstacle.');
            resetGame();
            return;
        }
    }

    // Check collision with finish
    let finishRect = finish.getBoundingClientRect();
    if (penguinRect.left < finishRect.left + finishRect.width &&
        penguinRect.left + penguinRect.width > finishRect.left &&
        penguinRect.top < finishRect.top + finishRect.height &&
        penguinRect.top + penguinRect.height > finishRect.top) {
        currentLevel++;
        if (currentLevel < levels.length) {
            alert('Congratulations! Proceed to the next level.');
            resetGame();
            loadLevel(currentLevel);
        } else {
            alert('Congratulations! You have completed all levels.');
            resetGame();
        }
    }
}

function resetGame() {
    penguin.style.left = '20px';
    penguin.style.top = '550px'; // Start on the ground
}

// Apply gravity continuously
setInterval(applyGravity, 20);

// Load the first level initially
loadLevel(currentLevel);
