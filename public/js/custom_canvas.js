/*    Konva canvas file   */
function canvasInit(canvasMainBgcolor,gridStrokeColor,gridShadowColor,circleStrokeColor,circleFillColor){
/*    Declare Global Variables    */
var gridSize = 25,                      // Grid Tile Size
    canvasWidth = 20,                   // Grid Width
    canvasHeight = 20,                  // Grid Height
    box,                                // Variable for rectangle element
    isMouseDown = false;                // Set Mouse down property false


    /* set fill pattern cross image for grid tiles starts here */
    var bgImageObj = new Image();
    bgImageObj.src = '../imgs/bgimg.png';
    /* set fill pattern cross image for grid tiles ends here */

    /* set fill pattern cross image for grid tiles starts here */
    var stichImageObj = new Image();
    stichImageObj.src = '../imgs/stich.png';
    /* set fill pattern cross image for grid tiles ends here */

/*  create stage for main canvas  */
var stage = new Konva.Stage({
    container: 'canvas',                  // Canvas container
    width: canvasWidth * gridSize,        // Canvas Width
    height: canvasHeight * gridSize       // Canvas Height
});

/*  Create Multiple Layers for stage  */

var backgroundCanvas = new Konva.Layer();        // Layer1 for canvas main background
var canvasGridLayer = new Konva.Layer();         //  a Layer2 for canvas Grid

/*  Layers creation ends here! */

/*  Layer1 work starts here! */
var stageRect =  new Konva.Rect({
  x:0,
  y:0,
  width: canvasWidth * gridSize,
  height: canvasHeight * gridSize,
  fill: canvasMainBgcolor,
})
backgroundCanvas.add(stageRect);
/*  Layer1 work ends here! */

/*  Layer2 Create a grid on canvas work starts here!*/
for (var ix = 0; ix < canvasWidth; ix++) {
    for (var iy = 0; iy < canvasHeight; iy++) {
      box = new Konva.Rect({
          x : ix * gridSize,
          y : iy * gridSize,
          width : gridSize ,
          height : gridSize,
          //strokeEnabled: false,
          //dash: [4, 21],
          stroke: gridStrokeColor,
          strokeWidth: 0,
          lineJoin : 'round',
          shadowEnabled : true,
          //fillPatternImage: stichImageObj,
          shadowColor: gridShadowColor,
          shadowOffset: {  x: 3,   y: 3 },
          shadowOpacity: 1
      });
      //console.log(box);
      var circle = new Konva.Circle({
        x: box.attrs.x,
        y: box.attrs.y,
        radius: 2,
        stroke: circleStrokeColor,
        strokeWidth: 1,
        fill: circleFillColor,
      });

      canvasGridLayer.add(box);              // Add rectangle to background layer
      canvasGridLayer.add(circle);              // Add rectangle to background layer
    }
  }

/*    Fill Grid cell   */
canvasGridLayer.on('mousedown', function(evt) {
  isMouseDown = true
  if (isMouseDown){
    var box = evt.target;
    if(box.attrs.fillPatternImage) { }
    else {
    box.fillPatternImage(stichImageObj);
    box.draw();
    }
  }
});
canvasGridLayer.on('mouseup',function(evt){
  isMouseDown= false
})

canvasGridLayer.on('mouseover', function(evt) {
  if (isMouseDown){
    var box = evt.target;
    if(box.attrs.fillPatternImage){ }
    else {
    box.fillPatternImage(stichImageObj);
    box.draw();
    }
  }
});
/*  Layer2 Create a grid on canvas work ends here!*/

stage.add(backgroundCanvas,canvasGridLayer);          // Add Layer to stage


var json = stage.toJSON();      // Save entire canvas as json
//console.log(json);
}
/* initiate canvas on window load  */
$( window ).on( "load", function() {
    /* Canvas initiate funtion with parameters
      * Parameter1 : Initial canvas main background color.
      * Parameter2 : Grid stroke color.
      * Parameter3 : Grid shadow color.
      * Parameter4 : Circle stroke color.
      * Parameter5 : Circle Fill color.
      */
    canvasInit('white','#FFE793','#FFE9AD','#F7976F','#FED376');
});

$(function() {
/*  Pass colors to canvasInit function from color pattel  */
$(document).on('click', '.color_pattel',function() {
  var canvasBgColor = $(this).data("colorcode");
  var colorType   =  $(this).data("type");
  canvasInit(canvasBgColor,'#FFE793','#FFE9AD','#F7976F','#FED376');
});
});
