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
        <link href="//stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" type="text/css">
        <link href="{{ asset('css/custom_canvas_style.css') }}" rel="stylesheet">
    </head>
    <body>
        <div class="flex-center position-ref full-height">
            @if (Route::has('login'))
                <div class="top-right links">
                    @auth
                        <a href="{{ url('/home') }}">Home</a>
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
                <div class="col-md-12 canvas_container">
                    <div class="col-md-6 float-left canvas_content">
                        <div id="canvas"></div>
                    </div>
                    <div class="col-md-6 float-left canvas_tool_bar">
                      <!-- <button type="button" class="btn btn-info" data-toggle="collapse" data-target="#demo">Simple collapsible</button>
                      <div id="demo" class="collapse">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      </div> -->

                        <p class="text-left font-weight-bold">Choose color for canvas background</p>
                        <div class="color_pattel_container">
                        </div>
                        <!-- <p>Grid Width: <input type="text" id="grid_width" value="20" onkeyup="grid_width_change()"></p>
                        <p>Grid Height: <input type="text" id="grid_height" value="20" onkeyup="grid_height_change()"></p>
                        <button onclick="restart();"  title="Clears this grid">Clear</button>
                    </div> -->
                </div>
            </div>
            <!--  Scripts   -->
            <script src="//cdn.rawgit.com/konvajs/konva/2.1.3/konva.min.js"></script>
            <script src="//ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
            <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
            <script src="{{ asset('js/custom_canvas.js') }}" defer></script>
            <script src="{{ asset('js/canvas_tool_bar_script.js') }}" defer></script>
    </body>
</html>
