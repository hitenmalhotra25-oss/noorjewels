import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Phone,
  Facebook,
  Instagram,
  Linkedin,
  Search,
  Heart,
  ShoppingBag,
  User,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Lock,
  RefreshCcw,
  Truck,
  Sparkles,


  Mail,
  MessageCircle,
  ArrowRight,
  Menu,
  X,
  Star,
  Plus,
  Minus,
  Trash2,
} from "lucide-react";
import { Reveal } from "@/components/noor/Reveal";
import { ProductCard, type Product } from "@/components/noor/ProductCard";
import { useCart, cart, cartTotals, formatINR, type CartItem } from "@/lib/cart";
import { useWishlist, wishlist, type WishlistItem } from "@/lib/wishlist";
import { Link, useLocation } from "@tanstack/react-router";
import { getHomeProduct, getShopProduct, type CatalogProduct } from "@/lib/catalog";
import { useAuth, displayName, avatarUrl } from "@/lib/useAuth";
import { useLocale, LANGUAGES, CURRENCIES, CURRENCY_CODES, type LangCode, type CurrencyCode } from "@/lib/locale";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/integrations/firebase/client";



import hero1 from "@/assets/hero-gold-model.png";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
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
import craftsmanship from "@/assets/craft-bride.png";
import promo1 from "@/assets/promo-1.jpg";
import promo2 from "@/assets/promo-2.jpg";
import bestseller from "@/assets/best-seller-model.png";
import insta1 from "@/assets/insta-1.jpg";
import insta2 from "@/assets/insta-2.jpg";
import insta3 from "@/assets/insta-3.jpg";
import insta4 from "@/assets/insta-4.jpg";
import insta5 from "@/assets/insta-5.jpg";
import insta6 from "@/assets/insta-6.jpg";
import catRings from "@/assets/cat-rings-new.jpg";
import catNecklaces from "@/assets/cat-necklaces-new.jpg";
import catEarrings from "@/assets/cat-earrings-new.jpg";
import catMangalsutras from "@/assets/cat-mangalsutras-v2.png";
import catAnklets from "@/assets/cat-anklets-new.jpg";
import catCouples from "@/assets/cat-couples-new.jpg";

// X (Twitter) outline icon
const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={className}>
    <path d="M4 4l16 16M20 4L4 20" />
  </svg>
);

function makeProducts(seed: number, count = 10): Product[] {
  return Array.from({ length: count }, (_, i) => {
    const p = getHomeProduct(seed, i);
    return {
      id: p.id,
      image: p.image,
      category: p.category,
      name: p.name,
      rating: p.rating,
      reviews: p.reviews,
      price: p.price,
      priceNum: p.priceNum,
      carat: p.carat,
    };
  });
}


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Noor Jewels — Champagne Gold & Diamond Fine Jewellery" },
      {
        name: "description",
        content:
          "Noor Jewels — a luxury jewellery house of champagne gold, diamonds and timeless heritage. Discover rings, necklaces, earrings and mangalsutras crafted with quiet brilliance.",
      },
      { property: "og:title", content: "Noor Jewels — Fine Jewellery" },
      {
        property: "og:description",
        content: "Champagne gold diamond jewellery, crafted with elegance and trusted by thousands.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  useLocale();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <AnnouncementBar />
      <Header />
      <main>
        <Hero />
        <PromoBanners />
        <FeaturedProducts />
        <TrustBadges />
        <CategoryShowcase />
        <BestSellers />
        <Testimonials />
        <Craftsmanship />
        <InstagramSection />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}

