const birthdayDate = new Date();
birthdayDate.setMonth(6); // July (0-indexed)
birthdayDate.setDate(28);
birthdayDate.setHours(1, 3, 0, 0); // 01:03 AM on 28th July

function isBirthdayToday() {
    const now = new Date();
    return now.getDate() === 28 && now.getMonth() === 6;
}

function showBirthdayContent() {
    const countdown = document.getElementById('countdown');
    const message = document.getElementById('countdown-message');
    const content = document.getElementById('content');

    message.innerHTML = "It's 28th July!";
    message.style.fontSize = '3em';
    message.style.fontWeight = 'bold';
    countdown.style.background = 'none';
    countdown.style.color = '#ff66b2';
    countdown.style.textShadow = 'none';

    content.style.display = 'block';

    startFireworks();
    animateCountdownLoop();
}

function animateCountdownLoop() {
    const countdown = document.getElementById('countdown-message');
    let toggle = true;
    setInterval(() => {
        countdown.style.transform = toggle ? 'scale(1.1)' : 'scale(1)';
        countdown.style.transition = 'transform 0.6s ease-in-out';
        toggle = !toggle;
    }, 1000);
}

function updateCountdown() {
    const now = new Date();
    const distance = birthdayDate.getTime() - now.getTime();

    if (isBirthdayToday()) {
        showBirthdayContent(); // Always show on July 28
        return;
    }

    if (distance < 0) {
        document.getElementById('countdown-message').innerHTML = "It's 28th July!";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('countdown-message').innerHTML =
        days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
}

function startFireworks() {
    const canvas = document.getElementById('fireworks');
    const fireworks = new Fireworks(canvas, {
        speed: 2,
        acceleration: 1.05,
        friction: 0.98,
        particles: 150,
        duration: 3000,
        opacity: 0.8,
        colors: ['#ff66b2', '#ff3385', '#ffccff']
    });
    fireworks.start();

    // Restart fireworks every few seconds
    setInterval(() => {
        fireworks.stop();
        setTimeout(() => fireworks.start(), 100);
    }, 6000);
}

// Begin countdown loop
setInterval(updateCountdown, 1000);
updateCountdown();
