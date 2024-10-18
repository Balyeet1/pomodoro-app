import { list } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function GET(): Promise<NextResponse> {

    const response = NextResponse.json(await list());

    console.log(response);

    return response
}
