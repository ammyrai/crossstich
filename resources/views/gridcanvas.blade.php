@extends('layouts.app')
@section('content')
<style>
.ads_section {
    padding: 0;
    margin-top: 23px;
}
.ads_section img {
    float: left;
    text-align: center;
    vertical-align: middle;
    margin-left: 35px;
}
.canvas_section .workContainer {
    padding-left: 0;
    padding-right: 0;
}
footer {
    float: left;
    width: 100%;
}
@media screen and (max-width:1024px){
  .ads_section img {
    margin-left: 3px;
  }
  .canvas_section .workContainer {
    padding-left: 20px;
    padding-right: 20px;
  }
}
@media screen and (max-width:768px){
  .ads_section  {
    display: none;
  }
  ul.custom_color_boxes {
    width: 400px;
}
.create_new_design {
    margin-left: 75px;
}
}
@media screen and (max-width:600px){
  .toolbar .selectstylecolor {
    width: 100% !important;
    margin-right: 0;
    float: left;
}
.create_new_design {
    margin-left: 0;
}
}
@media screen and (max-width:414px){
  ul.custom_color_boxes {
    width: 100%;
}
.custom_color_boxes li {
    float: left;
    margin-left: -2px;
    margin-bottom: 7px;
}
}
</style>
<input type="hidden" id="create_design_url" value="{{ url('/createdesign') }}"/>
<div class="col-md-12 canvas_page">
<div class="col-md-2 ads_section">
    <img src="{{ asset('images/mobile-ad.png') }}"/>
    <img src="{{ asset('images/mobile-ad.png') }}"/>
    <img src="{{ asset('images/mobile-ad.png') }}"/>
    <img src="{{ asset('images/mobile-ad.png') }}"/>
