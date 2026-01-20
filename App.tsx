
import React, { useRef, useEffect } from 'react';
import { ArrowUpRight, Mail } from 'lucide-react';

/**
 * Custom X (Twitter) icon
 */
const XIcon = ({ className, style }: { className?: string, style?: React.CSSProperties }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className} style={style} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
  </svg>
);

/**
 * Custom Discord icon
 */
const DiscordIcon = ({ className, style }: { className?: string, style?: React.CSSProperties }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className} style={style} fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037 19.736 19.736 0 0 0-4.885 1.515.069.069 0 0 0-.032.027C.533 9.048-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.125-.094.249-.192.37-.293a.074.074 0 0 1 .077-.01c3.927 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.101.246.199.37.293a.077.077 0 0 1-.007.128 12.986 12.986 0 0 1-1.872.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.419-2.157 2.419z"></path>
  </svg>
);

const VIDEO_URL = "https://res.cloudinary.com/dw2vuswnh/video/upload/v1/lv_0_20260120185122_dwxgvj.mp4";
const PATTERN_SRC = "https://i.ibb.co.com/LDDWcBFs/Picsart-26-01-17-18-12-50-427.png";
const BRAND_RED = "#ff4e46";
const BRAND_BLACK = "#323232";

const BentoCard: React.FC<{ 
  children: React.ReactNode, 
  className?: string,
  style?: React.CSSProperties
}> = ({ children, className = "", style = {} }) => {
  return (
    <div 
      className={`relative rounded-[16px] overflow-hidden transition-all duration-500 shadow-2xl ${className}`}
      style={{ backgroundColor: BRAND_RED, ...style }}
    >
      {children}
    </div>
  );
};

const FlipCard: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`group [perspective:1000px] ${className}`}>
      <div className="relative h-full w-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        {/* Front Side */}
        <div className="absolute inset-0 [backface-visibility:hidden]">
          <BentoCard className="h-full w-full flex items-end p-6 md:p-8">
            <div className="absolute top-4 right-4 md:top-6 md:right-6 z-30">
              <div className="rounded-full p-2 transition-transform duration-500 group-hover:rotate-45 shadow-lg" style={{ backgroundColor: BRAND_BLACK }}>
                <ArrowUpRight style={{ color: BRAND_RED }} className="w-5 h-5 md:w-6 md:h-6" />
              </div>
            </div>
            <span className="text-anton text-6xl md:text-8xl lg:text-[7rem] xl:text-[8rem] leading-[0.8] lowercase select-none tracking-tight" style={{ color: BRAND_BLACK }}>
              .links
            </span>
          </BentoCard>
        </div>

        {/* Back Side */}
        <div className="absolute inset-0 h-full w-full [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <BentoCard className="h-full w-full flex items-center justify-center p-8">
             <div className="flex gap-4 md:gap-6">
                {[
                  { id: 'x', icon: XIcon, href: 'https://x.com/alphabrozdao' },
                  { id: 'discord', icon: DiscordIcon, href: 'https://discord.gg/gYEerfkxTK' },
                  { id: 'mail', icon: Mail, href: 'mailto:alphabrozdao@gmail.com' }
                ].map((social) => (
                  <a 
                    key={social.id}
                    href={social.href}
                    target={social.href.startsWith('http') ? "_blank" : undefined}
                    rel={social.href.startsWith('http') ? "noopener noreferrer" : undefined}
                    className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-[12px] transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg"
                    style={{ backgroundColor: BRAND_BLACK }}
                  >
                    <social.icon className="w-8 h-8 md:w-10 md:h-10" style={{ color: BRAND_RED }} />
                  </a>
                ))}
             </div>
          </BentoCard>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const playVideo = () => {
      if (videoRef.current) {
        videoRef.current.play().catch((err) => {
          console.warn("Autoplay was blocked:", err);
        });
      }
    };
    
    playVideo();
    window.addEventListener('mousedown', playVideo, { once: true });
    return () => window.removeEventListener('mousedown', playVideo);
  }, []);

  return (
    <div className="h-screen w-screen flex items-center justify-center p-4 md:p-8 overflow-hidden font-anton" style={{ backgroundColor: BRAND_BLACK }}>
      <div className="w-full h-full max-w-[1800px] grid grid-cols-1 md:grid-cols-6 grid-rows-6 md:grid-rows-2 gap-4 md:gap-8">
        
        {/* Top Left: Main Animated Logo Card */}
        <BentoCard className="md:col-span-2 row-span-2 md:row-span-1 flex items-center justify-center relative bg-black">
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source src={VIDEO_URL} type="video/mp4" />
            </video>
          </div>
          <div className="absolute inset-0 bg-[#ff4e46] opacity-10 pointer-events-none"></div>
        </BentoCard>

        {/* Top Right: Design Accent Area */}
        <BentoCard className="md:col-span-4 row-span-1 md:row-span-1 flex items-end p-10">
          <div className="relative w-full h-full">
            <div className="absolute top-0 right-0 border-t-[6px] border-r-[6px] w-16 h-16 opacity-30" style={{ borderColor: BRAND_BLACK }}></div>
            <div className="absolute bottom-0 left-0 border-b-[6px] border-l-[6px] w-16 h-16 opacity-30" style={{ borderColor: BRAND_BLACK }}></div>
          </div>
        </BentoCard>

        {/* Bottom Left: Links (Flippable) */}
        <FlipCard className="md:col-span-2 row-span-1 md:row-span-1" />

        {/* Bottom Center: Repetitive Logo Pattern */}
        <BentoCard className="md:col-span-2 row-span-1 md:row-span-1">
          <div 
            className="w-full h-full opacity-70 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              backgroundImage: `url(${PATTERN_SRC})`,
              backgroundSize: '80px',
              backgroundRepeat: 'repeat',
              backgroundPosition: '-20px -20px',
              imageRendering: 'auto',
              filter: 'grayscale(1) brightness(0.1)' 
            }}
          ></div>
        </BentoCard>

        {/* Bottom Right: Folio */}
        <BentoCard className="md:col-span-2 row-span-1 md:row-span-1 flex items-end p-6 md:p-8 group hover:scale-[1.01]">
          <div className="absolute top-4 right-4 md:top-6 md:right-6 z-30">
            <div className="rounded-full p-2 transition-transform duration-500 group-hover:rotate-45 shadow-lg" style={{ backgroundColor: BRAND_BLACK }}>
              <ArrowUpRight style={{ color: BRAND_RED }} className="w-5 h-5 md:w-6 md:h-6" />
            </div>
          </div>
          <span className="text-anton text-6xl md:text-8xl lg:text-[7rem] xl:text-[8rem] leading-[0.8] lowercase select-none tracking-tight" style={{ color: BRAND_BLACK }}>
            .folio
          </span>
        </BentoCard>

      </div>
    </div>
  );
};

export default App;
