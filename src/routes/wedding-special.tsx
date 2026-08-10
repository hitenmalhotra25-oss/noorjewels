import { createFileRoute } from "@tanstack/react-router";
import { AnnouncementBar, Header, Footer } from "./index";
import { ProductCard, type Product } from "@/components/noor/ProductCard";
import { Reveal } from "@/components/noor/Reveal";
import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

import weddingHero from "@/assets/wedding-hero-rain.png";
import ring1 from "@/assets/ring-1.jpg";
import ring2 from "@/assets/ring-2.jpg";
import ring3 from "@/assets/ring-3.jpg";
import couple1 from "@/assets/couple-1.jpg";
import mangalsutra1 from "@/assets/mangalsutra-1.jpg";
import necklace1 from "@/assets/necklace-1.jpg";
import necklace2 from "@/assets/necklace-2.jpg";
import earring1 from "@/assets/earring-1.jpg";
import bannerCouple from "@/assets/wedding-couple-rings.png";
import bannerMangalsutra from "@/assets/mangalsutra-panel-edited.png";


import { useLocale } from "@/lib/locale";

export const Route = createFileRoute("/wedding-special")({
  head: () => ({
    meta: [
      { title: "Wedding Special — Noor Jewels" },
      {
        name: "description",
        content:
          "For the two who choose forever. A curated wedding collection of couple rings and mangalsutras from Noor Jewels — heirlooms crafted for the promises you will keep.",
      },
      { property: "og:title", content: "Wedding Special — Noor Jewels" },
      {
        property: "og:description",
        content:
          "A curated wedding collection of couple rings and mangalsutras — heirlooms crafted for a lifetime.",
      },
    ],
  }),
  component: WeddingSpecial,
});

const coupleRings: Product[] = [
  { id: "wed-cr-1", image: couple1, category: "Couple Rings", name: "Ananta Bond", rating: 4.9, reviews: 312, price: "₹58,900", priceNum: 58900, carat: "18KT" },
  { id: "wed-cr-2", image: ring1, category: "Couple Rings", name: "Saath Nibhaana", rating: 4.8, reviews: 224, price: "₹64,500", priceNum: 64500, carat: "18KT" },
  { id: "wed-cr-3", image: ring2, category: "Couple Rings", name: "Vachan Pair", rating: 4.9, reviews: 287, price: "₹72,300", priceNum: 72300, carat: "22KT" },
  { id: "wed-cr-4", image: ring3, category: "Couple Rings", name: "Aavaran Duet", rating: 4.7, reviews: 198, price: "₹49,800", priceNum: 49800, carat: "18KT" },
  { id: "wed-cr-5", image: ring1, category: "Couple Rings", name: "Yugal Pair", rating: 4.8, reviews: 241, price: "₹67,100", priceNum: 67100, carat: "22KT" },
  { id: "wed-cr-6", image: couple1, category: "Couple Rings", name: "Milan Bands", rating: 4.9, reviews: 268, price: "₹54,200", priceNum: 54200, carat: "18KT" },
];

const mangalsutras: Product[] = [
  { id: "wed-ms-1", image: mangalsutra1, category: "Mangalsutras", name: "Suhaag Heritage", rating: 4.9, reviews: 341, price: "₹42,700", priceNum: 42700, carat: "22KT" },
  { id: "wed-ms-2", image: necklace1, category: "Mangalsutras", name: "Praanam Classic", rating: 4.8, reviews: 267, price: "₹38,200", priceNum: 38200, carat: "22KT" },
  { id: "wed-ms-3", image: necklace2, category: "Mangalsutras", name: "Devi Contemporary", rating: 4.9, reviews: 302, price: "₹55,600", priceNum: 55600, carat: "18KT" },
  { id: "wed-ms-4", image: earring1, category: "Mangalsutras", name: "Anokhi Modern", rating: 4.8, reviews: 213, price: "₹47,400", priceNum: 47400, carat: "18KT" },
  { id: "wed-ms-5", image: mangalsutra1, category: "Mangalsutras", name: "Saubhagya Two-Vati", rating: 4.9, reviews: 289, price: "₹51,300", priceNum: 51300, carat: "22KT" },
  { id: "wed-ms-6", image: necklace1, category: "Mangalsutras", name: "Mangala Minimal", rating: 4.7, reviews: 176, price: "₹34,900", priceNum: 34900, carat: "18KT" },
];


