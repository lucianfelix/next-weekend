import {cache} from 'react';

import Image from "next/image";
import {AdventureClient} from "@/lib/adventures";
import Carousel from "../../components/Carousel";
import CarouselItem from "../../components/CarouselItem";
import Link from "next/link";

export const revalidate = 43200; // 12 hours in seconds
export const dynamic = 'force-static';
export const fetchCache = 'only-cache';
export const preferredRegion = 'auto';


const getFewAdventures = cache(async () => {
    const client = AdventureClient.fromEnv();
    const res = await client.getAllAdventures();
    return res?.data?.adventureList?.items;
});


export async function generateStaticParams() {
    return ["en-US"].map((lang) => ({
        lang: lang,
    }))
}

export default async function Page({params: {lang}}) {

    return (
        <main className="bg-white px-0 mx-0">
            <div className="">
                <Carousel className="h-[600px]">
                    <CarouselItem>
                        <div className="mx-0 lg:relative h-[600px]">
                            <Image className="mx-0 w-full"
                                   sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                   quality={75}
                                   eager={true}
                                   priority={true}
                                   loading={'eager'}
                                   alt={'hero'}
                                   src="https://wknd.site/us/en/adventures/_jcr_content/root/container/teaser.coreimg.60.1600.jpeg/1660323801921/adobestock-216674449.jpeg"
                                   width={1275}
                                   height={717}
                            />
                            <div
                                className="lg:absolute lg:bottom-0 max-w-[1136px] m-auto left-0 right-0 mh-5 lg:p-10 p-2 bg-white">
                                <div className="text-xl">WKND Adventures</div>
                                <div className="pt-5 text-base">Join us on one of our next adventures. Browse our list
                                    of curated experiences and sign up for one when you&apos;re ready to explore with
                                    us.
                                </div>
                                <div className="pt-10 pb-0"><Link href="adventures" className="p-4 bg-yellow uppercase">View
                                    Trips</Link></div>
                            </div>

                        </div>
                    </CarouselItem>
                    <CarouselItem>
                        <div className="mx-0 lg:relative h-[600px]">
                            <Image className="mx-0 w-full"
                                   sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                   quality={75}
                                   eager={false}
                                   priority={false}
                                   alt={'hero'}
                                   src="https://wknd.site/us/en/_jcr_content/root/container/carousel/item_1572035298405.coreimg.60.1600.jpeg/1660323822923/beach-walking.jpeg"
                                   width={1275}
                                   height={717}
                            />
                            <div
                                className="lg:absolute lg:bottom-0 max-w-[1136px] m-auto left-0 right-0 mh-5 lg:p-10 p-2 bg-white">
                                <div className="text-xl">San Diego Surf Spots</div>
                                <div className="pt-5 text-base">From the hippie beaches of Ocean Beach to the ritzy
                                    shores of La Jolla and everywhere in between. Discover the San Diego surf scene.
                                </div>
                                <div className="pt-10 pb-0"><Link href="adventures" className="p-4 bg-yellow uppercase">Full
                                    Article</Link></div>
                            </div>
                        </div>
                    </CarouselItem>
                    <CarouselItem>
                        <div className="mx-0 lg:relative h-[600px]">
                            <Image className="mx-0 w-full"
                                   sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                   quality={75}
                                   eager={false}
                                   priority={false}
                                   alt={'hero'}
                                   src="https://wknd.site/us/en/adventures/downhill-skiing-wyoming/_jcr_content/root/container/carousel/image.coreimg.60.1600.jpeg/1660323784078/adobestock-185234795.jpeg"
                                   width={1275}
                                   height={717}
                            />
                            <div
                                className="lg:absolute lg:bottom-0 max-w-[1136px] m-auto left-0 right-0 mh-5 lg:p-10 p-2 bg-white">
                                <div className="text-xl">Downhill Skiing Wyoming</div>
                                <div className="pt-5 text-base">Experience wild untamed, rolling, wide-open terrain of
                                    Wyoming in the winter.
                                </div>
                                <div className="pt-10 pb-0"><Link
                                    href="adventures/downhill-skiing-wyoming/downhill-skiing-wyoming"
                                    className="p-4 bg-yellow uppercase">Full Article</Link></div>
                            </div>
                        </div>
                    </CarouselItem>
                </Carousel>
            </div>
            <div className="p-20">
                The Australian West coast is a camper’s heaven. Endless miles of desert roads leading to secret beaches, vast canyons and crystal clear rivers, and the very few people you are likely to meet on your journey will be some of the most easy-going characters you’ll find anywhere in the world.
            </div>
        </main>)
}
