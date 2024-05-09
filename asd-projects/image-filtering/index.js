// This is a small program. There are only two sections. This first section is what runs
// as soon as the page loads.
$(document).ready(function () {
  render($("#display"), image);
  $("#apply").on("click", applyAndRender);
  $("#reset").on("click", resetAndRender);
});

/////////////////////////////////////////////////////////
//////// event handler functions are below here /////////
/////////////////////////////////////////////////////////

// this function resets the image to its original value; do not change this function
function resetAndRender() {
  reset();
  render($("#display"), image);
}

// this function applies the filters to the image and is where you should call
// all of your apply functions
function applyAndRender() {
  // Multiple TODOs: Call your apply function(s) here
  applyFilter(reddify);
  applyFilterNoBackground(decreaseBlue);
  applyFilterNoBackground(increaseGreenByBlue);
  // do not change the below line of code
  render($("#display"), image);
}

/////////////////////////////////////////////////////////
// "apply" and "filter" functions should go below here //
/////////////////////////////////////////////////////////

// TODO 1, 2 & 4: Create the applyFilter function here
function applyFilter(filterFunction){
  for (var i = 0; i < image.length; i++){
    var temp = image[i];
    for (var j = 0; j < temp.length; j++){
      var rgbString = image[i][j];
      var rgbNumbers = rgbStringToArray(rgbString);
      filterFunction(rgbNumbers);
      rgbString = rgbArrayToString(rgbNumbers);
      image[i][j] = rgbString;
    }
  }
}

// TODO 7: Create the applyFilterNoBackground function
function applyFilterNoBackground(filterFunction){
  var i = 0;
  var bgclr = image[i][i];
  for (i; i < image.length; i++){
    var temp = image[i];
    for (var j = 0; j < temp.length; j++){
      if (bgclr != image[i][j]){
        var rgbString = image[i][j];
        var rgbNumbers = rgbStringToArray(rgbString);
        filterFunction(rgbNumbers);
        rgbString = rgbArrayToString(rgbNumbers);
        image[i][j] = rgbString;
      }
    }
  }
}

// TODO 5: Create the keepInBounds function
function keepInBounds(bind){
  var tempo = Math.max(bind, 0);
  tempo = Math.min(bind, 255);
  return tempo;
}

// TODO 3: Create reddify function
function reddify(reads){
  reads[RED] = 200;
}

// TODO 6: Create more filter functions
function decreaseBlue(bleu){
  bleu[BLUE] = keepInBounds(bleu[BLUE] - 50);
}
function increaseGreenByBlue(gtb){
  gtb[GREEN] = keepInBounds(gtb[BLUE] + gtb[GREEN]);
}
// CHALLENGE code goes below here
