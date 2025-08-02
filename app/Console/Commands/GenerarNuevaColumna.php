<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class GenerarNuevaColumna extends Command
{
  /**
   * The name and signature of the console command.
   *
   * @var string
   */
  protected $signature = 'generar:columna {key} {label} {row}';

  /**
   * The description of the console command.
   *
   * @var string
   */
  protected $description = 'Genera una nueva columna en todos los archivos TypeScript y SQL necesarios';

  /**
   * Execute the console command.
   */
  public function handle()
  {
    $key = $this->argument('key');
    $label = $this->argument('label');
    $row = $this->argument('row');

    $this->info("Generando columna: {$key} - {$label} - {$row}");

    try {
      // 1. Actualizar columnasLiquidacion.ts
      $this->actualizarColumnasLiquidacion($key, $label);

      // 2. Actualizar DetalleLiquidacion.ts
      $this->actualizarDetalleLiquidacion($key);

      // 3. Actualizar Liquidacion.ts
      $this->actualizarLiquidacion($key);

      // 4. Actualizar parseExcel.ts
      $this->actualizarParseExcel($key, $row);

      // 5. Generar SQL y migración Laravel
      $this->generarSQL($key);

      $this->info('✅ Columna generada exitosamente en todos los archivos!');
    } catch (\Exception $e) {
      $this->error('❌ Error al generar la columna: ' . $e->getMessage());
      return 1;
    }

    return 0;
  }

  private function actualizarColumnasLiquidacion($key, $label)
  {
    $filePath = resource_path('js/constants/columnasLiquidacion.ts');
    $content = File::get($filePath);

    // Agregar antes de sub_total en el array columnas
    $search = "  { key: 'sub_total', label: 'Subtotal' }";
    $replacement = "  { key: '{$key}', label: '{$label}' },\n  { key: 'sub_total', label: 'Subtotal' }";
    $newContent = str_replace($search, $replacement, $content);

    // Agregar antes de sub_total en la lista de campos
    $search2 = "  'sub_total',";
    $replacement2 = "  '{$key}',\n  'sub_total',";
    $newContent = str_replace($search2, $replacement2, $newContent);

    File::put($filePath, $newContent);
    $this->info("✅ Actualizado: {$filePath}");
  }

  private function actualizarDetalleLiquidacion($key)
  {
    $filePath = resource_path('js/interfaces/DetalleLiquidacion.ts');
    $content = File::get($filePath);

    // Agregar antes de sub_total usando str_replace
    $search = "  sub_total: string";
    $replacement = "  {$key}: string\n  sub_total: string";
    $newContent = str_replace($search, $replacement, $content);

    File::put($filePath, $newContent);
    $this->info("✅ Actualizado: {$filePath}");
  }

  private function actualizarLiquidacion($key)
  {
    $filePath = resource_path('js/interfaces/Liquidacion.ts');
    $content = File::get($filePath);

    // Agregar antes de sub_total usando str_replace
    $search = "  sub_total: number";
    $replacement = "  {$key}: number\n  sub_total: number";
    $newContent = str_replace($search, $replacement, $content);

    File::put($filePath, $newContent);
    $this->info("✅ Actualizado: {$filePath}");
  }

  private function actualizarParseExcel($key, $row)
  {
    $filePath = resource_path('js/utils/parseExcel.ts');
    $content = File::get($filePath);

    // Agregar antes de sub_total usando str_replace
    $search = "          sub_total: +Number(row['Sb total']).toFixed(2) || 0";
    $replacement = "          {$key}: +Number(row['{$row}']).toFixed(2) || 0,\n          sub_total: +Number(row['Sb total']).toFixed(2) || 0";
    $newContent = str_replace($search, $replacement, $content);

    File::put($filePath, $newContent);
    $this->info("✅ Actualizado: {$filePath}");
  }

  private function generarSQL($key)
  {
    $timestamp = date('Y_m_d_His');
    $fileName = "add_{$key}_column_{$timestamp}.sql";
    $filePath = database_path("migrations/{$fileName}");

    $sql = "-- Agregar columna {$key} a las tablas necesarias
-- Ejecutar este SQL en la base de datos

ALTER TABLE retenciones_mensuales ADD COLUMN {$key} DECIMAL(10,2) DEFAULT 0.00;
ALTER TABLE retenciones ADD COLUMN {$key} DECIMAL(10,2) DEFAULT 0.00;

-- Actualizar registros existentes (opcional)
-- UPDATE retenciones_mensuales SET {$key} = 0.00 WHERE {$key} IS NULL;
-- UPDATE retenciones SET {$key} = 0.00 WHERE {$key} IS NULL;
";

    File::put($filePath, $sql);
    $this->info("✅ Generado SQL: {$filePath}");

    // También generar migración de Laravel
    //$this->generarMigracionLaravel($key);
  }

  private function generarMigracionLaravel($key)
  {
    $timestamp = date('Y_m_d_His');
    $className = 'Add' . str_replace('_', '', ucwords($key, '_')) . 'Column';
    $fileName = "{$timestamp}_add_{$key}_column.php";
    $filePath = database_path("migrations/{$fileName}");

    $migrationContent = "<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('retenciones_mensuales', function (Blueprint \$table) {
            \$table->decimal('{$key}', 10, 2)->default(0.00)->after('interes_saldo');
        });

        Schema::table('retenciones', function (Blueprint \$table) {
            \$table->decimal('{$key}', 10, 2)->default(0.00)->after('interes_saldo');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('retenciones_mensuales', function (Blueprint \$table) {
            \$table->dropColumn('{$key}');
        });

        Schema::table('retenciones', function (Blueprint \$table) {
            \$table->dropColumn('{$key}');
        });
    }
};
";

    File::put($filePath, $migrationContent);
    $this->info("✅ Generada migración Laravel: {$filePath}");
  }
}
