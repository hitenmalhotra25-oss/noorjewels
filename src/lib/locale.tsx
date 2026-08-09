import { useSyncExternalStore } from "react";

/* ----------------------------------------------------------------
   Noor Jewels — language + currency store
   Base prices in the catalogue are always INR.
------------------------------------------------------------------- */

export type LangCode = "EN" | "HI" | "FR" | "AR";
export type CurrencyCode = "INR" | "USD" | "EUR" | "GBP" | "AED";

export const CURRENCIES: Record<
  CurrencyCode,
  { label: string; symbol: string; rate: number; locale: string; decimals: number }
> = {
  INR: { label: "INR ₹", symbol: "₹", rate: 1, locale: "en-IN", decimals: 0 },
  USD: { label: "USD $", symbol: "$", rate: 0.012, locale: "en-US", decimals: 2 },
  EUR: { label: "EUR €", symbol: "€", rate: 0.011, locale: "de-DE", decimals: 2 },
  GBP: { label: "GBP £", symbol: "£", rate: 0.0094, locale: "en-GB", decimals: 2 },
  AED: { label: "AED د.إ", symbol: "د.إ ", rate: 0.044, locale: "en-AE", decimals: 2 },
};

export const LANGUAGES: LangCode[] = ["EN", "HI", "FR", "AR"];
export const CURRENCY_CODES = Object.keys(CURRENCIES) as CurrencyCode[];

type LocaleState = { lang: LangCode; currency: CurrencyCode };

const STORAGE_KEY = "noor.locale.v1";

function load(): LocaleState {
  if (typeof window === "undefined") return { lang: "EN", currency: "INR" };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const p = JSON.parse(raw) as LocaleState;
      if (p && LANGUAGES.includes(p.lang) && CURRENCIES[p.currency]) return p;
    }
  } catch {
    /* ignore */
  }
  return { lang: "EN", currency: "INR" };
}

let state: LocaleState = load();
const listeners = new Set<() => void>();
const SERVER_STATE: LocaleState = { lang: "EN", currency: "INR" };

function emit() {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* ignore */
  }
  listeners.forEach((l) => l());
  applyDomTranslation();
}

export const locale = {
  subscribe(l: () => void) {
    listeners.add(l);
    return () => listeners.delete(l);
  },
  get(): LocaleState {
    return state;
  },
  setLang(lang: LangCode) {
    state = { ...state, lang };
    emit();
  },
  setCurrency(currency: CurrencyCode) {
    state = { ...state, currency };
    emit();
  },
};

export function useLocale() {
  const s = useSyncExternalStore(locale.subscribe, locale.get, () => SERVER_STATE);
  return {
    ...s,
    setLang: locale.setLang,
    setCurrency: locale.setCurrency,
    money: (inr: number) => formatMoney(inr, s.currency),
    t: (text: string) => translate(text, s.lang),
  };
}

/** Convert an INR amount to the active currency and format it. */
export function formatMoney(inr: number, currency: CurrencyCode = state.currency) {
  const c = CURRENCIES[currency];
  const value = inr * c.rate;
  const formatted = value.toLocaleString(c.locale, {
    minimumFractionDigits: c.decimals,
    maximumFractionDigits: c.decimals,
  });
  return `${c.symbol}${formatted}`;
}

export function useMoney() {
  const { currency } = useSyncExternalStore(locale.subscribe, locale.get, () => SERVER_STATE);
  return (inr: number) => formatMoney(inr, currency);
}

/* ----------------------------------------------------------------
   Translations
------------------------------------------------------------------- */

type Dict = Record<string, string>;

