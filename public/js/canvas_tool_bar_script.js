/*    Canvas tools Script file     */
$(function() {

/*  Read color pattel jason and render html to canvas color tool bar  */
  jQuery.getJSON( "../json/colors.json").then(function(json)
  {
      /*
       *    Text Color pattel section Starts Here!
      */

      var colors = [];              // Set an empty array.
      /*  get data from json array  starts here! */
      $.each( json.colors, function( key, val ) {
          colors.push( "  <option value='"+ val.color_code +"'>"+ val.floss +"</option>" );
      });
      /*  get data from json array  ends here! */
      /*  Append dynamic list of color pattel to color pattel container */

      // $("#selectTxtColor").append(colors);
      //
      // $( "<select/>",
      // {
      //     "id": "selectTxtColor1",
      //     "class": "text-color-list",
      //     "width" : 200,
      //     "placeholder" : "Select Your Favorite Colour for Canvas",
      //     "data-search" : true,
      //     "data-item" : "txtColorSelect",
      //     html: colors.join( "" )
      // }).appendTo( ".text_color_pattel_container" );
      /*
          Text Color pattel section Ends Here!
      */
  })
  .fail(function(err) {
    //console.log('error',err)
  })
  .always(function() {
  });

  /*  Read color pattel jason and render html to canvas color tool bar  Ends here! */

  /*  Show canvas background colors btn script Starts here!  */
  $('.show-colors-btn').click(function(){
          $(this).text(function(i,old){
              return old=='+' ?  '-' : '+';
          });
  });
  /*  Show canvas background colors btn script ends here! */

  /*  Show text color btn script Starts here!  */
  $('.show-text-colors-btn').click(function(){
          $(this).text(function(i,old){
              return old=='+' ?  '-' : '+';
          });
  });
  /*  Show text colors btn script ends here! */

  jQuery.getJSON( "../json/gridDimension.json").then(function(json)
  {
    var c = $('.select_cloth').val();
      var dimension = [];              // Set an empty array.
      /*  get data from json array  starts here! */
      dimension.push( "<option value=''>Select cloth Frame</option>");
      $.each( json.dimensions, function( key, val ) {
          $.each(val[c],function(key,dval){
                dimension.push( "<option value='"+ dval.squares +"'>"+ dval.frame_size +"</option>");
          })
      });
      /*  get data from json array  ends here! */
      /*  Append dynamic list of color pattel to color pattel container */
      $( ".selectClothFrame" ).html($( "<select/>",
      {
          name: "cloth_frame",
          id:"select_cloth_frame",
          class: "cloth_frame_dropdown",
          placeholder : "Select Aida Cloth Frame Size",
          html: dimension.join( "" )
      }));
      /*
          Canvas Background Color pattel section Ends Here!
      */
  });

  $('.select_cloth').change(function(){
    var c = $(this).val();
    jQuery.getJSON( "../json/gridDimension.json").then(function(json)
    {
        var dimension = [];              // Set an empty array.
        /*  get data from json array  starts here! */
        dimension.push( "<option value=''>Select cloth Frame</option>");
        $.each( json.dimensions, function( key, val ) {
          // localStorage.setItem("clothframe", $('#select_cloth_frame').val());
            $.each(val[c],function(key,dval){
                dimension.push( "<option value='"+ dval.squares +"'>"+ dval.frame_size +"</option>");
            })

        });
        /*  get data from json array  ends here! */
        /*  Append dynamic list of color pattel to color pattel container */
        $( ".selectClothFrame" ).html($( "<select/>",
        {
            name: "cloth_frame",
            id:"select_cloth_frame",
            class: "cloth_frame_dropdown",
            placeholder : "Select Aida Cloth Frame Size",
            html: dimension.join( "" )
        }));
        /*
            Canvas Background Color pattel section Ends Here!
        */
    });
  });


  $(document).on('change', '#select_cloth_frame',function() {
    $(".framevalidate").hide();
      localStorage.setItem("clothframe", $(this).val());
  })


  /*
      ====================================================
      Pass colors to hidden fields from color pattel
      ====================================================
  */
  $(".selectstyle").delegate("ul#select_style_ul li", "click", function(e) {
    $(".clothcolorvalidate").hide();
    canvasBgColor = $(this).attr('value');
    var colorType     = $(this).attr('data-type');
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
    localStorage.setItem("canvasBgColor", canvasBgColor);
    localStorage.setItem("gridStrokeCPara", gridStrokeCPara);
    localStorage.setItem("gridShadowCPara", gridShadowCPara);
    localStorage.setItem("circleStrokeCPara", circleStrokeCPara);
    localStorage.setItem("circleFillCPara", circleFillCPara);

  });
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

  // $(window).on('load',function(){
  //   $('#selectTxtColor1').selectstyle({
  //     width  : 400,
  //     height : 300,
  //     theme  : 'light',
  //     onchange : function(val){}
  //   });
  // })
