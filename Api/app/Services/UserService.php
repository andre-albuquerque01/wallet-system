<?php

namespace App\Services;

use App\Exceptions\GeneralExceptionCatch;
use App\Exceptions\UserException;
use App\Http\Resources\GeneralResource;
use App\Http\Resources\UserResource;
use App\Jobs\SendRecoverPasswordEmailJob;
use App\Jobs\SendVerifyEmailJob;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserService
{
    public function auth(array $data)
    {
        try {
            $user = User::where('email', $data['email'])->first();
            if ($user->email_verified_at == null) {
                throw new UserException('Email not verified', 401);
            }
            if (!$token = Auth::attempt($data)) {

                return response()->json(['messages' => 'email or password wrong'], 401);
            }

            return response()->json(['token' => $token], 200);
        } catch (\Exception $e) {
            throw new GeneralExceptionCatch('Authentication failed', 400);
        }
    }

    public function store(array $data)
    {
        try {
            $data['password'] = Hash::make($data['password']);
            $data['remember_token'] = Str::random(60);
            $user = User::create($data);
            SendVerifyEmailJob::dispatch($user->email, $data['remember_token'], $user->id);
            return response()->json(['messages' => 'success'], 200);
        } catch (\Exception $e) {
            throw new GeneralExceptionCatch('Register failed', 400);
        }
    }

    public function show()
    {
        try {
            $user = User::findOrFail(Auth::user()->id);
            return new UserResource($user);
        } catch (\Exception $e) {
            throw new GeneralExceptionCatch('Show failed', 400);
        }
    }

    public function update(array $data)
    {
        try {
            $user = User::where('id', Auth::user()->id)->first();
            if (!$user) {
                return response()->json(['messages' => 'User not found'], 404);
            }
            if (!Hash::check($data['password'], $user->password)) {
                return response()->json(['messages' => 'Password incorrect'], 401);
            }
            $user->update($data);
            return response()->json(['messages' => 'success'], 200);
        } catch (\Exception $e) {
            throw new GeneralExceptionCatch('Update failed', 400);
        }
    }

    public function destroy()
    {
        try {
            $user = User::findOrFail(Auth::user()->id);
            $user->touch('deleted_at');
            return response()->json(['messages' => 'success'], 200);
        } catch (\Exception $e) {
            throw new GeneralExceptionCatch('Delete failed', 400);
        }
    }

    public function verifyEmail(string $id, string $token)
    {
        try {
            $user = User::findOrFail($id);
            if ($token == $user->remember_token) {
                $user->touch("email_verified_at");
                return new GeneralResource(['message' => 'success']);
            }
            throw new UserException("Token invalid");
        } catch (UserException $e) {
            throw new UserException();
        }
    }

    public function reSendEmail(string $email)
    {
        try {
            $user = User::where('email', $email)->first();
            if (!$user) throw new UserException('user not found');
            SendVerifyEmailJob::dispatch($user->email, $user->remember_token, $user->id);
            return new GeneralResource(['message' => 'send e-mail']);
        } catch (\Exception $e) {
            throw new GeneralExceptionCatch($e->getMessage());
        }
    }

    public function sendTokenRecover(string $email)
    {
        try {
            $user = User::where('email', $email)->first();
            if (!$user) throw new UserException('user not found');

            $token = strtoupper(Str::random(60));
            $table = DB::table('password_reset_tokens')->where('email', $email)->first();
            if (!$table) {
                DB::table('password_reset_tokens')->insert([
                    'email' => $email,
                    'token' => $token,
                    'created_at' => now(),
                ]);
            } else {
                DB::table('password_reset_tokens')->update([
                    'token' => $token,
                    'created_at' => now(),
                ]);
            }
            SendRecoverPasswordEmailJob::dispatch($user->email, $token);
            return new GeneralResource(['message' => 'send e-mail']);
        } catch (\Exception $e) {
            throw new GeneralExceptionCatch($e->getMessage());
        }
    }
    public function resetPassword(array $data)
    {
        try {
            $passwordResetTokens = DB::table('password_reset_tokens')->where('token', $data['token'])->first();
            if (!isset($passwordResetTokens)) throw new UserException("Token invalid");

            User::where('email', $passwordResetTokens->email)->update([
                'password' => Hash::make($data['password']),
            ]);
            DB::table('password_reset_tokens')->where('token', $data['token'])->delete();
            return new GeneralResource(['message' => 'success']);
        } catch (\Exception $e) {
            throw new UserException('', $e->getCode(), $e);
        }
    }
}
