// Party Date
const PARTY_DATE = new Date("2026-05-16T14:00:00").getTime();

// Edit Mode Logic
let isEditMode = false;
let currentEditingImage = null;

window.toggleEditMode = function() {
    isEditMode = !isEditMode;
    const body = document.body;
    const btn = document.getElementById("edit-mode-btn");
    const images = document.querySelectorAll(".hero-image img, .gallery-item img");
    
    if (isEditMode) {
        body.classList.add("edit-mode-active");
        // Make all text elements editable
        document.querySelectorAll("h1, h2, h3, p, span, b, .venue, .address").forEach(el => {
            el.contentEditable = "true";
        });
        
        // Handle Image Clicks
        images.forEach(img => {
            img.addEventListener("click", handleImageClick);
        });

        btn.innerHTML = '<i class="fa-solid fa-check"></i> 편집 완료';
        btn.classList.add("active");
        alert("편집 모드가 활성화되었습니다. 텍스트를 클릭하여 수정하거나, 사진을 클릭하여 변경하세요.");
    } else {
        body.classList.remove("edit-mode-active");
        document.querySelectorAll("[contenteditable]").forEach(el => {
            el.contentEditable = "false";
        });

        // Remove Image Click Handlers
        images.forEach(img => {
            img.removeEventListener("click", handleImageClick);
        });

        btn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i> 편집 모드';
        btn.classList.remove("active");
        alert("편집이 완료되었습니다.");
    }
};

function handleImageClick(e) {
    if (!isEditMode) return;
    currentEditingImage = e.target;
    document.getElementById("image-upload-input").click();
}

// D-Day Counter
function updateDDay() {
    const now = new Date().getTime();
    const distance = PARTY_DATE - now;
    const ddayDisplay = document.getElementById("dday-timer");

    if (!ddayDisplay) return;

    if (distance < 0) {
        ddayDisplay.innerText = "D-DAY";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    ddayDisplay.innerText = `D-${days}`;
}

// Scroll Animation Observer
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Account Toggle (Global)
window.toggleAccount = function() {
    const accountInfo = document.getElementById("account-info");
    const btn = document.querySelector(".account-toggle-btn");
    
    if (accountInfo.style.display === "none") {
        accountInfo.style.display = "block";
        btn.innerText = "계좌정보 닫기";
    } else {
        accountInfo.style.display = "none";
        btn.innerText = "마음 전하실 곳 보기";
    }
};

// Copy to Clipboard (Global with Fallback)
window.copyText = function(text) {
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(() => {
            alert("계좌번호가 복사되었습니다.");
        }).catch(() => {
            fallbackCopyText(text);
        });
    } else {
        fallbackCopyText(text);
    }
};

function fallbackCopyText(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
        document.execCommand('copy');
        alert("계좌번호가 복사되었습니다.");
    } catch (err) {
        alert("복사에 실패했습니다. 직접 입력해 주세요.");
    }
    document.body.removeChild(textArea);
}

// Scroll to Top (Global)
window.scrollToTop = function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

// Scroll Events
window.addEventListener('scroll', () => {
    const goTopBtn = document.getElementById('go-top-btn');
    if (goTopBtn) {
        if (window.scrollY > 500) {
            goTopBtn.classList.add('visible');
        } else {
            goTopBtn.classList.remove('visible');
        }
    }
});

// Initialize
document.addEventListener("DOMContentLoaded", () => {
    // Handle Image File Selection
    const imageInput = document.getElementById("image-upload-input");
    if (imageInput) {
        imageInput.addEventListener("change", function(e) {
            const file = e.target.files[0];
            if (file && currentEditingImage) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    currentEditingImage.src = event.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }

    updateDDay();

    // Observe all sections for animation
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Make hero section visible immediately
    const hero = document.querySelector('.hero-section');
    if (hero) hero.classList.add('visible');
});
