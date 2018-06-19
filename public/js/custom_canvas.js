/*    Konva canvas file   */
/*    Declare Global Variables    */
var gridSize = 25,                      // Grid Tile Size
    canvasWidth = 20,                   // Grid Width
    canvasHeight = 20,                  // Grid Height
    box,                                // Variable for rectangle element
    circle,                             // Variable for circle element
    text,                               // Variable for circle element
    mode = "pencil",                    // Variable for mode with default pencil
    stage,                              // Stage variable
    backgroundCanvas,                   // Main background canvas variable
    canvasGridLayer,                    // Grid canvas variable
    stageRect,                          // Main canvas rectangle variable
    isMouseDown = false,                // Set Mouse down property false
    canvasBgCPara,                      // Canvas Background Color code parameter
    gridStrokeCPara,                    // Grid Stroke Color code parameter
    gridShadowCPara,                    // Grid Stroke Color code parameter
    circleStrokeCPara,                  // Circle Stroke Color code parameter
    circleFillCPara,                    // Circle Fill Color code parameter
    textFillCPara,                      // Text color fill parameter
    json,                               // Json variable for final canvas output
    posStart,
    posNow,
    rectPoints = [];
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
function canvasInit(canvasMainBgcolor,gridStrokeColor,gridShadowColor,circleStrokeColor,circleFillColor,textFillColor){

/*  create stage for main canvas  */
stage = new Konva.Stage({
    container: 'canvas',                  // Canvas container
    width: canvasWidth * gridSize,        // Canvas Width
    height: canvasHeight * gridSize       // Canvas Height
});

/*  Create Multiple Layers for stage  */

backgroundCanvas = new Konva.Layer();        // Layer1 for canvas main background
canvasGridLayer = new Konva.Layer();         //  a Layer2 for canvas Grid

/*  Layers creation ends here! */

/*  Create new group  */
var gridRectGroup = new Konva.Group();
var gridCircleGroup = new Konva.Group();
var gridTextGroup = new Konva.Group();
var gridcloneGroup = new Konva.Group({draggable: true});

/*  Layer1 work starts here! */
stageRect =  new Konva.Rect({
  x:0,
  y:0,
  width: canvasWidth * gridSize,
  height: canvasHeight * gridSize,
  fill: canvasMainBgcolor,
})
backgroundCanvas.add(stageRect);
/*  Layer1 work ends here! */
textFillCPara = textFillColor;
var textColor = "";
$(document).on('click','.text_color_pattel',function(){
    var textClr = $(this).data("colorcode");
    changeColor(textClr);
})
function changeColor(x)
{
  textFillColor = x;
}
/*  Layer2 Create a grid on canvas work starts here!*/

for (var ix = 0; ix < canvasWidth; ix++) {
    for (var iy = 0; iy < canvasHeight; iy++) {
      box = new Konva.Rect({
          x : ix * gridSize,
          y : iy * gridSize,
          width : gridSize ,
          height: gridSize,
          stroke: gridStrokeColor,
          strokeWidth: 0,
          lineJoin : 'round',
          shadowEnabled : true,
          shadowColor: gridShadowColor,
          shadowOffset: {  x: 3,   y: 3 },
          shadowOpacity: 1,
          filled : false,
      });
      circle = new Konva.Circle({
        x: box.attrs.x,
        y: box.attrs.y,
        radius: 2,
        stroke: circleStrokeColor,
        strokeWidth: 1,
      });
      gridRectGroup.add(box);                   // Add rectangle to group
      gridCircleGroup.add(circle);              // Add rectangle to group
    }
  }


/*   Change tool mode function starts here!   */
$(".canvas_tool").click(function(){
  $('.toolbar_list li').removeClass('active');
  $(this).addClass('active');
   mode = $(this).data('mode');
   if(mode == 'refresh')location.reload();
});
/*   Change tool mode function ends here!   */

// draw a rectangle to be used as the rubber area
var r2 = new Konva.Rect({x: 0, y: 0, width: 0, height: 0, stroke: 'red', dash: [2,2]})
r2.listening(false); // stop r2 catching our mouse events.
gridRectGroup.add(r2);

var selected_rect = [];

var points =[];
/*    Fill Grid cell   */
canvasGridLayer.on('mousedown', function(evt)
{
  isMouseDown = true;
  if (isMouseDown)
  {
    box = evt.target;
    switch (mode)
    {
      case 'pencil':
           // stage.container().style.cursor = 'move';
           if(box.attrs.filled == false)
           {
             box.shadowEnabled(false);
             text = new Konva.Text({
                 text: 'X',
                 x: box.attrs.x,
                 y: box.attrs.y,
                 fontFamily: 'sans-serif',
                 fontSize: gridSize,
                 fill: textFillColor,
                 fontStyle : 'normal',
                 filled : true
             });
             box.attrs.filled = true;
             box.height = text.getHeight();
             gridTextGroup.add(text);
             canvasGridLayer.draw();
           }
      break;
      case 'eraser':
          if(box.attrs.filled == true)
          {
             if(evt.target.className == 'Text')
             {
                 evt.target.destroy();
                 box.attrs.filled = false;
                 box.shadowEnabled(true);
             }
          }
      canvasGridLayer.draw();
      break;
       case 'select_shape':
          startDrag({x: box.attrs.x, y: box.attrs.y})
       break;
       case 'back_stich':
           points=[];
           var secondX = nearest(evt.evt.layerX,box.attrs.x,box.attrs.x+gridSize);
           var secondY = nearest(evt.evt.layerY,box.attrs.y,box.attrs.y+gridSize);
           points.push(box.attrs.x,box.attrs.y,secondX,secondY)
           var line = new Konva.Line({
               points :points,
               stroke: 'red',
               strokeWidth: 2,
               drawLine : true,
           });
           gridRectGroup.add(line);

           canvasGridLayer.draw();
           box.attrs.lineDraw = true;
       break;
       case 'text':
         console.log('Text Mode!');
       break;
       default:
       // stage.container().style.cursor = 'pointer';
    }
  }
});
canvasGridLayer.on('mouseup',function(evt){
  isMouseDown= false
  box = evt.target;

  switch (mode)
  {
     case 'pencil':
     break;
     case 'eraser':
     break;
     case 'select_shape':
       updateDrag({x: box.attrs.x, y: box.attrs.y},true)
         var textList = canvasGridLayer.find("Text");

         $( textList ).each(function(key, val) {
           if(val.attrs.selected === 'selected')
           {
               var clonerect  = val.clone({x: val.attrs.x, y: val.attrs.y, name :'cloneRect'});
               gridcloneGroup.add(clonerect);
               canvasGridLayer.add(gridcloneGroup);
               $( selected_rect ).each(function(key, rect) {
                 if(rect.attrs.x === val.attrs.x && rect.attrs.y === val.attrs.y)
                 {
                   rect.attrs.filled = false;
                   rect.attrs.shadowEnabled = true;
                   rect.attrs.shadowColor = gridShadowColor;
                   rect.attrs.shadowOffset = {  x: 3,   y: 3 };
                   canvasGridLayer.draw();
                 }
                });
               val.destroy();
             }
         })
         r2.visible(true);
         mode = '';
         stage.draw();
     break;
     case 'back_stich':
         var line = canvasGridLayer.find("Line");
         line[line.length-1].attrs.drawLine = false;
     break;
     case 'text':
       console.log('Text Mode!');
     break;
     default:
     // stage.container().style.cursor = 'pointer';
   }
})

canvasGridLayer.on('mousemove', function(evt) {
  if (isMouseDown)
  {
    box = evt.target;
    switch (mode)
    {
       case 'pencil':
            // stage.container().style.cursor = 'move';
            if(box.attrs.filled == false)
            {
              box.shadowEnabled(false);
              text = new Konva.Text({
                  text: 'X',
                  x: box.attrs.x,
                  y: box.attrs.y,
                  fontFamily: 'sans-serif',
                  fontSize: gridSize,
                  fill: textFillColor,
                  fontStyle : 'normal',
                  filled : true,
              });
              box.attrs.filled = true;
              box.height = text.getHeight();
              gridTextGroup.add(text);
              canvasGridLayer.draw();
            }
            if(box.className === 'Rect' && box.attrs.filled === true)
               {
                  selected_rect.push(box);
               }
       break;
       case 'eraser':
           if(box.className == 'Rect' && box.attrs.filled == true)
           {
              var textList = canvasGridLayer.find("Text");
              $( textList ).each(function(key, val) {
                 val.on('mouseenter', function(evt) {
                   if(evt.target.className == 'Text')
                   {
                     evt.target.destroy();
                   }
                 });
             });
             box.attrs.filled = false;
             box.shadowEnabled(true);
           }
           canvasGridLayer.draw();
       break;
       case 'select_shape':
          updateDrag({x: box.attrs.x, y: box.attrs.y},false)
       break;
       case 'back_stich':

               var line = canvasGridLayer.find("Line");
               line[line.length-1].attrs.drawLine = true;
               if(line[line.length-1].attrs.drawLine === true)
               {
                   var secondX = nearest(evt.evt.layerX,box.attrs.x,box.attrs.x+gridSize);
                   var secondY = nearest(evt.evt.layerY,box.attrs.y,box.attrs.y+gridSize);
                   if ( ((secondX - evt.evt.layerX) < 6) && ((secondX - evt.evt.layerX) > 0)) {
                     points.push(secondX,secondY);
                   }
                   else if(((secondY - evt.evt.layerY) < 6) && ((secondY - evt.evt.layerY) > 0)){
                     points.push(secondX,secondY);
                   }
                   line[line.length-1].points(points);
                   canvasGridLayer.draw();
                   line[line.length-1].attrs.drawLine = true;
               }
       break;
       case 'text':
         console.log('Text Mode!');
       break;
       default:
       // stage.container().style.cursor = 'pointer';
    }
  }
});

gridcloneGroup.on('dragstart', function(e) {
    r2.visible(false);
});
gridcloneGroup.on('dragend', function() {
    gridcloneGroup.position({
      x: Math.round(gridcloneGroup.x() / gridSize) * gridSize,
      y: Math.round(gridcloneGroup.y() / gridSize) * gridSize
    });
    stage.batchDraw();
    gridcloneGroup.draggable(false)
});

function updateDrag(posIn,updateSelect){
  // update rubber rect position
   posNow = {x: posIn.x, y: posIn.y};
   var posRect = reverse(posStart,posNow);
   r2.x(posRect.x1);
   r2.y(posRect.y1);
   r2.width(posRect.x2 - posRect.x1);
   r2.height(posRect.y2 - posRect.y1);
   r2.visible(true);
   if(updateSelect == true){
     var textList = canvasGridLayer.find("Text");
     $( textList ).each(function(key, val) {
       if(val.attrs.x >= r2.attrs.x && val.attrs.x < (r2.attrs.x+r2.attrs.width) && val.attrs.y >= r2.attrs.y && val.attrs.y < (r2.attrs.y+r2.attrs.height)){
         val.attrs.selected = 'selected';
       }
     })
     rectPoints.push(posNow);
   }
   stage.draw(); // redraw any changes.
}

/*  Layer2 Create a grid on canvas work ends here!*/
canvasGridLayer.add(gridRectGroup,gridCircleGroup,gridTextGroup);   // Add Groups to layer
stage.add(backgroundCanvas,canvasGridLayer);          // Add Layer to stage
json = stage.toJSON();      // Save entire canvas as json
}
function nearest(value, min, max){
  if((value-min)>(max-value)){
      return max;
   } else {
    return min;
   }
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
      * Parameter6 : Text Fill color
      */
    canvasInit('white','#FFE793','#FFE9AD','#F7976F','#FED376','#000000');
});


