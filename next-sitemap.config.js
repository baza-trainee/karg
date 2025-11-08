module.exports = {
    siteUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "https://dev.karg.kyiv.ua",
    generateRobotsTxt: true,
    changefreq: "monthly",
    priority: 0.7,
    sitemapSize: 5000,
    exclude: ["/auth/login", "/dashboard"],
    robotsTxtOptions: {
        policies: [
            {
                userAgent: "*",
                allow: "/",
                disallow: ["/auth/login", "/dashboard"],
            },
            {
                userAgent: "Yandex",
                disallow: "*/",
            },
        ],
    },
};