</div>
<div class="col-md-8 canvas_section">
  <div class="row">
    <div class="col-md-12">
      <div class="workContainer">

        <div id="loader" class="loader">
          <div class="inner"></div>
        </div>

        <div id="pdfloader">
          <div class="innerLoader">
            <div class="loadingCon">
              <p>Please Wait for a while! PDF downloading is in progress...</p>
              <img src="{{ asset('imgs/download.gif') }}" />
            </div>
          </div>
        </div>

        <h2>Create your Own Designs</h2>
        <div class="row">
          <div class="col-md-12">
            <div class="ownDesignCon">
              <div class="canvas_container" style="display:none;" id="myDiv">
                <div class="col-md-12">
                    <div class="toolbar">
                      <ul class="toolbar_list" id="toolbar_section">
                        <li class="canvas_tool active" id="pencil" data-mode="pencil" title="Pencil">
                            <i class="fa fa-pencil" aria-hidden="true"></i>
                        </li>
                        <li class="canvas_tool" id="eraser" data-mode="eraser" title="Eraser">
                            <i class="fa fa-eraser" aria-hidden="true"></i>
                        </li>
                        <li class="canvas_tool" id="select_shape" data-mode="select_shape" title="Select Shape">
                          <img src="{{ asset('images/select.png') }}" alt="select shape" />
                        </li>
                        <li class="canvas_tool" id="back_stich" data-mode="back_stich" title="Back Stich">
                          <img src="{{ asset('images/crossStich.png') }}" alt="Back Stich" />
                        </li>
                        <li class="canvas_tool" id="text_modal" data-mode="text" title="Text" data-toggle="modal" data-target="#textModal" data-backdrop="false" >
                            <img src="{{ asset('images/text.png') }}" alt="text" />
                        </li>
                        @guest
                            <li class="canvas_tool" id="downloadLoginPopup" data-mode="download" title="Download File" data-toggle="modal" data-target="#loginPopupModal" data-backdrop="false">
                                <img src="{{ asset('images/download.png') }}" alt="download" />
                                <input type="hidden" id="checkLogin" value="false"/>
                            </li>
                        @else
                            <li class="canvas_tool" id="download_canvas" data-mode="download" title="Download File">
                                <img src="{{ asset('images/download.png') }}" alt="download" />
                                <input type="hidden" id="checkLogin" value="true"/>
                            </li>
                        @endguest
                        <!-- <li class="canvas_tool" id="upload_canvas_modal" data-mode="open" title="Open File" data-toggle="modal" data-target="#uploadModal" data-backdrop="false" >
                            <i class="fa fa-upload" aria-hidden="true"></i>
                        </li> -->
                        <li class="canvas_tool" id="save_canvas" data-mode="save" title="Save to My Patterns">
                            <img src="{{ asset('images/save_img.png') }}" alt="save" />
                        </li>
                      </ul>
                      <input type="hidden" name="upload_url" id="upload_page_url" value="{{ url('/upload_pattern') }}"/>
                      <select width="200" id="selectTxtColor" placeholder="Select Your Favorite Colour for Canvas" data-search="true" data-item="txtColorSelect">
                          <option value="#fcfbf8" data-type="">Ecru - Ecru</option>
                          <option value="#ffffff" data-type="">White - B5200</option>
                          <option value="#000000" data-type="">Black - 310</option>
                          <option value="#c72b3b" data-type="">Red - 321</option>
                          <option value="#fd5d35" data-type="">Orange - 608</option>
                          <option value="#ffe300" data-type="">Yellow - 973</option>
                          <option value="#7fb335" data-type="">Green - 906</option>
                          <option value="#6b9ebf" data-type="">Blue - 826</option>
                          <option value="#633666" data-type="">Violet - 327</option>
                        </select>
                        <span class="create_new_design" id="clear_canvas" data-mode="clear" title="Clear Canvas">
                            Create New Design
                        </span>
                        <ul class="custom_color_boxes">
                          <?php
                              for($i=0; $i<10; $i++)
                              {  ?>
                                  <li id="color_<?php echo $i; ?>" class="color_box" data-toggle="modal" data-target="#colorWheelModal" data-backdrop="false" data-id="<?php echo $i; ?>" data-color=""><span></span></li>
                          <?php  } ?>
                        </ul>

                        <span class="create_new_design change_canvas_btn float-right" id="change_canvas" title="Change Canvas" data-toggle="modal" data-target="#changeCanvasModal" data-backdrop="false">
                            Click to change canvas
                        </span>
                        <select name="backstich-strand" class="backstitch_strand">
                            <option value="">Select BackStich Strand</option>
                            <option value="1">1 Strand</option>
                            <option value="2">2 Strand</option>
                            <option value="3">3 Strand</option>
                        </select>
                        <select name="x-size" class="x-size">
                            <option value="">Select X's Size</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            <option value="13">13</option>
                            <option value="14">14</option>
                            <option value="15">15</option>
                            <option value="16">16</option>
                            <option value="17">17</option>
                            <option value="18">18</option>
                            <option value="19">19</option>
                            <option value="20">20</option>
                            <option value="21">21</option>
                            <option value="22">22</option>
                            <option value="23">23</option>
                            <option value="24">24</option>
                            <option value="25">25</option>
                            <option value="26">26</option>
                            <option value="27">27</option>
                            <option value="28">28</option>
                            <option value="29">29</option>
                            <option value="30">30</option>
                        </select>
                      </div>
                  </div>
                  <div class="col-md-12 float-left canvas_content">
                      <div id="canvas"></div>
                  </div>
            </div>
            <div class="helpTextCon instructions">
              <h4>Instructions:</h4>
              <ul>
                <li>
                  <label>How to use it</label>
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, </p>
                </li>
                <li>
                  <label>Tell us...</label>
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
<div class="col-md-2 ads_section">
  <img src="{{ asset('images/mobile-ad.png') }}"/>
  <img src="{{ asset('images/mobile-ad.png') }}"/>
  <img src="{{ asset('images/mobile-ad.png') }}"/>
  <img src="{{ asset('images/mobile-ad.png') }}"/>
</div>
</div>
<!-- Text Modal -->
<div id="changeCanvasModal" class="modal fade">
    <div class="modal-dialog">
        <div class="col-md-12 modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Change Canvas</h4>
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            </div>
            <div class="modal-body">
              <form action="/action_page.php">
                <div class="form-group">
                  <label>Select Aida Cloth</label>
                  <div class="formContent">
                    <div class="selectAidaCloth">
                      <select name="cloth" class="form-control select_cloth" id="aida_cloth" placeholder="Select Aida Cloth for Design" onchange="$('.aidavalidate').hide();">
                        <option value="">Select Aida cloth</option>
                        <option value="7">7</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                        <option value="14">14</option>
                        <option value="18">18</option>
                        <option value="20">20</option>
                        <option value="22">22</option>
                      </select>
                      <span class="validaion_class aidavalidate">Please Select Aida Cloth</span>
                    </div>
                  </div>
                  <div class="clearfix"></div>
                </div>
                <div class="form-group">
                  <label>Select Aida Cloth Frame</label>
                  <div class="formContent">
                    <div class="selectClothFrame">

                    </div>
                    <p class="hintInfo">Frame size is in Height X width in Inches</p>
                    <span class="validaion_class framevalidate">Please Select Aida Cloth Frame</span>
                  </div>
                  <div class="clearfix"></div>
                </div>
                <div class="form-group">
                  <label>Select Aida Cloth Colour</label>
                  <div class="formContent">
                    <div class="selectBgColor">
                      <select theme="google" width="400" style="" id="clothColorId" class="form-control select_style" placeholder="Select Your Favorite Colour for Canvas" data-search="true" data-item="bgSelect">
                        <option value="#fcfcee" data-type="light" data-floss="746">Buttermilk - 746</option>
                        <option value="#fffbef" data-type="light" data-floss="712">Ivory - 712</option>
                        <option value="#f8e4c8" data-type="light" data-floss="739">Sandstone - 739</option>
                        <option value="#b39f8b" data-type="dark" data-floss="3032">Natural Brown - 3032</option>
                      </select>
                    </div>
                    <span class="validaion_class clothcolorvalidate">Please Select Aida Cloth Colour</span>
                  </div>
                  <div class="clearfix"></div>
                </div>
              </form>
            </div>
            <div class="modal-footer">
                <button id="cloneSampleText" type="button" class="btn btn-success ok_btn pull-right">Ok</button>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>
