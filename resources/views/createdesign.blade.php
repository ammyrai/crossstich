@extends('layouts.app')
@section('content')
<div class="container">
  <div class="row">
    <div class="col-md-12">
      <div class="workContainer">
        <h2>Create Your Own Designs</h2>
        <div class="row">
          <div class="col-md-12 createDesign">
            <form action="/action_page.php">
              <div class="form-group">
                <label>Select Aida Cloth :</label>
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
                <label>Select Aida Cloth Frame :</label>
                <div class="formContent">
                  <div class="selectClothFrame">

                  </div>
                  <p class="hintInfo">Frame size is in Height X width in Inches</p>
                  <span class="validaion_class framevalidate">Please Select Aida Cloth</span>
                </div>
                <div class="clearfix"></div>
              </div>
              <div class="form-group">
                <label>Select Aida Cloth Colour :</label>
                <div class="formContent">
                  <div class="selectBgColor">
                    <select theme="google" width="400" style="" id="clothColorId" class="form-control select_style" placeholder="Select Your Favorite Colour for Canvas" data-search="true" data-item="bgSelect">
                      <option value="#fcfcee" data-type="light" data-floss="746">Buttermilk - 746</option>
                      <option value="#fffbef" data-type="light" data-floss="712">Ivory - 712</option>
                      <option value="#f8e4c8" data-type="light" data-floss="739">Sandstone - 739</option>
                      <option value="#b39f8b" data-type="dark" data-floss="3032">Natural Brown - 3032</option>
                    </select>
                  </div>
                  <span class="validaion_class clothcolorvalidate">Please Select Aida Cloth</span>
                </div>
                <div class="clearfix"></div>
              </div>
              <div class="form-group">
                <input type="hidden" id="gridPageLink" value="{{ url('/gridcanvas') }}"/>
                <button type="button" class="btn btn-success next_step pull-right" data-item="step3">Next</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<script src="{{ asset('js/canvas_tool_bar_script.js') }}" defer></script>
@endsection
