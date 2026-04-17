// Party Date
const PARTY_DATE = new Date("2026-05-24T12:00:00").getTime();

// D-Day Counter
function updateDDay() {
    const now = new Date().getTime();
    const distance = PARTY_DATE - now;
    const ddayDisplay = document.getElementById("dday-timer");

    if (distance < 0) {
        if (ddayDisplay) ddayDisplay.innerText = "D-DAY";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    if (ddayDisplay) ddayDisplay.innerText = `D-${days}`;
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
    textArea.style.position = "fixed";  // Avoid scrolling to bottom
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
    updateDDay();

    // Observe all sections for animation
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Make hero section visible immediately
    const hero = document.querySelector('.hero-section');
    if (hero) hero.classList.add('visible');
});
