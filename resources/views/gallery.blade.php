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
    <div class="row justify-content-center">
        <div class="col-md-12">
          <h1>
              Gallery
          </h1>
          <div class="col-md-3 col-xs-offset-9 search_box">
            <!-- Search form -->
            <input class="form-control" type="text" placeholder="Search by tags" aria-label="Search" value="" id="search_tags">
          </div>
          <br/>
          @if(count($allimages) > 0)
          <ul class="gallery" id="pattern_list">
            @foreach($allimages as $image)
                <li>
                  <div class="pattern_details">
                    <img src="{{ $image->pattern_img }}" width="150px" height="150px"/>
                    <span>{{ $image->pattren_name }}</span>
                    @if( !empty($image->pattern_info))
                      <span>{!! substr($image->pattern_info, 0, 15) !!}</span>
                    @endif
                  </div>
                  <div class="actions">
                      <a href="{{ route('edit', [$image->id,1]) }}" class="btn btn-large btn-primary openbutton">Edit</a>
                  </div>
              </li>
            @endforeach
          </ul>
          @else
          <div class="alert alert-info">
               <strong>No record found!</strong> You may create your own design by clicking here. <a href="{{ route('createdesign') }}"> Create Design</a>
          </div>
          @endif
        </div>
    </div>
</div>
<script src="//ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script type="text/javascript">
$(document).ready(function(){
  $('#search_tags').on('keyup',function(){
      $value=$(this).val();
      $.ajax({
        type : 'get',
        url : '{{URL::to('search')}}',
        data:{'search':$value},
        success:function(data)
        {
          var output  = '';
          $.each(data,function(key,val){
            var imgurl = $("#site_url").val()+'pattern/edit/'+val.id+"/1";
            output +='<li>'+
                '<div class="pattern_details">'+
                  '<img src="'+val.pattern_img+'" width="150px" height="150px"/>'+
                  '<span>'+val.pattren_name+ '</span>';
                  if( val.pattern_info != ''){
                    output+='<span>'+val.pattern_info+'</span>';
                  }
                output+='</div>'+
                '<div class="actions">'+
                '<a href="'+imgurl+'" class="btn btn-large btn-primary openbutton">Edit</a>'+
                 '</div>'+
             '</li>';
          });
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
