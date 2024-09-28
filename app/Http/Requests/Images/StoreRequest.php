<?php

namespace App\Http\Requests\Images;

use App\Enums\ImageableTypes;
use Illuminate\Validation\Rules\Enum;
use Illuminate\Foundation\Http\FormRequest;

class StoreRequest extends FormRequest
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
        return [
            'images' => 'required|array',
            'images.*' => 'required|file|image|mimes:jpeg,png,jpg,gif|max:2048',
            'ids' => 'required|array',
            'ids.*' => 'required|string',
            'annotations' => 'required|array',
            'annotations.*' => 'nullable|string',
            'rotations' => 'required|array',
            'rotations.*' => 'required|integer',
            'crops' => 'required|array',
            'crops.*' => 'required|json',
            'orders' => 'required|array',
            'orders.*' => 'required|integer',
            'imageable_type' => ['required', new Enum(ImageableTypes::class)],  // Polymorphic type (e.g., 'App\Models\Item', 'App\Models\User')
            'imageable_id' => 'required|integer',   // Polymorphic ID (e.g., item ID or user ID)
        ];
    }
}
