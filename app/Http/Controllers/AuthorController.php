<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AuthorController extends Controller
{
	public function getAuthors(Request $request)
	{
		$result=[];
		$page=$request->page;
		$per_page=$request->count;
		$result['count']=\App\Author::count();
		$items=\App\Author::limit($per_page)->skip($per_page*($page-1))->get();
		$result['items']=$items->toArray();
		return response()->json($result);
	}

	public function addAuthor(Request $request)
	{
		$author=new \App\Author;
		$author->name=$request->name;
		$author->display_name=$request->display_name;
		$author->email='';//$request->email;
		$author->save();
		$result=[];
		return response()->json($result);
	}

	public function updateAuthor(Request $request,$id)
	{
		$name=$request->name;
		$display_name=$request->display_name;
		$email=$request->email;
		\App\Author::where('id',$id)->update(['name'=>$name,'display_name'=>$display_name,'email'=>$email]);
		$result=[];
		return response()->json($result);
	}

	public function deleteAuthor($id)
	{
		\App\Author::where('id',$id)->delete();
		$result=[];
		return response()->json($result);
	}

}
