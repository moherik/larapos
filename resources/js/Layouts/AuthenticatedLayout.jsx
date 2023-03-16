import Sidebar from "@/Components/Sidebar";
import Appbar from "@/Components/Appbar";

export default function Authenticated({ auth, header, children }) {
    return (
        <div className="min-h-screen bg-gray-100 overflow-hidden">
            <Appbar auth={auth}/>

            <Sidebar permissions={auth.permissions} />

            <main className="md:pl-72 md:pt-14">
                {header && (
                    <header className="bg-white shadow h-16 flex items-center mt-14 px-4 sm:px-6 md:mt-0 md:sticky md:top-14 lg:px-6">
                        {header}
                    </header>
                )}

                {children}
            </main>
        </div>
    );
}