const HI: Dict = {
  "Free Worldwide Shipping": "विश्वभर में निःशुल्क शिपिंग",
  Shop: "शॉप",
  Collections: "कलेक्शन",
  "Best Sellers": "सर्वाधिक बिकने वाले",
  "Wedding Special": "विवाह विशेष",
  "About Us": "हमारे बारे में",
  "Contact Us": "संपर्क करें",
  Company: "कंपनी",
  "Customer Care": "ग्राहक सेवा",
  "Featured Products": "विशेष उत्पाद",
  "Our Categories": "हमारी श्रेणियाँ",
  "Loved By Our Customers": "हमारे ग्राहकों का प्यार",
  "The Maison": "द मेज़ों",
  "The Noor Jewels Promise": "नूर ज्वेल्स का वादा",
  "Free Shipping": "निःशुल्क शिपिंग",
  "Easy Returns": "आसान वापसी",
  "Secure Payments": "सुरक्षित भुगतान",
  "Certified Jewellery": "प्रमाणित आभूषण",
  "Add to Cart": "कार्ट में डालें",
  "Buy Now": "अभी खरीदें",
  Checkout: "चेकआउट",
  "Continue Shopping": "खरीदारी जारी रखें",
  Subtotal: "उप-योग",
  Total: "कुल",
  Shipping: "शिपिंग",
  "Your bag is empty": "आपका बैग खाली है",
  "Your wishlist is empty": "आपकी विशलिस्ट खाली है",
  "Popular searches": "लोकप्रिय खोजें",
  "Search products": "उत्पाद खोजें",
  "Members Only": "केवल सदस्यों के लिए",
  "Welcome to the Maison": "मेज़ों में आपका स्वागत है",
  "Sign Out": "साइन आउट",
  "Continue with Google": "Google से जारी रखें",
  Rings: "अंगूठियाँ",
  Necklaces: "हार",
  Earrings: "कान की बालियाँ",
  Mangalsutras: "मंगलसूत्र",
  Anklets: "पायल",
  Bracelets: "कंगन",
  "Couple Rings": "कपल रिंग्स",
  Bangles: "चूड़ियाँ",
  Pendants: "पेंडेंट",
  All: "सभी",
  "View All": "सभी देखें",
  "Follow Us": "हमें फ़ॉलो करें",
  Newsletter: "न्यूज़लेटर",
  Subscribe: "सदस्यता लें",
  Wishlist: "विशलिस्ट",
  Cart: "कार्ट",
  Account: "खाता",
  Search: "खोजें",
  "Filter By Price": "कीमत से छाँटें",
  Carats: "कैरेट",
  "Sort By": "क्रमबद्ध करें",
  "Place Order": "ऑर्डर करें",
};

const FR: Dict = {
  "Free Worldwide Shipping": "Livraison gratuite dans le monde",
  Shop: "Boutique",
  Collections: "Collections",
  "Best Sellers": "Meilleures ventes",
  "Wedding Special": "Spécial mariage",
  "About Us": "À propos",
  "Contact Us": "Contactez-nous",
  Company: "Société",
  "Customer Care": "Service client",
  "Featured Products": "Produits en vedette",
  "Our Categories": "Nos catégories",
  "Loved By Our Customers": "Aimé par nos clients",
  "The Maison": "La Maison",
  "The Noor Jewels Promise": "La promesse Noor Jewels",
  "Free Shipping": "Livraison offerte",
  "Easy Returns": "Retours faciles",
  "Secure Payments": "Paiements sécurisés",
  "Certified Jewellery": "Bijoux certifiés",
  "Add to Cart": "Ajouter au panier",
  "Buy Now": "Acheter",
  Checkout: "Paiement",
  "Continue Shopping": "Continuer mes achats",
  Subtotal: "Sous-total",
  Total: "Total",
  Shipping: "Livraison",
  "Your bag is empty": "Votre panier est vide",
  "Your wishlist is empty": "Votre liste est vide",
  "Popular searches": "Recherches populaires",
  "Search products": "Rechercher des produits",
  "Members Only": "Réservé aux membres",
  "Welcome to the Maison": "Bienvenue à la Maison",
  "Sign Out": "Se déconnecter",
  "Continue with Google": "Continuer avec Google",
  Rings: "Bagues",
  Necklaces: "Colliers",
  Earrings: "Boucles d'oreilles",
  Mangalsutras: "Mangalsutras",
  Anklets: "Bracelets de cheville",
  Bracelets: "Bracelets",
  "Couple Rings": "Bagues de couple",
  Bangles: "Joncs",
  Pendants: "Pendentifs",
  All: "Tout",
  "View All": "Tout voir",
  "Follow Us": "Suivez-nous",
  Newsletter: "Newsletter",
  Subscribe: "S'abonner",
  Wishlist: "Favoris",
  Cart: "Panier",
  Account: "Compte",
  Search: "Rechercher",
  "Filter By Price": "Filtrer par prix",
  Carats: "Carats",
  "Sort By": "Trier par",
  "Place Order": "Commander",
};

