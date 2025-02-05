<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\AuthRequest;
use App\Http\Requests\RecoverPasswordRequest;
use App\Http\Requests\UserRequest;
use App\Services\UserService;
use Illuminate\Http\Request;

class UserController extends Controller
{
    private $userService;
    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function auth(AuthRequest $request)
    {
        return $this->userService->auth($request->validated());
    }

    public function store(UserRequest $request)
    {
        return $this->userService->store($request->validated());
    }

    public function show()
    {
        return $this->userService->show();
    }

    public function update(UserRequest $request)
    {
        return $this->userService->update($request->validated());
    }

    public function destroy()
    {
        return $this->userService->destroy();
    }

    public function verifyEmail(string $id, string $token)
    {
        return $this->userService->verifyEmail($id, $token);
    }

    public function reSendEmail(Request $request)
    {
        $request->validate([
            'email' => 'required|email'
        ], [
            "email.required" => "O e-mail é obrigatório.",
            "email.email" => "O e-mail informado não é válido.",
        ]);
        return $this->userService->reSendEmail($request->email);
    }

    public function sendTokenRecover(Request $request)
    {
        $request->validate([
            'email' => 'required|email'
        ], [
            "email.required" => "O e-mail é obrigatório.",
            "email.email" => "O e-mail informado não é válido.",
        ]);
        return $this->userService->sendTokenRecover($request->email);
    }

    public function resetPassword(RecoverPasswordRequest $request)
    {
        return $this->userService->resetPassword($request->validated());
    }
}
