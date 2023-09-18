"use client"

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

import React, {useState} from 'react';
import {wkndIconFont} from "../lib/fonts";

const Carousel = ({children, className}) => {
    const [current, setCurrent] = useState(0);
    const size = children.length;

    return (
        <div className={"relative " + className}>
            <div className="relative overflow-clip w-full touch-pan-x">
                <div
                    className="carousel m-0 p-0 snap-x snap-mandatory flex transition-transform duration-500 ease-in-out"
                    style={{transform: `translateX(-${current * 100}%)`}}>
                    {children}
                </div>
            </div>
            <div className="flex p-2">
                <div className="carousel-dots h-9 flex space-x-3 grow justify-center">
                    {children.map((_, index) => (
                        <button
                            key={index}
                            aria-label={`Go to slid slide-${index}`}
                            onClick={() => {
                                setCurrent(index);
                            }}
                            className={`${index === current ? "bg-black" : "bg-gray-400"} block w-3 h-3 rounded-full focus:outline-none hover:bg-yellow`}
                        ></button>
                    ))}
                </div>
                <div className="h-5 flex space-x-1 flex-none w-25 hidden md:block">
                    <button
                        aria-label="Go to previous slide"
                        onClick={() => setCurrent(current === 0 ? size - 1 : current - 1)}
                        className={wkndIconFont.className + " w-9 h-9 flex-none bg-yellow hover:bg-black hover:text-yellow text-2xl"}>
                        {""}
                    </button>
                    <button
                        aria-label="Go to next slide"
                        onClick={() => setCurrent(current === size - 1 ? 0 : current + 1)}
                        className={wkndIconFont.className + " w-9 h-9 flex-none bg-yellow hover:bg-black hover:text-yellow text-2xl"}>
                        {""}
                    </button>
                </div>
            </div>


        </div>
    );
};

export default Carousel;
