// import '#/../styles/globals.css';

import {cache} from 'react';
import {Metadata} from 'next';
import {AdventureClient} from "../../../lib/adventures";
import AdventureCard from "../../../components/AdventureCard";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 43200; // 12 hours in seconds
export const dynamic = 'force-static';
export const fetchCache = 'only-cache';
export const preferredRegion = 'auto';

const NEXT_PUBLIC_AEM_HOST = process.env.NEXT_PUBLIC_AEM_HOST;
const NEXT_PUBLIC_AEM_ROOT = process.env.NEXT_PUBLIC_AEM_ROOT;

const client = AdventureClient.fromEnv();

const getAdventures = cache(async () => {
    const res = await client.getAllAdventures();
    const adventures = res?.data?.adventureList?.items;
    return adventures;
});

export default async function Page({params: {lang}}) {

    const adventures = await getAdventures(lang);

    return (
        <main className="">
            <div className="bg-white">
                <div className="py-10 mx-0 sm:py-16">
                    <h2>
                        <div className="text-2xl font-extrabold tracking-tight text-gray-900">Adventures</div>
                        <div className="mx-0 lg:relative">
                            <Image className="mx-0 w-full"
                                   src="https://wknd.site/us/en/adventures/_jcr_content/root/container/teaser.coreimg.60.1600.jpeg/1660323801921/adobestock-216674449.jpeg"
                                   width={1275}
                                   height={717}
                            />
                            <div
                                className="lg:absolute lg:bottom-0 max-w-[1136px] m-auto left-0 right-0 mh-5 lg:p-10 p-2 bg-white">
                                <div className="text-xl">Experience the world with us</div>
                                <div className="pt-5 text-base">With WKND Adventures, you don&lsquo;t just see the world
                                    -- you
                                    experience its cultures, flavors and wonders.
                                </div>
                            </div>
                        </div>
                    </h2>

                    <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 pt-8">
                        Current Adventures
                    </h2>
                    <div
                        className="grid grid-cols-1 p-6 mt-6 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {adventures.map(
                            ({_path, title, price, tripLength, primaryImage}) => {
                                const pathItems = _path.split('/');
                                const cfPath = pathItems.slice(Math.max(pathItems.length - 2, 0)).join('/');
                                const href = `/adventures/${cfPath}`;
                                return (
                                    <AdventureCard
                                        key={_path}
                                        href={href}
                                        title={title}
                                        price={price}
                                        duration={tripLength}
                                        imageSrc={`${NEXT_PUBLIC_AEM_HOST}${primaryImage._path}`}
                                    />
                                );
                            }
                        )}
                    </div>
                </div>
            </div>
        </main>)
}
