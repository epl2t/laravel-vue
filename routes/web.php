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
Route::prefix('api')->group(function() {
	Route::post('/authorize', 'AuthController@index');
	Route::get('/user/{id?}', 'UserController@getUser')->middleware('token-auth');
	Route::get('/languages', 'LanguageController@getLanguages')->middleware('token-auth');
	Route::post('/language', 'LanguageController@addLanguage')->middleware('token-auth');
	Route::put('/language/{id}', 'LanguageController@updateLanguage')->middleware('token-auth');
	Route::delete('/language/{id}', 'LanguageController@deleteLanguage')->middleware('token-auth');
	Route::get('/authors', 'AuthorController@getAuthors')->middleware('token-auth');
	Route::post('/author', 'AuthorController@addAuthor')->middleware('token-auth');
	Route::put('/author/{id}', 'AuthorController@updateAuthor')->middleware('token-auth');
	Route::delete('/author/{id}', 'AuthorController@deleteAuthor')->middleware('token-auth');
	Route::get('/categories', 'CategoryController@getCategories')->middleware('token-auth');
	Route::delete('/category/{id}', 'CategoryController@deleteCategory')->middleware('token-auth');
	Route::post('/category', 'CategoryController@addCategory')->middleware('token-auth');
	Route::put('/category/{id}', 'CategoryController@updateCategory')->middleware('token-auth');
	Route::get('/collections', 'CollectionController@getCollections')->middleware('token-auth');
	Route::delete('/collection/{id}', 'CollectionController@deleteCollection')->middleware('token-auth');
	Route::post('/collection', 'CollectionController@addCollection')->middleware('token-auth');
	Route::put('/collection/{id}', 'CollectionController@updateCollection')->middleware('token-auth');

});
