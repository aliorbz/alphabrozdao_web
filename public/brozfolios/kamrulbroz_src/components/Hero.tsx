
import React from 'react';

const Hero: React.FC = () => {
  const socialIcons = [
    { name: 'x', domain: 'x.com', url: 'https://x.com/kamrulbroz' },
    { name: 'linkedin', domain: 'linkedin.com' },
    { name: 'telegram', domain: 't.me' },
    { name: 'discord', domain: 'discord.com' },
    { name: 'facebook', domain: 'facebook.com' },
    { name: 'github', domain: 'github.com' }
  ];

  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-4 scroll-reveal">
      {/* Left Text Part */}
      <div className="lg:col-span-7 bento-card p-6 sm:p-10 lg:p-16 flex flex-col justify-center min-h-[400px] sm:min-h-[500px] !bg-[#fcfbf7]">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#E8F5F5] text-[#2D9B9B] rounded-full text-[10px] sm:text-xs font-bold mb-6 sm:mb-8 w-fit">
          <span className="w-1.5 h-1.5 rounded-full bg-[#2D9B9B] animate-pulse"></span>
          AVAILABLE FOR WORK
        </div>
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-[#1a1a1a] leading-[1.1] sm:leading-[0.9] tracking-tighter mb-6 sm:mb-8">
          Hi, I'm KAMRUL<span className="text-2xl sm:text-4xl align-top ml-1">©</span>
        </h1>
        <p className="text-black text-base sm:text-xl max-w-md mb-8 leading-relaxed font-medium">
          I actively study and engage with the Web3 ecosystem, with a strong focus on understanding how different protocols, products, and communities evolve.
        </p>
        <a 
          href="#contact" 
          className="bg-[#1a1a1a] text-white w-full sm:w-fit px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform active:scale-95 text-center block"
        >
          Contact Me
        </a>
      </div>

      {/* Right Visual Part */}
      <div className="lg:col-span-5 grid grid-cols-1 gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="bento-card p-4 sm:p-6 flex flex-col justify-between overflow-hidden relative min-h-[180px] !bg-[#fcfbf7]">
             <div className="z-10">
                <h3 className="font-bold text-sm sm:text-xl leading-tight text-black">kamrulbroz</h3>
                <p className="text-black/60 text-[10px] sm:text-sm font-semibold">UTC +6</p>
             </div>
             <img 
               src="https://pbs.twimg.com/media/G7V6lc0aMAAbjEw?format=jpg&name=medium" 
               className="absolute -bottom-4 -right-4 w-24 h-24 sm:w-40 sm:h-40 object-cover rounded-xl rotate-12 opacity-80" 
             />
             <div className="mt-auto z-10 pt-4">
                <div className="bg-gray-100 p-1.5 rounded-lg text-[8px] sm:text-[10px] font-bold inline-flex items-center gap-1 w-fit text-black">
                    <span>⚡ EXPERT</span>
                </div>
             </div>
          </div>
          <div className="bento-card overflow-hidden min-h-[180px]">
             <img 
               src="https://i.ibb.co.com/Tqd22F3X/Picsart-25-10-01-21-53-37-681-Picsart-Ai-Image-Enhancer.jpg" 
               className="w-full h-full object-cover" 
               alt="Kamrul Portrait" 
             />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[#ff4e46] rounded-[1.5rem] sm:rounded-[2rem] p-4 sm:p-6 text-black flex flex-col justify-between min-h-[160px] relative overflow-hidden">
            {/* Decoration Image - One fourth visible on top right */}
            <img 
              src="https://i.ibb.co.com/LDDWcBFs/Picsart-26-01-17-18-12-50-427.png" 
              className="absolute -top-10 -right-10 w-32 h-32 opacity-20 pointer-events-none object-contain"
              alt=""
            />
            
            <div className="relative z-10">
              <p className="text-base sm:text-xl lg:text-2xl font-black uppercase tracking-[0.25em] mb-2 sm:mb-4">CEO</p>
            </div>
            <div className="flex flex-col gap-1 relative z-10">
               <span className="font-black text-xs sm:text-xl tracking-tighter">ALPHABROZ</span>
               <span className="font-black text-xs sm:text-xl tracking-tighter italic">dao</span>
            </div>
          </div>
          <div className="bento-card p-3 sm:p-6 grid grid-cols-3 gap-2 sm:gap-3 place-items-center !bg-[#fcfbf7]">
            {socialIcons.map((icon) => (
              <a 
                key={icon.name} 
                href={icon.url || "#"} 
                target={icon.url ? "_blank" : undefined}
                rel={icon.url ? "noopener noreferrer" : undefined}
                className="w-full aspect-square bg-gray-50/50 rounded-xl sm:rounded-2xl flex items-center justify-center hover:bg-gray-100 cursor-pointer transition-colors group border border-black/5"
              >
                <img 
                  src={`https://www.google.com/s2/favicons?domain=${icon.domain}&sz=128`} 
                  className="w-5 h-5 sm:w-8 sm:h-8 grayscale group-hover:grayscale-0 transition-all" 
                  alt={`${icon.name} icon`}
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
