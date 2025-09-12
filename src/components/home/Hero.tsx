
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="h-screen flex items-center justify-center text-center bg-white text-black">
      <div className="z-10 p-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          가장 쉬운 남친룩의 시작
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          "여자친구가 골라준 듯, 센스 있는 스타일을 만나보세요."
        </p>
        <Link 
          href="/shop" 
          className="inline-block bg-black text-white font-bold py-3 px-8 rounded-full hover:bg-gray-800 transition-all duration-300"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <span className="flex items-center justify-center">
            Shop Now
            <ArrowRight 
              size={20} 
              className={`ml-2 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
            />
          </span>
        </Link>
      </div>
    </section>
  );
};

export default Hero;
