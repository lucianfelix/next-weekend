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

import Link from 'next/link'
import Image from 'next/image';

export default async function Footer() {
    return (
        <footer className="bg-black text-white px-20 pb-20">
            <div className="flex pt-16 pb-2">
                <Image
                    src="https://wknd.site/content/experience-fragments/wknd/language-masters/en/site/footer/master/_jcr_content/root/container/container/image.coreimg.svg/1594412963641/wknd-logo-light.svg"
                    width={96}
                    height={35}
                    alt="WKND Logo"/>
                <div className="flex justify-between mr-auto ml-10">
                    <Link href="magazine/" className="p-4 hover:underline uppercase">Magazine</Link>
                    <Link href="adventures/" className="p-4 hover:underline uppercase">Adventures</Link>
                    <Link href="faqs/" className="p-4 hover:underline uppercase">Faqs</Link>
                    <Link href="abuutus/" className="p-4 hover:underline uppercase">About Us</Link>
                </div>
                <div className="flex justify-between ml-auto">
                    <div className="p-4">Follow Us</div>
                    <Link href="#facebookwknd" className="p-4 hover:bg-yellow uppercase">Facebook</Link>
                    <Link href="#twitter/" className="p-4 hover:bg-yellow uppercase">Twitter</Link>
                    <Link href="#instagram/" className="p-4 hover:bg-yellow uppercase">Instagram</Link>
                </div>
            </div>
            <div className="text-xs">
                <div className="my-7">Ⓒ 2019, WKND Site.</div>

                <div className="my-7">WKND is a fictitious adventure and travel website created by Adobe to demonstrate
                    how anyone can use
                    Adobe Experience Manager to build a beautiful, feature-rich website over a single weekend. This site
                    is built entirely with Adobe Experience Manager Core Components and Archetype that are available as
                    open source code to the public. The entire site source
                    code is available as open source as well and is accompanied with a detailed tutorial on how to
                    recreate the site.
                </div>

                <div className="my-7">Many of the beautiful images in the WKND site are available for purchase via <a
                    href="https://stock.adobe.com/">Adobe Stock</a>.
                </div>
            </div>
        </footer>
    )
}
