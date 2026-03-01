
import React, { useRef, useEffect, useState } from 'react';
import { ArrowUpRight, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import FolioSearch from "./FolioSearch";

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
const LOADING_LOGO = "/logo.svg";

const LoadingScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-[#323232] flex items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.img
        src={LOADING_LOGO}
        alt="Loading Logo"
        className="w-12 h-12 md:w-16 md:h-16 object-contain"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{
          scale: [0.8, 1.1, 0.9, 1.1, 1],
          opacity: 1,
        }}
        transition={{
          duration: 1.5,
          times: [0, 0.2, 0.4, 0.6, 1],
          repeat: Infinity,
          repeatDelay: 0.5,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  );
};

type BentoCardProps = React.HTMLAttributes<HTMLDivElement> & {
  style?: React.CSSProperties;
};

const BentoCard: React.FC<BentoCardProps> = ({
  children,
  className = "",
  style = {},
  ...props
}) => {
  return (
    <motion.div
      {...props}
      className={`relative rounded-[16px] overflow-hidden transition-all duration-500 shadow-2xl bg-[#ff4e46] ${className}`}
      style={style}
    >
      {children}
    </motion.div>
  );
};

const FlipCard: React.FC<{ className?: string }> = ({ className = "" }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className={`group [perspective:2000px] cursor-pointer hover:scale-[1.01] transition-transform duration-500 z-10 hover:z-50 ${className}`}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className={`relative h-full w-full transition-all duration-700 [transform-style:preserve-3d] ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}>
        {/* Front Side */}
        <div className="absolute inset-0 [backface-visibility:hidden]">
          <BentoCard className="h-full w-full flex items-end p-6 md:p-8">
            <div className="absolute top-4 right-4 md:top-6 md:right-6 z-30">
              <div className="rounded-full p-2 transition-transform duration-500 group-hover:rotate-45 shadow-lg bg-[#323232]">
                <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 text-[#ff4e46]" />
              </div>
            </div>
            <span className="text-anton text-5xl md:text-8xl lg:text-[7rem] xl:text-[8rem] leading-[0.8] lowercase select-none tracking-tight text-[#323232]">
              .links
            </span>
          </BentoCard>
        </div>

        {/* Back Side */}
        <div className="absolute inset-0 h-full w-full [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <BentoCard className="h-full w-full flex items-center justify-center p-4 md:p-8">
             <div className="grid grid-cols-2 gap-3 md:flex md:gap-6 items-center justify-center">
                {[
                  { id: 'x', icon: XIcon, href: 'https://x.com/alphabrozdao' },
                  { id: 'discord', icon: DiscordIcon, href: 'https://discord.gg/gYEerfkxTK' },
                  { id: 'mail', icon: Mail, href: 'mailto:alphabrozdao@gmail.com' }
                ].map((social, idx) => (
                  <a 
                    key={social.id}
                    href={social.href}
                    onClick={(e) => e.stopPropagation()}
                    target={social.href.startsWith('http') ? "_blank" : undefined}
                    rel={social.href.startsWith('http') ? "noopener noreferrer" : undefined}
                    className={`${idx === 0 ? 'col-span-2 justify-self-center' : 'col-span-1'} w-14 h-14 md:w-20 md:h-20 flex items-center justify-center rounded-[12px] transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg bg-[#323232]`}
                  >
                    <social.icon className="w-7 h-7 md:w-10 md:h-10 text-[#ff4e46]" />
                  </a>
                ))}
             </div>
          </BentoCard>
        </div>
      </div>
    </div>
  );
};

const TypingAnimation: React.FC = () => {
  const [text, setText] = useState(".");
  const [isDeleting, setIsDeleting] = useState(false);
  const fullText = ".soon";
  const typingSpeed = 150;
  const deletingSpeed = 100;
  const pauseDuration = 3000;

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (!isDeleting) {
      if (text.length < fullText.length) {
        timer = setTimeout(() => {
          setText(fullText.slice(0, text.length + 1));
        }, typingSpeed);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, pauseDuration);
      }
    } else {
      if (text.length > 1) {
        timer = setTimeout(() => {
          setText(text.slice(0, -1));
        }, deletingSpeed);
      } else {
        setIsDeleting(false);
      }
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting]);

  return (
    <div className="flex items-center justify-center font-anton text-7xl md:text-9xl lg:text-[12rem] text-white tracking-tighter select-none drop-shadow-2xl">
      <span>{text}</span>
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "steps(2)" }}
        className="ml-2 w-[6px] md:w-[12px] h-[0.8em] bg-white"
      />
    </div>
  );
};

