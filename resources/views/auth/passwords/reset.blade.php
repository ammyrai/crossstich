@extends('layouts.app')
@section('content')
<div class="container">
  <div class="row">
    <div class="col-md-12">
      <div class="workContainer">
        <h2>{{ __('Reset Password') }}</h2>
        <div class="row">
          <div class="col-md-6 col-md-offset-3">
              <form method="POST" action="{{ route('password.request') }}" id="reset_password">
                  @csrf
                  <input type="hidden" name="token" value="{{ $token }}">

                  <div class="form-group">
                      <label>{{ __('E-Mail Address') }}</label>
                      <input id="email" type="email" class="form-control{{ $errors->has('email') ? ' is-invalid' : '' }}" name="email" value="{{ $email ?? old('email') }}" onfocus="$('.error_msg_email').html('');" readonly>
                      <div class="error_msg_email">
                          @if ($errors->has('email'))
                              <span class="invalid-feedback">
                                  <strong>{{ $errors->first('email') }}</strong>
                              </span>
                          @endif
                      </div>
                  </div>

                  <div class="form-group">
                      <label for="password">{{ __('Password') }}</label>
                      <input id="password" type="password" class="form-control{{ $errors->has('password') ? ' is-invalid' : '' }}" name="password" onfocus="$('.error_msg_password').html('');">
                      <div class="error_msg_password">
                        @if ($errors->has('password'))
                            <span class="invalid-feedback">
                                <strong>{{ $errors->first('password') }}</strong>
                            </span>
                        @endif
                      </div>
                  </div>

                  <div class="form-group">
                      <label for="password-confirm">{{ __('Confirm Password') }}</label>
                      <input id="password-confirm" type="password" class="form-control" name="password_confirmation" onfocus="$('.error_msg_confirm').html('');">
                      <div class="error_msg_confirm">
                      </div>
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
