<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class GridCanvasController extends Controller
{
    public function index()
    {
      return view('gridcanvas');
    }
}
