export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  icon: string;
  longDescription: string;
}

export const products: Product[] = [
  {
    id: "chinar-bloom-suit",
    name: "Chinar Bloom Suit",
    description: "Hand-embroidered Pure Kashmir",
    longDescription: "A hand-embroidered pure Kashmiri suit inspired by the crimson chinar leaves of autumn. Every motif is stitched by master artisans in the valley.",
    price: 12500,
    category: "Suits",
    icon: "❈",
  },
  {
    id: "valley-mist-kurti",
    name: "Valley Mist Kurti",
    description: "Artisan Crafted Elegance",
    longDescription: "A soft, flowing kurti crafted with delicate Kashmiri embroidery — as gentle as the morning mist over the valley.",
    price: 8999,
    category: "Kurtis",
    icon: "✤",
  },
  {
    id: "himalayan-embrace",
    name: "Himalayan Embrace",
    description: "Pure Pashmina Heritage",
    longDescription: "A pure Pashmina shawl woven from the finest Himalayan wool. Warmth and heritage in every thread.",
    price: 18500,
    category: "Shawls",
    icon: "✦",
  },
  {
    id: "saffron-sunset-cordset",
    name: "Saffron Sunset Cordset",
    description: "Contemporary Kashmir Style",
    longDescription: "A modern cordset in saffron tones, blending contemporary silhouettes with traditional Kashmiri craft.",
    price: 10500,
    category: "Cordsets",
    icon: "❋",
  },
  {
    id: "forest-whisper-stole",
    name: "Forest Whisper Stole",
    description: "Hand-woven Kashmiri Art",
    longDescription: "A hand-woven stole with intricate motifs whispering the story of Kashmir's deep green forests.",
    price: 6500,
    category: "Stoles",
    icon: "❉",
  },
  {
    id: "royal-kashmir-ensemble",
    name: "Royal Kashmir Ensemble",
    description: "Complete Traditional Set",
    longDescription: "A complete traditional Kashmiri ensemble — regal, timeless, and crafted for moments that matter.",
    price: 22000,
    category: "Full Suits",
    icon: "✧",
  },
  {
    id: "pashmina-dawn-shawl",
    name: "Pashmina Dawn Shawl",
    description: "Sozni Embroidered Luxury",
    longDescription: "A pure Pashmina shawl adorned with delicate Sozni embroidery, capturing the golden hues of a Kashmiri dawn.",
    price: 16800,
    category: "Shawls",
    icon: "✦",
  },
  {
    id: "tulip-garden-suit",
    name: "Tulip Garden Suit",
    description: "Aari Work Two-Piece",
    longDescription: "A vibrant two-piece suit featuring intricate Aari embroidery inspired by the famed tulip gardens of Srinagar.",
    price: 11200,
    category: "2-Piece Suits",
    icon: "❈",
  },
  {
    id: "dal-lake-kurti",
    name: "Dal Lake Kurti",
    description: "Serene Silk Kashmiri Kurti",
    longDescription: "A serene silk kurti in tones inspired by the reflections on Dal Lake at twilight.",
    price: 7800,
    category: "Kurtis",
    icon: "✤",
  },
  {
    id: "walnut-wood-cordset",
    name: "Walnut Wood Cordset",
    description: "Earthy Handcrafted Set",
    longDescription: "An earthy cordset inspired by the warm tones of Kashmiri walnut wood carvings.",
    price: 9800,
    category: "Cordsets",
    icon: "❋",
  },
  {
    id: "meadow-whisper-stole",
    name: "Meadow Whisper Stole",
    description: "Light Wool Kashmiri Stole",
    longDescription: "A light wool stole with subtle Kashmiri motifs, perfect for effortless everyday elegance.",
    price: 5800,
    category: "Stoles",
    icon: "❉",
  },
  {
    id: "gulmarg-ensemble",
    name: "Gulmarg Ensemble",
    description: "Winter Full Suit Heritage",
    longDescription: "A rich winter ensemble inspired by the snow-clad meadows of Gulmarg. A statement of heritage luxury.",
    price: 24500,
    category: "Full Suits",
    icon: "✧",
  },
];

export const categories = [
  "All",
  "Suits",
  "Kurtis",
  "2-Piece Suits",
  "Full Suits",
  "Cordsets",
  "Shawls",
  "Stoles",
];