/* ---------------- Announcement Bar ---------------- */
export function AnnouncementBar() {
  const { lang, currency, setLang, setCurrency } = useLocale();
  const [openL, setOpenL] = useState(false);
  const [openC, setOpenC] = useState(false);
  const langs = LANGUAGES;
  const currs = CURRENCY_CODES;
  const curr = CURRENCIES[currency].label;
  return (
    <div className="bg-ink text-ivory text-[11px]">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-1 px-4 py-2 md:flex-row md:items-center md:justify-between md:py-2.5">
        <div className="flex items-center gap-4 tracking-wide">
          <a href="tel:+917531855999" className="flex items-center gap-1.5 hover:text-champagne transition-colors">
            <Phone className="h-3 w-3" strokeWidth={1.5} /> +91 75318 55999
          </a>
          <div className="hidden h-3 w-px bg-ivory/20 md:block" />
          <div className="hidden items-center gap-3 md:flex">
            <Facebook className="h-3.5 w-3.5 cursor-pointer hover:text-champagne transition-colors" strokeWidth={1.5} />
            <Instagram className="h-3.5 w-3.5 cursor-pointer hover:text-champagne transition-colors" strokeWidth={1.5} />
            <XIcon className="h-3.5 w-3.5 cursor-pointer hover:text-champagne transition-colors" />
            <Linkedin className="h-3.5 w-3.5 cursor-pointer hover:text-champagne transition-colors" strokeWidth={1.5} />
          </div>
        </div>
        <p className="text-center uppercase tracking-[0.25em] text-ivory/90">
          Free Worldwide Shipping
        </p>
        <div className="flex items-center justify-end gap-4 tracking-wide">
          <div className="relative">
            <button onClick={() => { setOpenL(!openL); setOpenC(false); }} className="flex items-center gap-1 hover:text-champagne transition-colors">
              {lang} <ChevronDown className={`h-3 w-3 transition-transform ${openL ? "rotate-180" : ""}`} />
            </button>
            {openL && (
              <div className="absolute right-0 top-full z-50 mt-2 min-w-[110px] overflow-hidden rounded-md border border-ivory/15 bg-ink shadow-luxe">
                {langs.map((l: LangCode) => (
                  <button key={l} onClick={() => { setLang(l); setOpenL(false); }}
                    className={`block w-full px-4 py-2 text-left text-[11px] tracking-wide transition-colors hover:bg-ivory/10 ${lang === l ? "text-champagne" : "text-ivory/90"}`}>
                    {l}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="h-3 w-px bg-ivory/20" />
          <div className="relative">
            <button onClick={() => { setOpenC(!openC); setOpenL(false); }} className="flex items-center gap-1 hover:text-champagne transition-colors">
              {curr} <ChevronDown className={`h-3 w-3 transition-transform ${openC ? "rotate-180" : ""}`} />
            </button>
            {openC && (
              <div className="absolute right-0 top-full z-50 mt-2 min-w-[130px] overflow-hidden rounded-md border border-ivory/15 bg-ink shadow-luxe">
                {currs.map((c: CurrencyCode) => (
                  <button key={c} onClick={() => { setCurrency(c); setOpenC(false); }}
                    className={`block w-full px-4 py-2 text-left text-[11px] tracking-wide transition-colors hover:bg-ivory/10 ${currency === c ? "text-champagne" : "text-ivory/90"}`}>
                    {CURRENCIES[c].label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Header ---------------- */
type PanelKind = null | "search" | "wishlist" | "cart" | "account";

export function Header() {
  const [open, setOpen] = useState(false);
  const [panel, setPanel] = useState<PanelKind>(null);
  const location = useLocation();
  const pathname = location.pathname;

  const nav: { label: string; target: string; disabled?: boolean }[] = [
    { label: "Shop", target: "/shop" },
    { label: "Collections", target: "#categories" },
    { label: "Best Sellers", target: "#bestsellers" },
    { label: "Wedding Special", target: "/wedding-special" },
    { label: "About Us", target: "#about" },
    { label: "Contact Us", target: "#contact" },
  ];

  const isActive = (target: string) => {
    if (target.startsWith("/")) {
      return pathname === target || (target !== "/" && pathname.startsWith(target));
    }
    return false;
  };

  const handleNav = (e: React.MouseEvent, item: { target: string; disabled?: boolean }) => {
    if (item.disabled) {
      e.preventDefault();
      return;
    }
    if (item.target.startsWith("/")) {
      // Let the browser handle real route navigation
      return;
    }
    if (item.target.startsWith("#")) {
      e.preventDefault();
      const onHome = typeof window !== "undefined" && window.location.pathname === "/";
      if (!onHome) {
        window.location.href = "/" + item.target;
        return;
      }
      if (item.target === "#top") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const el = document.querySelector(item.target);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      setOpen(false);
    }
  };


  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border/60 bg-ivory/90 backdrop-blur-md">
        <div className="mx-auto grid max-w-[1400px] grid-cols-[auto_1fr_auto] items-center gap-4 px-4 py-4 md:px-8 md:py-5">
          <a href="/" className="font-display text-2xl tracking-[0.18em] text-ink md:text-[1.7rem]">
            NOOR <span className="text-champagne">JEWELS</span>
          </a>
          <nav className="hidden justify-center gap-8 text-[12px] uppercase tracking-[0.22em] text-foreground/85 lg:flex">
            {nav.map((n) => (
              <a
                key={n.label}
                href={n.target}
                onClick={(e) => handleNav(e, n)}
                className={`nav-link ${isActive(n.target) ? "nav-link-active" : ""} ${n.disabled ? "cursor-default opacity-60" : ""}`}
                aria-disabled={n.disabled || undefined}
              >
                {n.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center justify-end gap-4 text-foreground/80">
            <button aria-label="Search" onClick={() => setPanel("search")} className="hover:text-champagne transition-colors">
              <Search className="h-[18px] w-[18px]" strokeWidth={1.4} />
            </button>
            <WishlistButton onOpen={() => setPanel("wishlist")} />

            <CartButton onOpen={() => setPanel("cart")} />
            <AccountButton onOpen={() => setPanel("account")} />

            <button className="lg:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {open && (
          <div className="border-t border-border/60 bg-ivory lg:hidden">
            <div className="flex flex-col gap-1 px-6 py-4">
              {nav.map((n) => (
                <a
                  key={n.label}
                  href={n.target}
                  onClick={(e) => handleNav(e, n)}
                  className={`py-2 text-sm uppercase tracking-[0.2em] ${isActive(n.target) ? "text-champagne-deep" : "text-foreground/80"} ${n.disabled ? "opacity-60" : ""}`}
                >
                  {n.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>
      <HeaderPanel kind={panel} onClose={() => setPanel(null)} />
    </>
  );
}

function HeaderPanel({ kind, onClose }: { kind: PanelKind; onClose: () => void }) {
  if (!kind) return null;

  const titles: Record<Exclude<PanelKind, null>, string> = {
    search: "Search",
    wishlist: "Your Wishlist",
    cart: "Your Bag",
    account: "Account",
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true">
      <button
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-ink/40 backdrop-blur-sm animate-in fade-in"
      />
      <aside className="relative z-10 flex h-full w-full max-w-md flex-col bg-ivory shadow-luxe animate-in slide-in-from-right">
        <div className="flex items-center justify-between border-b border-border/60 px-6 py-5">
          <h2 className="font-display text-xl tracking-wide text-ink">{titles[kind]}</h2>
          <button onClick={onClose} aria-label="Close" className="text-foreground/70 hover:text-champagne">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-6 text-sm text-foreground/80">
          {kind === "search" && <SearchPanelBody onClose={onClose} />}

          {kind === "wishlist" && <WishlistPanelBody onClose={onClose} />}

          {kind === "cart" && <CartPanelBody onClose={onClose} />}
          {kind === "account" && <AccountPanelBody />}

        </div>
      </aside>
    </div>
  );
}

function AccountButton({ onOpen }: { onOpen: () => void }) {
  const { user } = useAuth();
  const avatar = avatarUrl(user);

  return (
    <button
      aria-label={user ? "Your account" : "Sign in"}
      onClick={onOpen}
      className="hidden hover:text-champagne transition-colors sm:block"
    >
      {avatar ? (
        <img
          src={avatar}
          alt=""
          className="h-[22px] w-[22px] rounded-full border border-champagne/60 object-cover"
        />
      ) : (
        <User className="h-[18px] w-[18px]" strokeWidth={1.4} />
      )}
    </button>
  );
}

function GoogleGlyph() {
  return (
    <svg viewBox="0 0 48 48" className="h-[18px] w-[18px]" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.6l6.7-6.7C35.6 2.6 30.2.5 24 .5 14.6.5 6.5 5.8 2.6 13.6l7.8 6c1.9-5.7 7.2-10.1 13.6-10.1z" />
      <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-2.8-.4-4.1H24v8.4h12.7c-.3 2.1-1.6 5.3-4.7 7.4l7.6 5.9c4.5-4.2 6.9-10.3 6.9-17.6z" />
      <path fill="#FBBC05" d="M10.4 28.6a14.5 14.5 0 0 1 0-9.2l-7.8-6A23.9 23.9 0 0 0 0 24c0 3.9.9 7.5 2.6 10.6l7.8-6z" />
      <path fill="#34A853" d="M24 47.5c6.2 0 11.5-2 15.6-5.4l-7.6-5.9c-2 1.4-4.7 2.4-8 2.4-6.4 0-11.7-4.3-13.6-10.1l-7.8 6C6.5 42.2 14.6 47.5 24 47.5z" />
    </svg>
  );
}

function AccountPanelBody() {
  const { user, loading, signOut } = useAuth();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogle = async () => {
  setBusy(true);
  setError(null);

  try {
    const provider = new GoogleAuthProvider();

    await signInWithPopup(auth, provider);
  } catch (error) {
    console.error("Google sign-in error:", error);
    setError("We couldn't complete the sign in. Please try again.");
  } finally {
    setBusy(false);
  }
};

  if (loading) {
    return <p className="text-xs uppercase tracking-[0.22em] text-foreground/50">Loading…</p>;
  }

  if (user) {
    const avatar = avatarUrl(user);
    return (
      <div className="space-y-7">
        <div className="flex items-center gap-4 rounded-[24px] border border-champagne/40 bg-gradient-to-br from-champagne/15 to-transparent px-5 py-5">
          {avatar ? (
            <img src={avatar} alt="" className="h-12 w-12 rounded-full border border-champagne/50 object-cover" />
          ) : (
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-champagne/50 text-champagne">
              <User className="h-5 w-5" strokeWidth={1.4} />
            </span>
          )}
          <div className="min-w-0">
            <p className="font-display text-lg leading-tight text-ink">{displayName(user)}</p>
            <p className="truncate text-xs text-foreground/60">{user.email}</p>
          </div>
        </div>
        <p className="text-[11px] uppercase tracking-[0.24em] text-champagne">Welcome to the Maison</p>
        <p className="text-xs leading-relaxed text-foreground/70">
          Your wishlist and bag now travel with you. Enjoy priority access to new collections and private previews.
        </p>
        <button
          onClick={() => signOut()}
          className="w-full rounded-full border border-ink/20 py-3 text-[11px] uppercase tracking-[0.22em] text-ink transition-colors hover:border-champagne hover:text-champagne"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-7">
      <div className="space-y-3">
        <p className="text-[11px] uppercase tracking-[0.24em] text-champagne">Members Only</p>
        <p className="text-xs leading-relaxed text-foreground/70">
          Sign in or create your Noor Jewels account with your Google email — no passwords to remember.
        </p>
      </div>
      <button
        onClick={handleGoogle}
        disabled={busy}
        className="flex w-full items-center justify-center gap-3 rounded-full border border-ink/15 bg-background py-3.5 text-[11px] uppercase tracking-[0.22em] text-ink shadow-sm transition-all hover:border-champagne hover:shadow-md disabled:opacity-60"
      >
        <GoogleGlyph />
        {busy ? "Connecting…" : "Continue with Google"}
      </button>
      {error && <p className="text-xs text-destructive">{error}</p>}
      <p className="text-center text-[11px] leading-relaxed text-foreground/50">
        New to Noor? Your account is created automatically the first time you continue with Google.
      </p>
    </div>
  );
}


const POPULAR_SEARCHES = [
  "Solitaire ring",
  "Diamond necklace",
  "Mangalsutra",
  "Stud earrings",
  "Couple rings",
];

const SEARCH_INDEX: CatalogProduct[] = Array.from({ length: 36 }, (_, i) => getShopProduct(i));

const SUGGESTED: CatalogProduct[] = [0, 3, 5, 7, 10].map((i) => getShopProduct(i));

function SearchRow({ product: p, onClose }: { product: CatalogProduct; onClose: () => void }) {
  return (
    <Link
      to="/product/$id"
      params={{ id: p.id }}
      onClick={onClose}
      className="flex items-center gap-4 rounded-2xl border border-transparent p-2 transition-colors hover:border-border hover:bg-background"
    >
      <img src={p.image} alt={p.name} loading="lazy" className="h-16 w-16 rounded-xl object-cover" />
      <div className="min-w-0 flex-1">
        <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/55">{p.category}</p>
        <p className="truncate font-display text-[15px] text-ink">{p.name}</p>
        <p className="text-xs text-foreground/60">{p.carat}</p>
      </div>
      <span className="font-display text-base font-semibold text-ink">{formatINR(p.priceNum)}</span>
    </Link>
  );
}

function SearchPanelBody({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const results = q
    ? SEARCH_INDEX.filter((p) => {
      const hay = `${p.name} ${p.category} ${p.metal} ${p.stone} ${p.carat}`.toLowerCase();
      return q.split(/\s+/).some((w) => hay.includes(w));
    }).slice(0, 10)
    : [];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 rounded-full border border-border bg-background px-4 py-3">
        <Search className="h-4 w-4 text-foreground/60" strokeWidth={1.5} />
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search rings, necklaces, earrings…"
          className="w-full bg-transparent text-sm outline-none placeholder:text-foreground/40"
        />
        {query && (
          <button aria-label="Clear search" onClick={() => setQuery("")} className="text-foreground/50 hover:text-champagne">
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <div>
        <p className="mb-2 text-[11px] uppercase tracking-[0.22em] text-foreground/55">Popular searches</p>
        <div className="flex flex-wrap gap-2">
          {POPULAR_SEARCHES.map((t) => (
            <button
              key={t}
              onClick={() => setQuery(t)}
              className="rounded-full border border-border px-3 py-1.5 text-xs text-foreground/75 transition-colors hover:border-champagne hover:bg-champagne/10 hover:text-ink"
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {q && (
        <div>
          <p className="mb-3 text-[11px] uppercase tracking-[0.22em] text-foreground/55">
            {results.length ? `${results.length} result${results.length > 1 ? "s" : ""}` : "No results"}
          </p>
          {results.length === 0 ? (
            <div>
              <div className="rounded-2xl border border-champagne/40 bg-champagne/10 px-5 py-6 text-center">
                <p className="font-display text-[21px] text-ink">No product found</p>
                <p className="mx-auto mt-2 max-w-[280px] text-xs leading-relaxed text-foreground/65">
                  Nothing matched “{query}”. Try a category such as rings, necklaces or mangalsutras.
                </p>
              </div>

              <div className="my-7 flex items-center gap-3">
                <span className="h-px flex-1 bg-border" />
                <p className="text-[11px] uppercase tracking-[0.22em] text-foreground/55">
                  Explore other products
                </p>
                <span className="h-px flex-1 bg-border" />
              </div>

              <ul className="space-y-3">
                {SUGGESTED.map((p) => (
                  <li key={p.id}>
                    <SearchRow product={p} onClose={onClose} />
                  </li>
                ))}
              </ul>
              <Link
                to="/shop"
                onClick={onClose}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full border border-ink px-6 py-3 text-[10px] uppercase tracking-[0.28em] text-ink transition-colors hover:bg-ink hover:text-ivory"
              >
                Explore All <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
            </div>
          ) : (
            <>
              <ul className="space-y-3">
                {results.map((p) => (
                  <li key={p.id}>
                    <SearchRow product={p} onClose={onClose} />
                  </li>
                ))}
              </ul>
              <Link
                to="/shop"
                onClick={onClose}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full border border-ink px-6 py-3 text-[10px] uppercase tracking-[0.28em] text-ink transition-colors hover:bg-ink hover:text-ivory"
              >
                Browse Full Collection <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}


function CartButton({ onOpen }: { onOpen: () => void }) {
  const items = useCart();
  const { count } = cartTotals(items);
  return (
    <button
      aria-label="Cart"
      onClick={onOpen}
      className="relative hover:text-champagne transition-colors"
    >
      <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.4} />
      {count > 0 && (
        <span className="absolute -right-2 -top-2 grid h-4 min-w-[16px] place-items-center rounded-full bg-champagne-deep px-1 text-[10px] font-medium leading-none text-ivory">
          {count}
        </span>
      )}
    </button>
  );
}

function WishlistButton({ onOpen }: { onOpen: () => void }) {
  const items = useWishlist();
  return (
    <button
      aria-label="Wishlist"
      onClick={onOpen}
      className="relative hidden hover:text-champagne transition-colors sm:block"
    >
      <Heart className="h-[18px] w-[18px]" strokeWidth={1.4} />
      {items.length > 0 && (
        <span className="absolute -right-2 -top-2 grid h-4 min-w-[16px] place-items-center rounded-full bg-champagne-deep px-1 text-[10px] font-medium leading-none text-ivory">
          {items.length}
        </span>
      )}
    </button>
  );
}

function WishlistPanelBody({ onClose }: { onClose: () => void }) {
  const items = useWishlist();

  if (items.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
        <Heart className="h-10 w-10 text-champagne" strokeWidth={1.2} />
        <p className="font-display text-lg text-ink">Your wishlist is empty</p>
        <p className="text-xs text-foreground/60">Tap the heart on any piece to save it for later.</p>
      </div>
    );
  }

  const moveToCart = (item: WishlistItem) => {
    cart.add({
      id: item.id,
      name: item.name,
      image: item.image,
      category: item.category,
      price: item.price,
      priceNum: item.priceNum,
      carat: item.carat,
    });
    wishlist.remove(item.id);
  };

  return (
    <div className="flex h-full flex-col">
      <p className="mb-4 text-[11px] uppercase tracking-[0.22em] text-foreground/55">
        {items.length} {items.length === 1 ? "piece" : "pieces"} saved
      </p>
      <ul className="flex-1 space-y-4 overflow-y-auto pr-1">
        {items.map((item) => (
          <li key={item.id} className="flex gap-4 rounded-2xl border border-border/60 bg-ivory-deep/40 p-3">
            <Link
              to="/product/$id"
              params={{ id: item.id }}
              onClick={onClose}
              className="block h-20 w-20 flex-none overflow-hidden rounded-xl bg-ivory"
            >
              <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
            </Link>
            <div className="flex flex-1 flex-col justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/55">{item.category}</p>
                <Link
                  to="/product/$id"
                  params={{ id: item.id }}
                  onClick={onClose}
                  className="mt-0.5 block font-display text-sm leading-tight text-ink hover:text-champagne-deep"
                >
                  {item.name}
                </Link>
                <p className="mt-1 font-display text-sm text-ink">{formatINR(item.priceNum)}</p>
              </div>
              <div className="mt-2 flex items-center justify-between gap-3">
                <button
                  onClick={() => moveToCart(item)}
                  className="text-[10px] uppercase tracking-[0.22em] text-champagne-deep hover:underline underline-offset-4"
                >
                  Move to Bag
                </button>
                <button
                  onClick={() => wishlist.remove(item.id)}
                  aria-label="Remove"
                  className="text-foreground/50 hover:text-champagne-deep"
                >
                  <Trash2 className="h-4 w-4" strokeWidth={1.4} />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
const GIFT_TIERS = [
  { threshold: 15000, label: "Surprise Jewellery Gift" },
  { threshold: 35000, label: "Complimentary Ring" },
  { threshold: 50000, label: "Complimentary Pendant" },
] as const;

function GiftTracker({ subtotal }: { subtotal: number }) {
  const max = GIFT_TIERS[GIFT_TIERS.length - 1].threshold;
  const pct = Math.min(100, (subtotal / max) * 100);
  const unlocked = GIFT_TIERS.filter((t) => subtotal >= t.threshold);
  const next = GIFT_TIERS.find((t) => subtotal < t.threshold);

  return (
    <div className="mt-5 mb-4 rounded-2xl border border-champagne/40 bg-gradient-to-br from-ivory-deep/70 to-ivory px-5 py-4">
      <p className="text-center text-[11px] uppercase tracking-[0.25em] text-champagne-deep">
        {next ? (
          <>
            Add <span className="font-display font-bold text-ink normal-case tracking-normal text-[18px]">{formatINR(next.threshold - subtotal)}</span> more to unlock <span className="text-ink">{next.label}</span>
          </>
        ) : (
          <>All gifts unlocked — thank you</>
        )}
      </p>

      <div className="relative mt-4 h-[3px] w-full rounded-full bg-champagne/20">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-champagne to-champagne-deep transition-[width] duration-700 ease-out"
          style={{ width: `${pct}%` }}
        />
        {GIFT_TIERS.map((t) => {
          const left = (t.threshold / max) * 100;
          const isUnlocked = subtotal >= t.threshold;
          return (
            <div
              key={t.threshold}
              className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${left}%` }}
            >
              <div
                className={`h-2.5 w-2.5 rounded-full border transition-colors ${isUnlocked
                    ? "bg-champagne-deep border-champagne-deep"
                    : "bg-ivory border-champagne/60"
                  }`}
              />
            </div>
          );
        })}
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2 text-center">
        {GIFT_TIERS.map((t) => {
          const isUnlocked = subtotal >= t.threshold;
          return (
            <div
              key={t.threshold}
              className={`rounded-lg border px-2 py-2 transition-colors ${isUnlocked
                  ? "border-champagne-deep/60 bg-champagne/10"
                  : "border-border/60 bg-ivory/40"
                }`}
            >
              <p className={`font-display font-bold text-[18px] leading-none tracking-tight ${isUnlocked ? "text-ink" : "text-ink/85"}`}>
                {formatINR(t.threshold)}
              </p>
              <p className={`mt-1 text-[9px] uppercase tracking-[0.18em] ${isUnlocked ? "text-champagne-deep" : "text-muted-foreground"}`}>
                {isUnlocked ? "Unlocked" : t.label}
              </p>
            </div>
          );
        })}
      </div>

      {unlocked.length > 0 && (
        <p className="mt-3 text-center text-[10px] uppercase tracking-[0.22em] text-foreground/60">
          {unlocked.length} of {GIFT_TIERS.length} gifts unlocked
        </p>
      )}
    </div>
  );
}

function CartPanelBody({ onClose }: { onClose: () => void }) {
  const items = useCart();
  const { count, subtotal } = cartTotals(items);

  if (count === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
        <ShoppingBag className="h-10 w-10 text-champagne" strokeWidth={1.2} />
        <p className="font-display text-lg text-ink">Your bag is empty</p>
        <p className="text-xs text-foreground/60">Start exploring our latest edits to fill your bag.</p>
        <Link
          to="/shop"
          onClick={onClose}
          className="mt-2 rounded-full bg-ink px-6 py-2.5 text-[11px] uppercase tracking-[0.22em] text-ivory hover:bg-ink/90"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="-mx-6 flex h-full flex-col">
      <div className="flex-1 overflow-y-auto px-6">
        <ul className="divide-y divide-border/60">
          {items.map((it) => (
            <CartLine key={it.key} item={it} />
          ))}
        </ul>
      </div>
      <div className="border-t border-border/60 bg-ivory-deep/50 px-6 py-5">
        <GiftTracker subtotal={subtotal} />
        <div className="mb-3 mt-4 flex items-center justify-between text-sm">
          <span className="text-foreground/70">Subtotal</span>
          <span className="font-display text-lg text-ink">{formatINR(subtotal)}</span>
        </div>
        <p className="mb-4 text-[11px] text-muted-foreground">
          Taxes and shipping calculated at checkout.
        </p>
        <button
          onClick={onClose}
          className="w-full rounded-full border border-border py-3 text-[11px] uppercase tracking-[0.25em] text-foreground/80 hover:border-champagne"
        >
          Continue Shopping
        </button>
        <Link
          to="/checkout"
          onClick={onClose}
          className="mt-2 block w-full rounded-full bg-ink py-3 text-center text-[11px] uppercase tracking-[0.25em] text-ivory hover:bg-champagne-deep transition-colors"
        >
          Checkout
        </Link>
      </div>
    </div>
  );
}

function CartLine({ item }: { item: CartItem }) {
  return (
    <li className="flex gap-4 py-5">
      <div className="h-20 w-20 flex-none overflow-hidden rounded-xl bg-ivory-deep">
        <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
      </div>
      <div className="flex flex-1 flex-col justify-between">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              {item.category}
            </p>
            <p className="mt-0.5 truncate font-display text-sm text-ink">{item.name}</p>
            <p className="mt-0.5 text-[11px] text-foreground/60">{item.carat}</p>
          </div>
          <button
            onClick={() => cart.remove(item.key)}
            aria-label="Remove"
            className="text-foreground/50 hover:text-champagne-deep"
          >
            <Trash2 className="h-4 w-4" strokeWidth={1.5} />
          </button>
        </div>
        <div className="mt-2 flex items-end justify-between">
          <div className="inline-flex items-center rounded-full border border-border">
            <button
              onClick={() => cart.updateQty(item.key, item.qty - 1)}
              aria-label="Decrease"
              className="grid h-7 w-7 place-items-center text-foreground/70 hover:text-ink"
            >
              <Minus className="h-3 w-3" strokeWidth={1.5} />
            </button>
            <span className="min-w-[24px] text-center text-xs text-ink">{item.qty}</span>
            <button
              onClick={() => cart.updateQty(item.key, item.qty + 1)}
              aria-label="Increase"
              className="grid h-7 w-7 place-items-center text-foreground/70 hover:text-ink"
            >
              <Plus className="h-3 w-3" strokeWidth={1.5} />
            </button>
          </div>
          <span className="font-display text-sm text-ink">
            {formatINR(item.priceNum * item.qty)}
          </span>
        </div>
      </div>
    </li>
  );
}



/* ---------------- Hero ---------------- */
const slides = [
  {
    image: hero1,
    eyebrow: "New Maison Collection",
    title: "Light, set in gold.",
    text: "An ode to quiet brilliance. Diamonds cradled in champagne gold, made to be inherited.",
  },
  {
    image: hero2,
    eyebrow: "Bridal 2026",
    title: "Worn for a lifetime.",
    text: "Heirloom necklaces, hand-finished in our atelier — for the moments that define us.",
  },
  {
    image: hero3,
    eyebrow: "The Rings Edit",
    title: "A vow, in champagne gold.",
    text: "Solitaires, eternity bands and signature halos for the promises that matter most.",
  },
];

function Hero() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % slides.length), 6500);
    return () => clearInterval(id);
  }, []);
  return (
    <section className="px-3 pt-3 md:px-6 md:pt-6">
      <div className="relative mx-auto max-w-[1400px] overflow-hidden rounded-3xl">
        <div className="relative h-[78vh] min-h-[520px] w-full md:h-[82vh]">
          {slides.map((s, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-[1400ms] ease-in-out ${i === idx ? "opacity-100" : "opacity-0"}`}
            >
              <img
                src={s.image}
                alt=""
                className={`h-full w-full object-cover transition-transform duration-[8000ms] ease-out ${i === idx ? "scale-105" : "scale-100"}`}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-ivory/70 via-ivory/10 to-transparent" />
            </div>
          ))}

          <div className="relative z-10 flex h-full items-center">
            <div className="w-full px-6 md:max-w-xl md:px-16">
              {slides.map((s, idx) => (
                <div
                  key={idx}
                  className={`transition-all duration-1000 ${i === idx ? "opacity-100 translate-y-0" : "absolute opacity-0 translate-y-6 pointer-events-none"}`}
                >
                  <p className="text-[11px] uppercase tracking-[0.35em] text-champagne">{s.eyebrow}</p>
                  <h1 className="mt-5 font-display text-5xl leading-[1.05] text-ink md:text-7xl">{s.title}</h1>
                  <p className="mt-5 max-w-md text-sm leading-relaxed text-foreground/75 md:text-base">{s.text}</p>
                  <button className="group mt-8 inline-flex items-center gap-3 rounded-full bg-ink px-7 py-3.5 text-[11px] uppercase tracking-[0.3em] text-ivory transition-all duration-500 hover:bg-champagne-deep hover:shadow-luxe">
                    Discover the Collection
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setI(idx)}
                aria-label={`Slide ${idx + 1}`}
                className={`h-[3px] rounded-full transition-all duration-500 ${i === idx ? "w-10 bg-ink" : "w-5 bg-ink/30"}`}
              />
            ))}
          </div>

          <button
            onClick={() => setI((p) => (p - 1 + slides.length) % slides.length)}
            className="absolute left-4 top-1/2 z-10 hidden -translate-y-1/2 place-items-center rounded-full bg-ivory/80 p-3 text-ink backdrop-blur transition-all hover:bg-ivory md:grid"
            aria-label="Previous"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
          </button>
          <button
            onClick={() => setI((p) => (p + 1) % slides.length)}
            className="absolute right-4 top-1/2 z-10 hidden -translate-y-1/2 place-items-center rounded-full bg-ivory/80 p-3 text-ink backdrop-blur transition-all hover:bg-ivory md:grid"
            aria-label="Next"
          >
            <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Promo Banners ---------------- */
function PromoBanners() {
  const banners = [
    { image: promo1, eyebrow: "The Heritage Edit", title: "Crafted to be passed on.", cta: "Explore Heritage" },
    { image: promo2, eyebrow: "Bridal Atelier", title: "Make the moment eternal.", cta: "Discover Bridal" },
  ];
  return (
    <section className="px-3 py-10 md:px-6 md:py-16">
      <div className="mx-auto grid max-w-[1400px] gap-4 md:grid-cols-2 md:gap-6">
        {banners.map((b, i) => (
          <Reveal key={b.title} delay={i * 120}>
            <div className="group relative overflow-hidden rounded-3xl bg-ivory-deep">
              <div className="aspect-[16/10] w-full overflow-hidden">
                <img
                  src={b.image}
                  alt={b.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ivory/85 via-ivory/20 to-transparent p-7 md:p-10">
                <p className="text-[10px] uppercase tracking-[0.3em] text-champagne">{b.eyebrow}</p>
                <h3 className="mt-3 font-display text-3xl text-ink md:text-4xl">{b.title}</h3>
                <button className="mt-5 inline-flex w-fit items-center gap-2 rounded-full border border-ink bg-transparent px-5 py-2.5 text-[10px] uppercase tracking-[0.28em] text-ink transition-all hover:bg-ink hover:text-ivory">
                  {b.cta} <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Featured Products ---------------- */
function FeaturedProducts() {
  const tabs = ["Rings", "Necklaces", "Earrings", "Mangalsutras", "Couple Rings"];
  const [tab, setTab] = useState(0);
  const [page, setPage] = useState(0);
  const products = makeProducts(tab + 1, 10 * 3); // 3 pages worth
  const view = products.slice(page * 10, page * 10 + 10);

  return (
    <section className="px-4 pt-16 pb-2 md:px-6 md:pt-24 md:pb-4">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <div className="text-center">
            <h2 className="mt-3 font-display text-4xl text-ink md:text-5xl">Featured Products</h2>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[11px] uppercase tracking-[0.25em]">
            {tabs.map((t, idx) => (
              <button
                key={t}
                onClick={() => { setTab(idx); setPage(0); }}
                className={`pb-1.5 transition-colors ${tab === idx ? "text-ink border-b border-ink" : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                {t}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 md:gap-x-6 lg:grid-cols-5">
          {view.map((p, i) => (
            <Reveal key={`${tab}-${page}-${p.id}`} delay={(i % 5) * 80}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>

        <div className="mt-12 flex items-center justify-center gap-4">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="grid h-11 w-11 place-items-center rounded-full border border-border text-ink transition-all hover:bg-ink hover:text-ivory disabled:opacity-30"
            aria-label="Previous"
          >
            <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
          </button>
          <button
            onClick={() => setPage((p) => Math.min(2, p + 1))}
            disabled={page === 2}
            className="grid h-11 w-11 place-items-center rounded-full border border-border text-ink transition-all hover:bg-ink hover:text-ivory disabled:opacity-30"
            aria-label="Next"
          >
            <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Trust Badges ---------------- */
function TrustBadges() {
  const badges = [
    { icon: ShieldCheck, title: "Certified / Hallmarked Jewellery", sub: "BIS Hallmarked" },
    { icon: Lock, title: "Secure Payments", sub: "100% Secure Checkout" },
    { icon: RefreshCcw, title: "Easy Returns / Exchange", sub: "7-Day Easy Returns" },
    { icon: Truck, title: "Free Shipping", sub: "Free Shipping on orders above ₹999" },
  ];
  return (
    <section className="relative px-4 py-20 md:px-6 md:py-28">
      {/* Decorative background — matches Categories / Craftsmanship */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 40%, rgba(212,175,108,0.10) 0%, transparent 65%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.35 0 0 0 0 0.27 0 0 0 0 0.13 0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />

      <div className="relative mx-auto max-w-[1400px]">
        <Reveal>
          <div className="text-center">
            <p className="text-[10.5px] uppercase tracking-[0.32em] text-champagne-deep/80">
              The Maison
            </p>
            <h2 className="mt-3 font-display text-4xl text-ink md:text-5xl">
              The Noor Jewels Promise
            </h2>
            <div className="mx-auto mt-5 h-px w-20 bg-gradient-to-r from-transparent via-champagne to-transparent" />
            <p className="mx-auto mt-5 max-w-lg text-[13.5px] leading-relaxed text-muted-foreground md:text-[14.5px]">
              Every piece is crafted with authenticity, precision, and timeless elegance.
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="relative mt-14">
            <div className="relative grid grid-cols-1 gap-y-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-y-0">
              {badges.map((b, i) => (
                <Reveal key={b.title} delay={200 + i * 110}>
                  <div
                    className={`group/badge relative flex flex-col items-center px-6 text-center md:px-8 ${i > 0
                        ? "lg:before:absolute lg:before:left-0 lg:before:top-1/2 lg:before:h-20 lg:before:w-px lg:before:-translate-y-1/2 lg:before:bg-gradient-to-b lg:before:from-transparent lg:before:via-champagne/45 lg:before:to-transparent"
                        : ""
                      }`}
                  >
                    {/* minimal champagne ring badge */}
                    <div className="relative grid h-[76px] w-[76px] shrink-0 place-items-center rounded-full">
                      <div
                        aria-hidden
                        className="absolute inset-0 rounded-full border border-champagne/50"
                      />
                      <div
                        aria-hidden
                        className="absolute inset-2 rounded-full border border-champagne/25"
                      />
                      <b.icon
                        className="relative h-8 w-8 text-champagne-deep transition-colors duration-500 group-hover/badge:text-ink"
                        strokeWidth={1.5}
                      />
                    </div>

                    <h4 className="mt-6 font-display text-[17px] leading-snug text-ink md:text-[18px]">
                      {b.title}
                    </h4>
                    <div className="mx-auto mt-3 h-px w-8 bg-champagne/60" />
                    <p className="mt-3 max-w-[200px] text-[12.5px] leading-relaxed text-muted-foreground/85">
                      {b.sub}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
}

/* ---------------- Category Showcase ---------------- */
function CategoryShowcase() {
  const cats = [
    { name: "Rings", image: catRings },
    { name: "Necklaces", image: catNecklaces },
    { name: "Earrings", image: catEarrings },
    { name: "Mangalsutras", image: catMangalsutras },
    { name: "Anklets", image: catAnklets },
    { name: "Couple Rings", image: catCouples },
  ];
  return (
    <section id="categories" className="relative overflow-hidden px-4 pt-3 pb-16 md:px-6 md:pt-5 md:pb-24 scroll-mt-28">
      {/* Decorative background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 35%, rgba(212,175,108,0.10) 0%, transparent 65%)",
        }}
      />
      {/* Barely-visible jewelry pattern */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #5b4422 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* Soft grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.35 0 0 0 0 0.27 0 0 0 0 0.13 0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />

      <div className="relative mx-auto max-w-[1400px]">
        <Reveal>
          <div className="text-center">
            <h2 className="mt-3 font-display text-4xl text-ink md:text-5xl">Our Categories</h2>
          </div>
        </Reveal>
        <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-12 sm:grid-cols-3 md:gap-x-7 lg:grid-cols-6">
          {cats.map((c, i) => (
            <Reveal key={c.name} delay={i * 80}>
              <a href="#" className="group block">
                <div
                  className="relative overflow-hidden rounded-[28px] aspect-square transition-all duration-[700ms] ease-out group-hover:-translate-y-[3px] group-hover:shadow-[0_30px_60px_-25px_rgba(80,55,15,0.35)]"
                  style={{
                    boxShadow:
                      "inset 0 1px 0 rgba(255,255,255,0.55), 0 14px 30px -18px rgba(80,55,15,0.28)",
                  }}
                >
                  <img
                    src={c.image}
                    alt={c.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
                  />
                  {/* warm vignette */}
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(ellipse at 50% 40%, transparent 55%, rgba(60,40,10,0.32) 100%)",
                    }}
                  />
                  {/* subtle top highlight */}
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(255,255,255,0.18) 0%, transparent 30%)",
                    }}
                  />
                  <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-inset ring-champagne/40" />
                </div>
                <p className="mt-5 text-center font-display text-[19px] font-medium tracking-[-0.005em] text-ink transition-colors duration-300 group-hover:text-champagne-deep">
                  <span className="relative inline-block">
                    {c.name}
                    <span className="absolute -bottom-1 left-1/2 h-px w-0 -translate-x-1/2 bg-champagne-deep transition-all duration-500 ease-out group-hover:w-full" />
                  </span>
                </p>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Best Sellers ---------------- */
function BestSellers() {
  const items = makeProducts(7, 6);
  return (
    <section id="bestsellers" className="bg-ivory-deep px-4 py-16 md:px-6 md:py-24 scroll-mt-28">
      <div className="mx-auto grid max-w-[1400px] gap-8 lg:grid-cols-[420px_1fr] lg:gap-10">
        <Reveal>
          <div className="relative h-full min-h-[520px] overflow-hidden rounded-3xl">
            <img
              src={bestseller}
              alt="Best Sellers"
              loading="lazy"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-ink/10 via-ink/35 to-ink/85" />
            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10">
              <p className="text-[10px] uppercase tracking-[0.35em] text-champagne">The Maison</p>
              <h2 className="mt-3 font-display text-4xl leading-tight text-ivory drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)] md:text-5xl">Best Sellers</h2>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-ivory/85">
                The pieces our clients return to again and again — quietly remarkable, eternally worn.
              </p>
              <button className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-ivory px-6 py-3 text-[10px] uppercase tracking-[0.3em] text-ink transition-all hover:bg-champagne hover:text-ivory">
                Shop All Bestsellers <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6">
          {items.map((p, i) => (
            <Reveal key={p.id} delay={150 + (i % 3) * 80}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Testimonials ---------------- */
function Testimonials() {
  const all = [
    { name: "Aanya Verma", rating: 5, review: "The detail is breathtaking. My solitaire feels like it was made only for me." },
    { name: "Isha Mehta", rating: 5, review: "Heirloom-quality. The packaging alone felt like an experience." },
    { name: "Riya Kapoor", rating: 5, review: "I have ordered three pieces. Each one is more beautiful than the last." },
    { name: "Tanvi Shah", rating: 4.9, review: "The champagne gold is unlike anything else. Genuinely luxurious." },
    { name: "Meera Iyer", rating: 5, review: "Their bridal set turned my wedding into a moment of pure light." },
    { name: "Sara Khan", rating: 5, review: "Quietly elegant. It draws compliments without ever shouting." },
    { name: "Diya Rao", rating: 5, review: "Service was exceptional. They guided me to the perfect piece." },
  ];
  const [page, setPage] = useState(0);
  const perView = 5;
  const view = all.slice(page * perView, page * perView + perView);
  const totalPages = Math.ceil(all.length / perView);

  return (
    <section className="bg-beige/40 px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <div className="text-center">
            <h2 className="mt-3 font-display text-4xl text-ink md:text-5xl">Loved By Our Customers</h2>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {view.map((t, i) => (
            <Reveal key={t.name} delay={i * 100}>
              <div className="flex h-full flex-col rounded-2xl bg-card p-6 shadow-soft transition-all duration-500 hover:shadow-luxe">
                <div className="grid h-12 w-12 place-items-center rounded-full bg-champagne-gradient text-ivory">
                  <User className="h-5 w-5" strokeWidth={1.4} />
                </div>
                <p className="mt-4 font-display text-base text-champagne">{t.name}</p>
                <div className="mt-1 flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star
                      key={idx}
                      className={`h-3.5 w-3.5 ${idx < Math.round(t.rating) ? "fill-champagne text-champagne" : "text-border"}`}
                      strokeWidth={1}
                    />
                  ))}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t.review}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 flex items-center justify-center gap-4">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="grid h-11 w-11 place-items-center rounded-full border border-border text-ink transition-all hover:bg-ink hover:text-ivory disabled:opacity-30"
            aria-label="Previous"
          >
            <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
          </button>
          <button
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page >= totalPages - 1}
            className="grid h-11 w-11 place-items-center rounded-full border border-border text-ink transition-all hover:bg-ink hover:text-ivory disabled:opacity-30"
            aria-label="Next"
          >
            <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
          </button>
        </div>

        <p className="mt-10 text-center font-display text-lg italic text-foreground/80 md:text-xl">
          Crafted with elegance and trusted by thousands.
        </p>
      </div>
    </section>
  );
}

/* ---------------- Craftsmanship ---------------- */
function Craftsmanship() {
  const stats = [
    { value: "10,000+", label: "Happy Customers" },
    { value: "BIS", label: "Hallmarked Jewelry" },
    { value: "4.9", label: "Customer Rating" },
    { value: "100%", label: "Premium Craftsmanship" },
  ];
  return (
    <section id="about" className="px-4 py-16 md:px-6 md:py-24 scroll-mt-28">

      <div className="mx-auto grid max-w-[1400px] items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <div className="overflow-hidden rounded-3xl bg-ivory-deep">
            <img
              src={craftsmanship}
              alt="Indian bride in heirloom gold, surrounded by movement"
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out hover:scale-105"
            />
          </div>
        </Reveal>

        <div>
          <Reveal>
            <h2 className="mt-3 font-display text-4xl leading-tight text-ink md:text-5xl">
              The Art of Craftsmanship
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-muted-foreground md:text-base">
              For three generations, our master goldsmiths have shaped champagne gold and rare
              diamonds into pieces meant to outlive trend, time and season. Every solder, every
              setting, every polish is signed by a single hand — a quiet act of devotion to a
              client we may never meet.
            </p>
            <button className="group mt-7 inline-flex items-center gap-3 rounded-full border border-ink px-6 py-3 text-[10px] uppercase tracking-[0.3em] text-ink transition-all hover:bg-ink hover:text-ivory">
              Discover Our Story
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
            </button>
          </Reveal>

          <div className="mt-10 grid grid-cols-2 gap-y-8 border-t border-border pt-8 md:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 120}>
                <div>
                  <p className="font-display text-3xl text-champagne md:text-4xl">{s.value}</p>
                  <p className="mt-1.5 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Instagram ---------------- */
function InstagramSection() {
  const scatter = [
    { src: insta1, top: "6%", left: "2%", w: "158px", rot: "-5deg" },
    { src: insta2, top: "10%", right: "3%", w: "172px", rot: "4deg" },
    { src: insta3, top: "56%", left: "5%", w: "164px", rot: "3.5deg" },
    { src: insta4, top: "60%", right: "3%", w: "152px", rot: "-4.5deg" },
    { src: insta5, top: "32%", left: "13%", w: "132px", rot: "7deg" },
    { src: insta6, top: "34%", right: "11%", w: "142px", rot: "-6deg" },
  ];
  const benefits = [
    { label: "Giveaway Alerts", note: "First to know, every month" },
    { label: "Sale Alerts", note: "Private windows, quietly shared" },
    { label: "Limited Collections", note: "Small runs, rarely repeated" },
  ];

  return (
    <section className="relative overflow-hidden bg-ivory px-4 py-24 md:px-6 md:py-32">
      {/* soft champagne wash + grain, consistent with the rest of the maison */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 68% 52% at 50% 42%, rgba(212,175,108,0.09) 0%, transparent 68%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.35 0 0 0 0 0.27 0 0 0 0 0.13 0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />

      {/* Scattered editorial photos — flat, framed like contact prints */}
      <div className="absolute inset-0 mx-auto max-w-[1400px]">
        {scatter.map((s, i) => (
          <Reveal
            key={i}
            delay={i * 110}
            className="absolute hidden md:block"
            style={{ top: s.top, left: s.left, right: s.right, width: s.w }}
          >
            <div
              className="group overflow-hidden rounded-[4px] bg-ivory p-[6px] ring-1 ring-champagne/25 transition-transform duration-700 ease-out hover:rotate-0"
              style={{ transform: `rotate(${s.rot})` }}
            >
              <img
                src={s.src}
                alt=""
                loading="lazy"
                className="h-full w-full rounded-[2px] object-cover opacity-90 transition-opacity duration-700 group-hover:opacity-100"
              />
            </div>
          </Reveal>
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-2xl">
        <Reveal>
          <div className="relative rounded-[2px] border border-champagne/30 bg-ivory/85 px-8 py-14 backdrop-blur-sm md:px-16 md:py-16">
            {/* corner hairlines */}
            {[
              "left-4 top-4 border-l border-t",
              "right-4 top-4 border-r border-t",
              "left-4 bottom-4 border-b border-l",
              "right-4 bottom-4 border-b border-r",
            ].map((pos) => (
              <span
                key={pos}
                aria-hidden
                className={`pointer-events-none absolute h-5 w-5 border-champagne/45 ${pos}`}
              />
            ))}

            <div className="relative text-center">
              <h2 className="font-display text-4xl leading-tight text-ink md:text-[3.1rem]">
                Follow Us On Instagram
              </h2>
              <div className="mx-auto mt-5 flex items-center justify-center gap-3">
                <span className="h-px w-10 bg-gradient-to-r from-transparent to-champagne" />
                <span className="text-[10.5px] uppercase tracking-[0.34em] text-champagne-deep">
                  @noorjewels
                </span>
                <span className="h-px w-10 bg-gradient-to-l from-transparent to-champagne" />
              </div>
              <p className="mx-auto mt-6 max-w-md text-[13.5px] leading-relaxed text-foreground/70">
                Behind the atelier, between the showcases. Quiet stories of light, gold and the
                women who wear them.
              </p>

              <div className="mt-9 flex justify-center">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-3 rounded-full border border-ink px-7 py-3.5 text-[10.5px] uppercase tracking-[0.28em] text-ink transition-colors duration-500 hover:bg-ink hover:text-ivory"
                >
                  <Instagram
                    className="h-4 w-4 transition-transform duration-500 group-hover:scale-110"
                    strokeWidth={1.5}
                  />
                  Follow the Maison
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-px overflow-hidden border border-champagne/25 bg-champagne/25 sm:grid-cols-3">
          {benefits.map((b, i) => (
            <Reveal key={b.label} delay={140 + i * 110}>
              <div className="h-full bg-ivory/90 px-5 py-7 text-center backdrop-blur-sm transition-colors duration-500 hover:bg-ivory">
                <p className="font-display text-[16px] tracking-wide text-ink">{b.label}</p>
                <p className="mt-1.5 text-[11px] leading-relaxed text-muted-foreground">{b.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Newsletter ---------------- */
function Newsletter() {
  return (
    <section className="px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-[1300px]">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] px-6 py-16 md:px-16 md:py-24">
            <div className="absolute inset-0 bg-ivory-gradient" />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 15% 20%, oklch(0.88 0.08 78 / 0.55), transparent 55%), radial-gradient(circle at 85% 80%, oklch(0.78 0.09 70 / 0.45), transparent 55%), radial-gradient(circle at 65% 25%, oklch(0.92 0.05 82 / 0.5), transparent 60%)",
              }}
            />
            <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-champagne/30 blur-3xl" />
            <div className="absolute -right-24 -bottom-24 h-80 w-80 rounded-full bg-champagne-deep/20 blur-3xl" />

            <div className="relative mx-auto max-w-2xl text-center">
              <Sparkles className="mx-auto h-6 w-6 text-champagne" strokeWidth={1.3} />
              <h2 className="mt-5 font-display text-4xl leading-tight text-ink md:text-5xl">
                Subscribe To Our Newsletter & Get Up To 25% Off Your First Order
              </h2>
              <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-foreground/75">
                Be the first to know — exclusive launches, new collections and member-only offers
                from the Noor Jewels Maison.
              </p>

              <form className="mx-auto mt-9 flex max-w-xl flex-col gap-3 sm:flex-row sm:gap-2">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 rounded-full border border-ink/15 bg-ivory/80 px-6 py-4 text-sm text-ink placeholder:text-muted-foreground focus:border-champagne-deep focus:outline-none focus:ring-2 focus:ring-champagne/30"
                />
                <button
                  type="submit"
                  className="rounded-full bg-ink px-7 py-4 text-[11px] uppercase tracking-[0.28em] text-ivory transition-all hover:bg-champagne-deep hover:shadow-luxe"
                >
                  Claim My 25% Off
                </button>
              </form>

              <label className="mt-5 flex items-start justify-center gap-2 text-[11px] text-muted-foreground">
                <input type="checkbox" className="mt-0.5 h-3.5 w-3.5 accent-[oklch(0.62_0.085_70)]" defaultChecked />
                <span>I agree to receive marketing emails and accept the privacy policy.</span>
              </label>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Footer ---------------- */
export function Footer() {
  return (
    <footer id="contact" className="relative mt-10 overflow-hidden scroll-mt-28">
      {/* Curved divider */}
      <svg className="block w-full" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
        <path
          d="M0,60 C360,0 1080,120 1440,40 L1440,80 L0,80 Z"
          fill="url(#footerGrad)"
        />
        <defs>
          <linearGradient id="footerGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="oklch(0.92 0.05 82)" />
            <stop offset="50%" stopColor="oklch(0.78 0.07 78)" />
            <stop offset="100%" stopColor="oklch(0.92 0.05 82)" />
          </linearGradient>
        </defs>
      </svg>

      <div className="relative bg-ivory-deep">
        <div
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 0%, oklch(0.88 0.06 78 / 0.5), transparent 50%), radial-gradient(circle at 80% 100%, oklch(0.82 0.08 70 / 0.35), transparent 55%)",
          }}
        />

        <div className="relative mx-auto max-w-[1400px] px-6 py-16 md:px-10 md:py-20">
          <div className="grid gap-14 lg:grid-cols-[auto_auto_auto_1fr] lg:gap-x-20">
            <FooterCol
              title="Shop"
              links={["Rings", "Necklaces", "Earrings", "Bracelets", "New Arrivals", "Best Sellers"]}
            />
            <FooterCol
              title="Company"
              links={["About Us", "Our Story", "Contact Us", "FAQs", "Privacy Policy", "Terms & Conditions"]}
            />
            <FooterCol
              title="Customer Care"
              links={["Shipping Information", "Returns & Exchanges", "Order Tracking", "Care Guide", "Size Guide"]}
            />

            <Reveal>
              <div className="lg:pl-6">
                <h3 className="max-w-md font-display text-2xl leading-tight text-ink md:text-3xl">
                  Timeless Elegance, Crafted For Every Moment
                </h3>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
                  Each Noor Jewels piece is thoughtfully designed to celebrate beauty,
                  craftsmanship, and the moments that matter most.
                </p>

                <div className="mt-8">
                  <h4 className="font-display text-lg font-bold text-ink underline underline-offset-[6px] decoration-1 decoration-ink/40">Contact Us</h4>
                  <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2.5"><Mail className="h-4 w-4 text-champagne" strokeWidth={1.4} /> contact@noorjewels.com</li>
                    <li className="flex items-center gap-2.5"><Phone className="h-4 w-4 text-champagne" strokeWidth={1.4} /> +91 75318 55999</li>
                    <li className="flex items-center gap-2.5"><Instagram className="h-4 w-4 text-champagne" strokeWidth={1.4} /> @noorjewels</li>
                    <li className="flex items-center gap-2.5"><MessageCircle className="h-4 w-4 text-champagne" strokeWidth={1.4} /> +91 75318 55999</li>
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="mt-16 flex flex-col items-start justify-between gap-8 border-t border-ink/10 pt-10 md:flex-row md:items-center">
            <a href="/" className="font-display text-5xl leading-none tracking-tight text-ink md:text-6xl">
              Noor <span className="text-champagne">Jewels</span>
            </a>
            <div className="flex items-center gap-3">
              <a href="#" aria-label="Facebook" className="grid h-10 w-10 place-items-center rounded-[10px] bg-ink/[0.06] text-ink/70 transition-all hover:bg-ink hover:text-ivory">
                <Facebook className="h-[18px] w-[18px]" strokeWidth={1.6} />
              </a>
              <a href="#" aria-label="Instagram" className="grid h-10 w-10 place-items-center rounded-[10px] bg-ink/[0.06] text-ink/70 transition-all hover:bg-ink hover:text-ivory">
                <Instagram className="h-[18px] w-[18px]" strokeWidth={1.6} />
              </a>
            </div>
          </div>

          <p className="mt-8 text-center text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            © 2026 Noor Jewels. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h4 className="font-display text-lg font-bold text-ink underline underline-offset-[6px] decoration-1 decoration-ink/40">{title}</h4>
      <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
        {links.map((l) => (
          <li key={l}>
            <a href="#" className="nav-link">{l}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
