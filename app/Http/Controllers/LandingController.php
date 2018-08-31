<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\URL;
use DB;

class LandingController extends Controller
{
    public function index()
    {
        $patterns = DB::table('tags')
         ->join('patterns_tags', 'tags.tag_id', '=', 'patterns_tags.tag_id')
         ->select('tags.*')
         ->groupby('tags.tag_id')
         ->orderby('tags.tag_id','DESC')
         ->get();

         foreach ($patterns as $key => $pattern)
         {
             $tags_images = DB::table('save_pattern_design')
              ->join('patterns_tags', 'save_pattern_design.id', '=', 'patterns_tags.pattren_id')
              ->join('tags','patterns_tags.tag_id', '=', 'tags.tag_id')
              ->select('save_pattern_design.pattern_img')
              ->where('patterns_tags.tag_id',$pattern->tag_id)
              ->where('save_pattern_design.pattern_status',1)
              ->orderby('patterns_tags.id','DESC')
              ->limit(1)
              ->get();

              foreach ($tags_images as $key => $tags_image)
              {
                  $tags_array[] = array('tag_id'=>$pattern->tag_id, 'tag_name'=>$pattern->tag_name,'pattern_img'=>$tags_image->pattern_img);
              }
         }
         $images = array_slice($tags_array, 0, 6);
         return view('welcome')->with("allimages", $images);
    }
}
