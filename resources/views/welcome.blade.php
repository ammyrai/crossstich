<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Craft World</title>
        <!-- Fonts -->
        <link href="//fonts.googleapis.com/css?family=Raleway:100,600" rel="stylesheet" type="text/css">
        <!-- Styles -->
        <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <link href="{{ asset('css/custom_canvas_style.css') }}" rel="stylesheet">
        <link href="{{ asset('css/steps_style.css') }}" rel="stylesheet">
        <link href="{{ asset('css/selectstyle.css') }}" rel="stylesheet">
        <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css" rel="stylesheet">
    </head>
    <body>
        <div class="flex-center position-ref full-height">
            @if (Route::has('login'))
                <div class="top-right links">
                        <a href="{{ url('/home') }}">Home</a>
                        <a href="{{ route('gallery') }}">Gallery</a>
                    @auth
                        <a href="{{ route('mypattern') }}">My Patterns</a>
                        <a class="nav-link dropdown-toggle" role="button" >
                            {{ Auth::user()->name }}
                        </a>
                        <a class="dropdown-item" href="{{ route('logout') }}"
                           onclick="event.preventDefault();
                                         document.getElementById('logout-form').submit();">
                            {{ __('Logout') }}
                        </a>

                        <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                            @csrf
                        </form>

                    @else
                        <a href="{{ route('login') }}">Login</a>
                        <a href="{{ route('register') }}">Register</a>
                    @endauth
                </div>
            @endif
            </div>
            <div class="content">
                <div class="title m-b-md">
                    Craft World
                </div>

                <!-- Bootstrap setps form starts here-->
                <div class="col-md-8 col-sm-offset-2">
                  <div class="row">
                		<section>
                        <div class="wizard">
                              <ul class="nav nav-wizard">
                                    <li class="active">
                                        <a href="#step1" data-toggle="tab">Select Aida Cloth for Design</a>
                                    </li>
                                    <li class="disabled">
                                        <a href="#step2" data-toggle="tab">Select Aida Cloth Frame Size</a>
                                    </li>
                                    <li class="disabled">
                                        <a href="#step3" data-toggle="tab">Select Aida Cloth Colour</a>
                                    </li>
                                </ul>
                                <form action="" method="post">
                                <div class="tab-content">
                                    <div class="tab-pane active" id="step1">
                                        <h3>Aida Cloth Selection</h3>
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
                                        <ul class="list-inline pull-right">
                                            <li><button type="button" class="btn btn-primary" data-item="step1">Continue</button></li>
                                        </ul>
                                    </div>
                                    <div class="tab-pane" id="step2">
                                        <h3>Aida Cloth Frame Selection</h3>
                                        <p>Frame size is in Height X width in Inches</p>
                                          <div class="selectClothFrame">

                                          </div>
                                          <span class="framevalidate">Please Select Aida Cloth</span>
                                        <ul class="list-inline pull-right">
                                           <li><button type="button" class="btn btn-primary" data-item="step2">
                                             Continue </button></li>
                                        </ul>
                                    </div>
                                    <div class="tab-pane" id="step3">
                                        <h3>Aida Cloth Background Colour Selection</h3>
                                        <div class="selectBgColor">
                                          <select theme="google" width="400" style="" id="clothColorId" class="select_style" placeholder="Select Your Favorite Colour for Canvas" data-search="true" data-item="bgSelect">
                                          	<option value="#E7D6C1" data-type="light">Yellow Beige Lt</option>
                                          	<option value="#D8BC9A" data-type="dark">Yellow Beige Md</option>
                                            <option value="#BC966A" data-type="dark">Yellow Beige Dk</option>
                                            <option value="#A77C49" data-type="dark">Yellow Beige V Dk</option>
                                            <option value="#F2E3CE" data-type="light">Beige Brown Ult Vy Lt</option>
                                            <option value="#CBB69C" data-type="light">Mocha Beige Light</option>
                                            <option value="#FFD7D7" data-type="light">Dusty Rose Ult Vy Lt</option>
                                            <option value="#FFFFFF" data-type="white">Snow White</option>
                                            <option value="#000000" data-type="black">Black</option>
                                            <option value="#E7D6C1" data-type="light">3047</option>
                                          	<option value="#D8BC9A" data-type="dark">3046</option>
                                          	<option value="#BC966A" data-type="dark">3045</option>
                                          	<option value="#A77C49" data-type="dark">167</option>
                                          	<option value="#F2E3CE" data-type="light">543</option>
                                          	<option value="#CBB69C" data-type="light">3864</option>
                                          	<option value="#FFFFFF" data-type="white">B5200</option>
                                          	<option value="#000000" data-type="black">310</option>
                                          </select>
                                        </div>
                                        <span class="clothcolorvalidate">Please Select Aida Cloth</span>
                                        <ul class="list-inline pull-right">
                                          <input type="hidden" id="gridPageLink" value="{{ url('/gridcanvas') }}"/>
                                          <li><button type="button" class="btn btn-primary" data-item="step3">Next</button></li>
                                        </ul>
                                    </div>
                                    <div class="clearfix"></div>
                                </div>
                            </form>
                        </div>
                    </section>
                  </div>
                </div>

                    <!-- Bootstrap setps form ends here-->
           </div>

            <!--  Scripts   -->
            <script src="//ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
            <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
            <script src="{{ asset('js/steps_script.js') }}" defer></script>
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
    </body>
</html>
