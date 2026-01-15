// ==========================================
// INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
// ==========================================

// Create observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add staggered delay for multiple items
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 100);
        }
    });
}, observerOptions);

// Observe all elements with data-animate attribute
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('[data-animate]');
    animatedElements.forEach(el => observer.observe(el));

    // Observe message card
    const messageCard = document.querySelector('.message-card');
    if (messageCard) observer.observe(messageCard);
});

// ==========================================
// HERO SECTION - FLOATING HEARTS ANIMATION
// ==========================================

const heartsCanvas = document.getElementById('hearts-canvas');
const ctx = heartsCanvas.getContext('2d');

// Set canvas size
function resizeCanvas() {
    heartsCanvas.width = window.innerWidth;
    heartsCanvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Heart particles
class Heart {
    constructor() {
        this.x = Math.random() * heartsCanvas.width;
        this.y = heartsCanvas.height + Math.random() * 100;
        this.size = Math.random() * 20 + 10;
        this.speed = Math.random() * 1 + 0.5;
        this.opacity = Math.random() * 0.5 + 0.3;
        this.swing = Math.random() * 2 - 1;
    }

    update() {
        this.y -= this.speed;
        this.x += Math.sin(this.y * 0.01) * this.swing;

        // Reset when heart goes off screen
        if (this.y < -50) {
            this.y = heartsCanvas.height + 50;
            this.x = Math.random() * heartsCanvas.width;
        }
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = '#ffffff';
        ctx.font = `${this.size}px Arial`;
        ctx.fillText('❤️', this.x, this.y);
        ctx.restore();
    }
}

// Create hearts
const hearts = [];
for (let i = 0; i < 20; i++) {
    hearts.push(new Heart());
}

// Animate hearts
function animateHearts() {
    ctx.clearRect(0, 0, heartsCanvas.width, heartsCanvas.height);
    hearts.forEach(heart => {
        heart.update();
        heart.draw();
    });
    requestAnimationFrame(animateHearts);
}
animateHearts();



// ==========================================
// SURPRISE SECTION
// ==========================================

const surpriseBtn = document.getElementById('surprise-btn');
const surpriseContent = document.getElementById('surprise-content');
const confettiCanvas = document.getElementById('confetti-canvas');
const confettiCtx = confettiCanvas.getContext('2d');

// Set confetti canvas size
function resizeConfettiCanvas() {
    confettiCanvas.width = confettiCanvas.offsetWidth;
    confettiCanvas.height = confettiCanvas.offsetHeight;
}
resizeConfettiCanvas();
window.addEventListener('resize', resizeConfettiCanvas);

// Confetti particle
class Confetti {
    constructor() {
        this.x = Math.random() * confettiCanvas.width;
        this.y = -10;
        this.size = Math.random() * 8 + 4;
        this.speedY = Math.random() * 3 + 2;
        this.speedX = Math.random() * 2 - 1;
        this.color = this.randomColor();
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 10 - 5;
    }

    randomColor() {
        const colors = ['#FF4191', '#E90074', '#FFF078', '#ffe4ec'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.rotation += this.rotationSpeed;

        if (this.y > confettiCanvas.height) {
            return false; // Remove this confetti
        }
        return true;
    }

    draw() {
        confettiCtx.save();
        confettiCtx.translate(this.x, this.y);
        confettiCtx.rotate(this.rotation * Math.PI / 180);
        confettiCtx.fillStyle = this.color;
        confettiCtx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
        confettiCtx.restore();
    }
}

// Floating hearts for surprise
class FloatingHeart {
    constructor() {
        this.x = Math.random() * confettiCanvas.width;
        this.y = confettiCanvas.height + 20;
        this.size = Math.random() * 30 + 20;
        this.speed = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.5 + 0.5;
        this.swing = Math.random() * 3 - 1.5;
    }

    update() {
        this.y -= this.speed;
        this.x += Math.sin(this.y * 0.02) * this.swing;

        if (this.y < -50) {
            return false;
        }
        return true;
    }

    draw() {
        confettiCtx.save();
        confettiCtx.globalAlpha = this.opacity;
        confettiCtx.font = `${this.size}px Arial`;
        confettiCtx.fillText('❤️', this.x, this.y);
        confettiCtx.restore();
    }
}

// Floating Emoji class for surprise
class FloatingEmoji {
    constructor() {
        this.x = Math.random() * confettiCanvas.width;
        this.y = confettiCanvas.height + 20;
        this.size = Math.random() * 40 + 30;
        this.speed = Math.random() * 2 + 1.5;
        this.opacity = Math.random() * 0.5 + 0.5;
        this.swing = Math.random() * 4 - 2;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 5 - 2.5;
        // Mix of laughing and heart emojis
        this.emoji = ['😂', '🤣', '😆', '💖', '💕', '❤️'][Math.floor(Math.random() * 6)];
    }

    update() {
        this.y -= this.speed;
        this.x += Math.sin(this.y * 0.02) * this.swing;
        this.rotation += this.rotationSpeed;

        if (this.y < -50) {
            return false;
        }
        return true;
    }

    draw() {
        confettiCtx.save();
        confettiCtx.globalAlpha = this.opacity;
        confettiCtx.translate(this.x, this.y);
        confettiCtx.rotate(this.rotation * Math.PI / 180);
        confettiCtx.font = `${this.size}px Arial`;
        confettiCtx.textAlign = 'center';
        confettiCtx.textBaseline = 'middle';
        confettiCtx.fillText(this.emoji, 0, 0);
        confettiCtx.restore();
    }
}

let confettiParticles = [];
let floatingHearts = [];
let floatingEmojis = [];
let animationId = null;

function animateConfetti() {
    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

    // Update and draw confetti
    confettiParticles = confettiParticles.filter(particle => {
        const alive = particle.update();
        if (alive) particle.draw();
        return alive;
    });

    // Update and draw hearts
    floatingHearts = floatingHearts.filter(heart => {
        const alive = heart.update();
        if (alive) heart.draw();
        return alive;
    });

    // Update and draw emojis
    floatingEmojis = floatingEmojis.filter(emoji => {
        const alive = emoji.update();
        if (alive) emoji.draw();
        return alive;
    });

    // Continue animation if there are particles
    if (confettiParticles.length > 0 || floatingHearts.length > 0 || floatingEmojis.length > 0) {
        animationId = requestAnimationFrame(animateConfetti);
    }
}

function createConfetti() {
    // Create confetti burst
    for (let i = 0; i < 150; i++) {
        confettiParticles.push(new Confetti());
    }

    // Create floating hearts
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            floatingHearts.push(new FloatingHeart());
        }, i * 100);
    }

    // Create floating emojis (laughing and hearts)
    for (let i = 0; i < 40; i++) {
        setTimeout(() => {
            floatingEmojis.push(new FloatingEmoji());
        }, i * 80);
    }

    // Start animation
    if (animationId) cancelAnimationFrame(animationId);
    animateConfetti();
}

