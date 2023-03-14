export default function Header({ icon, title, action }) {
    return (
        <div className="flex flex-grow items-center justify-between">
            <div className="flex-1 flex items-center gap-3 font-semibold text-xl text-gray-800">
                {icon}
                <h2 className="leading-tight">{title}</h2>
            </div>
            <div className="action">{action}</div>
        </div>
    );
}
