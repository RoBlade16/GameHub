// Game Database
const games = [
    {
        id: 1,
        title: "Slope",
        category: "arcade",
        emoji: "🔴",
        description: "Roll a ball down an endless slope. Avoid obstacles!",
        url: "https://slope.lol"
    },
    {
        id: 2,
        title: "Flappy Bird",
        category: "arcade",
        emoji: "🐦",
        description: "Navigate the bird through pipes. Classic arcade game!",
        url: "https://www.youtube.com/embed/fQoJgUmzJWM"
    },
    {
        id: 3,
        title: "Chrome Dinosaur",
        category: "racing",
        emoji: "🦖",
        description: "Jump over obstacles in the desert. No internet required!",
        url: "https://chromedino.com"
    },
    {
        id: 4,
        title: "Pac-Man",
        category: "action",
        emoji: "👾",
        description: "Eat all the pellets while avoiding ghosts!",
        url: "https://www.youtube.com/embed/ouO02-tPZOU"
    },
    {
        id: 5,
        title: "Snake",
        category: "puzzle",
        emoji: "🐍",
        description: "Grow your snake without hitting yourself!",
        url: "https://www.youtube.com/embed/AkFqg5wAZ50"
    },
    {
        id: 6,
        title: "2048",
        category: "puzzle",
        emoji: "🔢",
        description: "Combine tiles to reach 2048. Addictive puzzle game!",
        url: "https://play2048.co"
    },
    {
        id: 7,
        title: "Tetris",
        category: "puzzle",
        emoji: "🧱",
        description: "Classic block-stacking game. Test your reflexes!",
        url: "https://www.youtube.com/embed/QQ5IyIAM_DM"
    },
    {
        id: 8,
        title: "Super Mario",
        category: "adventure",
        emoji: "🍄",
        description: "Jump through levels and save the princess!",
        url: "https://www.youtube.com/embed/i7L8s4C8eGw"
    },
    {
        id: 9,
        title: "Racing Game",
        category: "racing",
        emoji: "🏎️",
        description: "Speed down the track and beat your opponents!",
        url: "https://www.youtube.com/embed/DKQl55TFQNY"
    },
    {
        id: 10,
        title: "Dungeon Adventure",
        category: "adventure",
        emoji: "⚔️",
        description: "Explore dungeons and defeat monsters!",
        url: "https://www.youtube.com/embed/d6xB3jj4mTQ"
    },
    {
        id: 11,
        title: "Action Runner",
        category: "action",
        emoji: "🏃",
        description: "Run fast and collect coins while avoiding enemies!",
        url: "https://www.youtube.com/embed/PJqo0nXWw2o"
    },
    {
        id: 12,
        title: "Puzzle Master",
        category: "puzzle",
        emoji: "🎯",
        description: "Solve challenging puzzles and unlock new levels!",
        url: "https://www.youtube.com/embed/9CQjD-BG6UM"
    }
];

// DOM Elements
const gamesGrid = document.getElementById('gamesGrid');
const tabButtons = document.querySelectorAll('.tab-btn');
const gameModal = document.getElementById('gameModal');
const gameFrame = document.getElementById('gameFrame');
const closeBtn = document.querySelector('.close');

// Current Active Filter
let currentFilter = 'all';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderGames('all');
    setupEventListeners();
});

// Setup Event Listeners
function setupEventListeners() {
    tabButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            tabButtons.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentFilter = e.target.dataset.category;
            renderGames(currentFilter);
        });
    });

    closeBtn.addEventListener('click', closeModal);
    gameModal.addEventListener('click', (e) => {
        if (e.target === gameModal) closeModal();
    });
}

// Render Games
function renderGames(category) {
    gamesGrid.innerHTML = '';
    
    const filteredGames = category === 'all' 
        ? games 
        : games.filter(game => game.category === category);

    if (filteredGames.length === 0) {
        gamesGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: white; font-size: 1.2em;">No games found in this category.</p>';
        return;
    }

    filteredGames.forEach(game => {
        const gameCard = createGameCard(game);
        gamesGrid.appendChild(gameCard);
    });
}

// Create Game Card
function createGameCard(game) {
    const card = document.createElement('div');
    card.className = 'game-card';
    card.innerHTML = `
        <div class="game-image">${game.emoji}</div>
        <div class="game-info">
            <h3 class="game-title">${game.title}</h3>
            <span class="game-category">${capitalizeFirst(game.category)}</span>
            <p class="game-description">${game.description}</p>
            <button class="play-btn" onclick="openGame('${game.url}', '${game.title}')">Play Now</button>
        </div>
    `;
    return card;
}

// Open Game Modal
function openGame(url, title) {
    gameFrame.src = url;
    gameModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close Modal
function closeModal() {
    gameModal.style.display = 'none';
    gameFrame.src = '';
    document.body.style.overflow = 'auto';
}

// Utility Functions
function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Keyboard Support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});
