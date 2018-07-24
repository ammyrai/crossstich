@extends('layouts.app')
@section('content')
<link href="{{ asset('css/custom_canvas_style.css') }}" rel="stylesheet">
<link href="{{ asset('css/selectstyle.css') }}" rel="stylesheet">
<input type="hidden" name="datafile" id="canvas_data_file" value="{{$pattern->canvas_data_link}}"/>
<input type="hidden" name="pGridSize" id="pGridSize" value="{{$pattern->canvas_grid_size}}"/>
<input type="hidden" name="canvas_cloth" id="canvas_cloth" value="{{$pattern->canvas_cloth}}"/>
<input type="hidden" name="canvas_cloth_frame" id="canvas_cloth_frame" value="{{$pattern->canvas_cloth_frame}}"/>
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-12">

          <div class="title m-b-md">
              Create your Own Designs
          </div>
          @if ($message = Session::get('success'))
              <div class="alert alert-success" id="editDesignMsg">
                  <p>{{ $message }}</p>
              </div>
          @endif
          <div class="canvas_container" style="display:none;" id="myDiv">
              <div class="col-md-10 float-left canvas_content">
                  <div id="canvas"></div>
              </div>
              <div class="col-md-2">
                  <h3>Toolbar Section</h3>
                  <ul class="toolbar_list" id="toolbar_section">
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
                    <li class="canvas_tool" id="download_canvas" data-mode="download" title="Save File">
                        <i class="fa fa-download" aria-hidden="true"></i>
                    </li>
                    <!-- <li class="canvas_tool" id="upload_canvas_modal" data-mode="open" title="Open File" data-toggle="modal" data-target="#uploadModal" data-backdrop="false" >
                        <i class="fa fa-upload" aria-hidden="true"></i>
                    </li> -->

                    <li class="canvas_tool" id="save_canvas" data-mode="save" title="Save to My Patterns">
                        <i class="fa fa-floppy-o" aria-hidden="true"></i>
                    </li>
                  </ul>
                  {!! Form::model($pattern, [
                      'method' => 'PATCH',
                      'route' => ['update', $pattern->id],
                      'id' => 'patternUpdate'
                  ]) !!}
                    {!! Form::hidden('userid', null, ['id' => 'userId' ]) !!}
                    {!! Form::hidden('gridsize', null, ['id' => 'gridsize' ]) !!}
                    {!! Form::textarea('designimage', null, ['id' => 'designimage','style'=>'display:none']) !!}
                    {!! Form::textarea('canvasdata', null, ['id' => 'canvasdata','style'=>'display:none']) !!}
                    {!! Form::submit('Submit', ['class' => 'btn btn-submit','style'=>'display:none']) !!}
                  {!! Form::close() !!}

                      <select width="200" id="selectTxtColor" placeholder="Select Your Favorite Colour for Canvas" data-search="true" data-item="txtColorSelect">
                        <option value="#fcfbf8" data-type="">Ecru</option>
                        <option value="#ffffff" data-type="">White</option>
                        <option value="#000000" data-type="">Black</option>
                        <option value="#c72b3b" data-type="">Red</option>
                        <option value="#fd5d35" data-type="">Orange</option>
                        <option value="#ffe300" data-type="">Yellow</option>
                        <option value="#7fb335" data-type="">Green</option>
                        <option value="#6b9ebf" data-type="">Blue</option>
                        <option value="#633666" data-type="">Violet</option>

                        <option value="#fcfbf8" data-type="">Ecru</option>
                        <option value="#ffffff" data-type="">B5200</option>
                        <option value="#000000" data-type="">310</option>
                        <option value="#c72b3b" data-type="">321</option>
                        <option value="#fd5d35" data-type="">608</option>
                        <option value="#ffe300" data-type="">973</option>
                        <option value="#7fb335" data-type="">906</option>
                        <option value="#6b9ebf" data-type="">826</option>
                        <option value="#633666" data-type="">327</option>
                        </select>
                </div>
        </div>
    </div>
</div>
<img src="" id="canvasimg"/>
<div id="loader"></div>
<div class="design_floss_list_style" id="design_floss_list" style="display:none;"></div>


<!-- Text Modal -->
<div id="textModal" class="modal fade">
    <div class="modal-dialog">
        <div class="col-md-12 modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Draw Text</h4>
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            </div>
            <div class="modal-body">
              <form class="form-horizontal" id="popupForm">
              <div class="form-group">
                    <label class="control-label col-sm-2" for="email">Text</label>
                    <div class="col-sm-10">
                      <input type="text" class="form-control" id="textfill" autofocus>
                    </div>
                </div>
                  <div class="form-group">
                    <label class="control-label col-sm-2" for="pwd">Font:</label>
                    <div class="col-sm-10">
                      <select id="textFontSelect" class="popup_font_family">
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
                        <input type="range" min="20" max="220" value="100" class="slider" id="myRange">
                        <span class="float-left text-left">Light</span> <span class="float-right text-right"> Dark</span>
                      </div>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="control-label col-sm-2" for="pwd">Sample:</label>
                    <div class="col-sm-10">
                      <div id="textSample"></div>
                      <div id="textSample1" style="display:none;"></div>
                    </div>
                  </div>

                </form>
            </div>
            <div class="modal-footer">
              <span id="textToolTooWide" class="" style="color:red; display:none" title="You can change the pattern size in &quot;Grid settings&quot; in the Edit menu.">Text is too wide for pattern</span>
                <button id="cloneSampleText" type="button" class="btn btn-primary">Ok</button>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>
<!-- /.modal -->
<!-- Upload Modal -->
<div id="uploadModal" class="modal fade">
    <div class="modal-dialog">
        <div class="col-md-12 modal-content">
            <div class="modal-header">
                <!-- <h4 class="modal-title">Open file</h4> -->
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            </div>
            <div class="modal-body">
              <form class="form-horizontal" id="uploadForm">
              <div class="form-group">
                    <label class="control-label col-sm-4" for="open file">Open File</label>
                    <div class="col-sm-8">
                      <input type='file' id="upload_file">
                    </div>
                </div>
                </form>
            </div>
            <!-- <div class="modal-footer">
                <button id="cloneSampleText" type="button" class="btn btn-primary">Ok</button>
            </div> -->
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>
<!-- /.modal -->

</div>
<div id="symbolstage" style="display:none"></div>
<div id="pdfloader"><p>Pdf downloading is in progress... Please Wait for a while!</p><img src="{{ asset('imgs/download.gif') }}"/></div>
<script src="//cdn.rawgit.com/konvajs/konva/2.1.3/konva.min.js"></script>
<script src="//ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
<script src="{{ asset('js/custom_canvas_edit.js') }}" defer></script>
<script src="{{ asset('js/selectstyle.js') }}" defer></script>
<!-- <script src="{{ asset('js/canvas_tool_bar_script.js') }}" defer></script> -->
<script src="{{ asset('js/jspdf/jspdf.debug.js') }}" defer></script>
<script src="{{ asset('js/jspdf/jspdf.min.js') }}" defer></script>
<script src="{{ asset('js/jspdf/jspdf.plugin.autotable.js') }}" defer></script>
<script src="{{ asset('js/jspdf/jspdf.plugin.from_html.js') }}" defer></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.min.js"></script>
<script src="{{ asset('js/lz-string.js') }}" defer></script>
<script>
jQuery(document).ready(function($) {
 jQuery('#selectTxtColor').selectstyle({
   width  : 400,
   height : 300,
   theme  : 'light',
   onchange : function(val){}
 });
});

</script>
@endsection