// Surprise button click
let surpriseRevealed = false;
surpriseBtn.addEventListener('click', () => {
    if (!surpriseRevealed) {
        surpriseContent.classList.add('revealed');
        surpriseBtn.style.display = 'none';
        createConfetti();
        surpriseRevealed = true;
    }
});

// ==========================================
// SMOOTH SCROLLING FOR NAVIGATION
// ==========================================

// Smooth scroll to sections (if you add navigation links)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==========================================
// TYPEWRITER EFFECT (Optional)
// ==========================================

// Uncomment this section if you want a typewriter effect for the love message
/*
const messageText = document.querySelector('.message-text');
if (messageText && messageText.classList.contains('typewriter')) {
    const text = messageText.textContent;
    messageText.textContent = '';
    messageText.style.opacity = '1';
    
    let index = 0;
    function typeWriter() {
        if (index < text.length) {
            messageText.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, 30);
        }
    }
    
    // Start typewriter when element is visible
    const typewriterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                typeWriter();
                typewriterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    typewriterObserver.observe(messageText);
}
*/

// ==========================================
// ADDITIONAL MICRO-INTERACTIONS
// ==========================================

// Add subtle parallax effect to hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / window.innerHeight);
    }
});

// Add hover effect to memory cards
document.querySelectorAll('.memory-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ==========================================
// SPARKLE CURSOR EFFECT
// ==========================================

class Sparkle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 4 + 2;
        this.speedX = (Math.random() - 0.5) * 2;
        this.speedY = (Math.random() - 0.5) * 2;
        this.life = 1;
        this.decay = Math.random() * 0.02 + 0.01;
        this.color = ['#FF4191', '#E90074', '#FFF078'][Math.floor(Math.random() * 3)];
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= this.decay;
        return this.life > 0;
    }

    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.life;
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

const sparkles = [];
let sparkleCanvas, sparkleCtx;

