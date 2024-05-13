/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  
  // Game Item Objects


  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                        // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp);
  var KEY = {
    UP: 38,
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39
  };

  var walker = {
    xPos: 0,
    yPos: 0,
    xSpeed: 0,
    ySpeed: 0
  };

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    repositionGameItem();
    wallCollision();
    redrawGameItem();
  }

  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if (event.which === KEY.LEFT) {
      console.log("Left pressed");
      walker.xSpeed = -5;
    } else if (event.which === KEY.UP) {
      console.log("Up pressed");
      walker.ySpeed = 5;
    } else if (event.which === KEY.DOWN) {
      console.log("Down pressed");
      walker.ySpeed = -5;
    } else if (event.which === KEY.RIGHT) {
      console.log("Right pressed");
      walker.xSpeed = 5;
    }
  }
  function handleKeyUp(event){
    if (event.which === KEY.LEFT) {
      walker.xSpeed = 0;
    } else if (event.which === KEY.UP) {
      walker.ySpeed = 0;
    } else if (event.which === KEY.DOWN) {
      walker.ySpeed = 0;
    } else if (event.which === KEY.RIGHT) {
      walker.xSpeed = 0;
    }
  }
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  function repositionGameItem() {
    walker.xPos += walker.xSpeed;
    walker.yPos -= walker.ySpeed;
  }
  
  function redrawGameItem() {
    $("#walker").css("left", walker.xPos);
    $("#walker").css("top", walker.yPos);
  }

  function wallCollision(){
    if ($("#board").width() <= walker.xPos){
      walker.xPos -= walker.xSpeed;
    }
    if ($("#board").height() <= walker.yPos){
      walker.yPos += walker.ySpeed;
    }
    if (0 >= walker.xPos){
      walker.xPos -= walker.xSpeed;
    }
    if (0 >= walker.yPos){
      walker.yPos += walker.ySpeed;
    }
  }

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
