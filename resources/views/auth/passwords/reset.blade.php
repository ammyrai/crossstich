@extends('layouts.app')
@section('content')
<div class="container">
  <div class="row">
    <div class="col-md-12">
      <div class="workContainer">
        <h2>{{ __('Reset Password') }}</h2>
        <div class="row">
          <div class="col-md-12">
              <form method="POST" action="{{ route('password.request') }}">
                  @csrf
                  <input type="hidden" name="token" value="{{ $token }}">

                  <div class="form-group">
                      <label>{{ __('E-Mail Address') }}</label>
                      <input id="email" type="email" class="form-control{{ $errors->has('email') ? ' is-invalid' : '' }}" name="email" value="{{ $email ?? old('email') }}" required autofocus>
                      @if ($errors->has('email'))
                          <span class="invalid-feedback">
                              <strong>{{ $errors->first('email') }}</strong>
                          </span>
                      @endif
                  </div>

                  <div class="form-group">
                      <label for="password">{{ __('Password') }}</label>
                      <input id="password" type="password" class="form-control{{ $errors->has('password') ? ' is-invalid' : '' }}" name="password" required>
                      @if ($errors->has('password'))
                          <span class="invalid-feedback">
                              <strong>{{ $errors->first('password') }}</strong>
                          </span>
                      @endif
                  </div>

                  <div class="form-group">
                      <label for="password-confirm">{{ __('Confirm Password') }}</label>
                      <input id="password-confirm" type="password" class="form-control" name="password_confirmation" required>
                  </div>

                  <div class="form-group">
                      <button type="submit" class="btn btn-success pull-right">
                              {{ __('Reset Password') }}
                      </button>
                  </div>
              </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
@endsection
