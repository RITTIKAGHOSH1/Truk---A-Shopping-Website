// ---------------- Countdown Timer ----------------
const targetDateTime = new Date("May 31, 2026 15:00:00").getTime();

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

const countdownInterval = setInterval(updateCountdown, 1000);


// ---------------- User Login/Logout Display ----------------
document.addEventListener("DOMContentLoaded", () => {
  const navSignin = document.querySelector(".nav-signin");
  const loginLink = document.querySelector(".nav-signin + .border a");
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.name) {
    const fullName = user.name;
    const firstName = fullName.split(" ")[0];

    navSignin.style.display = "flex";
    navSignin.style.alignItems = "center";
    navSignin.style.gap = "5px";

    if (user.profilePic) {
      navSignin.innerHTML = `
        <img src="${user.profilePic}" 
             alt="User" 
             style="width:45px; height:45px; border-radius:50%;">
        <span>Hi, ${firstName}</span>
      `;
    } else {
      navSignin.innerHTML = `
        <i class="fa-solid fa-user" style="font-size:17px;"></i>
        <span style="font-size:17px;">Hi, ${firstName}</span>
      `;
    }

    if (loginLink) {
      loginLink.textContent = "Logout";
      loginLink.removeAttribute("href");
      loginLink.style.cursor = "pointer";

      loginLink.addEventListener("click", () => {
        localStorage.removeItem("user");
        loginLink.textContent = "Login";
        loginLink.setAttribute("href", "/Authentication/index.html");
        navSignin.innerHTML = `<i class="fa-solid fa-user"></i> Hello`;
        navSignin.style.display = "";
      });
    }
  }
});
