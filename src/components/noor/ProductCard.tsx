import { Heart, Star } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { cart, formatINR } from "@/lib/cart";
import { useLocale } from "@/lib/locale";
import { wishlist, useIsWishlisted } from "@/lib/wishlist";

export interface Product {
  id: string;
  image: string;
  category: string;
  name: string;
  rating: number;
  reviews: number;
  price: string;
  priceNum?: number;
  carat?: string;
}

function parsePriceNum(price: string): number {
  const digits = price.replace(/[^\d]/g, "");
  return digits ? Number(digits) : 0;
}

export function ProductCard({ product }: { product: Product }) {
  const wished = useIsWishlisted(product.id);
  useLocale();
  const priceNum = product.priceNum ?? parsePriceNum(product.price);
  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    cart.add({
      id: product.id,
      name: product.name,
      image: product.image,
      category: product.category,
      price: product.price,
      priceNum: product.priceNum ?? parsePriceNum(product.price),
      carat: product.carat ?? "18KT",
    });
  };

  const handleWish = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    wishlist.toggle({
      id: product.id,
      name: product.name,
      image: product.image,
      category: product.category,
      price: product.price,
      priceNum: product.priceNum ?? parsePriceNum(product.price),
      carat: product.carat ?? "18KT",
    });
  };

  return (
    <Link
      to="/product/$id"
      params={{ id: product.id }}
      className="group flex flex-col"
    >
      <div className="relative overflow-hidden rounded-2xl bg-ivory-deep aspect-square">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
        />
        <button
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={wished}
          onClick={handleWish}
          className={`absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full transition-all duration-500 ${
            wished
              ? "bg-champagne-deep text-ivory opacity-100 translate-x-0"
              : "bg-ivory/90 text-ink opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 hover:bg-champagne hover:text-ivory"
          }`}
        >
          <Heart className={`h-4 w-4 ${wished ? "fill-ivory" : ""}`} strokeWidth={1.5} />
        </button>
      </div>

      <div className="mt-4 px-1">
        <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          {product.category}
        </p>

        <div className="relative mt-1.5 h-14 overflow-hidden">
          {/* Default state: name + price on one row, rating below */}
          <div className="absolute inset-0 transition-all duration-500 ease-out group-hover:opacity-0 group-hover:-translate-y-2">
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="font-display text-base leading-tight text-foreground truncate">
                {product.name}
              </h3>
              <span className="font-display text-[1.45rem] font-semibold leading-tight text-ink whitespace-nowrap tracking-tight">
                {formatINR(priceNum)}
              </span>
            </div>
            <div className="mt-2 flex items-center gap-1.5">
              <Star className="h-3.5 w-3.5 fill-champagne text-champagne" strokeWidth={1} />
              <span className="text-xs text-foreground">{product.rating.toFixed(1)}</span>
              <span className="text-xs text-muted-foreground">({product.reviews})</span>
            </div>
          </div>
          {/* Hover state: Add to cart */}
          <button
            onClick={handleAdd}
            className="absolute inset-0 flex items-center justify-center rounded-full border border-ink bg-ink text-[11px] uppercase tracking-[0.25em] text-ivory opacity-0 translate-y-2 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-y-0 hover:bg-champagne-deep hover:border-champagne-deep"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
}
