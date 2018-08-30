@extends('layouts.app')
@section('content')
<link href="{{ asset('css/tags_style/textext.core.css') }}" rel="stylesheet">
<link href="{{ asset('css/tags_style/textext.plugin.autocomplete.css') }}" rel="stylesheet">
<link href="{{ asset('css/tags_style/textext.plugin.tags.css') }}" rel="stylesheet">
<div class="container">
  <div class="row">
    <div class="col-md-12">
      <div class="workContainer">
        <h2>Save to My Patterns</h2>
        <div class="row">
          <div class="col-md-12">
              <form action="{{ route('create') }}" method="post">
                  {{ csrf_field() }}
                    <div class="form-group">
                      <label for="email">Pattern Name<span class="required_field">*</span></label>
                      <input type="text" class="form-control" id="patternname" name="pattername" required>
                    </div>
                    <div class="form-group">
                      <label for="tags" style=" float:  left; width:  100%;">Pattern Tags<span class="required_field">*</span></label>
                      <textarea id="textarea" class="autotags" rows="1" name="autotags"></textarea>
                      <p class="hintInfo">*Press enter to add more tags.</p>
                    </div>
                    <div class="form-group">
                      <label for="project-info">Info about your project</label>
                      <textarea class="form-control" rows="5" id="info" name="proinfo"></textarea>
                    </div>
                    <div class="form-group">
                        <input type="checkbox" name="prostatus"> Tick to request this is published to our public gallery (please ensure you have copyright permissions for any copyrighted source images used).
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
    </div>
  </div>
</div>

<textarea id="json_array" style="display:none">{{$jsontagarray}}</textarea>
<script src="{{ asset('js/tags_script/textext.core.js') }}" defer></script>
<script src="{{ asset('js/tags_script/textext.plugin.tags.js') }}" defer></script>
<script src="{{ asset('js/tags_script/textext.plugin.autocomplete.js') }}" defer></script>
<script src="{{ asset('js/tags_script/textext.plugin.suggestions.js') }}" defer></script>
<script type="text/javascript">
$(document).ready(function(){

  $('#textarea').textext({ plugins : 'tags autocomplete' }).bind('getSuggestions', function(e, data)
  {
      var JSONString = JSON.parse($("#json_array").val());
      var list1 = [];
      JSONString.map(function( JSONString ) {
        list1.push(JSONString.tagname);
      });
      var list = list1,
      textext = $(e.target).textext()[0],
      query = (data ? data.query : '') || '';

      $(this).trigger(
          'setSuggestions',
          { result : textext.itemManager().filter(list, query) }
      );
  });
});
window.onload = function()
{
      if (localStorage.getItem("stage_image_url") === null) {
          window.location.href= $("#site_url").val();
      }
      document.getElementById("designImg").value = localStorage.getItem('stage_image_url');
      document.getElementById("canvasData").value = localStorage.getItem('stage_json');
      document.getElementById("canvasGridSize").value = localStorage.getItem('stage_gridsize');
      document.getElementById("canvasclothframe").value = localStorage.getItem('stage_clothframe');
      document.getElementById("stage_cloth").value = localStorage.getItem('stage_cloth');
  }
</script>
@endsection
