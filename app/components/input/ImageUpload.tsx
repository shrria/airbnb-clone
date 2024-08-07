"use client";

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";

declare global {
    var cloudinary: any;
}

interface ImageUploadProps {
    onChange: (url: string) => void;
    value: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
    onChange,
    value,
}) => {
    const handleUpload = useCallback((result: any) => {
        onChange(result.info.secure_url);
    }, [onChange]);

    return (
        <CldUploadWidget
            onSuccess={handleUpload}
            uploadPreset="gap5lxyj"
            options={{
                maxFiles: 1,
            }}
        >
            {({ open }) => {
                return (
                    <div
                        onClick={() => open?.()}
                        className="
                            flex flex-col relative justify-center items-center p-20 gap-4
                            border-dashed border-2 border-neutral-100 text-neutral-600
                            hover:opacity-70 trasition cursor-pointer
                        "
                    >
                        <TbPhotoPlus size={50} />
                        <div className="font-semibold text-lg">
                            Click to upload
                        </div>
                        {value && (
                            <div className="absolute inset-0 w-full h-full">
                                <Image
                                    alt="Upload"
                                    fill
                                    style={{ objectFit: "cover" }}
                                    src={value}
                                />
                            </div>
                        )}
                    </div>
                );
            }}

        </CldUploadWidget>
    );
};

export default ImageUpload;