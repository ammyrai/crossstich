/*    Konva canvas file   */
/*    Declare Global Variables    */

clothframe = localStorage.getItem("clothframe");
var frame = clothframe.split(" X ");
var
    stageWidth = 800,
    gridSize = stageWidth/frame[1],                      // Grid Tile Size
    canvasWidth = frame[1],                   // Grid Width
    canvasHeight = frame[0],                  // Grid Height
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
    rectPoints = [],
    cr;

var txtFillSize = Math.round(gridSize);
if(Math.round(gridSize) >= 20)
{
  cr = 2;
}
else if(Math.round(gridSize) >= 10)
{
  cr = 1;
}
else {
  cr = 0;
}
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
function canvasInit(textFillColor){
canvasMainBgcolor = localStorage.getItem("canvasBgColor");
gridStrokeColor = localStorage.getItem("gridStrokeCPara");
gridShadowColor = localStorage.getItem("gridShadowCPara");
circleStrokeColor = localStorage.getItem("circleStrokeCPara");
circleFillColor = localStorage.getItem("circleFillCPara");
/*  create stage for main canvas  */
stage = new Konva.Stage({
    container: 'canvas',                  // Canvas container
    width: stageWidth,        // Canvas Width
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
  width: stageWidth,
  height: canvasHeight * gridSize,
  fill: canvasMainBgcolor,
})
backgroundCanvas.add(stageRect);
/*  Layer1 work ends here! */

/*  Text color  */
textFillCPara = textFillColor;
var textColor = "";
$(document).on('click', 'ul#select_style_color_ul li',function() {
  var textClr = $(this).attr('value');
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
        radius: cr,
        stroke: circleStrokeColor,
        strokeWidth: 1,
      });
      gridRectGroup.add(box);                   // Add rectangle to group
      gridCircleGroup.add(circle);              // Add rectangle to group
    }
  }
