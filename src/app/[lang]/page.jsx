// import '#/../styles/globals.css';

import {cache} from 'react';

import Image from "next/image";
import AdventureCard from "@/components/AdventureCard";
import {AdventureClient} from "@/lib/adventures";
import Carousel from "../../components/Carousel";


const NEXT_PUBLIC_AEM_HOST = process.env.NEXT_PUBLIC_AEM_HOST;
const NEXT_PUBLIC_AEM_ROOT = process.env.NEXT_PUBLIC_AEM_ROOT;

export const revalidate = 43200; // 12 hours in seconds
export const dynamic = 'force-static';
export const fetchCache = 'only-cache';
export const preferredRegion = 'auto';


const getFewAdventures = cache(async () => {
    const client = AdventureClient.fromEnv();
    const res = await client.getAllAdventures();
    const adventures = res?.data?.adventureList?.items;
    return adventures;
});



export async function generateStaticParams() {
    return ["en-US"].map((lang) => ({
        slug: lang,
    }))
}

export default async function Page({params: {lang}}) {

    const adventures = await getFewAdventures(lang);

    const images = [
        'path/to/image1.jpg',
        'path/to/image2.jpg',
        'path/to/image3.jpg',
        // ... add more image URLs as needed
    ];

    return (
        <main className="bg-white py-10 mx-0 sm:py-16">


            <div className="container mx-auto">
                <Carousel images={images} />
            </div>
        </main>)
}
