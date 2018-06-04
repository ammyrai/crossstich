/*    Konva canvas file   */
/*    Declare Global Variables    */
var gridSize = 25,                      // Grid Tile Size
    canvasWidth = 20,                   // Grid Width
    canvasHeight = 20,                  // Grid Height
    box,                                // Variable for rectangle element
    isMouseDown = false,                // Set Mouse down property false
    canvasBgCPara,                      // Canvas Background Color code parameter
    gridStrokeCPara,                    // Grid Stroke Color code parameter
    gridShadowCPara,                    // Grid Stroke Color code parameter
    circleStrokeCPara,                  // Circle Stroke Color code parameter
    circleFillCPara;                    // Circle Fill Color code parameter

/*
      =========================================================
      * canvasInit(Para1, Para2, Para3, Para3, Para4, Para5)
      * Canavs initiation function with 5 parameters
      * Para1 : Canvas Background Color code
      * Para2 : Grid Stroke Color code parameter
      * Para3 : Grid Stroke Color code parameter
      * Para4 : Circle Stroke Color code parameter
      * Para5 : Circle Fill Color code parameter
      =========================================================

*/
function canvasInit(canvasMainBgcolor,gridStrokeColor,gridShadowColor,circleStrokeColor,circleFillColor){
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
          stroke: gridStrokeColor,
          strokeWidth: 0,
          lineJoin : 'round',
          shadowEnabled : true,
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
      });

      canvasGridLayer.add(box);              // Add rectangle to background layer
      canvasGridLayer.add(circle);              // Add rectangle to background layer
    }
  }



var mode = "";
/*   Pencil tool function    */
var pencil = document.getElementById('pencil');
pencil.addEventListener('click', function() {
  $('.toolbar_list li').removeClass('active');
  $(this).addClass('active');
  mode = "pencil";
});

/*   Eraser tool function    */
var erase = document.getElementById('eraser');
erase.addEventListener('click', function() {
  $('.toolbar_list li').removeClass('active');
  $(this).addClass('active');
  mode = "eraser";
});

/*   Refresh tool function    */

$('#refresh_canvas').click(function() {
  location.reload();
});

/*    Fill Grid cell   */
canvasGridLayer.on('mousedown', function(evt) {
  isMouseDown = true;
  if (isMouseDown){
    box = evt.target;
    if (mode != '' && mode === 'eraser')            // Eraser Mode
    {
      if(box.attrs.fill)
      {
        box.shadowEnabled(false);
        box.globalCompositeOperation('destination-out');
        box.fill();
        box.draw();
        if(box.attrs.globalCompositeOperation)
        {
          box.globalCompositeOperation('source-over');
          box.fill(canvasMainBgcolor);
          box.shadowEnabled(true);
          box.draw();
        }
      }
    }
    else                                           // Pencil Mode
    {
      if(box.attrs.globalCompositeOperation && box.attrs.fill == 'white') {
        box.shadowEnabled(false);
        box.fill('red');
        box.draw();
      }
      else if(box.attrs.fill)
      {

      }
      else
      {
        box.shadowEnabled(false);
        box.fill('red');
        //box.fillPatternImage(stichImageObj);
        box.draw();
      }
    }
  }
});
canvasGridLayer.on('mouseup',function(evt){
  isMouseDown= false
})

canvasGridLayer.on('mouseover', function(evt) {
  if (isMouseDown){
    box = evt.target;
    if (mode != '' && mode === 'eraser')          // Eraser mode
    {
      if(box.attrs.fill)
      {
        box.shadowEnabled(false);
        box.globalCompositeOperation('destination-out');
        box.fill();
        box.draw();
        if(box.attrs.globalCompositeOperation)
        {
          box.globalCompositeOperation('source-over');
          box.fill(canvasMainBgcolor);
          box.shadowEnabled(true);
          box.shadowOffset({  x: 3,   y: 3 });
          box.draw();
        }
      }
    }
    else                                          // Pencil Mode
    {
      if(box.attrs.globalCompositeOperation && box.attrs.fill == 'white') {
        box.shadowEnabled(false);
        box.fill('red');
        box.draw();
      }
      else if(box.attrs.fill)
      {

      }
      else
      {
        box.shadowEnabled(false);
        box.fill('red');
        //box.fillPatternImage(stichImageObj);
        box.draw();
      }
    }
  }

});
/*  Layer2 Create a grid on canvas work ends here!*/

stage.add(backgroundCanvas,canvasGridLayer);          // Add Layer to stage

var json = stage.toJSON();      // Save entire canvas as json
//console.log(json);
}
/*
      ===============================
      initiate canvas on window load
      ===============================
*/
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

$(function()
{
/*
    ====================================================
    Pass colors to canvasInit function from color pattel
    ====================================================
*/
$(document).on('click', '.color_pattel',function() {
  canvasBgColor = $(this).data("colorcode");
  var colorType     =  $(this).data("type");
  if(colorType == "white" || colorType == "black")        // set default colors if bg is of white or black color
  {
    gridStrokeCPara = '#FFE793';
    gridShadowCPara = '#FFE9AD';
    circleStrokeCPara = '#F7976F';
    circleFillCPara = '#FED376';
  }
  else if(colorType == 'light')     // generate and set 20% darker shade if bg is of light color
  {
      // Create a 20% darker shade of light color
      gridStrokeCPara = ColorLuminance(canvasBgColor, -0.2);
      gridShadowCPara = ColorLuminance(gridStrokeCPara, -0.2);
      circleStrokeCPara = ColorLuminance(gridShadowCPara, -0.2);
      circleFillCPara = ColorLuminance(circleStrokeCPara, -0.2);
  }
  else                             // generate and set 100% lighter shade if bg is of dark color
  {
    // Create a 100% lighter shade of dark color
    gridStrokeCPara = ColorLuminance(canvasBgColor, 0.10);
    gridShadowCPara = ColorLuminance(gridStrokeCPara, 0.10);
    circleStrokeCPara = ColorLuminance(gridShadowCPara, 0.10);
    circleFillCPara = ColorLuminance(circleStrokeCPara, 0.10);
  }
  canvasInit(canvasBgColor,gridStrokeCPara,gridShadowCPara,circleStrokeCPara,circleFillCPara);
  // Call to canvasInit function
});

/*
    ============================================
    Generate new color codes script starts here!
    =============================================
*/
function ColorLuminance(hex, lum)
{
  // validate hex string
	hex = String(hex).replace(/[^0-9a-f]/gi, '');

	if (hex.length < 6) {
		hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
	}
	lum = lum || 0;

	// convert to decimal and change luminosity
	var rgb = "#", c, i;
	for (i = 0; i < 3; i++) {
		c = parseInt(hex.substr(i*2,2), 16);
		c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
		rgb += ("00"+c).substr(c.length);
	}
	return rgb;
}
/*  Generate new color codes script ends here!  */
});
