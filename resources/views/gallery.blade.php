@extends('layouts.app')

@section('content')
<link href="{{ asset('css/custom_canvas_style.css') }}" rel="stylesheet">
<script>
  window.onload = function() {
    localStorage.setItem('stage_image_url',' ');
  }
</script>
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
          <h1>
              Gallery
          </h1>
          <br/>
          <ul class="gallery">
            @foreach($allimages as $image)
                <li>
                <img src="{{ $image->pattern_img }}" width="150px" height="150px"/>
                <span>{{ $image->pattren_name }}</span>
                <span>{{ $image->pattern_info }}</span>
              </li>
            @endforeach
          </ul>
        </div>
    </div>
</div>
@endsection
