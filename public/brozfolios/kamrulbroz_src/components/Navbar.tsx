
import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="bento-card bg-[#ff4e46] flex items-center justify-between px-6 sm:px-8 py-2.5 sm:py-3 sticky-nav shadow-2xl border-none mx-auto w-full">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center overflow-hidden">
          <img 
            src="https://i.ibb.co.com/LDDWcBFs/Picsart-26-01-17-18-12-50-427.png" 
            alt="ALPHABROZ.dev Logo" 
            className="w-full h-full object-contain"
          />
        </div>
        <span className="font-black tracking-tight text-black text-base sm:text-lg">BROZFOLIO</span>
      </div>
      <a 
        href="https://alphabrozdao.vercel.app/" 
        target="_blank" 
        rel="noopener noreferrer"
        className="bg-black text-white px-5 sm:px-6 py-2 sm:py-2.5 rounded-full font-black text-xs sm:text-sm hover:bg-gray-900 transition-all hover:scale-105 active:scale-95 shadow-md border border-black/10 whitespace-nowrap inline-block"
      >
        Visit
      </a>
    </nav>
  );
};

export default Navbar;
