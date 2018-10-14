// index reference
// 0 = elephant
// 1 = train
// 2 = alien
// 3 = minion


//Array to store alphabet letters to calculate Ben's answers
letterIndices = ['e', 't', 'a', 'm'];

//
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

//
for (let id = 0; id < 4; id++) {
  video[id] = document.getElementById('video' + id);
  lesson[id] = document.getElementById('lesson' + id);
  lessonVideo[id] = document.getElementById('lessonVideo' + id);
  document.getElementById('card' + id).addEventListener("click", function() {
    beginLesson(id);
  });
}

//Sounds on buttons
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

function checkAnswer() {
  console.log('answerValue', answerValue);
  if (answerValue[answerValue.length - 1] !== englishToMorse['' + letterIndices[currLessonID]][answerValue.length - 1]) {
    //if answer is wrong
    numberOfTries++;
    answerValue = '';
    if (numberOfTries > maxTries) {
      reset();
    } else {
      beginLesson(currLessonID)
      if (englishToMorse['' + letterIndices[currLessonID]][0] == '•') {
        blinkDitButton()
      } else {
        blinkDahButton()
      }
    }
  }
  // compare whole string
  if ((englishToMorse['' + letterIndices[currLessonID]]) == answerValue) {
    answerValue = '';
    numberOfTries = 0;
    video[currLessonID].style.display = 'block';
  }
}

function beginLesson(lessonID) {
  currLessonID = lessonID;
  //TODO autoplay video here
  answerValue = '';
  trainDiv.style.display = 'none';
  document.getElementById('yellowbg').style.background = '#f7f7f7';
  lesson[lessonID].style.display = 'block';
  lessonVideo[lessonID].play();
}

function reset() {
  console.log("reset!")
  pressed = '';
  location.reload();
  trainDiv.style.display = 'block';
  console.log(trainDiv);
}

//#21d68c
function blinkDitButton() {
  console.log(dit);
  ////"press Dit
  var magicCheck = false;
  setInterval(function() {
    var dit = document.getElementById("ditButton");
    if (magicCheck == false) {
      console.log();
      dit.style.color = '#f7f7f7';
      dit.style.background = '#f7f7f7';
      magicCheck = true;
    } else {
      console.log('esle');
      dit.style.color = '#404040';
      dit.style.background = '#21d68c';
      magicCheck = false;
    }
  }, 1000);
}

function blinkDahButton() {
  console.log(dit);
  //"press Dah
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
