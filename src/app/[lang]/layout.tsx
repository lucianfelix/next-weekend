import '../globals.css'
import {Inter} from 'next/font/google'
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({subsets: ['latin']})

// @ts-ignore
// export async function generateMetadata({params: any}) {
//     const metadata = {
//         title: 'Your Next Weekend',
//         description: 'Find the best places to visit this weekend',
//         other: {
//             viewport: "width=device-width, initial-scale=1.0, viewport-fit=cover",
//             themeColor: "#000002",
//             'urn:adobe:aue:config:service': "https://palma-dev-public.ethos14-stage-va7.ethos.adobe.net/api/aem-sites/wknd/gw/ue",
//             'urn:adobe:aue:system:palma': "palmaDemo",
//         }
//     };
//     return metadata;
// }

export const metadata: Metadata = {
    title: 'Your Next Weekend',
    description: 'Find the best places to visit this weekend',
    other: {
        viewport: "width=device-width, initial-scale=1.0, viewport-fit=cover",
        themeColor: "#000002",
        'urn:adobe:aue:config:service': "https://palma-dev-public.ethos14-stage-va7.ethos.adobe.net/api/aem-sites/wknd/gw/ue",
        'urn:adobe:aue:system:palma': "palmaDemo",
    }
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body className={inter.className + "bg-white dark:bg-black"}>
        <Navigation/>
        {children}
        <Footer/>
        <Analytics/>
        <SpeedInsights />
        </body>
        </html>
    )
}
