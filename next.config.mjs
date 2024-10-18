/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true,
    sassOptions: {
        implementation: 'sass-embedded',
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '5ipyfff4cb1kurzb.public.blob.vercel-storage.com',
                port: '',
            },
        ],
    }
}

export default nextConfig;