// Create sparkle canvas
function createSparkleCanvas() {
    sparkleCanvas = document.createElement('canvas');
    sparkleCanvas.style.position = 'fixed';
    sparkleCanvas.style.top = '0';
    sparkleCanvas.style.left = '0';
    sparkleCanvas.style.width = '100%';
    sparkleCanvas.style.height = '100%';
    sparkleCanvas.style.pointerEvents = 'none';
    sparkleCanvas.style.zIndex = '9999';
    document.body.appendChild(sparkleCanvas);

    sparkleCanvas.width = window.innerWidth;
    sparkleCanvas.height = window.innerHeight;
    sparkleCtx = sparkleCanvas.getContext('2d');

    window.addEventListener('resize', () => {
        sparkleCanvas.width = window.innerWidth;
        sparkleCanvas.height = window.innerHeight;
    });
}

createSparkleCanvas();

// Add sparkles on mouse move
document.addEventListener('mousemove', (e) => {
    for (let i = 0; i < 2; i++) {
        sparkles.push(new Sparkle(e.clientX, e.clientY));
    }
});

// Animate sparkles
function animateSparkles() {
    sparkleCtx.clearRect(0, 0, sparkleCanvas.width, sparkleCanvas.height);

    for (let i = sparkles.length - 1; i >= 0; i--) {
        const alive = sparkles[i].update();
        if (alive) {
            sparkles[i].draw(sparkleCtx);
        } else {
            sparkles.splice(i, 1);
        }
    }

    requestAnimationFrame(animateSparkles);
}

animateSparkles();

// Console message (Easter egg)
console.log('%c❤️ Happy Birthday! ❤️', 'color: #E90074; font-size: 24px; font-weight: bold;');
console.log('%cMade with love 💕', 'color: #FF4191; font-size: 16px;');

// ==========================================
// WORDLE GAME
// ==========================================

const WORD_LENGTH = 7;
const MAX_GUESSES = 5;
const TARGET_WORD = 'COBBLER';

let currentRow = 0;
let currentTile = 0;
let gameOver = false;
let guesses = [];

// Initialize Wordle grid
function initWordleGrid() {
    const grid = document.getElementById('wordle-grid');
    if (!grid) return;

    grid.innerHTML = '';

    for (let i = 0; i < MAX_GUESSES; i++) {
        const row = document.createElement('div');
        row.className = 'wordle-row';
        row.id = `row-${i}`;

        for (let j = 0; j < WORD_LENGTH; j++) {
            const tile = document.createElement('div');
            tile.className = 'wordle-tile';
            tile.id = `tile-${i}-${j}`;
            row.appendChild(tile);
        }

        grid.appendChild(row);
    }
}

// Handle keyboard input
function handleWordleKey(key) {
    if (gameOver) return;

    if (key === 'Enter') {
        submitGuess();
    } else if (key === 'Backspace') {
        deleteLetter();
    } else if (key.length === 1 && key.match(/[a-z]/i)) {
        addLetter(key.toUpperCase());
    }
}

function addLetter(letter) {
    if (currentTile < WORD_LENGTH) {
        const tile = document.getElementById(`tile-${currentRow}-${currentTile}`);
        tile.textContent = letter;
        tile.classList.add('filled');
        currentTile++;
    }
}

function deleteLetter() {
    if (currentTile > 0) {
        currentTile--;
        const tile = document.getElementById(`tile-${currentRow}-${currentTile}`);
        tile.textContent = '';
        tile.classList.remove('filled');
    }
}

function submitGuess() {
    if (currentTile !== WORD_LENGTH) {
        showWordleMessage('Not enough letters!');
        shakeRow(currentRow);
        return;
    }

    // Get the guess
    let guess = '';
    for (let i = 0; i < WORD_LENGTH; i++) {
        const tile = document.getElementById(`tile-${currentRow}-${i}`);
        guess += tile.textContent;
    }

    guesses.push(guess);

    // Check the guess
    checkGuess(guess, currentRow);

    // Check win condition
    if (guess === TARGET_WORD) {
        gameOver = true;
        setTimeout(() => {
            showWordleMessage('🎉 You got it! COBBLER! 💖');
            celebrateWin();
            setTimeout(transitionToMainContent, 3000);
        }, 1500);
        return;
    }

    // Move to next row
    currentRow++;
    currentTile = 0;

    // Check lose condition
    if (currentRow >= MAX_GUESSES) {
        gameOver = true;
        setTimeout(() => {
            showWordleMessage(`The word was COBBLER! 💕`);
            setTimeout(transitionToMainContent, 3000);
        }, 1500);
    }
}

