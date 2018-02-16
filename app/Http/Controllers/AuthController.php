<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AuthController extends Controller
{
	public function index(Request $request)
	{
		$user=\App\User::where('email',$request->login)->where('password',sha1(sha1($request->password)))->first();
		if (!$user)
		{
			abort (404,'User not found');
		}
		do {
		$token = str_random();
		} while ( \App\Token::where('token', $token )->first());
		\App\Token::where ('user_id',$user->id)->delete();
		$token_model=new \App\Token ();
		$token_model->user_id=$user->id;
		$token_model->token=$token;
		$token_model->save();

		return response()->json(['id'=>$user->id,'user_name'=>$user->name,'email'=>$user->email,'token'=>$token]);
	}
    //
}
