import { list } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function GET(): Promise<NextResponse> {

    const response = NextResponse.json(await list());

    return response
}
