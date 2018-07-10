<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});


Route::get('/gridcanvas', 'GridCanvasController@index');

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

Route::get('/upload_pattern', 'UploadPatternController@index');

Route::post('create', ['as' => 'create', 'uses' => 'UploadPatternController@create']);


Route::get('/gallery', 'GalleryController@index')->name('gallery');
Route::get('/mypattern', 'GalleryController@mypattern')->name('mypattern');
Route::delete('/delete/{id}', array('as' => 'delete', 'uses' => 'GalleryController@destroy'));
