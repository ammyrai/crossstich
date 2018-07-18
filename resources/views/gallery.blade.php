@extends('layouts.app')
@section('content')
<link href="{{ asset('css/custom_canvas_style.css') }}" rel="stylesheet">
<script>
    window.onload = function() {
      localStorage.removeItem('stage_image_url');
    }
</script>
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-12">
          <h1>
              Gallery
          </h1>
          <br/>
          @if(count($allimages) > 0)
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
              </li>
            @endforeach
          </ul>
          @else
          <div class="alert alert-info">
               <strong>No record found!</strong> You may create your own design by clicking here. <a href="{{ url('/') }}"> Create Design</a>
          </div>
          @endif
        </div>
    </div>
</div>
@endsection
