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
import {wkndIconFont} from "@/lib/fonts";

function SearchBox() {
    return (
        <>
            <input type="text" placeholder="Search" className="border-2 bg-gray-50 mx-2 p-1 hidden lg:block"/>
            <Link href={"#/en-US/search"} className={wkndIconFont.className + " p-4 hover:bg-yellow uppercase block lg:hidden"}></Link>
        </>
    )
}

export default async function Menu() {
    return (
        <nav className="sticky top-0 z-50">
            <div className="bg-black p-1 px-3">
                <a href="https://www.adobe.com/" className="text-white uppercase text-s">Sign in</a>
            </div>
            <div className="bg-white flex px-4 items-center">
                <Link href="/en-US" className={wkndIconFont.className + " py-1 px-3 text-xl"}>
                    
                </Link>
                <Link
                    href="/en-US"
                    className="py-6">
                    <Image
                        src="https://wknd.site/content/experience-fragments/wknd/language-masters/en/site/header/master/_jcr_content/root/container/container_1195249223/image.coreimg.svg/1594412560447/wknd-logo-dk.svg"
                        width={96}
                        height={35}
                        alt="WKND Logo"/>
                </Link>
                <div className="justify-between ml-auto flex md:hidden">
                </div>
                <div className="hidden md:flex justify-between ml-auto my-2">
                    <Link href="/en-US" className="py-4 px-2 hover:bg-yellow uppercase" prefetch={true}>Home</Link>
                    <Link href="/en-US/magazine" className="py-4 px-2 hover:bg-yellow uppercase"
                          prefetch={true}>Magazine</Link>
                    <Link href="/en-US/adventure-collection/all" className="py-4 px-2 hover:bg-yellow uppercase"
                          prefetch={true}>Adventures</Link>
                    <Link href="/en-US/faqs" className="py-4 px-2 hover:bg-yellow uppercase"
                          prefetch={true}>Faqs</Link>
                    <Link href="/en-US/aboutus" className="py-4 px-2 hover:bg-yellow uppercase"
                          prefetch={true}>About</Link>
                </div>
                <SearchBox/>
            </div>
        </nav>
    )
}
