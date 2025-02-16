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
            "email" => [
                "nullable",
                "email",
                "max:255",
                "min:2",
                "required_if:type,transfer",
            ],
        ];

        if ($this->method() == 'PATCH' || $this->method() == 'PUT') {
            $rules["value"] = [
                "nullable",
            ];
            $rules["type"] = [
                "nullable",
            ];
        }

        return $rules;
    }

    public function messages()
    {
        return [
            'type.in' => 'O tipo deve ser "credito", "debito" ou "transferencia".',
            "type.required" => "O tipo de transação é obrigatório.",
            "type.regex" => "O tipo contém caracteres inválidos.",
            
            "value.required" => "O valor da transação é obrigatório.",
            "value.regex" => "O valor contém caracteres inválidos.",

            "email.required" => "O e-mail é obrigatório.",
            "email.email" => "O e-mail informado não é válido.",
            "email.max" => "O e-mail não pode ter mais de 255 caracteres.",
            "email.min" => "O e-mail deve ter pelo menos 2 caracteres.",
        ];
    }
}
