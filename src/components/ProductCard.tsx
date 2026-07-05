import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { products as allProducts } from '@/data/products';
import { toast } from 'sonner';

interface ProductCardProps {
  name: string;
  description: string;
  price: number;
  index: number;
}

const ProductCard = ({ name, description, price, index }: ProductCardProps) => {
  const { addItem, openCart } = useCart();
  const product = allProducts.find((p) => p.name === name);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!product) return;
    addItem(product);
    openCart();
    toast.success(`${product.name} added to cart`, {
      action: { label: 'View Cart', onClick: openCart },
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group cursor-pointer"
    >
      <div className="relative aspect-[2/3] mb-5 overflow-hidden bg-gradient-to-br from-snow-mist to-stone-grey">
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 kashmir-pattern">
          <div className="w-16 h-16 mb-4 rounded-full border border-saffron-gold/30 flex items-center justify-center">
            <span className="text-2xl text-saffron-gold/60">{product?.icon ?? '❈'}</span>
          </div>
          <p className="font-display text-lg text-heritage-black/40 text-center">{name}</p>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-heritage-black/80 via-heritage-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-8">
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 text-mountain-white text-sm uppercase tracking-[0.15em] translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500"
          >
            Add to Cart
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

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