"use server"
import { list, ListBlobResultBlob } from '@vercel/blob';

export const getGallery = async (): Promise<ListBlobResultBlob[]> => {
    const response = (await list()).blobs;

    return response;
}