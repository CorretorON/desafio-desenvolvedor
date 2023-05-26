<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Models\User;

class UserController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $user = User::create([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => bcrypt($request->input('password')),
        ]);

        return response()->json(['message' => 'User registered successfully'], 201);
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'Invalid credentials'], 401);
        }

        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $token = $user->createToken('authToken')->plainTextToken;

            return response()->json([
                'user' => $user,
                'access_token' => $token,
            ], 200);
        } else {
            return response()->json(['error' => 'Invalid credentials'], 401);
        }
    }

    public function getUsers(Request $request)
    {
        $users = User::all();

        return response()->json(['users' => $users]);
    }
    public function getAllVisitRequests()
    {
        $user = Auth::user();

        $visitRequests = VisitRequest::with('immobile')
            ->whereHas('immobile', function ($query) use ($user) {
                $query->where('user_id', $user->id);
            })
            ->get();

        $formattedVisitRequests = $visitRequests->map(function ($visitRequest) {
            return [
                'id' => $visitRequest->id,
                'name' => $visitRequest->name,
                'phone' => $visitRequest->phone,
                'email' => $visitRequest->email,
                'visit_date' => $visitRequest->visit_date,
                'immobile_type' => $visitRequest->immobile->type,
                'immobile_owner' => $visitRequest->immobile->owner,
            ];
        });

        return response()->json($formattedVisitRequests);
    }
}
