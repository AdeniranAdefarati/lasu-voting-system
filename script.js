function registerUser() {

  let fullName = document.getElementById("fullName").value;
  let matricNumber = document.getElementById("matricNumber").value;
  let password = document.getElementById("password").value;

  if (fullName === "" || matricNumber === "" || password === "") {
    alert("Please fill all fields");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  let existingUser = users.find(user =>
    user.matricNumber === matricNumber
  );

  if (existingUser) {
    alert("This matric number has already been registered");
    return;
  }

  let newUser = {
    fullName: fullName,
    matricNumber: matricNumber,
    password: password,
    hasVoted: false
  };

  users.push(newUser);

  localStorage.setItem("users", JSON.stringify(users));

  alert("Registration successful. You can now login.");

  window.location.href = "index.html";
}

function loginUser() {

  let matricNumber = document.getElementById("loginMatric").value;
  let password = document.getElementById("loginPassword").value;

  let users = JSON.parse(localStorage.getItem("users")) || [];

  let user = users.find(user =>
    user.matricNumber === matricNumber &&
    user.password === password
  );

  if (!user) {
    alert("Invalid matric number or password");
    return;
  }

  localStorage.setItem("currentUser", JSON.stringify(user));

  window.location.href = "vote.html";
}

function voteCandidate(candidateName) {

  let currentUser = JSON.parse(localStorage.getItem("currentUser"));

  let users = JSON.parse(localStorage.getItem("users")) || [];

  if (!currentUser) {
    alert("Please login first");
    window.location.href = "index.html";
    return;
  }

  let userIndex = users.findIndex(user =>
    user.matricNumber === currentUser.matricNumber
  );

  if (users[userIndex].hasVoted === true) {
    alert("You have already voted.");
    return;
  }

  let votes = JSON.parse(localStorage.getItem("votes")) || {
    "Candidate A": 0,
    "Candidate B": 0,
    "Candidate C": 0
  };

  votes[candidateName]++;

  users[userIndex].hasVoted = true;

  currentUser.hasVoted = true;

  localStorage.setItem("votes", JSON.stringify(votes));
  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("currentUser", JSON.stringify(currentUser));

  alert(currentUser.fullName + ", your vote has been recorded!");
}

function showResults() {

  let votes = JSON.parse(localStorage.getItem("votes")) || {
    "Candidate A": 0,
    "Candidate B": 0,
    "Candidate C": 0
  };

  let a = votes["Candidate A"];
  let b = votes["Candidate B"];
  let c = votes["Candidate C"];

  let totalVotes = a + b + c;

  let percentA = totalVotes === 0
    ? 0
    : Math.round((a / totalVotes) * 100);

  let percentB = totalVotes === 0
    ? 0
    : Math.round((b / totalVotes) * 100);

  let percentC = totalVotes === 0
    ? 0
    : Math.round((c / totalVotes) * 100);

  document.getElementById("resultA").innerText =
    "Votes: " + a;

  document.getElementById("resultB").innerText =
    "Votes: " + b;

  document.getElementById("resultC").innerText =
    "Votes: " + c;

  document.getElementById("barA").style.width =
    percentA + "%";

  document.getElementById("barB").style.width =
    percentB + "%";

  document.getElementById("barC").style.width =
    percentC + "%";

  document.getElementById("percentA").innerText =
    percentA + "%";

  document.getElementById("percentB").innerText =
    percentB + "%";

  document.getElementById("percentC").innerText =
    percentC + "%";

  let winnerText = document.getElementById("winnerText");

  if (a > b && a > c) {

    winnerText.innerText =
      "Winner: Ikechukwu Ekene";

  }

  else if (b > a && b > c) {

    winnerText.innerText =
      "Winner: Hakeem Oyebade";

  }

  else if (c > a && c > b) {

    winnerText.innerText =
      "Winner: Fatanmi Adeniran";

  }

  else {

    winnerText.innerText =
      "Election is currently tied";

  }
}

function resetElection() {

  let confirmReset = confirm(
    "Are you sure you want to reset the election?"
  );

  if (confirmReset) {

    localStorage.removeItem("votes");

    let users = JSON.parse(localStorage.getItem("users")) || [];

    users = users.map(user => {

      user.hasVoted = false;

      return user;

    });

    localStorage.setItem("users", JSON.stringify(users));

    alert("Election has been reset.");

    location.reload();
  }
}

function logoutUser() {

  localStorage.removeItem("currentUser");

  window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", function () {

  let welcomeText =
    document.getElementById("welcomeText");

  if (welcomeText) {

    let currentUser = JSON.parse(
      localStorage.getItem("currentUser")
    );

    if (!currentUser) {

      window.location.href = "index.html";

    } else {

      welcomeText.innerText =
        "Welcome, " + currentUser.fullName;

    }
  }

if (document.getElementById("resultA")) {

    let adminLoggedIn =
    localStorage.getItem("adminLoggedIn");

    if (adminLoggedIn !== "true") {

    alert("Please login as admin first");

    window.location.href =
        "admin-login.html";

    } else {

    showResults();

    }
}

});
function adminLogin() {
  let password = document.getElementById("adminPassword").value;

  if (password === "admin123") {
    localStorage.setItem("adminLoggedIn", "true");
    window.location.href = "admin.html";
  } else {
    alert("Incorrect admin password");
  }
}
