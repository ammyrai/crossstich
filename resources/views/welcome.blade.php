<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Craft World</title>
        <!-- Scripts -->
        <script src="https://cdn.rawgit.com/konvajs/konva/2.1.3/konva.min.js"></script>


        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Raleway:100,600" rel="stylesheet" type="text/css">

        <!-- Styles -->
        <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" type="text/css">
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
                    <!-- <div class="col-md-6 float-left canvas_tool_bar">
                        <p>Grid Width: <input type="text" id="grid_width" value="20" onkeyup="grid_width_change()"></p>
                        <p>Grid Height: <input type="text" id="grid_height" value="20" onkeyup="grid_height_change()"></p>
                        <button onclick="restart();"  title="Clears this grid">Clear</button>
                    </div> -->
                </div>
            </div>
            <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
            <script src="{{ asset('js/custom_canvas.js') }}" defer></script>
    </body>
</html>
