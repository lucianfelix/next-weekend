import Image from "next/image";
import Link from "next/link";
import AdventuresList from "../../../../components/AdventuresList";
import {adventureCollections} from "../../../../lib/adventures";

export const revalidate = 43200; // 12 hours in seconds
export const dynamic = 'force-static';
export const fetchCache = 'only-cache';
export const preferredRegion = 'auto';

export async function generateStaticParams() {
    return ["en-US"].map((lang) => {
        return adventureCollections.map((filter) => (
            {
                lang: lang,
                collection: filter.slug,
            }))
    }).flat();
}

export default async function Page({params: {lang, collection}}) {
    return (
        <main className=" px-4">
            <div className="">
                <div className="">
                    <h1 className="max-w-[1154px] mx-auto">Adventures</h1>
                    <div className="mx-0 lg:relative">
                        <Image className="mx-auto h-full"
                               sizes="(max-width: 768px) 656w, (max-width: 1200px) 50vw, 33vw"
                               quality={75}
                               eager={"true"}
                               priority={true}
                               loading={'eager'}
                               alt={'hero'}
                               src="https://publish-p64257-e147834-cmstg.adobeaemcloud.com/adobe/dynamicmedia/deliver/dm-aid--83976ce1-089b-4f4d-ab3e-1be2f72eb0ad/AdobeStock_261097343.jpg?width=3840&quality=75"
                               width={1688}
                               height={1125}
                        />

                        <div
                            className="lg:absolute lg:bottom-0 lg:text-white max-w-[1136px] m-auto left-0 right-0 mh-5 lg:p-10 p-2 ">
                            <h2>Experience the world with us</h2>
                            <div className="pt-5 text-base">With WKND Adventures, you don&lsquo;t just see the world
                                -- you experience its cultures, flavors and wonders.
                            </div>
                        </div>
                    </div>

                    <h1 className="max-w-[1154px] mx-auto pt-9 md:px-5">Our Current Adventures</h1>

                    <AdventuresList lang={lang} collectionSlug={collection}/>

                    <h2 className="max-w-[1154px] mx-auto my-32 md:px-5 text-2xl">
                        No matter which adventure you opt for from our offerings, our expert guides will ensure you have an unforgettable experience.
                    </h2>


                    <div className="max-w-[1154px] mx-auto pb-12">
                        <Link href="/en-US/aboutus" className="ml-5 p-5 btn-yellow">Meet our guides</Link>
                    </div>
                </div>
            </div>
        </main>)
}
