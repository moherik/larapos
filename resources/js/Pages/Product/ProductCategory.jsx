import { useState } from "react";
import { Head, router, useForm } from "@inertiajs/react";
import { IoAddSharp, IoGridOutline } from "react-icons/io5";
import { useSnackbar } from "notistack";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import Header from "@/Components/Header";
import SidebarForm from "@/Components/SidebarForm";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import FileInput from "@/Components/FileInput";
import DatatableCustom from "@/Components/DatatableCustom";
import DangerButton from "@/Components/DangerButton";

import { strToSlug } from "@/helpers";
import useDialog from "@/Hooks/useDialog";

const title = "Kategori Produk";

export default function ProductCategory({ auth, errors, categories, parents }) {
    const [isOpen, setIsOpen] = useState(false);
    const [editId, setEditId] = useState(null);

    const dialog = useDialog();
    const { enqueueSnackbar } = useSnackbar();

    const {
        data,
        setData,
        post,
        patch,
        processing,
        errors: errorField,
        reset,
    } = useForm({
        name: "",
        slug: "",
        description: "",
        level: "",
        icon: "",
    });

    function closeModal() {
        reset();

        setIsOpen(false);
        setEditId(null);
    }

    function openModal() {
        setIsOpen(true);
    }

    const handleOnChange = (event) => {
        let value = "";
        switch (event.target.type) {
            case "checkbox":
                value = event.target.checked;
                break;
            case "file":
                value = event.target.files[0];
                break;
            default:
                value = event.target.value;
                break;
        }

        if (event.target.name == "name") {
            setData({
                ...data,
                name: value,
                slug: strToSlug(event.target.value),
            });
        } else {
            setData(event.target.name, value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!editId) {
            post(route("product.category.store"), {
                onSuccess: () => {
                    enqueueSnackbar("Berhasil menyimpan data");
                    reset();
                },
                onError: () => enqueueSnackbar("Terjadi kesalahan", "error"),
            });
        } else {
            patch(route("product.category.update", editId), {
                onSuccess: () => enqueueSnackbar("Berhasil menyimpan data"),
                onError: () => enqueueSnackbar("Terjadi kesalahan", "error"),
            });
        }
    };

    const handleDelete = (id) => {
        dialog({
            confirm: true,
            title: "Hapus Data",
            description: "Apakah Anda yakin ingin menghapus data ini?",
            btnOk: "Hapus",
            btnCancel: "Batal",
        }).then(() => {
            router.delete(`/product/category/${id}`, {
                onSuccess: () => enqueueSnackbar("Berhasil menghapus data"),
                onError: () => enqueueSnackbar("Terjadi keslahan", "error"),
            });
        });
    };

    const handleEdit = (id) => {
        const selected = categories.find((category) => category.id == id);

        setData({
            name: selected.name,
            slug: selected.slug,
            description: selected.description || "",
            level: selected.parent_id || "",
            icon: "",
        });

        setEditId(id);
        openModal();
    };

    const columns = [
        {
            name: "Nama",
            sortable: true,
            selector: (row) => row.name,
            style: {
                fontWeight: "700",
                fontSize: "14px",
            },
        },
        {
            name: "Slug",
            sortable: true,
            selector: (row) => row.slug,
        },
        {
            name: "Parent",
            sortable: true,
            selector: (row) => row.parent?.name,
        },
        {
            name: "Deskripsi",
            sortable: true,
            selector: (row) => row.description,
        },
        {
            name: "",
            selector: (row) => (
                <div className="flex space-x-2">
                    <PrimaryButton onClick={() => handleEdit(row.id)}>
                        Ubah
                    </PrimaryButton>
                    <DangerButton onClick={() => handleDelete(row.id)}>
                        Hapus
                    </DangerButton>
                </div>
            ),
        },
    ];

    return (
        <AuthenticatedLayout
            auth={auth}
            errors={errors}
            header={
                <Header
                    icon={<IoGridOutline />}
                    title={title}
                    action={
                        <PrimaryButton
                            onClick={openModal}
                            icon={<IoAddSharp size={18} />}
                        >
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
                        <DatatableCustom columns={columns} data={categories} />
                    </div>
                </div>
            </div>

            <SidebarForm
                isOpen={isOpen}
                onSubmit={handleSubmit}
                closeModal={closeModal}
                loading={processing}
                title={
                    !editId ? "Tambah Kategori Produk" : "Ubah Kategori Produk"
                }
                className="max-w-lg"
            >
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="text-sm grid gap-2 md:grid md:grid-cols-12">
                        <InputLabel
                            htmlFor="name"
                            value="Nama Kategori"
                            className="col-span-4"
                        />

                        <div className="col-span-8">
                            <TextInput
                                id="name"
                                type="text"
                                name="name"
                                value={data.name}
                                className="mt-1 block w-full"
                                autoComplete="name"
                                isFocused={true}
                                onChange={handleOnChange}
                            />

                            <InputError
                                message={errorField.name}
                                className="mt-2"
                            />
                        </div>
                    </div>

                    <div className="text-sm grid gap-2 md:grid md:grid-cols-12">
                        <InputLabel
                            htmlFor="slug"
                            value="Slug"
                            className="col-span-4"
                        />

                        <div className="col-span-8">
                            <TextInput
                                id="slug"
                                type="text"
                                name="slug"
                                value={data.slug}
                                className="mt-1 block w-full"
                                onChange={handleOnChange}
                            />

                            <InputError
                                message={errorField.slug}
                                className="mt-2"
                            />
                        </div>
                    </div>

                    <div className="text-sm grid gap-2 md:grid md:grid-cols-12">
                        <InputLabel
                            htmlFor="description"
                            value="Deskripsi"
                            className="col-span-4"
                        />

                        <div className="col-span-8">
                            <TextInput
                                id="description"
                                type="text"
                                name="description"
                                value={data.description}
                                className="mt-1 block w-full"
                                autoComplete="description"
                                onChange={handleOnChange}
                                placeholder="Opsional"
                            />

                            <InputError
                                message={errorField.description}
                                className="mt-2"
                            />
                        </div>
                    </div>

                    <div className="text-sm grid gap-2 md:grid md:grid-cols-12">
                        <InputLabel
                            htmlFor="level"
                            value="Level"
                            className="col-span-4"
                        />

                        <div className="col-span-8">
                            <SelectInput
                                id="level"
                                name="level"
                                value={data.level}
                                className="mt-1 block w-full"
                                onChange={handleOnChange}
                                data={parents}
                            />

                            <InputError
                                message={errors.level}
                                className="mt-2"
                            />
                        </div>
                    </div>

                    <div className="text-sm grid gap-2 md:grid md:grid-cols-12">
                        <InputLabel
                            htmlFor="icon"
                            value="Ikon"
                            className="col-span-4"
                        />

                        <div className="col-span-8">
                            <FileInput
                                id="icon"
                                name="icon"
                                value={data.icon}
                                className="mt-1 block w-full"
                                onChange={handleOnChange}
                            />

                            <InputError
                                message={errors.icon}
                                className="mt-2"
                            />
                        </div>
                    </div>
                </form>
            </SidebarForm>
        </AuthenticatedLayout>
    );
}