const App: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState<"home" | "folio" | "video">("home");

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const playVideo = () => {
      if (videoRef.current) {
        videoRef.current.play().catch((err) => {
          console.warn("Autoplay was blocked:", err);
        });
      }
    };
    
    playVideo();
    window.addEventListener('mousedown', playVideo, { once: true });
    return () => {
      window.removeEventListener('mousedown', playVideo);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen key="loading" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <AnimatePresence>
          {page === "folio" ? (
            <motion.div
              key="folio"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-0 z-50"
            >
              <FolioSearch onClose={() => setPage("home")} />
            </motion.div>
          ) : (
            <motion.div 
              key="main-viewport"
              className="fixed inset-0 overflow-hidden bg-[#323232]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                animate={{ y: page === "video" ? "-100%" : "0%" }}
                transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
                className="h-full w-full"
              >
                {/* Page 1: Bento Grid */}
                <div className="h-screen w-screen flex items-start md:items-center justify-center p-4 md:p-8 overflow-y-auto md:overflow-hidden font-anton scroll-smooth">
                  <div 
                    className="w-full h-fit md:h-full max-w-[1800px] grid grid-cols-2 md:grid-cols-6 md:grid-rows-2 gap-4 md:gap-8 pt-0 pb-32 md:py-0 overflow-visible"
                  >
                    
                    {/* Top Left: Main Animated Logo Card */}
                    <BentoCard className="col-span-2 aspect-square md:aspect-auto md:col-span-2 md:row-span-1 flex items-center justify-center relative bg-black order-1">
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
                    <BentoCard className="col-span-2 h-40 md:h-auto md:col-span-4 md:row-span-1 flex items-center justify-center group overflow-hidden order-2" style={{ containerType: 'size' } as any}>
                      <div className="relative w-full h-full flex items-center overflow-hidden">
                        <motion.div
                          className="flex whitespace-pre"
                          animate={{ x: ["0%", "-50%"] }}
                          transition={{
                            duration: 15,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        >
                          <span className="text-[#323232] font-anton text-[80cqh] leading-none">
                            BROZ ARE THE ALPHA{" "}
                          </span>
                          <span className="text-[#323232] font-anton text-[80cqh] leading-none">
                            BROZ ARE THE ALPHA{" "}
                          </span>
                        </motion.div>
                      </div>
                    </BentoCard>

                    {/* Bottom Left: Links (Flippable) */}
                    <FlipCard className="col-span-1 aspect-square md:aspect-auto md:col-span-2 md:row-span-1 order-3" />

                    {/* Bottom Center: Repetitive Logo Pattern */}
                    <BentoCard 
                      onClick={() => setPage("video")}
                      className="flex col-span-2 h-40 md:h-auto md:col-span-2 md:row-span-1 order-5 md:order-4 group cursor-pointer hover:scale-[1.01]"
                    >
                      <motion.div 
                        animate={{ 
                          backgroundPosition: ['0px 0px', '80px 80px'] 
                        }}
                        transition={{ 
                          duration: 10, 
                          repeat: Infinity, 
                          ease: "linear" 
                        }}
                        className="w-full h-full opacity-40 group-hover:opacity-100 transition-opacity duration-500"
                        style={{
                          backgroundImage: `url(${PATTERN_SRC})`,
                          backgroundSize: '80px',
                          backgroundRepeat: 'repeat',
                          imageRendering: 'auto',
                          filter: 'grayscale(1) brightness(0.2)' 
                        }}
                      ></motion.div>
                    </BentoCard>

                    {/* Bottom Right: Folio */}
                    <BentoCard
                            onClick={() => {
                              console.log("folio clicked");
                              setPage("folio");}}
                            className="col-span-1 aspect-square md:aspect-auto md:col-span-2 md:row-span-1 flex items-end p-6 md:p-8 group hover:scale-[1.01] cursor-pointer order-4 md:order-5">
                      <div className="absolute top-4 right-4 md:top-6 md:right-6 z-30">
                        <div className="rounded-full p-2 transition-transform duration-500 group-hover:rotate-45 shadow-lg bg-[#323232]">
                          <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 text-[#ff4e46]" />
                        </div>
                      </div>
                      <span className="text-anton text-5xl md:text-8xl lg:text-[7rem] xl:text-[8rem] leading-[0.8] lowercase select-none tracking-tight text-[#323232]">
                        .folio
                      </span>
                    </BentoCard>

                  </div>
                </div>

                {/* Page 2: Full Screen Video */}
                <div 
                  onClick={() => setPage("home")}
                  className="h-screen w-screen bg-black relative overflow-hidden cursor-pointer"
                >
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
                    <iframe
                      src="https://player.cloudinary.com/embed/?cloud_name=dw2vuswnh&public_id=1772383907873_mcawib&autoplay=true&loop=true&muted=true&controls=false"
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.77vh] min-w-full h-[56.25vw] min-h-full border-none scale-110 md:scale-100"
                      allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                      title="Alpha Broz Video"
                    />
                  </div>

                  {/* Typing Animation Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none -translate-y-[15vh]">
                    <TypingAnimation />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </>
  );
};

export default App;