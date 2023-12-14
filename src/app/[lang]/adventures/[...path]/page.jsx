import Image from 'next/image';
import {cache} from 'react';
import {AdventureClient, NEXT_PUBLIC_AEM_HOST} from "../../../../lib/adventures";
import dynamicmediaImageLoader from "../../../../lib/image/loader";
import {oaiGetAdventureByPath} from "../../../../lib/headless_openai";


// CDN cache currently only works on nodejs runtime
export const runtime = "nodejs";

export const dynamic = "force-static";

export const revalidate = 43200; // 12 hours in seconds
// export const dynamic = 'force-static';
// export const fetchCache = 'only-cache';
// export const preferredRegion = 'auto';

// export const dynamic = 'force-dynamic'

// Return a list of `params` to populate the [slug] dynamic segment
// export async function generateStaticParams() {
//     const client = AdventureClient.fromEnv();
//     const res = await client.getAllAdventures();
//     const adventures = res?.data?.adventureList?.items;
//
//     return adventures.map((adventure) => {
//         const pathItems = adventure._path.split('/');
//         return {
//             lang: 'en-US',
//             path: [pathItems[pathItems.length - 2], pathItems[pathItems.length - 1]],
//         }
//     })
// }

// const getAdventureByPath = cache(async (path) => {
//     const client = AdventureClient.fromEnv();
//     const res = await getAdventureByPath(path);
//     const adventure = res?.data?.adventureByPath?.item;
//     return adventure;
// });

export default async function Page({params}) {
    // console.log("Rendering "+ params.path[0] + "/" + params.path[1] + "/page.jsx");
    const cfPath = `/content/dam/wknd-shared/en/adventures/${params.path.join('/')}`;
    // const adventure = await getAdventureByPath(cfPath);


    // https://palma-dev.corp.ethos05-stage-va7.ethos.adobe.net/aem-sites/wknd/gw/cf/fragments/_content_dam_wknd-shared_en_adventures_bali-surf-camp_bali-surf-camp?references=direct

    const adventure = await oaiGetAdventureByPath(cfPath);
    if (!adventure) return (<>Adventure not found</>);

    const {
        title,
        activity,
        adventureType,
        price,
        tripLength,
        groupSize,
        difficulty,
        primaryImage,
        description,
        itinerary,
    } = adventure;
    return (
        <article itemScope itemID={adventure.id} itemType="reference">
            <div className="">
                <div className="pt-6">

                    <div
                        className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 overflow-hidden lg:h-80 lg:aspect-none">
                        <Image
                            src={`${primaryImage._dynamicUrl}`}
                            alt={title}
                            width={600}
                            height={400}
                            // width={`${primaryImage.width}`}
                            // height={`${primaryImage.height}`}
                            loading='eager'
                            // loader={dynamicmediaImageLoader}
                            sizes="(max-width: 768px) 656w, (max-width: 1200px) 100vw, 1200w"
                            className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                        />
                    </div>

                    {/* Product info */}
                    <div
                        className="max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
                        <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                            <h1 itemProp="title" itemType="text" className="text-2xl font-extrabold tracking-tight sm:text-3xl">{title}</h1>
                        </div>

                        {/* Options */}
                        <div className="mt-4 lg:mt-0 lg:row-span-3">
                            <h2 className="sr-only">Product information</h2>

                            <p itemProp="price" itemType="text" className="text-3xl mb-10">{price}</p>
                            <dl>
                                <div className="py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                                    <dt className="text-sm font-medium">Activity</dt>
                                    <dd itemProp="activity" itemType="text" className="mt-1 text-sm sm:mt-0 sm:col-span-2">{activity}</dd>
                                </div>
                                <div className="py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                                    <dt className="text-sm font-medium">Type</dt>
                                    <dd itemProp="type" itemType="text" className="mt-1 text-sm sm:mt-0 sm:col-span-2">{adventureType}</dd>
                                </div>
                                <div className="py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                                    <dt  className="text-sm font-medium">Trip Length</dt>
                                    <dd itemProp="tripLength" itemType="text" className="mt-1 text-sm sm:mt-0 sm:col-span-2">{tripLength}</dd>
                                </div>
                                <div className="py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                                    <dt  className="text-sm font-medium">Group Size</dt>
                                    <dd itemProp="groupSize" itemType="text" className="mt-1 text-sm sm:mt-0 sm:col-span-2">{groupSize}</dd>
                                </div>
                                <div className="py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                                    <dt className="text-sm font-medium">Difficulty</dt>
                                    <dd itemProp="difficulty" itemType="text" className="mt-1 text-sm sm:mt-0 sm:col-span-2">{difficulty}</dd>
                                </div>
                            </dl>

                        </div>

                        <div
                            className="py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">

                            <div className="mt-10 prose lg:prose-l dark:prose-invert">
                                <div itemProp="description" itemType="text" className="mt-4" dangerouslySetInnerHTML={{
                                    __html: description,
                                }}/>
                            </div>

                            <div className="mt-10 prose lg:prose-l dark:prose-invert">
                                <h2 className="">Itinerary</h2>

                                <div itemProp="itinerary" itemType="text" className="mt-4" dangerouslySetInnerHTML={{
                                    __html: itinerary,
                                }}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </article>)
}
