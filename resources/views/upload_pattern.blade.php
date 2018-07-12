@extends('layouts.app')

@section('content')
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
              <button type="submit" class="btn btn-default">Submit</button>
              </form>
        </div>
    </div>
</div>
<script>
  window.onload = function() {
    document.getElementById("designImg").value = localStorage.getItem('stage_image_url');
    document.getElementById("canvasData").value = localStorage.getItem('stage_json');
    document.getElementById("canvasGridSize").value = localStorage.getItem('stage_gridsize');
  }
</script>
@endsection
