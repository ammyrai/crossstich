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
              My Saved Patterns
          </h1>
          <!-- <div class="col-md-3 col-xs-offset-9 search_box">

            <input class="form-control" type="text" placeholder="Search by tags" aria-label="Search" value="" id="search_tags">
          </div> -->
          <br/>
          @if ($message = Session::get('success'))
              <div class="alert alert-success" id="patternDeleteMsg">
                  <p>{{ $message }}</p>
              </div>
              <script>
              var myVar = setTimeout(function(){
                    document.getElementById("patternDeleteMsg").style.display = "none";
                  }, 1000);
              </script>
          @endif
          @if(count($allimages) > 0)
          <ul class="gallery" id="pattern_list">
            @foreach($allimages as $image)
                <li>
                <div class="pattern_details">
                  <img src="{{ $image->pattern_img }}" width="150px" height="150px"/>
                  <p>{{ $image->pattren_name }}</p>
                  @if( !empty($image->pattern_info))
                  <p>{!! substr($image->pattern_info, 0, 15) !!}@if( strlen($image->pattern_info) >= 15)<span id="dots_{{$image->id}}">...</span><span id="more_{{$image->id}}" class="moretext">{!! substr($image->pattern_info, 15) !!}</span></p><a href="javascript:void(0);" class="redmore_link" onclick="myFunction({{$image->id}})" id="myBtn_{{$image->id}}">Read more</a>@endif
                  @endif
                </div>
                <div class="actions">
                <a href="{{ route('edit', [$image->id,0]) }}" class="btn btn-large btn-primary openbutton">Edit</a>
                    <!-- Delete should be a button -->
                   {!! Form::open(array(
                           'method' => 'DELETE',
                           'route' => ['delete', $image->id],
                           'onsubmit' => "return confirm('Are you sure you want to delete?')",
                       ))
                   !!}
                       {!! Form::submit('Delete', ['class' => 'btn btn-large btn-primary openbutton']) !!}
                   {!! Form::close() !!}
                   <!-- End Delete button -->
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
<script>
function myFunction(id) {
  var dots = document.getElementById("dots_"+id);
  var moreText = document.getElementById("more_"+id);
  var btnText = document.getElementById("myBtn_"+id);

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "Read more";
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "Read less";
    moreText.style.display = "inline";
  }
}
</script>
@endsection
