<?php

namespace App\Helpers;

use App\Language as LanguageModel;

class Language {

	public static function getDefaultID()
	{
		$result = LanguageModel::where('is_default',1)->first();
		return($result->id);
	}
}