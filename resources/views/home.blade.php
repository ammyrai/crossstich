@extends('layouts.app')
@section('content')
<input type="hidden" id="upload_url" value="{{ url('/upload_pattern') }}"/>
<input type="hidden" id="gridCanvasPage" value="{{ url('/gridcanvas') }}"/>
<script>
  window.onload = function() {
    if (localStorage.getItem("download_canvas") !== null) {
        window.location.href= $("#gridCanvasPage").val();
    }
    if (localStorage.getItem("download_edit_canvas") !== null) {
        window.location.href= localStorage.getItem("edit_page_url");
    }
    if (localStorage.getItem("stage_image_url") !== null) {
        window.location.href= $("#upload_url").val();
    }
  }
</script>
<div class="container">
  <div class="row">
    <div class="col-md-12">
      <div class="workContainer">
        <h2>Dashboard</h2>
        <div class="row">
          <div class="col-md-12">
            @if (session('status'))
                <div class="alert alert-success">
                    {{ session('status') }}
                </div>
            @endif

            You are logged in!
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
@endsection
