// train card index reference for arrays
// 0 = elephant
// 1 = train
// 2 = alien
// 3 = minion

//Array to store alphabet letters to calculate Ben's answers
letterIndices = ['e', 't', 'a', 'm'];

var currLessonID;

//Maximum # of tries for Ben to get right answer before returning to index.html to pick a new video
var maxTries = 2;

//Current number of tries
var numberOfTries = 0;

//If user touches one of the cards
var trainDiv = document.getElementById('train');

//Empty string to fill with Ben's sequence of morse code characters
var answerValue = '';

//Empty arrays to fill with the train cards and morse code buttons html elements
var video = [];
var lesson = [];
var lessonVideo = [];

//Use a for loop to get HTML elements
for (let id = 0; id < 4; id++) {
  video[id] = document.getElementById('video' + id);
  lesson[id] = document.getElementById('lesson' + id);
  lessonVideo[id] = document.getElementById('lessonVideo' + id);
  //if the user presses a card, begin that card's lesson
  document.getElementById('card' + id).addEventListener("click", function() {
    beginLesson(id);
  });
}

//If the user presses a morse code button, play audio, add morse character to string, and checkAnswer()
document.getElementById("dahButton").addEventListener("click", function() {
  dahAudio.play();
  answerValue = answerValue + "-"
  checkAnswer();
});
document.getElementById("ditButton").addEventListener("click", function() {
  ditAudio.play();
  answerValue = answerValue + "•"
  checkAnswer();
});

var ditAudio = document.getElementById("dit");
var dahAudio = document.getElementById("dah");

//check Ben's answer
function checkAnswer() {
  console.log('answerValue', answerValue);

  //if Ben's most recent morse button press in the answerValue string DOESN'T equal the expected answer in the morse code dictionary
  if (answerValue[answerValue.length - 1] !== englishToMorse['' + letterIndices[currLessonID]][answerValue.length - 1]) {
    //the answer is wrong, increment his # of tries, and empty his answer string
    numberOfTries++;
    answerValue = '';
    //if he's maxed out his # of tries, reset the window.
    if (numberOfTries > maxTries) {
      reset();
    } else {
      //if he hasn't maxed out his # of tries, replay the video and blink the right answer as a clue.
      beginLesson(currLessonID)
      if (englishToMorse['' + letterIndices[currLessonID]][0] == '•') {
        blinkDitButton()
      } else {
        blinkDahButton()
      }
    }
  }
  //if Ben's most recent morse button press in the answerValue string DOES equal the expected answer in the morse code dictionary
  if ((englishToMorse['' + letterIndices[currLessonID]]) == answerValue) {
    //clear his answer string and number of tries, and play his video
    answerValue = '';
    numberOfTries = 0;
    video[currLessonID].style.display = 'block';
  }
}

//play the lesson
function beginLesson(lessonID) {
  currLessonID = lessonID;
  answerValue = '';
  trainDiv.style.display = 'none';
  document.getElementById('yellowbg').style.background = '#f7f7f7';
  lesson[lessonID].style.display = 'block';
  lessonVideo[lessonID].play();
}

//reset the window if Ben maxed out # of tries or is done watching the video
function reset() {
  console.log("reset!")
  pressed = '';
  location.reload();
  trainDiv.style.display = 'block';
  console.log(trainDiv);
}

//blink buttons if Ben needs a clue
function blinkDitButton() {
  var magicCheck = false;
  setInterval(function() {
    var dit = document.getElementById("ditButton");
    if (magicCheck == false) {
      dit.style.color = '#f7f7f7';
      dit.style.background = '#f7f7f7';
      magicCheck = true;
    } else {
      dit.style.color = '#404040';
      dit.style.background = '#21d68c';
      magicCheck = false;
    }
  }, 1000);
}

function blinkDahButton() {
  var magicCheck = false;
  setInterval(function() {
    var dah = document.getElementById("dahButton");
    if (magicCheck == false) {
      dah.style.color = '#f7f7f7';
      dah.style.background = '#f7f7f7';
      magicCheck = true;
    } else {
      dah.style.color = '#404040';
      dah.style.background = '#21d68c';
      magicCheck = false;
    }
  }, 1000);
}
