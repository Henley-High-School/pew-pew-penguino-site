let penguin = document.getElementById('penguin');
let finish = document.getElementById('finish');
let container = document.getElementById('game-container');
let message = document.getElementById('message');
let isJumping = false;
let canDoubleJump = true;
let jumpSpeed = 0;
const gravity = 1;
const moveSpeed = 5;
let keys = {};
let randomMode = false;
let currentLevel = 0;
let timer;

// Movement function for the penguin
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

// Apply gravity to the penguin
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
            canDoubleJump = true;
        }

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
                canDoubleJump = true;
                break;
            }
        }
    } else {
        let newY = penguinRect.top + gravity - containerRect.top;
        penguin.style.top = newY + 'px';

        if (penguinRect.bottom + gravity >= containerRect.bottom) {
            penguin.style.top = (containerRect.bottom - penguinRect.height - containerRect.top) + 'px';
        }

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

// Check for collisions with obstacles, platforms, and the finish line
function checkCollisions() {
    let penguinRect = penguin.getBoundingClientRect();
    let containerRect = container.getBoundingClientRect();

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

    let barriers = document.getElementsByClassName('barrier');
    for (let barrier of barriers) {
        let barrierRect = barrier.getBoundingClientRect();
        if (penguinRect.left < barrierRect.left + barrierRect.width &&
            penguinRect.left + penguinRect.width > barrierRect.left &&
            penguinRect.top < barrierRect.top + barrierRect.height &&
            penguinRect.top + penguinRect.height > barrierRect.top) {
            penguin.style.left = '20px';
            penguin.style.top = '550px';
            break;
        }
    }

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

// Update positions of moving platforms
function updateMovingPlatforms() {
    platformsData.forEach(platformData => {
        let rect = platformData.element.getBoundingClientRect();
        let containerRect = container.getBoundingClientRect();

        let newX = rect.left - containerRect.left + platformData.dx;
        let newY = rect.top - containerRect.top + platformData.dy;

        if (newX < 0 || newX + rect.width > containerRect.width) {
            platformData.dx *= -1;
        }
        if (newY < 0 || newY + rect.height > containerRect.height) {
            platformData.dy *= -1;
        }

        platformData.element.style.left = (newX + platformData.dx) + 'px';
        platformData.element.style.top = (newY + platformData.dy) + 'px';
    });
}

// Game loop function
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
    } else if ((keys['ArrowUp'] || keys['w']) && isJumping && canDoubleJump) {
        jumpSpeed = -15;
        canDoubleJump = false;
    }
    applyGravity();
    checkCollisions();
    updateMovingPlatforms();
}

// Start or restart game
function startGame() {
    document.getElementById('menu').style.display = 'none';
    container.style.display = 'block';
    loadLevel(currentLevel);
    timer = setInterval(gameLoop, 20);
}

// Random mode for generating levels
function startRandomMode() {
    randomMode = true;
    startGame();
}

// Event listeners for buttons
document.getElementById('start-game-button').addEventListener('click', startGame);
document.getElementById('random-mode-button').addEventListener('click', startRandomMode);

// Handle key presses
document.addEventListener('keydown', function(event) {
    event.preventDefault();
    keys[event.key] = true;
});

document.addEventListener('keyup', function(event) {
    keys[event.key] = false;
});

// Load levels function
function loadLevel(levelIndex) {
    const level = randomMode ? generateRandomLevel(5 + levelIndex, 3 + levelIndex, [500, 700]) : levels[levelIndex];
    container.style.backgroundImage = `url(${level.backgroundImage})`;
    message.innerText = level.message;

    // Remove previous obstacles, platforms, and barriers
    document.querySelectorAll('.obstacle').forEach(obstacle => obstacle.remove());
    document.querySelectorAll('.platform').forEach(platform => platform.remove());
    document.querySelectorAll('.barrier').forEach(barrier => barrier.remove());

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
        platformsData.push({ element: platform, dx: random(-1, 1), dy: random(-1, 1) });
    });

    // Add barriers
    level.barriers.forEach(pos => {
        let barrier = document.createElement('div');
        barrier.classList.add('barrier');
        barrier.style.top = pos.top + 'px';
        barrier.style.left = pos.left + 'px';
        container.appendChild(barrier);
    });
}

// Generate random levels (for random mode)
function generateRandomLevel(numObstacles, numPlatforms, sizeRange) {
    let obstacles = [];
    let platforms = [];
    let barriers = [];
    
    for (let i = 0; i < numObstacles; i++) {
        obstacles.push({
            top: Math.random() * (container.clientHeight - 20),
            left: Math.random() * (container.clientWidth - 100)
        });
    }
    
    for (let i = 0; i < numPlatforms; i++) {
        platforms.push({
            top: Math.random() * (container.clientHeight - 20),
            left: Math.random() * (container.clientWidth - 100)
        });
    }
    
    for (let i = 0; i < numObstacles; i++) {
        barriers.push({
            top: Math.random() * (container.clientHeight - 100),
            left: Math.random() * (container.clientWidth - 50)
        });
    }

    return {
        backgroundImage: '/images/background.jpg',
        message: 'Random level generated!',
        obstacles,
        platforms,
        barriers
    };
}

// Example levels (for non-random mode)
const levels = [
    {
        backgroundImage: '/images/background1.jpg',
        message: 'Welcome to Level 1!',
        obstacles: [{ top: 200, left: 300 }],
        platforms: [{ top: 400, left: 150 }],
        barriers: [{ top: 500, left: 500 }]
    },
    {
        backgroundImage: '/images/background2.jpg',
        message: 'Welcome to Level 2!',
        obstacles: [{ top: 100, left: 200 }],
        platforms: [{ top: 300, left: 100 }],
        barriers: [{ top: 400, left: 400 }]
    }
];

// Utility function to get random value
function random(min, max) {
    return Math.random() * (max - min) + min;
}
