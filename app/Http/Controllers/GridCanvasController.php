<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\URL;

class GridCanvasController extends Controller
{
    public function index()
    {
        return view('gridcanvas');
    }
    public function createdesign()
    {
        return view('createdesign');
    }
}
