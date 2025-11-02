// Set the target date and time for the countdown
const targetDateTime = new Date("May 31, 2026 15:00:00").getTime();

// Function to calculate the remaining time and update the countdown display
function updateCountdown() {
    const currentTime = new Date().getTime();
    const timeRemaining = targetDateTime - currentTime;

    if (timeRemaining < 0) {
        clearInterval(countdownInterval);
        document.getElementById("countdown").innerHTML = "Sale is live!";
        return;
    }

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;
}

// Start the countdown
const countdownInterval = setInterval(updateCountdown, 1000);
