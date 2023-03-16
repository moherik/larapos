import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";

export default function SidebarForm({
    isOpen,
    closeModal,
    onSubmit,
    title,
    children,
    loading = false,
    className,
}) {
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto right-0">
                    <div className="flex min-h-full justify-end text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="translate-x-full"
                        >
                            <Dialog.Panel
                                className={
                                    "w-full h-full max-w-md transform overflow-hidden bg-white text-left shadow-xl transition-all flex flex-col fixed " +
                                    className
                                }
                            >
                                <div className="space-y-1 py-4 px-6 bg-overlay-bg border-b border-overlay-border">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        {title}
                                    </Dialog.Title>
                                </div>

                                <div className="relative flex-1 overflow-y-auto py-4 px-6">
                                    {children}
                                </div>

                                <div className="flex w-full justify-end space-x-3 border-t border-scale-500 px-3 py-4">
                                    <SecondaryButton onClick={closeModal}>
                                        Batal
                                    </SecondaryButton>
                                    <PrimaryButton onClick={onSubmit} loading={loading}>
                                        Simpan
                                    </PrimaryButton>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
