<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Post;
use App\Models\User;
use Faker\Generator as Faker;

$factory->define(Post::class, function (Faker $faker) {
    return [
        'title' => $faker->realText(rand(40, 80)),
        'body' => $faker->realText(rand(200, 6000)),
        'user_id' => function() {
            return User::inRandomOrder()->first()->id;
        }
    ];
});
