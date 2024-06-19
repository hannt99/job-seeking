'use client';

import { useRef, useState } from 'react';
import FormData from 'form-data';
import axios from 'axios';
import { success, warning } from '@/utils/toastMessage';

const DragAndDropFile = () => {
    const [dragActive, setDragActive] = useState(false);
    const [files, setFiles] = useState([]);

    const inputRef = useRef(null);

    const handleChange = (e) => {
        e.preventDefault();
        console.log('File has been added');
        if (e.target.files && e.target.files[0]) {
            console.log(e.target.files);
            for (let i = 0; i < e.target.files['length']; i++) {
                setFiles((prevState) => [...prevState, e.target.files[i]]);
            }
        }
    };

    const handleSubmitFile = async (e) => {
        e.preventDefault();
        if (files.length === 0) {
            warning('Hãy chọn ít nhất 1 cv');
        } else {
            const data = new FormData();
            for (let i = 0; i < files.length; i++) {
                data.append('myCV', files[i]);
            }
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/resume/upload-cv`, data, {
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
            });
            if (res?.data?.code === 200) {
                setFiles([]);
                return success(res?.data?.message);
            } else {
                return warning(res?.data?.message);
            }
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            for (let i = 0; i < e.dataTransfer.files['length']; i++) {
                setFiles((prevState) => [...prevState, e.dataTransfer.files[i]]);
            }
        }
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(true);
    };

    const handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(true);
    };

    const removeFile = (fileName, idx) => {
        const newArr = [...files];
        newArr.splice(idx, 1);
        setFiles([]);
        setFiles(newArr);
    };

    const openFileExplorer = () => {
        inputRef.current.value = '';
        inputRef.current.click();
    };

    return (
        <form
            className={`${
                dragActive ? 'bg-blue-400' : 'bg-blue-100'
            }  p-4 w-full min-h-[300px] text-center flex flex-col items-center justify-center`}
            onDragEnter={handleDragEnter}
            onSubmit={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
        >
            {/* this input element allows us to select files for upload. We make it hidden so we can activate it when the user clicks select files */}
            <input
                placeholder="fileInput"
                className="hidden"
                ref={inputRef}
                type="file"
                multiple={true}
                onChange={handleChange}
                accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
            />
            <svg
                class="w-12 h-12 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
            >
                <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
            </svg>
            <p className="font-medium">
                Tải lên CV của bạn,{' '}
                <span className="font-bold text-blue-600 cursor-pointer" onClick={openFileExplorer}>
                    <u>Chọn</u>
                </span>{' '}
                hoặc kéo thả
            </p>
            <p className="text-[1.5rem] text-[#808080] mt-4">
                Hỗ trợ định dạng .doc, .docx, .pdf có kích thước dưới 5MB
            </p>
            <div className="flex flex-col items-center p-3">
                {files.map((file, idx) => (
                    <div key={idx} className="flex flex-row space-x-5">
                        <span>{file.name}</span>
                        <span className="text-red-500 cursor-pointer" onClick={() => removeFile(file.name, idx)}>
                            remove
                        </span>
                    </div>
                ))}
            </div>

            <button className="bg-black rounded-lg p-2 mt-3 w-auto" onClick={handleSubmitFile}>
                <span className="p-2 text-white">Submit</span>
            </button>
        </form>
    );
};

export default DragAndDropFile;
