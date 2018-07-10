/*    Konva canvas file   */
$( window ).on( "load", function() {
    /*    Declare Global Variables    */
    clothframe = localStorage.getItem("clothframe");

    var frame = clothframe.split(" X ");
    var stageWidth = 805,
        canvasWidth = frame[1],                             // Grid Width
        canvasHeight = frame[0],                            // Grid Height
        gridSize = Math.round(stageWidth/canvasWidth),        // Grid Tile Size
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
        json,                               // Json variable for final canvas output
        cr,                                 // Circle radius variable
        lineStroke,                         // Line width for back stitch
        txtFillSize = Math.round(gridSize), // Text font size
        posStart,                           // Select tool position start
        posNow,                             // Select tool Current position.
        selected_rect = [],                 // For Select Tool
        points =[],                         // For BAck Stitch
        positionXY = [],
        lineStrokeColor = '#000000';

    canvasMainBgcolor = localStorage.getItem("canvasBgColor");
    gridStrokeColor = localStorage.getItem("gridStrokeCPara");
    gridShadowColor = localStorage.getItem("gridShadowCPara");
    circleStrokeColor = localStorage.getItem("circleStrokeCPara");
    circleFillColor = localStorage.getItem("circleFillCPara");
    textFillColor = '#000000';
    /*  Text color  */
    var textColor = "";
    $(document).on('click', 'ul#select_style_color_ul li',function()
    {
        var textClr = $(this).attr('value');
        changeColor(textClr);
    })
    function changeColor(x)
    {
      textFillColor = x;
    }

    /*  create stage for main canvas  */
    stage = new Konva.Stage({
        container: 'canvas',                  // Canvas container
        width: stageWidth,        // Canvas Width
        height: canvasHeight * gridSize       // Canvas Height
    });

    /*  Create Multiple Layers for stage  */
    backgroundCanvas = new Konva.Layer();        // Layer1 for canvas main background
    canvasGridLayer = new Konva.Layer();         // Layer2 for canvas Grid
    var textlayer = new Konva.Layer();           // Layer3 for Text
    var newlayer = new Konva.Layer({name:'newlayer',hitGraphEnabled:false});  // Layer4 for Movement of text for text popup
    /*  Layers creation ends here! */

    /*  Create new group  */
    var gridTextGroup = new Konva.Group();      // Group for all the functionlities
    var gridSelectGroup = new Konva.Group();    // Group for select shape rectangle.
    var gridHiddenTextGroup = new Konva.Group({name:'hiddenGroup', visible: false});  // Group for hidden text

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

    /*  Set Circle radius and line stroke for differnt grid sizes. cr = Circle Radius, lineStroke = Line Stroke */
    if(Math.round(gridSize) >= 20)
    {
      cr = 2;
      lineStroke = 4;
    }
    else if(Math.round(gridSize) >= 10)
    {
      cr = 1;
      lineStroke = 3;
    }
    else
    {
      cr = 0;
      lineStroke = 1;
    }

    /*  Layer2 Create a grid on canvas work starts here!*/
    for (var ix = 0; ix < canvasWidth; ix++)
    {
        for (var iy = 0; iy < canvasHeight; iy++)
        {
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
              lineDraw: false
          });
          circle = new Konva.Circle({
            x: box.x(),
            y: box.y(),
            radius: cr,
            stroke: circleStrokeColor,
            strokeWidth: 1,
          });
          canvasGridLayer.add(box);                   // Add rectangle to group
          canvasGridLayer.add(circle);             // Add rectangle to background layer
        }
    }

    /*   Change tool mode function starts here!   */
    $(".canvas_tool").click(function()
    {
        $('.toolbar_list li').removeClass('active');
        $(this).addClass('active');
        mode = $(this).data('mode');
        if(mode == 'refresh') location.reload();
    });
    /*   Change tool mode function ends here!   */

    // draw a rectangle to be used as the rubber area
    var r2 = new Konva.Rect({x: 0, y: 0, width: 0, height: 0, strokeWidth:0.8, stroke: '#2c2c25', dash: [5,6], name:'selectShape'})
    r2.listening(false); // stop r2 catching our mouse events.
    gridSelectGroup.add(r2);

    /*    Fill Grid cell   */
    stage.on('mousedown', function(evt){
      isMouseDown = true;
      if (isMouseDown)
      {
        box = evt.target;
        switch (mode)
        {
           case 'pencil':
               if(box.getAttr('filled') === false)
               {
                   text = new Konva.Text({
                     text: 'X',
                     x: box.x(),
                     y: box.y(),
                     fontFamily: 'sans-serif',
                     fontSize: txtFillSize,
                     fill: textFillColor,
                     fontStyle : 'normal',
                     filled : true,
                     transformsEnabled : 'position'
                   });
                   gridTextGroup.add(text);
                   box.setAttr('filled', true);
                   text.draw();
                   selected_rect.push(box);
                }
                if(box.getAttr('filled') === true)
                {
                  box.setAttr('filled', false);
                  textlayer.draw();
                  if(evt.target.className === 'Text')
                  {
                      evt.target.destroy();
                  }
                  box.setAttr('filled', false);
                  textlayer.draw();
                }
           break;
           case 'eraser':
               if(box.getAttr('filled') === true)
              {
                 if(evt.target.className === 'Text')
                 {
                     evt.target.destroy();
                 }
                 box.setAttr('filled', false);
               }
               if(evt.target.className === 'Line')
               {
                   evt.target.destroy();
                   box.setAttr('lineDraw', false);
               }
               textlayer.draw();
           break;
           case 'select_shape':
              startDrag({x: box.x(), y: box.y()})
           break;
           case 'back_stich':
                 points=[];
                 var secondX = nearest(evt.evt.layerX, box.x(), box.x() + gridSize);
                 var secondY = nearest(evt.evt.layerY, box.y(), box.y() + gridSize);
                 points.push(box.x(),box.y(),secondX,secondY)
                 var line = new Konva.Line({
                     points :points,
                     stroke: lineStrokeColor,
                     strokeWidth: lineStroke,
                     drawLine : true,
                     tension: 0,
                     perfectDrawEnabled: false,
                 });
                 textlayer.add(line);
                 line.draw();
           break;
           case 'case text':
           break;
           default:
         }
      }
    });
    stage.on('mouseup',function(evt){
      isMouseDown= false
      box = evt.target;
      switch (mode)
      {
         case 'select_shape':
               updateDrag({x: box.x(), y: box.y()},true);
               var gridcloneGroup = new Konva.Group({name:"selectCloneGrup"});  // Group to clone text and lines for select shape
               gridcloneGroup.destroy();
               textlayer.draw();
               var lineList = textlayer.find("Line");
               $( lineList ).each(function(key, lineval)
               {
                   if(lineval.getAttr('selected') === 'selected')
                   {
                         var cloneline  = lineval.clone({name :'cloneLine',selected : ''});
                         gridcloneGroup.add(cloneline);
                         gridcloneGroup.draggable(true);
                         textlayer.add(gridcloneGroup);
                         lineval.setAttr('selected', '');
                         lineval.destroy();
                         textlayer.draw();
                   }
               });
              var rectList = stage.find("Rect");
              $( rectList ).each(function(key, rval)
              {
                  if(rval.name() !== 'selectShape')
                  {
                      if(rval.getAttr('selected') === 'select')
                      {
                          var clonerect  = rval.clone({ x: rval.x(), y: rval.y(), name :'cloneRect',selected : '',shadowEnabled:false,strokeEnabled:false });
                          gridcloneGroup.add(clonerect);
                          gridcloneGroup.draggable(true);
                          textlayer.add(gridcloneGroup);
                          textlayer.draw();
                          rval.setAttr('selected', '');
                          // positionXY.push(`{"x":${val.x()},"y":${val.y()}}`)
                          $( selected_rect ).each(function(key, rect) {
                            if(rect.attrs.x === rval.attrs.x && rect.attrs.y === rval.attrs.y)
                            {
                              rect.setAttr('filled', false);
                              textlayer.draw();
                            }
                           });
                      }
                  }
              })
              var textList = textlayer.find("Text");
              $( textList ).each(function(key, val) {
                if(val.getAttr('selected') === 'select')
                {
                    var clonerect  = val.clone({x: val.x(), y: val.y(), name :'cloneRect',selected : ''});
                    gridcloneGroup.add(clonerect);
                    gridcloneGroup.draggable(true);
                    textlayer.add(gridcloneGroup);
                    textlayer.draw();
                    val.setAttr('selected', '');
                    positionXY.push(`{"x":${val.x()},"y":${val.y()}}`)
                    $( selected_rect ).each(function(key, rect) {
                      if(rect.attrs.x === val.attrs.x && rect.attrs.y === val.attrs.y)
                      {
                        rect.setAttr('filled', false);
                        textlayer.draw();
                      }
                     });
                    val.destroy();
                  }
              })
              r2.visible(true);
              draggroup();
         break;
         case 'back_stich':
             var line = textlayer.find("Line");
             line[line.length-1].setAttr('lineDraw', false);
         break;
         default:
         // stage.container().style.cursor = 'pointer';
       }
    })
    stage.on('mouseover', function(evt) {
      if (isMouseDown)
      {
        box = evt.target;
        switch (mode)
        {
           case 'pencil':
             if(box.getAttr('filled') === false)
             {
                 text = new Konva.Text({
                   text: 'X',
                   x: box.x(),
                   y: box.y(),
                   fontFamily: 'sans-serif',
                   fontSize: txtFillSize,
                   fill: textFillColor,
                   fontStyle : 'normal',
                   filled : true,
                   transformsEnabled : 'position'
                 });
                 gridTextGroup.add(text);
                 box.setAttr('filled', true);
                 text.draw();
                 selected_rect.push(box);
             }
           break;
           case 'eraser':
              if(box.getAttr('filled') === true)
               {
                  var textList = textlayer.find("Text");
                  $( textList ).each(function(key, val) {
                       if(evt.target.className == 'Text')
                       {
                         evt.target.destroy();
                       }
                 });
                 box.setAttr('filled', false);
               }
               var lineList = textlayer.find("Line");
                  $( lineList ).each(function(key, val) {
                    if(val.attrs.points[0] === box.x() && val.attrs.points[1] === box.y())
                    {
                      val.destroy();
                    }
                 });
                textlayer.batchDraw();
           break;
           case 'select_shape':
              updateDrag({x: box.x(), y: box.y()},false)
           break;
           case 'back_stich':
               points=[];

               var line = textlayer.find("Line");

               var last_two_values = line[line.length-1].points().slice(-2);

               if((typeof box.attrs.x !== "undefined") || ( typeof box.attrs.y !== "undefined")){
                 var secondX = nearest(evt.evt.layerX,box.x(),box.x()+Math.round(gridSize));
                 var secondY = nearest(evt.evt.layerY,box.y(),box.y()+Math.round(gridSize));
                 points.push((Math.round(last_two_values[0]/ gridSize) * gridSize),(Math.round(last_two_values[1] / gridSize) * gridSize),(Math.round(secondX / gridSize) * gridSize),(Math.round(secondY / gridSize) * gridSize));
                 var line = new Konva.Line({
                      points :points,
                      stroke: lineStrokeColor,
                      strokeWidth: lineStroke,
                      drawLine : true,
                      tension: 0,
                      perfectDrawEnabled: false,
                  });
                  textlayer.add(line);
                  line.draw();
               }
           break;
           case 'case text':
           break;
           default:
         }
      }
    });


    /*  Select tool Functionality   */
    function draggroup()
    {
        var groups = stage.find(node => { return node.getType() === 'Group'; });
        $( groups).each(function(key, grup)
        {
            if(grup.name() === "selectCloneGrup")
             {
                 grup.on('dragstart', function(e)
                 {
                     r2.visible(false);
                     posStart ='';
                     posNow = '';
                 });
                 grup.on('dragend', function()
                 {
                     var zText =0;
                     var z = 0 ;
                     var fillTextArrGp = [];
                     var fillLineArrGp = [];

                     $(grup.children).each(function(key,val)
                     {
                         if(val.className === "Line")
                         {
                           if((Math.round(grup.attrs.x / gridSize) * gridSize) > 0 )
                           {
                              var x1Val = Math.abs(Math.round(val.attrs.points[0]/ gridSize) * gridSize) + Math.abs(Math.round(grup.x() / gridSize) * gridSize);
                              var x2Val = Math.abs(Math.round(val.attrs.points[2]/ gridSize) * gridSize) + Math.abs(Math.round(grup.x() / gridSize) * gridSize);
                           }
                           else
                           {
                               var x1Val = Math.abs(Math.round(val.attrs.points[0]/ gridSize) * gridSize) - Math.abs(Math.round(grup.x() / gridSize) * gridSize);
                               var x2Val = Math.abs(Math.round(val.attrs.points[2]/ gridSize) * gridSize) - Math.abs(Math.round(grup.x() / gridSize) * gridSize);
                           }
                            if((Math.round(grup.attrs.y / gridSize) * gridSize) > 0 ){
                              var y1Val = Math.abs(Math.round(val.attrs.points[1]/ gridSize) * gridSize) + Math.abs(Math.round(grup.y() / gridSize) * gridSize);
                              var y2Val = Math.abs(Math.round(val.attrs.points[3]/ gridSize) * gridSize) + Math.abs(Math.round(grup.y() / gridSize) * gridSize);
                            } else{
                              var y1Val = Math.abs(Math.round(val.attrs.points[1]/ gridSize) * gridSize) - Math.abs(Math.round(grup.y() / gridSize) * gridSize);
                              var y2Val = Math.abs(Math.round(val.attrs.points[3]/ gridSize) * gridSize) - Math.abs(Math.round(grup.y() / gridSize) * gridSize);
                            }
                            var obj ={
                               'newpoints': [x1Val,y1Val,x2Val,y2Val],
                               'nstroke': val.attrs.stroke,
                               'nswidth': val.attrs.strokeWidth,
                               'ndrawline' : val.attrs.drawLine,
                               'ntension' : val.attrs.tension,
                               'npdraw' : val.attrs.perfectDrawEnabled
                           }
                           fillLineArrGp.push(obj);
                         }
                         else if(val.className === "Text")
                         {
                             var xPosition ;
                             var yPosition;
                             if(zText == 0)
                             {
                               var firstpostionXY = JSON.parse(positionXY[zText]);
                                if((Math.round(grup.attrs.x / gridSize) * gridSize) > 0 ){
                                 var xVal = val.attrs.x = firstpostionXY.x + Math.abs(Math.round(grup.x() / gridSize) * gridSize);
                               } else {
                                 var xVal = val.attrs.x = firstpostionXY.x - Math.abs(Math.round(grup.x() / gridSize) * gridSize);
                               }
                                 if((Math.round(grup.attrs.y / gridSize) * gridSize) > 0 ){
                                   var yVal = val.attrs.y = firstpostionXY.y + Math.abs(Math.round(grup.y() / gridSize) * gridSize);
                                 } else {
                                   var yVal = val.attrs.y = firstpostionXY.y - Math.abs(Math.round(grup.y() / gridSize) * gridSize);
                                 }
                                 fillTextArrGp.push(`{x : ${xVal},y : ${yVal}}`)
                             }
                             else
                             {
                                 var postionXY = JSON.parse(positionXY[zText]);
                                 var prevPostionXY = JSON.parse(positionXY[zText-1]);
                                 if(postionXY.x !== prevPostionXY.x){
                                    xPosition = postionXY.x;
                                 }else {
                                    xPosition = prevPostionXY.x;
                                 }
                                 if(postionXY.y !== prevPostionXY.y){
                                    yPosition = postionXY.y;
                                 }else {
                                    yPosition = prevPostionXY.y;
                                 }
                                 if((Math.round(grup.attrs.x / gridSize) * gridSize) > 0 ){
                                  var xVal = val.attrs.x = xPosition + Math.abs(Math.round(grup.x() / gridSize) * gridSize);
                                } else {
                                  var xVal = val.attrs.x = xPosition - Math.abs(Math.round(grup.x() / gridSize) * gridSize);
                                }
                                  if((Math.round(grup.attrs.y / gridSize) * gridSize) > 0 ){
                                    var yVal = val.attrs.y = yPosition + Math.abs(Math.round(grup.y() / gridSize) * gridSize);
                                  } else{
                                    var yVal = val.attrs.y = yPosition - Math.abs(Math.round(grup.y() / gridSize) * gridSize);
                                  }
                                 fillTextArrGp.push(`{x : ${xVal},y : ${yVal}}`)
                           }
                           zText++;
                         }
                         z++;
                     })
                     var RectList = stage.find("Rect");
                     $( RectList ).each(function(key, rectval)
                     {
                        var xY = `{x : ${rectval.x()},y : ${rectval.y()}}`

                        if(fillTextArrGp.indexOf(xY) !== -1)
                        {
                          $(grup.children).each(function(key, val){
                               if(val.className === "Text" && val.attrs.x == rectval.attrs.x && val.attrs.y == rectval.attrs.y)
                              {
                                    text = new Konva.Text({
                                      text: val.text(),
                                      x: rectval.x(),
                                      y: rectval.y(),
                                      fontFamily: val.fontFamily(),
                                      fontSize: val.fontSize(),
                                      fill: val.fill(),
                                      fontStyle : val.fontStyle(),
                                      filled : true,
                                      transformsEnabled : val.transformsEnabled()
                                    });
                                    gridTextGroup.add(text);
                                    rectval.setAttr('filled', true);
                                    text.draw();
                                    selected_rect.push(rectval);
                              }
                            });
                        }
                     });
                     for(var t = 0; t<fillLineArrGp.length; t++)
                     {
                       var line = new Konva.Line({
                           points :fillLineArrGp[t]['newpoints'],
                           stroke: fillLineArrGp[t]['nstroke'],
                           strokeWidth: fillLineArrGp[t]['nswidth'],
                           drawLine : fillLineArrGp[t]['ndrawline'],
                           tension: fillLineArrGp[t]['ntension'],
                           perfectDrawEnabled: fillLineArrGp[t]['npdraw'],
                       });
                       textlayer.add(line);
                       line.draw();
                     }
                     grup.destroy();
                     textlayer.draw();
                     positionXY = [];
                 });
             }
        });
    }

    function startDrag(posIn){
      posStart = {x: posIn.x, y: posIn.y};
      posNow = {x: posIn.x, y: posIn.y};
    }

    function updateDrag(posIn,updateSelect){
      // update rubber rect position
      if(posIn.x !==0 && posIn.y !== 0){
       posNow = {x: posIn.x, y: posIn.y};
       var posRect = reverse(posStart,posNow);
       r2.x(posRect.x1);
       r2.y(posRect.y1);
       r2.width(posRect.x2 - posRect.x1);
       r2.height(posRect.y2 - posRect.y1);
       r2.visible(true);
       if(updateSelect == true){
         /* Find and push selected rect  */
         var stageRectList = stage.find("Rect");
         $( stageRectList ).each(function(key, rectval)
         {
           if(rectval.name() !== 'selectShape')
           {
               if(rectval.attrs.x >= r2.attrs.x && rectval.attrs.x < (r2.attrs.x+r2.attrs.width) && rectval.attrs.y >= r2.attrs.y && rectval.attrs.y < (r2.attrs.y+r2.attrs.height))
               {
                   rectval.setAttr('selected','select');
                   selected_rect.push(rectval);
               }
           }
         })
         /* Find and push selected text  */
         var textList = textlayer.find("Text");
         $( textList ).each(function(key, val)
         {
             if(val.attrs.x >= r2.attrs.x && val.attrs.x < (r2.attrs.x+r2.attrs.width) && val.attrs.y >= r2.attrs.y && val.attrs.y < (r2.attrs.y+r2.attrs.height))
             {
                 val.setAttr('selected','select');
             }
         });
         /* Find and push selected lines  */
         var lineList = textlayer.find("Line");
         $( lineList ).each(function(key, lineval)
         {
             if(lineval.attrs.points[0] >= r2.attrs.x && lineval.attrs.points[2] <= (r2.attrs.x+r2.attrs.width) && lineval.attrs.points[1] >= r2.attrs.y && lineval.attrs.points[3] <= (r2.attrs.y+r2.attrs.height))
             {
               lineval.setAttr('selected', 'selected');
             }
         });
       }
       textlayer.draw(); // redraw any changes.
         }
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
    /*  Select Tool Functionality ends here!  */

    function nearest(value, min, max)
    {
        if((value-min)>(max-value))
        {
            return max;
        }
        else
        {
          return min;
        }
    }

    /*  Text Popup script starts  */
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
    slider.oninput = function()
    {
      updateSample($("#textfill").val(),$('#textFontSelect').val(),$('#textFontsize').val(),$("#textFontBold").prop("checked"), $("#textFontItalic").prop("checked"),this.value)
      updateSample1($("#textfill").val(),$('#textFontSelect').val(),$('#textFontsize').val(),$("#textFontBold").prop("checked"), $("#textFontItalic").prop("checked"),this.value)
    }
    // CREATE KONVE STAGE AND LAYER for popup sample canvas starts here!
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
    // popup sample canvas ends here!

    // CREATE KONVE STAGE AND LAYER for sample grid canvas starts here!
    function updateSample1(textpara,fontfamily,textsize,bold,italic,weight) {
        var f = getText(textpara,fontfamily,textsize,bold,italic,weight)
         if(f.textWidth >=45)
         {
           $("#textToolTooWide").show();
         }
         else {
           $("#textToolTooWide").hide();
         }
        newlayer.clearBeforeDraw(true);
        newlayer.clearCache();
        gridHiddenTextGroup.destroy();
        newlayer.draw();
        var q = gridSize;
        var g = applyDeselRatio(q);
        var d = Math.ceil(stage.width() / g);
        var p = Math.ceil(stage.height() / q);
        var o = Math.max(0, Math.floor((f.width - d) / 2));
        var m = Math.max(0, Math.floor((f.height - p) / 2));
        var j = Math.min(f.width, 1 + Math.ceil((f.width + d) / 2));
        var h = Math.min(f.height, 1 + Math.ceil((f.height + p) / 2));
        var b = Math.floor(stage.width() / 2 - g * f.width / 2);
        var a = Math.floor(stage.height() / 2 - q * f.height / 2);

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
                gridHiddenTextGroup.add(complexText);
            }
        }
        newlayer.add(gridHiddenTextGroup);
        gridHiddenTextGroup.draw();
        stage.batchDraw();
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

      e['textWidth'] = Math.round(ctx.measureText(textpara).width);
      if (this.textWidth > 580) {
          this.textWidth = c.width
      }
      return e
    }
    function fontSpec(e, d, c, b)
    {
        var a = "";
        if (b) {
            a += "italic "
        }
        if (c) {
            a += "bold "
        }
        return a + d + "px " + e
    }

    function getTextHeight(c)
    {
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

    $("#cloneSampleText").click(function()
    {
        $( gridHiddenTextGroup.children ).each(function(key, val)
        {
           if(val.attrs.fill === '#ffffff')
           {
              val.destroy();
           }
           val.fontSize(txtFillSize);
           var xx = (Math.round(val.x() / gridSize) * gridSize), yy = (Math.round(val.y() / gridSize) * gridSize);
           val.setAttr('x', xx)
           val.setAttr('y', yy)
           val.setAttr('fill', textFillColor)
           val.setAttr('transformsEnabled', 'position')
        });
        $('.close').click();
        $('#popupForm')[0].reset();
        $("#textToolTooWide").hide();
        updateSampleGroup.destroy();
        updateSampleLayer.draw();
        newfunction();
    });
    var toAnimate = true;
    function newfunction()
    {
          toAnimate = true;
          var canvasPos = getPosition(stage);
          var mouseX = 0;
          var mouseY = 0;
          var posmin;
          if(Math.round(gridSize) >= 20)
          {
            posmin = 320;
          }
          else if(Math.round(gridSize) >= 10)
          {
            posmin = 290;
          }
          else {
            posmin = 300;
          }

          stage.addEventListener("mousemove", function setMousePosition(e){
            mouseX = e.layerX - canvasPos.x-posmin;
            mouseY = e.layerY - canvasPos.y-posmin;
            if(toAnimate){
              update(mouseX,mouseY);
            }
          });
          setTimeout(function(){
            $('.toolbar_list li').removeClass('active');
            $("#select_shape").addClass('active');
            mode = $("#select_shape").data('mode')
          }, 2000);

          stage.addEventListener("click", stopfollow);
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
    function update(mouseX,mouseY)
    {
        newlayer.visible(true)
        newlayer.clearBeforeDraw(true);
        newlayer.clearCache();
        $(newlayer.children).each(function(key, val){
          if(val.name() === "sampleGroupCloned"){
            val.destroy();
          }
        })
        newlayer.draw();
        var b = gridHiddenTextGroup.clone({x:mouseX, y: mouseY, name:'sampleGroupCloned', visible:true});
        newlayer.add(b);
        b.draw();
    }
    function stopfollow(e)
    {
      var z =0;
      var fillTextArr = [];

      var xPosition ;
      var yPosition;

      var groups = stage.find(node => { return node.getType() === 'Group'; });
      var RectList = stage.find("Rect");
      $( groups).each(function(key, val) {
          if(val.name() === "sampleGroupCloned")
           {
             $( val.children ).each(function(key, grupval) {

               if(z == 0)
                {
                   if((Math.round(val.x() / gridSize) * gridSize) > 0 ){
                     var xVal  = grupval.x() + Math.abs(Math.round(val.x() / gridSize) * gridSize);
                  } else {

                    var xVal = grupval.x() - Math.abs(Math.round(val.x() / gridSize) * gridSize);
                  }
                    if((Math.round(val.y() / gridSize) * gridSize) > 0 ){
                      var yVal = grupval.y() + Math.abs(Math.round(val.y() / gridSize) * gridSize);
                    } else {
                      var yVal  = grupval.y() - Math.abs(Math.round(val.y() / gridSize) * gridSize);
                    }
                    fillTextArr.push(`{x : ${Math.abs(Math.round(xVal/gridSize)*gridSize)},y : ${Math.abs(Math.round(yVal/gridSize)*gridSize)}}`)
                }
                else {
                  if((Math.round(val.x() / gridSize) * gridSize) > 0 ){
                     var xVal  = grupval.x() + Math.abs(Math.round(val.x() / gridSize) * gridSize);
                   } else {
                     var xVal = grupval.x() - Math.abs(Math.round(val.x() / gridSize) * gridSize);
                   }
                   if((Math.round(val.y() / gridSize) * gridSize) > 0 ){
                     var yVal = grupval.y() + Math.abs(Math.round(val.y() / gridSize) * gridSize);
                   } else{
                     var yVal = grupval.y() - Math.abs(Math.round(val.y() / gridSize) * gridSize);
                   }
                  fillTextArr.push(`{x : ${Math.abs(Math.round(xVal/gridSize)*gridSize)},y : ${Math.abs(Math.round(yVal/gridSize)*gridSize)}}`)
                }
                z++;
             });
             $( RectList ).each(function(key, rectval) {
                var xY = `{x : ${rectval.x()},y : ${rectval.y()}}`
                if(fillTextArr.indexOf(xY) !== -1)
                {
                      text = new Konva.Text({
                        text: 'X',
                        x: rectval.x(),
                        y: rectval.y(),
                        fontFamily: 'sans-serif',
                        fontSize: txtFillSize,
                        fill: textFillColor,
                        fontStyle : 'normal',
                        filled : true,
                        transformsEnabled : 'position'
                      });
                      gridTextGroup.add(text);
                      rectval.setAttr('filled', true);
                      text.draw();
                      selected_rect.push(rectval);
                }
              });
              $(newlayer.children).each(function(key, val){
                if(val.name() === "sampleGroupCloned"){
                  val.destroy();
                }
              })
              newlayer.draw();
          }
      });
      toAnimate = false;
    }

    /*  Layer2 Create a grid on canvas work ends here!*/
    textlayer.add(gridTextGroup,gridSelectGroup);
    stage.add(backgroundCanvas,canvasGridLayer,textlayer,newlayer);          // Add Layer to stage

    $("#download_canvas").click(function(){
      console.log(stage.toJSON())
      canvasGridLayer.cache();
      canvasGridLayer.filters([Konva.Filters.Grayscale]);
      textlayer.cache();
      textlayer.filters([Konva.Filters.Grayscale]);
      stage.add(canvasGridLayer,textlayer)
      jsonStage = stage.toDataURL();
      save_canvas(jsonStage);
      canvasGridLayer.clearCache();
      textlayer.clearCache();
      stage.add(canvasGridLayer,textlayer)

    })

    $("#save_canvas").click(function(){
      localStorage.setItem("stage_image_url", stage.toDataURL());
      localStorage.setItem("stage_json", stage.toJSON());
      window.location.href = $("#upload_page_url").val();
    })

    function save_canvas(jsonStage)
    {
      var doc = new jsPDF();
        doc.addImage(jsonStage, 'JPEG', 15, 40, 180, 100);
        doc.save('pattern.pdf');
    }

    /*  Text popup ends here  */

    /*   Loader on page load  */
    var myVar = setTimeout(function(){
        $("#loader").hide();
        $("#myDiv").show();
      }, 1000);
  });
