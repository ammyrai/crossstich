@extends('layouts.app')
@section('content')
<script>
    window.onload = function() {
      localStorage.removeItem('stage_image_url');
      localStorage.removeItem('stage_json');
      localStorage.removeItem('stage_clothframe');
      localStorage.removeItem('stage_cloth');
    }
</script>
<div class="container">
  <div class="row">
    <div class="col-md-12">
      <div class="workContainer">
        <h2>Gallery</h2>
        <div class="row">
          <div class="col-md-12">
            <div class="searchCon search_box">
              <input class="form-control" placeholder="Search by Tags" type="text" name="" aria-label="Search" value="" id="search_tags"/>
              <button class="btn">
                <i class="fa fa-search"></i>
              </button>
            </div>
          </div>
          @if(count($allimages) > 0)
          <div id="pattern_list">
            @foreach($allimages as $image)
              <div class="col-md-4 enlarge">
                <div class="gallery pattern_details">
                  <img src="{{ $image->pattern_img }}">
                  <span>
                    <img src="{{ $image->pattern_img }}" />
                    <h5>{{$image->pattren_name}} </h5>
                  </span>
                  <div class="innerContent">
                    <div class="inner">
                      <div class="galleryCon">
                        <p><?php echo str_limit($image->pattren_name, 14); ?></p>
                        @if( !empty($image->pattern_info))
                          <p>
                            <?php echo str_limit($image->pattern_info, 14); ?>
                          </p>
                          <div id="desc_{{ $image->id }}" data-name="{{$image->pattren_name}}" style="display:none;">{{$image->pattern_info}}</div>
                          <a href="#" class="redmore_link" onclick="myFunction({{$image->id}})" id="myBtn_{{$image->id}}" data-toggle="modal" data-target="#galleryModal" data-backdrop="false">
                            Read More
                          </a>
                          <div class="clearfix"></div>
                        @endif
                        <a href="{{ route('edit', [$image->id,1]) }}" class="openbutton">
                          <button class="btn btn-success">Edit</button>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            @endforeach
          </div>
          <div class="clearfix"></div>
          <div class="col-md-12 text-center">
              <?php echo $allimages->render(); ?>
          </div>
          @else
          <div class="col-md-12">
              <div class="alert alert-info text-center">
                 <p class="create_design"><strong>No record found!</strong> You may create your own design by clicking here. <a href="{{ route('createdesign') }}"> Create Design</a></p>
                 <p class="cached_design" style="display:none;"><strong>No record found!</strong> You may create your own design by clicking here. <a href="{{ url('/gridcanvas') }}"> Create Design</a></p>
            </div>
          </div>
          @endif
        </div>
      </div>
    </div>
  </div>
</div>
<div id="galleryModal" class="modal fade">
    <div class="modal-dialog">
        <div class="col-md-12 modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            </div>
            <div class="modal-body">
                <h3 class="modal-pattern-heading"></h3>
                <div class="modal-pattern-desc">
                </div>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>
<script>
function myFunction(id) {
  $(".modal-pattern-heading").html($("#desc_"+id).data('name'));
  $(".modal-pattern-desc").html($("#desc_"+id).html());
}
</script>
<script type="text/javascript">
$(document).ready(function(){
    if (localStorage.getItem("auto_save_canvas") === null)
    {
        $(".create_design").show();
        $(".cached_design").hide();
    }
    else {
      $(".create_design").hide();
      $(".cached_design").show();
    }

    if (localStorage.getItem("tag_name") !== null)
    {
        search_tag(localStorage.getItem("tag_name"));
        $('#search_tags').val(localStorage.getItem("tag_name"));
        localStorage.removeItem("tag_name")
    }
    $('#search_tags').on('keyup',function(){
      $value = $(this).val();
      search_tag($value);
    });

  function search_tag(tag_name){
      $value = tag_name;
      $.ajax({
        type : 'get',
        url : '{{URL::to('search')}}',
        data:{'search':$value},
        success:function(data)
        {
          var output  = '';
          if(data.length >0)
          {
            $.each(data,function(key,val){
              var pattern_name = val.pattren_name;
              var imgurl = $("#site_url").val()+'pattern/edit/'+val.id+"/1";
                    output +='<div class="col-md-4 enlarge">'+
                      '<div class="gallery pattern_details">'+
                        '<img src="'+val.pattern_img+'">'+
                        '<span>'+
                          '<img src="'+val.pattern_img+'" />'+
                          '<h5>'+pattern_name+'</h5>'+
                        '</span>'+
                        '<div class="innerContent">'+
                          '<div class="inner">'+
                            '<div class="galleryCon">'+
                              '<p>'+pattern_name.substr(0, 14)+ '</p>';
                              if( val.pattern_info != '')
                              {
                                var pinfo = val.pattern_info;
                                output += '<p>'+ pinfo.substr(0, 14)+'</p>';
                                output += '<div id="desc_'+val.id+'" style="display:none;" data-name="'+val.pattern_info+'">'+val.pattern_info+'</div>'+
                                '<a href="#" class="redmore_link" onclick="myFunction('+val.id+')" id="myBtn_'+val.id+'" data-toggle="modal" data-target="#textModal" data-backdrop="false">Read More'+
                                '</a>'+
                                '<div class="clearfix"></div>';
                              }
                              output +='<a href="'+imgurl+'" class="openbutton">'+
                                '<button class="btn btn-success">Edit</button>'+
                              '</a>'+
                            '</div>'+
                          '</div>'+
                        '</div>'+
                      '</div>'+
                    '</div>';
            });
          }
          else {
            output+='<div class="col-md-12"><div class="alert alert-info text-center">'+
                 '<strong>No record found!</strong></a>'+
                 '</div></div>';
          }
           $('#pattern_list').html(output);
        }
      });
  }
});
</script>

<script type="text/javascript">
    $.ajaxSetup({ headers: { 'csrftoken' : '{{ csrf_token() }}' } });
</script>
@endsection
