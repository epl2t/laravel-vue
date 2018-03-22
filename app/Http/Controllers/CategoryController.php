<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Helpers\Language;

class CategoryController extends Controller
{
	public function getCategories(Request $request)
	{
		$input=$request->all();
		$input['language_id']=isset($input['language_id'])?$input['language_id']:Language::getDefaultID();
		$parameters=[];
		foreach ($input as $parameter=>$value)
		{
			$parameters[]=[$parameter,'=',$value];
		}
		$result=\App\Category::getWithLanguage($parameters);
		return response()->json($result->toArray());
	}

	public function deleteCategory($id)
	{
		\App\Category::where('id',$id)->delete();
		\App\CategoryLanguage::where('category_id',$id)->delete();
		$result=[];
		return response()->json($result);
	}

	public function addCategory(Request $request)
	{
		$category=new \App\Category;
		$category->parent_id=$request->parent_id;
		$category->save();
		foreach ($request->names as $language_id=>$name)
		{
			\App\CategoryLanguage::updateOrCreate(['category_id'=>$category->id,'language_id'=>$language_id],['language_id'=>$language_id,'category_id'=>$category->id,'name'=>$name['name']]);
		}
		$result=[];
		return response()->json($result);
	}

	public function updateCategory(Request $request,$id)
	{
		foreach ($request->names as $language_id=>$name)
		{
			\App\CategoryLanguage::updateOrCreate(['category_id'=>$id,'language_id'=>$language_id],['language_id'=>$language_id,'category_id'=>$id,'name'=>$name['name']]);
		}
		$result=[];
		return response()->json($result);
	}

}
