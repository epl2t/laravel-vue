<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{
	public function getUser($user_id=false)
	{
		$user=\App\User::first();
		return response()->json($user->toArray());
	}

}
