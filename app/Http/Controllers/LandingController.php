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
        $images = DB::table('save_pattern_design')->where('pattern_status', 1)->orderByRaw('id DESC')->limit(6)->get()->all();
        return view('welcome')->with("allimages", $images);
    }
}
