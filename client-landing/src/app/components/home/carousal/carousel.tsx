'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const images: string[] = [
  '/home/carousal/images/image1.avif',
  '/home/carousal/images/image2.avif',
  '/home/carousal/images/image3.avif',
  '/home/carousal/images/image4.avif',
  '/home/carousal/images/image5.avif',
  '/home/carousal/images/image6.avif',
  '/home/carousal/images/image7.avif',
  '/home/carousal/images/image8.avif',
];

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-[90%] h-64 mx-auto overflow-hidden rounded-xl shadow-lg mt-20">
      {/* Slides */}
      <div
        className="flex transition-transform duration-500 h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((src: string, index: number) => (
          <div key={index} className="min-w-full h-full relative">
            <Image
              src={src}
              alt={`Slide ${index + 1}`}
              fill
              className="object-cover rounded-xl"
              quality={90}
              sizes="(max-width: 768px) 100vw, 90vw"
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 right-5 flex gap-2">
        {images.map((_, index: number) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 ${
              index === currentIndex
                ? 'w-6 h-3 rounded-full bg-gray-800'
                : 'w-3 h-3 rounded-full bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
