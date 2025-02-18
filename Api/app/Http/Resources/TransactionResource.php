<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TransactionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // return parent::toArray($request);
        return [
            'id' => $this->id,
            "value" =>  $this->value,
            "type" =>  $this->type,
            "created_at" => $this->created_at,
            "sender" => new UserResource($this->sender),
            "receiver" => new UserResource($this->receiver),
        ];
    }
}
