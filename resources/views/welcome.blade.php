<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Craft World</title>
        <!-- Fonts -->
        <!-- Scripts -->
        <!-- <script src="{{ asset('js/app.js') }}" defer></script> -->

        <!-- Fonts -->
        <link rel="dns-prefetch" href="https://fonts.gstatic.com">

        <!-- Styles -->
        <link href="{{ asset('css/app.css') }}" rel="stylesheet">
        <!-- Styles -->
        <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <link href="{{ asset('css/custom_canvas_style.css') }}" rel="stylesheet">
        <link href="{{ asset('css/steps_style.css') }}" rel="stylesheet">
        <link href="{{ asset('css/selectstyle.css') }}" rel="stylesheet">
        <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css" rel="stylesheet">
    </head>
    <body>
          <nav class="navbar navbar-expand-md navbar-light navbar-laravel">
              <div class="container">
                  <a class="navbar-brand" href="{{ url('/') }}">
                      {{ config('app.name', 'Craft World') }}
                  </a>
                  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                      <span class="navbar-toggler-icon"></span>
                  </button>

                  <div class="collapse navbar-collapse" id="navbarSupportedContent">
                      <!-- Left Side Of Navbar -->
                      <!-- <ul class="navbar-nav mr-auto">

                      </ul> -->

                      <!-- Right Side Of Navbar -->
                      <ul class="navbar-nav ml-auto">
                          <!-- Authentication Links -->
                          <li><a class="nav-link" href="{{ url('/') }}">Home</a></li>
                          <li><a class="nav-link" href="{{route('gallery')}}">Gallery</a></li>
                          @guest
                              <li><a class="nav-link" href="{{ route('login') }}">{{ __('Login') }}</a></li>
                              <li><a class="nav-link" href="{{ route('register') }}">{{ __('Register') }}</a></li>
                          @else
                              <li><a class="nav-link" href="{{ route('mypattern') }}">My Patterns</a></li>
                              <li class="nav-item dropdown">
                                  <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre>
                                      {{ Auth::user()->name }}
                                  </a>

                                  <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                      <a class="dropdown-item" href="{{ route('logout') }}"
                                         onclick="event.preventDefault();
                                                       document.getElementById('logout-form').submit();">
                                          {{ __('Logout') }}
                                      </a>

                                      <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                          @csrf
                                      </form>
                                  </div>
                              </li>
                          @endguest

                      </ul>
                  </div>
              </div>
          </nav>
            <div class="content">
                <div class="title m-b-md">
                    Craft World
                </div>

                <!-- Bootstrap setps form starts here-->
                <div class="col-md-9 col-sm-offset-3 cloth-steps">
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
                                          	<option value="#fcfcee" data-type="light" data-floss="746">Buttermilk</option>
                                          	<option value="#fffbef" data-type="light" data-floss="712">Ivory</option>
                                            <option value="#f8e4c8" data-type="light" data-floss="739">Sandstone</option>
                                            <option value="#b39f8b" data-type="dark" data-floss="3032">Natural Brown</option>
                                            <option value="#fcfcee" data-type="light" data-floss="746">746</option>
                                          	<option value="#fffbef" data-type="light" data-floss="712">712</option>
                                          	<option value="#f8e4c8" data-type="light" data-floss="739">739</option>
                                          	<option value="#b39f8b" data-type="dark" data-floss="3032">3032</option>
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
             	jQuery('.select_style').selectstyle({
             		width  : 400,
             		height : 300,
             		theme  : 'light',
             		onchange : function(val){}
             	});
             });
             </script>
    </body>
</html>
