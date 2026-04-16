const URL = "https://teachablemachine.withgoogle.com/models/bgz2a2k4V/";

let model, labelContainer, maxPredictions;

const imageUpload = document.getElementById('image-upload');
const imagePreview = document.getElementById('image-preview');
const loading = document.getElementById('loading');
const uploadArea = document.getElementById('upload-area');
const themeToggle = document.getElementById('theme-toggle');

// Load the image model
async function init() {
    loading.style.display = 'block';
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions; i++) {
        const resultItem = document.createElement("div");
        resultItem.classList.add("result-item");
        resultItem.innerHTML = `
            <div class="label-wrapper">
                <span class="class-label"></span>
                <span class="probability-label"></span>
            </div>
            <div class="progress-bar-bg">
                <div class="progress-bar-fill" style="width: 0%"></div>
            </div>
        `;
        labelContainer.appendChild(resultItem);
    }
    loading.style.display = 'none';
}

async function predict() {
    const prediction = await model.predict(imagePreview);
    for (let i = 0; i < maxPredictions; i++) {
        const classPrediction = prediction[i].className;
        const probability = (prediction[i].probability * 100).toFixed(0);
        
        const item = labelContainer.childNodes[i];
        item.querySelector('.class-label').innerText = classPrediction;
        item.querySelector('.probability-label').innerText = probability + "%";
        item.querySelector('.progress-bar-fill').style.width = probability + "%";
    }
}

imageUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = async (event) => {
            imagePreview.src = event.target.result;
            imagePreview.style.display = 'block';
            if (!model) {
                await init();
            }
            await predict();
        };
        reader.readAsDataURL(file);
    }
});

// Drag and Drop support
uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.style.backgroundColor = 'rgba(76, 175, 80, 0.1)';
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.style.backgroundColor = 'transparent';
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.style.backgroundColor = 'transparent';
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
        imageUpload.files = e.dataTransfer.files;
        const event = new Event('change');
        imageUpload.dispatchEvent(event);
    }
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