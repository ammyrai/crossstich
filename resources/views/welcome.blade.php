<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

        <title>Craft World</title>
        <!-- Fonts -->
        <!-- Scripts -->
        <!-- <script src="{{ asset('js/app.js') }}" defer></script> -->

        <!-- Fonts -->
        <link rel="dns-prefetch" href="https://fonts.gstatic.com">

        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
        <link href="https://fonts.googleapis.com/css?family=Raleway:300,400,500,600,700,800" rel="stylesheet">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css" integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ" crossorigin="anonymous">

        <link href="{{ asset('css/style.css') }}" rel="stylesheet">
    </head>
    <body>
      <input type="hidden" id="gridCanvasPage" value="{{ url('/gridcanvas') }}"/>
      <section class="slider">
        <div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
          <!-- Indicators -->
          <ol class="carousel-indicators">
            <li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>
            <li data-target="#carousel-example-generic" data-slide-to="1"></li>
            <li data-target="#carousel-example-generic" data-slide-to="2"></li>
          </ol>

          <!-- Wrapper for slides -->
          <div class="carousel-inner" role="listbox">
            <div class="item active">
              <img src="images/slider1.jpg" alt="...">
            </div>
            <div class="item">
              <img src="images/slider2.jpg" alt="...">
            </div>
            <div class="item">
              <img src="images/slider3.jpg" alt="...">
            </div>
          </div>
          <div class="overlayContent">
            <div class="contentbox">
              <div class="innerBox">
                <h3>Thimble-Bee</h3>
                <h4><b>Cross Stitch</b> is one of the most flexible and creative ways to make customized <br>heirloom artwork.</h4>
                <a data_url="{{route('createdesign')}}" class="create_new_design_link" class="btn btn-success">Start Desiging</a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="gerToKnow">
        <div class="container">
          <div class="row>">
            <div class="col-md-12">
              <h3 class="heading">Get To Know Us More</h3>
            </div>
            <div class="col-md-10 col-md-offset-1 textCon">
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            </div>
          </div>
        </div>
      </section>
      <section class="featureSec">
        <div class="innerFeature">
          <div class="row">
            <div class="col-md-12">
              <h3 class="heading">Features</h3>
            </div>
            <div class="col-md-12">
              <ul class="featureList">
                <li>
                  <i class=""></i>
                  <label>Globel</label>
                  <p>Create multiple vaults to keep different documents separately.</p>
                </li>
                <li>
                  <i class=""></i>
                  <label>Globel</label>
                  <p>Create multiple vaults to keep different documents separately.</p>
                </li>
                <li>
                  <i class=""></i>
                  <label>Globel</label>
                  <p>Create multiple vaults to keep different documents separately.</p>
                </li>
                <li>
                  <i class=""></i>
                  <label>Globel</label>
                  <p>Create multiple vaults to keep different documents separately.</p>
                </li>
                <li>
                  <i class=""></i>
                  <label>Globel</label>
                  <p>Create multiple vaults to keep different documents separately.</p>
                </li>
                <li>
                  <i class=""></i>
                  <label>Globel</label>
                  <p>Create multiple vaults to keep different documents separately.</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section class="gallerySection">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <h3 class="heading">Gallery</h3>
            </div>
            <div class="row galleryContainer">
              <div class="col-md-10 col-md-offset-1">
                @if(count($allimages) > 0)
                <div id="pattern_list">
                  @foreach($allimages as $image)
                    <div class="col-md-4">
                      <div class="gallery pattern_details">
                        <img src="{{ $image->pattern_img }}">
                        <div class="innerContent">
                          <div class="inner">
                            <div class="galleryCon">
                              <p>{{ $image->pattren_name }}</p>
                              @if( !empty($image->pattern_info))
                                <p>
                                  {!! substr(str_replace(' ', '', $image->pattern_info), 0, 15) !!}
                                </p>
                              @endif
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  @endforeach
                  @endif
              </div>
              <div class="col-md-12 text-center">
                <a class="btn btn-success viewMore" href="{{route('gallery')}}">View More</a>
              </div>
            </div>
          </div>
        </div>
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
                  <a href="{{route('gallery')}}">Gallery</a>
                </li>
                <li>
                  <a href="{{route('help')}}">Help & Support</a>
                </li>
                <li>
                  <a href="/contact-us">Conatct Us</a>
                </li>
              </ul>
              <p class="copyRight">© 2018 thimbleBee. All rights reserved </p>
            </div>
          </div>
        </div>
      </footer>
     <script src="//ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
     <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
     <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
     <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
     <script>
       $(document).ready(function(){
         $(".create_new_design_link").click(function(){
           if (localStorage.getItem("auto_save_canvas") !== null) {
               window.location.href= $("#gridCanvasPage").val();
           }
           else {
             window.location.href= $(this).attr('data_url');
           }
         });
         $(".nav-link").click(function(){
           if (localStorage.getItem("stage_image_url") !== null) {
               localStorage.removeItem("stage_image_url")
           }
         });
       });
     </script>
    </body>
</html>
