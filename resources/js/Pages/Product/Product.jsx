import { Head } from "@inertiajs/react";
import { IoAddSharp, IoCubeOutline } from "react-icons/io5";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import Header from "@/Components/Header";
import DatatableCustom from "@/Components/DatatableCustom";

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

    return (
        <AuthenticatedLayout
            auth={auth}
            errors={errors}
            header={
                <Header
                    icon={<IoCubeOutline />}
                    title={title}
                    action={
                        <PrimaryButton icon={<IoAddSharp size={18} />}>
                            Tambah
                        </PrimaryButton>
                    }
                />
            }
        >
            <Head title={title} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="bg-white shadow sm:rounded-lg overflow-hidden">
                        <DatatableCustom columns={columns} data={data} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