const AR: Dict = {
  "Free Worldwide Shipping": "شحن مجاني حول العالم",
  Shop: "المتجر",
  Collections: "المجموعات",
  "Best Sellers": "الأكثر مبيعاً",
  "Wedding Special": "خاص بالأعراس",
  "About Us": "من نحن",
  "Contact Us": "اتصل بنا",
  Company: "الشركة",
  "Customer Care": "خدمة العملاء",
  "Featured Products": "منتجات مميزة",
  "Our Categories": "فئاتنا",
  "Loved By Our Customers": "محبوب من عملائنا",
  "The Maison": "الدار",
  "The Noor Jewels Promise": "وعد نور جولز",
  "Free Shipping": "شحن مجاني",
  "Easy Returns": "إرجاع سهل",
  "Secure Payments": "مدفوعات آمنة",
  "Certified Jewellery": "مجوهرات معتمدة",
  "Add to Cart": "أضف إلى السلة",
  "Buy Now": "اشترِ الآن",
  Checkout: "إتمام الشراء",
  "Continue Shopping": "متابعة التسوق",
  Subtotal: "المجموع الفرعي",
  Total: "الإجمالي",
  Shipping: "الشحن",
  "Your bag is empty": "سلتك فارغة",
  "Your wishlist is empty": "قائمة رغباتك فارغة",
  "Popular searches": "الأكثر بحثاً",
  "Search products": "ابحث عن المنتجات",
  "Members Only": "للأعضاء فقط",
  "Welcome to the Maison": "مرحباً بك في الدار",
  "Sign Out": "تسجيل الخروج",
  "Continue with Google": "المتابعة مع Google",
  Rings: "خواتم",
  Necklaces: "قلادات",
  Earrings: "أقراط",
  Mangalsutras: "منغالسوترا",
  Anklets: "خلاخيل",
  Bracelets: "أساور",
  "Couple Rings": "خواتم الثنائي",
  Bangles: "غوايش",
  Pendants: "دلايات",
  All: "الكل",
  "View All": "عرض الكل",
  "Follow Us": "تابعنا",
  Newsletter: "النشرة البريدية",
  Subscribe: "اشترك",
  Wishlist: "قائمة الرغبات",
  Cart: "السلة",
  Account: "الحساب",
  Search: "بحث",
  "Filter By Price": "تصفية بالسعر",
  Carats: "القيراط",
  "Sort By": "ترتيب حسب",
  "Place Order": "إتمام الطلب",
};

const DICTS: Record<LangCode, Dict | null> = { EN: null, HI, FR, AR };

const lookupCache = new Map<LangCode, Map<string, string>>();

function lookupFor(lang: LangCode) {
  let map = lookupCache.get(lang);
  if (map) return map;
  map = new Map<string, string>();
  const dict = DICTS[lang];
  if (dict) {
    for (const [en, out] of Object.entries(dict)) map.set(en.toLowerCase(), out);
  }
  lookupCache.set(lang, map);
  return map;
}

export function translate(text: string, lang: LangCode = state.lang) {
  if (lang === "EN") return text;
  const map = lookupFor(lang);
  return map.get(text.trim().toLowerCase()) ?? text;
}

/* ----------------------------------------------------------------
   Site-wide DOM translation pass — lets the language switch apply
   to every rendered page without rewriting each string by hand.
------------------------------------------------------------------- */

const originals = new WeakMap<Text, string>();
const SKIP_TAGS = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "SVG", "PATH", "CODE", "PRE"]);
let observer: MutationObserver | null = null;

function translateNode(node: Text, lang: LangCode) {
  const parent = node.parentElement;
  if (!parent || SKIP_TAGS.has(parent.tagName.toUpperCase())) return;
  const source = originals.get(node) ?? node.nodeValue ?? "";
  const trimmed = source.trim();
  if (!trimmed) return;
  const next = translate(trimmed, lang);
  if (next === trimmed) {
    if (originals.has(node) && node.nodeValue !== source) node.nodeValue = source;
    return;
  }
  if (!originals.has(node)) originals.set(node, source);
  const value = source.replace(trimmed, next);
  if (node.nodeValue !== value) node.nodeValue = value;
}

function walk(root: Node, lang: LangCode) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const batch: Text[] = [];
  let current = walker.nextNode();
  while (current) {
    batch.push(current as Text);
    current = walker.nextNode();
  }
  batch.forEach((n) => translateNode(n, lang));
}

export function applyDomTranslation() {
  if (typeof document === "undefined") return;
  const lang = state.lang;
  observer?.disconnect();
  walk(document.body, lang);
  observer?.observe(document.body, { childList: true, subtree: true, characterData: true });
}

export function startLocaleTranslation() {
  if (typeof document === "undefined" || observer) return () => {};
  observer = new MutationObserver((records) => {
    const lang = state.lang;
    if (lang === "EN") return;
    observer?.disconnect();
    for (const record of records) {
      record.addedNodes.forEach((n) => {
        if (n.nodeType === Node.TEXT_NODE) translateNode(n as Text, lang);
        else if (n.nodeType === Node.ELEMENT_NODE) walk(n, lang);
      });
      if (record.type === "characterData" && record.target.nodeType === Node.TEXT_NODE) {
        translateNode(record.target as Text, lang);
      }
    }
    observer?.observe(document.body, { childList: true, subtree: true, characterData: true });
  });
  applyDomTranslation();
  return () => {
    observer?.disconnect();
    observer = null;
  };
}
