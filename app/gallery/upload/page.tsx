'use client';
import type { PutBlobResult } from '@vercel/blob';
import { useState, useRef } from 'react';
import Image from 'next/image';
import { checkPassword } from '@/app/lib/utils/passwordManager';

export default function ImageUploadPage() {
    const inputFileRef = useRef<HTMLInputElement>(null);
    const inputPasswordRef = useRef<HTMLInputElement>(null);
    const [blob, setBlob] = useState<PutBlobResult | null>(null);

    return (
        <div className='flex flex-col justify-center items-center h-screen'>
            <h1>Upload image for gallery</h1>

            <form
                onSubmit={async (event) => {
                    event.preventDefault();

                    if (!inputFileRef.current?.files) {
                        throw new Error("No file selected");
                    }

                    if (!inputPasswordRef.current?.value) {
                        throw new Error("No password provided");
                    }

                    const isPasswordCorrect = await checkPassword(inputPasswordRef.current.value)

                    if (!isPasswordCorrect) {
                        throw new Error("Wrong password");
                    }

                    const file = inputFileRef.current.files[0];

                    const response = await fetch(
                        `/api/image/upload?filename=${file.name}`,
                        {
                            method: 'POST',
                            body: file,
                        },
                    );

                    const newBlob = (await response.json()) as PutBlobResult;

                    setBlob(newBlob);
                }}
            >
                <input name="file" ref={inputFileRef} type="file" required />
                <button className='bg-green-950 ml-8 border border-white rounded-md px-2 py-1 text-white hover:bg-green-950' type="submit">Upload</button>
            </form>
            <div>
                Password
                <input name="password" ref={inputPasswordRef} type="password" required />
            </div>
            {
                blob && (
                    <div>
                        Blob url: <a href={blob.url}>{blob.url}</a>
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