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
        <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css" rel="stylesheet">
        <link href="{{ asset('css/custom_canvas_style.css') }}" rel="stylesheet">
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
                          <li><a class="nav-link" data_url="{{route('createdesign')}}" id="create_new_design_link">Create Design</a></li>
                          <li><a class="nav-link" href="{{route('gallery')}}">Gallery</a></li>
                          @guest
                              <li><a class="nav-link" href="{{ route('login') }}">{{ __('Login') }}</a></li>
                              <li><a class="nav-link" href="{{ route('register') }}">{{ __('Register') }}</a></li>
                          @else
                              <li><a class="nav-link" href="{{ route('mypattern') }}">My Patterns</a></li>
                              <li><a class="nav-link" href="{{ route('home') }}">Dashboard</a></li>
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
           </div>
           <input type="hidden" id="gridCanvasPage" value="{{ url('/gridcanvas') }}"/>
           <script src="//ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
           <script>
             $(document).ready(function(){
               $("#create_new_design_link").click(function(){
                 if (localStorage.getItem("auto_save_canvas") !== null) {
                     window.location.href= $("#gridCanvasPage").val();
                 }
                 else {
                   window.location.href= $(this).attr('data_url');
                 }
               })
             })
           </script>
    </body>
</html>
