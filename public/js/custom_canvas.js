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
    textFillColor = '#000000'
    /*  Text color  */
    var textColor = "";
    $(document).on('click', 'ul#select_style_color_ul li',function() {
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
    canvasGridLayer = new Konva.Layer();         //  a Layer2 for canvas Grid
    var textlayer = new Konva.Layer();
    var newlayer = new Konva.Layer({name:'newlayer',hitGraphEnabled:false});
    /*  Layers creation ends here! */

    /*  Create new group  */
    // var gridRectGroup = new Konva.Group();
    // var gridCircleGroup = new Konva.Group();
    var gridTextGroup = new Konva.Group();
    var gridcloneGroup = new Konva.Group();
    var gridSelectGroup = new Konva.Group();
    var gridHiddenTextGroup = new Konva.Group({name:'hiddenGroup', visible: false});
    //textlayer.add(gridcloneGroup);
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
    else {
      cr = 0;
      lineStroke = 1;
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
    $(".canvas_tool").click(function(){
      $('.toolbar_list li').removeClass('active');
      $(this).addClass('active');
       mode = $(this).data('mode');
       if(mode == 'refresh')location.reload();
    });
    /*   Change tool mode function ends here!   */

    // draw a rectangle to be used as the rubber area
    var r2 = new Konva.Rect({x: 0, y: 0, width: 0, height: 0, stroke: 'red', dash: [2,2], name:'selectShape'})
    r2.listening(false); // stop r2 catching our mouse events.
    gridSelectGroup.add(r2);
    //textlayer.add(gridSelectGroup);

    /*    Fill Grid cell   */
    stage.on('mousedown', function(evt){
      isMouseDown = true;
      if (isMouseDown)
      {
        box = evt.target;
        switch (mode)
        {
           case 'pencil':
               if(box.attrs.filled === false)
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
                   box.attrs.filled = true;
                   text.draw();
                }
           break;
           case 'eraser':
               if(box.attrs.filled === true)
              {
                 if(evt.target.className === 'Text')
                 {
                     evt.target.destroy();
                 }
                 box.attrs.filled = false;
               }
               if(evt.target.className === 'Line')
               {
                   evt.target.destroy();
                   box.attrs.lineDraw = false;
               }
               textlayer.draw();
           break;
           case 'select_shape':
             startDrag({x: Math.round(box.x() / gridSize) * gridSize, y: Math.round(box.y() / gridSize) * gridSize})
           break;
           case 'back_stich':
                points=[];
                var secondX = nearest(evt.evt.layerX,box.x(),box.x()+gridSize);
                var secondY = nearest(evt.evt.layerY,box.y(),box.y()+gridSize);
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
             updateDrag({x: Math.round(box.x() / gridSize) * gridSize, y: Math.round(box.y() / gridSize) * gridSize},true)
             var lineList = textlayer.find("Line");
             $( lineList ).each(function(key, lineval)
             {
                 if(lineval.attrs.selected === 'selected')
                 {
                       var cloneline  = lineval.clone({name :'cloneLine',selected : ''});
                       gridcloneGroup.add(cloneline);
                       gridcloneGroup.draggable(true);
                       textlayer.add(gridcloneGroup);
                       lineval.attrs.selected = '';
                       lineval.destroy();
                       textlayer.draw();
                 }
             });
              var textList = textlayer.find("Text");
              $( textList ).each(function(key, val) {
                if(val.attrs.selected === 'select')
                {
                    var clonerect  = val.clone({x: val.x(), y: val.y(), name :'cloneRect',selected : ''});
                    gridcloneGroup.add(clonerect);
                    gridcloneGroup.draggable(true);
                    textlayer.add(gridcloneGroup);
                    textlayer.draw();
                    val.attrs.selected = '';
                    positionXY.push(`{"x":${val.x()},"y":${val.y()}}`)
                    $( selected_rect ).each(function(key, rect) {
                      if(rect.attrs.x === val.attrs.x && rect.attrs.y === val.attrs.y)
                      {
                        rect.attrs.filled = false;
                        textlayer.draw();
                      }
                     });
                    val.destroy();
                  }
              })
              r2.visible(true);
         break;
         case 'back_stich':
             var line = textlayer.find("Line");
             line[line.length-1].attrs.drawLine = false;
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
             if(box.attrs.filled === false)
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
                 box.attrs.filled = true;
                 text.draw();
             }
             if(box.className === 'Rect' && box.attrs.filled === true)
             {
                selected_rect.push(box);
             }
           break;
           case 'eraser':
           if(box.attrs.filled === true)
             {
                var textList = textlayer.find("Text");
                $( textList ).each(function(key, val) {
                     if(evt.target.className == 'Text')
                     {
                       evt.target.destroy();
                     }
               });
               box.attrs.filled = false;
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
             updateDrag({x: Math.round(box.x() / gridSize) * gridSize, y: Math.round(box.y() / gridSize) * gridSize},false)
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
             console.log('Text Mode!');
           break;
           default:
         }
      }
    });

    /*  Select tool Functionality   */
    gridcloneGroup.on('dragstart', function(e) {
        r2.visible(false);
        selected_rect = [];
        posStart ='';
        posNow = '';
    });
    gridcloneGroup.on('dragend', function()
    {
        var zText =0;
        var z = 0 ;
        var fillTextArrGp = [];
        var fillLineArrGp = [];

        $(gridcloneGroup.children).each(function(){
            if(gridcloneGroup.children[z]['className'] === "Line")
            {
              if((Math.round(gridcloneGroup.attrs.x / gridSize) * gridSize) > 0 )
              {
                 var x1Val = Math.abs(Math.round(gridcloneGroup.children[z]['attrs']['points'][0]/ gridSize) * gridSize) + Math.abs(Math.round(gridcloneGroup.x() / gridSize) * gridSize);
                 var x2Val = Math.abs(Math.round(gridcloneGroup.children[z]['attrs']['points'][2]/ gridSize) * gridSize) + Math.abs(Math.round(gridcloneGroup.x() / gridSize) * gridSize);
              }
              else
              {
                  var x1Val = Math.abs(Math.round(gridcloneGroup.children[z]['attrs']['points'][0]/ gridSize) * gridSize) - Math.abs(Math.round(gridcloneGroup.x() / gridSize) * gridSize);
                  var x2Val = Math.abs(Math.round(gridcloneGroup.children[z]['attrs']['points'][2]/ gridSize) * gridSize) - Math.abs(Math.round(gridcloneGroup.x() / gridSize) * gridSize);
              }
               if((Math.round(gridcloneGroup.attrs.y / gridSize) * gridSize) > 0 ){
                 var y1Val = Math.abs(Math.round(gridcloneGroup.children[z]['attrs']['points'][1]/ gridSize) * gridSize) + Math.abs(Math.round(gridcloneGroup.y() / gridSize) * gridSize);
                 var y2Val = Math.abs(Math.round(gridcloneGroup.children[z]['attrs']['points'][3]/ gridSize) * gridSize) + Math.abs(Math.round(gridcloneGroup.y() / gridSize) * gridSize);
               } else{
                 var y1Val = Math.abs(Math.round(gridcloneGroup.children[z]['attrs']['points'][1]/ gridSize) * gridSize) - Math.abs(Math.round(gridcloneGroup.y() / gridSize) * gridSize);
                 var y2Val = Math.abs(Math.round(gridcloneGroup.children[z]['attrs']['points'][3]/ gridSize) * gridSize) - Math.abs(Math.round(gridcloneGroup.y() / gridSize) * gridSize);
               }
               var obj ={
                  'newpoints': [x1Val,y1Val,x2Val,y2Val],
                  'nstroke': gridcloneGroup.children[z]['attrs']['stroke'],
                  'nswidth': gridcloneGroup.children[z]['attrs']['strokeWidth'],
                  'ndrawline' : gridcloneGroup.children[z]['attrs']['drawLine'],
                  'ntension' : gridcloneGroup.children[z]['attrs']['tension'],
                  'npdraw' : gridcloneGroup.children[z]['attrs']['perfectDrawEnabled']
              }
              fillLineArrGp.push(obj);
            }
            else {
              //console.log(positionXY[z])
                var xPosition ;
                var yPosition;
                if(zText == 0)
                {
                  var firstpostionXY = JSON.parse(positionXY[zText]);

                   if((Math.round(gridcloneGroup.attrs.x / gridSize) * gridSize) > 0 ){
                    var xVal = gridcloneGroup.children[z]['attrs']['x'] = firstpostionXY.x + Math.abs(Math.round(gridcloneGroup.attrs.x / gridSize) * gridSize);
                  } else {
                    var xVal = gridcloneGroup.children[z]['attrs']['x'] = firstpostionXY.x - Math.abs(Math.round(gridcloneGroup.attrs.x / gridSize) * gridSize);
                  }
                    if((Math.round(gridcloneGroup.attrs.y / gridSize) * gridSize) > 0 ){
                      var yVal = gridcloneGroup.children[z]['attrs']['y'] = firstpostionXY.y + Math.abs(Math.round(gridcloneGroup.attrs.y / gridSize) * gridSize);
                    } else {
                      var yVal = gridcloneGroup.children[z]['attrs']['y'] = firstpostionXY.y - Math.abs(Math.round(gridcloneGroup.attrs.y / gridSize) * gridSize);
                    }
                    fillTextArrGp.push(`{x : ${xVal},y : ${yVal}}`)
                }
                else {
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
              if((Math.round(gridcloneGroup.attrs.x / gridSize) * gridSize) > 0 ){
               var xVal = gridcloneGroup.children[z]['attrs']['x'] = xPosition + Math.abs(Math.round(gridcloneGroup.attrs.x / gridSize) * gridSize);
             } else {
               var xVal = gridcloneGroup.children[z]['attrs']['x'] = xPosition - Math.abs(Math.round(gridcloneGroup.attrs.x / gridSize) * gridSize);
             }
               if((Math.round(gridcloneGroup.attrs.y / gridSize) * gridSize) > 0 ){
                 var yVal = gridcloneGroup.children[z]['attrs']['y'] = yPosition + Math.abs(Math.round(gridcloneGroup.attrs.y / gridSize) * gridSize);
               } else{
                 var yVal = gridcloneGroup.children[z]['attrs']['y'] = yPosition - Math.abs(Math.round(gridcloneGroup.attrs.y / gridSize) * gridSize);
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
           var xY = `{x : ${rectval.attrs.x},y : ${rectval.attrs.y}}`

           if(fillTextArrGp.indexOf(xY) !== -1)
           {
             $(gridcloneGroup.children).each(function(key, val){
                  if(val.className === "Text" && val.attrs.x == rectval.attrs.x && val.attrs.y == rectval.attrs.y)
                 {
                   rectval.shadowEnabled(false);
                   text = new Konva.Text({
                     text: 'X',
                     x: rectval.x(),
                     y: rectval.y(),
                     fontFamily: 'sans-serif',
                     fontSize: txtFillSize,
                     fill: val.attrs.fill,
                     fontStyle : 'normal',
                     filled : true,
                     transformsEnabled : 'position'
                   });
                   rectval.attrs.filled = true;
                   rectval.height = text.getHeight();
                   gridTextGroup.add(text);
                   text.draw();
                   rectval.attrs.filled = true;
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
        gridcloneGroup.destroy();
        gridcloneGroup.clearCache();
        textlayer.clearCache();
        textlayer.draw();
        positionXY = [];
        mode = '';
        $('.toolbar_list li').removeClass('active');
    });

    function startDrag(posIn){
      posStart = {x: posIn.x, y: posIn.y};
      posNow = {x: posIn.x, y: posIn.y};
    }

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
         var textList = textlayer.find("Text");
         $( textList ).each(function(key, val) {
           if(val.attrs.x >= r2.attrs.x && val.attrs.x < (r2.attrs.x+r2.attrs.width) && val.attrs.y >= r2.attrs.y && val.attrs.y < (r2.attrs.y+r2.attrs.height)){
               val.setAttr('selected','select');
            }
          // console.log(val.attrs);
         })
         var lineList = textlayer.find("Line");
         $( lineList ).each(function(key, lineval) {
           if(lineval.attrs.points[0] >= r2.attrs.x && lineval.attrs.points[2] <= (r2.attrs.x+r2.attrs.width) && lineval.attrs.points[1] >= r2.attrs.y && lineval.attrs.points[3] <= (r2.attrs.y+r2.attrs.height)){
             lineval.attrs.selected = 'selected';
           }
         })
       }
       textlayer.draw(); // redraw any changes.
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
    /*  Select Tool Functionality ends here!  */

    /*  Layer2 Create a grid on canvas work ends here!*/
    textlayer.add(gridTextGroup,gridSelectGroup,gridcloneGroup);
    stage.add(backgroundCanvas,canvasGridLayer,textlayer,newlayer);          // Add Layer to stage
    json = stage.toJSON();      // Save entire canvas as json
    $("#download_canvas").click(function(){
      // newjson = stage.toJSON();
      // console.log(newjson);
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
      window.location.href = $("#upload_page_url").val();
    })

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
                // complexText.draw();
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
           var xx = (Math.round(val.attrs.x / gridSize) * gridSize), yy = (Math.round(val.attrs.y / gridSize) * gridSize);
           val.attrs.x = xx;
           val.attrs.y = yy;
           val.attrs.fill = textFillColor;
           val.attrs.transformsEnabled = 'position';
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
    function update(mouseX,mouseY)
    {
        newlayer.visible(true)
        newlayer.clearBeforeDraw(true);
        newlayer.clearCache();
        $(newlayer.children).each(function(key, val){
          if(val.attrs.name === "sampleGroupCloned"){
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

      var firstpostionXY = {x : gridHiddenTextGroup.children[0]['attrs']['x'], y : gridHiddenTextGroup.children[0]['attrs']['y']}

      var xPosition ;
      var yPosition;

      var groups = stage.find(node => {
        return node.getType() === 'Group';
      });
      var RectList = stage.find("Rect");

      $( groups).each(function(key, val) {
          if(val.attrs.name === "sampleGroupCloned")
           {
             for($i = 0 ; $i < gridHiddenTextGroup.children.length ; $i ++){
               if(z == 0)
                {
                   if((Math.round(val.attrs.x / gridSize) * gridSize) > 0 ){
                     var xVal  = firstpostionXY.x + Math.abs(Math.round(val.attrs.x / gridSize) * gridSize);
                  } else {

                    var xVal = firstpostionXY.x - Math.abs(Math.round(val.attrs.x / gridSize) * gridSize);
                  }
                    if((Math.round(val.attrs.y / gridSize) * gridSize) > 0 ){
                      var yVal = firstpostionXY.y + Math.abs(Math.round(val.attrs.y / gridSize) * gridSize);
                    } else {
                      var yVal  = firstpostionXY.y - Math.abs(Math.round(val.attrs.y / gridSize) * gridSize);
                    }
                    fillTextArr.push(`{x : ${Math.abs(Math.round(xVal/gridSize)*gridSize)},y : ${Math.abs(Math.round(yVal/gridSize)*gridSize)}}`)
                }
                else {
                  if((Math.round(val.attrs.x / gridSize) * gridSize) > 0 ){
                     var xVal  = gridHiddenTextGroup.children[z]['attrs']['x'] + Math.abs(Math.round(val.attrs.x / gridSize) * gridSize);
                   } else {
                     var xVal = gridHiddenTextGroup.children[z]['attrs']['x'] - Math.abs(Math.round(val.attrs.x / gridSize) * gridSize);
                   }
                   if((Math.round(val.attrs.y / gridSize) * gridSize) > 0 ){
                     var yVal = gridHiddenTextGroup.children[z]['attrs']['y'] + Math.abs(Math.round(val.attrs.y / gridSize) * gridSize);
                   } else{
                     var yVal = gridHiddenTextGroup.children[z]['attrs']['y'] - Math.abs(Math.round(val.attrs.y / gridSize) * gridSize);
                   }
                  fillTextArr.push(`{x : ${Math.abs(Math.round(xVal/gridSize)*gridSize)},y : ${Math.abs(Math.round(yVal/gridSize)*gridSize)}}`)
                }
                z++;
             };
             newlayer.visible(false)
             $( RectList ).each(function(key, rectval) {
                var xY = `{x : ${rectval.attrs.x},y : ${rectval.attrs.y}}`

                if(fillTextArr.indexOf(xY) !== -1)
                {
                  newlayer.visible(true)
                  newlayer.clearBeforeDraw(true);
                  newlayer.clearCache();
                  $(newlayer.children).each(function(key, val){
                    if(val.attrs.name === "sampleGroupCloned"){
                      val.destroy();
                    }
                  })
                  newlayer.draw();
                  rectval.attrs.filled = true;
                  text = new Konva.Text({
                    text: 'X',
                    x: rectval.attrs.x,
                    y: rectval.attrs.y,
                    fontFamily: 'sans-serif',
                    fontSize: txtFillSize,
                    fill: textFillColor,
                    fontStyle : 'normal',
                    filled : true,
                    transformsEnabled : 'position'
                  });
                  rectval.attrs.filled = true;
                  rectval.height = text.getHeight();
                  gridTextGroup.add(text);
                  text.draw();
                  selected_rect.push(rectval);
                }
              });
          }
      });
      toAnimate = false;
    }

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
