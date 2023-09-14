/*
 * Copyright 2023 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 *
 */

import AdventureCard from "./AdventureCard";
import {cache} from "react";
import {AdventureClient} from "../lib/adventures";

const getAdventures = cache(async () => {
    //wait 20 seconds
    // await new Promise(r => setTimeout(r, 10000));
    const client = AdventureClient.fromEnv();
    const res = await client.getAllAdventures();
    const adventures = res?.data?.adventureList?.items;
    return adventures;
});

const NEXT_PUBLIC_AEM_HOST = process.env.NEXT_PUBLIC_AEM_HOST;
const NEXT_PUBLIC_AEM_ROOT = process.env.NEXT_PUBLIC_AEM_ROOT;

let categoryFilters = [
    {
        name: 'All',
        predicate: (adventure) => true,
    },
    {
        name: 'One Day',
        predicate: (adventure) => adventure.tripLength === '1 Day',
    },
    {
        name: 'Sport',
        predicate: (adventure) => adventure.title.includes('Ski') || adventure.title.includes('Cycling') || adventure.title.includes('Surf'),
    },
    {
        name: 'Summer',
        predicate: (adventure) => !adventure.title.includes('Ski'),
    },
    {
        name: 'Winter',
        predicate: (adventure) => adventure.title.includes('Ski'),
    },
];

export default async function AdventuresList({lang = '', filterName = 'All'}) {
    const adventures = await getAdventures(lang);
    const filteredAdventures = adventures.filter(categoryFilters.find((filter) => filter.name === filterName).predicate);

    return (<div
            className="p-2 max-w-[1154px] md:px-5 mx-auto grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {filteredAdventures.map(
                ({_path, title, price, tripLength, primaryImage}, index) => {
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
    )
}