<!-- /.modal -->

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
                    <label class="control-label col-sm-2" for="text">Text</label>
                    <div class="col-sm-10">
                      <input type="text" class="form-control" id="textfill" autofocus>
                    </div>
                </div>
                  <div class="form-group">
                    <label class="control-label col-sm-2" for="font">Font:</label>
                    <div class="col-sm-10">
                      <select id="textFontSelect" class="popup_font_family form-control">
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
                    <label class="control-label col-sm-2" for="size">Size:</label>
                    <div class="col-sm-10">
                      <input type="number" class="form-control" id="textFontsize" value="12">
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="control-label col-sm-2" for="bold">Bold:</label>
                    <div class="col-sm-10">
                      <input type="checkbox" name='bold' id='textFontBold'/>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="control-label col-sm-2" for="italic">Italic:</label>
                    <div class="col-sm-10">
                      <input type="checkbox" name='italic' id='textFontItalic'/>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="control-label col-sm-2" for="weight">Weight:</label>
                    <div class="col-sm-10">
                      <div class="text-weight slidecontainer">
                        <input type="range" min="20" max="220" value="100" class="slider" id="myRange">
                        <span class="span-left text-left">Dark</span> <span class="span-right text-right">Light </span>
                      </div>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="control-label col-sm-2" for="sample">Sample:</label>
                    <div class="col-sm-10">
                      <div id="textSample"></div>
                      <div id="textSample1" style="display:none;"></div>
                    </div>
                  </div>

                </form>
            </div>
            <div class="modal-footer">
                <span id="textToolTooWide" class="textToolTooWide" style="display:none" title="You can change the pattern size in &quot;Grid settings&quot; in the Edit menu.">Text is too wide for pattern</span>
                <button id="cloneSampleText" type="button" class="btn btn-success ok_btn pull-right">Ok</button>
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
<!-- Upload Modal -->
<div id="loginPopupModal" class="modal fade">
    <div class="modal-dialog">
        <div class="col-md-12 modal-content">
            <div class="modal-header">
                <!-- <h4 class="modal-title">Open file</h4> -->
                <button type="button" class="close" id="cancel_download" data-dismiss="modal" aria-hidden="true">&times;</button>
            </div>
            <div class="modal-body">
              <div class="form-group login-modal-text">
                <p>Please <a href="{{ route('login') }}">Login</a> first to Download the design.</p>
              </div>
            </div>
            <div class="modal-footer">
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>
<!-- /.modal -->
<div id="symbolstage" style="display:none"></div>

<script src="//cdn.rawgit.com/konvajs/konva/2.1.3/konva.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
<script src="{{ asset('js/custom_canvas.js') }}" defer></script>
<script src="{{ asset('js/canvas_tool_bar_script.js') }}" defer></script>
<script src="{{ asset('js/jspdf/jspdf.debug.js') }}" defer></script>
<script src="{{ asset('js/jspdf/jspdf.min.js') }}" defer></script>
<script src="{{ asset('js/jspdf/jspdf.plugin.autotable.js') }}" defer></script>
<script src="{{ asset('js/jspdf/jspdf.plugin.from_html.js') }}" defer></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.min.js"></script>

<script>
 jQuery(document).ready(function($) {

  /*  Searchable dropdown for text colors.  */
  jQuery('#selectTxtColor').selectstyle({
    width  : 400,
    height : 300,
    theme  : 'light',
    onchange : function(val){}
  });
 });
</script>
@endsection
