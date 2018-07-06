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
          <ul class="gallery">
            @foreach($allimages as $image)
                <li>
                <img src="{{ $image->pattern_img }}" width="150px" height="150px"/>
                <span>{{ $image->pattren_name }}</span>
                @if( !empty($image->pattern_info))
                  <span>{!! substr($image->pattern_info, 0, 15) !!}</span>
                @endif
              </li>
            @endforeach
          </ul>
        </div>
    </div>
</div>
@endsection
