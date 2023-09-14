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

export default async function AdventureCard({eager, href, title, price, duration, imageSrc}) {
    return (
        <div className="group relative">
            <Link href={href}>
                <div
                    className="min-h-32 aspect-w-2 aspect-h-1  overflow-hidden group-hover:contrast-125 h-52 md:h-80 lg:aspect-none text-white">
                    <div class="absolute top-0 left-0 right-0 bottom-0">
                        <Image
                            src={imageSrc}
                            alt={title}
                            width={542}
                            height={605}
                            priority={eager}
                            loading={eager ? 'eager' : 'lazy'}
                            sizes="50vw"
                            className="rounded-md w-full h-full object-center object-cover lg:w-full lg:h-full"
                        />
                    </div>
                    <div className="absolute text-sm left-6 bottom-4">
                        {duration}
                    </div>
                    <div className="absolute text-sm right-6 bottom-4">
                        {price}
                    </div>
                    <h3 className="absolute left-6 top-4 font-semibold text-gray-100 inset-0">
                        {title}
                    </h3>
                </div>
            </Link>
        </div>
    )
}
