@extends('layouts.app')

@section('content')
<script>
    window.onload = function() {
      localStorage.setItem('stage_image_url',' ');
    }
</script>
<link href="{{ asset('css/custom_canvas_style.css') }}" rel="stylesheet">
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
          <h1>
              My Saved Patterns
          </h1>
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
          <ul class="gallery">
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
                <a href="{{ route('edit', $image->id) }}">Edit</a> |
                    <!-- Delete should be a button -->
                   {!! Form::open(array(
                           'method' => 'DELETE',
                           'route' => ['delete', $image->id],
                           'onsubmit' => "return confirm('Are you sure you want to delete?')",
                       ))
                   !!}
                       {!! Form::submit('Delete') !!}
                   {!! Form::close() !!}
                   <!-- End Delete button -->
                 </div>
              </li>
            @endforeach
          </ul>
        </div>
    </div>
</div>

@endsection
