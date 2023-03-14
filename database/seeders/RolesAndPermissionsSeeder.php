<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // create permissions
        Permission::create(['name' => 'pos']);
        Permission::create(['name' => 'produk']);
        Permission::create(['name' => 'produk kategori']);
        Permission::create(['name' => 'satuan']);
        Permission::create(['name' => 'merek']);
        Permission::create(['name' => 'penjualan']);
        Permission::create(['name' => 'pembelian']);
        Permission::create(['name' => 'laporan']);
        Permission::create(['name' => 'pelanggan']);
        Permission::create(['name' => 'supplier']);
        Permission::create(['name' => 'kasir']);
        Permission::create(['name' => 'karyawan']);
        Permission::create(['name' => 'pengaturan']);
        Permission::create(['name' => 'cabang']);
        Permission::create(['name' => 'hak akses']);

        $cashierRole = Role::create(['name' => 'cashier']);
        $cashierRole->givePermissionTo(['pos', 'penjualan', 'pembelian', 'laporan']);

        $headRole = Role::create(['name' => 'head']);
        $headRole->givePermissionTo(['produk', 'produk kategori', 'satuan', 'merek', 'penjualan', 'pembelian', 'laporan', 'pelanggan', 'supplier', 'kasir', 'karyawan', 'pengaturan']);

        $ownerRole = Role::create(['name' => 'owner']);
        $ownerRole->givePermissionTo(Permission::all());
        
        $cashier = \App\Models\User::create([
            'first_name' => 'Kasir',
            'last_name' => 'Cakri4',
            'email' => 'kasir@mail.com',
            'password' => Hash::make("kasir"),
            'email_verified_at' => Carbon::now(),
            'phone' => '082000000222',
            'is_active' => true,
        ]);
        $cashier->assignRole($cashierRole);

        $head = \App\Models\User::create([
            'first_name' => 'Cakri',
            'last_name' => 'Head',
            'email' => 'head@mail.com',
            'password' => Hash::make("head"),
            'email_verified_at' => Carbon::now(),
            'phone' => '082000000222',
            'is_active' => true,
        ]);
        $head->assignRole($headRole);

        $superAdmin = \App\Models\User::create([
            'first_name' => 'Super',
            'last_name' => 'Admin',
            'email' => 'superadmin@mail.com',
            'password' => Hash::make("superadmin"),
            'email_verified_at' => Carbon::now(),
            'phone' => '082000000222',
            'is_active' => true,
        ]);
        $superAdmin->assignRole($ownerRole);
    }
}
