<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

        <title>Craft World</title>

        <!-- Fonts -->
        <link rel="dns-prefetch" href="//fonts.gstatic.com">

        <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
        <link href="//fonts.googleapis.com/css?family=Raleway:300,400,500,600,700,800" rel="stylesheet">
        <link rel="stylesheet" href="//use.fontawesome.com/releases/v5.2.0/css/all.css" integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ" crossorigin="anonymous">

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
                <img src="{{ asset('images/thimble-bee.png') }}"/>
                <h4>A community of cross stitch artists sharing custom embroidery designs.</h4>
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
              <h3 class="heading">Get To Know Us</h3>
            </div>
            <div class="col-md-10 col-md-offset-1 textCon">
              <p>We love designing cross stitch projects.  We want everyone to have access to fun, easy-to-use tools. Thimble-Bee is created to meet the needs of modern sewing enthusiasts.  Whether you are simply looking for a quick, fun project to download or you are interested in creating a customised heirloom, Thimble-Bee gives you the tools to bring your vision to life.  </p>
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
                  <i class="fa fa-pencil-alt"></i>
                  <label>Design</label>
                  <p>Produce stunning patterns with easy-to-use tools.</p>
                </li>
                <li>
                  <i class="fa fa-save" aria-hidden="true"></i>
                  <label>Save</label>
                  <p>Store your work to your free private account.</p>
                </li>
                <li>
                  <i class="fa fa-share-alt" aria-hidden="true"></i>
                  <label>Share</label>
                  <p>Search designs that other artists have made available to the community.</p>
                </li>
                <li>
                  <i class="fa fa-ruler-combined" aria-hidden="true"></i>
                  <label>Combine</label>
                  <p>Quickly merge elements from different designs to customise your project.</p>
                </li>
                <li>
                  <i class="fa fa-download" aria-hidden="true"></i>
                  <label>Download</label>
                  <p>Convert your pattern into printable PDF documents.</p>
                </li>
                <!-- <li>
                  <i class=""></i>
                  <label>Globel</label>
                  <p>Create multiple vaults to keep different documents separately.</p>
                </li> -->
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
                        <img src="{{ $image['pattern_img'] }}">
                        <div class="innerContent">
                          <div class="inner">
                            <div class="galleryCon">
                              <p><a class="tags_link" onclick="tags_search('{{route('gallery')}}','{{ $image['tag_name'] }}')" href="javascript:void(0);">{{ $image['tag_name'] }}</a></p>
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
                  <a href="{{route('gallery')}}" onmousedown="return false">Gallery</a>
                </li>
                <li>
                  <a href="{{route('help')}}" onmousedown="return false">Help & Support</a>
                </li>
                <li>
                  <a href="/contact-us" onmousedown="return false">Conatct Us</a>
                </li>
              </ul>
              <p class="copyRight">© 2018 thimbleBee. All rights reserved </p>
            </div>
          </div>
        </div>
      </footer>
     <script src="//ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
     <script src="//code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
     <script src="//cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
     <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
     <script>
     function tags_search(url, tag)
     {
        localStorage.setItem("tag_name", tag);
        window.location.href= url;
     }

       $(document).ready(function(){
         $(".create_new_design_link").click(function(){
           if (localStorage.getItem("auto_save_canvas") !== null) {
               window.location.href= $("#gridCanvasPage").val();
           }
           else {
             window.location.href= $(this).attr('data_url');
           }
         });
       });
     </script>
    </body>
</html>
