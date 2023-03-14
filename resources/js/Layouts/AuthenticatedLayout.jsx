import Sidebar from "@/Components/Sidebar";
import Appbar from "@/Components/Appbar";

export default function Authenticated({ auth, header, children, ...other }) {
    return (
        <div className="min-h-screen bg-gray-100">
            <Appbar auth={auth}/>

            <Sidebar permissions={auth.permissions} />

            <main className="md:pl-72 md:pt-14">
                {header && (
                    <header className="bg-white shadow h-16 flex items-center sticky top-14 px-4 sm:px-6 lg:px-6">
                        {header}
                    </header>
                )}

                {children}
            </main>
        </div>
    );
}
