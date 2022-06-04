var choker3 = {
  // (A) GAME SETTINGS
  // The number of "lives"
  guesses : 5,
  // Available words for guessing
  dictionary : ["alura", "javascript", "python", "laravel", "react"],

  // (B) FLAGS
  word : null, // Current chosen word
  wordlen : 0, // Word length
  rights : 0, // Current number of correct words
  wrongs : 0, // Current number of wrong guesses

  // (C) HTML ELEMENTS
  hImg : null, // Choker3 image
  hWord : null, // Current word
  hChar : null, // Available characters
  hLives : null, // Lives left

  // (D) INIT
  init : () => {
    // (D1) GET HTML ELEMENTS
    choker3.hImg = document.getElementById("choker3-img");
    choker3.hWord = document.getElementById("choker3-words");
    choker3.hChar = document.getElementById("choker3-char");
    choker3.hLives = document.getElementById("choker3-lives");

    // (D2) GENERATE AVAILABLE CHARACTERS (A-Z)
    for (var i=65; i<91; i++) {
      let charnow = document.createElement("input");
      charnow.type = "button";
      charnow.value = String.fromCharCode(i);
      charnow.disabled = true;
      charnow.onclick = () => {choker3.check(charnow); };
      choker3.hChar.appendChild(charnow);
    }

    // (D3) START GAME
    let rst = document.getElementById("choker3-reset");
    rst.onclick = choker3.reset;
    rst.disabled = false;
    choker3.reset();
  },

  // (E) HELPER - TOGGLE ENABLE/DISABLE ALL AVAILABLE CHARACTERS
  toggle : (disable) => {
    let all = choker3.hChar.getElementsByTagName("input");
    for (var i of all) { i.disabled = disable; }
  },

  // (F) START/RESET THE GAME
  reset : () => {
    // (F1) RESET STATS
    choker3.rights = 0;
    choker3.wrongs = 0;
    choker3.hLives.innerHTML = choker3.guesses;
    choker3.hImg.style.opacity = 0;

    // (F2) CHOOSE A RANDOM WORD FROM THE DICTIONARY
    choker3.word = choker3.dictionary[Math.floor(Math.random()*Math.floor(choker3.dictionary.length))];
    choker3.word = choker3.word.toUpperCase();
    choker3.wordlen = choker3.word.length;
    // CHEAT!
    // console.log(choker3.word);

    // (F3) DRAW THE BLANKS
    choker3.hWord.innerHTML = "";
    for (var i=0; i<choker3.word.length; i++) {
      var charnow = document.createElement("span");
      charnow.innerHTML = "_";
      charnow.id = "hangword-" + i;
      choker3.hWord.appendChild(charnow);
    }

    // (F4) ENABLE ALL CHARACTERS
    choker3.toggle(false);
  },

  // (G) CHECK IF SELECTED CHARACTER IS IN THE CURRENT WORD
  check : (char) => {
    // (G1) CHECK FOR HITS
    var index = 0, hits = [];
    while (index >= 0) {
      index = choker3.word.indexOf(char.value, index);
      if (index == -1) { break; }
      else {
        hits.push(index);
        index++;
      }
    }

    // (G2) CORRECT - SHOW THE HITS
    if (hits.length > 0) {
      // Reveal words
      for (var hit of hits) {
        document.getElementById("hangword-" + hit).innerHTML = char.value;
      }

      // All hit - WIN!
      choker3.rights += hits.length;
      if (choker3.rights == choker3.wordlen) {
        choker3.toggle(true);
        alert("Congrats! YOU WIN!");
      }
    }

    // (G3) WRONG - MINUS LIFE & SHOW CHOKER3
    else {
      // Update choker3
      choker3.wrongs++;
      var livesleft = choker3.guesses - choker3.wrongs;
      choker3.hLives.innerHTML = livesleft;
      choker3.hImg.style.opacity = (1 - (livesleft/choker3.guesses)).toFixed(2);

      // Run out of guesses - LOSE!
      if (choker3.wrongs == choker3.guesses) {
        choker3.toggle(true);
        alert("YOU LOSE! Try again.");
      }
    }

    // (G4) DISABLE SELECTED CHARACTER
    char.disabled = true;
  }
};
window.addEventListener("DOMContentLoaded", choker3.init);
