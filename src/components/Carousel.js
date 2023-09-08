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

import Link from 'next/link'
import Image from 'next/image';

import React from 'react';

const Carousel = ({ images }) => {
    return (
        <div className="relative w-full overflow-hidden">
            <div className="carousel w-full flex transition-transform duration-500 ease-in-out">
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`carousel-item-${index}`}
                        className="w-full"
                    />
                ))}
            </div>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 space-x-3 flex">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            const carousel = document.querySelector('.carousel');
                            carousel.style.transform = `translateX(-${index * 100}%)`;
                        }}
                        className="w-3 h-3 bg-gray-400 rounded-full focus:outline-none focus:bg-gray-600"
                    ></button>
                ))}
            </div>
        </div>
    );
};

export default Carousel;
