import { forwardRef, useEffect, useRef, useState } from "react";
import { IoAddOutline } from "react-icons/io5";

export default forwardRef(function FileInput(
    { data = [], multiple = true, className = "", isFocused = false, onChange: performOnChange, ...props },
    ref
) {
    const [files, setFiles] = useState([]);
    const input = ref ? ref : useRef();

    const handleOnClick = () => {
        input.current.click();
    };

    const handleOnChange = (e) => {
        const arrFiles = files;
        for (const file of e.target.files) {
            arrFiles.push(URL.createObjectURL(file));
        }

        setFiles(arrFiles);
        
        performOnChange(files);
    };

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
            <div className="border-2 border-dashed border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm w-full">
                {files && files.length > 0 ? (
                    <div className="flex space-x-2 p-2">
                        {files.map((file, index) => (
                            <div className="overflow-hidden rounded-md" key={index}>
                                <img src={file} className="w-16 h-16 object-cover" />
                            </div>
                        ))}
                        <div className="border-2 border-gray-300 rounded-md w-16 h-16 shadow-sm cursor-pointer flex items-center justify-center hover:border-indigo-500" onClick={handleOnClick}>
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
