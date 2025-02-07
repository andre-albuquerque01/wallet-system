<?php

namespace  App\Services;

use App\Exceptions\GeneralExceptionCatch;
use App\Http\Resources\TransactionResource;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class TransactionService
{
    public function index()
    {
        try {
            $id = Auth::user()->id;
            $transactions = Transaction::where('sender_id', $id)
                ->orWhere('receiver_id', $id)
                ->orderBy('created_at', 'desc')
                ->get();

            if ($transactions->isEmpty()) {
                return response()->json(['message' => 'Nenhuma transação encontrada', 'transactions' => []], 200);
            }

            return TransactionResource::collection($transactions);
        } catch (\Exception $e) {
            throw new GeneralExceptionCatch($e->getMessage());
        }
    }

    public function balance()
    {
        try {
            $id = Auth::user()->id;
            $credits = Transaction::where('receiver_id', $id)
                ->where('type', 'credit')
                ->sum('value');
            $debits = Transaction::where('sender_id', $id)
                ->where('type', 'debit')
                ->sum('value');
            $transfersSent = Transaction::where('sender_id', $id)
                ->where('type', 'transfer')
                ->sum('value');
            $transfersReceived = Transaction::where('receiver_id', $id)
                ->where('type', 'transfer')
                ->sum('value');

            $balance = ($credits + $transfersReceived) - ($debits + $transfersSent);
            return response()->json(['balance' => $balance], 200);
        } catch (\Exception $e) {
            throw new GeneralExceptionCatch($e->getMessage());
        }
    }

    public function show(string $id)
    {
        try {
            $transactions = Transaction::where('sender_id', $id)
                ->orWhere('receiver_id', $id)
                ->orderBy('created_at', 'desc')
                ->get();

            if ($transactions->isEmpty()) {
                return response()->json(['message' => 'Nenhuma transação encontrada', 'transactions' => []], 200);
            }

            return TransactionResource::collection($transactions);
        } catch (\Exception $e) {
            throw new GeneralExceptionCatch($e->getMessage());
        }
    }
    public function store(array $data)
    {
        try {
            $user = Auth::user();
            if ($data["type"] == 'credit') {
                User::where('id', $user->id)->increment('balance', $data["value"]);
                $data["receiver_id"] = $user->id;
            } elseif ($data["type"] == 'debit') {
                if ($data["value"] > $user->balance) {
                    return response()->json(['message' => 'Saldo insuficiente'], 400);
                }
                User::where('id', $user->id)->decrement('balance', $data["value"]);
            } elseif ($data["type"] == 'transfer') {
                if ($data["value"] > $user->balance) {
                    return response()->json(['message' => 'Saldo insuficiente para transferência'], 400);
                }

                $receiver = User::find($data["receiver_id"]);
                if (!$receiver) {
                    return response()->json(['message' => 'Destinatário não encontrado'], 404);
                }

                User::where('id', $user->id)->decrement('balance', $data["value"]);
                User::where('id', $data["receiver_id"])->increment('balance', $data["value"]);
            }
            $data["sender_id"] = $user->id;
            Transaction::create($data);
            return response()->json(['message' => 'success'], 200);
        } catch (\Exception $e) {
            throw new GeneralExceptionCatch($e->getMessage());
        }
    }

    public function destroy(string $id)
    {
        try {
            $user = Auth::user();

            $transaction = Transaction::find($id);

            if (!$transaction) {
                return response()->json(['message' => 'Transação não encontrada'], 404);
            }

            if ($transaction->sender_id !== $user->id) {
                return response()->json(['message' => 'Você não tem permissão para cancelar esta transação'], 403);
            }

            if (now()->diffInHours($transaction->created_at) > 24) {
                return response()->json(['message' => 'O tempo para cancelar esta transação expirou'], 400);
            }

            if ($transaction->type === 'debit') {
                User::where('id', $user->id)->increment('balance', $transaction->value);
            } elseif ($transaction->type === 'transfer') {
                $receiver = User::find($transaction->receiver_id);
                if ($receiver) {
                    $receiver->decrement('balance', $transaction->value);
                    User::where('id', $user->id)->increment('balance', $transaction->value);
                }
            }

            $transaction->touch('deleted_at');

            return response()->json(['message' => 'Transação cancelada com sucesso'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erro interno', 'error' => $e->getMessage()], 500);
        }
    }
}
