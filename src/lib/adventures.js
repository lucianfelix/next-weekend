/*
 * Copyright 2022 Adobe. All rights reserved.
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

import AEMHeadless from '@adobe/aem-headless-client-js';
import {cache} from "react";

export const NEXT_PUBLIC_AEM_HOST = process.env.NEXT_PUBLIC_AEM_HOST;
// export const NEXT_PUBLIC_AEM_ROOT = process.env.NEXT_PUBLIC_AEM_ROOT;

export const adventureCollections = [
    {
        name: 'All',
        slug: 'all',
        imageUrl: 'https://publish-p64257-e147834-cmstg.adobeaemcloud.com/adobe/dynamicmedia/deliver/dm-aid--b9ef1d9a-4716-4e5e-be53-2c246df97cbd/surfing_5.jpg?width=3840&quality=75',
        predicate: (adventure) => true,
    },
    {
        name: 'One Day',
        slug: 'one-day',
        imageUrl: "https://publish-p64257-e147834-cmstg.adobeaemcloud.com/adobe/dynamicmedia/deliver/dm-aid--98b83ffc-1739-46ed-a837-b3662067499f/adobestock_277654931.jpg?width=3840&quality=75",
        predicate: (adventure) => adventure.tripLength === '1 Day',
    },
    {
        name: 'Sport',
        slug: 'sport',
        imageUrl: "https://publish-p64257-e147834-cmstg.adobeaemcloud.com/adobe/dynamicmedia/deliver/dm-aid--70afb5ab-c32b-4574-be75-4cc001101e39/adobestock_185234795.jpg?width=3840&quality=75",
        predicate: (adventure) => adventure.title.includes('Ski') || adventure.title.includes('Cycling') || adventure.title.includes('Surf'),
    },
    {
        name: 'Summer',
        slug: 'summer',
        imageUrl: "https://publish-p64257-e147834-cmstg.adobeaemcloud.com/adobe/dynamicmedia/deliver/dm-aid--236d4ad1-1b91-42d2-a9f7-9becd0d42fc3/adobestock_196967522.jpg?width=3840&quality=75",
        predicate: (adventure) => !adventure.title.includes('Ski'),
    },
    {
        name: 'Winter',
        slug: 'winter',
        imageUrl: "https://publish-p64257-e147834-cmstg.adobeaemcloud.com/adobe/dynamicmedia/deliver/dm-aid--58eac022-f1e8-4fec-b0bd-636cba2aae67/adobestock_222643220.jpg?width=3840&quality=75",
        predicate: (adventure) => adventure.title.includes('Ski'),
    },
    {
        name: 'Most Popular',
        slug: 'popular',
        imageUrl: "https://publish-p64257-e147834-cmstg.adobeaemcloud.com/adobe/dynamicmedia/deliver/dm-aid--fcdbbc12-8057-4d1f-aff8-9325e25dda32/adobestock_270835979.jpg?width=3840&quality=75",
        predicate: (adventure) => adventure.title.includes('surf')
            || adventure.title.includes('Tour')
            || adventure.title.includes('Cycling'),
    },
];

export const getAdventures = cache(async (lang) => {
    // await new Promise(r => setTimeout(r, 10000));
    const client = AdventureClient.fromEnv();
    const res = await client.getAllAdventures();
    return res?.data?.adventureList?.items;
});

export class AdventureClient {
    static fromEnv(env = process.env) {
        if (!this.__envClient) {
            const {NEXT_PUBLIC_AEM_HOST, NEXT_GRAPHQL_ENDPOINT} = env;
            // console.log('Using AEM host: ' + NEXT_PUBLIC_AEM_HOST + ' and GraphQL endpoint: ' + NEXT_GRAPHQL_ENDPOINT);
            this.__envClient = new AdventureClient({
                serviceURL: NEXT_PUBLIC_AEM_HOST,
                endpoint: NEXT_GRAPHQL_ENDPOINT,
            });
        }
        return this.__envClient;
    }

    constructor({serviceURL, endpoint}) {
        this.aemHeadlessClient = new AEMHeadless({
            serviceURL,
            endpoint,
            auth: ['admin', 'admin'], // TODO: dynamically set auth based on AEM instance
            fetch
        });
    }

    async getAllAdventures() {
        const queryAdventuresAll = 'aem-demo-assets/adventures-all?a=1';
        // const res1 = await this.aemHeadlessClient.listPersistedQueries()
        // console.log('res1', res1);
        const res = await this.aemHeadlessClient.runPersistedQuery(queryAdventuresAll);
        return res;
    }

    async getAdventurePaths() {
        const res = await this.getAllAdventures();
        const adventures = res?.data?.adventureList?.items || [];
        const paths = adventures.map((item) => ({
            params: {
                path: [item.slug],
            }
        }));
        return paths;
    }

    async getAdventureByPath(path) {
        const query = `{
      adventureByPath (_path: "${path}") {
        item {
            _path
            title
            activity
            adventureType
            price
            tripLength
            groupSize
            difficulty
            primaryImage {
              ... on ImageRef {
                    _authorUrl
                    _dynamicUrl
                    _path
                    _publishUrl
                    height
                    mimeType
                    type
                    width
              }
            }
            description {
              html
            }
            itinerary {
              html
            }
        }
      }
    }
    `;
        const res = await this.aemHeadlessClient.runQuery(query);
        return res;
    }
}
