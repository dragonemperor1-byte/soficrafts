import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface ProductCardProps {
  name: string;
  description: string;
  price: number;
  index: number;
}

const ProductCard = ({ name, description, price, index }: ProductCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1] 
      }}
      className="group cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative aspect-[2/3] mb-5 overflow-hidden bg-gradient-to-br from-snow-mist to-stone-grey">
        {/* Placeholder Design */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 kashmir-pattern">
          <div className="w-16 h-16 mb-4 rounded-full border border-saffron-gold/30 flex items-center justify-center">
            <span className="text-2xl text-saffron-gold/60">❈</span>
          </div>
          <p className="font-display text-lg text-heritage-black/40 text-center">{name}</p>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-heritage-black/80 via-heritage-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-8">
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-2 text-mountain-white text-sm uppercase tracking-[0.15em] translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500"
          >
            View Details
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Image Zoom Effect */}
        <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105" />
      </div>

      {/* Product Info */}
      <div className="text-center">
        <h3 className="font-display text-xl text-heritage-black mb-1 group-hover:text-chinar-burgundy transition-colors duration-300">
          {name}
        </h3>
        <p className="text-sm text-muted-foreground mb-2">{description}</p>
        <p className="font-display text-lg text-chinar-burgundy">
          ₹{price.toLocaleString('en-IN')}
        </p>
      </div>
    </motion.div>
  );
};

export default ProductCard;