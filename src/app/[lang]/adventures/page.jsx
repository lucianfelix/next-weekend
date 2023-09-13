import {Suspense} from 'react';
import Image from "next/image";
import Link from "next/link";
import AdventuresList from "../../../components/AdventuresList";

export const revalidate = 43200; // 12 hours in seconds
export const dynamic = 'force-static';
export const fetchCache = 'only-cache';
export const preferredRegion = 'auto';

export async function generateStaticParams() {
    console.log('generateStaticParams faq');
    return ["en-US"].map((lang) => ({
        lang: lang,
    }))
}


export default async function Page({params: {lang}}) {
    return (
        <main className="">
            <div className="bg-white md:px-0 px-5">
                <div className="py-10 mx-0 sm:py-16">
                    <h1 className="max-w-[1154px] mx-auto md:px-5">Adventures</h1>
                    <div className="mx-0 lg:relative">
                        <Image className="mx-0 w-full"
                               sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                               quality={75}
                               eager={"true"}
                               priority={true}
                               loading={'eager'}
                               alt={'hero'}
                               src="https://wknd.site/us/en/adventures/_jcr_content/root/container/teaser.coreimg.60.1600.jpeg/1660323801921/adobestock-216674449.jpeg"
                               width={1275}
                               height={717}
                        />

                        <div
                            className="lg:absolute lg:bottom-0 max-w-[1136px] m-auto left-0 right-0 mh-5 lg:p-10 p-2 bg-white">
                            <h2>Experience the world with us</h2>
                            <div className="pt-5 text-base">With WKND Adventures, you don&lsquo;t just see the world
                                -- you experience its cultures, flavors and wonders.
                            </div>
                        </div>
                    </div>

                    <h1 className="max-w-[1154px] mx-auto pt-8  md:px-5">Current Adventures</h1>

                    <Suspense fallback={<div>Your adventures are on the way...</div>}>
                        <AdventuresList lang={lang}/>
                    </Suspense>
                </div>
            </div>
        </main>)
}
