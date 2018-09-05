<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;

class SearchController extends Controller
{
  public function index()
  {

  }
  public function searchtags(Request $request)
  {
       if($request->ajax())
       {

             $output = array();
             if($request->search != '')
             {
                 $patterns = DB::table('save_pattern_design')
                  ->join('patterns_tags', 'save_pattern_design.id', '=', 'patterns_tags.pattren_id')
                  ->join('tags', 'patterns_tags.tag_id', '=', 'tags.tag_id')
                  ->select('save_pattern_design.*')
                  ->where('tags.tag_name','LIKE','%'.$request->search."%")
                  ->where('save_pattern_design.pattern_status', 1)
                  ->simplePaginate(4);
              }
              else
              {
                $patterns  = DB::table('save_pattern_design')->where('pattern_status', 1)->orderByRaw('id DESC')->simplePaginate(4);
              }
              if($patterns)
              {
                 foreach ($patterns as $key => $pattern)
                 {
                    $output[] = array('id'=>$pattern->id,'pattern_img'=>$pattern->pattern_img,'pattren_name'=>$pattern->pattren_name, 'pattern_info'=>$pattern->pattern_info);
                 }
                 return Response($output);
               }

       }
  }
}
