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
        ],
    }
};

module.exports = nextConfig;
