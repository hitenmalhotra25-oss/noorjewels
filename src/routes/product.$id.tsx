import { createFileRoute, Link, notFound, useNavigate, useRouter } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Star,
  Heart,
  ShieldCheck,
  Truck,
  RefreshCcw,
  Sparkles,
  Minus,
  Plus,
  ChevronRight,
  Check,
} from "lucide-react";
import { Reveal } from "@/components/noor/Reveal";
import { ProductCard } from "@/components/noor/ProductCard";
import { AnnouncementBar, Header, Footer } from "./index";
import {
  CARATS,
  type Carat,
  getProductById,
  relatedProducts,
} from "@/lib/catalog";
import { cart, formatINR } from "@/lib/cart";
import { wishlist, useIsWishlisted } from "@/lib/wishlist";

import { useLocale } from "@/lib/locale";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = getProductById(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Piece not found — Noor Jewels" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { product } = loaderData;
    const title = `${product.name} — Noor Jewels`;
    const desc = `${product.name}, a ${product.category.toLowerCase()} in champagne gold from Noor Jewels — hand-set diamonds, hallmarked, finished to be worn for a lifetime.`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:image", content: product.image },
        { property: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ProductPage,
  notFoundComponent: ProductNotFound,
  errorComponent: ({ reset }) => {
    const router = useRouter();
    return (
      <div className="min-h-screen bg-background text-foreground">
        <AnnouncementBar />
        <Header />
        <main className="mx-auto max-w-[900px] px-6 py-32 text-center">
          <p className="text-[11px] uppercase tracking-[0.3em] text-champagne-deep">
            Something went wrong
          </p>
          <h1 className="mt-4 font-display text-3xl text-ink">We couldn't load this piece</h1>
          <button
            onClick={() => {
              reset();
              router.invalidate();
            }}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3 text-[11px] uppercase tracking-[0.25em] text-ivory hover:bg-champagne-deep"
          >
            Try again
          </button>
        </main>
        <Footer />
      </div>
    );
  },
});

function ProductNotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <AnnouncementBar />
      <Header />
      <main className="mx-auto max-w-[900px] px-6 py-32 text-center">
        <p className="text-[11px] uppercase tracking-[0.3em] text-champagne-deep">
          Not found
        </p>
        <h1 className="mt-4 font-display text-3xl text-ink">This piece is unavailable</h1>
        <p className="mx-auto mt-4 max-w-md text-sm text-foreground/70">
          The piece you're looking for may have been retired from our collection.
        </p>
        <Link
          to="/shop"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3 text-[11px] uppercase tracking-[0.25em] text-ivory hover:bg-champagne-deep"
        >
          Browse the shop
        </Link>
      </main>
      <Footer />
    </div>
  );
}

