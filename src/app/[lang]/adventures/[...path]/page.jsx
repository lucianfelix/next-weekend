import Image from 'next/image';
import {oaiGetAdventureByPath} from "../../../../lib/headless_openai";
import Script from 'next/script';

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
    const cfPath = `/content/dam/wknd-shared/en/adventures/${params.path.join('/')}`;
    // the url looks like this:
    // https://palma-dev.corp.ethos05-stage-va7.ethos.adobe.net/aem-sites/wknd/gw/cf/fragments/_content_dam_wknd-shared_en_adventures_bali-surf-camp_bali-surf-camp?references=direct
    // double / is intentional

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
        <article data-aue-resource={adventure.id} data-aue-label="Adventure" data-aue-type="reference">
            {/*<script src="https://cdn.jsdelivr.net/gh/adobe/universal-editor-cors/dist/universal-editor-embedded.js"*/}
            {/*        async></script>*/}
            <Script
                strategy="lazyOnload"
                src="https://cdn.jsdelivr.net/gh/adobe/universal-editor-cors/dist/universal-editor-embedded.js"
            />
            <div className="">
                <div className="pt-6">
                    <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 overflow-hidden lg:h-80 lg:aspect-none">
                        <Image
                            src={`${primaryImage._dynamicUrl}`}
                            alt={title}
                            width={600}
                            height={400}
                            // width={`${primaryImage.width}`}
                            // height={`${primaryImage.height}`}
                            loading='eager'
                            priority={true}
                            // loader={dynamicmediaImageLoader}
                            sizes="(max-width: 768px) 350w, (max-width: 1200px) 100vw, 1200w"
                            className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                        />
                    </div>
                    {/* Product info */}
                    <div
                        className="max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
                        <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                            <h1 data-aue-prop="title" data-aue-label="Title" data-aue-type="text" className="text-2xl font-extrabold tracking-tight sm:text-3xl">{title}</h1>
                        </div>

                        {/* Options */}
                        <div className="mt-4 lg:mt-0 lg:row-span-3">
                            <h2 className="text-xl font-extrabold tracking-tight sm:text-3xl">Product information</h2>

                            <dl>
                                <div className="py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                                    <dt className="text-sm font-medium">Activity</dt>
                                    <dd data-aue-prop="activity" data-aue-label="Activity" data-aue-type="text"
                                        className="mt-1 text-sm sm:mt-0 sm:col-span-2">{activity}</dd>
                                </div>
                                <div className="py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                                    <dt className="text-sm font-medium">Type</dt>
                                    <dd data-aue-prop="type" data-aue-type="text" data-aue-label="Type"
                                        className="mt-1 text-sm sm:mt-0 sm:col-span-2">{adventureType}</dd>
                                </div>
                                <div className="py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                                    <dt className="text-sm font-medium">Trip Length</dt>
                                    <dd data-aue-prop="tripLength" data-aue-type="text" data-aue-label="Trip Length"
                                        className="mt-1 text-sm sm:mt-0 sm:col-span-2">{tripLength}</dd>
                                </div>
                                <div className="py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                                    <dt className="text-sm font-medium">Group Size</dt>
                                    <dd data-aue-prop="groupSize" data-aue-label="Group Size" data-aue-type="text"
                                        className="mt-1 text-sm sm:mt-0 sm:col-span-2">{groupSize}</dd>
                                </div>
                                <div className="py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                                    <dt className="text-sm font-medium">Difficulty</dt>
                                    <dd data-aue-prop="difficulty" data-aue-label="Difficulty" data-aue-type="text"
                                        className="mt-1 text-sm sm:mt-0 sm:col-span-2">{difficulty}</dd>
                                </div>
                                <div className="py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                                    <dt className="text-sm font-medium">Price</dt>
                                    <dd data-aue-prop="price" data-aue-label="Price" data-aue-type="text"
                                        className="mt-1 text-sm sm:mt-0 sm:col-span-2">{price}</dd>
                                </div>
                            </dl>
                        </div>
                        <div
                            className="py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">

                            <div className="mt-10 prose lg:prose-l dark:prose-invert">
                                <div data-aue-prop="description" data-aue-label="Description" data-aue-type="text"
                                     className="mt-4" dangerouslySetInnerHTML={{
                                    __html: description,
                                }}/>
                            </div>

                            <div className="mt-10 prose lg:prose-l dark:prose-invert">
                                <h2 className="">Itinerary</h2>

                                <div data-aue-prop="itinerary" data-aue-label="Itinerary" data-aue-type="text" className="mt-4" dangerouslySetInnerHTML={{
                                    __html: itinerary,
                                }}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </article>)
}
