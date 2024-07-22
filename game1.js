let penguin = document.getElementById('penguin');
let container = document.getElementById('game-container');
let finish = document.getElementById('finish');
let message = document.getElementById('message');
let currentLevel = 0;
let randomMode = false;
let timer = null;
let startTime = null;

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
    // Add more levels with increased difficulty
    {
        backgroundImage: '/images/place3.png',
        obstacles: [
            { top: 100, left: 150 },
            { top: 200, left: 350 },
            { top: 300, left: 500 },
            { top: 400, left: 650 },
            { top: 450, left: 100 }
        ],
        platforms: [
            { top: 150, left: 200 },
            { top: 250, left: 400 },
            { top: 350, left: 600 },
            { top: 450, left: 300 }
        ],
        finish: { top: 500, left: 700 },
        message: 'Level 3: UK'
    },
];

let isJumping = false;
let jumpSpeed = 0;
const gravity = 1;
const moveSpeed = 5;
let keys = {};

function generateRandomLevel(numObstacles, numPlatforms, finishPosition) {
    let obstacles = Array.from({ length: numObstacles }, () => ({ top: random(50, 550), left: random(50, 750) }));
    let platforms = Array.from({ length: numPlatforms }, () => ({ top: random(50, 550), left: random(50, 750) }));
    return {
        backgroundImage: '/images/random_place.png',
        obstacles: obstacles,
        platforms: platforms,
        finish: { top: finishPosition[0], left: finishPosition[1] },
        message: 'Random Level'
    };
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

document.getElementById('start-game-button').addEventListener('click', startGame);
document.getElementById('random-mode-button').addEventListener('click', startRandomMode);

function startGame() {
    document.getElementById('menu').style.display = 'none';
    container.style.display = 'block';
    loadLevel(currentLevel);
}

function startRandomMode() {
    randomMode = true;
    startGame();
    startTime = new Date();
}

function loadLevel(levelIndex) {
    const level = randomMode ? generateRandomLevel(5 + levelIndex, 3 + levelIndex, [500, 700]) : levels[levelIndex];
    container.style.backgroundImage = `url(${level.backgroundImage})`;
    message.innerText = level.message;

    // Remove previous obstacles and platforms
    document.querySelectorAll('.obstacle').forEach(obstacle => obstacle.remove());
    document.querySelectorAll('.platform').forEach(platform => platform.remove());

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

    // Reset penguin position
    penguin.style.left = '20px';
    penguin.style.top = '550px';
}

document.addEventListener('keydown', function(event) {
    event.preventDefault(); // Prevent page from scrolling
    keys[event.key] = true;
});

document.addEventListener('keyup', function(event) {
    keys[event.key] = false;
});

function movePenguin(dx, dy) {
    let rect = penguin.getBoundingClientRect();
    let containerRect = container.getBoundingClientRect();
    let newX = rect.left - containerRect.left + dx;
    let newY = rect.top - containerRect.top + dy;

    if (newX >= 0 && newX + rect.width <= containerRect.width) {
        penguin.style.left = newX + 'px';
    }

    if (newY >= 0 && newY + rect.height <= containerRect.height) {
        penguin.style.top = newY + 'px';
    }
}

function applyGravity() {
    let penguinRect = penguin.getBoundingClientRect();
    let containerRect = container.getBoundingClientRect();

    if (isJumping) {
        jumpSpeed += gravity;
        let newY = penguinRect.top + jumpSpeed - containerRect.top;
        penguin.style.top = newY + 'px';

        if (penguinRect.bottom + jumpSpeed >= containerRect.bottom) {
            penguin.style.top = (containerRect.bottom - penguinRect.height - containerRect.top) + 'px';
            isJumping = false;
            jumpSpeed = 0;
        }

        // Check collision with platforms to stop falling
        let platforms = document.getElementsByClassName('platform');
        for (let platform of platforms) {
            let platformRect = platform.getBoundingClientRect();
            if (penguinRect.left < platformRect.left + platformRect.width &&
                penguinRect.left + penguinRect.width > platformRect.left &&
                penguinRect.top + penguinRect.height <= platformRect.top + gravity &&
                penguinRect.top + penguinRect.height + jumpSpeed >= platformRect.top) {
                penguin.style.top = (platformRect.top - penguinRect.height - containerRect.top) + 'px';
                isJumping = false;
                jumpSpeed = 0;
                break;
            }
        }
    } else {
        let newY = penguinRect.top + gravity - containerRect.top;
        penguin.style.top = newY + 'px';

        if (penguinRect.bottom + gravity >= containerRect.bottom) {
            penguin.style.top = (containerRect.bottom - penguinRect.height - containerRect.top) + 'px';
        }

        // Check collision with platforms to stop falling
        let platforms = document.getElementsByClassName('platform');
        for (let platform of platforms) {
            let platformRect = platform.getBoundingClientRect();
            if (penguinRect.left < platformRect.left + platformRect.width &&
                penguinRect.left + penguinRect.width > platformRect.left &&
                penguinRect.bottom <= platformRect.top + gravity &&
                penguinRect.bottom + gravity >= platformRect.top) {
                penguin.style.top = (platformRect.top - penguinRect.height - containerRect.top) + 'px';
                break;
            }
        }
    }
}

function checkCollisions() {
    let penguinRect = penguin.getBoundingClientRect();
    let containerRect = container.getBoundingClientRect();

    // Check collision with obstacles
    let obstacles = document.getElementsByClassName('obstacle');
    for (let obstacle of obstacles) {
        let obstacleRect = obstacle.getBoundingClientRect();
        if (penguinRect.left < obstacleRect.left + obstacleRect.width &&
            penguinRect.left + penguinRect.width > obstacleRect.left &&
            penguinRect.top < obstacleRect.top + obstacleRect.height &&
            penguinRect.top + penguinRect.height > obstacleRect.top) {
            penguin.style.left = '20px';
            penguin.style.top = '550px';
            break;
        }
    }

    // Check collision with finish line
    let finishRect = finish.getBoundingClientRect();
    if (penguinRect.left < finishRect.left + finishRect.width &&
        penguinRect.left + penguinRect.width > finishRect.left &&
        penguinRect.top < finishRect.top + finishRect.height &&
        penguinRect.top + penguinRect.height > finishRect.top) {
        if (randomMode) {
            let timeTaken = (new Date() - startTime) / 1000;
            message.innerText = `Congratulations! You completed the random level in ${timeTaken.toFixed(2)} seconds!`;
            randomMode = false;
        } else {
            message.innerText = 'Congratulations! You finished the level!';
            currentLevel++;
            if (currentLevel < levels.length) {
                loadLevel(currentLevel);
            } else {
                message.innerText = 'Congratulations! You finished all levels!';
                clearInterval(timer);
            }
        }
    }
}

function gameLoop() {
    if (keys['ArrowLeft'] || keys['a']) {
        movePenguin(-moveSpeed, 0);
    }
    if (keys['ArrowRight'] || keys['d']) {
        movePenguin(moveSpeed, 0);
    }
    if ((keys['ArrowUp'] || keys['w']) && !isJumping) {
        isJumping = true;
        jumpSpeed = -15;
    }
    applyGravity();
    checkCollisions();
}

timer = setInterval(gameLoop, 20);
