<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use App\UploadPattern;
use DB;
use URL;

class GalleryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $images  = DB::table('save_pattern_design')->where('pattern_status', 1)->orderByRaw('id DESC')->get()->all();
        return view('gallery')->with("allimages", $images);
    }


    public function mypattern()
    {
        if(\Auth::check()){
          $id = \Auth::user()->id;
          $images  = DB::table('save_pattern_design')->where('user_id', $id)->orderByRaw('id DESC')->get()->all();
          return view('mypattern')->with("allimages", $images);
        }
        else{
            return redirect('/login');
        }

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
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
    public function edit($id,$edit)
    {
        $pattern = UploadPattern::findOrFail($id);
        $pattern['gallery_edit'] = $edit;
        return view('patternedit', array('pattern' => $pattern, 'title' => 'Edit Pattern'));
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
        $userId = \Auth::user()->id;

        $rand = rand(10,100).time();
        $pattern = UploadPattern::findOrFail($id);

        $image = $request->input('designimage'); // your base64 encoded
        $image = str_replace('data:image/png;base64,', '', $image);
        $image = str_replace(' ', '+', $image);
        $imageName = 'pattern'.$rand.$userId.'.png';
        $url = URL::to("/uploads/");
        $imgPath = $url.'/'.$imageName;
        \File::put(public_path(). '/uploads/' . $imageName, base64_decode($image));

        /*  Upload canvas data file */
        $canvasdata = $request->input('canvasdata');
        $file = 'pattern'.$rand.$userId.'.json';
        \File::put(public_path(). '/uploads/' .$file,$canvasdata);
        $canvasFileLink = $url.'/'.$file;

        DB::table('save_pattern_design')
              ->where('id', $id)
              ->update(['pattern_img' => $imgPath,'canvas_data_link'=>$canvasFileLink,'canvas_grid_size'=>$request->input('gridsize')]);

        return redirect('/pattern/edit/'.$id.'/0')->with('success','Pattern Updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
          UploadPattern::destroy($id);
          return redirect('/mypattern')->with('success','Pattern deleted successfully');
    }
}
