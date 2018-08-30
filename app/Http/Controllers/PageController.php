<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\URL;

class PageController extends Controller
{
    public function index()
    {

    }
    public function helpnsupport()
    {
        return view('helpnsupport');
    }
}
