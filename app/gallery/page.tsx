"use client"
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ListBlobResultBlob } from '@vercel/blob';

export default function Home() {
    const router = useRouter();

    const [imageList, setImageList] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(
                `/api/image/list`,
                { method: 'GET' },
            );

            const data = await response.json();
            console.log(data.blobs);
            setImageList(data.blobs);
        }

        fetchData();
    }, [])

    return (
        <div role='main' className='flex justify-center'>
            <button className='absolute top-4 right-8' onClick={() => router.push('/gallery/upload')}>Upload</button>
            <div className='md:mx-8 lg:mx-16 p-4 flex flex-col items-center h-screen align-center justify-center'>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        {imageList.map((image: ListBlobResultBlob, index: number) => (
                            <div key={index} className='w-56'>
                                <Image
                                    className='w-auto h-auto'
                                    src={image.url}
                                    alt={image?.pathname}
                                    width={400} height={400}
                                />
                            </div>
                        ))}
                    </Grid>
                </Box>
            </div>
        </div>
    );
}