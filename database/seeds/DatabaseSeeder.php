<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
	    DB::table('users')->insert([
		    'id'=>1,
		    'name' => 'Super Admin',
		    'email' => 'admin@local.host',
		    'password' => sha1(sha1('password7508')),
	    ]);
    }
}
