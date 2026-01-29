
import React, { useEffect, useMemo, useState } from "react";

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
    <div style={styles.page}>
      <div style={styles.panel}>
        <div style={styles.searchBar}>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="search by name..."
            style={styles.input}
            autoComplete="off"
            spellCheck={false}
          />
          <div style={styles.searchIconWrap}>
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

        <div style={styles.resultsArea}>
          {results.length === 0 ? (
            <div style={styles.empty}>No matches</div>
          ) : (
            <div style={{ ...styles.gridBase, ...(isMobile ? styles.gridMobile : styles.gridDesktop) }}>
              {results.map((item) => (
                <button
                  key={item.slug}
                  onClick={() => openFolio(item)}
                  style={styles.card}
                  type="button"
                >
                  <img src={item.img} alt={item.name} style={styles.avatar} />
                  <div style={styles.name}>{item.name}</div>
                </button>
              ))}
            </div>
          )}
        </div>

        {onClose && (
          <button type="button" onClick={onClose} style={styles.closeBtn}>
            Back
          </button>
        )}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#323232",
    display: "grid",
    placeItems: "center",
    padding: 18,
  },
  panel: {
    width: "calc(100vw - 36px)",
    maxWidth: 1800,
    height: "calc(100vh - 36px)",
    background: "#E14A3A",
    borderRadius: 22,
    padding: 18,
    position: "relative",
    boxShadow: "0 20px 90px rgba(0,0,0,0.45)",
    overflow: "hidden",
    letterSpacing: "0.5px",
  },
  searchBar: {
    height: 54,
    borderRadius: 14,
    background: "#232326",
    display: "flex",
    alignItems: "center",
    padding: "0 10px 0 14px",
    gap: 10,
  },
  input: {
    flex: 1,
    border: "none",
    outline: "none",
    background: "transparent",
    color: "rgba(255,255,255,0.92)",
    fontSize: 16,
    letterSpacing: "0.6px",
  },
  searchIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    display: "grid",
    placeItems: "center",
    background: "rgba(255,255,255,0.06)",
  },
  resultsArea: {
    marginTop: 16,
    height: "calc(100% - 54px - 16px)",
    overflow: "auto",
    paddingRight: 4,
  },
  gridBase: {
    display: "grid",
    gap: 14,
    alignItems: "stretch",
  },
  gridDesktop: {
    gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
  },
  gridMobile: {
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  },
  card: {
    width: "100%",
    height: "95%",
    borderRadius: 18,
    border: "none",
    background: "#323232",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 12,
  },
  avatar: {
    width: "100%",
    aspectRatio: "1 / 1",
    borderRadius: 16,
    objectFit: "cover",
    background: "rgba(0,0,0,0.15)",
  },
  name: {
    marginTop: 2,
    fontWeight: 800,
    color: "rgba(255,255,255,0.95)",
    fontSize: "3.7vh",
    letterSpacing:"1px",
    fontFamily: "'Anton', sans-serif",
  },
  empty: {
    color: "rgba(255,255,255,0.9)",
    fontWeight: 600,
    padding: 12,
  },
  closeBtn: {
    position: "absolute",
    right: 14,
    bottom: 14,
    border: "none",
    borderRadius: 12,
    padding: "10px 14px",
    background: "rgba(0,0,0,0.28)",
    color: "rgba(255,255,255,0.95)",
    cursor: "pointer",
    fontFamily: "'Anton', sans-serif",
  },
};
