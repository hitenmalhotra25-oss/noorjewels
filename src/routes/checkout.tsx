import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  ChevronRight,
  ShieldCheck,
  Truck,
  Lock,
  Sparkles,
  Check,
  CreditCard,
  Wallet,
  Minus,
  Plus,
  X,
} from "lucide-react";
import { Reveal } from "@/components/noor/Reveal";
import { AnnouncementBar, Header, Footer } from "./index";
import { cart, cartTotals, formatINR, useCart, type CartItem } from "@/lib/cart";

import { useLocale } from "@/lib/locale";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Noor Jewels" },
      {
        name: "description",
        content:
          "Complete your Noor Jewels order — hallmarked champagne gold jewellery, insured worldwide delivery and lifetime care, checkout in confidence.",
      },
      { property: "og:title", content: "Checkout — Noor Jewels" },
      {
        property: "og:description",
        content:
          "Complete your Noor Jewels order — hallmarked champagne gold jewellery with insured delivery and lifetime care.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CheckoutPage,
});

type PaymentMethod = "card" | "upi" | "cod";

function CheckoutPage() {
  useLocale();
  const items = useCart();
  const { count, subtotal } = cartTotals(items);
  const navigate = useNavigate();

  const [payment, setPayment] = useState<PaymentMethod>("card");
  const [placed, setPlaced] = useState(false);
  const [orderId, setOrderId] = useState<string>("");

  const shipping = subtotal > 0 && subtotal < 5000 ? 200 : 0;
  const gst = Math.round(subtotal * 0.03);
  const total = subtotal + shipping + gst;

  const handlePlace = (e: React.FormEvent) => {
    e.preventDefault();
    if (count === 0) return;
    const id = `NJ-${Date.now().toString().slice(-8)}`;
    setOrderId(id);
    setPlaced(true);
    cart.clear();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (placed) {
    return <OrderConfirmation orderId={orderId} />;
  }

  if (count === 0) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <AnnouncementBar />
        <Header />
        <main className="mx-auto max-w-[820px] px-6 py-32 text-center">
          <p className="text-[11px] uppercase tracking-[0.3em] text-champagne-deep">
            Your bag is empty
          </p>
          <h1 className="mt-4 font-display text-4xl text-ink">
            Nothing to check out yet
          </h1>
          <p className="mx-auto mt-4 max-w-md text-sm text-foreground/70">
            Explore the atelier and add a piece to begin your Noor journey.
          </p>
          <Link
            to="/shop"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3 text-[11px] uppercase tracking-[0.25em] text-ivory hover:bg-champagne-deep"
          >
            Discover the collection
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <AnnouncementBar />
      <Header />

      <main className="mx-auto max-w-[1400px] px-4 pt-8 pb-24 md:px-8 md:pt-12">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          <Link to="/" className="hover:text-ink">Home</Link>
          <ChevronRight className="h-3 w-3" strokeWidth={1.5} />
          <Link to="/shop" className="hover:text-ink">Shop</Link>
          <ChevronRight className="h-3 w-3" strokeWidth={1.5} />
          <span className="text-ink">Checkout</span>
        </nav>

        {/* Editorial heading */}
        <Reveal>
          <div className="text-center">
            <p className="text-[11px] uppercase tracking-[0.32em] text-champagne-deep">
              The Final Detail
            </p>
            <h1 className="mt-3 font-display text-4xl leading-tight text-ink md:text-5xl">
              Complete Your Order
            </h1>
            <div className="mx-auto mt-5 h-px w-20 bg-gradient-to-r from-transparent via-champagne to-transparent" />
            <p className="mx-auto mt-5 max-w-md text-[13.5px] leading-relaxed text-muted-foreground">
              A moment away from being yours. Every piece is packed by hand in
              our signature Noor case.
            </p>
          </div>
        </Reveal>

        {/* Step progress */}
        <Reveal delay={80}>
          <div className="mx-auto mt-10 flex max-w-2xl items-center justify-between gap-3 text-[10.5px] uppercase tracking-[0.26em]">
            {[
              { label: "Bag", done: true },
              { label: "Details", done: true },
              { label: "Payment", done: false },
            ].map((s, i, arr) => (
              <div key={s.label} className="flex flex-1 items-center gap-3">
                <div className="flex items-center gap-2.5">
                  <span
                    className={`grid h-6 w-6 place-items-center rounded-full border text-[10px] ${
                      s.done
                        ? "border-champagne-deep bg-champagne-deep text-ivory"
                        : "border-ink bg-ink text-ivory"
                    }`}
                  >
                    {s.done ? <Check className="h-3 w-3" strokeWidth={2} /> : i + 1}
                  </span>
                  <span className="text-ink">{s.label}</span>
                </div>
                {i < arr.length - 1 && (
                  <span className="h-px flex-1 bg-gradient-to-r from-champagne/60 to-champagne/20" />
                )}
              </div>
            ))}
          </div>
        </Reveal>

        <form
          onSubmit={handlePlace}
          className="mt-14 grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14"
        >
          {/* Left — details */}
          <div className="space-y-10">
            <ContactPanel />
            <ShippingPanel />
            <PaymentPanel value={payment} onChange={setPayment} />

            <div className="hidden lg:block">
              <PlaceOrderButton total={total} />
            </div>
          </div>

          {/* Right — order summary */}
          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <Reveal delay={120}>
              <div
                className="relative overflow-hidden rounded-[28px] border border-champagne/30 bg-ivory-deep/40 p-6 md:p-8"
                style={{
                  boxShadow:
                    "0 40px 80px -45px rgba(80,55,15,0.28), 0 8px 24px -14px rgba(80,55,15,0.10), inset 0 1px 0 rgba(255,255,255,0.55)",
                }}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-1/2"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.4) 0%, transparent 100%)",
                  }}
                />
                <div className="relative">
                  <div className="mb-6 flex items-baseline justify-between">
                    <div>
                      <p className="text-[10.5px] uppercase tracking-[0.3em] text-champagne-deep">
                        Order Summary
                      </p>
                      <h2 className="mt-1 font-display text-2xl text-ink">
                        Your Selection
                      </h2>
                    </div>
                    <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                      {count} {count === 1 ? "piece" : "pieces"}
                    </span>
                  </div>

                  <ul className="divide-y divide-border/60">
                    {items.map((it) => (
                      <SummaryLine key={it.key} item={it} />
                    ))}
                  </ul>

                  <div className="mt-6 border-t border-border/60 pt-6">
                    <Row label="Subtotal" value={formatINR(subtotal)} />
                    <Row
                      label="Shipping"
                      value={shipping === 0 ? "Complimentary" : formatINR(shipping)}
                      muted={shipping === 0}
                    />
                    <Row label="GST (3%)" value={formatINR(gst)} />
                  </div>

                  <div className="mt-5 flex items-baseline justify-between border-t border-champagne/30 pt-5">
                    <span className="text-[11px] uppercase tracking-[0.25em] text-ink">
                      Total
                    </span>
                    <span className="font-display text-3xl text-ink">
                      {formatINR(total)}
                    </span>
                  </div>

                  <div className="mt-6 grid gap-3 text-[12px] text-foreground/75">
                    <TrustLine icon={ShieldCheck} text="BIS-hallmarked, certified diamonds" />
                    <TrustLine icon={Truck} text="Insured worldwide delivery" />
                    <TrustLine icon={Sparkles} text="Lifetime care & buyback" />
                    <TrustLine icon={Lock} text="256-bit encrypted checkout" />
                  </div>
                </div>
              </div>
            </Reveal>

            <div className="mt-6 lg:hidden">
              <PlaceOrderButton total={total} />
            </div>

            <button
              type="button"
              onClick={() => navigate({ to: "/shop" })}
              className="mt-4 w-full text-center text-[11px] uppercase tracking-[0.22em] text-foreground/70 hover:text-ink"
            >
              ← Continue shopping
            </button>
          </aside>
        </form>
      </main>

      <Footer />
    </div>
  );
}

