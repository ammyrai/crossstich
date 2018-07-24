<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

use App\UploadPattern;
use URL;

class UploadPatternController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
      $storage =  "<script> document.write(localStorage.getItem('stage_image_url')); </script>";
      if (isset($storage)) {
        if(\Auth::check()){
            return view('upload_pattern');
        }
        else{
            return redirect('/login');
        }
      }
      else {
         redirect('/home');
      }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $id = \Auth::user()->id;

        if($request->input('prostatus') == 'on')
        {
          $status = 1;
        }
        else {
            $status = 0;
        }
        $designinfo = $request->input('proinfo');
        if($designinfo == '')
        {
          $designinfo = '';
        }
        $patternDesign = new UploadPattern();
        //On left field name in DB and on right field name in Form/view
        $rand = rand(10,100).time();

        /*  Upload design file */
        $image = $request->input('designimage'); // your base64 encoded
        $image = str_replace('data:image/png;base64,', '', $image);
        $image = str_replace(' ', '+', $image);
        $imageName = 'pattern'.$rand.$id.'.png';
        $url = URL::to("/uploads/");
        $imgPath = $url.'/'.$imageName;
        \File::put(public_path(). '/uploads/' . $imageName, base64_decode($image));

        /*  Upload canvas data file */
        $canvasdata = $request->input('canvasdata');
        $file = 'pattern'.$rand.$id.'.json';
        \File::put(public_path(). '/uploads/' .$file,$canvasdata);
        $canvasFileLink = $url.'/'.$file;

        $patternDesign->user_id = $id;
        $patternDesign->pattren_name = $request->input('pattername');
        $patternDesign->pattern_info = $designinfo;
        $patternDesign->pattern_img = $imgPath;
        $patternDesign->canvas_data_link = $canvasFileLink;
        $patternDesign->canvas_grid_size = $request->input('canvasgridsize');
        $patternDesign->canvas_cloth = $request->input('stage_cloth');
        $patternDesign->canvas_cloth_frame = $request->input('canvasclothframe');
        $patternDesign->pattern_status = $status;
        $patternDesign->save();
        return redirect('/mypattern');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {

    }
}
