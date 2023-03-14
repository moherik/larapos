import { can } from "@/helpers";
import { Link } from "@inertiajs/react";

import {
    IoBarChartOutline,
    IoCartOutline,
    IoChevronDown,
    IoChevronForward,
    IoCubeOutline,
    IoGridOutline,
    IoMedicalOutline,
    IoPeopleOutline,
    IoReceiptOutline,
    IoSettingsOutline,
    IoSpeedometerOutline,
    IoStorefrontOutline,
    IoTextOutline,
} from "react-icons/io5";
import NavLink from "./NavLink";

export default function Sidebar({ permissions }) {
    const menuList = [
        {
            label: "Dashboard",
            permission: "all",
            submenu: [
                {
                    icon: <IoSpeedometerOutline />,
                    label: "Dashboard",
                    href: route("dashboard"),
                    isActive: route().current("dashboard"),
                    permission: "all",
                },
            ],
        },
        {
            label: "Produk",
            permission: ["produk", "produk kategori", "satuan", "merek"],
            submenu: [
                {
                    icon: <IoCubeOutline />,
                    label: "Produk",
                    href: route("product.index"),
                    isActive: route().current("product.index"),
                    permission: "produk",
                },
                {
                    icon: <IoGridOutline />,
                    label: "Kategori Produk",
                    href: route("product.category.index"),
                    isActive: route().current("product.category.index"),
                    permission: "produk kategori",
                },
                {
                    icon: <IoMedicalOutline />,
                    label: "Satuan",
                    href: route("product.unit.index"),
                    isActive: route().current("product.unit.index"),
                    permission: "satuan",
                },
                {
                    icon: <IoTextOutline />,
                    label: "Merek",
                    href: route("product.brand.index"),
                    isActive: route().current("product.brand.index"),
                    permission: "merek",
                },
            ],
        },
        {
            label: "Transaksi",
            permission: ["penjualan", "pembelian"],
            submenu: [
                {
                    icon: <IoCartOutline />,
                    label: "Penjualan",
                    permission: "penjualan",
                },
                {
                    icon: <IoReceiptOutline />,
                    label: "Pembelian",
                    permission: "pembelian",
                },
            ],
        },
        {
            label: "Laporan",
            permission: ["laporan"],
            submenu: [
                {
                    icon: <IoBarChartOutline />,
                    label: "Laporan",
                    permission: "laporan",
                },
            ],
        },
        {
            label: "Pengguna",
            permission: ["pelanggan", "supplier", "kasir", "karyawan"],
            submenu: [
                {
                    icon: <IoPeopleOutline />,
                    label: "Pelanggan",
                    permission: "pelanggan",
                },
                {
                    icon: <IoPeopleOutline />,
                    label: "Supplier",
                    permission: "supplier",
                },
                {
                    icon: <IoPeopleOutline />,
                    label: "Kasir",
                    permission: "kasir",
                },
                {
                    icon: <IoPeopleOutline />,
                    label: "Karyawan",
                    permission: "karyawan",
                },
            ],
        },
        {
            label: "Pengaturan",
            permission: ["pengaturan", "cabang", "hak akses"],
            submenu: [
                {
                    icon: <IoSettingsOutline />,
                    label: "Pengaturan",
                    permission: "pengaturan",
                },
                {
                    icon: <IoSettingsOutline />,
                    label: "Kelola Cabang",
                    permission: "cabang",
                },
                {
                    icon: <IoSettingsOutline />,
                    label: "Hak Akses",
                    permission: "hak akses",
                },
            ],
        },
    ];

    return (
        <aside className="w-72 bg-white fixed top-0 bottom-0 shadow hidden pt-14 md:flex md:flex-col">
            <div className="h-16 p-2 shadow">
                <Link className="flex items-center justify-between bg-indigo-500 min-h-full shadow-sm rounded-lg py-2 px-4 text-white text-base uppercase hover:bg-indigo-600 transition duration-150 ease-in-out">
                    <div className="flex gap-6 items-center">
                        <IoStorefrontOutline />
                        <span className="pl-1">POS</span>
                    </div>
                    <IoChevronForward />
                </Link>
            </div>

            <div className="flex-1 overflow-y-auto overflow-x-hidden">
                {menuList.map((menu, index) =>
                    can(menu.permission, permissions) ? (
                        <div key={index}>
                            <div className="p-2 text-gray-500 text-sm">
                                {menu.label}
                            </div>

                            {menu.submenu && (
                                <div className="submenu">
                                    {menu.submenu.map((submenu, subindex) =>
                                        can(submenu.permission, permissions) ? (
                                            <NavLink
                                                key={subindex}
                                                href={submenu.href}
                                                active={submenu.isActive}
                                            >
                                                {submenu.icon}
                                                <span>{submenu.label}</span>
                                            </NavLink>
                                        ) : null
                                    )}
                                </div>
                            )}
                        </div>
                    ) : null
                )}
            </div>
        </aside>
    );
}