/* ---------------- Panels ---------------- */

function PanelShell({
  step,
  title,
  eyebrow,
  children,
}: {
  step: number;
  title: string;
  eyebrow: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal>
      <section
        className="relative overflow-hidden rounded-[28px] border border-border/60 bg-card p-6 md:p-8"
        style={{
          boxShadow:
            "0 30px 70px -45px rgba(80,55,15,0.22), inset 0 1px 0 rgba(255,255,255,0.5)",
        }}
      >
        <div className="mb-6 flex items-center gap-4">
          <span className="grid h-9 w-9 place-items-center rounded-full border border-champagne/50 font-display text-sm text-champagne-deep">
            {step}
          </span>
          <div>
            <p className="text-[10.5px] uppercase tracking-[0.3em] text-champagne-deep">
              {eyebrow}
            </p>
            <h2 className="font-display text-xl text-ink md:text-2xl">{title}</h2>
          </div>
        </div>
        {children}
      </section>
    </Reveal>
  );
}

function ContactPanel() {
  return (
    <PanelShell step={1} eyebrow="Step One" title="Contact">
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Email address" name="email" type="email" placeholder="you@example.com" required />
        <Field label="Phone (with country code)" name="phone" type="tel" placeholder="+91 98xxxxxxxx" required />
      </div>
      <label className="mt-4 flex items-center gap-3 text-[12.5px] text-foreground/75">
        <input type="checkbox" defaultChecked className="h-4 w-4 accent-[color:var(--champagne-deep)]" />
        Send me atelier updates & private previews.
      </label>
    </PanelShell>
  );
}

