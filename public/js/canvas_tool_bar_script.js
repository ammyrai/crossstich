/*    Canvas tools Script file     */
$(function() {

/*  Read color pattel jason and render html to canvas color tool bar  */
  jQuery.getJSON( "../json/colors.json").then(function(json)
  {
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
  })
  .fail(function(err) {
    console.log('error',err)
  })
  .always(function() {
  });
  /*  Read color pattel jason and render html to canvas color tool bar  Ends here! */

  /*  Show colors btn script Starts here!  */
  $('.show-colors-btn').click(function(){
          $(this).text(function(i,old){
              return old=='+' ?  '-' : '+';
          });
  });
  /*  Show colors btn script ends here! */
});
