import { Link } from '@inertiajs/react';

export default function NavLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={`w-full flex items-center px-5 py-2 border-l-4 gap-7 ${
                active
                    ? 'border-indigo-700 text-indigo-700 bg-indigo-50 focus:text-indigo-800 focus:bg-indigo-100 focus:border-indigo-700'
                    : 'border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-50  focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300'
            } text-base hover:bg-gray-200 transition duration-150 ease-in-out ${className}`}
        >
            {children}
        </Link>
    );
}
