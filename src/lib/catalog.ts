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

export const CARATS = ["14KT", "18KT", "22KT", "24KT"] as const;
export type Carat = (typeof CARATS)[number];

export const CATALOG_POOL: { image: string; category: string }[] = [
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

export const NAMES = [
  "Aurora Solitaire", "Eternity Pavé", "Verde Halo", "Celeste Pendant", "Lumière Drape",
  "Aria Drops", "Étoile Studs", "Royal Heritage", "Promise Bands", "Anantha Anklet",
  "Mirage Tennis", "Soleil Ring", "Marquise Whisper", "Crescent Halo", "Sonata Pearl",
  "Velvet Ember", "Noor Eclipse", "Saanvi Drape", "Maya Halo", "Indra Cluster",
  "Zephyr Cuff", "Belle Époque", "Reverie Band", "Ophelia Drop", "Constellation Line",
];

export type CatalogProduct = {
  id: string;
  image: string;
  category: string;
  name: string;
  rating: number;
  reviews: number;
  price: string;
  priceNum: number;
  carat: Carat;
  description: string;
  highlights: string[];
  metal: string;
  stone: string;
  sku: string;
};

function priceString(n: number) {
  return `₹${n.toLocaleString("en-IN")}`;
}

function buildDescription(name: string, category: string) {
  return `The ${name} is a signature ${category.toLowerCase()} piece from the Noor Jewels atelier — hand-set in champagne gold with certified diamonds. Composed in our workshop, it is polished by hand, weighed to the milligram and finished to be worn every day, for a lifetime. Designed to sit softly on the skin, catch light quietly and be passed down as an heirloom.`;
}

function buildHighlights(): string[] {
  return [
    "Certified natural diamonds, VS clarity",
    "Hand-set in solid champagne gold",
    "Hallmarked & BIS-certified",
    "Lifetime buyback & exchange",
    "Presented in a signature Noor case",
  ];
}

/** Shop catalog matches the shop route: 36 items with id `shop-{i}` */
export function getShopProduct(i: number): CatalogProduct {
  const p = CATALOG_POOL[i % CATALOG_POOL.length];
  const priceNum = 9990 + ((i * 1373) % 78000);
  const name = NAMES[i % NAMES.length];
  return {
    id: `shop-${i}`,
    image: p.image,
    category: p.category,
    name,
    rating: 4.5 + ((i * 7) % 5) * 0.1,
    reviews: 60 + ((i * 53) % 480),
    price: priceString(priceNum),
    priceNum,
    carat: CARATS[i % CARATS.length],
    description: buildDescription(name, p.category),
    highlights: buildHighlights(),
    metal: "Champagne Gold",
    stone: "Natural Diamond",
    sku: `NJ-${(1000 + i).toString()}`,
  };
}

/** Home featured tabs — each seed maps to exactly one category */
export const HOME_CATEGORIES = [
  "Rings",
  "Necklaces",
  "Earrings",
  "Mangalsutras",
  "Couple Rings",
] as const;

const HOME_CATEGORY_IMAGES: Record<string, string[]> = {
  Rings: [ring1, ring2, ring3],
  Necklaces: [necklace1, necklace2],
  Earrings: [earring1, earring2],
  Mangalsutras: [mangalsutra1, necklace1, necklace2],
  "Couple Rings": [couple1, ring1, ring3],
};

const HOME_CATEGORY_NAMES: Record<string, string[]> = {
  Rings: [
    "Aurora Solitaire", "Eternity Pavé", "Verde Halo", "Soleil Ring", "Marquise Whisper",
    "Crescent Halo", "Reverie Band", "Noor Eclipse", "Velvet Ember", "Maya Halo",
    "Indra Cluster", "Belle Époque",
  ],
  Necklaces: [
    "Celeste Pendant", "Lumière Drape", "Saanvi Drape", "Constellation Line", "Sonata Pearl",
    "Mirage Tennis", "Ivory Cascade", "Champagne Rivière", "Aurelia Collar", "Nectar Locket",
    "Zohra Layers", "Serein Chain",
  ],
  Earrings: [
    "Aria Drops", "Étoile Studs", "Ophelia Drop", "Chandni Jhumka", "Halo Hoops",
    "Petal Climbers", "Meher Danglers", "Solitaire Studs", "Mistral Hoops", "Rani Chandbali",
    "Dew Drop Studs", "Lyra Cascade",
  ],
  Mangalsutras: [
    "Suhaag Heritage", "Praanam Classic", "Devi Contemporary", "Anokhi Modern", "Saubhagya Two-Vati",
    "Mangala Minimal", "Sindoor Line", "Nithya Thread", "Amrita Pendant", "Vrinda Heritage",
    "Kanya Classic", "Shubh Bond",
  ],
  "Couple Rings": [
    "Ananta Bond", "Saath Nibhaana", "Vachan Pair", "Aavaran Duet", "Promise Bands",
    "Two Hands Duet", "Yugal Pair", "Forever Fold", "Sindhu Duet", "Milan Bands",
    "Sanchit Pair", "Ardh Duet",
  ],
};

/** Home makeProducts matches ids of the form `${seed}-${i}` */
export function getHomeProduct(seed: number, i: number): CatalogProduct {
  const category = HOME_CATEGORIES[(seed - 1 + HOME_CATEGORIES.length * 10) % HOME_CATEGORIES.length];
  const images = HOME_CATEGORY_IMAGES[category];
  const names = HOME_CATEGORY_NAMES[category];
  const image = images[i % images.length];
  const name = names[i % names.length];
  const priceNum = 8990 + ((seed * 911 + i * 1300) % 65000);
  const rating = 4.6 + ((i * 7) % 4) * 0.1;
  const reviews = 80 + ((seed * 17 + i * 13) % 420);
  return {
    id: `${seed}-${i}`,
    image,
    category,
    name,
    rating,
    reviews,
    price: priceString(priceNum),
    priceNum,
    carat: CARATS[(seed + i) % CARATS.length],
    description: buildDescription(name, category),
    highlights: buildHighlights(),
    metal: "Champagne Gold",
    stone: "Natural Diamond",
    sku: `NJ-${(2000 + seed * 100 + i).toString()}`,
  };
}


export function getProductById(id: string): CatalogProduct | null {
  if (!id) return null;
  if (id.startsWith("shop-")) {
    const n = Number(id.slice(5));
    if (!Number.isFinite(n)) return null;
    return getShopProduct(n);
  }
  const parts = id.split("-");
  if (parts.length !== 2) return null;
  const seed = Number(parts[0]);
  const i = Number(parts[1]);
  if (!Number.isFinite(seed) || !Number.isFinite(i)) return null;
  return getHomeProduct(seed, i);
}

export function relatedProducts(id: string, count = 4): CatalogProduct[] {
  const start = id.startsWith("shop-") ? Number(id.slice(5)) + 1 : 3;
  return Array.from({ length: count }, (_, k) => getShopProduct((start + k * 5) % 36));
}
