@extends('layouts.app')
<link href="{{ asset('css/custom_canvas_style.css') }}" rel="stylesheet">
<link href="{{ asset('css/selectstyle.css') }}" rel="stylesheet">
@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-12">

          <div class="title m-b-md">
              Create your Own Designs
          </div>
          <div class="canvas_container">
              <div class="col-md-10 float-left canvas_content">
                  <div id="canvas"></div>
              </div>
              <div class="col-md-2">
                  <h3>Toolbar Section</h3>
                  <ul class="toolbar_list" id="">
                    <li class="canvas_tool active" id="pencil" data-mode="pencil" title="pencil">
                        <i class="fa fa-pencil" aria-hidden="true"></i>
                    </li>
                    <li class="canvas_tool" id="eraser" data-mode="eraser" title="eraser">
                        <i class="fa fa-eraser" aria-hidden="true"></i>
                    </li>
                    <li class="canvas_tool" id="select_shape" data-mode="select_shape" title="Select Shape">
                      <img src="{{ asset('imgs/select.png') }}" alt="select shape"/>
                    </li>
                    <li class="canvas_tool" id="back_stich" data-mode="back_stich" title="Back Stich">
                      <img src="{{ asset('imgs/back_stich.png') }}" alt="Back Stich" width='54px' height='41px' />
                    </li>
                    <li class="canvas_tool" id="text_modal" data-mode="text" title="Text" data-toggle="modal" data-target="#textModal" data-backdrop="false" >
                        <i class="fa fa-text-width" aria-hidden="true"></i>
                    </li>
                    <li class="canvas_tool" id="refresh_canvas" data-mode="refresh" title="Refresh">
                        <i class="fa fa-refresh" aria-hidden="true"></i>
                    </li>
                  </ul>
                  <p class="font-weight-bold text-left">
                    Click to change text color
                    <button class="btn btn-success show-text-colors-btn" data-toggle="collapse" data-target="#text_pattel_container"> + </button>
                  </p>
                  <div class="text_color_pattel_container collapse text-left" id="text_pattel_container">
                  </div>
                </div>
        </div>
    </div>
