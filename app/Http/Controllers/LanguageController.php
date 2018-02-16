<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LanguageController extends Controller
{
	public function getLanguages(Request $request)
	{
		$result=[];
		$page=$request->page;
		$result['count']=\App\Language::count();
		$items=\App\Language::where('id','>','0');
		if ($request->has('count'))
		{
			$per_page=$request->count;
			$items=$items->limit($per_page);
			if ($request->has('page'))
			{
				$items=$items->skip($per_page*($page-1));
			}
		}
		$items=$items->get();
		$result['items']=$items->toArray();
		return response()->json($result);
	}

	public function addLanguage(Request $request)
	{
		$language=new \App\Language;
		$language->name=$request->name;
		$language->token=$request->token;
		$language->save();
		$result=[];
		return response()->json($result);
	}

	public function updateLanguage(Request $request,$id)
	{
		$name=$request->name;
		$token=$request->token;
		\App\Language::where('id',$id)->update(['name'=>$name,'token'=>$token]);
		$result=[];
		return response()->json($result);
	}

	public function deleteLanguage($id)
	{
		\App\Language::where('id',$id)->delete();
		$result=[];
		return response()->json($result);
	}

}
