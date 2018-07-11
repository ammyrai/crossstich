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
              <div class="alert alert-success">
                  <p>{{ $message }}</p>
              </div>
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
                <!-- <a href="{{ route('edit', $image->id) }}">Edit</a> | -->
                    <!-- Delete should be a button -->
                   
                   <!-- End Delete button -->
                 </div>
              </li>
            @endforeach
          </ul>
        </div>
    </div>
</div>
@endsection
