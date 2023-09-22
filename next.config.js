/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        loader: 'custom',
        loaderFile: './src/lib/image/loader.js',
        formats: ['image/avif', 'image/webp'],
        minimumCacheTTL: 600000,
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'publish-p81252-e700817.adobeaemcloud.com',
                // port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'publish-p64257-e147834-cmstg.adobeaemcloud.com',
                // port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'wknd.site',
                // port: '',
                pathname: '/**',
            },
        ],
    },
}

module.exports = nextConfig
