/*    Canvas tools Script file     */
$(function() {

/*  Read color pattel jason and render html to canvas color tool bar  */
  jQuery.getJSON( "../json/colors.json").then(function(json)
  {
      /*
       *
       *    Canvas Background Color pattel section
       *    Starts Here!
       *
      */
      var colors = [];              // Set an empty array.
      /*  get data from json array  starts here! */
      $.each( json.colors, function( key, val ) {
          var color_style = "background-color:"+ val.color_code;
          colors.push( "<li class='color_pattel' data-floss = '"+ val.floss +"' id='" + val.floss + "' data-type= '"+ val.color_type +"' data-colorcode='"+ val.color_code +"' style='"+color_style+"'> </li>" );
      });
      /*  get data from json array  ends here! */
      /*  Append dynamic list of color pattel to color pattel container */
      $( "<ul/>",
      {
          "class": "my-new-list",
          html: colors.join( "" )
      }).appendTo( ".color_pattel_container" );
      /*
          Canvas Background Color pattel section Ends Here!
      */

      /*
       *
       *    Text Color pattel section
       *    Starts Here!
       *
      */
      var colors = [];              // Set an empty array.
      /*  get data from json array  starts here! */
      $.each( json.colors, function( key, val ) {
          var color_style = "background-color:"+ val.color_code;
          colors.push( "<li class='text_color_pattel' data-floss = '"+ val.floss +"' id='" + val.floss + "' data-type= '"+ val.color_type +"' data-colorcode='"+ val.color_code +"' style='"+color_style+"'> </li>" );
      });
      /*  get data from json array  ends here! */
      /*  Append dynamic list of color pattel to color pattel container */
      $( "<ul/>",
      {
          "class": "text-color-list",
          html: colors.join( "" )
      }).appendTo( ".text_color_pattel_container" );
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
});
