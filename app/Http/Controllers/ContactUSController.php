<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\ContactUS;
use Mail;

class ContactUSController extends Controller
{
  public function index()
  {

  }
  public function contactUS()
  {
    $page_title = 'Contact Us';
    return view('contactUS')->with('page_title',$page_title);
  }

  public function contactUSPost(Request $request)
  {
    $this->validate($request, [ 'name' => 'required', 'email' => 'required|email', 'message' => 'required' ]);
    ContactUS::create($request->all());
          Mail::send('mails/email',
            array(
                    'name' => $request->get('name'),
                    'email' => $request->get('email'),
                    'user_message' => $request->get('message')
                 ), function($message)
                 {
                   $message->from('admin@thimbleBee.com');
                   $message->to('aman.zestgeek@gmail.com', 'Admin')->subject('Cross Stitch Contact Mail');
                 });
         return back()->with('success', 'Thanks for contacting Us!');
       }
}
