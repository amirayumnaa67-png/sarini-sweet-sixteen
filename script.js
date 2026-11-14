
// OPEN WEBSITE
function openWebsite() {
    document.getElementById("opening").style.display = "none";
    document.getElementById("mainContent").classList.remove("hidden");
    launchConfetti();
}

// MUSIC PLAYER
const music = document.getElementById("birthdayMusic");
const musicButton = document.getElementById("musicButton");

function toggleMusic() {
    if (music.paused) {
        music.play().then(() => {
            musicButton.textContent = "♫ Pause Music";
        }).catch(() => {
            musicButton.textContent = "Music unavailable";
        });
    } else {
        music.pause();
        musicButton.textContent = "♫ Play Music";
    }
}

// COUNTDOWN
const birthdayDate = new Date("2026-11-29T00:00:00+07:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = birthdayDate - now;

    if (distance <= 0) {
        document.getElementById("days").textContent = "00";
        document.getElementById("hours").textContent = "00";
        document.getElementById("minutes").textContent = "00";
        document.getElementById("seconds").textContent = "00";
        return;
    }

    document.getElementById("days").textContent =
        Math.floor(distance / (1000 * 60 * 60 * 24));

    document.getElementById("hours").textContent =
        Math.floor((distance / (1000 * 60 * 60)) % 24);

    document.getElementById("minutes").textContent =
        Math.floor((distance / (1000 * 60)) % 60);

    document.getElementById("seconds").textContent =
        Math.floor((distance / 1000) % 60);
}

updateCountdown();
setInterval(updateCountdown, 1000);

// BLOW CANDLE
function blowCandle() {
    document.getElementById("flame").classList.add("off");
    document.getElementById("wishText").textContent =
        "Your wish deserves to come true. Happy Sweet Sixteen! ♡";
    launchConfetti();
}

// SPECIAL MESSAGE
function openLetter() {
    document.getElementById("letterModal").classList.add("show");
}

function closeLetter() {
    document.getElementById("letterModal").classList.remove("show");
}

// PHOTO GALLERY
function showPhoto(source) {
    document.getElementById("expandedPhoto").src = source;
    document.getElementById("photoModal").classList.add("show");
}

function closePhoto() {
    document.getElementById("photoModal").classList.remove("show");
}

// CLOSE MODAL WITH ESCAPE
document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        closeLetter();
        closePhoto();
    }
});

// CONFETTI
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function launchConfetti() {
    const colors = ["#e99eae", "#ffc6d0", "#f8dcae", "#d77e94", "#ffffff"];

    for (let i = 0; i < 100; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: -20 - Math.random() * canvas.height,
            size: Math.random() * 7 + 4,
            speed: Math.random() * 3 + 2,
            color: colors[Math.floor(Math.random() * colors.length)],
            rotation: Math.random() * 360
        });
    }
}

function animateConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle) => {
        particle.y += particle.speed;
        particle.rotation += 3;

        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate(particle.rotation * Math.PI / 180);
        ctx.fillStyle = particle.color;
        ctx.fillRect(-particle.size / 2, -particle.size / 2,
            particle.size, particle.size);
        ctx.restore();
    });

    particles = particles.filter(p => p.y < canvas.height + 20);

    requestAnimationFrame(animateConfetti);
}

animateConfetti();
