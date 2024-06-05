/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    async redirects() {
        return [
            {
                source: '/register',
                destination: '/register/candidate',
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
