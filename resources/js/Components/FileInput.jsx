import { forwardRef, useRef, useState } from "react";
import { IoAddOutline, IoTrashOutline } from "react-icons/io5";

export default forwardRef(function FileInput(
    { data = [], multiple = true, className = "", isFocused = false, onChange: performOnChange, ...props },
    ref
) {
    const [files, setFiles] = useState([]);
    const [previews, setPreviews] = useState([]);
    const input = ref ? ref : useRef();

    const handleOnClick = () => {
        input.current.click();
    };

    const handleOnChange = (e) => {
        const arrPreviews = previews;
        for (const file of e.target.files) {
            arrPreviews.push(URL.createObjectURL(file));
        }

        setPreviews(arrPreviews);
    };

    const remove = (index) => {
        setPreviews(previews.filter((_val, idx) => idx != index));
    }

    return (
        <div className="flex flex-col items-start">
            <input
                type="file"
                ref={input}
                multiple
                onChange={handleOnChange}
                className="hidden"
                {...props}
            />
            <div className="border-2 border-dashed border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm w-full overflow-y-auto">
                {files && files.length > 0 ? (
                    <div className="flex space-x-2 p-2">
                        {previews.map((img, index) => (
                            <div className="overflow-hidden rounded-md relative w-16 flex-shrink-0" key={index}>
                                <img src={img} className="w-16 h-16 object-cover" />
                                <div onClick={() => remove(index)} className="cursor-pointer absolute top-1 right-1 bg-white hover:bg-red-500 hover:text-white shadow-md rounded-full p-1"><IoTrashOutline/></div>
                            </div>
                        ))}
                        <div className="border-2 border-gray-300 rounded-md w-16 h-16 flex-shrink-0 shadow-sm cursor-pointer flex items-center justify-center hover:border-indigo-500" onClick={handleOnClick}>
                            <IoAddOutline size={32}/>
                        </div>
                    </div>
                ) : (
                    <div
                        className="flex items-center justify-center w-full h-full cursor-pointer py-5"
                        onClick={handleOnClick}
                    >
                        Klik untuk Upload
                    </div>
                )}
            </div>
        </div>
    );
});
