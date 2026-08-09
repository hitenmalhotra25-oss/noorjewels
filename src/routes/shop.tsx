import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ChevronDown, SlidersHorizontal, ArrowRight, Search, Minus } from "lucide-react";
import { Reveal } from "@/components/noor/Reveal";
import { ProductCard, type Product } from "@/components/noor/ProductCard";
import { Slider } from "@/components/ui/slider";
import { AnnouncementBar, Header, Footer } from "./index";

import ring1 from "@/assets/ring-1.jpg";
import ring2 from "@/assets/ring-2.jpg";
import ring3 from "@/assets/ring-3.jpg";
import necklace1 from "@/assets/necklace-1.jpg";
import necklace2 from "@/assets/necklace-2.jpg";
import earring1 from "@/assets/earring-1.jpg";
import earring2 from "@/assets/earring-2.jpg";
import mangalsutra1 from "@/assets/mangalsutra-1.jpg";
import couple1 from "@/assets/couple-1.jpg";
import anklet1 from "@/assets/anklet-1.jpg";
import bracelet1 from "@/assets/bracelet-1.jpg";
import bannerAll from "@/assets/banner-all.jpg";
import bannerRings from "@/assets/banner-rings.jpg";
import bannerNecklaces from "@/assets/banner-necklaces.jpg";
import bannerEarrings from "@/assets/banner-earrings.jpg";
import bannerMangalsutras from "@/assets/banner-mangalsutras.jpg";
import bannerCouple from "@/assets/banner-couple.jpg";
import bannerAnklets from "@/assets/banner-anklets.jpg";
import bannerBracelets from "@/assets/banner-bracelets.jpg";

const BANNERS: Record<Category, { image: string; eyebrow: string; title: string; copy: string }> = {
  All: {
    image: bannerAll,
    eyebrow: "The Maison Edit",
    title: "The Shop",
    copy: "Browse the complete Noor Jewels collection — solitaires, heritage necklaces, signature halos and quiet everyday pieces. Each one made to be worn for a lifetime.",
  },
  Rings: {
    image: bannerRings,
    eyebrow: "The Solitaire Edit",
    title: "A Ring for Every Vow",
    copy: "Brilliant-cut diamonds, hand-set in champagne gold. From the whisper of a stacking band to the presence of a heirloom solitaire.",
  },
  Necklaces: {
    image: bannerNecklaces,
    eyebrow: "Heritage Neckpieces",
    title: "Worn Close to the Heart",
    copy: "From delicate everyday pendants to ceremonial statements, each necklace is composed to fall exactly where light lingers longest.",
  },
  Earrings: {
    image: bannerEarrings,
    eyebrow: "The Earring Edit",
    title: "Framed in Light",
    copy: "Studs, drops and chandeliers — quiet enough for morning, luminous enough for the last dance.",
  },
  Mangalsutras: {
    image: bannerMangalsutras,
    eyebrow: "A Sacred Thread",
    title: "Tradition, Retold",
    copy: "Mangalsutras reimagined for the modern bride — black beads, diamonds and champagne gold, worn as a lifelong keepsake.",
  },
  "Couple Rings": {
    image: bannerCouple,
    eyebrow: "For the Two of You",
    title: "Make Your Love Permanent",
    copy: "A pair of rings, one promise. Matched bands and coordinated solitaires, hand-finished to be worn together for a lifetime.",
  },
  Anklets: {
    image: bannerAnklets,
    eyebrow: "The Anklet Edit",
    title: "A Softer Sound",
    copy: "Fine chains and diamond accents, resting quietly at the ankle — heritage jewellery, worn everyday.",
  },
  Bracelets: {
    image: bannerBracelets,
    eyebrow: "The Bracelet Edit",
    title: "Light Around the Wrist",
    copy: "Tennis lines, cuffs and delicate chains — set in champagne gold, made to be layered or worn alone.",
  },
};

const CATEGORIES = ["All", "Rings", "Necklaces", "Earrings", "Mangalsutras", "Couple Rings", "Anklets", "Bracelets"] as const;
type Category = (typeof CATEGORIES)[number];

const SORTS = ["Featured", "New Arrivals", "Price: Low to High", "Price: High to Low", "Best Selling"] as const;
const CARATS = ["14KT", "18KT", "22KT", "24KT"] as const;
type Carat = (typeof CARATS)[number];

