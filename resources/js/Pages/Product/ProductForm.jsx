import Button from "@/Components/Button";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { IoAddSharp, IoGridOutline } from "react-icons/io5";

export default function ProductForm(props) {
    const header = (
        <div className="flex flex-grow items-center justify-between">
            <div className="flex-1 flex items-center gap-3 font-semibold text-xl text-gray-800">
                <IoGridOutline />
                <h2 className="leading-tight">
                    Product
                </h2>
            </div>
            <Button
                icon={<IoAddSharp size={18} />}
                label="Tambah"
                className="bg-blue-500 hover:bg-blue-600 text-white"
            />
            <div className="action"></div>
        </div>
    );

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={header}
        >
            <Head title="Product" />

            <div className="py-5">
                <div className="mx-auto sm:px-6 lg:px-6">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">Product</div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
