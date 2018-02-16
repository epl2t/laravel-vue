<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CategoryController extends Controller
{
	public function getCategories(Request $request)
	{
		$input = $request->all();

		$category=\App\Category::where ('id','>','0');

		foreach ($input as $parameter=>$value)
		{
			$category=$category->where ($parameter,$value);
		}
		$result=$category->get();
		return response()->json($result->toArray());
	}

	public function deleteCategory($id)
	{
		\App\Category::where('id',$id)->delete();
		$result=[];
		return response()->json($result);
	}

	public function addCategory(Request $request)
	{
		$category=new \App\Category;
		$category->name=$request->name;
		$category->parent_id=$request->parent_id;
		$category->save();
		$result=[];
		return response()->json($result);
	}

	public function updateCategory(Request $request,$id)
	{
		$name=$request->name;
		$parent_id=$request->parent_id;
		\App\Category::where('id',$id)->update(['name'=>$name,'parent_id'=>$parent_id]);
		$result=[];
		return response()->json($result);
	}

}
