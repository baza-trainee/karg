/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: [{ loader: '@svgr/webpack', options: { icon: true } }],
        });
        return config;
    },
    images: {
        domains: ['i.ibb.co', 'iili.io', 'encrypted-tbn0.gstatic.com', 'depositphotos.com'],
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

        ],
    }
};

module.exports = nextConfig;
