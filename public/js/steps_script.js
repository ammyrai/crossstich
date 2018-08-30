$(document).ready(function () {
    $(".next_step").click(function (e)
    {
        if($('#aida_cloth').val() === '')
        {
          $(".aidavalidate").show();
        }
        else
        {
          $(".aidavalidate").hide();
        }
        if($('#select_cloth_frame').val() === '')
        {
          $(".framevalidate").show();
        }
        else
        {
          $(".framevalidate").hide();
        }
        if($('#select_style_text').html() === $('#clothColorId').attr('placeholder'))
        {
          $(".clothcolorvalidate").show();
        }
        else
        {
          $(".clothcolorvalidate").hide();
          window.location.href = $("#gridPageLink").val();
        }
    });
});
