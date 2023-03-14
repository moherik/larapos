import { Head } from "@inertiajs/react";
import { IoAddSharp, IoCubeOutline } from "react-icons/io5";
import DataTable from "react-data-table-component";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import Header from "@/Components/Header";

const title = "Data Produk";

export default function Product({ auth, errors }) {
    const columns = [
        {
            name: "Title",
            selector: (row) => row.title,
        },
        {
            name: "Year",
            selector: (row) => row.year,
        },
    ];

    const data = [
        {
            id: 1,
            title: "Beetlejuice",
            year: "1988",
        },
        {
            id: 2,
            title: "Ghostbusters",
            year: "1984",
        },
    ];

    const action = (
        <PrimaryButton>
            <IoAddSharp size={18} />
            &nbsp;Tambah
        </PrimaryButton>
    );

    return (
        <AuthenticatedLayout
            auth={auth}
            errors={errors}
            header={
                <Header
                    icon={<IoCubeOutline />}
                    title={title}
                    action={action}
                />
            }
        >
            <Head title={title} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <DataTable columns={columns} data={data} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
