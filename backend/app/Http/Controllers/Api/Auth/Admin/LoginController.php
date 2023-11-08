<?php

namespace App\Http\Controllers\Api\Auth\Admin;

use response;
use App\Models\Admin;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\Admin\LoginRequest;
use Illuminate\Validation\ValidationException;

class LoginController extends Controller
{
    public function __invoke(LoginRequest $request){
        $admin = Admin::where('email',$request->email)->first();

        if(!$admin || !Hash::check($request->password, $admin->password)){
            throw ValidationException::withMessages([
                'email' => ['The Credentials you entered are incorrect']
            ]);
        }

        return response()->json([
            'user' => $admin,
            'token' => $admin->createToken('laravel_api_token')->plainTextToken
        ]);
    }

    
}
