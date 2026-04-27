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

// Handle Image File Selection
document.addEventListener("DOMContentLoaded", () => {
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
    
    // Existing initialization...
    updateDDay();

    // Observe all sections for animation
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Make hero section visible immediately
    const hero = document.querySelector('.hero-section');
    if (hero) hero.classList.add('visible');
});
