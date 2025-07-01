<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreRetencionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'liquidaciones' => 'required|array|min:1',
            'periodo' => ['required', 'string', 'regex:/^\d{4}-\d{2}$/', 'unique:retencions,periodo']
        ];
    }

    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            $campos = [
                'legajo',
                'cuota',
                'ss_adm',
                'fcia_maria_luisa',
                'fcia_amur',
                'fcia_la_botica',
                'oseca',
                'villegas',
                'luz_y_fza',
                'flama',
                'fontana',
                'moto_city',
                'transporte',
                'mutual_sol',
                'viandas',
                'seguro',
                'uso_ins_cd',
                'varios_bebidas',
                'prestamos',
                'interes_prestamos',
                'saldo',
                'interes_saldo',
                'sub_total',
                'gasto_bancario',
                'total'
            ];

            $liquidaciones = $this->input('liquidaciones');

            foreach ($liquidaciones as $index => $liquidacion) {
                foreach ($campos as $campo) {
                    if (!array_key_exists($campo, $liquidacion)) {
                        $validator->errors()->add("liquidaciones.$index.$campo", "El campo $campo no existe en la liquidación $index");
                    }
                }
            }
        });
    }
}
