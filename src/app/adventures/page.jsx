// import '#/../styles/globals.css';

import { cache } from 'react';
import { Metadata } from 'next';
import {AdventureClient} from "../../lib/adventures";
import AdventureCard from "../../components/AdventureCard";
import Image from "next/image";

export const revalidate = 60; // revalidate this page every 60 seconds

const NEXT_PUBLIC_AEM_HOST = process.env.NEXT_PUBLIC_AEM_HOST;
const NEXT_PUBLIC_AEM_ROOT = process.env.NEXT_PUBLIC_AEM_ROOT;

const client = AdventureClient.fromEnv();

const getAdventures = cache(async () => {
  const res = await client.getAllAdventures();
  const adventures = res?.data?.adventureList?.items;
  return adventures;
});


export function generateMetadata() {
  return {
    title: 'Sparkle Adventures',
    description: 'Sparkle RSC demo',
    keywords: 'sparkle, rsc, demo, nextjs, react, aem, cards',
    // link: [
    //   {
    //     rel: 'preload',
    //     fetchPriority: "high",
    //     as: 'image',
    //     href: 'bla.jpg',
    //   }
    // ],
  };
}




export default async function Page() {

  const adventures = await getAdventures();

  return (<section className="">
    <div className="bg-white">
      <div className="max-w-2xl px-4 py-10 mx-auto sm:py-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2>
          <div className="text-2xl font-extrabold tracking-tight text-gray-900">Adventures</div>
          <div className="relative">
            <Image className="z-0"
                src="https://wknd.site/us/en/adventures/_jcr_content/root/container/teaser.coreimg.60.1600.jpeg/1660323801921/adobestock-216674449.jpeg"
                width={1275}
                height={717}
            />
            <div className="absolute bottom-0 left-10 right-10 mh-5 p-10 h-40 bg-white z-50">
              <div className="text-xl">Experience the world with us </div>
              <div className="pt-5 text-base">With WKND Adventures, you don't just see the world -- you experience its cultures, flavors and wonders.</div>
            </div>
          </div>
        </h2>

        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 pt-8">
          Current Adventures
        </h2>
        <div className="grid grid-cols-1 mt-6 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {adventures.map(
            ({ _path, title, price, tripLength, primaryImage }) => {
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
  </section>)
}
