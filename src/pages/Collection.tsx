import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, Plus, Search } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { products, categories, Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';

const CollectionPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'low' | 'high'>('featured');
  const { addItem, openCart } = useCart();

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      const matchesCat = activeCategory === 'All' || p.category === activeCategory;
      const matchesSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase()) ||
        p.longDescription.toLowerCase().includes(search.toLowerCase());
      return matchesCat && matchesSearch;
    });
    if (sortBy === 'low') list = [...list].sort((a, b) => a.price - b.price);
    if (sortBy === 'high') list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [activeCategory, search, sortBy]);

  const handleAdd = (product: Product) => {
    addItem(product);
    openCart();
    toast.success(`${product.name} added to cart`, {
      action: { label: 'View Cart', onClick: openCart },
    });
  };

  return (
    <div className="min-h-screen bg-mountain-white">
      <Navbar />

      {/* Header Banner */}
      <section className="pt-32 pb-12 lg:pt-40 lg:pb-16 bg-snow-mist relative overflow-hidden">
        <div className="absolute inset-0 kashmir-pattern opacity-40" />
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-chinar-burgundy transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="label-elegant text-saffron-gold mb-4">The Marketplace</p>
            <h1 className="heading-display text-heritage-black mb-6">
              The Complete <span className="italic text-chinar-burgundy">Collection</span>
            </h1>
            <p className="body-elegant text-muted-foreground max-w-2xl">
              Browse every piece in our atelier — handcrafted in Kashmir Valley,
              woven with heritage, and waiting to become part of your story.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-20 lg:top-24 z-30 bg-mountain-white/95 backdrop-blur-md border-b border-stone-grey py-4">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search collection..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-snow-mist border border-stone-grey text-sm focus:outline-none focus:border-saffron-gold transition-colors"
              />
            </div>

            {/* Categories */}
            <div className="flex-1 overflow-x-auto scrollbar-none">
              <div className="flex gap-2 min-w-max">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 text-xs uppercase tracking-[0.15em] transition-all whitespace-nowrap border ${
                      activeCategory === cat
                        ? 'bg-heritage-black text-mountain-white border-heritage-black'
                        : 'bg-transparent text-heritage-black border-stone-grey hover:border-heritage-black'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'featured' | 'low' | 'high')}
              className="px-4 py-2.5 bg-snow-mist border border-stone-grey text-sm focus:outline-none focus:border-saffron-gold cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-6 lg:px-12">
          <p className="text-sm text-muted-foreground mb-8">
            Showing <span className="text-heritage-black">{filtered.length}</span> pieces
          </p>

          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-display text-2xl text-heritage-black mb-2">No pieces found</p>
              <p className="text-muted-foreground">Try a different search or category</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
              {filtered.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: Math.min(index * 0.05, 0.4),
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="group"
                >
                  <div className="relative aspect-[2/3] mb-4 overflow-hidden bg-gradient-to-br from-snow-mist to-stone-grey">
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={`${product.name} by Sofi Crafts`}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 kashmir-pattern">
                        <div className="w-14 h-14 mb-3 rounded-full border border-saffron-gold/30 flex items-center justify-center">
                          <span className="text-xl text-saffron-gold/60">{product.icon}</span>
                        </div>
                        <p className="font-display text-sm text-heritage-black/40 text-center px-2">
                          {product.name}
                        </p>
                      </div>
                    )}
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-heritage-black/35 to-transparent pointer-events-none" />

                    {/* Category tag */}
                    <div className="absolute top-3 left-3 px-2 py-1 bg-mountain-white/90 backdrop-blur-sm">
                      <span className="text-[10px] uppercase tracking-[0.15em] text-heritage-black">
                        {product.category}
                      </span>
                    </div>

                    {/* Add to cart overlay */}
                    <button
                      onClick={() => handleAdd(product)}
                      className="absolute bottom-3 right-3 w-11 h-11 bg-heritage-black text-mountain-white rounded-full flex items-center justify-center shadow-elevated transition-all duration-500 hover:bg-chinar-burgundy hover:-translate-y-0.5"
                      aria-label={`Add ${product.name} to cart`}
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>

                  <div>
                    <h3 className="font-display text-lg text-heritage-black leading-tight">
                      {product.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1 mb-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="font-display text-lg text-chinar-burgundy">
                        ₹{product.price.toLocaleString('en-IN')}
                      </p>
                      <button
                        onClick={() => handleAdd(product)}
                        className="text-xs uppercase tracking-[0.15em] text-heritage-black hover:text-chinar-burgundy transition-colors flex items-center gap-1"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" /> Add
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CollectionPage;