function startDrag(posIn){
  posStart = {x: posIn.x, y: posIn.y};
  posNow = {x: posIn.x, y: posIn.y};
}

function reverse(r1, r2){
  var r1x = r1.x, r1y = r1.y, r2x = r2.x,  r2y = r2.y, d;
  if (r1x > r2x ){
    d = Math.abs(r1x - r2x);
    r1x = r2x; r2x = r1x + d;
  }
  if (r1y > r2y ){
    d = Math.abs(r1y - r2y);
    r1y = r2y; r2y = r1y + d;
  }
    return ({x1: r1x, y1: r1y, x2: r2x, y2: r2y}); // return the corrected rect.
}

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


$(document).ready(function() {

    $("#textModal").draggable({
    handle: ".modal-header"
    });

    /*  Text field value on keyup  */
    $("#textfill").keyup(function() {
      updateSample($("#textfill").val(),$('#textFontSelect').val(),$('#textFontsize').val(),$("#textFontBold").prop("checked"), $("#textFontItalic").prop("checked"),$('#myRange').val())
    });

    /* Text font family value on change  */
    $('#textFontSelect').change(function(){
        updateSample($("#textfill").val(),$('#textFontSelect').val(),$('#textFontsize').val(),$("#textFontBold").prop("checked"), $("#textFontItalic").prop("checked"),$('#myRange').val())
    });

    /* Text Font size value on change  */
    $('#textFontsize').change(function(){
        updateSample($("#textfill").val(),$('#textFontSelect').val(),$('#textFontsize').val(),$("#textFontBold").prop("checked"), $("#textFontItalic").prop("checked"),$('#myRange').val())
    });
    /* Text Font Bold value on change  */
    $('#textFontBold').change(function(){
        updateSample($("#textfill").val(),$('#textFontSelect').val(),$('#textFontsize').val(),$("#textFontBold").prop("checked"), $("#textFontItalic").prop("checked"),$('#myRange').val())
    });
    /* Text Font Italic value on change  */
    $('#textFontItalic').change(function(){
        updateSample($("#textfill").val(),$('#textFontSelect').val(),$('#textFontsize').val(),$("#textFontBold").prop("checked"), $("#textFontItalic").prop("checked"),$('#myRange').val())
    });

var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value;
    slider.oninput = function() {
      output.innerHTML = this.value;
      updateSample($("#textfill").val(),$('#textFontSelect').val(),$('#textFontsize').val(),$("#textFontBold").prop("checked"), $("#textFontItalic").prop("checked"),this.value)
    }


    function updateSample(textpara,fontfamily,textsize,bold,italic,weight) {
        var f = text(textpara,fontfamily,textsize,bold,italic,weight)
        // this.tooWide.toggleClass("hideMe", TextUtil.textWidth <= designGrid.width());
        var c = document.getElementById("textSample");
        var r = c.getContext("2d");
        r.clearRect(0, 0, c.width, c.height);
        var q =6;
        if (q >= 10) {
            q = 5
        }
        var g = applyDeselRatio(q);
        var d = Math.ceil(c.width / g);
        var p = Math.ceil(c.height / q);
        var o = Math.max(0, Math.floor((f.width - d) / 2));
        var m = Math.max(0, Math.floor((f.height - p) / 2));
        var j = Math.min(f.width, 1 + Math.ceil((f.width + d) / 2));
        var h = Math.min(f.height, 1 + Math.ceil((f.height + p) / 2));
        var b = Math.floor(c.width / 2 - g * f.width / 2);
        var a = Math.floor(c.height / 2 - q * f.height / 2);
        for (var l = m; l < h; l++) {
            var k = (false && (l & 1)) ? Math.round(g / 2) : 0;
            for (var n = o; n < j; n++) {
                var e = (l * f.width + n) * 4;

                r.fillStyle = f.data[e + 3] == 255 ? "#000000" : "#ffffff";
                r.fillRect(b + n * g + k, a + l * q, g, q)
            }
        }
    }
    function applyDeselRatio(b) {
    var deselRatio = 1;
        var a = b * deselRatio;
        if (deselRatio >= 1) {
            a = Math.floor(a)
        } else {
            a = Math.ceil(a)
        }
        return a
    }
    function text(textpara, b, m, h, g,weight)
    {
      this.canvas = document.createElement("canvas");
      this.canvas.width = 200;
      this.canvas.height = 200;
      this.ctx = this.canvas.getContext("2d")

      this.ctx.clearRect(0, 0, 600, 600);
      this.ctx.fillStyle = "#000000";
      var d = fontSpec(b, m, h, g);
      this.ctx.font = d;
      var c = this.ctx.measureText(textpara);
      var p = getTextHeight(d);
      this.ctx.fillText(textpara, 0, p.ascent);

      var k = Math.max(1, c.width);
      var e = this.ctx.getImageData(0, 0, k, p.height);

      var n = 600;
      var j = 0;
      for (var f = 3; f < e.data.length; f += 4) {

          var a = 0;
          if (e.data[f] >= weight) {
              a = 255;
              var l = (f / 4) % k;
              n = Math.min(n, l);
              j = Math.max(j, l)
          }
          e.data[f] = a
      }
      this.textWidth = 1 + j - n;
      if (this.textWidth > 580) {
          this.textWidth = c.width
      }
      return e
    }
    function fontSpec(e, d, c, b) {
        var a = "";
        if (b) {
            a += "italic "
        }
        if (c) {
            a += "bold "
        }
        return a + d + "px " + e
    }

    function getTextHeight(c) {
        var e = $('<span style="font: ' + c + '">Hg</span>');
        var d = $('<div style="display: inline-block; width: 1px; height: 0px;"></div>');
        var f = $("<div></div>");
        f.append(e, d);
        var b = $("body");
        b.append(f);
        try {
            var a = {};
            d.css({
                verticalAlign: "baseline"
            });
            a.ascent = d.offset().top - e.offset().top;
            d.css({
                verticalAlign: "bottom"
            });
            a.height = d.offset().top - e.offset().top;
            a.descent = a.height - a.ascent
        } finally {
            f.remove()
        }
        return a
    }
});
