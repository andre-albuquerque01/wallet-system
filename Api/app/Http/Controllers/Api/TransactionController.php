<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\TransactionRequest;
use App\Services\TransactionService;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    private $transactionService;
    public function __construct(TransactionService $transactionService)
    {
        $this->transactionService = $transactionService;
    }

    public function index()
    {
        return $this->transactionService->index();
    }

    public function balance()
    {
        return $this->transactionService->balance();
    }

    public function show(string $id)
    {
        return $this->transactionService->show($id);
    }

    public function store(TransactionRequest $request)
    {
        return $this->transactionService->store($request->validated());
    }

    public function destroy(string $id)
    {
        return $this->transactionService->destroy($id);
    }
}
