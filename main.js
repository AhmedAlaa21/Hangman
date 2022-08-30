const wordEl = document.getElementById("word");
const wrongLettersEl = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");
const finalMessageRevealWord = document.getElementById(
  "final-message-reveal-word"
);

const manParts = document.querySelectorAll(".man-part");

const words = ["application", "programming", "interface", "ahmed", "alaa", "array", "object", "class","react"];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];

const wrongLetters = [];

//show hidden word..
function displayWord() {
  wordEl.innerHTML = `
    ${selectedWord
      .split("") // turn string to arr.
      .map(
        (letter) => `
    <span class= "letter">
    ${correctLetters.includes(letter) ? letter : ""}
    </span>
    `
      )
      .join("")}
    `;

  const innerWord = wordEl.innerText.replace(/\n/g, "");

  if (innerWord === selectedWord) {
    console.log("popped1");
    finalMessage.innerText = "Congratulations! You won! 😃";
    popup.style.display = "flex";
    console.log("popped");
  }
}

//update wrong letters..
function updateWrongLettersEl() {
  //display wrong letters..
  wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? "<p>Wrong</p>" : ""}
    ${wrongLetters.map((letter) => `<span>${letter}</span> `)}
    `;

  //display man parts ..
  manParts.forEach((part, index) => {
    const errors = wrongLetters.length;

    if (index < errors) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });

  //Lost ?
  if(wrongLetters.length === manParts.length){
    finalMessage.innerText = 'Oops! You didn`t make it. 😕';
    popup.style.display = 'flex';
  }
}

//show Notifcation..
function showNotification() {
  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
}

//keydown letter press..
//letter range: 65 : 90 (a:z).
window.addEventListener("keydown", (e) => {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    console.log("im here");
    const letter = e.key.toLowerCase();

    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);

        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);

        updateWrongLettersEl();
      } else {
        showNotification();
      }
    }
  }
});

// Restart game and play again..
playAgainBtn.addEventListener('click', () => {
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord = words[Math.floor(Math.random() * words.length)];

    displayWord();
    updateWrongLettersEl();
    popup.style.display = 'none';
});

displayWord();
