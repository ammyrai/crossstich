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
              <div class="col-md-4">
                <div class="gallery pattern_details">
                  <img src="{{ $image->pattern_img }}">
                  <div class="innerContent">
                    <div class="inner">
                      <div class="galleryCon">
                        <p>{{ $image->pattren_name }}</p>
                        @if( !empty($image->pattern_info))
                          <p>
                            {!! substr(str_replace(' ', '', $image->pattern_info), 0, 15) !!}
                          </p>
                          <div id="desc_{{ $image->id }}" style="display:none;">{{$image->pattern_info}}</div>
                          <a href="#" class="redmore_link" onclick="myFunction({{$image->id}})" id="myBtn_{{$image->id}}" data-toggle="modal" data-target="#textModal" data-backdrop="false">
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
<div id="textModal" class="modal fade">
    <div class="modal-dialog">
        <div class="col-md-12 modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            </div>
            <div class="modal-body">
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

  $('#search_tags').on('keyup',function(){
      $value=$(this).val();
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
              var imgurl = $("#site_url").val()+'pattern/edit/'+val.id+"/1";
                    output +='<div class="col-md-4">'+
                      '<div class="gallery pattern_details">'+
                        '<img src="'+val.pattern_img+'">'+
                        '<div class="innerContent">'+
                          '<div class="inner">'+
                            '<div class="galleryCon">'+
                              '<p>'+val.pattren_name+ '</p>';
                              if( val.pattern_info != '')
                              {
                                var pinfo = val.pattern_info;
                                output += '<p>'+ pinfo.substr(0, 15)+'</p>';
                                output += '<div id="desc_'+val.id+'" style="display:none;">'+val.pattern_info+'</div>'+
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
  });
});
</script>

<script type="text/javascript">
    $.ajaxSetup({ headers: { 'csrftoken' : '{{ csrf_token() }}' } });
</script>
@endsection
