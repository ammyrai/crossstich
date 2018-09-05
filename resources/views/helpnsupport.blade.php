@extends('layouts.app')
@section('content')
<div class="container">
  <div class="row">
    <div class="col-md-12">
      <div class="workContainer">
        <h2>Help And Support</h2>
        <div class="row">
          <div class="col-md-12">
            <div class="helpTextCon">
              <h4>Getting Started with Thimble-Bee</h4>
              <p>Thimble-Bee is an online community of cross stitch artist who design and share their creations. With a Thimble-Bee account, you can create designs, save your work to a private file or share it with the world, edit thousands of designs from our gallery, and convert patterns to printable PDFs.</p>
              <p>Here are some tips to get you started.</p>
              <h4>It is quick, simple and free </h4>
              <p>It is easy to get started with Thimble-Bee. It is free to <a class="create_new_design_link  " data_url="{{route('createdesign')}}">create an account</a> with Thimble-Bee. It only takes a minute to register. You will have access to our complete suite of tools to create beautiful artwork.</p>
              <h4>Benefits of Registration</h4>
              <p>Thimble-Bee <a href="{{ route('register') }}" onmousedown="return false">registration</a> establishes you as the creator of your work. By registering, you have proof that you created the work and the date when the material was created. This information is absolutely necessary to defending the copyright to your intellectual property*.</p>
              <h4>Select a Canvas</h4>
              <p>Getting started is as simple as 1-2-3</p>
              <ol>
                  <li>Select a cloth count (the number of stitches per inch)</li>
                  <li>Select a size for your project</li>
                  <li>Select a color for your cloth</li>
              </ol>
              <h4>Using Our Tools</h4>
              <p>Once you select your canvas, use our tools to </p>
              <ul>
                <li>
                  <p>
                    <i class="fa fa-pencil" aria-hidden="true"></i>
                    <b>Add Stitches –</b> By selecting the pencil, you can place stitches on the canvas to start making your design.  You can use “point-and-click” to place one stitch at a time or “click-and-drag” to make a series of stitches at once.</p>
                </li>
                <li>
                  <p>
                    <i class="fa fa-eraser" aria-hidden="true"></i>
                    <b>Erase Stitches –</b> By selecting the eraser, you can remove stitches from your canvas.</p>
                </li>
                <li>
                  <p>
                    <span class="help_icons"><img src="{{ asset('images/select.png') }}" alt="select shape" /></span>
                    <b>Selection Tool –</b> The selection tool lets you highlight a portion of your design and move it around the canvas.</p>
                </li>
                <li>
                  <p>
                    <span class="help_icons"><img src="{{ asset('images/crossStich.png') }}" alt="Back Stich" /></span>
                    <b>Backstitch –</b> By selecting the backstitch tool, you can add backstitches to your design.</p>
                </li>
                <li>
                  <p>
                    <span class="help_icons"><img src="{{ asset('images/text.png') }}" alt="text" /></span>
                    <b>Text Creator –</b> The text creator lets you automatically generate text in a variety of standard fonts.</p>
                </li>
                <li>
                  <p>
                    <span class="help_icons"><img src="{{ asset('images/download.png') }}" alt="download" /></span>
                    <b>Download to PDF –</b> <a href="{{ route('register') }}" onmousedown="return false">Registered users</a> can convert their designs directly to printable PDFs</p>
                </li>
                <li>
                  <p>
                    <span class="help_icons"><img src="{{ asset('images/save_img.png') }}" alt="save" /></span>
                    <b>Save –</b> <a href="{{ route('register') }}" onmousedown="return false">Registered users</a> can save their creations to private files or share them publicly.</p>
                </li>
              </ul>
              <h4>Explore the Gallery</h4>
              <p>The Thimble-Bee <a href="{{route('gallery')}}" onmousedown="return false">gallery</a> shares thousands of designs produced by our members.  Search for designs by tag, subject, or creator.</p>
              <p>* Thimble-Bee does not register your work with any government agency, issue copyright certificates, or guarantee success in a copyright infringement case relating to work created using Thimble-Bee tools.  Thimble-Bee support to copyright infringement cases is limited to providing evidence of images created and the date of creation.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
@endsection
