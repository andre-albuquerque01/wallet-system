<?php

namespace Tests\Feature;

use App\Models\Transaction;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class TransactionTest extends TestCase
{

    public function test_index_transaction(): void
    {
        $user = User::factory()->create([
            'term_aceite' => 1,
            'password' => '@JesusTemPODER777',
            'email_verified_at' => now()
        ]);

        $loginResponse = $this->postJson('/api/v1/sessions', [
            'email' => $user->email,
            'password' => '@JesusTemPODER777',
        ]);
        $loginResponse->assertStatus(200);
        $token = $loginResponse->json('token');

        $response = $this->getJson('/api/v1/transactions', ['Authorization' => 'Bearer ' . $token]);

        $response->assertStatus(200);
    }

    public function test_returns_empty_list_when_no_transactions_found()
    {
        $user = User::factory()->create([
            'term_aceite' => 1,
            'password' => '@JesusTemPODER777',
            'email_verified_at' => now()
        ]);

        $loginResponse = $this->postJson('/api/v1/sessions', [
            'email' => $user->email,
            'password' => '@JesusTemPODER777',
        ]);
        $loginResponse->assertStatus(200);
        $token = $loginResponse->json('token');

        $response = $this->getJson('/api/v1/transactions', ['Authorization' => 'Bearer ' . $token]);

        $response->assertStatus(200);
        $response->assertJson([
            'message' => 'Nenhuma transação encontrada',
            'transactions' => []
        ]);
    }

    public function test_register_transaction_credit()
    {
        $user = User::factory()->create([
            'term_aceite' => 1,
            'password' => '@JesusTemPODER777',
            'email_verified_at' => now(),
            'balance' => 0
        ]);

        $loginResponse = $this->postJson('/api/v1/sessions', [
            'email' => $user->email,
            'password' => '@JesusTemPODER777',
        ]);
        $loginResponse->assertStatus(200);
        $token = $loginResponse->json('token');

        $response = $this->postJson('/api/v1/transactions', [
            'value' => 100,
            'type' => 'credit',
        ], ['Authorization' => 'Bearer ' . $token]);

        $response->assertStatus(200);
        $this->assertEquals(100, $user->fresh()->balance);
    }

    public function test_register_transaction_debit()
    {
        $user = User::factory()->create([
            'term_aceite' => 1,
            'password' => '@JesusTemPODER777',
            'email_verified_at' => now(),
            'balance' => 100
        ]);

        $loginResponse = $this->postJson('/api/v1/sessions', [
            'email' => $user->email,
            'password' => '@JesusTemPODER777',
        ]);
        $loginResponse->assertStatus(200);
        $token = $loginResponse->json('token');

        $response = $this->postJson('/api/v1/transactions', [
            'value' => 100,
            'type' => 'debit',
        ], ['Authorization' => 'Bearer ' . $token]);

        $response->assertStatus(200);
        $this->assertEquals(0, $user->fresh()->balance);
    }

    public function test_error_register_transaction_debit()
    {
        $user = User::factory()->create([
            'term_aceite' => 1,
            'password' => '@JesusTemPODER777',
            'email_verified_at' => now(),
            'balance' => 100
        ]);

        $loginResponse = $this->postJson('/api/v1/sessions', [
            'email' => $user->email,
            'password' => '@JesusTemPODER777',
        ]);
        $loginResponse->assertStatus(200);
        $token = $loginResponse->json('token');

        $response = $this->postJson('/api/v1/transactions', [
            'value' => 110,
            'type' => 'debit',
        ], ['Authorization' => 'Bearer ' . $token]);

        $response->assertStatus(400);
        $response->assertJson(['message' => 'Saldo insuficiente']);
    }

    public function test_register_transaction_transfer()
    {
        $user = User::factory()->create([
            'term_aceite' => 1,
            'password' => '@JesusTemPODER777',
            'email_verified_at' => now(),
            'balance' => 110
        ]);

        $user2 = User::factory()->create([
            'balance' => 0,
            'term_aceite' => 1,
        ]);

        $loginResponse = $this->postJson('/api/v1/sessions', [
            'email' => $user->email,
            'password' => '@JesusTemPODER777',
        ]);
        $loginResponse->assertStatus(200);
        $token = $loginResponse->json('token');

        $response = $this->postJson('/api/v1/transactions', [
            'value' => 110,
            'type' => 'transfer',
            'receiver_id' => $user2->id
        ], ['Authorization' => 'Bearer ' . $token]);

        $response->assertStatus(200);
        $this->assertEquals(0, $user->fresh()->balance);
        $this->assertEquals(110, $user2->fresh()->balance);
    }

    public function test_error_register_transaction_transfer()
    {
        $user = User::factory()->create([
            'term_aceite' => 1,
            'password' => '@JesusTemPODER777',
            'email_verified_at' => now(),
            'balance' => 100
        ]);

        $user2 = User::factory()->create([
            'term_aceite' => 1,
        ]);

        $loginResponse = $this->postJson('/api/v1/sessions', [
            'email' => $user->email,
            'password' => '@JesusTemPODER777',
        ]);
        $loginResponse->assertStatus(200);
        $token = $loginResponse->json('token');

        $response = $this->postJson('/api/v1/transactions', [
            'value' => 110,
            'type' => 'transfer',
            'receiver_id' => $user2->id
        ], ['Authorization' => 'Bearer ' . $token]);

        $response->assertStatus(400);
        $response->assertJson(['message' => 'Saldo insuficiente para transferência']);
    }

    public function test_balance_transaction()
    {
        $user = User::factory()->create([
            'term_aceite' => 1,
            'password' => '@JesusTemPODER777',
            'email_verified_at' => now(),
            'balance' => 100
        ]);

        $user2 = User::factory()->create([
            'term_aceite' => 1,
            'password' => '@JesusTemPODER777',
            'email_verified_at' => now(),
            'balance' => 100
        ]);

        Transaction::factory()->create([
            'value' => 100,
            'type' => 'credit',
            'sender_id' => null,
            'receiver_id' =>  $user->id,
        ]);

        Transaction::factory()->create([
            'value' => 100,
            'type' => 'debit',
            'sender_id' => $user->id,
            'receiver_id' => null
        ]);

        Transaction::factory()->create([
            'value' => 100,
            'type' => 'transfer',
            'sender_id' => $user->id,
            'receiver_id' => $user2->id
        ]);

        Transaction::factory()->create([
            'value' => 100,
            'type' => 'transfer',
            'sender_id' => $user2->id,
            'receiver_id' => $user->id
        ]);

        $loginResponse = $this->postJson('/api/v1/sessions', [
            'email' => $user->email,
            'password' => '@JesusTemPODER777',
        ]);
        $loginResponse->assertStatus(200);
        $token = $loginResponse->json('token');

        $response = $this->getJson('/api/v1/transactions/balance', [
            'Authorization' => 'Bearer ' . $token
        ]);
        $response->assertStatus(200);
        $response->assertJson(['balance' => 0]);
        
    }

    public function test_show_transaction()
    {
        $user = User::factory()->create([
            'term_aceite' => 1,
            'password' => '@JesusTemPODER777',
            'email_verified_at' => now(),
            'balance' => 100
        ]);

        $transaction = Transaction::factory()->create([
            'value' => 100,
            'type' => 'credit',
            'sender_id' => $user->id,
            'receiver_id' => null
        ]);

        $loginResponse = $this->postJson('/api/v1/sessions', [
            'email' => $user->email,
            'password' => '@JesusTemPODER777',
        ]);
        $loginResponse->assertStatus(200);
        $token = $loginResponse->json('token');

        $response = $this->getJson('/api/v1/transactions/' . $user->id, [
            'Authorization' => 'Bearer ' . $token
        ]);
        $response->assertStatus(200);
        $response->assertJsonStructure([
            "data" => [
                '*' => [
                    'id',
                    'value',
                    'type',
                    'sender_id',
                    'receiver_id',
                    'created_at',
                    'updated_at',
                    'deleted_at',
                ]
            ]
        ]);

        $response->assertJsonFragment([
            'id' => $transaction->id,
            "value" => "100.00",
            "type" => "credit",
            'sender_id' => $user->id,
            "receiver_id" => null,
            "created_at" => $user->created_at,
            "updated_at" => $user->updated_at,
            "deleted_at" => null
        ]);
    }

    public function test_returns_empty_list_when_no_transactions_found_show()
    {
        $user = User::factory()->create([
            'term_aceite' => 1,
            'password' => '@JesusTemPODER777',
            'email_verified_at' => now()
        ]);

        $loginResponse = $this->postJson('/api/v1/sessions', [
            'email' => $user->email,
            'password' => '@JesusTemPODER777',
        ]);
        $loginResponse->assertStatus(200);
        $token = $loginResponse->json('token');

        $response = $this->getJson('/api/v1/transactions/1111', ['Authorization' => 'Bearer ' . $token]);

        $response->assertStatus(200);
        $response->assertJson([
            'message' => 'Nenhuma transação encontrada',
            'transactions' => []
        ]);
    }
}
