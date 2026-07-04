import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import ProductCard from './ProductCard';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const products = [
  {
    name: "Chinar Bloom Suit",
    description: "Hand-embroidered Pure Kashmir",
    price: 12500,
  },
  {
    name: "Valley Mist Kurti",
    description: "Artisan Crafted Elegance",
    price: 8999,
  },
  {
    name: "Himalayan Embrace",
    description: "Pure Pashmina Heritage",
    price: 18500,
  },
  {
    name: "Saffron Sunset Cordset",
    description: "Contemporary Kashmir Style",
    price: 10500,
  },
  {
    name: "Forest Whisper Stole",
    description: "Hand-woven Kashmiri Art",
    price: 6500,
  },
  {
    name: "Royal Kashmir Ensemble",
    description: "Complete Traditional Set",
    price: 22000,
  },
];

const Collection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="collection" className="py-24 lg:py-32 bg-mountain-white">
      <div ref={ref} className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 lg:mb-20"
        >
          <p className="label-elegant text-saffron-gold mb-4">Signature Collection</p>
          <h2 className="heading-section text-heritage-black mb-6">
            Timeless <span className="italic">Elegance</span>
          </h2>
          <p className="body-elegant text-muted-foreground max-w-2xl mx-auto">
            Each piece is a masterpiece of traditional Kashmiri craftsmanship, 
            designed for the modern woman who values authenticity and elegance
          </p>
        </motion.div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {products.map((product, index) => (
            <ProductCard
              key={product.name}
              name={product.name}
              description={product.description}
              price={product.price}
              index={index}
            />
          ))}
        </div>

        <div className="text-center mt-16">
          <Link to="/collection" className="btn-hero group inline-flex">
            View Full Collection
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Collection;