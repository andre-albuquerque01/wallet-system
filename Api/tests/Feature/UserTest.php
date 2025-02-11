<?php

namespace Tests\Feature;

use App\Jobs\SendVerifyEmailJob;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Queue;
use Tests\TestCase;

class UserTest extends TestCase
{

    use RefreshDatabase;

    public function test_register_user(): void
    {
        $response = $this->post('/api/v1/register', [
            'name' => 'Test User',
            'email' => 'test1@example.com',
            'term_aceite' => true,
            'password' => '@JesusTemPODER777',
            'password_confirmation' => '@JesusTemPODER777',
        ]);

        $response->assertStatus(200);
        $response->assertJson(['message' => 'success']);
    }

    public function test_erro_register_user(): void
    {
        $this->artisan('migrate:fresh');
        $response = $this->post('/api/v1/register', [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'term_aceite' => true,
            'password' => 'teste123',
            'password_confirmation  ' => 'teste123',
        ]);

        $response->assertStatus(302);
    }

    public function test_auth_user(): void
    {
        User::factory()->create([
            'email' => 'test3@example.com',
            'password' => '@JesusTemPODER777',
            'term_aceite' => 1,
            'email_verified_at' => now()
        ]);

        $response = $this->post('/api/v1/sessions', [
            'email' => 'test3@example.com',
            'password' => '@JesusTemPODER777',
        ]);

        $response->assertStatus(200);
        $response->assertJsonStructure(['token']);
    }
    
    public function test_erro_auth_user_not_verifie(): void
    {
        User::factory()->create([
            'email' => 'test3@example.com',
            'password' => '@JesusTemPODER777',
            'term_aceite' => 1,
            'email_verified_at' => null
        ]);

        $response = $this->post('/api/v1/sessions', [
            'email' => 'test3@example.com',
            'password' => '@JesusTemPODER777',
        ]);

        $response->assertStatus(401);
        $response->assertJson(['message' => 'Email not verified']);
    }

    public function test_error_auth_user(): void
    {
        $response = $this->post('/api/v1/sessions', [
            'email' => 'test@example.com',
            'password' => 'teste123',
        ]);

        $response->assertStatus(401);
        $response->assertjson(['message' => 'user not created']);
    }

    public function test_update_user(): void
    {
        User::factory()->create([
            'email' => 'test4@example.com',
            'password' => '@JesusTemPODER777',
            'term_aceite' => 1,
            'email_verified_at' => now()
        ]);

        $loginResponse = $this->post('/api/v1/sessions', [
            'email' => 'test4@example.com',
            'password' => '@JesusTemPODER777',
        ]);

        $loginResponse->assertStatus(200);

        $token = $loginResponse->json('token');

        $response = $this->put('/api/v1/user', [
            'name' => 'Test User Updated',
            'password' => '@JesusTemPODER777',
        ], ['Authorization' => 'Bearer ' . $token]);

        $response->assertStatus(200);
    }

    public function test_error_update_user(): void
    {
        User::factory()->create([
            'email' => 'test4@example.com',
            'password' => '@JesusTemPODER777',
            'term_aceite' => 1,
            'email_verified_at' => now()
        ]);

        $loginResponse = $this->post('/api/v1/sessions', [
            'email' => 'test4@example.com',
            'password' => '@JesusTemPODER777',
        ]);

        $loginResponse->assertStatus(200);

        $token = $loginResponse->json('token');

        $response = $this->put('/api/v1/user', [
            'name' => 'Test User Updated',
            'password' => '@JesusTemPODERa77',
        ], ['Authorization' => 'Bearer ' . $token]);

        $response->assertStatus(401);
    }

    public function test_send_email_user(): void
    {
        User::factory()->create([
            'email' => 'test4@example.com',
            'password' => '@JesusTemPODER777',
            'term_aceite' => 1
        ]);

        $response = $this->postJson('/api/v1/re-send-email', [
            'email' => 'test4@example.com',
        ]);

        $response->assertStatus(200);
        $response->assertJsonPath('data.message', 'send e-mail');
    }

    public function test_verifies_email_successfully()
    {
        $user = User::factory()->create([
            'remember_token' => 'valid_token',
            'term_aceite' => 1
        ]);

        $response = $this->getJson("/api/v1/verify-email/{$user->id}/valid_token");

        $response->assertStatus(200);
        $this->assertNotNull($user->fresh()->email_verified_at);
        $response->assertJsonPath('data.message', 'success');
    }

    public function test_returns_error_for_invalid_token()
    {
        $user = User::factory()->create([
            'remember_token' => 'valid_token',
            'term_aceite' => 1
        ]);

        $response = $this->getJson("/api/v1/verify-email/{$user->id}/invalid_token");

        $response->assertStatus(500);
    }

    public function test_returns_error_for_non_existent_user()
    {
        $response = $this->getJson("/api/v1/verify-email/99999/some_token");

        $response->assertStatus(404);
    }

    public function test_resends_verification_email()
    {
        $user = User::factory()->create([
            'term_aceite' => 1
        ]);

        Queue::fake();

        $response = $this->postJson('/api/v1/re-send-email', ['email' => $user->email]);

        $response->assertStatus(200);
        Queue::assertPushed(SendVerifyEmailJob::class);
        $response->assertJsonPath('data.message', 'send e-mail');
    }

    public function test_returns_error_when_resending_email_to_non_existent_user()
    {
        $response = $this->postJson('/api/v1/re-send-email', ['email' => 'nonexistent@example.com']);

        $response->assertStatus(500);
    }
}