function checkGuess(guess, row) {
    const letterCount = {};
    const tiles = [];
    const keyStates = {};

    // Count letters in target word
    for (let letter of TARGET_WORD) {
        letterCount[letter] = (letterCount[letter] || 0) + 1;
    }

    // First pass: mark correct letters
    for (let i = 0; i < WORD_LENGTH; i++) {
        const tile = document.getElementById(`tile-${row}-${i}`);
        const letter = guess[i];
        tiles.push({ tile, letter, state: 'absent' });

        if (letter === TARGET_WORD[i]) {
            tiles[i].state = 'correct';
            letterCount[letter]--;
            keyStates[letter] = 'correct';
        }
    }

    // Second pass: mark present letters
    for (let i = 0; i < WORD_LENGTH; i++) {
        const letter = guess[i];

        if (tiles[i].state === 'correct') continue;

        if (TARGET_WORD.includes(letter) && letterCount[letter] > 0) {
            tiles[i].state = 'present';
            letterCount[letter]--;
            if (keyStates[letter] !== 'correct') {
                keyStates[letter] = 'present';
            }
        } else {
            if (!keyStates[letter]) {
                keyStates[letter] = 'absent';
            }
        }
    }

    // Apply colors with animation delay
    tiles.forEach((item, index) => {
        setTimeout(() => {
            item.tile.classList.add(item.state);
            if (item.state === 'correct') {
                item.tile.classList.add('win');
            }
        }, index * 300);
    });

    // Update keyboard colors
    setTimeout(() => {
        updateKeyboard(keyStates);
    }, WORD_LENGTH * 300);
}

function updateKeyboard(keyStates) {
    for (let letter in keyStates) {
        const key = document.querySelector(`.key[data-key="${letter}"]`);
        if (key) {
            // Only update if new state is better
            const currentState = key.classList.contains('correct') ? 'correct' :
                key.classList.contains('present') ? 'present' : 'absent';

            if (keyStates[letter] === 'correct' ||
                (keyStates[letter] === 'present' && currentState !== 'correct')) {
                key.classList.remove('correct', 'present', 'absent');
                key.classList.add(keyStates[letter]);
            } else if (keyStates[letter] === 'absent' && currentState === 'absent') {
                key.classList.add('absent');
            }
        }
    }
}

function shakeRow(row) {
    const rowElement = document.getElementById(`row-${row}`);
    rowElement.classList.add('shake');
    setTimeout(() => rowElement.classList.remove('shake'), 500);
}

function showWordleMessage(message) {
    const messageEl = document.getElementById('wordle-message');
    if (messageEl) {
        messageEl.textContent = message;
        setTimeout(() => {
            if (messageEl.textContent === message) {
                messageEl.textContent = '';
            }
        }, 2000);
    }
}

function celebrateWin() {
    // Add bounce animation to winning row
    for (let i = 0; i < WORD_LENGTH; i++) {
        const tile = document.getElementById(`tile-${currentRow}-${i}`);
        setTimeout(() => {
            tile.classList.add('win');
        }, i * 100);
    }
}

function transitionToMainContent() {
    const wordleScreen = document.getElementById('wordle-game');
    const mainContent = document.getElementById('main-content');

    if (wordleScreen && mainContent) {
        wordleScreen.classList.add('fade-out');
        mainContent.classList.remove('hidden');

        // Re-trigger hero animation
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.animation = 'none';
            heroContent.offsetHeight;
            heroContent.style.animation = 'fadeInUp 1.5s ease-out';
        }
    }
}

// Event listeners for Wordle
document.addEventListener('DOMContentLoaded', () => {
    // Physical keyboard
    document.addEventListener('keydown', (e) => {
        if (!document.getElementById('wordle-game').classList.contains('hidden')) {
            handleWordleKey(e.key);
        }
    });

    // Virtual keyboard
    document.querySelectorAll('.key').forEach(key => {
        key.addEventListener('click', () => {
            const keyValue = key.getAttribute('data-key');
            handleWordleKey(keyValue);
        });
    });
});

// ==========================================
// WELCOME SCREEN INTERACTION
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    const welcomeScreen = document.getElementById('welcome-screen');
    const wordleGame = document.getElementById('wordle-game');
    const mainContent = document.getElementById('main-content');
    const btnYes = document.querySelector('.btn-yes');
    const btnDefinitely = document.querySelector('.btn-definitely');

    function revealContent() {
        if (!welcomeScreen || !wordleGame) return;

        // Fade out welcome screen
        welcomeScreen.classList.add('fade-out');

        // Show Wordle game
        setTimeout(() => {
            wordleGame.classList.remove('hidden');
            initWordleGrid();
        }, 800);
    }

    if (btnYes) btnYes.addEventListener('click', revealContent);
    if (btnDefinitely) btnDefinitely.addEventListener('click', revealContent);
});
