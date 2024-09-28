<?php

namespace App\Http\Requests\Images;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRequest extends FormRequest
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
            'images.*.id' => 'required|exists:images,id',
            'images.*.annotation' => 'nullable|string',
            'images.*.rotation' => 'required|integer',
            'images.*.crop' => 'required|json',
            'images.*.order' => 'required|integer',
            'images.*.file' => 'nullable|file|image|mimes:jpeg,png,jpg,gif|max:2048',
        ];
    }
}
