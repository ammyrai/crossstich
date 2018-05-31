/*    Canvas tools Script file     */
$(function() {

jQuery.getJSON( "../json/colors.json").then(function(json) {

  var colors = [];
  $.each( json.colors, function( key, val ) {
    var color_style = "background-color:"+ val.color_code;
    colors.push( "<li class='color_pattel' data-floss = '"+ val.floss +"' id='" + val.floss + "' data-type= '"+ val.color_type +"' style='"+color_style+"'></li>" );
  });

  $( "<ul/>", {
    "class": "my-new-list",
    html: colors.join( "" )
  }).appendTo( ".color_pattel_container" );
  })
  .fail(function(err) {
    console.log('error',err)
  })
  .always(function() {

  });
});