function ShippingPanel() {
  return (
    <PanelShell step={2} eyebrow="Step Two" title="Shipping Address">
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="First name" name="firstName" required />
        <Field label="Last name" name="lastName" required />
        <Field label="Street address" name="address1" className="md:col-span-2" required />
        <Field label="Apartment, suite (optional)" name="address2" className="md:col-span-2" />
        <Field label="City" name="city" required />
        <Field label="State / Region" name="state" required />
        <Field label="Postal code" name="postal" required />
        <Field label="Country" name="country" defaultValue="India" required />
      </div>
      <div className="mt-6 rounded-2xl border border-champagne/30 bg-ivory-deep/40 px-5 py-4 text-[12.5px] text-foreground/80">
        <p className="flex items-center gap-2">
          <Truck className="h-4 w-4 text-champagne-deep" strokeWidth={1.5} />
          Estimated delivery <strong className="mx-1 text-ink">3–5 business days</strong>
          · insured & signature required.
        </p>
      </div>
    </PanelShell>
  );
}

function PaymentPanel({
  value,
  onChange,
}: {
  value: PaymentMethod;
  onChange: (v: PaymentMethod) => void;
}) {
  const methods: { id: PaymentMethod; label: string; sub: string; icon: React.ElementType }[] = [
    { id: "card", label: "Credit / Debit Card", sub: "Visa, Mastercard, Amex, Rupay", icon: CreditCard },
    { id: "upi", label: "UPI", sub: "GPay, PhonePe, Paytm & more", icon: Wallet },
    { id: "cod", label: "Cash on Delivery", sub: "Available on orders under ₹25,000", icon: Sparkles },
  ];

  return (
    <PanelShell step={3} eyebrow="Step Three" title="Payment">
      <div className="grid gap-3">
        {methods.map((m) => {
          const active = value === m.id;
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => onChange(m.id)}
              className={`flex items-center justify-between gap-4 rounded-2xl border px-5 py-4 text-left transition-all ${
                active
                  ? "border-ink bg-ivory-deep/60"
                  : "border-border/60 bg-background hover:border-champagne"
              }`}
            >
              <div className="flex items-center gap-4">
                <span
                  className={`grid h-10 w-10 place-items-center rounded-full border ${
                    active ? "border-champagne-deep bg-ink text-ivory" : "border-champagne/40 text-champagne-deep"
                  }`}
                >
                  <m.icon className="h-4 w-4" strokeWidth={1.5} />
                </span>
                <div>
                  <p className="font-display text-[15px] text-ink">{m.label}</p>
                  <p className="text-[12px] text-muted-foreground">{m.sub}</p>
                </div>
              </div>
              <span
                className={`grid h-5 w-5 place-items-center rounded-full border ${
                  active ? "border-ink bg-ink text-ivory" : "border-border"
                }`}
              >
                {active && <Check className="h-3 w-3" strokeWidth={2.5} />}
              </span>
            </button>
          );
        })}
      </div>

      {value === "card" && (
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Field label="Cardholder name" name="cardName" required className="md:col-span-2" />
          <Field label="Card number" name="cardNumber" placeholder="1234 5678 9012 3456" required className="md:col-span-2" />
          <Field label="Expiry (MM/YY)" name="cardExpiry" placeholder="08/29" required />
          <Field label="CVV" name="cardCvv" placeholder="•••" required />
        </div>
      )}
      {value === "upi" && (
        <div className="mt-6">
          <Field label="UPI ID" name="upi" placeholder="you@bank" required />
        </div>
      )}
      {value === "cod" && (
        <p className="mt-6 rounded-2xl border border-champagne/30 bg-ivory-deep/40 px-5 py-4 text-[12.5px] text-foreground/80">
          Pay in cash on delivery. Our courier will verify the piece with you at
          your doorstep before handover.
        </p>
      )}
    </PanelShell>
  );
}

