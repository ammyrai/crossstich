@extends('layouts.app')
@section('content')
<div class="container">
  <div class="row">
    <div class="col-md-12">
      <div class="workContainer">
        <h2>{{ __('Reset Password') }}</h2>
        <div class="row">
          <div class="col-md-12">
            @if (session('status'))
                <div class="alert alert-success">
                    {{ session('status') }}
                </div>
            @endif
          </div>
          <div class="col-md-6 col-md-offset-3" >
            <form method="POST" action="{{ route('password.email') }}" id="forgot_password">
                @csrf
                <div class="form-group">
                  <label>{{ __('E-Mail Address') }}<span class="required_field">*</span></label>
                  <div class="formContent">
                    <input id="email" type="email" class="form-control{{ $errors->has('email') ? ' is-invalid' : '' }}" name="email" value="{{ old('email') }}" onclick="$('.error_msg_email').html('');">
                    <div class="error_msg_email">
                        @if ($errors->has('email'))
                            <span class="invalid-feedback">
                                <strong>{{ $errors->first('email') }}</strong>
                            </span>
                        @endif
                    </div>
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
