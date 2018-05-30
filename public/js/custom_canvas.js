/*    Declare Global Variables    */
var gridSize = 25,                      // Grid Tile Size
    canvasWidth = 20,                   // Grid Width
    canvasHeight = 20,                  // Grid Height
    box,                                // Variable for rectangle element
    isMouseDown = false;                // Set Mouse down property false

    // set fill pattern image
    var imageObj = new Image();
    imageObj.src = '../imgs/stich.png';

/*  create stage for main canvas  */
var stage = new Konva.Stage({
    container: 'canvas',                  // Canvas container
    width: canvasWidth * gridSize,        // Canvas Width
    height: canvasHeight * gridSize       // Canvas Height
});

/*    Create a background Layer for canvas   */
var background = new Konva.Layer();

var text = new Konva.Text({
  x: 30,
  y: 30,
  text: 'X',
  fontSize: gridSize,
  fontFamily: 'Calibri',
  fill: 'red'
});
/*  Create a grid on canvas Layer */
for (var ix = 0; ix < canvasWidth; ix++) {
    for (var iy = 0; iy < canvasHeight; iy++) {
      box = new Konva.Rect({
          x : ix * gridSize,
          y : iy * gridSize,
          width : gridSize ,
          height : gridSize,
          stroke: '#ccc',
          strokeWidth: 1,
          lineJoin : 'round'
      });
      background.add(box);              // Add rectangle to background layer
    //  background.add(text);
    }
  }

/*    Fill Grid cell   */
background.on('mousedown', function(evt) {
  isMouseDown = true
  if (isMouseDown){
    var box = evt.target;
    if(box.attrs.fillPatternImage) { }
    else {
    box.fillPatternImage(imageObj);
    box.draw();
    }
  }
});
background.on('mouseup',function(evt){
  isMouseDown= false
})

background.on('mouseover', function(evt) {
  if (isMouseDown){
    var box = evt.target;
    if(box.attrs.fillPatternImage){ }
    else {
    box.fillPatternImage(imageObj);
    box.draw();
    }
  }
});

stage.add(background);          // Add Layer to stage

var json = stage.toJSON();      // Save entire canvas as json
//console.log(json);
