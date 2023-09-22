'use client'

const NEXT_PUBLIC_AEM_HOST = process.env.NEXT_PUBLIC_AEM_HOST;

export default function dynamicmediaImageLoader({ src, width, quality }) {
    // if it doesn't contain 'dynamicmedia' then it's a local image
    if (!src.includes('dynamicmedia')) {
        return src
    }

    // src has the format: '/adobe/dynamicmedia/deliver/dm-aid--a38886f7-4537-4791-aa20-3f6ef0ac3fcd/adobestock_175749320.jpg?quality=80&width=1200&preferwebp=true'
    // remove the query params from the src
    src = src.split('?')[0]

    // if it doesn't contain the host, then it's a relative path
    if (!src.includes(NEXT_PUBLIC_AEM_HOST)) {
        src = `${NEXT_PUBLIC_AEM_HOST}${src}`
    }

    // now add the query params with the width and quality params
    src = `${src}?width=${width}&quality=${quality || 75}`

    return src;


    ///adobe/dynamicmedia/deliver/dm-aid--a38886f7-4537-4791-aa20-3f6ef0ac3fcd/adobestock_175749320.jpg?quality=80&width=1200&preferwebp=true
}
