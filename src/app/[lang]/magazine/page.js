import {cache} from 'react';
import {Metadata} from 'next';
import {AdventureClient} from "../../../lib/adventures";
import AdventureCard from "../../../components/AdventureCard";
import Image from "next/image";
import HeroArticleCard from "@/components/HeroArticleCard";
import Link from "next/link";
import * as PropTypes from "prop-types";

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

const heroArticle = {
  title: 'Camping in Western Australia ',
  description: "The Australian West coast is a camper’s heaven. Endless miles of desert roads leading to secret beaches, vast canyons and crystal clear rivers, and the very few people you are likely to meet on your journey will be some of the most easy-going characters you’ll find anywhere in the world. ",
  imageUrl: "https://wknd.site/us/en/magazine/_jcr_content/root/container/teaser_main.coreimg.60.1600.jpeg/1660323792132/adobestock-156407519.jpeg",
  href: '/en-US/adventures/beervana-portland/beervana-in-portland'
}



export default async function Page({params: {lang}}) {

  const adventures = await getAdventures(lang);

  return (
      <main className="">
        <div className="bg-white">
          <div className="max-w-[1154px] mx-auto py-10 sm:py-16">
            <h1 className="">Magazine</h1>
            <HeroArticleCard article={heroArticle}/>
            <h1 className="">All Articles</h1>

            <h1 className="">Members Only</h1>
            <h2 className="">Sign in to un-lock exclusive content for WKND members only!</h2>

            <div>
              <div className="mx-0 lg:relative">
                <Image className="mx-0 w-full"
                       sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                       quality={75}
                       eager={true}
                       priority={true}
                       loading={'eager'}
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
            </div>

            <h1 className="max-w-[1154px] mx-auto pt-8">
              Current Adventures
            </h1>
            <div
                className="max-w-[1154px] mx-auto grid grid-cols-1 p-6 mt-6 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {adventures.map(
                  ({_path, title, price, tripLength, primaryImage, index}) => {
                    const pathItems = _path.split('/');
                    const cfPath = pathItems.slice(Math.max(pathItems.length - 2, 0)).join('/');
                    const href = `/adventures/${cfPath}`;
                    return (
                        <AdventureCard
                            eager={index < 0}
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
