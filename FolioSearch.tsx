
import React, { useEffect, useMemo, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Brozfolio = {
  slug: string;
  name: string;
  img: string;
  url?: string;
};

type Props = {
  onClose?: () => void;
};

export default function FolioSearch({ onClose }: Props) {
  const [all, setAll] = useState<Brozfolio[]>([]);
  const [q, setQ] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [lastActivity, setLastActivity] = useState(Date.now());
  const autoScrollTimerRef = useRef<NodeJS.Timeout | null>(null);
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [scrollDirection, setScrollDirection] = useState<"left" | "right">("right");

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const resetInactivity = useCallback(() => {
    setLastActivity(Date.now());
    if (autoScrollTimerRef.current) {
      clearInterval(autoScrollTimerRef.current);
      autoScrollTimerRef.current = null;
    }
  }, []);

  const scrollFolio = useCallback((direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const cards = container.querySelectorAll('button');
    if (cards.length === 0) return;

    // Find the card that is currently most visible/centered
    let currentIdx = 0;
    let minDiff = Infinity;
    const containerCenter = container.scrollLeft + container.clientWidth / 2;

    cards.forEach((card, idx) => {
      const cardCenter = (card as HTMLElement).offsetLeft + (card as HTMLElement).clientWidth / 2;
      const diff = Math.abs(containerCenter - cardCenter);
      if (diff < minDiff) {
        minDiff = diff;
        currentIdx = idx;
      }
    });

    let targetIdx = direction === "right" ? currentIdx + 1 : currentIdx - 1;
    if (targetIdx < 0) targetIdx = 0;
    if (targetIdx >= cards.length) targetIdx = cards.length - 1;

    const targetCard = cards[targetIdx] as HTMLElement;
    container.scrollTo({
      left: targetCard.offsetLeft - (container.clientWidth - targetCard.clientWidth) / 2,
      behavior: "smooth"
    });
  }, []);

  useEffect(() => {
    if (!isMobile) return;

    const handleInteraction = () => resetInactivity();
    const container = scrollRef.current;

    window.addEventListener("mousemove", handleInteraction);
    window.addEventListener("touchstart", handleInteraction);
    window.addEventListener("scroll", handleInteraction, true);
    if (container) {
      container.addEventListener("scroll", handleInteraction);
    }

    return () => {
      window.removeEventListener("mousemove", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
      window.removeEventListener("scroll", handleInteraction, true);
      if (container) {
        container.removeEventListener("scroll", handleInteraction);
      }
    };
  }, [isMobile, resetInactivity]);

  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return all;
    return all.filter(
      (x) => x.slug.toLowerCase().includes(s) || x.name.toLowerCase().includes(s)
    );
  }, [q, all]);

  useEffect(() => {
    if (!isMobile || results.length <= 1) return;

    const checkInactivity = () => {
      const now = Date.now();
      if (now - lastActivity >= 3000) {
        if (!autoScrollTimerRef.current) {
          autoScrollTimerRef.current = setInterval(() => {
            if (!scrollRef.current) return;
            const container = scrollRef.current;
            
            // Check if we reached the end or start
            const isAtEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth - 10;
            const isAtStart = container.scrollLeft <= 10;

            let nextDirection = scrollDirection;
            if (isAtEnd) nextDirection = "left";
            else if (isAtStart) nextDirection = "right";

            if (nextDirection !== scrollDirection) {
              setScrollDirection(nextDirection);
            }

            scrollFolio(nextDirection);
          }, 2000);
        }
      }
    };

    inactivityTimerRef.current = setInterval(checkInactivity, 1000);

    return () => {
      if (inactivityTimerRef.current) clearInterval(inactivityTimerRef.current);
      if (autoScrollTimerRef.current) clearInterval(autoScrollTimerRef.current);
    };
  }, [isMobile, lastActivity, results.length, scrollDirection, scrollFolio]);

  useEffect(() => {
    fetch("/brozfolios/manifest.json")
      .then((r) => r.json())
      .then((data) => setAll(Array.isArray(data) ? (data as Brozfolio[]) : []))
      .catch(() => setAll([]));
  }, []);

  const openFolio = (item: Brozfolio) => {
    const destination = item.url || `/brozfolios/${item.slug}`;
    window.open(destination, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-[#323232] grid place-items-center p-[18px]">
      <div 
        className="w-[calc(100vw-36px)] max-w-[1800px] h-[calc(100vh-36px)] bg-[#E14A3A] rounded-[22px] p-[18px] relative shadow-[0_20px_90px_rgba(0,0,0,0.45)] overflow-hidden tracking-[0.5px]"
      >
        <div className="h-[48px] flex items-center gap-[10px]">
          <div className="flex-1 h-full rounded-[12px] bg-[#232326] flex items-center px-[12px] gap-[8px]">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="search by name..."
              className="flex-1 border-none outline-none bg-transparent text-[rgba(255,255,255,0.92)] text-[14px] tracking-[0.6px]"
              autoComplete="off"
              spellCheck={false}
            />
            <div className="w-[32px] h-[32px] rounded-[10px] grid place-items-center bg-[rgba(255,255,255,0.06)]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M10.5 19a8.5 8.5 0 1 1 0-17 8.5 8.5 0 0 1 0 17Z"
                  stroke="rgba(255,255,255,0.9)"
                  strokeWidth="2.5"
                />
                <path
                  d="M16.5 16.5 22 22"
                  stroke="rgba(255,255,255,0.9)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
          {onClose && (
            <button 
              type="button" 
              onClick={onClose} 
              className="h-full border-none rounded-[12px] px-[16px] bg-[#232326] text-[rgba(255,255,255,0.95)] cursor-pointer font-anton hover:bg-[#323232] transition-colors text-[14px]"
            >
              Back
            </button>
          )}
        </div>

        <div className="mt-[12px] h-[calc(100%-48px-12px)] relative">
          {isMobile && results.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  resetInactivity();
                  scrollFolio("left");
                }}
                className="absolute left-[-10px] top-1/2 -translate-y-1/2 z-40 w-10 h-10 rounded-full bg-[#323232]/80 flex items-center justify-center text-[#ff4e46] border-none cursor-pointer backdrop-blur-md shadow-xl active:scale-90 transition-transform"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  resetInactivity();
                  scrollFolio("right");
                }}
                className="absolute right-[-10px] top-1/2 -translate-y-1/2 z-40 w-10 h-10 rounded-full bg-[#323232]/80 flex items-center justify-center text-[#ff4e46] border-none cursor-pointer backdrop-blur-md shadow-xl active:scale-90 transition-transform"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          <div 
            ref={scrollRef}
            className="w-full h-full overflow-x-auto overflow-y-hidden custom-scrollbar flex gap-[14px] snap-x snap-mandatory pb-1"
          >
            {results.length === 0 ? (
              <div className="text-[rgba(255,255,255,0.9)] font-semibold p-[12px]">No matches</div>
            ) : (
              <AnimatePresence mode="popLayout">
                {results.map((item, idx) => (
                  <motion.button
                    layout
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ delay: idx * 0.05 }}
                    key={item.slug}
                    onClick={() => openFolio(item)}
                    className="flex-shrink-0 w-[calc(100vw-72px)] md:w-[240px] h-full rounded-[18px] border-none bg-[#323232] cursor-pointer relative group overflow-hidden snap-center"
                    type="button"
                  >
                    <div className="absolute inset-0">
                      <img 
                        src={item.img} 
                        alt={item.name} 
                        className="w-full h-full object-cover bg-[rgba(0,0,0,0.15)] group-hover:scale-110 transition-transform duration-700" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                    
                    <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                      <div className="font-extrabold text-[rgba(255,255,255,0.95)] text-[5.5vh] md:text-[8vh] leading-[0.8] tracking-[2px] font-anton uppercase break-words text-left drop-shadow-2xl">
                        {item.name}
                      </div>
                    </div>
                  </motion.button>
                ))}
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
