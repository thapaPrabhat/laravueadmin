@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">{{ __('Dashboard') }}</div>

                <div class="card-body">
                    @if (session('status'))
                    <div class="alert alert-success" role="alert">
                        {{ session('status') }}
                    </div>
                    @endif

                    <div>
                        <b-jumbotron header="BootstrapVue" lead="Bootstrap v4 Components for Vue.js 2">
                            <p>For more information visit website</p>
                            <b-button variant="primary" href="#">More Info</b-button>
                        </b-jumbotron>
                    </div>

                </div>
            </div>
        </div>
    </div>
</div>
@endsection