</div>
<!-- Modal -->
<div id="textModal" class="modal fade">
    <div class="modal-dialog">
        <div class="col-md-12 modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                 <h4 class="modal-title">Draw Text</h4>

            </div>
            <div class="modal-body">
              <form class="form-horizontal">
              <div class="form-group">
                    <label class="control-label col-sm-2" for="email">Text</label>
                    <div class="col-sm-10">
                      <input type="text" class="form-control" id="textfill" autofocus>
                    </div>
                </div>
                  <div class="form-group">
                    <label class="control-label col-sm-2" for="pwd">Font:</label>
                    <div class="col-sm-10">
                      <select id="textFontSelect">
                        <option value="sans-serif" style="font-family:'sans-serif';">sans-serif</option>
                        <option value="serif" style="font-family:'serif';">serif</option>
                        <option value="monospace" style="font-family:'monospace';">monospace</option>
                        <option value="American Typewriter" style="font-family:'American Typewriter';">American Typewriter</option>
                        <option value="Andale Mono" style="font-family:'Andale Mono';">Andale Mono</option>
                        <option value="Apple Chancery" style="font-family:'Apple Chancery';">Apple Chancery</option>
                        <option value="Arial" style="font-family:'Arial';">Arial</option>
                        <option value="Arial Black" style="font-family:'Arial Black';">Arial Black</option>
                        <option value="Baskerville" style="font-family:'Baskerville';">Baskerville</option>
                        <option value="Big Caslon" style="font-family:'Big Caslon';">Big Caslon</option>
                        <option value="Charter" style="font-family:'Charter';">Charter</option>
                        <option value="Comic Sans MS" style="font-family:'Comic Sans MS';">Comic Sans MS</option>
                        <option value="Copperplate" style="font-family:'Copperplate';">Copperplate</option>
                        <option value="Courier" style="font-family:'Courier';">Courier</option>
                        <option value="Courier New" style="font-family:'Courier New';">Courier New</option>
                        <option value="cursive" style="font-family:'cursive';">cursive</option>
                        <option value="fantasy" style="font-family:'fantasy';">fantasy</option>
                        <option value="Futura" style="font-family:'Futura';">Futura</option>
                        <option value="Georgia" style="font-family:'Georgia';">Georgia</option>
                        <option value="Gill Sans" style="font-family:'Gill Sans';">Gill Sans</option>
                        <option value="Helvetica" style="font-family:'Helvetica';">Helvetica</option>
                        <option value="Herculanum" style="font-family:'Herculanum';">Herculanum</option>
                        <option value="Hoefler Text" style="font-family:'Hoefler Text';">Hoefler Text</option>
                        <option value="Impact" style="font-family:'Impact';">Impact</option>
                        <option value="Lucida Grande" style="font-family:'Lucida Grande';">Lucida Grande</option>
                        <option value="Marker Felt" style="font-family:'Marker Felt';">Marker Felt</option>
                        <option value="Optima" style="font-family:'Optima';">Optima</option>
                        <option value="Osaka" style="font-family:'Osaka';">Osaka</option>
                        <option value="Palatino" style="font-family:'Palatino';">Palatino</option>
                        <option value="Papyrus" style="font-family:'Papyrus';">Papyrus</option>
                        <option value="Skia" style="font-family:'Skia';">Skia</option>
                        <option value="Symbol" style="font-family:'Symbol';">Symbol</option>
                        <option value="Tahoma" style="font-family:'Tahoma';">Tahoma</option>
                        <option value="Times" style="font-family:'Times';">Times</option>
                        <option value="Times New Roman" style="font-family:'Times New Roman';">Times New Roman</option>
                        <option value="Trebuchet MS" style="font-family:'Trebuchet MS';">Trebuchet MS</option>
                        <option value="Verdana" style="font-family:'Verdana';">Verdana</option>
                        <option value="Webdings" style="font-family:'Webdings';">Webdings</option>
                        <option value="Zapf Dingbats" style="font-family:'Zapf Dingbats';">Zapf Dingbats</option>
                        <option value="Zapfino" style="font-family:'Zapfino';">Zapfino</option>
                      </select>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="control-label col-sm-2" for="pwd">Size:</label>
                    <div class="col-sm-10">
                      <input type="number" class="form-control" id="textFontsize" value="12">
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="control-label col-sm-2" for="pwd">Bold:</label>
                    <div class="col-sm-10">
                      <input type="checkbox" name='bold' id='textFontBold'/>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="control-label col-sm-2" for="pwd">Italic:</label>
                    <div class="col-sm-10">
                      <input type="checkbox" name='italic' id='textFontItalic'/>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="control-label col-sm-2" for="pwd">Weight:</label>
                    <div class="col-sm-10">
                      <div class="slidecontainer">
                        <input type="range" min="1" max="100" value="80" class="slider" id="myRange">
                        <p>Value: <span id="demo"></span></p>
                      </div>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="control-label col-sm-2" for="pwd">Sample:</label>
                    <div class="col-sm-10">
                      <!-- <canvas id="textSample" width="300" height="100" style="border:1px solid #ccc;">
                      </canvas> -->
                      <div id="textSample"></div>
                      <div id="textSample1" style="display:none;"></div>
                    </div>
                  </div>

                </form>
            </div>
            <div class="modal-footer">
                <button id="cloneSampleText" type="button" class="btn btn-primary">Ok</button>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>
<!-- /.modal -->


</div>
@endsection
<style>
.slidecontainer {
    width: 100%;
}

.slider {
    -webkit-appearance: none;
    width: 100%;
    height: 15px;
    border-radius: 5px;
    background: #d3d3d3;
    outline: none;
    opacity: 0.7;
    -webkit-transition: .2s;
    transition: opacity .2s;
}

.slider:hover {
    opacity: 1;
}

.slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: #4CAF50;
    cursor: pointer;
}

.slider::-moz-range-thumb {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: #4CAF50;
    cursor: pointer;
}
</style>
<script src="//cdn.rawgit.com/konvajs/konva/2.1.3/konva.min.js"></script>
<script src="//ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
<script src="{{ asset('js/custom_canvas.js') }}" defer></script>
<script src="{{ asset('js/selectstyle.js') }}" defer></script>
<script src="{{ asset('js/canvas_tool_bar_script.js') }}" defer></script>

 <script>
 jQuery(document).ready(function($) {
  $('.select_style').selectstyle({
    width  : 400,
    height : 300,
    theme  : 'light',
    onchange : function(val){}
  });
 });
 </script>
