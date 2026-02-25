
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
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-[calc(100vw-36px)] max-w-[1800px] h-[calc(100vh-36px)] bg-[#E14A3A] rounded-[22px] p-[18px] relative shadow-[0_20px_90px_rgba(0,0,0,0.45)] overflow-hidden tracking-[0.5px]"
      >
        <div className="h-[54px] rounded-[14px] bg-[#232326] flex items-center px-[14px] gap-[10px]">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="search by name..."
            className="flex-1 border-none outline-none bg-transparent text-[rgba(255,255,255,0.92)] text-[16px] tracking-[0.6px]"
            autoComplete="off"
            spellCheck={false}
          />
          <div className="w-[40px] h-[40px] rounded-[12px] grid place-items-center bg-[rgba(255,255,255,0.06)]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M10.5 19a8.5 8.5 0 1 1 0-17 8.5 8.5 0 0 1 0 17Z"
                stroke="rgba(255,255,255,0.9)"
                strokeWidth="2"
              />
              <path
                d="M16.5 16.5 22 22"
                stroke="rgba(255,255,255,0.9)"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        <div className="mt-[16px] h-[calc(100%-54px-16px)] overflow-auto pr-[4px]">
          {results.length === 0 ? (
            <div className="text-[rgba(255,255,255,0.9)] font-semibold p-[12px]">No matches</div>
          ) : (
            <div className={`grid gap-[14px] items-stretch ${isMobile ? 'grid-cols-2' : 'grid-cols-5'}`}>
              <AnimatePresence mode="popLayout">
                {results.map((item, idx) => (
                  <motion.button
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ delay: idx * 0.05 }}
                    key={item.slug}
                    onClick={() => openFolio(item)}
                    className="w-full h-[95%] rounded-[18px] border-none bg-[#323232] cursor-pointer flex flex-col items-center p-[12px] group"
                    type="button"
                  >
                    <div className="w-full aspect-square rounded-[16px] overflow-hidden">
                      <img src={item.img} alt={item.name} className="w-full h-full object-cover bg-[rgba(0,0,0,0.15)] group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="mt-[2px] font-extrabold text-[rgba(255,255,255,0.95)] text-[3.7vh] tracking-[1px] font-anton">
                      {item.name}
                    </div>
                  </motion.button>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

        {onClose && (
          <button type="button" onClick={onClose} className="absolute right-[14px] bottom-[14px] border-none rounded-[12px] py-[10px] px-[14px] bg-[rgba(0,0,0,0.28)] text-[rgba(255,255,255,0.95)] cursor-pointer font-anton">
            Back
          </button>
        )}
      </motion.div>
    </div>
  );
}
