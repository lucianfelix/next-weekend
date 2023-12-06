import '../globals.css'
import {Inter} from 'next/font/google'
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";

const inter = Inter({subsets: ['latin']})

// @ts-ignore
export async function generateMetadata({params: any}) {
    var metadata = {
        title: 'Your Next Weekend',
        description: 'Find the best places to visit this weekend',
        viewport: "width=device-width, initial-scale=1.0, viewport-fit=cover",
        themeColor: "#000002",
        other: {
            'urn:adobe:aue:config:service': "https://hound-absolute-bear.ngrok-free.app/api/aem-sites/wknd/gw/ue",
            'urn:adobe:aue:system:palma': "palmaDemo",
        }
    }
    return metadata;
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body className={inter.className + "bg-white dark:bg-black"}>
        <script src="https://cdn.jsdelivr.net/gh/adobe/universal-editor-cors/dist/universal-editor-embedded.js"
                async></script>
        <Navigation/>
        {children}
        <Footer/>
        {/*<Analytics/>*/}
        </body>
        </html>
    )
}
