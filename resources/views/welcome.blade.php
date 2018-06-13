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
        <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css" rel="stylesheet">
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
                              <i class="fa fa-crop" aria-hidden="true"></i>
                          </li>
                          <li class="canvas_tool" id="" data-mode="text" title="Text">
                              <i class="fa fa-text-width" aria-hidden="true"></i>
                          </li>
                          <li class="canvas_tool" id="refresh_canvas" data-mode="refresh" title="Refresh">
                              <i class="fa fa-refresh" aria-hidden="true"></i>
                          </li>
                        </ul>
                    </div>
                    <div class="col-md-4 float-left canvas_tool_bar">
                      <h3>Canvas Colors Section</h3>
                        <p class="font-weight-bold text-left">
                          Click to change canvas background color
                          <button class="btn btn-success show-colors-btn" data-toggle="collapse" data-target="#pattel_container"> + </button>
                        </p>
                        <div class="color_pattel_container collapse text-left" id="pattel_container">
                        </div>

                        <p class="font-weight-bold text-left">
                          Click to change text color
                          <button class="btn btn-success show-text-colors-btn" data-toggle="collapse" data-target="#text_pattel_container"> + </button>
                        </p>
                        <div class="text_color_pattel_container collapse text-left" id="text_pattel_container">
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
