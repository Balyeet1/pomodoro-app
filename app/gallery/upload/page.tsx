'use client';
import type { PutBlobResult } from '@vercel/blob';
import { useState, useRef } from 'react';
import Image from 'next/image';
import { checkPassword } from '@/app/lib/utils/passwordManager';

export default function ImageUploadPage() {
    const inputFileRef = useRef<HTMLInputElement>(null);
    const inputPasswordRef = useRef<HTMLInputElement>(null);
    const [blob, setBlob] = useState<PutBlobResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    return (
        <div className='flex flex-col justify-center items-center h-screen'>
            <h1 className='text-2xl mb-4'><strong>Upload image for gallery</strong></h1>

            <form
                className='flex flex-col justify-center items-center'
                onSubmit={async (event) => {
                    event.preventDefault();

                    if (!inputFileRef.current?.files) {
                        throw new Error("No file selected");
                    }

                    if (!inputPasswordRef.current?.value) {
                        setError("Set password");
                        return
                    }

                    const isPasswordCorrect = await checkPassword(inputPasswordRef.current.value)

                    if (!isPasswordCorrect) {
                        setError("Wrong password");
                        return
                    }

                    const file = inputFileRef.current.files[0];

                    setError(null);

                    const response = await fetch(
                        `/api/image/upload?filename=${file.name}`,
                        {
                            method: 'POST',
                            body: file,
                        },
                    );

                    const newBlob = (await response.json()) as PutBlobResult;

                    setBlob(newBlob);
                    inputFileRef.current.value = '';
                }}
            >
                <input name="file" ref={inputFileRef} type="file" required />
                <div className='flex items-center mt-2'>
                    Password:
                    <input className='border border-black rounded-md ml-2 text-black' name="password" ref={inputPasswordRef} type="password" required />
                    {error && <div className='ml-2 bg-red-500 rounded-md p-1 text-white'>{error}</div>}
                </div>
                <button className='bg-green-950 ml-8 border border-white rounded-md px-2 py-1 text-white hover:bg-green-950 mt-2' type="submit">Upload</button>
            </form>
            {
                blob && (
                    <div>
                        Image Uploaded
                        <Image
                            className='h-auto w-auto'
                            src={blob.url}
                            alt="Uploaded image"
                            width={500}
                            height={260}
                        />
                    </div>
                )
            }
        </div >
    );
}