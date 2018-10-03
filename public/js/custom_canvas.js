/*    Konva canvas file   */
var gCacheStage, gCacheGrid;
$( window ).on( "load", function()
{
    canvasInit();
});
/*  Refresh canvas script */
$(document).on("click","#refresh_canvas",function()
{
    $( "#toolbar_section" ).load(window.location.href + " #toolbar_section" );
    $("#loader").show();
    $("#myDiv").hide();
    canvasInit();
});

$(document).on('click',"#clear_canvas",function(){
    savedesign = true;
    localStorage.removeItem("auto_save_canvas");
    localStorage.removeItem("stage_gridsize");
    localStorage.removeItem("aidaCloth");
    localStorage.removeItem("clothframe");
    localStorage.removeItem("canvasBgColor"),    // Canvas bg color
    localStorage.removeItem("gridStrokeCPara"),    // Grid stroke color
    localStorage.removeItem("gridShadowCPara"),    // Grid shadow color
    localStorage.removeItem("circleStrokeCPara"),  // Circle stroke color
    localStorage.removeItem("circleFillCPara");
    localStorage.removeItem("canvascolorfloss");
    window.location.href= $("#create_design_url").val();
})

/*  Load canvas script */
function canvasInit()
{
    var ReactHashMap = {}
  /*   Loader on page load  */
    setTimeout(function()
    {
        $("#loader").hide();
        $("#myDiv").show();
    }, 1000);
    /*    Declare Global Variables    */
    var   stage,                       // Stage variable
          backgroundCanvas,            // Main background canvas variable
          backgroundCount,             // Layer to show grid numbers
          gridLinesLayer,              // Draw Grid Lines
          canvasGridLayer,             // Grid canvas variable
          textlayer,                   // Canvas Text layer
          newlayer,                    // Canvas New Layer for text movements
          gridHiddenTextGroup,         // Hidden Text Group
          gridTextGroup,               // Grid Text Group
          gridSelectGroup,             // Select grid group
          stageWidth,                  // Stage Width
          gridSize,                    // Grid Size
          stageRect,                   // Main canvas rectangle variable
          box,                         // Variable for rectangle element
          circle,                      // Variable for circle element
          text,                        // Variable for circle element
          mode = "pencil",             // Variable for mode with default pencil
          isMouseDown = false,         // Set Mouse down property false
          json,                        // Json variable for final canvas output
          cr,                          // Circle radius variable
          lineStroke,                  // Line width for back stitch
          posStart,                    // Select tool position start
          posNow,                      // Select tool Current position.
          points =[],                  // For BAck Stitch
          positionXY = [],             // For text posotion XY
          lineStrokeColor = '#000000', // Line stroke color
          textFillColor = '#000000',   // Text default fill color
          selectedRectNodes = [],      // Selected rectangle nodes.
          moved = 0,                   // Move
          xplus,
          canvasMainBgcolor = localStorage.getItem("canvasBgColor"),    // Canvas bg color
          gridStrokeColor = localStorage.getItem("gridStrokeCPara"),    // Grid stroke color
          gridShadowColor = localStorage.getItem("gridShadowCPara"),    // Grid shadow color
          circleStrokeColor = localStorage.getItem("circleStrokeCPara"),  // Circle stroke color
          circleFillColor = localStorage.getItem("circleFillCPara");      // Circle fill color

    if (localStorage.getItem("auto_save_canvas") === null)
    {
        if (localStorage.getItem("clothframe") === null)
        {
            window.location.href= $("#create_design_url").val();
        }
        clothframe = localStorage.getItem("clothframe");
        var frame = clothframe.split(" X "),
            canvasWidth = frame[1],                       // Grid Width
            canvasHeight = frame[0];                      // Grid Height
            stageWidth = 805;                             // Stage widht
            gridSize = Math.round(stageWidth/canvasWidth),    // Grid Tile Size
            txtFillSize = gridSize;      // Text font size
            var stagerectWidth = stageWidth;
            var GridLineLayerWidth = stageWidth;

            console.log(clothframe)

            switch (clothframe)
            {
               case '56 X 70':
                  stageWidth = 850;
                  stagerectWidth = 844;
                  GridLineLayerWidth = stageWidth + 5;
               break;
               case '56 X 84':
                  stageWidth = 850;
                  stagerectWidth = 844;
                  GridLineLayerWidth = stageWidth + 5;
               break;
               case '49 X 70':
                  stageWidth = 850;
               break;
               case '60 X 84':
                  stageWidth = 850;
               break;
               case '38.5 X 55':
                   stageWidth = 860;
                   stagerectWidth = 830;
                   GridLineLayerWidth = stageWidth-20;
               break;
               case '24.5 X 35':
                   GridLineLayerWidth = stageWidth + 100;
               break;
               case '28 X 42':
                   GridLineLayerWidth = stageWidth + 100;
               break;
               case '96 X 120':
                   GridLineLayerWidth = stageWidth + 100;
               break;
               case '96 X 144':
                   GridLineLayerWidth = stageWidth + 100;
               break;
               case '35 X 49':
                   stagerectWidth = 787;
                   GridLineLayerWidth = stageWidth-5;
               break;
               case '42 X 56':
                   stagerectWidth = 787;
                   GridLineLayerWidth = stageWidth-5;
               break;
               case '42 X 60':
                   stagerectWidth = 787;
                   GridLineLayerWidth = stageWidth-5;
               break;
               case '70 X 98':
                   stagerectWidth = 787;
                   GridLineLayerWidth = stageWidth-5;
               break;
               case '84 X 112':
                   stagerectWidth = 787;
                   GridLineLayerWidth = stageWidth-5;
               break;
               case '44 X 66':
                   stagerectWidth = 795;
               break;
               case '88 X 132':
                   stagerectWidth = 795;
               break;
               case '48 X 72':
                   stagerectWidth = 795;
               break;
               case '55 X 77':
                   stagerectWidth = 773;
                   GridLineLayerWidth = stageWidth-23;
               break;
               case '88 X 110':
                   stagerectWidth = 773;
                   GridLineLayerWidth = stageWidth-23;
               break;
               case '72 X 96':
                   stagerectWidth = 773;
                   GridLineLayerWidth = stageWidth-23;
               break;
               case '66 X 88':
                   stagerectWidth = 794;
               break;
               case '49 X 70':
                   stagerectWidth = 844;
                   GridLineLayerWidth = stageWidth + 5;
               break;
               case '60 X 84':
                   stagerectWidth = 844;
                   GridLineLayerWidth = stageWidth + 5;
               break;
               case '112 X 140':
                   stagerectWidth = 844;
                   GridLineLayerWidth = stageWidth + 5;
               break;
               case '112 X 168':
                   stagerectWidth = 844;
                   GridLineLayerWidth = stageWidth + 5;
               break;
            }


        // if(clothframe === '56 X 70' || clothframe === '56 X 84' || clothframe === '49 X 70' || clothframe === '60 X 84')
        // {
        //   stageWidth = 850;
        // }
        // if(clothframe === '38.5 X 55')
        // {
        //   stageWidth = 860;
        //   stagerectWidth = 830;
        //   GridLineLayerWidth = stageWidth-20;
        // }

        // if(clothframe === "24.5 X 35" || clothframe === "28 X 42" || clothframe === "96 X 120" || clothframe === "96 X 144")
        // {
        //     GridLineLayerWidth = stageWidth + 100;
        // }
        // if(clothframe === "35 X 49" || clothframe === "42 X 56" || clothframe === "42 X 60" || clothframe === "70 X 98" || clothframe === "84 X 112")
        // {
        //   stagerectWidth = 787;
        //   GridLineLayerWidth = stageWidth-5;
        // }
        // if(clothframe === "44 X 66" || clothframe === "88 X 132" || clothframe === "48 X 72"  )
        // {
        //   stagerectWidth = 795;
        // }
        // if(clothframe === "55 X 77" || clothframe === "88 X 110" || clothframe === "72 X 96")
        // {
        //   stagerectWidth = 773;
        //   GridLineLayerWidth = stageWidth-23;
        // }
        // if(clothframe === "66 X 88")
        // {
        //   stagerectWidth = 794;
        // }

        // if(clothframe === "56 X 84" || clothframe === "49 X 70" || clothframe === '60 X 84' || clothframe === '56 X 70' || clothframe === '112 X 140' || clothframe === '112 X 168')
        // {
        //   stagerectWidth = 844;
        //   GridLineLayerWidth = stageWidth + 5;
        // }




        /*  create stage for main canvas  */
        stage = new Konva.Stage({
            container: 'canvas',                  // Canvas container
            width: stageWidth + gridSize,        // Canvas Width
            height: canvasHeight * gridSize + gridSize      // Canvas Height
        });

        /*  Create Multiple Layers for stage  */
        backgroundCount = new Konva.Layer({name:'backgroundCountLayer',hitGraphEnabled:false});        // Layer1 for canvas main background
        gridLinesLayer = new Konva.Layer({name:'gridLinesLayer',hitGraphEnabled:false});        // Layer1 for canvas main background
        backgroundCanvas = new Konva.Layer({name:'backgroundLayer'});        // Layer1 for canvas main background
        canvasGridLayer = new Konva.Layer({name:'canvasGridLayer'});         // Layer2 for canvas Grid
        textlayer = new Konva.Layer({name:'textLayer'});           // Layer3 for Text
        newlayer = new Konva.Layer({name:'newlayer',hitGraphEnabled:false});  // Layer4 for Movement of text for text popup
        /*  Layers creation ends here! */

        /*  Create new group  */
        gridTextGroup = new Konva.Group({name:'textGroup'});      // Group for all the functionlities
        gridSelectGroup = new Konva.Group({name:'gridSelectGroup'});    // Group for select shape rectangle.
        gridHiddenTextGroup = new Konva.Group({name:'hiddenGroup', visible: false});  // Group for hidden text

        /*  Layer1 work starts here! */
        stageRect =  new Konva.Rect({
          x:gridSize,
          y:gridSize,
          width: stagerectWidth,
          height: canvasHeight * gridSize,
          fill: canvasMainBgcolor,
        });
        backgroundCanvas.add(stageRect);
        /*  Layer1 work ends here! */

        /*  Set Circle radius and line stroke for differnt grid sizes. cr = Circle Radius, lineStroke = Line Stroke */
        if(gridSize >= 20)
        {
          cr = 2;
          lineStroke = 3;
          countfontSize = txtFillSize - 7;
          var a = 5;
          var b = 5;
          var c = 5;
          var d = 5;
        }
        else if(gridSize >= 10)
        {
          cr = 1;
          lineStroke = 2;
          countfontSize = txtFillSize - 4;
          var a = 10;
          var b = 10;
          var c = 10;
          var d = 10;
        }
        else
        {
          cr = 0;
          lineStroke = 1;
          countfontSize = txtFillSize - 2;
          var a = 10;
          var b = 10;
          var c = 10;
          var d = 10;
        }
        var t= 0;

        for (var icx = 0; icx < (parseInt(canvasWidth) + 1); icx++)
        {
              var counterText = new Konva.Text({
                x: (icx * gridSize) + 5,
                y: 0,
                text: t,
                fontSize: countfontSize,
                align: 'center',
              });
              if(icx === a)
              {
                if(a == b)
                {
                    var dashEnabled = true;
                    if(gridSize >= 20)
                    {
                      b+= 10;
                    }
                    else {
                      b+= 20;
                    }
                }
                else {
                  var dashEnabled = false;
                }
                var gLine = new Konva.Line({
                  points: [(icx * gridSize), gridSize, (icx * gridSize), stageWidth] ,
                  stroke: '#000',
                  strokeWidth: 1,
                  dash: [6, 4],
                  dashEnabled : dashEnabled
                });
                gridLinesLayer.add(gLine);
                if(gridSize >= 20)
                {
                  a+= 5;
                }
                else {
                  a+= 10;
                }
              }
              backgroundCount.add(counterText);
              t = t+1;
              if(t > 10)
              {
                t =  1;
              }
        }
        var u = 0;
        for (var icy = 0; icy < (parseInt(canvasHeight) + 1); icy++)
        {
              var counterText = new Konva.Text({
                x: 0,
                y: icy * gridSize + 2,
                text: u,
                fontSize: countfontSize,
                align: 'center',
              });
              var icyy = icy;
              if(icyy >= c)
              {
                if(c == d)
                {
                    var dashEnabled = true;
                    if(gridSize >= 20)
                    {
                      d+= 10;
                    }
                    else {
                      d+= 20;
                    }
                }
                else {
                  var dashEnabled = false;
                }
                var gLine = new Konva.Line({
                  points: [gridSize, (icy * gridSize), GridLineLayerWidth, (icy*gridSize)],
                  stroke: '#000',
                  strokeWidth: 1,
                  dash: [6, 4],
                  dashEnabled : dashEnabled
                });
                gridLinesLayer.add(gLine);
                if(gridSize >= 20)
                {
                  c+= 5;
                }
                else {
                  c+= 10;
                }
              }
              backgroundCount.add(counterText);
              u++;
              if(u > 10)
              {
                u =  1;
              }
        }
        backgroundCount.cache();
        gridLinesLayer.cache();

        /*  Layer2 Create a grid on canvas work starts here!*/
        for (var ix = 0; ix < canvasWidth; ix++)
        {
          for (var iy = 0; iy < canvasHeight; iy++)
          {
              box = new Konva.Rect({
                  x : ix * gridSize + gridSize,
                  y : iy * gridSize + gridSize,
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
                x: box.x()+ gridSize,
                y: box.y()+ gridSize,
                radius: cr,
                stroke: circleStrokeColor,
                strokeWidth: 1,
                fillEnabled: false,
                listening: false,
              });
              canvasGridLayer.add(box);                   // Add rectangle to group
              canvasGridLayer.add(circle);             // Add rectangle to background layer
          }
        }
        textlayer.add(gridTextGroup,gridSelectGroup);
        stage.add(backgroundCanvas,backgroundCount,canvasGridLayer,gridLinesLayer,textlayer,newlayer);          // Add Layer to stage
        gCacheStage = stage.toJSON();
    }
    else
    {
        gCacheStage = LZString.decompress(localStorage.getItem("auto_save_canvas"));
        var cached_json = LZString.decompress(localStorage.getItem('auto_save_canvas'));
        stage = Konva.Node.create(cached_json, 'canvas');
        stageWidth = stage.width();                // Grid Height
        gridSize = localStorage.getItem("stage_gridsize");      // Grid Tile Size
        var txtFillSize = gridSize;      // Text font size

        /*  Create Multiple Layers for stage  */
        var stagelayer = stage.getLayers();
        $(stagelayer).each(function(key,val)
        {
            if(val.hasName('backgroundLayer'))
            {
                backgroundCanvas = val;
            }
            if(val.hasName('backgroundCount'))
            {
                backgroundCount = val;
            }
            if(val.hasName('gridLinesLayer'))
            {
                gridLinesLayer = val;
            }
            if(val.hasName('canvasGridLayer'))
            {
                canvasGridLayer = val;
            }
            if(val.hasName('textLayer'))
            {
                textlayer = val;
            }
            if(val.hasName('newlayer'))
            {
                newlayer = val;
            }
        })
        var groups = stage.find(node => {
                return node.getType() === 'Group';
            });
        $(groups).each(function(key,val)
        {
            if(val.hasName('textGroup')){ gridTextGroup = val;  }
            else { gridTextGroup = new Konva.Group({name:'textGroup'}); }
            if(val.hasName('gridSelectGroup')) { gridSelectGroup = val; }
            else { gridSelectGroup = new Konva.Group({name:'gridSelectGroup'}); }
            if(val.hasName('hiddenGroup')){ gridHiddenTextGroup = val; }
            else { gridHiddenTextGroup = new Konva.Group({name:'hiddenGroup', visible: false});  }
        });

        /*  Set Circle radius and line stroke for differnt grid sizes. cr = Circle Radius, lineStroke = Line Stroke */
        if(gridSize >= 20)
        {
          lineStroke = 3;
        }
        else if(gridSize >= 10)
        {
          lineStroke = 2;
        }
        else
        {
          lineStroke = 1;
        }
        textlayer.add(gridTextGroup,gridSelectGroup);

        var stageChildren = stagelayer;

        for(var i = 0; i < stageChildren.length; i++)
        {
            if(stageChildren[i].attrs.name == "canvasGridLayer")
            {
                var tLayer = stageChildren[i];
                for(var k = 0; k < tLayer.children.length; k++)
                {
                    var cachedRect = tLayer.children[k];
                    if(cachedRect.className === "Rect")
                    {
                        if(cachedRect.attrs.filled === true)
                        {
                          ReactHashMap[''+cachedRect.x()+cachedRect.y()] = cachedRect;
                        }
                    }
                }
              }
        }

    }
    gCacheGrid = gridSize;
    if (localStorage.getItem("download_canvas") !== null)
    {
      if($("#checkLogin").val() === "true")
      {
        download_canvas_script(localStorage.getItem("download_canvas"));
      }
    }
    /*  Text color  */
    $(document).on('click', 'ul#select_style_color_ul li',function()
    {
        var textClr = $(this).attr('value');
        changeColor(textClr);
    });

    $(document).on('click', ".color_box",function()
    {
      var textClr = $(this).attr("data-color");
      changeColor(textClr);
    });

    $(document).on('click', ".segment",function()
    {
      var path = $(this).children('path').first();
      var value = $(path).attr('fill').substring(1).toUpperCase();
      changeColor("#"+value);
    });

    function changeColor(x)
    {
        textFillColor = x;
    }


    /*  Change backstitch strand */

    $(document).on('change', '.backstitch_strand',function()
    {
        var back_strand = $(this).val();
        if(back_strand === ' ')
        {
           changeStitchStrand(lineStroke);
        }
        else {
          changeStitchStrand(back_strand);
        }
    });
    function changeStitchStrand(s)
    {
        lineStroke = s;
        localStorage.setItem("linestrand", lineStroke)
    }

    /*  Change X's Size */

    $(document).on('change', '.x-size',function()
    {
        var x_size = $(this).val();
        if(x_size === ' ')
        {
           changeXSize(txtFillSize);
        }
        else {
          changeXSize(x_size);
        }
    });
    function changeXSize(xs)
    {
        txtFillSize = xs;
    }

    if(gridSize >= 20)
    {
      xplus = 4;
    }
    else if(gridSize >= 10)
    {
      xplus = 2;
    }
    else
    {
      xplus = 1;
    }
    /*   Change tool mode function starts here!   */
    $(document).on("click",".canvas_tool",function()
    {
        $('.toolbar_list li').removeClass('active');
        $(this).addClass('active');
        mode = $(this).data('mode');
    });
    /*   Change tool mode function ends here!   */

    // draw a rectangle to be used as the rubber area
    var r2 = new Konva.Rect({x: 0, y: 0, width: 0, height: 0, strokeWidth:0.8, stroke: '#2c2c25', dash: [5,6], name:'selectShape'});
    r2.listening(false); // stop r2 catching our mouse events.
    gridSelectGroup.add(r2);

    /*    Fill Grid cell   */
    stage.on('mousedown', function(evt)
    {
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
                         width: gridSize,
                         height: gridSize,
                         fontFamily: 'sans-serif',
                         fontSize: txtFillSize,
                         fill: textFillColor,
                         fontStyle : 'normal',
                         filled : true,
                         align: 'center',
                         verticalAlign : 'middle',
                         lineHeight : 2
                       });
                       gridTextGroup.add(text);
                       box.setAttr('filled', true);
                       text.draw();
                       ReactHashMap[''+box.x()+box.y()] = box;
                    }
                    // if(box.getAttr('filled') === true)
                    // {
                    //   box.setAttr('filled', false);
                    //   textlayer.draw();
                    //   if(evt.target.className === 'Text')
                    //   {
                    //       evt.target.destroy();
                    //   }
                    //   box.setAttr('filled', false);
                    //   textlayer.draw();
                    // }
               break;
               case 'eraser':
                   if(box.getAttr('filled') === true)
                   {
                     if(ReactHashMap[''+box.x()+box.y()]) {
                       ReactHashMap[''+box.x()+box.y()].setAttr('filled', false);
                     }
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
                     var secondX = nearest(evt.evt.layerX, (Math.round(box.x()/ gridSize) * gridSize), (Math.round(box.x()/ gridSize) * gridSize) + gridSize);
                     var secondY = nearest(evt.evt.layerY, (Math.round(box.y()/ gridSize) * gridSize), (Math.round(box.y()/ gridSize) * gridSize) + gridSize);
                     points.push((Math.round(box.x()/ gridSize) * gridSize),(Math.round(box.y()/ gridSize) * gridSize),secondX,secondY);
                     // var secondX = nearest(evt.evt.layerX, box.x(), box.x() + gridSize);
                     // var secondY = nearest(evt.evt.layerY, box.y(), box.y() + gridSize);
                     // points.push(box.x(),box.y(),secondX,secondY);
                     // var line = new Konva.Line({
                     //     points :points,
                     //     stroke: lineStrokeColor,
                     //     strokeWidth: lineStroke,
                     //     drawLine : true,
                     //     tension: 0,
                     //     perfectDrawEnabled: false,
                     // });
                     // textlayer.add(line);
                     // line.draw();
               break;
               default:
             }
        }
    });
    stage.on('mouseup',function(evt)
    {
        isMouseDown= false;
        box = evt.target;
        switch (mode)
        {
             case 'select_shape':
                    updateDrag({x: box.x(), y: box.y()},true);
                    var gridcloneGroup = new Konva.Group({name:"selectCloneGrup",draggable:true});  // Group to clone text and lines for select shape
                     gridcloneGroup.destroy();
                     textlayer.draw();
                     var lineList = textlayer.find("Line");
                     lineList.map(function(lineList)
                     {
                         var lineval = lineList;
                         if(lineval.hasName('lineselected'))
                         {
                             var cloneline  = lineval.clone({name :'cloneLine'});
                             gridcloneGroup.add(cloneline);
                             textlayer.add(gridcloneGroup);
                             lineval.setAttr('name', '');
                             lineval.destroy();
                         }
                     });
                     selectedRectNodes.map(function(selectedRectNodes)
                     {
                        var val = selectedRectNodes;
                        var clonerect  = val.clone({ x: val.x(), y: val.y(), name :'cloneRect', shadowEnabled:false,strokeEnabled:false });
                        gridcloneGroup.add(clonerect);
                        textlayer.add(gridcloneGroup);
                     });
                     var textList = textlayer.find("Text");
                     textList.map(function(textList)
                     {
                          var val = textList;
                          if(val.hasName('textselected'))
                          {
                            var clonerect  = val.clone({x: val.x(), y: val.y(), name :'cloneRect'});
                            gridcloneGroup.add(clonerect);
                            textlayer.add(gridcloneGroup);
                            val.setAttr('name', '');

                            positionXY.push(`{"x":${val.x()},"y":${val.y()}}`);
                            if(ReactHashMap[''+val.attrs.x+val.attrs.y]) {
                              ReactHashMap[''+val.attrs.x+val.attrs.y].setAttr('filled', false);
                            }
                            val.destroy();
                          }
                     });
                     textlayer.draw();
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
         gCacheStage = stage.toJSON();
         // updateLocalStorage(stage.toJSON(),gridSize)
    });
    stage.on('mouseover', function(evt)
    {
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
                         width: gridSize,
                         height: gridSize,
                         fontFamily: 'sans-serif',
                         fontSize: txtFillSize,
                         fill: textFillColor,
                         fontStyle : 'normal',
                         filled : true,
                         align: 'center',
                         verticalAlign : 'middle',
                         lineHeight : 2
                       });
                       gridTextGroup.add(text);
                       box.setAttr('filled', true);
                       text.draw();
                       ReactHashMap[''+box.x()+box.y()] = box
                   }
                 break;
                 case 'eraser':
                    if(box.getAttr('filled') === true)
                     {
                        var textList = textlayer.find("Text");
                        $( textList ).each(function() {
                              if(ReactHashMap[''+box.x()+box.y()]) {
                                ReactHashMap[''+box.x()+box.y()].setAttr('filled', false);
                              }
                             if(evt.target.className == 'Text')
                             {
                               evt.target.destroy();
                             }
                             box.setAttr('filled', false);
                       });
                     }
                     var lineList = textlayer.find("Line");
                     $( lineList ).each(function(key, val)
                     {
                        if(val.attrs.points[0] === box.x() && val.attrs.points[1] === box.y())
                        {
                          val.destroy();
                        }
                     });
                    textlayer.batchDraw();
                 break;
                 case 'select_shape':
                    updateDrag({x: box.x(), y: box.y()},false);
                 break;
                 case 'back_stich':
                     //points=[];
                     //var line = textlayer.find("Line");'
                     var last_two_values = points.slice(-2);
                     if((typeof box.attrs.x !== "undefined") || ( typeof box.attrs.y !== "undefined"))
                     {
                         var secondX = nearest(evt.evt.layerX,box.x(),box.x()+ gridSize);
                         var secondY = nearest(evt.evt.layerY,box.y(),box.y()+ gridSize);
                         points=[];
                         points.push((Math.round(last_two_values[0]/ gridSize) * gridSize),(Math.round(last_two_values[1] / gridSize) * gridSize),(Math.round(secondX / gridSize) * gridSize),(Math.round(secondY / gridSize) * gridSize));
                         line = new Konva.Line({
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
                 default:
             }
        }
    });

    /*  For touch devices */

    stage.on('touchstart', function(evt)
    {
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
                         width: gridSize,
                         height: gridSize,
                         fontFamily: 'sans-serif',
                         fontSize: txtFillSize,
                         fill: textFillColor,
                         fontStyle : 'normal',
                         filled : true,
                         align: 'center',
                       });
                       gridTextGroup.add(text);
                       box.setAttr('filled', true);
                       text.draw();
                       ReactHashMap[''+box.x()+box.y()] = box;
                    }
                    // if(box.getAttr('filled') === true)
                    // {
                    //   box.setAttr('filled', false);
                    //   textlayer.draw();
                    //   if(evt.target.className === 'Text')
                    //   {
                    //       evt.target.destroy();
                    //   }
                    //   box.setAttr('filled', false);
                    //   textlayer.draw();
                    // }
               break;
               case 'eraser':
                   if(box.getAttr('filled') === true)
                   {
                     if(ReactHashMap[''+box.x()+box.y()]) {
                       ReactHashMap[''+box.x()+box.y()].setAttr('filled', false);
                     }
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
                     points.push(box.x(),box.y(),secondX,secondY);
                     // var line = new Konva.Line({
                     //     points :points,
                     //     stroke: lineStrokeColor,
                     //     strokeWidth: lineStroke,
                     //     drawLine : true,
                     //     tension: 0,
                     //     perfectDrawEnabled: false,
                     // });
                     // textlayer.add(line);
                     // line.draw();
               break;
               default:
             }
        }
    });
    stage.on('touchend',function(evt)
    {
        isMouseDown= false;
        box = evt.target;
        switch (mode)
        {
             case 'select_shape':
                    updateDrag({x: box.x(), y: box.y()},true);
                    var gridcloneGroup = new Konva.Group({name:"selectCloneGrup",draggable:true});  // Group to clone text and lines for select shape
                     gridcloneGroup.destroy();
                     textlayer.draw();
                     var lineList = textlayer.find("Line");
                     lineList.map(function(lineList)
                     {
                         var lineval = lineList;
                         if(lineval.hasName('lineselected'))
                         {
                             var cloneline  = lineval.clone({name :'cloneLine'});
                             gridcloneGroup.add(cloneline);
                             textlayer.add(gridcloneGroup);
                             lineval.setAttr('name', '');
                             lineval.destroy();
                         }
                     });
                     selectedRectNodes.map(function(selectedRectNodes)
                     {
                        var val = selectedRectNodes;
                        var clonerect  = val.clone({ x: val.x(), y: val.y(), name :'cloneRect', shadowEnabled:false,strokeEnabled:false });
                        gridcloneGroup.add(clonerect);
                        textlayer.add(gridcloneGroup);
                     });
                     var textList = textlayer.find("Text");
                     textList.map(function(textList)
                     {
                          var val = textList;
                          if(val.hasName('textselected'))
                          {
                            var clonerect  = val.clone({x: val.x(), y: val.y(), name :'cloneRect'});
                            gridcloneGroup.add(clonerect);
                            textlayer.add(gridcloneGroup);
                            val.setAttr('name', '');

                            positionXY.push(`{"x":${val.x()},"y":${val.y()}}`);
                            if(ReactHashMap[''+val.attrs.x+val.attrs.y]) {
                              ReactHashMap[''+val.attrs.x+val.attrs.y].setAttr('filled', false);
                            }
                            val.destroy();
                          }
                     });
                     textlayer.draw();
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
         gCacheStage = stage.toJSON();
         // updateLocalStorage(stage.toJSON(),gridSize)
    });
    stage.on('touchmove', function(evt)
    {
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
                         width: gridSize,
                         height: gridSize,
                         fontFamily: 'sans-serif',
                         fontSize: txtFillSize,
                         fill: textFillColor,
                         fontStyle : 'normal',
                         filled : true,
                         align: 'center',
                       });
                       gridTextGroup.add(text);
                       box.setAttr('filled', true);
                       text.draw();
                       ReactHashMap[''+box.x()+box.y()] = box
                   }
                 break;
                 case 'eraser':
                    if(box.getAttr('filled') === true)
                     {
                        var textList = textlayer.find("Text");
                        $( textList ).each(function() {
                              if(ReactHashMap[''+box.x()+box.y()]) {
                                ReactHashMap[''+box.x()+box.y()].setAttr('filled', false);
                              }
                             if(evt.target.className == 'Text')
                             {
                               evt.target.destroy();
                             }
                             box.setAttr('filled', false);
                       });
                     }
                     var lineList = textlayer.find("Line");
                     $( lineList ).each(function(key, val)
                     {
                        if(val.attrs.points[0] === box.x() && val.attrs.points[1] === box.y())
                        {
                          val.destroy();
                        }
                     });
                    textlayer.batchDraw();
                 break;
                 case 'select_shape':
                    updateDrag({x: box.x(), y: box.y()},false);
                 break;
                 case 'back_stich':
                     //points=[];
                     //var line = textlayer.find("Line");
                     var last_two_values = points.slice(-2);
                     if((typeof box.attrs.x !== "undefined") || ( typeof box.attrs.y !== "undefined"))
                     {
                         var secondX = nearest(evt.evt.layerX,box.x(),box.x()+ gridSize);
                         var secondY = nearest(evt.evt.layerY,box.y(),box.y()+ gridSize);
                         points=[];
                         points.push((Math.round(last_two_values[0]/ gridSize) * gridSize),(Math.round(last_two_values[1] / gridSize) * gridSize),(Math.round(secondX / gridSize) * gridSize),(Math.round(secondY / gridSize) * gridSize));
                         line = new Konva.Line({
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
                 default:
             }
        }
    });

    /*  Select tool Functionality   */
    function draggroup()
    {
        var groups = stage.find(node => { return node.getType() === 'Group'; });
        groups.map(function(groups)
        {
            var grup = groups;
            if(grup.hasName("selectCloneGrup"))
             {
                 grup.on('dragstart', function()
                 {
                     r2.visible(false);
                     posStart ='';
                     posNow = '';

                 });
                 grup.on('dragend', function()
                 {
                     var zText =0;
                     var fillTextArrGp = [];
                     var fillLineArrGp = [];

                     var grupChild = grup.children;
                     grupChild.map(function(grupChild)
                     {
                         var val = grupChild;
                         if(val.className === "Line")
                         {
                              var x1Val;
                              var x2Val;
                              var y1Val;
                              var y2Val;
                              if((Math.round(grup.attrs.x / gridSize) * gridSize) > 0 )
                              {
                                  x1Val = Math.abs(Math.round(val.attrs.points[0]/ gridSize) * gridSize) + Math.abs(Math.round(grup.x() / gridSize) * gridSize);
                                  x2Val = Math.abs(Math.round(val.attrs.points[2]/ gridSize) * gridSize) + Math.abs(Math.round(grup.x() / gridSize) * gridSize);
                              }
                              else
                              {
                                 x1Val = Math.abs(Math.round(val.attrs.points[0]/ gridSize) * gridSize) - Math.abs(Math.round(grup.x() / gridSize) * gridSize);
                                 x2Val = Math.abs(Math.round(val.attrs.points[2]/ gridSize) * gridSize) - Math.abs(Math.round(grup.x() / gridSize) * gridSize);
                              }
                              if((Math.round(grup.attrs.y / gridSize) * gridSize) > 0 )
                              {
                                y1Val = Math.abs(Math.round(val.attrs.points[1]/ gridSize) * gridSize) + Math.abs(Math.round(grup.y() / gridSize) * gridSize);
                                y2Val = Math.abs(Math.round(val.attrs.points[3]/ gridSize) * gridSize) + Math.abs(Math.round(grup.y() / gridSize) * gridSize);
                              }
                              else
                              {
                                y1Val = Math.abs(Math.round(val.attrs.points[1]/ gridSize) * gridSize) - Math.abs(Math.round(grup.y() / gridSize) * gridSize);
                                y2Val = Math.abs(Math.round(val.attrs.points[3]/ gridSize) * gridSize) - Math.abs(Math.round(grup.y() / gridSize) * gridSize);
                              }
                              var obj ={
                               'newpoints': [x1Val,y1Val,x2Val,y2Val],
                               'nstroke': val.attrs.stroke,
                               'nswidth': val.attrs.strokeWidth,
                               'ndrawline' : val.attrs.drawLine,
                               'ntension' : val.attrs.tension,
                               'npdraw' : val.attrs.perfectDrawEnabled
                              };
                              fillLineArrGp.push(obj);
                         }
                         if(val.className === "Text")
                         {
                             var xPosition ;
                             var yPosition;
                             var xVal;
                             var yVal;
                             if(zText === 0)
                             {
                               var firstpostionXY = JSON.parse(positionXY[zText]);
                                if((Math.round(grup.attrs.x / gridSize) * gridSize) > 0 )
                                {
                                  xVal = val.attrs.x = firstpostionXY.x + Math.abs(Math.round(grup.x() / gridSize) * gridSize);
                                }
                                else
                                {
                                  xVal = val.attrs.x = firstpostionXY.x - Math.abs(Math.round(grup.x() / gridSize) * gridSize);
                                }
                                if((Math.round(grup.attrs.y / gridSize) * gridSize) > 0 )
                                {
                                   yVal = val.attrs.y = firstpostionXY.y + Math.abs(Math.round(grup.y() / gridSize) * gridSize);
                                }
                                else
                                {
                                   yVal = val.attrs.y = firstpostionXY.y - Math.abs(Math.round(grup.y() / gridSize) * gridSize);
                                }
                                fillTextArrGp.push(`{x : ${xVal},y : ${yVal}}`);
                             }
                             else
                             {
                                 var postionXY = JSON.parse(positionXY[zText]);
                                 var prevPostionXY = JSON.parse(positionXY[zText-1]);
                                 if(postionXY.x !== prevPostionXY.x)
                                 {
                                    xPosition = postionXY.x;
                                 }
                                 else
                                 {
                                    xPosition = prevPostionXY.x;
                                 }
                                 if(postionXY.y !== prevPostionXY.y)
                                 {
                                    yPosition = postionXY.y;
                                 }
                                 else
                                 {
                                    yPosition = prevPostionXY.y;
                                 }
                                 if((Math.round(grup.attrs.x / gridSize) * gridSize) > 0 )
                                 {
                                    xVal = val.attrs.x = xPosition + Math.abs(Math.round(grup.x() / gridSize) * gridSize);
                                 }
                                 else
                                 {
                                    xVal = val.attrs.x = xPosition - Math.abs(Math.round(grup.x() / gridSize) * gridSize);
                                 }
                                 if((Math.round(grup.attrs.y / gridSize) * gridSize) > 0 )
                                 {
                                      yVal = val.attrs.y = yPosition + Math.abs(Math.round(grup.y() / gridSize) * gridSize);
                                  }
                                  else
                                  {
                                      yVal = val.attrs.y = yPosition - Math.abs(Math.round(grup.y() / gridSize) * gridSize);
                                  }
                                  fillTextArrGp.push(`{x : ${xVal},y : ${yVal}}`);
                              }
                           zText++;
                         }
                     });

                     var RectList = stage.find("Rect");
                     RectList.map(function(RectList)
                     {
                        var rectval = RectList;
                        var xY = `{x : ${rectval.x()},y : ${rectval.y()}}`;

                        if(fillTextArrGp.indexOf(xY) !== -1)
                        {
                          grupChild.map(function(grupChild)
                          {
                              var val = grupChild;
                              if(val.className === "Text" && val.attrs.x == rectval.attrs.x && val.attrs.y == rectval.attrs.y)
                              {
                                    text = new Konva.Text({
                                      text: val.text(),
                                      x: rectval.x(),
                                      y: rectval.y(),
                                      width: val.width(),
                                      height: val.height(),
                                      fontFamily: val.fontFamily(),
                                      fontSize: val.fontSize(),
                                      fill: val.fill(),
                                      fontStyle : val.fontStyle(),
                                      filled : true,
                                      align: val.align(),
                                    });
                                    gridTextGroup.add(text);
                                    rectval.setAttr('filled', true);
                                    text.draw();
                                    ReactHashMap[''+rectval.x()+rectval.y()] = rectval;
                              }
                            });
                        }
                      });
                     for(var t = 0; t<fillLineArrGp.length; t++)
                     {
                       var line = new Konva.Line({
                           points :fillLineArrGp[t].newpoints,
                           stroke: fillLineArrGp[t].nstroke,
                           strokeWidth: fillLineArrGp[t].nswidth,
                           drawLine : fillLineArrGp[t].ndrawline,
                           tension: fillLineArrGp[t].ntension,
                           perfectDrawEnabled: fillLineArrGp[t].npdraw,
                       });
                       textlayer.add(line);
                       line.draw();
                     }
                     var findTextLayerGroup = textlayer.find("Group");
                     findTextLayerGroup.map(function(findTextLayerGroup)
                     {
                         if(findTextLayerGroup.hasName("selectCloneGrup"))
                         {
                              findTextLayerGroup.destroy();
                              textlayer.draw();
                         }
                     });
                     positionXY = [];
                     selectedRectNodes = [];
                     fillTextArrGp = [];
                     fillLineArrGp = [];
                     moved = 1;
                     gCacheStage = stage.toJSON();
                 });
             }
        });
        return;
    }

    function startDrag(posIn){
      posStart = {x: posIn.x, y: posIn.y};
      posNow = {x: posIn.x, y: posIn.y};
    }
    function updateDrag(posIn,updateSelect){
      // update rubber rect position
      if(posIn.x !==0 && posIn.y !== 0)
      {
           posNow = {x: posIn.x, y: posIn.y};
           var posRect = reverse(posStart,posNow);
           r2.x(posRect.x1);
           r2.y(posRect.y1);
           r2.width(posRect.x2 - posRect.x1);
           r2.height(posRect.y2 - posRect.y1);
           r2.visible(true);
           if(updateSelect === true)
           {
             /* Find and push selected rect  */
             var stageRectList = stage.find("Rect");
             stageRectList.map(function(stageRectList)
             {
               var rectval = stageRectList;
               if(rectval.name() !== 'selectShape')
               {
                   if(rectval.attrs.x >= r2.attrs.x && rectval.attrs.x < (r2.attrs.x+r2.attrs.width) && rectval.attrs.y >= r2.attrs.y && rectval.attrs.y < (r2.attrs.y+r2.attrs.height))
                   {
                       selectedRectNodes.push(rectval);
                   }
               }
             });
             /* Find and push selected text  */
             var textList = textlayer.find("Text");
             textList.map(function(textList)
             {
                 var val = textList;
                 if(val.attrs.x >= r2.attrs.x && val.attrs.x < (r2.attrs.x+r2.attrs.width) && val.attrs.y >= r2.attrs.y && val.attrs.y < (r2.attrs.y+r2.attrs.height))
                 {
                      val.setAttr('name', 'textselected');
                 }
             });
             /* Find and push selected lines  */
             var lineList = textlayer.find("Line");
             lineList.map(function(lineList)
             {
                 var lineval = lineList;
                 if(lineval.attrs.points[0] >= r2.attrs.x && lineval.attrs.points[2] <= (r2.attrs.x+r2.attrs.width) && lineval.attrs.points[1] >= r2.attrs.y && lineval.attrs.points[3] <= (r2.attrs.y+r2.attrs.height))
                 {
                    lineval.setAttr('name', 'lineselected');
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

    /*  Text Popup script starts  */
    /*  Text field value on keyup  */
    $("#textfill").keyup(function() {
      updateSample($("#textfill").val(),$('#textFontSelect').val(),$('#textFontsize').val(),$("#textFontBold").prop("checked"), $("#textFontItalic").prop("checked"),$('#myRange').val());
      updateSample1($("#textfill").val(),$('#textFontSelect').val(),$('#textFontsize').val(),$("#textFontBold").prop("checked"), $("#textFontItalic").prop("checked"),$('#myRange').val());
    });

    /* Text font family value on change  */
    $('#textFontSelect').change(function(){
        updateSample($("#textfill").val(),$('#textFontSelect').val(),$('#textFontsize').val(),$("#textFontBold").prop("checked"), $("#textFontItalic").prop("checked"),$('#myRange').val());
        updateSample1($("#textfill").val(),$('#textFontSelect').val(),$('#textFontsize').val(),$("#textFontBold").prop("checked"), $("#textFontItalic").prop("checked"),$('#myRange').val());
    });

    /* Text Font size value on change  */
    $('#textFontsize').change(function(){
        updateSample($("#textfill").val(),$('#textFontSelect').val(),$('#textFontsize').val(),$("#textFontBold").prop("checked"), $("#textFontItalic").prop("checked"),$('#myRange').val());
        updateSample1($("#textfill").val(),$('#textFontSelect').val(),$('#textFontsize').val(),$("#textFontBold").prop("checked"), $("#textFontItalic").prop("checked"),$('#myRange').val());
    });
    /* Text Font Bold value on change  */
    $('#textFontBold').change(function(){
        updateSample($("#textfill").val(),$('#textFontSelect').val(),$('#textFontsize').val(),$("#textFontBold").prop("checked"), $("#textFontItalic").prop("checked"),$('#myRange').val());
        updateSample1($("#textfill").val(),$('#textFontSelect').val(),$('#textFontsize').val(),$("#textFontBold").prop("checked"), $("#textFontItalic").prop("checked"),$('#myRange').val());
    });
    /* Text Font Italic value on change  */
    $('#textFontItalic').change(function(){
          updateSample($("#textfill").val(),$('#textFontSelect').val(),$('#textFontsize').val(),$("#textFontBold").prop("checked"), $("#textFontItalic").prop("checked"),$('#myRange').val());
          updateSample1($("#textfill").val(),$('#textFontSelect').val(),$('#textFontsize').val(),$("#textFontBold").prop("checked"), $("#textFontItalic").prop("checked"),$('#myRange').val());
      });

    var slider = document.getElementById("myRange");
    slider.oninput = function()
    {
      updateSample($("#textfill").val(),$('#textFontSelect').val(),$('#textFontsize').val(),$("#textFontBold").prop("checked"), $("#textFontItalic").prop("checked"),this.value);
      updateSample1($("#textfill").val(),$('#textFontSelect').val(),$('#textFontsize').val(),$("#textFontBold").prop("checked"), $("#textFontItalic").prop("checked"),this.value);
    };
    // CREATE KONVE STAGE AND LAYER for popup sample canvas starts here!
    var updateSampleStage = new Konva.Stage({
     container: 'textSample',
     width: 441,
     height: 200
    });

    updateSampleStage.getContainer().style.border = '1px solid grey';
    var updateSampleLayer = new Konva.Layer();
    updateSampleStage.add(updateSampleLayer);
    var updateSampleGroup = new Konva.Group();
    function updateSample(textpara,fontfamily,textsize,bold,italic,weight) {
        var f = getText(textpara,fontfamily,textsize,bold,italic,weight);

        updateSampleLayer.clearBeforeDraw(true);
        updateSampleLayer.clearCache();
        updateSampleGroup.destroy();
        updateSampleLayer.draw();
        var q = 9;
        if (q >= 10) {
            q = 5;
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
        var f = getText(textpara,fontfamily,textsize,bold,italic,weight);
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
      this.ctx = this.canvas.getContext("2d");

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
              j = Math.max(j, l);
          }
          e.data[f] = a;
      }

      e.textWidth = Math.round(ctx.measureText(textpara).width);
      if (this.textWidth > 580) {
          this.textWidth = c.width;
      }
      return e;
    }
    function fontSpec(e, d, c, b)
    {
        var a = "";
        if (b) {
            a += "italic ";
        }
        if (c) {
            a += "bold ";
        }
        return a + d + "px " + e;
    }
    function getTextHeight(c)
    {
        var e = $('<span style="font: ' + c + '">Hg</span>');
        var d = $('<div style="display: inline-block; width: 1px; height: 0px;"></div>');
        var f = $("<div></div>");
        f.append(e, d);
        var b = $("body");
        b.append(f);
        var a = {};
        try {

            d.css({
                verticalAlign: "baseline"
            });
            a.ascent = d.offset().top - e.offset().top;
            d.css({
                verticalAlign: "bottom"
            });
            a.height = d.offset().top - e.offset().top;
            a.descent = a.height - a.ascent;
        } finally {
            f.remove();
        }
        return a;
    }
    function applyDeselRatio(b) {
        var deselRatio = 1;
        var a = b * deselRatio;
        if (deselRatio >= 1) {
            a = Math.floor(a);
        } else {
            a = Math.ceil(a);
        }
        return a;
    }
    $(document).on("click", "#cloneSampleText", function()
    {
        $( gridHiddenTextGroup.children ).each(function(key, val)
        {
           if(val.attrs.fill === '#ffffff')
           {
              val.destroy();
           }
           val.fontSize(txtFillSize);
           var xx = (Math.round(val.x() / gridSize) * gridSize), yy = (Math.round(val.y() / gridSize) * gridSize);
           val.setAttr('x', xx);
           val.setAttr('y', yy);
           val.setAttr('fill', textFillColor);
           val.setAttr('transformsEnabled', 'position');
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
          if(gridSize >= 20)
          {
            posmin = 320;
          }
          else if(gridSize >= 10)
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
          /*  For touch devices */
          stage.addEventListener("touchmove", function setMousePosition(e){
            mouseX = e.layerX - canvasPos.x-posmin;
            mouseY = e.layerY - canvasPos.y-posmin;
            if(toAnimate){
              update(mouseX,mouseY);
            }
          });
          setTimeout(function(){
            $('.toolbar_list li').removeClass('active');
            $("#select_shape").addClass('active');
            mode = $("#select_shape").data('mode');
          }, 2000);

          stage.addEventListener("click", stopfollow);
          stage.addEventListener("touchend", stopfollow);
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
        newlayer.visible(true);
        newlayer.clearBeforeDraw(true);
        newlayer.clearCache();
        $(newlayer.children).each(function(key, val){
          if(val.name() === "sampleGroupCloned"){
            val.destroy();
          }
        });
        newlayer.draw();
        var b = gridHiddenTextGroup.clone({x:mouseX, y: mouseY, name:'sampleGroupCloned', visible:true});
        newlayer.add(b);
        b.draw();
    }
    function stopfollow()
    {
      var z =0;
      var fillTextArr = [];

      var groups = stage.find(node => { return node.getType() === 'Group'; });
      var RectList = stage.find("Rect");
      $( groups).each(function(key, val) {
          if(val.name() === "sampleGroupCloned")
           {
             $( val.children ).each(function(key, grupval) {
               var xVal;
               var yVal;
               if(z === 0)
                {

                   if((Math.round(val.x() / gridSize) * gridSize) > 0 ){
                     xVal  = grupval.x() + Math.abs(Math.round(val.x() / gridSize) * gridSize);
                  } else {

                    xVal = grupval.x() - Math.abs(Math.round(val.x() / gridSize) * gridSize);
                  }
                    if((Math.round(val.y() / gridSize) * gridSize) > 0 ){
                      yVal = grupval.y() + Math.abs(Math.round(val.y() / gridSize) * gridSize);
                    } else {
                      yVal  = grupval.y() - Math.abs(Math.round(val.y() / gridSize) * gridSize);
                    }
                    fillTextArr.push(`{x : ${Math.abs(Math.round(xVal/gridSize)*gridSize)},y : ${Math.abs(Math.round(yVal/gridSize)*gridSize)}}`);
                }
                else {
                  if((Math.round(val.x() / gridSize) * gridSize) > 0 ){
                     xVal  = grupval.x() + Math.abs(Math.round(val.x() / gridSize) * gridSize);
                   } else {
                     xVal = grupval.x() - Math.abs(Math.round(val.x() / gridSize) * gridSize);
                   }
                   if((Math.round(val.y() / gridSize) * gridSize) > 0 ){
                     yVal = grupval.y() + Math.abs(Math.round(val.y() / gridSize) * gridSize);
                   } else{
                     yVal = grupval.y() - Math.abs(Math.round(val.y() / gridSize) * gridSize);
                   }
                  fillTextArr.push(`{x : ${Math.abs(Math.round(xVal/gridSize)*gridSize)},y : ${Math.abs(Math.round(yVal/gridSize)*gridSize)}}`);
                }
                z++;
             });
             $( RectList ).each(function(key, rectval) {
                var xY = `{x : ${rectval.x()},y : ${rectval.y()}}`;
                if(fillTextArr.indexOf(xY) !== -1)
                {
                      text = new Konva.Text({
                        text: 'X',
                        x: rectval.x(),
                        y: rectval.y(),
                        width: gridSize,
                        height: gridSize,
                        fontFamily: 'sans-serif',
                        fontSize: txtFillSize,
                        fill: textFillColor,
                        fontStyle : 'normal',
                        filled : true,
                        align: 'center',
                      });
                      gridTextGroup.add(text);
                      rectval.setAttr('filled', true);
                      text.draw();
                      ReactHashMap[''+rectval.x()+rectval.y()] = rectval;
                }
              });
              $(newlayer.children).each(function(key, val){
                if(val.name() === "sampleGroupCloned"){
                  val.destroy();
                }
              });
              newlayer.draw();
          }
      });
      toAnimate = false;
      gCacheStage = stage.toJSON();
        // updateLocalStorage(stage.toJSON(),gridSize);
    }
    /*  Text popup ends here  */
    $(document).on('click',"#downloadLoginPopup",function(){
        // gCacheStage = stage.toJSON();
        updateLocalStorage(stage.toJSON(),gridSize)
        localStorage.setItem("download_canvas", stage.toJSON());
        savedesign = true;
    });
    $(document).on("click","#cancel_download",function(){
        localStorage.removeItem("download_canvas");
    });

    $(document).on("click","#download_canvas",function()
    {
        // gCacheStage = stage.toJSON();
        updateLocalStorage(stage.toJSON(),gridSize)
        download_canvas_script(stage.toJSON());
    });

    function download_canvas_script(canvasJSON)
    {
        $("#pdfloader").show();
        var colorHashMap = {},
        colorArry=[],
        backstitch = [],
        carray = [],
        uniqueNames = [];

        /*  For backstitch */
        var canvasline = textlayer.find('Line');
        if(canvasline.length !== 0)
        {
            backstitch = {'colorName':'Black', 'floss':310,'strokeWidth':canvasline[0].strokeWidth()};
        }

        /* For text colors  */
        var canvastext = textlayer.find('Text');
        if(canvastext.length !== 0)
        {
            $(canvastext).each(function(key,val){
              var fillc = val.getAttr('fill');
              carray.push(fillc);
            });
            $.each(carray, function(i, el){
                if($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
            });
        }

        jQuery.getJSON("../json/floss.json").then(function(json)
        {
              var data = json.colors;
              var symbols = ['x','#','$','%','&','*','+','=','?','∆','⌂','□','◊','●','○','Ꙩ'];
              var b = 0;
              $.each( uniqueNames, function( key, val )
              {
                  data.find(function(item)
                  {
                     if(item.color_code === val){
                       if( colorArry.map(x => x.floss).indexOf(item.floss_code) < 0 && item.floss_code !== undefined){
                         colorArry.push({'colorName':item.color_name, 'floss':item.floss_code,'colorSymbol':symbols[b],'colorCode':item.color_code});
                        }
                        colorHashMap[item.color_code] = {
                          'colorName':item.color_name, 'floss':item.floss_code,'colorSymbol':symbols[b],'colorCode':item.color_code
                        };
                     }
                  });
                  b++;
              });
              var stageParsedJSON = JSON.parse(canvasJSON);
              var stageChildren = stageParsedJSON.children;

              for(var i = 0; i < stageChildren.length; i++)
              {
                  if(stageChildren[i].attrs.name == "backgroundLayer")
                  {
                    stageChildren[i].children[0].attrs.fill = '#ffffff';
                  }
                  if(stageChildren[i].attrs.name == "canvasGridLayer")
                  {
                      var gLayer = stageChildren[i];
                      for(var j = 0; j < gLayer.children.length; j++)
                      {
                        if(gLayer.children[j].className == "Rect")
                        {
                              var rectBlock = gLayer.children[j];
                              rectBlock.attrs.shadowEnabled = false;
                              rectBlock.attrs.shadowOpacity = 0;
                              rectBlock.attrs.stroke = "#a1a1a19c";
                              rectBlock.attrs.strokeWidth = 1;
                        }
                        if(gLayer.children[j].className == "Circle")
                        {
                              var cBlock = gLayer.children[j];
                              cBlock.attrs.radius = 0;
                              cBlock.attrs.strokeEnabled = false;
                        }
                    }
                  }
                  if(stageChildren[i].attrs.name == 'textLayer')
                  {
                      var tLayer = stageChildren[i];
                      for(var k = 0; k < tLayer.children.length; k++)
                      {
                        if(tLayer.children[k].attrs.name == "textGroup")
                        {
                            var textGroup = tLayer.children[k];
                            var textBlocks = textGroup.children;
                            console.log(colorHashMap);
                            textGroup.children = textBlocks.map(function (textBlock)
                            {
                                textBlock.attrs.text = colorHashMap[textBlock.attrs.fill].colorSymbol;
                                textBlock.attrs.fill = "#000000";
                                textBlock.attrs.fill = "#000000";
                                return textBlock;
                            });
                          // break;
                        }
                      }
                    }
              }

              stageParsedJSON.children = stageChildren;

              var symbolStage = Konva.Node.create(JSON.stringify(stageParsedJSON), 'symbolstage');
              jsonStage = symbolStage.toDataURL();
              download_canvas(jsonStage,colorArry,backstitch);
          });
    }
    function download_canvas(jsonStage,colorArry,backstitch)
    {
        var colordataimge = '',
        htmlcontent = '';

        if(colorArry.length !== 0){
          htmlcontent = '<h4>Floss</h4>';
          htmlcontent += "<table cellpadding='0' id='table1' cellspacing='0' border='0px'><thead><tr><th></th><th>DMC</th><th>Color</td></tr></thead><tbody>";
            $(colorArry).each(function(key,val){
                 htmlcontent += "<tr><td align='right'>"+ val.colorSymbol+"</td><td>"+ val.floss+"</td><td>"+ val.colorName+"</td></tr>";
            });
            htmlcontent +="</tbody></table>";
        }
        if(backstitch.length !== 0){
            htmlcontent += '<h4>Backstitch</h4>';
            htmlcontent += '<p>Backstitch floss is :' +backstitch.floss+', Colour is : '+backstitch.colorName+'</p>';
            htmlcontent += '<p>Backstitch-' + localStorage.getItem("linestrand") +' strands</p>';
        }

        var bgcolr = backgroundCanvas.find('Rect');
        jQuery.getJSON( "../json/clothColors.json").then(function(clothjson)
        {
              var data = clothjson.colors;
              var val = bgcolr[0].getAttr('fill');
              var filteredObj = data.find(function(item)
              {
                  if(item.color_code === val)
                  {
                        return item;
                  }
              });

              htmlcontent += '<h4>Fabric: </h4><div class="bgattrs"><p>Cloth: '+localStorage.getItem("aidaCloth")+'</p><p> Cloth Frame: '+localStorage.getItem("clothframe")+'</p><p>Grid Cells: '+gridSize+'</p><p> Cloth Floss: '+filteredObj.floss_code+', '+filteredObj.color_name+'</p></div>';

              var doc = new jsPDF('','px');

              var specialElementHandlers = {
                  '#editor': function(element, renderer){
                      return true;
                  },
                  '.controls': function(element, renderer){
                    return true;
                  },
                  '#bypassme': function(element, renderer) {
                    return true;
                    }
              };
              doc.setFontSize(25);
              doc.text(45, 25, "Cross Stitch Pattern Design");
              doc.setFontSize(12);
              doc.setFontStyle('normal');
              doc.fromHTML(htmlcontent, 15, 35, {
                'width': 170,
                'elementHandlers': specialElementHandlers,
              });
              doc.addPage('a4','');
              doc.addImage(jsonStage, 'JPEG', 15, 40, 400, 300);
              doc.save('pattern.pdf');
              $("#pdfloader").hide();
              localStorage.removeItem("download_canvas");
              localStorage.removeItem("linestrand");
        });

    }

    $(document).on("click","#save_canvas",function()
    {
        localStorage.removeItem("download_canvas");
        savedesign = true;
        updateLocalStorage(stage.toJSON(),gridSize)
        localStorage.setItem("stage_image_url", stage.toDataURL());
        localStorage.setItem("stage_json", stage.toJSON());
        localStorage.setItem("stage_gridsize", gridSize);
        localStorage.setItem("stage_clothframe", localStorage.getItem("clothframe"));
        localStorage.setItem("stage_cloth", localStorage.getItem("aidaCloth"));
        window.location.href = $("#upload_page_url").val();
    });

    // var scaleBy = 1.01;
    //    window.addEventListener('wheel', (e) => {
    //        e.preventDefault();
    //        var oldScale = stage.scaleX();
    //
    //        var mousePointTo = {
    //            x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
    //            y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale,
    //        };
    //
    //        var newScale = e.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;
    //        stage.scale({ x: newScale, y: newScale });
    //
    //        var newPos = {
    //            x: -(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale,
    //            y: -(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale
    //        };
    //        stage.position(newPos);
    //        stage.batchDraw();
    //    });



}
function updateLocalStorage(stageJson,gridSize)
{
  localStorage.removeItem("auto_save_canvas");
  var compStageJson = LZString.compress(stageJson);
  localStorage.setItem("auto_save_canvas", compStageJson)
  localStorage.setItem("stage_gridsize", gridSize);
}

// var savedesign = false;
//
// window.onload = function() {
//     window.addEventListener("beforeunload", function (e) {
//         if (savedesign) {
//             return undefined;
//         }
//         updateLocalStorage(gCacheStage,gCacheGrid)
//
//         if(localStorage.getItem("auto_save_canvas") === null)
//         {
//           return undefined;
//         }
//
//         var confirmationMessage = 'It looks like you have been editing something. '
//                                 + 'If you leave before saving, your changes will be lost.';
//
//         (e || window.event).returnValue = confirmationMessage; //Gecko + IE
//         return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.
//     });
// };
