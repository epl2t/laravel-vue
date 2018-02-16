<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CollectionController extends Controller
{
	public function getCollections(Request $request)
	{
		$result=[];
		$page=$request->page;
		$per_page=$request->count;
		$result['count']=\App\Collection::count();
		$items=\App\Collection::limit($per_page)->skip($per_page*($page-1))->get();
		$result['items']=$items->toArray();
		return response()->json($result);
	}

	public function deleteCollection($id)
	{
		\App\Collection::where('id',$id)->delete();
		$result=[];
		return response()->json($result);
	}

	public function addCollection(Request $request)
	{
		$category=new \App\Collection;
		$category->name=$request->name;
		$category->save();
		$result=[];
		return response()->json($result);
	}

	public function updateCollection(Request $request,$id)
	{
		$name=$request->name;
		\App\Collection::where('id',$id)->update(['name'=>$name]);
		$result=[];
		return response()->json($result);
	}

}
