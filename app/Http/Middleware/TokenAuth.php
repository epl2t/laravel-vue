<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class TokenAuth
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string|null  $guard
     * @return mixed
     */
    public function handle($request, Closure $next, $guard = null)
    {
    	$token=$request->header('X-ACCESS-TOKEN','');
    	$user=\App\Token::where('token',$token)->first();
    	if (!$user)
	    {
	    	abort (401,'Auth required');
	    }
        return $next($request);
    }

}
