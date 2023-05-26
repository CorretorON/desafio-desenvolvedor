<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Immobile;
use App\Models\VisitRequest;
use App\Models\User;
use App\Mail\VisitRequestMail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Auth;

class ImmobileController extends Controller
{
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'owner' => 'required',
            'type' => 'required',
            'address' => 'required',
            'bedrooms' => 'required|integer',
            'bathrooms' => 'required|integer',
            'total_area' => 'required|numeric',
            'price' => 'required|numeric',
        ]);

        // Associar o imóvel ao usuário autenticado
        $user = Auth::user();
        $immobile = $user->immobile()->create($validatedData);

        return response()->json($immobile, 201);
    }


    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'owner' => 'required',
            'type' => 'required',
            'address' => 'required',
            'bedrooms' => 'required|integer',
            'bathrooms' => 'required|integer',
            'total_area' => 'required|numeric',
            'price' => 'required|numeric',
        ]);

        $immobile = Immobile::findOrFail($id);
        $immobile->update($validatedData);

        return response()->json($immobile, 200);
    }

    public function destroy($id)
    {
        $immobile = Immobile::find($id);

        if (!$immobile) {
            return response()->json(['message' => 'Imóvel não encontrado'], 404);
        }

        $immobile->delete();

        return response()->json(['message' => 'Imóvel deletado com sucesso'], 200);
    }


    public function show($id)
    {
        $immobile = Immobile::findOrFail($id);

        $user = Auth::user();
        if ($immobile->user_id !== $user->id) {
            return response()->json(['message' => 'Acesso não autorizado'], 403);
        }

        return response()->json($immobile, 200);
    }

    public function markVisit(Request $request, $id)
    {
        $validatedData = $request->validate([
            'name' => 'required',
            'phone' => 'required',
            'email' => 'required|email',
            'visit_date' => 'required|date',
        ]);

        $immobile = Immobile::findOrFail($id);
        $user_id = 1; // Defina o ID do usuário fixo aqui

        $visitRequest = new VisitRequest($validatedData);
        $visitRequest->immobile()->associate($immobile);
        $visitRequest->user_id = $user_id; // Defina o ID do usuário fixo aqui
        $visitRequest->save();

        return response()->json($visitRequest, 201);
    }
    

    public function getAllVisitRequests()
    {
        $visitRequests = VisitRequest::with('immobile')
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
    public function index()
    {
        $user = Auth::user();
        $imoveis = $user->immobile;
        return response()->json(['imoveis' => $imoveis], 200);
    }
}