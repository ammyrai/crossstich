$(document).ready(function () {
    $(".next_step").click(function (e)
    {
        if($('#aida_cloth').val() === '' && $('#select_cloth_frame').val() === '' && $('#select_style_text').html() === $('#clothColorId').attr('placeholder'))
        {
            $(".aidavalidate").show();
            $(".framevalidate").show();
            $(".clothcolorvalidate").show();
        }
        else if($('#aida_cloth').val() === '')
        {
            $(".aidavalidate").show();
            $(".framevalidate").hide();
            $(".clothcolorvalidate").hide();
        }
        else if($('#select_cloth_frame').val() === '')
        {
            $(".aidavalidate").hide();
            $(".framevalidate").show();
            $(".clothcolorvalidate").hide();
        }
        else if($('#select_style_text').html() === $('#clothColorId').attr('placeholder'))
        {
            $(".aidavalidate").hide();
            $(".framevalidate").hide();
            $(".clothcolorvalidate").show();
        }
        else
        {
            $(".aidavalidate").hide();
            $(".framevalidate").hide();
            $(".clothcolorvalidate").hide();
            window.location.href = $("#gridPageLink").val();
        }
    });
});