function WeddingSpecial() {
  useLocale();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <AnnouncementBar />
      <Header />
      <main>
        {/* Full-screen hero — text reveals when cursor rests in the centre; frost covers whole screen */}
        <section className="relative h-[100svh] w-full overflow-hidden">
         <img
  src={weddingHero}
  alt="Indian bride and groom in the rain — a moment of quiet devotion"
  className="absolute inset-0 h-full w-full object-cover"
/>

          {/* Centre hover trigger */}
          <div className="peer absolute left-1/2 top-1/2 h-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2" />

          {/* Full-screen frosted overlay + text */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-ink/40 opacity-0 backdrop-blur-2xl backdrop-saturate-150 transition-opacity duration-700 ease-out peer-hover:opacity-100">
            <div className="mx-6 max-w-3xl px-6 text-center md:px-10">
              <p className="text-[11px] uppercase tracking-[0.4em] text-ivory/90">
                The Noor Wedding Collection
              </p>
              <h1 className="mt-5 font-display text-4xl leading-[1.05] text-ivory md:text-6xl lg:text-[4.5rem]">
                For the two who choose <em className="italic text-champagne">forever</em>.
              </h1>
              <div className="mx-auto mt-7 h-px w-20 bg-champagne/80" />
              <p className="mt-6 text-[13px] leading-[1.9] text-ivory/85 md:text-[14px]">
                Heirlooms for the promises you will keep — long after the marigolds fade.
              </p>
            </div>
          </div>
        </section>


        {/* Emotional message */}
        <section className="bg-ivory-deep px-6 py-24 md:py-36">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <p className="text-[11px] uppercase tracking-[0.35em] text-champagne-deep">
                A promise, kept in gold
              </p>
            </Reveal>
            <Reveal delay={120}>
              <div className="mx-auto mt-8 max-w-xl space-y-4 text-center font-display text-[19px] leading-[1.55] text-ink/90 md:text-[21px]">
                <p>
                  You know that quiet moment when two hands find each other and
                  everything else fades away.
                </p>
                <p className="italic text-champagne-deep">No words.</p>
                <p>Just a feeling that says — this is where I belong.</p>
                <p className="text-ink/70">
                  The flowers will fade.
                  <br />
                  The celebrations will become memories.
                </p>
                <p>But one small circle of gold will stay.</p>
                <p className="mx-auto max-w-lg italic leading-[1.5] text-[26px] text-ink md:text-[30px]">
                  One day your grandmother will smile when she sees it.
                  <br />
                  One day your daughter will ask about it.
                </p>
                <p className="text-ink/70">
                  That is why Noor does not create jewellery for the wedding day.
                </p>
                <p>We create the pieces that stay long after it.</p>
                <p className="italic text-champagne-deep">
                  Made for two people who keep choosing each other, every single day.
                </p>
              </div>
            </Reveal>
            <Reveal delay={360}>
              <div className="mx-auto mt-12 h-px w-16 bg-champagne-deep/60" />
              <p className="mt-6 font-display text-sm uppercase tracking-[0.4em] text-champagne-deep">
                Made to be passed down
              </p>
            </Reveal>
          </div>
        </section>

        <CollectionSection
          eyebrow="For the two of you"
          title="Couple Rings"
          copy="Bands that mirror one another — one for her hand, one for his. Cast in a single pour of champagne gold, engraved with the date you'll never forget."
          products={coupleRings}
          ctaLabel="Explore All Couple Rings"
          panelImage={bannerCouple}
        />

        <CollectionSection
          eyebrow="The sacred thread"
          title="Mangalsutras"
          copy="From the classical two-vati heritage design to modern minimalist reinterpretations — each mangalsutra is strung by hand, blessed, and finished to sit close to the heart."
          products={mangalsutras}
          ctaLabel="Explore All Mangalsutras"
          panelImage={bannerMangalsutra}
          panelAlt="Groom fastening a sacred mangalsutra necklace around the bride's neck"
          alt
        />
      </main>
      <Footer />
    </div>
  );
}

function CollectionSection({
  eyebrow,
  title,
  copy,
  products,
  ctaLabel,
  panelImage,
  panelAlt,
  alt,
}: {
  eyebrow: string;
  title: string;
  copy: string;
  products: Product[];
  ctaLabel: string;
  panelImage: string;
  panelAlt?: string;
  alt?: boolean;
}) {
  return (
    <section className={`px-4 py-20 md:px-6 md:py-28 ${alt ? "bg-ivory" : "bg-background"}`}>
      <div className="mx-auto max-w-[1400px]">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.35em] text-champagne-deep">
              {eyebrow}
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-5 font-display text-4xl leading-tight text-ink md:text-5xl">
              {title}
            </h2>
            <div className="mx-auto mt-5 h-px w-16 bg-champagne-deep/50" />
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-6 text-[14px] leading-[1.9] text-foreground/80 md:text-[15px]">
              {copy}
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[420px_1fr] lg:gap-10">
          <Reveal>
            <div className="relative h-full min-h-[520px] overflow-hidden rounded-3xl">
              <img
                src={panelImage}
                alt={panelAlt || title}
                loading="lazy"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ink/5 to-ink/25" />
            </div>
          </Reveal>

          <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6">
            {products.map((p, i) => (
              <Reveal key={p.id} delay={150 + (i % 3) * 80}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal>
          <div className="mt-14 flex justify-center">
            <Link
              to="/shop"
              className="inline-flex items-center gap-3 rounded-full border border-ink/60 px-9 py-4 text-[11px] uppercase tracking-[0.3em] text-ink transition-all hover:border-champagne-deep hover:bg-ink hover:text-ivory"
            >
              {ctaLabel} <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

