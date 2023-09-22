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
import {usePathname} from "next/navigation";

function SearchBox() {
    return (
        <>
            <input type="text" placeholder="Search" className="border-2 bg-gray-50 ml-2 mr-4 p-1 hidden lg:block"/>
            <Link href={"#/en-US/search"}
                  className={wkndIconFont.className + " py-4 px-5 mr-3 text-3xl md:text-xl hover:bg-yellow dark:hover:text-black uppercase block lg:hidden"}></Link>
        </>
    )
}

const navLinks = [
    {
        name: "Home",
        url: "/en-US"
    },
    {
        name: "Magazine",
        url: "/en-US/magazine"
    },
    {
        name: "Adventures",
        url: "/en-US/adventure-collection/all"
    },
    {
        name: "Faqs",
        url: "/en-US/faqs"
    },
    {
        name: "About",
        url: "/en-US/aboutus"
    },
];

export default function Navbar({isOpen, toggle, toggleLogin}) {
    const pathname = usePathname();

    return (
        <nav className="sticky top-0 z-50 shadow-md">
            <div className="bg-black dark:bg-gray-900 p-1 px-3">
                <button onClick={toggleLogin} className="text-white uppercase text-s">Login</button>
            </div>
            <div className="bg-white dark:bg-gray-800 flex items-center h-[80px]">
                <button
                    onClick={toggle} className={wkndIconFont.className + " text-4xl px-3flex items-center text-center md:hidden w-[60px] h-[60px] mr-4"}>
                    {isOpen? "X" : ""}
                </button>
                <Link
                    href="/en-US"
                    className="py-6 md:px-4">
                    <Image
                        className="dark:filter dark:invert"
                        src="https://wknd.site/content/experience-fragments/wknd/language-masters/en/site/header/master/_jcr_content/root/container/container_1195249223/image.coreimg.svg/1594412560447/wknd-logo-dk.svg"
                        width={96}
                        height={35}
                        alt="WKND Logo"/>
                </Link>

                <div className="justify-between ml-auto flex md:hidden">
                </div>
                <div className="hidden md:flex justify-between ml-auto my-2">
                    {navLinks.map((link) => (
                        <Link key={link.url}
                              href={link.url}
                              className={"py-4 px-4 hover:bg-yellow dark:hover:text-black uppercase" +
                                (pathname === link.url ? " underline decoration-4 underline-offset-8 decoration-yellow hover:decoration-black" : "")}
                              prefetch={true}>
                            {link.name}
                        </Link>
                    ))}
                </div>
                <SearchBox/>
            </div>
        </nav>
    )
}
