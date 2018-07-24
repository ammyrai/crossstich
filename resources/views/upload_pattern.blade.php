@extends('layouts.app')

@section('content')
<input type="hidden" id="base_url" value="{{ url('/') }}"/>

<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
          <h1>
              Save to My Patterns
          </h1>
          <br/>
          <form action="{{ route('create') }}" method="post">
            {{ csrf_field() }}
              <div class="form-group">
                <label for="email">Pattern Name<span class="required_field">*</span> :</label>
                <input type="text" class="form-control" id="patternname" name="pattername" required>
              </div>
              <div class="form-group">
                <label for="pwd">Info about your project:</label>
                <textarea class="form-control" rows="5" id="info" name="proinfo"></textarea>
              </div>
              <div class="checkbox">
                <label><input type="checkbox" name="prostatus"> Tick to request this is published to our public gallery (please ensure you have copyright permissions for any copyrighted source images used).</label>
              </div>
              <textarea name='designimage' id="designImg" style="display:none"></textarea>
              <textarea name='canvasdata' id="canvasData" style="display:none"></textarea>
              <input type="text" name='canvasgridsize' id="canvasGridSize" val="" style="display:none">
              <input type="text" name='stage_cloth' id="stage_cloth" val="" style="display:none">
              <input type="text" name='canvasclothframe' id="canvasclothframe" val="" style="display:none">
              <button type="submit" class="btn btn-default">Submit</button>
              </form>
        </div>
    </div>
</div>
<script src="{{ asset('js/lz-string.js') }}" defer></script>
<script>
window.onload = function() {
    if (localStorage.getItem("stage_image_url") === null) {
        window.location.href= $("#base_url").val();
    }
    // var stageUrl = LZString.decompress(localStorage.getItem('stage_image_url'));
    // var stageJson = LZString.decompress(localStorage.getItem('stage_json'));

    document.getElementById("designImg").value = localStorage.getItem('stage_image_url');
    document.getElementById("canvasData").value = localStorage.getItem('stage_json');
    document.getElementById("canvasGridSize").value = localStorage.getItem('stage_gridsize');
    document.getElementById("canvasclothframe").value = localStorage.getItem('stage_clothframe');
    document.getElementById("stage_cloth").value = localStorage.getItem('stage_cloth');
    // localStorage.removeItem('stage_image_url');
    // localStorage.removeItem('stage_json');
    // localStorage.removeItem('stage_gridsize');
    // localStorage.removeItem('stage_clothframe');
    // localStorage.removeItem('stage_cloth');
  }
</script>
@endsection
