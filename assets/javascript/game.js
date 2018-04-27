
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// For Testing Purposes - answers/targetWord is being logged to console
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// Variables
var wordList = ["maid marian", "robin of loxley", "blinkin", "ahchoo", "little john", "mervyn sherrif of rottingham", "patriot arrow", "chastity belt"];
var musicList =["chill.wav", "ears.wav", "yea.wav", "hand_ove.wav", "willy.wav", "achtung.wav", "cantjump.wav", "cotton.wav", "guessing.wav", "noise.wav"]
var index;
var targetWord ;

var displayWord = "";
var letterCount;
var lettersUsed;
var tries = 7;
var wins = 0;

function newGame(arr){
  index = Math.floor(Math.random() * wordList.length);
  targetWord = wordList[index];
  wordList.splice(index, 1);
  letterCount = targetWord.length;
  lettersUsed = "";
  targetWord = targetWord.split("");
  displayWord = [];
  console.log(targetWord);
  for(var i = 0; i < targetWord.length; i++){
    if(targetWord[i] === " "){
      displayWord[i] = " ";
      letterCount--;;
    }
    else{
      displayWord[i] = "_";
    }
  }
  targetWord = targetWord.join("");
  displayWord = displayWord.join("");
  tries = 10;
  document.getElementById("numGuesses").textContent = tries;
  document.getElementById("targetWord").textContent = displayWord;
  console.log(targetWord);
  guessLetter();
 }// New word setup - 1. Sets targetWord from word array(randomly) and removes it from array
//                    2. Sets the letterCount variable to the length of the grabbed word
//                    3. Sets lettersUsed variable to an empty string
//                    4. Sets displayWord variable to be _ (or space)for as many letters in the targetWord and displays it
//                    5. Sets tries = 7 and then displays it
//                    6. Consoles out targetWord(in case anyone testing it wants to go through quickly to see features)
//                    7. Runs guessLetter function

function guessLetter(){
  document.getElementById("display-message").textContent = "Guess a letter";
} // Just displays "Guess a letter in message box"

function isLetter(str) {
    if(str.match(/[a-z]/i) !== null){
      return true;
    }
    else{
      return false;
    }
  }// Verifies if input is actually a letter
  
function changeLetter(targetWord, displayWord, input){
  displayWord = displayWord.split("");
  for (var i = 0; i < displayWord.length; i++){
    if (targetWord[i] === input){
      displayWord[i] = input;
      letterCount--;
    }
  }
  displayWord = displayWord.join("");
  return displayWord;
}// changes displayed letter when guessed correctly
      // 1. Makes displayWord string into an Array
      // 2. Loops through targetWord array indices
      //     a. If input(letter from user) matches targetWord index, replaces same index in displayWord with input
      //     b. Reduces letterCount variable by 1
      // 3. Set displayWord array back to a string and then returns it

newGame(wordList);

document.onkeyup = function(event) {

  var input = event.key;

  document.getElementById("display-message").textContent = "Guess a letter";

  if(lettersUsed.indexOf(input) >=0){
    document.getElementById("display-message").textContent = "Letter " + input + " already used";
    return;
  } // Checks to see if user input/letter has already been used(part of the stored lettersUed)
  else if(!isLetter(input) || input === "Shift" || input === "Enter" || input === "Backspace" || input === "CapsLock" || input === "Meta"){
    document.getElementById("display-message").textContent = input + " is not a letter";
    return;
  } // Runs isLetter function and also added checks for some other commonly hit keyboard buttons
  else{
    if(targetWord.indexOf(input) >= 0){
      displayWord = changeLetter(targetWord, displayWord, input);
      document.getElementById("display-message").textContent = "Letter " + input + " found";
      document.getElementById("targetWord").textContent = displayWord;
    } // 1. Checks if user input/letter is part of the targetWord
      // 2. Runs changeLetter function
      // 3. Updates message window to let user know that input was found in the word
      // 4. re-displays displayWord(returned from changeLetter function with input letter)
    else{
      tries--;
      document.getElementById("display-message").textContent = input + " not found";
      document.getElementById("numGuesses").textContent = tries;
    } // 1. Letter was not found in targetWord
      // 2. decrements tries variable
      // 3. Updates message window to let user know that input was NOT found in the word
      // 4. Updates "Number of Guesses" display with tries number
  }
  
  if(lettersUsed.indexOf(input) < 0){
    lettersUsed+= input;
    console.log("lettersUsed: " + lettersUsed);
  } // 1. checks if input is in lettersUsed string
    // 2. If not, adds it and updates display of lettersUsed with it


  if(letterCount === 0){
    wins++;
    document.getElementById("numWins").textContent = wins;
    var musicChoice = musicList[Math.floor(Math.random() * musicList.length)];
    document.querySelector("#music").innerHTML = "<audio autoplay><source src='assets/music/" + musicChoice + "' type='audio/wav'> </audio>"
    
    if(wordList.length > 0){
      console.log("entering new game block");
      displayWord = "";
      newGame(wordList);
    } // 1. Checks if wordList array is empty
      // 2. Resets displayword to empty string
      // 3. Runs newGame function with current wordList array
    else{
      document.getElementById("display-message").textContent = "Congratulations.... YOU'VE WON!!!";
      document.querySelector("#guessed").innerHTML = "";
      document.querySelector("#music").innerHTML = "<audio controls autoplay><source src='assets/music/menintig.wav' type='audio/wav'></audio>";
      document.querySelector("#game").innerHTML = "<img class='img-responsive mx-auto d-block border' src='assets/images/win.gif'>"
      document.querySelector("#link").innerHTML = "<a href='https://balbano80.github.io/Word-Guess-Game/'><button>Play again?</button></a>";
      return;
    } // 1. Updates message window to notify user they won
      // 2. Sets guessed id(div that contained display word and letters guessed) to empty string
      // 3. Runs win audio clip
      // 4. Displays win GIF
  } // if user guesses all letters in current targetWord

  document.getElementById("lettersUsed").textContent = lettersUsed;

  if(tries === 0){
    document.getElementById("display-message").textContent = "Haha... You lose!!!!";
    document.querySelector("#guessed").innerHTML = "";
    document.querySelector("#game").innerHTML = "<img class='img-responsive mx-auto d-block border' src='assets/images/iLost.gif'>"
    document.querySelector("#music").innerHTML = "<audio autoplay><source src='assets/music/bye.wav' type='audio/wav'></audio>";
    document.querySelector("#link").innerHTML = "<a href='https://balbano80.github.io/Word-Guess-Game/'><button>Play again?</button></a>";
    return;
  } // 1. If user runs out of tries
    // 2. Sets guessed id(div that contained display word and letters guessed) to empty string
    // 3. Displays lose GIF
    // 4. Runs lose audio clip
    // 5. Displays a "Play again?" button that is alink to the github repository address

  if(wins === wordList.length){
    document.getElementById("display-message").textContent = "YOU'VE WON!!!";
  } // This one probably is replaced too fast with newGame function

}
