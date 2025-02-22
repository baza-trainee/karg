/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: [{ loader: '@svgr/webpack', options: { icon: true } }],
        });
        return config;
    },
    env: {
        NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    },
    images: {
        domains: ['i.ibb.co', 'iili.io', 'freeimage.host', 'dev.karg.kyiv.ua'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'upload.wikimedia.org',
            },
            {
                protocol: 'https',
                hostname: 'dailylviv.com',
            },
            {
                protocol: 'https',
                hostname: 'media.istockphoto.com'
            },
            {
                protocol: 'https',
                hostname: 'turtlerescueleague.org'
            },
            {
                protocol: 'https',
                hostname: 'storinka.com.ua'
            },
            {
                protocol: 'https',
                hostname: 'dev.karg.kyiv.ua'
            },

        ],
    }
};

module.exports = nextConfig;
