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
        finish: { top: 500, left: 700 },
        message: 'Level 2: Japan'
    },
    {
        backgroundImage: '/images/place3.png',
        obstacles: [
            { top: 100, left: 100 },
            { top: 200, left: 300 },
            { top: 300, left: 500 }
        ],
        finish: { top: 500, left: 700 },
        message: 'Level 3: UK'
    },
    {
        backgroundImage: '/images/place4.png',
        obstacles: [
            { top: 150, left: 250 },
            { top: 250, left: 450 },
            { top: 350, left: 650 }
        ],
        finish: { top: 500, left: 700 },
        message: 'Level 4: USA'
    },
    {
        backgroundImage: '/images/place5.png',
        obstacles: [
            { top: 100, left: 200 },
            { top: 200, left: 400 },
            { top: 300, left: 600 }
        ],
        finish: { top: 500, left: 700 },
        message: 'Level 5: Dubai'
    },
    {
        backgroundImage: '/images/place6.png',
        obstacles: [
            { top: 150, left: 150 },
            { top: 250, left: 350 },
            { top: 350, left: 550 }
        ],
        finish: { top: 500, left: 700 },
        message: 'Level 6: Antarctica'
    }
];

function loadLevel(levelIndex) {
    const level = levels[levelIndex];
    container.style.backgroundImage = `url(${level.backgroundImage})`;
    message.innerText = level.message;

    // Position obstacles
    const obstacles = document.querySelectorAll('.obstacle');
    obstacles.forEach((obstacle, index) => {
        obstacle.style.top = level.obstacles[index].top + 'px';
        obstacle.style.left = level.obstacles[index].left + 'px';
    });

    // Position finish line
    finish.style.top = level.finish.top + 'px';
    finish.style.left = level.finish.left + 'px';
}

document.addEventListener('keydown', function(event) {
    let rect = penguin.getBoundingClientRect();
    let containerRect = container.getBoundingClientRect();
    switch(event.key) {
        case 'ArrowUp':
            if (rect.top > containerRect.top) penguin.style.top = rect.top - 10 + 'px';
            break;
        case 'ArrowDown':
            if (rect.bottom < containerRect.bottom) penguin.style.top = rect.top + 10 + 'px';
            break;
        case 'ArrowLeft':
            if (rect.left > containerRect.left) penguin.style.left = rect.left - 10 + 'px';
            break;
        case 'ArrowRight':
            if (rect.right < containerRect.right) penguin.style.left = rect.left + 10 + 'px';
            break;
    }
    checkCollision();
});

function checkCollision() {
    let penguinRect = penguin.getBoundingClientRect();
    let obstacles = document.getElementsByClassName('obstacle');

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
    penguin.style.top = '250px';
}

// Load the first level initially
loadLevel(currentLevel);
