import {cache} from 'react';
import {AdventureClient} from "../../../lib/adventures";
import Image from "next/image";
import HeroArticleCard from "@/components/HeroArticleCard";
import AdventuresList from "../../../components/AdventuresList";

export const revalidate = 43200; // 12 hours in seconds
export const dynamic = 'force-static';
export const fetchCache = 'only-cache';
export const preferredRegion = 'auto';

const client = AdventureClient.fromEnv();

const getAdventures = cache(async () => {
  const res = await client.getAllAdventures();
  const adventures = res?.data?.adventureList?.items;
  return adventures;
});

const heroArticle = {
  title: 'Camping in Western Australia ',
  description: "The Australian West coast is a camper’s heaven. Endless miles of desert roads leading to secret beaches, vast canyons and crystal clear rivers, and the very few people you are likely to meet on your journey will be some of the most easy-going characters you’ll find anywhere in the world. ",
  imageUrl: "https://publish-p64257-e147834-cmstg.adobeaemcloud.com/adobe/dynamicmedia/deliver/dm-aid--784d1ecd-ab6f-4468-a8b6-acfecdcd37db/adobestock_151584995.jpg?width=1920&quality=75",
  href: '/en-US/adventures/beervana-portland/beervana-in-portland'
}

export async function generateStaticParams() {
  return ["en-US"].map((lang) => ({
    lang: lang,
  }))
}

export default async function Page({params: {lang}}) {
  return (
      <main className=" px-4">
        <div className="">
          <div className="max-w-[1154px] mx-auto">
            <h1 className="">Magazine</h1>
            <HeroArticleCard article={heroArticle}/>
            <h1 className="">All Articles</h1>

            <h1 className="">Members Only</h1>
            <h2 className="">Sign in to un-lock exclusive content for WKND members only!</h2>

            <div>
              <div className="mx-0 lg:relative">
                <Image className="mx-0 w-full"
                       sizes="(max-width: 768px) 656w, 80vw"
                       quality={75}
                       eager={"true"}
                       priority={true}
                       loading={'eager'}
                       src="https://publish-p64257-e147834-cmstg.adobeaemcloud.com/adobe/dynamicmedia/deliver/dm-aid--236d4ad1-1b91-42d2-a9f7-9becd0d42fc3/adobestock_196967522.jpg?width=3840&quality=75"
                       width={1275}
                       height={717}
                />
                <div
                    className="lg:absolute lg:bottom-0 lg:text-white max-w-[1136px] m-auto left-0 right-0 mh-5 lg:p-10 p-2 ">
                  <div className="text-xl">Experience the world with us</div>
                  <div className="pt-5 text-base">With WKND Adventures, you don&lsquo;t just see the world
                    -- you
                    experience its cultures, flavors and wonders.
                  </div>
                </div>
              </div>
            </div>

            <h1 className="max-w-[1154px] mx-auto pt-8">
              Our Most Popular Adventures
            </h1>
            <AdventuresList lang={lang} collectionSlug={"popular"} showCategoryPicker={false}/>
          </div>
        </div>
      </main>)
}
