const sock = io();
sock.on("message", writeChat);
sock.on("username", writeJoinLobby);

// Event Listeners
document
  .querySelector("#chat-form")
  .addEventListener("submit", onFormSubmitted);

const nameForm = document.querySelector("#name-form");
nameForm.addEventListener("submit", onNameSubmitted);

// Functions
function onNameSubmitted(e) {
  e.preventDefault();
  const input = document.querySelector("#name-input");
  // Change the to lobby
  // Send username to the server
  sock.emit("username", input.value);
  input.value = "";
  const lobbyPage = document.querySelector(".lobby");
  // Remove nameForm page
  lobbyPage.classList.remove("hidden");
  nameForm.remove();
}

function onFormSubmitted(e) {
  e.preventDefault();
  const input = document.querySelector("#chat");
  const text = input.value;
  input.value = "";

  sock.emit("message", text);
}

function writeChat(data) {
  // <div> element
  const parent = document.querySelector("#events");

  // <h2> element
  const el = document.createElement("li");
  el.innerHTML = `${data.user}: ${data.msg}`;
  // el.innerHTML = text;
  parent.appendChild(el);

  // then you can scroll down once to show the new messages
  parent.scrollTop = parent.scrollHeight;
}

function writeJoinLobby(username) {
  // <div> element
  const parent = document.querySelector("#events");

  // <h2> element
  const el = document.createElement("li");
  el.innerHTML = `${username} joined the lobby!`;
  parent.appendChild(el);
}
