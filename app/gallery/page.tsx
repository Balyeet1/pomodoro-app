"use client"
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ListBlobResultBlob } from '@vercel/blob';
import { getGallery } from '@/app/lib/data/galleryApi';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Button } from '@mui/material';


export default function Home() {
    const router = useRouter();

    const [imageList, setImageList] = useState<ListBlobResultBlob[]>([]);
    const [isPreviewImageOpen, setIsPreviewImageOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<ListBlobResultBlob | null>(null);

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        async function fetchData() {

            const data = await getGallery();

            setImageList(data);
        }

        fetchData();
    }, [])

    return (
        <div role='main' className='flex justify-center'>
            <Dialog
                fullScreen={fullScreen}
                open={isPreviewImageOpen}
                onClose={() => setIsPreviewImageOpen(false)}
            >
                {selectedImage && <DialogTitle className='text-center'>{selectedImage?.pathname.split('.')[0]}</DialogTitle>}
                {selectedImage && <Image
                    className='w-auto h-auto'
                    src={selectedImage?.url}
                    alt={selectedImage?.pathname}
                    width={400} height={400}
                />
                }
                {fullScreen && <Button onClick={() => setIsPreviewImageOpen(false)}>Close</Button>}
            </Dialog>
            <button className='absolute top-4 right-8' onClick={() => router.push('/gallery/upload')}>Upload</button>
            <div className='md:mx-8 lg:mx-16 p-4 flex flex-col items-center h-screen align-center mt-12'>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container sx={{ display: 'flex', justifyContent: 'center' }} spacing={{ xs: 2, sm: 1, md: 1 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        {imageList.map((image: ListBlobResultBlob, index: number) => (
                            <div key={index} className='w-80 md:w-60'>
                                <Image
                                    className='w-auto h-auto'
                                    src={image.url}
                                    alt={image?.pathname}
                                    width={400} height={400}
                                    onClick={() => {
                                        setSelectedImage(image);
                                        setIsPreviewImageOpen(true);
                                    }}
                                />
                            </div>
                        ))}
                    </Grid>
                </Box>
            </div>
        </div>
    );
}