
import React from 'react';

const Mission: React.FC = () => {
  return (
    <section className="bg-[#ff4e46] rounded-[2.5rem] sm:rounded-[3rem] p-8 sm:p-16 lg:p-24 text-black scroll-reveal overflow-hidden relative border-none">
      <div className="relative z-10 w-full">
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black w-full leading-[1.1] tracking-tighter mb-16 sm:mb-24 text-[#fcfbf7]">
          My mission is to assist web3 projects build meaningful connections with their customers by turning complex ideas into clear insights, fostering community engagement and focusing on longterm value.
        </h2>
        <div className="flex flex-wrap gap-x-12 gap-y-8 items-center">
          {['WEB3', 'BITCOIN', 'MARKETING', 'CREATOR', 'ONCHAIN', 'GROWTH'].map((brand) => (
            <span 
              key={brand} 
              className="text-xl sm:text-3xl font-black tracking-tighter uppercase text-black/20"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
      {/* Abstract background shape */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-black/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
    </section>
  );
};

export default Mission;