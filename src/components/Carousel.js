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

const Carousel = ({children, className}) => {
    const [current, setCurrent] = useState(0);
    const size = children.length;
    //h-[250px]
    return (
        <div className={"relative overflow-clip " + className}>
            <div
                className="carousel m-0 p-0 snap-x snap-mandatory flex transition-transform duration-500 ease-in-out">
                {children}
            </div>
            <div className="carousel-dots absolute bottom-4 left-1/2 transform -translate-x-1/2 space-x-3 flex">
                {children.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            const carousel = document.querySelector('.carousel');
                            carousel.style.transform = `translateX(-${index * 100}%)`;
                            setCurrent(index);
                        }}
                        className="w-3 h-3 bg-gray-400 rounded-full focus:outline-none focus:bg-gray-600"
                    ></button>
                ))}
            </div>
            <button
                onClick={() => {
                    if (current === 0) {
                        setCurrent(size - 1);
                    } else {
                        setCurrent(current - 1);
                    }
                    const carousel = document.querySelector('.carousel');
                    carousel.style.transform = `translateX(-${current * 100}%)`;

                    const carouselDots = document.querySelector('.carousel-dots');
                    // focus on the current dot
                    carouselDots.children[current].focus();
                }}
                className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/2 bg-gray-400 rounded-full focus:outline-none focus:bg-gray-600"
            >back
            </button>
            <button
                onClick={() => {
                    if (current === size - 1) {
                        setCurrent(0);
                    } else {
                        setCurrent(current + 1);
                    }
                    const carousel = document.querySelector('.carousel');
                    carousel.style.transform = `translateX(-${current * 100}%)`;

                    const carouselDots = document.querySelector('.carousel-dots');
                    // focus on the current dot
                    carouselDots.children[current].focus();
                }}
                className="absolute top-1/2 right-0 transform -translate-y-1/2 -translate-x-1/2 bg-gray-400 rounded-full focus:outline-none focus:bg-gray-600"
            >next
            </button>
        </div>
    );
};

export default Carousel;
