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
           $patterns = DB::table('save_pattern_design')
            ->join('patterns_tags', 'save_pattern_design.id', '=', 'patterns_tags.pattren_id')
            ->join('tags', 'patterns_tags.tag_id', '=', 'tags.tag_id')
            ->select('save_pattern_design.*')
            ->where('tags.tag_name','LIKE','%'.$request->search."%")
            ->get();
            if($patterns)
            {
               foreach ($patterns as $key => $pattern)
               {
                  $patternInfo = substr($pattern->pattern_info, 0, 15);
                  $output[] = array('id'=>$pattern->id,'pattern_img'=>$pattern->pattern_img,'pattren_name'=>$pattern->pattren_name, 'pattern_info'=>$patternInfo);
               }
               return Response($output);
             }
       }
  }
}