type ShopProduct = Product & { carat: Carat; priceNum: number };

const POOL: Array<{ image: string; category: Exclude<Category, "All"> }> = [
  { image: ring1, category: "Rings" },
  { image: ring2, category: "Rings" },
  { image: ring3, category: "Rings" },
  { image: necklace1, category: "Necklaces" },
  { image: necklace2, category: "Necklaces" },
  { image: earring1, category: "Earrings" },
  { image: earring2, category: "Earrings" },
  { image: mangalsutra1, category: "Mangalsutras" },
  { image: couple1, category: "Couple Rings" },
  { image: anklet1, category: "Anklets" },
  { image: bracelet1, category: "Bracelets" },
];

const NAMES = [
  "Aurora Solitaire", "Eternity Pavé", "Verde Halo", "Celeste Pendant", "Lumière Drape",
  "Aria Drops", "Étoile Studs", "Royal Heritage", "Promise Bands", "Anantha Anklet",
  "Mirage Tennis", "Soleil Ring", "Marquise Whisper", "Crescent Halo", "Sonata Pearl",
  "Velvet Ember", "Noor Eclipse", "Saanvi Drape", "Maya Halo", "Indra Cluster",
  "Zephyr Cuff", "Belle Époque", "Reverie Band", "Ophelia Drop", "Constellation Line",
];

function buildCatalog(): ShopProduct[] {
  return Array.from({ length: 36 }, (_, i) => {
    const p = POOL[i % POOL.length];
    const priceNum = 9990 + ((i * 1373) % 78000);
    return {
      id: `shop-${i}`,
      image: p.image,
      category: p.category,
      name: NAMES[i % NAMES.length],
      rating: 4.5 + ((i * 7) % 5) * 0.1,
      reviews: 60 + ((i * 53) % 480),
      price: formatINR(priceNum),
      priceNum,
      carat: CARATS[i % CARATS.length],
    };
  });
}

const PRICE_MIN = 0;
const PRICE_MAX = 100000;

import { useLocale } from "@/lib/locale";
import { formatINR } from "@/lib/cart";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop Fine Jewellery — Noor Jewels" },
      {
        name: "description",
        content:
          "Discover the complete Noor Jewels edit — diamond rings, heritage necklaces, earrings, mangalsutras and more, crafted in champagne gold.",
      },
      { property: "og:title", content: "Shop — Noor Jewels" },
      {
        property: "og:description",
        content: "The complete Noor Jewels edit. Champagne gold, diamonds, quiet luxury.",
      },
    ],
  }),
  component: ShopPage,
});

