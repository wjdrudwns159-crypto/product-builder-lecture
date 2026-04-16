const generateBtn = document.getElementById('generate-btn');
const numbersDisplay = document.querySelector('.numbers-display');
const themeToggle = document.getElementById('theme-toggle');

// Lotto Generation Logic
function generateLottoNumbers() {
    const numbers = new Set();
    while (numbers.size < 6) {
        const randomNumber = Math.floor(Math.random() * 45) + 1;
        numbers.add(randomNumber);
    }
    return Array.from(numbers).sort((a, b) => a - b);
}

function getBallColor(number) {
    if (number <= 10) return '#fbc400'; // Yellow
    if (number <= 20) return '#69c8f2'; // Blue
    if (number <= 30) return '#ff7272'; // Red
    if (number <= 40) return '#aaa';    // Gray
    return '#b0d840';      // Green
}

function displayNumbers(numbers) {
    numbersDisplay.innerHTML = '';
    numbers.forEach((number, index) => {
        setTimeout(() => {
            const ball = document.createElement('div');
            ball.classList.add('number-ball');
            ball.textContent = number;
            ball.style.backgroundColor = getBallColor(number);
            ball.style.transform = 'scale(0)';
            numbersDisplay.appendChild(ball);
            setTimeout(() => {
                ball.style.transform = 'scale(1)';
            }, 50); 
        }, index * 200);
    });
}

generateBtn.addEventListener('click', () => {
    const lottoNumbers = generateLottoNumbers();
    displayNumbers(lottoNumbers);
});

// Theme Toggle Logic
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    themeToggle.textContent = theme === 'dark' ? '☀️' : '🌓';
}

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
});

// Initialize Theme
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(savedTheme);
}

initializeTheme();