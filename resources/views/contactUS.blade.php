@extends('layouts.app')
@section('content')
<div class="container">
  <div class="row">
    <div class="col-md-12">
      <div class="workContainer">
        <h2>Contact Us</h2>
        <div class="row">
          <div class="col-md-6 contactContent">
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
            <ul>
              <li>
                <label>
                  <i class="fa fa-envelope" aria-hidden="true"></i>
                  Mail :
                </label>
                <p>yourmail.com</p>
              </li>
              <li>
                <label>
                  <i class="fa fa-phone"></i>
                  Phone :
                </label>
                <p>+91 986676567</p>
              </li>
              <li>
                <label>
                  <i class="fa fa-map-marker"></i>
                  Address :
                </label>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
              </li>
            </ul>
          </div>
          <div class="col-md-6">
            @if(Session::has('success'))
               <div class="alert alert-success">
                 {{ Session::get('success') }}
               </div>
            @endif

            {!! Form::open(['route'=>'contactus.store']) !!}

            <div class="form-group {{ $errors->has('name') ? 'has-error' : '' }}">
            {!! Form::label('Name:') !!}
            {!! Form::text('name', old('name'), ['class'=>'form-control', 'placeholder'=>'Name']) !!}
            <span class="text-danger">{{ $errors->first('name') }}</span>
            </div>

            <div class="form-group {{ $errors->has('email') ? 'has-error' : '' }}">
            {!! Form::label('Your Email:') !!}
            {!! Form::text('email', old('email'), ['class'=>'form-control', 'placeholder'=>'Your Email']) !!}
            <span class="text-danger">{{ $errors->first('email') }}</span>
            </div>

            <div class="form-group {{ $errors->has('message') ? 'has-error' : '' }}">
            {!! Form::label('Message:') !!}
            {!! Form::text('message', old('message'), ['class'=>'form-control', 'placeholder'=>'Message']) !!}
            <span class="text-danger">{{ $errors->first('message') }}</span>
            </div>

            <div class="form-group">
            <button class="btn btn-success contact_btn pull-right">Submit</button>
            </div>

            {!! Form::close() !!}

          </div>
        </div>
      </div>
    </div>
  </div>
</div>
@endsection