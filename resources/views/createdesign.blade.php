@extends('layouts.app')
@section('content')
<input type="hidden" id="base_url" value="{{ url('/') }}"/>
<link href="{{ asset('css/selectstyle.css') }}" rel="stylesheet">
<input type="hidden" id="gridCanvasPage" value="{{ url('/gridcanvas') }}"/>
<script>
  window.onload = function() {
    if (localStorage.getItem("auto_save_canvas") !== null) {
        window.location.href= $("#gridCanvasPage").val();
    }
  }
</script>
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-12 grid-canvas-page">
            <div class="title m-b-md">
                Create your Own Designs
            </div>
            <form class="form-horizontal" action="/action_page.php">
            <div class="form-group">
              <label class="control-label col-sm-3" for="email">Select Aida cloth</label>
              <div class="col-sm-9">
                <div class="selectAidaCloth">
                  <select name="cloth" class="select_cloth" id="aida_cloth" placeholder="Select Aida Cloth for Design" onchange="$('.aidavalidate').hide();">
                    <option value="">Select Aida cloth</option>
                    <option value="7">7</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    <option value="14">14</option>
                    <option value="18">18</option>
                    <option value="20">20</option>
                    <option value="22">22</option>
                  </select>
                  <span class="aidavalidate">Please Select Aida Cloth</span>
                </div>
              </div>
            </div>
            <div class="form-group">
              <label class="control-label col-sm-3" for="pwd">Please Select Aida Cloth</label>
              <div class="col-sm-9">
                  <div class="selectClothFrame">

                  </div>
                  <p>Frame size is in Height X width in Inches</p>
                  <span class="framevalidate">Please Select Aida Cloth</span>
              </div>
            </div>
            <div class="form-group">
              <label class="control-label col-sm-3" for="pwd">Please Select Aida Cloth</label>
              <div class="col-sm-9">
                <div class="selectBgColor">
                  <select theme="google" width="400" style="" id="clothColorId" class="select_style" placeholder="Select Your Favorite Colour for Canvas" data-search="true" data-item="bgSelect">
                    <option value="#fcfcee" data-type="light" data-floss="746">Buttermilk - 746</option>
                    <option value="#fffbef" data-type="light" data-floss="712">Ivory - 712</option>
                    <option value="#f8e4c8" data-type="light" data-floss="739">Sandstone - 739</option>
                    <option value="#b39f8b" data-type="dark" data-floss="3032">Natural Brown - 3032</option>
                  </select>
                </div>
                <span class="clothcolorvalidate">Please Select Aida Cloth</span>
              </div>
            </div>
            <div class="form-group">
              <div class="col-sm-offset-3 col-sm-9">
                <input type="hidden" id="gridPageLink" value="{{ url('/gridcanvas') }}"/>
                <button type="button" class="btn btn-primary" data-item="step3">Next</button>
              </div>
            </div>
          </form>
        </div>
    </div>
</div>
<!--  Scripts   -->

<script src="//ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<script src="{{ asset('js/steps_script.js') }}" defer></script>
<script src="{{ asset('js/selectstyle.js') }}" defer></script>
<script src="{{ asset('js/canvas_tool_bar_script.js') }}" defer></script>
 <script>
 jQuery(document).ready(function($) {
  jQuery('.select_style').selectstyle({
    width  : 400,
    height : 300,
    theme  : 'light',
    onchange : function(val){}
  });
 });
 </script>
@endsection
