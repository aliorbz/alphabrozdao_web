
import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

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

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    fetch("/brozfolios/manifest.json")
      .then((r) => r.json())
      .then((data) => setAll(Array.isArray(data) ? (data as Brozfolio[]) : []))
      .catch(() => setAll([]));
  }, []);

  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return all;
    return all.filter(
      (x) => x.slug.toLowerCase().includes(s) || x.name.toLowerCase().includes(s)
    );
  }, [q, all]);

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

        <div className="mt-[12px] h-[calc(100%-48px-12px)] overflow-x-auto overflow-y-hidden custom-scrollbar">
          {results.length === 0 ? (
            <div className="text-[rgba(255,255,255,0.9)] font-semibold p-[12px]">No matches</div>
          ) : (
            <div className="flex gap-[14px] h-full pb-1">
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
                    className="flex-shrink-0 w-[180px] md:w-[240px] h-full rounded-[18px] border-none bg-[#323232] cursor-pointer relative group overflow-hidden"
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