/* ---------------- Small pieces ---------------- */

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
  defaultValue,
  className = "",
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  defaultValue?: string;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 block text-[10.5px] uppercase tracking-[0.25em] text-muted-foreground">
        {label}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="w-full rounded-full border border-border bg-background px-5 py-3 text-[13.5px] text-ink placeholder:text-muted-foreground/70 focus:border-champagne-deep focus:outline-none focus:ring-2 focus:ring-champagne/25"
      />
    </label>
  );
}

function SummaryLine({ item }: { item: CartItem }) {
  return (
    <li className="flex gap-4 py-4">
      <div className="relative h-20 w-20 flex-none overflow-hidden rounded-xl border border-border/50 bg-ivory-deep">
        <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
        <span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-[20px] place-items-center rounded-full bg-ink px-1 text-[10px] font-medium text-ivory">
          {item.qty}
        </span>
      </div>
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            {item.category}
          </p>
          <p className="mt-0.5 font-display text-[14.5px] leading-tight text-ink">
            {item.name}
          </p>
          <p className="mt-1 text-[11.5px] text-muted-foreground">
            Purity {item.carat}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center rounded-full border border-border">
            <button
              type="button"
              onClick={() => cart.updateQty(item.key, item.qty - 1)}
              aria-label="Decrease"
              className="grid h-7 w-7 place-items-center text-foreground/70 hover:text-ink"
            >
              <Minus className="h-3 w-3" strokeWidth={1.5} />
            </button>
            <span className="min-w-[24px] text-center text-[12px] text-ink">{item.qty}</span>
            <button
              type="button"
              onClick={() => cart.updateQty(item.key, item.qty + 1)}
              aria-label="Increase"
              className="grid h-7 w-7 place-items-center text-foreground/70 hover:text-ink"
            >
              <Plus className="h-3 w-3" strokeWidth={1.5} />
            </button>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-display text-[14.5px] text-ink">
              {formatINR(item.priceNum * item.qty)}
            </span>
            <button
              type="button"
              onClick={() => cart.remove(item.key)}
              aria-label="Remove"
              className="text-muted-foreground hover:text-ink"
            >
              <X className="h-3.5 w-3.5" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}

function Row({ label, value, muted }: { label: string; value: string; muted?: boolean }) {
  return (
    <div className="flex items-center justify-between py-1.5 text-[13px]">
      <span className="text-muted-foreground">{label}</span>
      <span className={muted ? "text-champagne-deep" : "text-ink"}>{value}</span>
    </div>
  );
}

function TrustLine({ icon: Icon, text }: { icon: React.ElementType; text: string }) {
  return (
    <p className="flex items-center gap-2.5">
      <Icon className="h-3.5 w-3.5 text-champagne-deep" strokeWidth={1.5} />
      {text}
    </p>
  );
}

function PlaceOrderButton({ total }: { total: number }) {
  return (
    <button
      type="submit"
      className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-ink px-8 py-4 text-[11px] uppercase tracking-[0.28em] text-ivory transition-all hover:bg-champagne-deep"
    >
      <Lock className="h-3.5 w-3.5" strokeWidth={1.6} />
      Place Order · {formatINR(total)}
    </button>
  );
}

/* ---------------- Confirmation ---------------- */

function OrderConfirmation({ orderId }: { orderId: string }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <AnnouncementBar />
      <Header />
      <main className="mx-auto max-w-[820px] px-6 py-24 md:py-32">
        <Reveal>
          <div
            className="relative overflow-hidden rounded-[32px] border border-champagne/30 px-8 py-16 text-center md:px-16 md:py-20"
            style={{
              background:
                "linear-gradient(160deg, rgba(252,247,236,0.85) 0%, rgba(244,232,210,0.7) 55%, rgba(232,214,180,0.6) 100%)",
              boxShadow:
                "0 60px 120px -45px rgba(80,55,15,0.35), 0 12px 32px -16px rgba(80,55,15,0.18), inset 0 1px 0 rgba(255,255,255,0.6)",
            }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-1/2"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.45) 0%, transparent 100%)",
              }}
            />
            <div className="relative">
              <span
                className="mx-auto grid h-16 w-16 place-items-center rounded-full"
                style={{
                  background:
                    "radial-gradient(circle at 35% 30%, #FFFCF2 0%, #F4E6C5 55%, #E4CFA0 100%)",
                  boxShadow:
                    "inset 0 1px 0 rgba(255,255,255,0.8), inset 0 -8px 18px rgba(150,110,40,0.18), 0 14px 30px -12px rgba(120,90,30,0.4)",
                }}
              >
                <Check className="h-7 w-7 text-ink" strokeWidth={1.6} />
              </span>

              <p className="mt-8 text-[11px] uppercase tracking-[0.32em] text-champagne-deep">
                Thank You
              </p>
              <h1 className="mt-3 font-display text-4xl leading-tight text-ink md:text-5xl">
                Your Order Is Confirmed
              </h1>
              <div className="mx-auto mt-5 h-px w-20 bg-gradient-to-r from-transparent via-champagne to-transparent" />
              <p className="mx-auto mt-5 max-w-md text-[14px] leading-relaxed text-foreground/75">
                A signed confirmation is on its way to your inbox. Your piece is
                being lifted from the atelier and packed by hand in the signature
                Noor case.
              </p>

              <div className="mx-auto mt-8 inline-flex items-center gap-4 rounded-full border border-champagne/40 bg-ivory/70 px-6 py-3">
                <span className="text-[10.5px] uppercase tracking-[0.28em] text-muted-foreground">
                  Order
                </span>
                <span className="font-display text-lg text-ink">{orderId}</span>
              </div>

              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3 text-[11px] uppercase tracking-[0.25em] text-ivory hover:bg-champagne-deep"
                >
                  Continue exploring
                </Link>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 rounded-full border border-ink/70 px-7 py-3 text-[11px] uppercase tracking-[0.25em] text-ink hover:border-champagne-deep hover:text-champagne-deep"
                >
                  Back home
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </main>
      <Footer />
    </div>
  );
}
