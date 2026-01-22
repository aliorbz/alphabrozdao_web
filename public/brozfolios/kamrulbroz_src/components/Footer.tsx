
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-8 space-y-4 scroll-reveal">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-6 bento-card p-8 sm:p-16 flex flex-col justify-between min-h-[350px]">
          <h2 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.85] mb-10 text-[#1a1a1a]">Let's connect and chat</h2>
          <div className="flex items-center gap-2 sm:gap-4 group cursor-pointer w-fit max-w-full">
            <a 
              href="mailto:kamrulbroz03@gmail.com"
              className="text-sm sm:text-lg lg:text-xl xl:text-2xl font-black border-b-2 sm:border-b-4 border-black transition-all group-hover:text-indigo-600 group-hover:border-indigo-600 whitespace-nowrap text-black"
            >
              kamrulbroz03@gmail.com
            </a>
            <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gray-900 text-white rounded-full flex-shrink-0 flex items-center justify-center rotate-45 group-hover:rotate-0 transition-transform shadow-lg group-hover:bg-indigo-600">
              →
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-6 bg-[#ff4e46] rounded-[2.5rem] sm:rounded-[3rem] p-10 sm:p-16 flex flex-col items-center justify-center relative overflow-hidden min-h-[400px]">
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 max-w-xl relative z-10">
            {[
              { text: 'FOLLOW ME!', classes: 'bg-black text-white border border-black rotate-[2deg]', url: 'https://x.com/kamrulbroz' },
              { text: 'INSTAGRAM', classes: 'bg-white text-black rotate-[-6deg]' },
              { text: 'COMMUNITY', classes: 'bg-black text-white rotate-[4deg]', url: 'https://alphabrozdao.vercel.app/' },
              { text: 'TELEGRAM', classes: 'bg-white text-black rotate-[-3deg]' },
              { text: 'LINKEDIN', classes: 'bg-black text-white rotate-[8deg]' },
              { text: 'DISCORD', classes: 'bg-white text-black rotate-[-2deg]' },
            ].map((bubble, i) => {
              const Component = bubble.url ? 'a' : 'div';
              return (
                <Component
                  key={i}
                  href={bubble.url}
                  target={bubble.url ? "_blank" : undefined}
                  rel={bubble.url ? "noopener noreferrer" : undefined}
                  className={`px-6 sm:px-8 py-3 sm:py-4 rounded-full text-lg sm:text-xl font-black cursor-pointer hover:scale-110 hover:shadow-2xl transition-all shadow-md ${bubble.classes} block`}
                >
                  {bubble.text}
                </Component>
              );
            })}
          </div>
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(0,0,0,0.05) 0%, transparent 70%)' }}></div>
        </div>
      </div>
      
      <div className="rounded-[2rem] bg-[#323232] flex flex-col md:flex-row items-center justify-between px-8 sm:px-12 py-6 gap-6 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 overflow-hidden flex items-center justify-center">
            <img 
              src="https://i.ibb.co.com/4RrTrG5j/Picsart-26-01-19-16-24-22-721.png" 
              alt="Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <span className="font-black tracking-tighter text-[#ff4e46] text-sm sm:text-base">
            a product of{' '}
            <a 
              href="https://alphabrozdao.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="underline decoration-2 underline-offset-4 hover:opacity-80 transition-opacity"
              title="https://alphabrozdao.vercel.app/"
            >
              ALPHABROZ
            </a>
          </span>
        </div>
        <div className="text-[#ff4e46]/60 font-black text-[10px] sm:text-xs tracking-[0.2em] uppercase text-center">
          © HEAVENLY DESIGN 2026
        </div>
        <div className="flex gap-8">
           <a href="#" className="text-[#ff4e46] hover:text-white font-black text-[10px] sm:text-xs uppercase transition-colors tracking-widest">Privacy</a>
           <a href="#" className="text-[#ff4e46] hover:text-white font-black text-[10px] sm:text-xs uppercase transition-colors tracking-widest">Terms</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
