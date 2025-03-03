'use client';
import React, { useState, useRef, useEffect } from 'react';
import data from '../helpers/data';
import Image from 'next/image';

const Carrusel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const changeImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
  };

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(changeImage, 7000); 

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []); 

  const scrollToImage = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setCurrentIndex((prevIndex) => (prevIndex === 0 ? data.length - 1 : prevIndex - 1));
    } else {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
    }
  };

  return (
    <div className="relative w-full h-[200px] sm:h-[300px] md:h-[400px] overflow-hidden">
      <div className="relative w-full h-full">
        <Image
          src={data[currentIndex]?.imgUrl || ""}
          alt={`Imagen ${data[currentIndex]?.id}`}
          fill 
          objectFit="cover"
          priority={true}
          className="transition-opacity duration-500"
        />
      </div>

      <button
        className="absolute top-1/2 left-2 sm:left-4 transform -translate-y-1/2 bg-salmon text-background p-2 sm:p-3 rounded-lg cursor-pointer z-10 hover:bg-rose-300"
        onClick={() => scrollToImage("prev")}
      >
        ❮
      </button>

      <button
        className="absolute top-1/2 right-2 sm:right-4 transform -translate-y-1/2 bg-salmon text-background p-2 sm:p-3 rounded-lg cursor-pointer z-10 hover:bg-rose-300"
        onClick={() => scrollToImage("next")}
      >
        ❯
      </button>

      <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {data.map((_, idx) => (
          <button
            key={idx}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all ${
              idx === currentIndex ? "bg-salmon" : "bg-rose-300"
            }`}
            onClick={() => setCurrentIndex(idx)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carrusel;