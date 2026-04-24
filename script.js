const birthdayDate = new Date();
birthdayDate.setMonth(6); // July
birthdayDate.setDate(28);
birthdayDate.setHours(1, 3, 0, 0);

let birthdayShown = false;
let fireworksStarted = false;

/* Romantic status messages */
const statusMessages = [
    "Forever loving you ❤️",
    "You are my sunshine ☀️",
    "Made with love by Rohan 💌",
    "Every day with you feels magical ✨",
    "Happy Birthday, my precious 🎂"
];

let statusIndex = 0;

/* Check if birthday is today */
function isBirthdayToday() {
    const now = new Date();
    return now.getDate() === 28 && now.getMonth() === 6;
}

/* Reveal content */
function showBirthdayContent() {
    if (birthdayShown) return;
    birthdayShown = true;

    const countdown = document.getElementById('countdown');
    const message = document.getElementById('countdown-message');
    const content = document.getElementById('content');

    message.innerHTML = "🎉 It's 28th July! 🎂";
    countdown.style.minHeight = "40vh";

    content.style.display = 'block';

    if (!fireworksStarted) {
        startFireworks();
        fireworksStarted = true;
    }

    animateCountdownLoop();
    rotateStatus();
}

/* Countdown pulse animation */
function animateCountdownLoop() {
    const countdown = document.getElementById('countdown-message');
    let toggle = true;

    setInterval(() => {
        countdown.style.transform = toggle ? 'scale(1.08)' : 'scale(1)';
        countdown.style.transition = 'transform 0.6s ease-in-out';
        toggle = !toggle;
    }, 1000);
}

/* Update countdown */
function updateCountdown() {
    const now = new Date();
    const distance = birthdayDate.getTime() - now.getTime();

    if (isBirthdayToday()) {
        showBirthdayContent();
        return;
    }

    if (distance < 0) {
        document.getElementById('countdown-message').innerHTML = "🎉 It's 28th July! 🎂";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('countdown-message').innerHTML =
        `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

/* Fireworks */
function startFireworks() {
    const canvas = document.getElementById('fireworks');

    const fireworks = new Fireworks.default(canvas, {
        speed: 2,
        acceleration: 1.05,
        friction: 0.98,
        gravity: 1.5,
        particles: 120,
        traceLength: 3,
        explosion: 6,
        autoresize: true,
        opacity: 0.8,
        colors: ['#ff66b2', '#ff3385', '#ffccff']
    });

    fireworks.start();

    setInterval(() => {
        fireworks.stop();
        setTimeout(() => fireworks.start(), 200);
    }, 8000);
}

/* Rotate live status */
function rotateStatus() {
    const liveStatus = document.getElementById("live-status");

    setInterval(() => {
        statusIndex = (statusIndex + 1) % statusMessages.length;
        liveStatus.style.opacity = 0;

        setTimeout(() => {
            liveStatus.innerText = statusMessages[statusIndex];
            liveStatus.style.opacity = 1;
        }, 500);
    }, 3000);
}

/* Start countdown */
setInterval(updateCountdown, 1000);
updateCountdown();
