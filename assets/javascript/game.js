


var wordList = ["merry", "loxley", "rottingham", "lincoln", "scarlett", "robin"];
var index;
//= Math.floor(Math.random() * wordList.length);
var targetWord ;
//= wordList[index];
// wordList.splice(index, 1);
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

// for(var i = 0; i < targetWord.length; i++){
//   displayWord += "_";
// }

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

// document.getElementById("targetWord").textContent = displayWord; 
// guessLetter();
newGame(wordList);

document.onkeyup = function(event) {

  var input = event.key;


  if(tries === 0){
    return;
    //input lost gif//
  }
  console.log("letterCount: " + letterCount + " word length: " + targetWord.length);
  document.getElementById("display-message").textContent = "Guess a letter";
    if(lettersUsed.indexOf(input) >=0){
      document.getElementById("display-message").textContent = "Letter " + input + " already used";
      return;
    }
    else if(!isLetter(input) || input === "Shift" || input === "Enter" || input === "Backspace"){
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
      // input you win stuff and figure out out how to get game to go again
        wins++;
        document.getElementById("numWins").textContent = wins;
      console.log(wordList);
      if(wordList.length > 0){
        console.log("entering new game block");
        displayWord = "";
        newGame(wordList);
      }
    }
  // if(tries === 0){
  //   return;
  //   //input lost gif//
  // }
  // else if(letterCount === 0){
  // // input you win stuff and figure out out how to get game to go again
  //   wins++;
  //   document.getElementById("numWins").textContent = wins;
  //   if(wordList > 0){
  //     newGame(wordList);
  //   }
  // document.getElementById("numWins").textContent = wins;
  document.getElementById("lettersUsed").textContent = lettersUsed;
}
