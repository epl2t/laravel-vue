<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use DB;

class Category extends Model
{
	public static function getWithLanguage ($parameters)
	{
		return(DB::table('categories')->join('category_languages','categories.id','=','category_languages.category_id')->select('categories.id as category_id','categories.parent_id','category_languages.name','category_languages.id as tid')->where($parameters)->get());
	}
}
