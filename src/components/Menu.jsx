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

function SearchBox() {
    return (
        <input type="text" placeholder="Search" className="border-2 bg-gray-50 m-2"/>
    )
}

export default async function Menu() {
    return (
        <nav className="sticky top-0 z-50">
            <div className="bg-black p-1 px-3">
                <a href="https://www.adobe.com/" className="text-white uppercase text-s">Sign in</a>
            </div>
            <div className="bg-white flex p-2">
                <Link href="/" className=""><Image
                    src="https://wknd.site/content/experience-fragments/wknd/language-masters/en/site/header/master/_jcr_content/root/container/container_1195249223/image.coreimg.svg/1594412560447/wknd-logo-dk.svg"
                    width={96}
                    height={35}
                    alt="WKND Logo"/>
                </Link>
                <div className="flex justify-between ml-auto">
                    <Link href="/magazine/" className="p-4 hover:bg-yellow uppercase">Magazine</Link>
                    <Link href="/adventures/" className="p-4 hover:bg-yellow uppercase">Adventures</Link>
                    <Link href="/faqs/" className="p-4 hover:bg-yellow uppercase">Faqs</Link>
                    <Link href="/aboutus/" className="p-4 hover:bg-yellow uppercase">About Us</Link>
                </div>
                <SearchBox/>
            </div>
        </nav>
    )
}
