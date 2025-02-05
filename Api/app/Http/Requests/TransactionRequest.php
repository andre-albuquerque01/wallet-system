<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TransactionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $rules = [
            "value" => "required|regex:/^[^<>]*$/",
            "type" => "required|in:credit,debit,transfer",
            "sender_id" => "nullable|regex:/^[^<>]*$/",
            "receiver_id" => "nullable|regex:/^[^<>]*$/",
        ];

        if ($this->method() == 'PATCH' || $this->method() == 'PUT') {
            $rules["value"] = [
                "nullable",
            ];
            $rules["type"] = [
                "nullable",
            ];
            $rules["sender_id"] = [
                "nullable",
            ];
            $rules["receiver_id"] = [
                'nullable',
            ];
        }

        return $rules;
    }

    public function messages()
    {
        return [
            'type.in' => 'O tipo deve ser "credito", "debito" ou "transferencia".',
        ];
    }
}