function ShopPage() {
  useLocale();
  const [active, setActive] = useState<Category>("All");
  const [sort, setSort] = useState<(typeof SORTS)[number]>("Featured");
  const [sortOpen, setSortOpen] = useState(false);
  const [visible, setVisible] = useState(12);
  const [query, setQuery] = useState("");
  const [appliedQuery, setAppliedQuery] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([PRICE_MIN, PRICE_MAX]);
  const [appliedPrice, setAppliedPrice] = useState<[number, number]>([PRICE_MIN, PRICE_MAX]);
  const [selectedCarats, setSelectedCarats] = useState<Set<Carat>>(new Set());

  const catalog = useMemo(() => buildCatalog(), []);

  const caratCounts = useMemo(() => {
    const map = new Map<Carat, number>();
    CARATS.forEach((c) => map.set(c, 0));
    catalog.forEach((p) => map.set(p.carat, (map.get(p.carat) ?? 0) + 1));
    return map;
  }, [catalog]);

  const toggleCarat = (c: Carat) => {
    setSelectedCarats((prev) => {
      const next = new Set(prev);
      if (next.has(c)) next.delete(c);
      else next.add(c);
      return next;
    });
    setVisible(12);
  };

  const applySearch = () => {
    setAppliedQuery(query);
    setAppliedPrice(priceRange);
    setVisible(12);
  };

  const filtered = useMemo(() => {
    let list = active === "All" ? catalog : catalog.filter((p) => p.category === active);
    const q = appliedQuery.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }
    list = list.filter((p) => p.priceNum >= appliedPrice[0] && p.priceNum <= appliedPrice[1]);
    if (selectedCarats.size > 0) {
      list = list.filter((p) => selectedCarats.has(p.carat));
    }
    const sorted = [...list];
    if (sort === "Price: Low to High") sorted.sort((a, b) => a.priceNum - b.priceNum);
    else if (sort === "Price: High to Low") sorted.sort((a, b) => b.priceNum - a.priceNum);
    else if (sort === "Best Selling") sorted.sort((a, b) => b.reviews - a.reviews);
    else if (sort === "New Arrivals") sorted.reverse();
    return sorted;
  }, [catalog, active, sort, appliedQuery, appliedPrice, selectedCarats]);

  const shown = filtered.slice(0, visible);
  const banner = BANNERS[active];


  return (
    <div className="min-h-screen bg-background text-foreground">
      <AnnouncementBar />
      <Header />

      {/* Editorial banner */}
      <section className="relative overflow-hidden">
        <div className="relative mx-auto max-w-[1400px] px-4 pt-10 md:px-8 md:pt-14">
          <div className="relative overflow-hidden rounded-[32px] border border-champagne/30 bg-ivory-deep shadow-[0_30px_80px_-40px_rgba(80,55,15,0.35)]">
            <img
              key={banner.image}
              src={banner.image}
              alt={banner.title}
              className="absolute inset-0 h-full w-full object-cover opacity-[0.72] animate-fade-in"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(120deg, rgba(252,247,236,0.78) 0%, rgba(239,226,198,0.55) 45%, rgba(252,247,236,0.38) 100%)",
              }}
            />
            <div className="relative px-6 py-16 text-center md:px-16 md:py-24">
              <Reveal key={active}>
                <p className="text-[11px] uppercase tracking-[0.32em] text-champagne-deep">{banner.eyebrow}</p>
                <h1 className="mt-4 font-display text-4xl leading-[1.05] tracking-tight text-ink md:text-6xl">
                  {banner.title}
                </h1>
                <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-champagne to-transparent" />
                <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-foreground/75 md:text-[15px]">
                  {banner.copy}
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-[1400px] px-4 py-14 md:px-8 md:py-20">
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-12">
          {/* Left sidebar — search & filters */}
          <aside className="lg:sticky lg:top-24 lg:h-fit lg:w-64">
            <div className="rounded-[28px] border border-border/60 bg-ivory/50 p-6 shadow-[0_20px_60px_-40px_rgba(80,55,15,0.18)] backdrop-blur-sm">
              {/* Search */}
              <div className="relative">
                <label htmlFor="shop-search" className="mb-2 block text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  Search
                </label>
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-champagne-deep" strokeWidth={1.5} />
                  <input
                    id="shop-search"
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") applySearch();
                    }}
                    placeholder="Search pieces..."
                    className="h-11 w-full rounded-2xl border border-border bg-background pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition-all focus:border-champagne focus:ring-1 focus:ring-champagne/30"
                  />
                </div>
                <button
                  onClick={applySearch}
                  className="mt-3 inline-flex h-10 w-full items-center justify-center rounded-full bg-ink px-6 text-[11px] uppercase tracking-[0.25em] text-ivory transition-all hover:bg-champagne-deep"
                >
                  Search Product
                </button>
              </div>

              <div className="my-6 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

              {/* Filter by Price */}
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <p className="font-display text-[15px] text-ink">Filter By Price</p>
                  <Minus className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={1.5} />
                </div>
                <Slider
                  min={PRICE_MIN}
                  max={PRICE_MAX}
                  step={500}
                  value={priceRange}
                  onValueChange={(v) => setPriceRange([v[0], v[1]] as [number, number])}
                  className="my-5"
                />
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[12px] text-foreground/75">
                    Price:{" "}
                    <span className="text-champagne-deep">
                      {formatINR(priceRange[0])}
                    </span>{" "}
                    —{" "}
                    <span className="text-champagne-deep">
                      {formatINR(priceRange[1])}
                    </span>
                  </p>
                  <button
                    onClick={() => {
                      setAppliedPrice(priceRange);
                      setVisible(12);
                    }}
                    className="inline-flex h-9 items-center justify-center rounded-full bg-ink px-5 text-[10px] uppercase tracking-[0.25em] text-ivory transition-all hover:bg-champagne-deep"
                  >
                    Filter
                  </button>
                </div>
              </div>

              <div className="my-6 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

              {/* Carats */}
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <p className="font-display text-[15px] text-ink">Carats</p>
                  <Minus className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={1.5} />
                </div>
                <div className="flex flex-col gap-3">
                  {CARATS.map((c) => {
                    const checked = selectedCarats.has(c);
                    return (
                      <label
                        key={c}
                        className="flex cursor-pointer items-center justify-between text-[12px] text-foreground/80 hover:text-ink"
                      >
                        <span className="flex items-center gap-3">
                          <span
                            className={`grid h-4 w-4 place-items-center rounded-full border transition-colors ${
                              checked
                                ? "border-champagne-deep bg-champagne-deep"
                                : "border-border bg-background"
                            }`}
                          >
                            {checked && <span className="h-1.5 w-1.5 rounded-full bg-ivory" />}
                          </span>
                          <input
                            type="checkbox"
                            className="sr-only"
                            checked={checked}
                            onChange={() => toggleCarat(c)}
                          />
                          <span className="tracking-wide">{c}</span>
                        </span>
                        <span className="text-muted-foreground">({caratCounts.get(c) ?? 0})</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="my-6 h-px bg-gradient-to-r from-transparent via-border to-transparent" />


              {/* Categories */}
              <div>
                <p className="mb-4 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Categories</p>
                <div className="flex flex-wrap gap-2 lg:flex-col lg:gap-2.5">
                  {CATEGORIES.map((c) => {
                    const isActive = c === active;
                    return (
                      <button
                        key={c}
                        onClick={() => {
                          setActive(c);
                          setVisible(12);
                        }}
                        className={`text-left transition-all lg:w-full ${
                          isActive
                            ? "text-ink"
                            : "text-foreground/65 hover:text-ink"
                        }`}
                      >
                        <span className="text-[12px] uppercase tracking-[0.18em]">{c}</span>
                        {isActive && (
                          <span className="ml-2 inline-block h-px w-6 bg-champagne-deep align-middle" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="my-6 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent lg:block" />

              <div className="hidden items-center gap-2 text-xs text-muted-foreground lg:flex">
                <SlidersHorizontal className="h-3.5 w-3.5" strokeWidth={1.5} />
                {filtered.length} pieces
              </div>
            </div>
          </aside>

          {/* Right — grid */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="mb-8 flex items-center justify-between border-b border-border/60 pb-6">
              <div className="flex items-center gap-2 text-xs text-muted-foreground lg:hidden">
                <SlidersHorizontal className="h-3.5 w-3.5" strokeWidth={1.5} />
                {filtered.length} pieces
              </div>

              <div className="relative ml-auto">
                <button
                  onClick={() => setSortOpen((v) => !v)}
                  className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-[11px] uppercase tracking-[0.22em] text-foreground/80 hover:border-champagne"
                >
                  Sort: {sort}
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform ${sortOpen ? "rotate-180" : ""}`} strokeWidth={1.5} />
                </button>
                {sortOpen && (
                  <div className="absolute right-0 top-full z-20 mt-2 min-w-[220px] overflow-hidden rounded-2xl border border-border bg-ivory shadow-luxe">
                    {SORTS.map((s) => (
                      <button
                        key={s}
                        onClick={() => {
                          setSort(s);
                          setSortOpen(false);
                        }}
                        className={`block w-full px-4 py-2.5 text-left text-[12px] tracking-wide transition-colors hover:bg-ivory-deep ${
                          s === sort ? "text-champagne-deep" : "text-foreground/80"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3 md:gap-x-7 lg:grid-cols-3 lg:gap-x-8">
              {shown.map((p, i) => (
                <Reveal key={p.id} delay={(i % 8) * 60}>
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </div>

            {shown.length === 0 && (
              <div className="py-24 text-center text-sm text-muted-foreground">
                No pieces matched your search.
              </div>
            )}

            {visible < filtered.length && (
              <div className="mt-16 flex justify-center">
                <button
                  onClick={() => setVisible((v) => v + 12)}
                  className="inline-flex items-center gap-2 rounded-full border border-ink bg-ink px-7 py-3 text-[11px] uppercase tracking-[0.25em] text-ivory transition-all hover:bg-champagne-deep hover:border-champagne-deep"
                >
                  Load More <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
