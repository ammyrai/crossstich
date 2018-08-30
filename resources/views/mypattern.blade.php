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
            <h2>My Saved Patterns</h2>
            <div class="row">
              <div class="col-md-12">
                @if ($message = Session::get('success'))
                    <div class="alert alert-success" id="patternDeleteMsg">
                        <p>{{ $message }}</p>
                    </div>
                    <script>
                    var myVar = setTimeout(function(){
                          document.getElementById("patternDeleteMsg").style.display = "none";
                        }, 2000);
                    </script>
                @endif
              </div>
              @if(count($allimages) > 0)
                  @foreach($allimages as $image)
                  <div class="col-md-4">
                    <div class="gallery">
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
                            <a href="{{ route('edit', [$image->id,0]) }}" class="openbutton btn btn-success">
                              Edit
                            </a>
                                <!-- Delete should be a button -->
                               {!! Form::open(array(
                                       'method' => 'DELETE',
                                       'route' => ['delete', $image->id],
                                       'onsubmit' => "return confirm('Are you sure you want to delete?')",
                                   ))
                               !!}
                                   {!! Form::submit('Delete', ['class' => 'btn btn-success openbutton']) !!}
                               {!! Form::close() !!}
                               <!-- End Delete button -->
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  @endforeach
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
});
function myFunction(id) {
  $(".modal-pattern-desc").html($("#desc_"+id).html());
}
</script>
@endsection
