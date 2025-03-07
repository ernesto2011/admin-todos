/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns:[
            {
                protocol: 'https',
                hostname: 'encrypted-tbn0.gstatic.com',
               
            },
            {
                protocol: 'https',
                hostname: 'img.freepik.com',

            },
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com'
            },
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com'
            }
        ]
    },
};

export default nextConfig;
