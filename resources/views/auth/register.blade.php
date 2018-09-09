@extends('layouts.app')
@section('content')
<div class="container">
  <div class="row">
    <div class="col-md-12">
      <div class="workContainer">
          <h2>{{ __('Register') }}</h2>
          <div class="row">
            <div class="col-md-8 col-md-offset-2">
              <form method="POST" action="{{ route('register') }}" id="register">
                  @csrf
                  <div class="form-group">
                      <label for="name">{{ __('Name') }}<span class="required_field">*</span></label>
                      <div class="formContent">
                          <input id="name" type="text" class="form-control{{ $errors->has('name') ? ' is-invalid' : '' }}" name="name" value="{{ old('name') }}" autofocus>
                          @if ($errors->has('name'))
                              <span class="invalid-feedback">
                                  <strong>{{ $errors->first('name') }}</strong>
                              </span>
                          @endif
                      </div>
                  </div>
                  <div class="form-group">
                      <label for="email">{{ __('E-Mail Address') }}<span class="required_field">*</span></label>
                      <div class="formContent">
                            <input id="email" type="email" class="form-control{{ $errors->has('email') ? ' is-invalid' : '' }}" name="email" value="{{ old('email') }}">

                            @if ($errors->has('email'))
                                <span class="invalid-feedback">
                                    <strong>{{ $errors->first('email') }}</strong>
                                </span>
                            @endif
                      </div>
                  </div>
                  <div class="form-group">
                      <label for="password">{{ __('Password') }}<span class="required_field">*</span></label>
                      <div class="formContent">
                          <input id="password" type="password" class="form-control{{ $errors->has('password') ? ' is-invalid' : '' }}" name="password">
                          @if ($errors->has('password'))
                              <span class="invalid-feedback">
                                  <strong>{{ $errors->first('password') }}</strong>
                              </span>
                          @endif
                      </div>
                  </div>
                  <div class="form-group">
                      <label for="password-confirm">{{ __('Confirm Password') }}<span class="required_field">*</span></label>
                      <div class="formContent">
                          <input id="password_confirm" type="password" class="form-control" name="password_confirmation">
                      </div>
                  </div>
                  <div class="form-group">
                      <label for="phone">{{ __('Phone') }}<span class="required_field">*</span></label>
                      <div class="formContent">
                            <input id="phone" type="text" class="form-control {{ $errors->has('phone') ? ' is-invalid' : '' }}" name="phone" value="{{ old('phone') }}" maxlength="12">

                            @if ($errors->has('phone'))
                                <span class="invalid-feedback">
                                    <strong>{{ $errors->first('phone') }}</strong>
                                </span>
                            @endif
                      </div>
                  </div>
                  <div class="form-group">
                      <label for="company">{{ __('Company Name') }}<span class="required_field">*</span></label>
                      <div class="formContent">
                            <input id="company_name" type="text" class="form-control {{ $errors->has('company_name') ? ' is-invalid' : '' }}" name="company_name" value="{{ old('company_name') }}">
                      </div>
                  </div>
                  <div class="form-group">
                      <button type="submit" class="btn btn-success pull-right">
                          {{ __('Register') }}
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
