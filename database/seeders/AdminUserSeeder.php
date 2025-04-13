<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::updateOrCreate(
            ['email' => 'admin@example.com'], // evita duplicados si se corre más de una vez
            [
                'name' => 'Administrador',
                'email' => 'admin@example.com',
                'password' => Hash::make('admin123'), // poné una contraseña segura en producción
            ]
        );

        User::updateOrCreate(
            ['email' => 'ikamlofky@gmail.com'], // evita duplicados si se corre más de una vez
            [
                'name' => 'Isidro Kamlofky',
                'email' => 'ikamlofky@gmail.com',
                'password' => Hash::make('loyola'), // poné una contraseña segura en producción
            ]
        );
    }
}
