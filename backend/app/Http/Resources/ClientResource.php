<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class ClientResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->first_name.' '.$this->last_name,
            'email' => $this->email,
            'phone' => $this->phone,
            'dob' => str_pad($this->birth_day,2,0,STR_PAD_LEFT).' '.date("F", mktime(0, 0, 0, $this->birth_month, 10)),
            'created_by' => $this->admin()->first()->name,
            'created_at' => $this->created_at->format("d M Y")
        ];
    }
}
