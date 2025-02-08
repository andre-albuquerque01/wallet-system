<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Transaction>
 */
class TransactionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'value' => fake()->numberBetween(0, 100),
            'type' => fake()->randomElement(['credit', 'debit', 'transfer']), 
            'sender_id' => Str::ulid()->toString(), 
            'receiver_id' => Str::ulid()->toString(), 
        ];
    }
}
