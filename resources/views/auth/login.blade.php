@extends('layouts.app')
@section('content')
<div class="container">
  <div class="row">
    <div class="col-md-12">
      <div class="workContainer" style="">
          <h2 style="margin-bottom: 50px;">{{ __('Login') }}</h2>
          <div class="row">
            <div class="col-md-6 col-md-offset-3">
              <form method="POST" action="{{ route('login') }}" id="login_form">
                  @csrf
                  <div class="form-group">
                      <label for="email">{{ __('E-Mail Address') }}</label>
                      <div class="formContent">
                        <input id="email" type="email" class="form-control{{ $errors->has('email') ? ' is-invalid' : '' }}" name="email" value="{{ old('email') }}" autofocus>
                        @if ($errors->has('email'))
                            <span class="invalid-feedback">
                                <strong>{{ $errors->first('email') }}</strong>
                            </span>
                        @endif
                      </div>
                  </div>
                  <div class="form-group">
                      <label for="password">{{ __('Password') }}</label>
                      <div class="formContent">
                        <input id="password" type="password" class="form-control{{ $errors->has('password') ? ' is-invalid' : '' }}" name="password">
                        @if ($errors->has('password'))
                            <span class="invalid-feedback">
                                <strong>{{ $errors->first('password') }}</strong>
                            </span>
                        @endif
                      </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                          <div class="formContent checkbox" style="padding-left: 20px;">
                            <input type="checkbox" name="remember" {{ old('remember') ? 'checked' : '' }}> {{ __('Remember Me') }}
                          </div>
                          <div class="clearfix"></div>
                      </div>
                    </div>
                      <div class="col-md-6">
                        <button type="submit" class="btn btn-success pull-right" style="margin: 0;">
                            {{ __('Login') }}
                        </button>
                      </div>
                  </div>

                  <div class="form-group" style="margin-top: 50px;">

                      <div class="clearfix"></div>
                      <div class="text-center">
                        <a href="{{ route('register') }}">
                            {{ __('Register') }}
                        </a>
                        <div class="clearfix"></div>
                        <a class="btn btn-link" href="{{ route('password.request') }}">
                            {{ __('Forgot Your Password?') }}
                        </a>
                      </div>
                  </div>
              </form>
            </div>
          </div>
      </div>
    </div>
  </div>
</div>
@endsection
