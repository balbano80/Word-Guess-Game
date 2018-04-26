


var wordList = ["merry", "loxley", "rottingham", "lincoln", "scarlett", "robin", "blinkin", "achoo"];
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
  for(var i = 0; i < targetWord.length; i++){
    displayWord += "_";
  }
  tries = 7
  document.getElementById("numGuesses").textContent = tries;
  document.getElementById("targetWord").textContent = displayWord;
  console.log(targetWord);
  console.log(wordList);
  guessLetter();
}

function guessLetter(){
  document.getElementById("display-message").textContent = "Guess a letter";
}

function isLetter(str) {
    if(str.match(/[a-z]/i) !== null){
      return true;
    }
    else{
      return false;
    }
  }
  
function changeLetter(targetWord, displayWord, input){
  displayWord = displayWord.split("");
  for (var i = 0; i < displayWord.length; i++){
    if (targetWord[i] === input){
      displayWord[i] = input;
      letterCount--;
      console.log("decreasing letterCount to : " + letterCount);
    }
  }
  displayWord = displayWord.join('');
  return displayWord;
}

function openGif(){
  document.querySelector("#game").innerHTML = "<img class='img-responsive mx-auto d-block border' src='assets/images/yes.gif'>"

}

newGame(wordList);

document.onkeyup = function(event) {

  var input = event.key;

  console.log("letterCount: " + letterCount + " word length: " + targetWord.length);
  document.getElementById("display-message").textContent = "Guess a letter";
    if(lettersUsed.indexOf(input) >=0){
      document.getElementById("display-message").textContent = "Letter " + input + " already used";
      return;
    }
    else if(!isLetter(input) || input === "Shift" || input === "Enter" || input === "Backspace" || input === "CapsLock" || input === "Meta"){
      document.getElementById("display-message").textContent = input + " is not a letter";
      return;
    }
    else{
      if(targetWord.indexOf(input) >= 0){
        displayWord = changeLetter(targetWord, displayWord, input);
        document.getElementById("display-message").textContent = "Letter " + input + " found";
        document.getElementById("targetWord").textContent = displayWord;
      }
      else{
        tries--;
        document.getElementById("display-message").textContent = input + " not found";
        document.getElementById("numGuesses").textContent = tries;
      }
    }
    
    if(lettersUsed.indexOf(input) < 0){
      lettersUsed+= input;
      console.log("lettersUsed: " + lettersUsed);
    }


    if(letterCount === 0){
      wins++;
      document.getElementById("numWins").textContent = wins;
      console.log(wordList);
      var musicChoice = musicList[Math.floor(Math.random() * musicList.length)];
      document.querySelector("#music").innerHTML = "<audio autoplay><source src='assets/music/" + musicChoice + "' type='audio/wav'> </audio>";
      //look into getting below gif to stop after so long
      // var aud = document.getElementById("#music");
      // aud.onplaying = function(){
      //   console.log("hello");
      //   document.querySelector("#game").innerHTML = "<img class='img-responsive mx-auto d-block border' src='assets/images/yes.gif'>";
      // }
      
      if(wordList.length > 0){
        console.log("entering new game block");
        displayWord = "";
        newGame(wordList);
      }
      else{
        document.getElementById("display-message").textContent = "Congratulations.... YOU'VE WON!!!";
        document.querySelector("#guessed").innerHTML = "";
        document.querySelector("#music").innerHTML = "<audio controls autoplay><source src='assets/music/menintig.wav' type='audio/wav'></audio>";
        document.querySelector("#game").innerHTML = "<img class='img-responsive mx-auto d-block border' src='assets/images/win.gif'>"
        return;
      }
    }
  if(tries === 0){
    document.getElementById("display-message").textContent = "Haha... You lose!!!!";
    document.querySelector("#guessed").innerHTML = "";
    document.querySelector("#game").innerHTML = "<img class='img-responsive mx-auto d-block border' src='assets/images/iLost.gif'>"
    document.querySelector("#music").innerHTML = "<audio autoplay><source src='assets/music/bye.wav' type='audio/wav'></audio>";
    document.querySelector("#link").innerHTML = "<a href='https://balbano80.github.io/Word-Guess-Game/'><button>Play again?</button></a>";
    return;
  }

  if(wins === wordList.length){
    document.getElementById("display-message").textContent = "YOU'VE WON!!!";
  }

  document.getElementById("lettersUsed").textContent = lettersUsed;
}
