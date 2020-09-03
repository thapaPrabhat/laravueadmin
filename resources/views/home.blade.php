@extends('layouts.app')

@section('content')
<div class="container">
    <p>
        <router-link :to="{ name: 'home' }">Dashboard</router-link> |
        <router-link :to="{ name: 'users.index' }">User</router-link>
    </p>
    <b-card><router-view></router-view></b-card>
    <div class="row justify-content-center">
    </div>
</div>
@endsection