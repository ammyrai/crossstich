$(document).ready(function () {

    //Wizard
    $('a[data-toggle="tab"]').on('show.bs.tab', function (e) {
        var $target = $(e.target);
        if ($target.parent().hasClass('disabled')) {
            return false;
        }
    });

    $(".btn-primary").click(function (e)
    {
        if($(this).data('item') === 'step1')
        {
            if($('#aida_cloth').val() === '')
            {
              $(".aidavalidate").show();
            }
            else {
              var $active = $('.wizard .nav-wizard li.active');
              $active.next().removeClass('disabled');
              nextTab($active);
              $(".aidavalidate").hide();
            }
        }
        else if($(this).data('item') === 'step2')
        {
            if($('#select_cloth_frame').val() === '')
            {
              $(".framevalidate").show();
            }
            else
            {
              var $active = $('.wizard .nav-wizard li.active');
              $active.next().removeClass('disabled');
              nextTab($active);
              $(".framevalidate").hide();
            }
        }
        else
        {
            if($('#select_style_text').html() === $('#clothColorId').attr('placeholder'))
            {
              $(".clothcolorvalidate").show();
            }
            else
            {
              $(".clothcolorvalidate").hide();
              window.location.href = $("#gridPageLink").val();
            }
        }

    });
});

function nextTab(elem) {
    $(elem).next().find('a[data-toggle="tab"]').click();
}
