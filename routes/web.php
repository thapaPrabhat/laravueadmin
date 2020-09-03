<?php

use Illuminate\Support\Facades\Route;

Auth::routes();

Route::get('/{any}', 'SpaController@index')->where('any', '.*')->middleware('auth');