function ProductPage() {
  useLocale();
  const { product } = Route.useLoaderData() as { product: ReturnType<typeof getProductById> & object };
  const [carat, setCarat] = useState<Carat>(product.carat as Carat);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeView, setActiveView] = useState(0);
  const wishlisted = useIsWishlisted(product.id);
  const toggleWishlist = () =>
    wishlist.toggle({
      id: product.id,
      name: product.name,
      image: product.image,
      category: product.category,
      price: formatINR(priceForCarat),
      priceNum: priceForCarat,
      carat,
    });
  const navigate = useNavigate();

  const viewFilters: (string | undefined)[] = [
    undefined,
    "brightness(1.05) contrast(1.02)",
    "saturate(0.9) brightness(0.98)",
    "hue-rotate(-6deg)",
  ];

  const priceForCarat = useMemo(() => {
    const factor: Record<Carat, number> = {
      "14KT": 0.88,
      "18KT": 1.0,
      "22KT": 1.18,
      "24KT": 1.32,
    };
    const base = product.priceNum / (factor[product.carat as Carat] ?? 1);
    return Math.round(base * factor[carat]);
  }, [carat, product.carat, product.priceNum]);

  const related = useMemo(() => relatedProducts(product.id, 4), [product.id]);

  const addToCart = () => {
    cart.add(
      {
        id: product.id,
        name: product.name,
        image: product.image,
        category: product.category,
        price: formatINR(priceForCarat),
        priceNum: priceForCarat,
        carat,
      },
      qty,
    );
  };

  const handleAdd = () => {
    addToCart();
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  };

  const handleBuyNow = () => {
    addToCart();
    navigate({ to: "/checkout" });
  };


  return (
    <div className="min-h-screen bg-background text-foreground">
      <AnnouncementBar />
      <Header />

      <main className="mx-auto max-w-[1400px] px-4 pt-8 md:px-8 md:pt-12">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          <Link to="/" className="hover:text-ink">Home</Link>
          <ChevronRight className="h-3 w-3" strokeWidth={1.5} />
          <Link to="/shop" className="hover:text-ink">Shop</Link>
          <ChevronRight className="h-3 w-3" strokeWidth={1.5} />
          <span className="text-ink">{product.category}</span>
        </nav>

        <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          {/* Gallery */}
          <div className="flex flex-col gap-4">
            <Reveal>
              <div className="relative overflow-hidden rounded-[32px] border border-champagne/30 bg-ivory-deep shadow-[0_30px_80px_-40px_rgba(80,55,15,0.35)]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="aspect-square w-full object-cover transition-all duration-700"
                  style={{ filter: viewFilters[activeView] }}
                />
              </div>
            </Reveal>
            <div className="grid grid-cols-4 gap-3">
              {[0, 1, 2, 3].map((k) => {
                const active = k === activeView;
                return (
                  <button
                    key={k}
                    type="button"
                    onClick={() => setActiveView(k)}
                    aria-label={`View ${k + 1}`}
                    className={`aspect-square overflow-hidden rounded-2xl border bg-ivory-deep transition-all ${
                      active
                        ? "border-champagne-deep ring-1 ring-champagne-deep/40"
                        : "border-border/60 hover:border-champagne"
                    }`}
                  >
                    <img
                      src={product.image}
                      alt={`${product.name} view ${k + 1}`}
                      className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                      style={{ filter: viewFilters[k] }}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Details */}
          <div className="lg:sticky lg:top-24 lg:h-fit">
            <Reveal>
              <p className="text-[11px] uppercase tracking-[0.32em] text-champagne-deep">
                {product.category}
              </p>
              <h1 className="mt-3 font-display text-3xl leading-tight tracking-tight text-ink md:text-5xl">
                {product.name}
              </h1>

              <div className="mt-4 flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < Math.round(product.rating) ? "fill-champagne text-champagne" : "text-champagne/30"}`}
                      strokeWidth={1}
                    />
                  ))}
                </div>
                <span className="text-xs text-foreground/75">
                  {product.rating.toFixed(1)}
                </span>
                <span className="text-xs text-muted-foreground">
                  ({product.reviews} reviews)
                </span>
              </div>

              <div className="mt-6 flex items-baseline gap-4">
                <span className="font-display text-4xl font-semibold tracking-tight text-ink">
                  {formatINR(priceForCarat)}
                </span>
                <span className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                  incl. taxes
                </span>
              </div>

              <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />

              <p className="mt-6 text-[15px] leading-relaxed text-foreground/80">
                {product.description}
              </p>

              {/* Carat variations */}
              <div className="mt-8">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                    Gold Purity
                  </p>
                  <p className="text-[11px] text-foreground/70">
                    Selected: <span className="text-ink">{carat}</span>
                  </p>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {CARATS.map((c) => {
                    const active = c === carat;
                    return (
                      <button
                        key={c}
                        onClick={() => setCarat(c)}
                        className={`min-w-[72px] rounded-full border px-5 py-2.5 text-[12px] tracking-[0.15em] transition-all ${
                          active
                            ? "border-ink bg-ink text-ivory"
                            : "border-border bg-background text-foreground/80 hover:border-champagne"
                        }`}
                      >
                        {c}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quantity + actions */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <div className="inline-flex items-center rounded-full border border-border">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                    className="grid h-11 w-11 place-items-center text-foreground/70 hover:text-ink"
                  >
                    <Minus className="h-3.5 w-3.5" strokeWidth={1.5} />
                  </button>
                  <span className="min-w-[36px] text-center text-sm text-ink">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    aria-label="Increase quantity"
                    className="grid h-11 w-11 place-items-center text-foreground/70 hover:text-ink"
                  >
                    <Plus className="h-3.5 w-3.5" strokeWidth={1.5} />
                  </button>
                </div>

                <button
                  onClick={handleAdd}
                  className="inline-flex flex-1 min-w-[180px] items-center justify-center gap-2 rounded-full border border-ink bg-ink px-7 py-3.5 text-[11px] uppercase tracking-[0.25em] text-ivory transition-all hover:bg-champagne-deep hover:border-champagne-deep"
                >
                  {added ? (
                    <>
                      <Check className="h-4 w-4" strokeWidth={1.5} /> Added to Bag
                    </>
                  ) : (
                    "Add to Bag"
                  )}
                </button>

                <button
                  onClick={handleBuyNow}
                  className="inline-flex flex-1 min-w-[180px] items-center justify-center rounded-full border border-champagne-deep bg-transparent px-7 py-3.5 text-[11px] uppercase tracking-[0.25em] text-champagne-deep transition-all hover:bg-champagne-deep hover:text-ivory"
                >
                  Buy It Now
                </button>

                <button
                  type="button"
                  onClick={toggleWishlist}
                  aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
                  aria-pressed={wishlisted}
                  className={`grid h-11 w-11 place-items-center rounded-full border transition-all ${
                    wishlisted
                      ? "border-champagne-deep bg-champagne-deep/10 text-champagne-deep"
                      : "border-border text-foreground/70 hover:border-champagne hover:text-champagne-deep"
                  }`}
                >
                  <Heart
                    className={`h-4 w-4 transition-transform ${wishlisted ? "scale-110 fill-champagne-deep" : ""}`}
                    strokeWidth={1.5}
                  />
                </button>
              </div>

              {/* Highlights */}
              <ul className="mt-10 grid gap-3">
                {product.highlights.map((h: string) => (
                  <li key={h} className="flex items-start gap-3 text-sm text-foreground/80">
                    <span className="mt-1 grid h-4 w-4 flex-none place-items-center rounded-full bg-champagne/25">
                      <Check className="h-2.5 w-2.5 text-champagne-deep" strokeWidth={2} />
                    </span>
                    {h}
                  </li>
                ))}
              </ul>

              {/* Meta */}
              <div className="mt-8 grid grid-cols-2 gap-y-3 border-t border-border/60 pt-6 text-sm">
                <div className="text-muted-foreground text-xs uppercase tracking-[0.2em]">SKU</div>
                <div className="text-ink">{product.sku}</div>
                <div className="text-muted-foreground text-xs uppercase tracking-[0.2em]">Metal</div>
                <div className="text-ink">{product.metal}</div>
                <div className="text-muted-foreground text-xs uppercase tracking-[0.2em]">Stone</div>
                <div className="text-ink">{product.stone}</div>
                <div className="text-muted-foreground text-xs uppercase tracking-[0.2em]">Purity</div>
                <div className="text-ink">{carat}</div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Assurance strip */}
        <section className="mt-24 rounded-[28px] border border-border/60 bg-ivory-deep/40 px-6 py-8 md:px-10">
          <div className="grid gap-6 md:grid-cols-4">
            {[
              { icon: ShieldCheck, title: "BIS Hallmarked", copy: "Certified gold & diamonds" },
              { icon: Truck, title: "Free Shipping", copy: "Insured worldwide delivery" },
              { icon: RefreshCcw, title: "15-Day Returns", copy: "Easy at-home exchange" },
              { icon: Sparkles, title: "Lifetime Care", copy: "Buyback, polishing & repair" },
            ].map((f) => (
              <div key={f.title} className="flex items-center gap-4">
                <span className="grid h-11 w-11 place-items-center rounded-full border border-champagne/40 bg-ivory">
                  <f.icon className="h-5 w-5 text-champagne-deep" strokeWidth={1.4} />
                </span>
                <div>
                  <p className="font-display text-sm text-ink">{f.title}</p>
                  <p className="text-xs text-muted-foreground">{f.copy}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Reviews */}
        <ReviewsSection
          productId={product.id}
          productName={product.name}
          rating={product.rating}
          reviewCount={product.reviews}
        />

        {/* Related */}
        <section className="mt-24">
          <div className="mb-10 text-center">
            <p className="text-[11px] uppercase tracking-[0.3em] text-champagne-deep">
              You may also love
            </p>
            <h2 className="mt-3 font-display text-3xl text-ink md:text-4xl">
              Pieces that pair beautifully
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-4 md:gap-x-7">
            {related.map((p, i) => (
              <Reveal key={p.id} delay={i * 80}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </section>
      </main>

      <div className="pt-24" />
      <Footer />
    </div>
  );
}

/* ---------------- Reviews ---------------- */

const REVIEWER_NAMES = [
  "Ananya S.", "Priya R.", "Ishaan M.", "Meera K.", "Rhea D.",
  "Aditi V.", "Kavya P.", "Sanya J.", "Neha B.", "Aarav T.",
  "Diya N.", "Ira C.", "Vivaan L.", "Zara F.", "Tara G.",
];

const REVIEW_TITLES = [
  "Absolutely breathtaking",
  "Even better in person",
  "A piece to treasure",
  "Feels like an heirloom",
  "Quiet luxury done right",
  "Worth every rupee",
  "The finish is exquisite",
  "Compliments every single day",
  "Made me tear up",
  "Craftsmanship you can feel",
];

const REVIEW_BODIES = [
  "The gold catches light so softly — it feels understated in the best way. Packaging alone made it feel like a moment. Wearing it every day since it arrived.",
  "I've owned a lot of fine jewellery and this genuinely stands apart. The setting is impossibly precise and it sits so lightly. Delivery was quick, all insured.",
  "Bought this for our anniversary. My wife hasn't taken it off. The champagne tone against her skin is exactly what the photos promised, if not warmer.",
  "Reached out to their care team about resizing and they were graceful, quick and honest. That kind of service is rare now. The piece itself is beautiful.",
  "It's the sort of thing you'll want to pass on. Small in scale, enormous in feeling. Every finish detail is considered.",
  "I hesitated on the purity but 18KT is clearly the right pick — perfect warmth and durability. Couldn't be happier.",
];

function hashInt(str: string, salt = 0) {
  let h = salt;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function buildReviews(productId: string, count = 4) {
  return Array.from({ length: count }, (_, i) => {
    const h = hashInt(productId, i * 17 + 3);
    const rating = 4 + ((h >> 2) % 2); // 4 or 5
    const daysAgo = 3 + (h % 90);
    return {
      id: `${productId}-r${i}`,
      name: REVIEWER_NAMES[h % REVIEWER_NAMES.length],
      title: REVIEW_TITLES[(h >> 3) % REVIEW_TITLES.length],
      body: REVIEW_BODIES[(h >> 5) % REVIEW_BODIES.length],
      rating,
      daysAgo,
      verified: (h & 1) === 0,
      carat: (["18KT", "22KT", "14KT", "24KT"] as const)[(h >> 4) % 4],
    };
  });
}

function ReviewsSection({
  productId,
  productName,
  rating,
  reviewCount,
}: {
  productId: string;
  productName: string;
  rating: number;
  reviewCount: number;
}) {
  const [visibleReviews, setVisibleReviews] = useState(4);
  const allReviews = useMemo(
    () => buildReviews(productId, Math.max(12, Math.min(reviewCount, 24))),
    [productId, reviewCount]
  );
  const reviews = allReviews.slice(0, visibleReviews);
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [draftRating, setDraftRating] = useState(5);

  // Rating distribution (deterministic per product) — index 0 = 5★ ... index 4 = 1★
  const distribution = useMemo(() => {
    const buckets = [0, 0, 0, 0, 0];
    const h = hashInt(productId);
    buckets[0] = 72 + (h % 16); // 5★ 72-87%
    buckets[1] = 10 + ((h >> 3) % 8);
    buckets[2] = 3 + ((h >> 5) % 4);
    buckets[3] = 1 + ((h >> 7) % 2);
    buckets[4] = 1; // 1★
    const sum = buckets.reduce((s, v) => s + v, 0);
    return buckets.map((v) => Math.round((v / sum) * 100));
  }, [productId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    window.setTimeout(() => {
      setSubmitted(false);
      setShowForm(false);
    }, 2400);
  };

  return (
    <section className="mt-24">
      <Reveal>
        <div className="text-center">
          <p className="text-[11px] uppercase tracking-[0.3em] text-champagne-deep">
            From the Maison's Clients
          </p>
          <h2 className="mt-3 font-display text-3xl text-ink md:text-4xl">
            What people say about the {productName}
          </h2>
          <div className="mx-auto mt-5 h-px w-20 bg-gradient-to-r from-transparent via-champagne to-transparent" />
        </div>
      </Reveal>

      {/* Summary card */}
      <Reveal delay={80}>
        <div
          className="mt-12 grid gap-10 rounded-[28px] border border-champagne/30 bg-ivory-deep/40 p-8 md:grid-cols-[minmax(0,280px)_1fr] md:p-10"
          style={{
            boxShadow:
              "0 30px 70px -45px rgba(80,55,15,0.22), inset 0 1px 0 rgba(255,255,255,0.5)",
          }}
        >
          <div className="text-center md:border-r md:border-border/60 md:pr-8 md:text-left">
            <p className="text-[10.5px] uppercase tracking-[0.3em] text-muted-foreground">
              Overall rating
            </p>
            <div className="mt-3 flex items-baseline gap-3 md:justify-start justify-center">
              <span className="font-display text-6xl text-ink">
                {rating.toFixed(1)}
              </span>
              <span className="text-sm text-muted-foreground">/ 5</span>
            </div>
            <div className="mt-3 flex items-center gap-1 md:justify-start justify-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < Math.round(rating) ? "fill-champagne text-champagne" : "text-champagne/30"}`}
                  strokeWidth={1}
                />
              ))}
            </div>
            <p className="mt-3 text-[12px] text-muted-foreground">
              Based on {reviewCount} verified reviews
            </p>
            <button
              onClick={() => setShowForm((v) => !v)}
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-ink px-6 py-2.5 text-[10.5px] uppercase tracking-[0.25em] text-ink transition-all hover:bg-ink hover:text-ivory"
            >
              Write a review
            </button>
          </div>

          <div className="grid gap-2.5">
            {distribution.map((pct, i) => {
              const stars = 5 - i;
              return (
                <div key={stars} className="flex items-center gap-4">
                  <span className="flex w-14 items-center gap-1 text-[12px] text-foreground/75">
                    {stars}
                    <Star className="h-3 w-3 fill-champagne text-champagne" strokeWidth={1} />
                  </span>
                  <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-border/60">
                    <div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-champagne to-champagne-deep"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="w-10 text-right text-[11px] text-muted-foreground">
                    {pct}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </Reveal>

      {/* Write review form */}
      {showForm && (
        <Reveal>
          <form
            onSubmit={handleSubmit}
            className="mt-8 rounded-[24px] border border-border/60 bg-card p-6 md:p-8"
          >
            {submitted ? (
              <div className="flex flex-col items-center py-6 text-center">
                <span className="grid h-12 w-12 place-items-center rounded-full border border-champagne/50 bg-ivory">
                  <Check className="h-5 w-5 text-champagne-deep" strokeWidth={1.6} />
                </span>
                <p className="mt-4 font-display text-xl text-ink">Thank you</p>
                <p className="mt-1 text-[13px] text-muted-foreground">
                  Your review has been received and will appear shortly.
                </p>
              </div>
            ) : (
              <>
                <p className="text-[10.5px] uppercase tracking-[0.3em] text-champagne-deep">
                  Share your experience
                </p>
                <h3 className="mt-2 font-display text-2xl text-ink">Write a review</h3>

                <div className="mt-5 flex items-center gap-2">
                  <span className="text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
                    Rating
                  </span>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <button
                        type="button"
                        key={i}
                        onClick={() => setDraftRating(i + 1)}
                        aria-label={`Rate ${i + 1}`}
                      >
                        <Star
                          className={`h-5 w-5 ${
                            i < draftRating
                              ? "fill-champagne text-champagne"
                              : "text-champagne/30"
                          }`}
                          strokeWidth={1}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-[10.5px] uppercase tracking-[0.25em] text-muted-foreground">
                      Your name
                    </span>
                    <input
                      required
                      className="w-full rounded-full border border-border bg-background px-5 py-3 text-[13.5px] text-ink focus:border-champagne-deep focus:outline-none focus:ring-2 focus:ring-champagne/25"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-[10.5px] uppercase tracking-[0.25em] text-muted-foreground">
                      Review title
                    </span>
                    <input
                      required
                      className="w-full rounded-full border border-border bg-background px-5 py-3 text-[13.5px] text-ink focus:border-champagne-deep focus:outline-none focus:ring-2 focus:ring-champagne/25"
                    />
                  </label>
                </div>
                <label className="mt-4 block">
                  <span className="mb-2 block text-[10.5px] uppercase tracking-[0.25em] text-muted-foreground">
                    Your review
                  </span>
                  <textarea
                    required
                    rows={4}
                    className="w-full rounded-3xl border border-border bg-background px-5 py-4 text-[13.5px] text-ink focus:border-champagne-deep focus:outline-none focus:ring-2 focus:ring-champagne/25"
                  />
                </label>

                <div className="mt-5 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="rounded-full border border-border px-6 py-2.5 text-[10.5px] uppercase tracking-[0.25em] text-foreground/70 hover:border-champagne"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-full bg-ink px-7 py-3 text-[10.5px] uppercase tracking-[0.25em] text-ivory hover:bg-champagne-deep"
                  >
                    Submit review
                  </button>
                </div>
              </>
            )}
          </form>
        </Reveal>
      )}

      {/* Review list */}
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {reviews.map((r, i) => (
          <Reveal key={r.id} delay={i * 80}>
            <article className="relative flex h-full flex-col rounded-[22px] border border-border/60 bg-card p-6 md:p-7">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full border border-champagne/40 bg-ivory font-display text-sm text-champagne-deep">
                    {r.name.charAt(0)}
                  </span>
                  <div>
                    <p className="font-display text-[15px] text-ink">{r.name}</p>
                    <p className="text-[11px] text-muted-foreground">
                      {r.daysAgo} days ago · Purity {r.carat}
                    </p>
                  </div>
                </div>
                {r.verified && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-champagne/40 bg-ivory-deep/60 px-2.5 py-1 text-[9.5px] uppercase tracking-[0.2em] text-champagne-deep">
                    <Check className="h-2.5 w-2.5" strokeWidth={2.2} />
                    Verified
                  </span>
                )}
              </div>

              <div className="mt-4 flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star
                    key={k}
                    className={`h-3.5 w-3.5 ${k < r.rating ? "fill-champagne text-champagne" : "text-champagne/25"}`}
                    strokeWidth={1}
                  />
                ))}
              </div>

              <p className="mt-3 font-display text-[17px] leading-snug text-ink">
                {r.title}
              </p>
              <p className="mt-2 text-[13.5px] leading-relaxed text-foreground/80">
                {r.body}
              </p>
            </article>
          </Reveal>
        ))}
      </div>

      {visibleReviews < allReviews.length && (
        <div className="mt-10 text-center">
          <button
            onClick={() => setVisibleReviews((v) => v + 4)}
            className="inline-flex items-center gap-2 rounded-full border border-ink/70 px-8 py-3 text-[11px] uppercase tracking-[0.25em] text-ink hover:border-champagne-deep hover:text-champagne-deep"
          >
            Load more reviews
          </button>
        </div>
      )}
    </section>
  );
}

