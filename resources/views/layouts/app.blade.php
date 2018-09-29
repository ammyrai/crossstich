<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>
      <?php if(isset($page_title)) { echo $page_title . '-';} elseif(Request::is('register')) { echo 'Register - '; }elseif(Request::is('login')) { echo 'Login - '; } elseif(Request::is('password/reset')) { echo 'Rest Password - '; }  else { } ?> {{ config('app.name', 'Thimble-bee') }}
    </title>

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}" defer></script>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="//fonts.googleapis.com/css?family=Raleway:300,400,500,600,700,800" rel="stylesheet">

    <!-- Styles -->
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <link href="{{ asset('css/style.css') }}" rel="stylesheet">
    <link href="{{ asset('css/selectstyle.css') }}" rel="stylesheet">

    <link href="{{ asset('css/color_wheel/colorwheel.css') }}" rel="stylesheet">

    <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css" rel="stylesheet">
    <script src="//ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
</head>
<body>
  <input type="hidden" name="site_url" id="site_url" val="{{ url('/') }}"/>
  <input type="hidden" id="gridCanvasPage" value="{{ url('/gridcanvas') }}"/>

  <nav class="navbar navbar-default customNavbar">
    <div class="container">
      <!-- Brand and toggle get grouped for better mobile display -->
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <!-- <a class="navbar-brand" href="#">Brand</a> -->
      </div>

      <!-- Collect the nav links, forms, and other content for toggling -->
      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <!-- <a class="navbar-brand" href="{{ url('/') }}">
            {{ config('app.name', 'Craft World') }}
        </a> -->
        <ul class="nav navbar-nav navbar-right">
          <li ><a href="{{ url('/') }}" onmousedown="return false">Home</a></li>
          <li><a class="create_new_design_link {{{ (Request::is('createdesign') ? 'active' : '') }}} {{{ (Request::is('gridcanvas') ? 'class=active' : '') }}}" data_url="{{route('createdesign')}}">Create Design</a></li>
          <li><a {{{ (Request::is('gallery') ? 'class=active' : '') }}} href="{{route('gallery')}}" onmousedown="return false">Gallery</a></li>
          @guest
          <li><a {{{ (Request::is('login') ? 'class=active' : '') }}} href="{{ route('login') }}" onmousedown="return false">{{ __('Login') }}</a></li>
          <li><a href="{{ route('register') }}" {{{ (Request::is('register') ? 'class=active' : '') }}} onmousedown="return false">{{ __('Register') }}</a></li>
          @else

          <li class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" onmousedown="return false">{{ ucfirst(Auth::user()->name) }} <span class="caret"></span></a>
            <ul class="dropdown-menu">
              <li><a href="{{ route('home') }}" {{{ (Request::is('dashboard') ? 'class=active' : '') }}} onmousedown="return false">Dashboard</a></li>
              <li><a href="{{ route('mypattern') }}" {{{ (Request::is('mypattern') ? 'class=active' : '') }}} onmousedown="return false">My Patterns</a></li>
              <li role="separator" class="divider"></li>
              <li><a href="{{ route('logout') }}"
                 onclick="event.preventDefault();
                               document.getElementById('logout-form').submit();" onmousedown="return false">{{ __('Logout') }}</a>
                 <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                     @csrf
                 </form>
              </li>
            </ul>
          </li>
          @endguest
        </ul>
      </div><!-- /.navbar-collapse -->
    </div><!-- /.container-fluid -->
  </nav>

    <section class="workArea">
            @yield('content')
    </section>

    <footer>
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <ul>
              <li>
                <a class="create_new_design_link" data_url="{{route('createdesign')}}">Create Your Design</a>
              </li>
              <li>
                <a href="{{route('gallery')}}" onmousedown="return false">Gallery</a>
              </li>
              <li>
                <a href="{{route('help')}}" onmousedown="return false">Help & Support</a>
              </li>
              <li>
                <a href="/contact-us" onmousedown="return false">Conatct Us</a>
              </li>
            </ul>
            <p class="copyRight"> &copy; <?php echo date('Y'); ?> thimbleBee. All rights reserved </p>
          </div>
        </div>
      </div>
    </footer>

    <!--  Color Wheel HTML  -->
    <div id="colorWheelModal" class="modal fade color-wheel-popup">
        <div class="modal-dialog">
            <div class="col-md-12 modal-content">
                <div class="modal-header">
                    <button type="button" class="close" id="cancel_download" data-dismiss="modal" aria-hidden="true">&times;</button>
                </div>
                <div class="modal-body">
                  <h3 class="modal-title">Choose your Favorite colour</h3>
                    <div id="widget"></div>
                    <p id="selected"></p>
                    <input type="hidden" id="put_box_color" name="color_name" value=""/>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>

    <!-- Color Wheel HTML ends here! -->
    <script src="{{ asset('js/steps_script.js') }}" defer></script>
    <script src="{{ asset('js/selectstyle.js') }}" defer></script>
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

    <script src="//code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script src="{{ asset('js/form_validation.js') }}" defer></script>
    <script src="{{ asset('js/lz-string.js') }}" defer></script>
    <script src="{{ asset('js/color_wheel/jquery.colorwheel.js') }}" defer></script>
        <script>
          $(document).ready(function(){
            $(".create_new_design_link").click(function(){
              if (localStorage.getItem("auto_save_canvas") !== null) {
                  window.location.href= $("#gridCanvasPage").val();
              }
              else {
                window.location.href= $(this).attr('data_url');
              }
            })
            $(".nav li a").click(function(){
              if (localStorage.getItem("stage_image_url") !== null) {
                  localStorage.removeItem("stage_image_url")
              }
            });


            jQuery(document).on("click", ".color_box", function(){
              console.log("Jii")
                jQuery("#put_box_color").val(jQuery(this).data('id'));
            });

            /*  Custom color wheel script   */
            jQuery("#widget").colorwheel('init',
              ['E2A099',
               'AB0249',
               'F0CED4',
               'E6CCD9',
               '572433',
               '9891B6',
               'A3AED1',
               'BBC3D9',
               '4C526E',
               'C7CAD7',
               '999FB7',
               '7880A4',
               'DBECF5',
               '4D8361',
               'C8D8B8',
               'EFF4A4',
               'C0C840',
               'A77C49',
               'D1D1D1',
               '848484',
               '835B8B',
               'A37BA7',
               'D29FC3',
               'E3CBE3',
               'CC847C',
               'FFDFD7',
               '6F2F00',
               'B35F2B',
               'B71F33',
               'FDED54',
               '1C5066',
               '35668B',
               'B7737F',
               'ABABAB',
               '205F2E',
               'C72B3B',
               '5A8FB8',
               'B33B4B',
               '739FC1',
               '253B73'
             ]
            );


          })
        </script>
</body>
</html>
