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
// const baseUrl = 'http://localhost:8080/';
const baseUrl = 'https://palma-dev-public.ethos14-stage-va7.ethos.adobe.net/';
const cfApiPath = 'aem-sites/hlx/dev/cf/graphql';

export class ProjectionsClient {
    static fromEnv(env = process.env) {
        if (!this.__envClient) {
            const {NEXT_PUBLIC_AEM_HOST, NEXT_GRAPHQL_ENDPOINT} = env;
            // console.log('Using AEM host: ' + NEXT_PUBLIC_AEM_HOST + ' and GraphQL endpoint: ' + NEXT_GRAPHQL_ENDPOINT);
            this.__envClient = new ProjectionsClient({
                serviceURL: NEXT_PUBLIC_AEM_HOST,
                endpoint: NEXT_GRAPHQL_ENDPOINT,
            });
        }
        return this.__envClient;
    }

    constructor({serviceURL, endpoint}) {
        this.aemHeadlessClient = new AEMHeadless({
            endpoint : cfApiPath,
            serviceURL : baseUrl,
            // auth: ['admin', 'admin'],
            fetch
        });
    }

    async getPageFragment(path) {
        const query = `{
          Page(rootId: "${path}") {
            _id
            title
            description
            sections {
              _id
              __typename
              blocks {
                __typename
                ... on TextBlock {
                  _id
                  content
                }
                ... on CardsBlock {
                  _id
                  cards {
                    _id
                    title
                    content
                  }
                }
              }
            }
          }
        }`;

        return await this.aemHeadlessClient.runQuery(query);
    }
}
