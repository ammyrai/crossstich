
/****************************************************************
* Selector plug that made select tag in to custome select style *
*****************************************************************/
(function($){
	$.fn.selectstyle = function(option){
		var defaults = {
			width  : 250,
			height : 300,
			theme  : 'light'
		},
		setting = $.extend({}, defaults, option);
		this.each(function(){
			var $this = $(this),
				parent = $(this).parent(),
				html = '',
				html_op = '',
				search = $this.attr('data-search'),
				name = $this.attr('name'),
				style = $this.attr('style'),
				placeholder = $this.attr('placeholder'),
				id = $this.attr('id');
				select_item = $this.attr('data-item');

			setting.width = (parseInt($this.attr('width') == null ? $this.width() : $this.attr('width') ) + 10 )+'px';
			setting.theme = $this.attr('theme') != null ? $this.attr('theme') : setting.theme;

			$this.find('option').each(function (e) {
				var $this_a = $(this),
					val = $this_a.val(),
					color_type = $this_a.attr('data-type')
					color_floss = $this_a.attr('data-floss')
					image = $this_a.attr('data-image'),
					text = $this_a.html();
				if(val == null){
					val = text;
				}
				html_op += '<li data-title="'+text+'" data-type="'+color_type+'" data-floss="'+color_floss+'" value="'+val+'"';
				if($this_a.attr('font-family') != null){
					html_op += ' style="font-family'+$this_a.attr('font-family')+'"';
				}
				html_op += '>';
				if(image != null){
					html_op += '<div class="ssli_image"><img src="'+image+'"></div>';
				}
				html_op += '<div class="ssli_text">'+text+'</div></li>';
			});
			$this.hide();
			if(select_item === 'bgSelect')
			{
					html =
					'<div class="selectstyle ss_dib '+setting.theme+'" style="width:'+parseInt(setting.width)+'px;">'+
						'<div id="select_style" class="ss_button" style="width:'+parseInt(setting.width)+'px;'+style+'">'+
							'<div class="ss_dib ss_text" id="select_style_text" style="margin-right:15px;width:'+(parseInt(setting.width) - 20)+'px;position:relative;">'+placeholder+'</div>'+
							'<div class="ss_dib ss_image"></div>'+
						'</div>';
					if(search == "true"){
						html += '<ul id="select_style_ul" sid="'+id+'" class="ss_ulsearch" style="max-height:'+setting.height+'px;width:'+(parseInt(setting.width) + 20)+'px;"><div class="search" id="ss_search"><input type="text" placeholder="Search" autofocus></div><ul style="max-height:'+(parseInt(setting.height) - 53)+'px;width:'+(parseInt(setting.width) + 20)+'px;" class="ss_ul">'+html_op+'</ul></ul>';
					}
					else{
						html += '<ul id="select_style_ul" sid="'+id+'" style="max-height:'+setting.height+'px;width:'+(parseInt(setting.width) + 20)+'px;" class="ss_ul">'+html_op+'</ul>';
					}
			}
			else {
				html =
				'<div class="selectstylecolor ss_dib '+setting.theme+'" style="width:'+parseInt(setting.width)+'px;">'+
					'<div id="select_style" class="ss_button" style="width:'+parseInt(setting.width)+'px;'+style+'">'+
						'<div class="ss_dib ss_text" id="select_style_text" style="margin-right:15px;width:'+(parseInt(setting.width) - 20)+'px;position:relative;">'+placeholder+'</div>'+
						'<div class="ss_dib ss_image"></div>'+
					'</div>';
				if(search == "true"){
					html += '<ul id="select_style_color_ul" sid="'+id+'" class="ss_ulsearch" style="max-height:'+setting.height+'px;width:'+(parseInt(setting.width) + 20)+'px;"><div class="search" id="ss_search"><input type="text" placeholder="Search" autofocus></div><ul style="max-height:'+(parseInt(setting.height) - 53)+'px;width:'+(parseInt(setting.width) + 20)+'px;" class="ss_ul">'+html_op+'</ul></ul>';
				}
				else{
					html += '<ul id="select_style_ul" sid="'+id+'" style="max-height:'+setting.height+'px;width:'+(parseInt(setting.width) + 20)+'px;" class="ss_ul">'+html_op+'</ul>';
				}
			}
			html += '</div>';
			$(html).insertAfter($this);

		});
		$(".selectstyle").delegate( "div#ss_search input", "keyup", function(e) {
			var val = $(this).val(), flag=false;
			$('#nosearch').remove();
			$(this).parent().parent().find('li').each(function(index, el) {
				if($(el).text().indexOf(val) > -1){
					$(el).show();
					flag=true;
				}
				else{
					$(el).hide();
				}
			});
			if (!flag) {$(this).parent().parent().append('<div class="nosearch" id="nosearch">Nothing Found</div>')};
		});
		$(".selectstyle").delegate( "div#select_style", "click", function(e) {
			$('ul#select_style_ul').hide();
			var ul = $(this).parent('div').find('ul#select_style_ul');
			ul.show();
			var height = ul.height();
			var offset = $(this).offset();
			if(offset.top+height > $(window).height()){
				ul.css({
					marginTop: -(((offset.top+height) - $(window).height()) + 100)
				});
			}
		});
		$(".selectstyle").delegate("ul#select_style_ul li", "click", function(e) {
			var txt = $(this).data('title'),
				vl = $(this).attr('value'),
				sid = $(this).parent('ul').attr('sid');
			$(this).parents('ul#select_style_ul').hide();
			$(this).parents('ul#select_style_ul').parent('div').find('div#select_style_text').html(txt);
			$('#'+sid).children('option').filter(function(){return $(this).val()==vl}).prop('selected',true).change();


			 $(".clothcolorvalidate").hide();
          canvasBgColor = $(this).attr('value');
          var colorType = $(this).attr('data-type');
          var colorfloss = $(this).attr('data-floss');
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
          localStorage.setItem("canvascolorfloss", colorfloss);
          localStorage.setItem("gridStrokeCPara", gridStrokeCPara);
          localStorage.setItem("gridShadowCPara", gridShadowCPara);
          localStorage.setItem("circleStrokeCPara", circleStrokeCPara);
          localStorage.setItem("circleFillCPara", circleFillCPara);

		});
		$(document).delegate(".selectstyle", "click", function(e) {
			var clickedOn=$(e.target);
			if(!clickedOn.parents().addBack().is('ul#select_style_ul, div#select_style')){
				$('ul#select_style_ul').fadeOut(400);
				$('div#ss_search').children('input').val('').trigger('keyup');
			}
		});

		$(".selectstylecolor").delegate( "div#ss_search input", "keyup", function(e) {
			var val = $(this).val(), flag=false;
			$('#nosearch').remove();
			$(this).parent().parent().find('li').each(function(index, el) {
				if($(el).text().indexOf(val) > -1){
					$(el).show();
					flag=true;
				}
				else{
					$(el).hide();
				}
			});
			if (!flag) {$(this).parent().parent().append('<div class="nosearch" id="nosearch">Nothing Found</div>')};
		});
		$(".selectstylecolor").delegate( "div#select_style", "click", function(e) {
			$('ul#select_style_color_ul').hide();
			var ul = $(this).parent('div').find('ul#select_style_color_ul');
			ul.show();
			var height = ul.height();
			var offset = $(this).offset();
			if(offset.top+height > $(window).height()){
				ul.css({
					marginTop: -(((offset.top+height) - $(window).height()) + 100)
				});
			}
		});
		$(".selectstylecolor").delegate("ul#select_style_color_ul li", "click", function(e) {
			var txt = $(this).data('title'),
				vl = $(this).attr('value'),
				sid = $(this).parent('ul').attr('sid');
			$(this).parents('ul#select_style_color_ul').hide();
			$(this).parents('ul#select_style_color_ul').parent('div').find('div#select_style_text').html(txt);
			$('#'+sid).children('option').filter(function(){return $(this).val()==vl}).prop('selected',true).change();
		});
		$(document).delegate(".selectstylecolor", "click", function(e) {
			var clickedOn=$(e.target);
			if(!clickedOn.parents().addBack().is('ul#select_style_color_ul, div#select_style')){
				$('ul#select_style_color_ul').fadeOut(400);
				$('div#ss_search').children('input').val('').trigger('keyup');
			}
		});
	}

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

})(jQuery);
