
import {ProjectionsClient} from "@/lib/projections";
import {Metadata} from "next";


export const metadata: Metadata = {
    title: 'Your Next Weekend',
    description: 'Find the best places to visit this weekend',
    other: {
        viewport: "width=device-width, initial-scale=1.0, viewport-fit=cover",
        themeColor: "#000002",
        'urn:adobe:aue:config:service': "https://palma-dev-public.ethos14-stage-va7.ethos.adobe.net/api/aem-sites/hlx/dev/ue",
        'urn:adobe:aue:system:palma': "palma",
    }
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body>
        {children}
        </body>
        </html>
    )
}