gridRectGroup.cache();

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
                 fontSize: txtFillSize,
                 fill: textFillColor,
                 fontStyle : 'normal',
                 filled : true,
                 align: 'center',
                 transformsEnabled : 'position'
             });
             box.attrs.filled = true;
             box.height = text.getHeight();
             gridTextGroup.add(text);
             gridTextGroup.draw();
             canvasGridLayer.batchDraw();
           }
          //  else {
          //    box.attrs.filled = false;
          //    box.shadowEnabled(true);
          //    if(evt.target.className == 'Text')
          //    {
          //      evt.target.destroy();
          //    }
          //    canvasGridLayer.draw();
          // }
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
      canvasGridLayer.batchDraw();
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
               stroke: '#000000',
               strokeWidth: 3,
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
                 if(rect.attrs.x+5 === val.attrs.x && rect.attrs.y+4 === val.attrs.y)
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
            console.log(box)
            // stage.container().style.cursor = 'move';
            if(box.attrs.filled == false)
            {
              box.shadowEnabled(false);
              text = new Konva.Text({
                  text: 'X',
                  x: box.attrs.x,
                  y: box.attrs.y,
                  fontFamily: 'sans-serif',
                  fontSize: txtFillSize,
                  fill: textFillColor,
                  fontStyle : 'normal',
                  filled : true,
                  align: 'center',
                  transformsEnabled : 'position'
              });
              box.attrs.filled = true;
              box.height = text.getHeight();
              gridTextGroup.add(text);
              gridTextGroup.draw();
              canvasGridLayer.batchDraw();
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
           canvasGridLayer.batchDraw();
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




/* Text popup starts here    */
//
// $("#textModal").draggable({
// handle: ".modal-header"
// });

  /*  Text field value on keyup  */
  $("#textfill").keyup(function() {
    updateSample($("#textfill").val(),$('#textFontSelect').val(),$('#textFontsize').val(),$("#textFontBold").prop("checked"), $("#textFontItalic").prop("checked"),$('#myRange').val())
    updateSample1($("#textfill").val(),$('#textFontSelect').val(),$('#textFontsize').val(),$("#textFontBold").prop("checked"), $("#textFontItalic").prop("checked"),$('#myRange').val())
  });

  /* Text font family value on change  */
  $('#textFontSelect').change(function(){
      updateSample($("#textfill").val(),$('#textFontSelect').val(),$('#textFontsize').val(),$("#textFontBold").prop("checked"), $("#textFontItalic").prop("checked"),$('#myRange').val())
      updateSample1($("#textfill").val(),$('#textFontSelect').val(),$('#textFontsize').val(),$("#textFontBold").prop("checked"), $("#textFontItalic").prop("checked"),$('#myRange').val())
  });

  /* Text Font size value on change  */
  $('#textFontsize').change(function(){
      updateSample($("#textfill").val(),$('#textFontSelect').val(),$('#textFontsize').val(),$("#textFontBold").prop("checked"), $("#textFontItalic").prop("checked"),$('#myRange').val())
      updateSample1($("#textfill").val(),$('#textFontSelect').val(),$('#textFontsize').val(),$("#textFontBold").prop("checked"), $("#textFontItalic").prop("checked"),$('#myRange').val())
  });
  /* Text Font Bold value on change  */
  $('#textFontBold').change(function(){
      updateSample($("#textfill").val(),$('#textFontSelect').val(),$('#textFontsize').val(),$("#textFontBold").prop("checked"), $("#textFontItalic").prop("checked"),$('#myRange').val())
      updateSample1($("#textfill").val(),$('#textFontSelect').val(),$('#textFontsize').val(),$("#textFontBold").prop("checked"), $("#textFontItalic").prop("checked"),$('#myRange').val())
  });
  /* Text Font Italic value on change  */
  $('#textFontItalic').change(function(){
      updateSample($("#textfill").val(),$('#textFontSelect').val(),$('#textFontsize').val(),$("#textFontBold").prop("checked"), $("#textFontItalic").prop("checked"),$('#myRange').val())
      updateSample1($("#textfill").val(),$('#textFontSelect').val(),$('#textFontsize').val(),$("#textFontBold").prop("checked"), $("#textFontItalic").prop("checked"),$('#myRange').val())
  });

  var slider = document.getElementById("myRange");
  var output = document.getElementById("demo");
  output.innerHTML = slider.value;
  slider.oninput = function() {
    output.innerHTML = this.value;
    updateSample($("#textfill").val(),$('#textFontSelect').val(),$('#textFontsize').val(),$("#textFontBold").prop("checked"), $("#textFontItalic").prop("checked"),this.value)
    updateSample1($("#textfill").val(),$('#textFontSelect').val(),$('#textFontsize').val(),$("#textFontBold").prop("checked"), $("#textFontItalic").prop("checked"),this.value)
  }

  // CREATE KONVE STAGE AND LAYER
  var updateSampleStage = new Konva.Stage({
   container: 'textSample',
   width: 360,
   height: 200
  });

  updateSampleStage.getContainer().style.border = '1px solid grey';
  var updateSampleLayer = new Konva.Layer();
  updateSampleStage.add(updateSampleLayer);
  var updateSampleGroup = new Konva.Group();
  function updateSample(textpara,fontfamily,textsize,bold,italic,weight) {
      var f = getText(textpara,fontfamily,textsize,bold,italic,weight)
      updateSampleLayer.clearBeforeDraw(true);
      updateSampleLayer.clearCache();
      updateSampleGroup.destroy();
      updateSampleLayer.draw();
      var q = 9;
      if (q >= 10) {
          q = 5
      }
      var g = applyDeselRatio(q);
      var d = Math.ceil(updateSampleStage.width() / g);
      var p = Math.ceil(updateSampleStage.height() / q);
      var o = Math.max(0, Math.floor((f.width - d) / 2));
      var m = Math.max(0, Math.floor((f.height - p) / 2));
      var j = Math.min(f.width, 1 + Math.ceil((f.width + d) / 2));
      var h = Math.min(f.height, 1 + Math.ceil((f.height + p) / 2));
      var b = Math.floor(updateSampleStage.width() / 2 - g * f.width / 2);
      var a = Math.floor(updateSampleStage.height() / 2 - q * f.height / 2);
      for (var l = m; l < h; l++) {
          var k = (false && (l & 1)) ? Math.round(g / 2) : 0;
          for (var n = o; n < j; n++) {
              var e = (l * f.width + n) * 4;

              var fillStyle = f.data[e + 3] == 255 ? "#000000" : "#ffffff";
              var complexText = new Konva.Text({
                x: b + n * g + k,
                y: a + l * q,
                text: 'X',
                fill: fillStyle,
                align: 'center',
              });
              updateSampleGroup.add(complexText);
          }
      }
      updateSampleLayer.add(updateSampleGroup);
      updateSampleLayer.draw();
      updateSampleStage.draw();
  }

  var hiddenSampleStage = new Konva.Stage({
	     container: 'textSample1',
	     width: 80 * gridSize,
	     height: canvasWidth * gridSize,
	     visible: false
	    });
  var hiddenSampleLayer = new Konva.Layer();
  var sampleGridRectGroup = new Konva.Group()
  for (var ix = 0; ix < 50; ix++) {
      for (var iy = 0; iy < 50; iy++) {
        var sampleRect = new Konva.Rect({
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
        sampleGridRectGroup.add(sampleRect);                   // Add rectangle to group
      }
    }
    hiddenSampleLayer.add(sampleGridRectGroup);
    hiddenSampleStage.add(hiddenSampleLayer);

  var hiddenSampleGroup = new Konva.Group();

  function updateSample1(textpara,fontfamily,textsize,bold,italic,weight) {
      var f = getText(textpara,fontfamily,textsize,bold,italic,weight)
      hiddenSampleLayer.clearBeforeDraw(true);
      hiddenSampleLayer.clearCache();
      hiddenSampleGroup.destroy();
      hiddenSampleLayer.draw();
      var q = gridSize;
      var g = applyDeselRatio(q);
      var d = Math.ceil(hiddenSampleStage.width() / g);
      var p = Math.ceil(hiddenSampleStage.height() / q);
      var o = Math.max(0, Math.floor((f.width - d) / 2));
      var m = Math.max(0, Math.floor((f.height - p) / 2));
      var j = Math.min(f.width, 1 + Math.ceil((f.width + d) / 2));
      var h = Math.min(f.height, 1 + Math.ceil((f.height + p) / 2));
      var b = Math.floor(hiddenSampleStage.width() / 2 - g * f.width / 2);
      var a = Math.floor(hiddenSampleStage.height() / 2 - q * f.height / 2);
      for (var l = m; l < h; l++) {
          var k = (false && (l & 1)) ? Math.round(g / 2) : 0;
          for (var n = o; n < j; n++) {
              var e = (l * f.width + n) * 4;
              var fillStyle = f.data[e + 3] == 255 ? "#000000" : "#ffffff";
              var complexText = new Konva.Text({
                x: b + n * g + k,
                y: a + l * q,
                text: 'X',
                fill: fillStyle,
                align: 'center',
              });
              hiddenSampleGroup.add(complexText);
          }
      }
      hiddenSampleLayer.add(hiddenSampleGroup);
      hiddenSampleLayer.draw();
      hiddenSampleStage.draw();
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
  function getText(textpara, b, m, h, g,weight)
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


  $("#cloneSampleText").click(function(){
    $( hiddenSampleGroup.children ).each(function(key, val) {
      if(val.attrs.fill === '#ffffff')
         {
           val.destroy();
            hiddenSampleLayer.draw();
         }
         val.fontSize(txtFillSize);
         var xx = (Math.round(val.attrs.x / gridSize) * gridSize), yy = (Math.round(val.attrs.y / gridSize) * gridSize);
         val.attrs.x = xx;
         val.attrs.y = yy;
         val.attrs.fill = 'red'
       });
    newfunction(hiddenSampleGroup);
    $('.close').click();
  });

var toAnimate = true;
function newfunction(aa)
{
      var canvasPos = getPosition(stage);
      var mouseX = 0;
      var mouseY = 0;
      canvasGridLayer.addEventListener("mousemove", function setMousePosition(e){
        mouseX = e.layerX - canvasPos.x;
        mouseY = e.layerY - canvasPos.y;
        if(toAnimate){
          update(mouseX,mouseY,aa);
        }
      }, false);
      canvasGridLayer.addEventListener("click", stopfollow, false);
}
function update(mouseX,mouseY,aa)
{
    canvasGridLayer.clearBeforeDraw(true);
    canvasGridLayer.clearCache();
    $(canvasGridLayer.children).each(function(key, val){
      if(val.attrs.name === "sampleGroupCloned"){
        val.destroy();
      }
    })
    canvasGridLayer.draw();

    var b = aa.clone({name:'sampleGroupCloned', visible:true});

    b.attrs.x = mouseX-350
    b.attrs.y = mouseY-350
    canvasGridLayer.add(b);
    canvasGridLayer.draw();
    stage.batchDraw();
    // console.log(canvasGridLayer)
}
function stopfollow(e)
{
  var groups = stage.find(node => {
    return node.getType() === 'Group';
  });
  var RectList = canvasGridLayer.find("Rect");

  $( groups).each(function(key, val) {
      if(val.attrs.name === "sampleGroupCloned")
       {
         val.position({
           x: Math.round(val.x() / gridSize) * gridSize,
           y: Math.round(val.y() / gridSize) * gridSize
         });
         stage.batchDraw();
         var fillTextArr = [];
         //console.log(val.children);
         $(val.children).each(function(key,ctextval){
           var xVal = ctextval.attrs.x
           var yVal = ctextval.attrs.y
           fillTextArr.push(`{x : ${xVal},y : ${yVal}}`)
         })

         $( RectList ).each(function(key, rectval) {
            var xY = `{x : ${rectval.attrs.x},y : ${rectval.attrs.y}}`

            if(fillTextArr.indexOf(xY) !== -1)
            {
              rectval.attrs.filled = true;
            }
          });
      }
  });
  toAnimate = false;
}
    function getPosition(el)
    {
          var xPosition = 0;
          var yPosition = 0;

          var offsetLeft = el.content.offsetLeft;
          var scrollLeft = el.content.scrollLeft;
          var clientLeft = el.content.clientLeft;

          var offsetTop = el.content.offsetTop;
          var scrollTop = el.content.scrollTop;
          var clientTop = el.content.clientTop;

          var offsetParent = el.content.offsetParent;

          while (el) {
            // console.log(el)
            xPosition += (offsetLeft - scrollLeft + clientLeft);
            yPosition += (offsetTop - scrollTop + clientTop);
            el = offsetParent;
            break;
          }
          return {
            x: xPosition,
            y: yPosition
          };
      }
  /*  Text popup ends here  */
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
    canvasInit('#000000');
    var myVar = setTimeout(showPage, 1000);
});

function showPage() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("myDiv").style.display = "block";
}


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

//
// window.onbeforeunload = function() {
//     localStorage.removeItem('clothframe');
//     localStorage.removeItem('canvasBgColor');
//     localStorage.removeItem('gridStrokeCPara');
//     localStorage.removeItem('gridShadowCPara');
//     localStorage.removeItem('circleStrokeCPara');
//     localStorage.removeItem('circleFillCPara');
//     return '';
// }
