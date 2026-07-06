import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';
import { ShoppingBag, Sparkles } from 'lucide-react';

interface Props {
  product: Product | null;
  onClose: () => void;
}

const ProductDetailDialog = ({ product, onClose }: Props) => {
  const { addItem, openCart } = useCart();
  const [size, setSize] = useState<string | undefined>(undefined);

  useEffect(() => {
    setSize(product?.sizes?.[1] ?? product?.sizes?.[0]);
  }, [product]);

  if (!product) return null;

  const handleAdd = () => {
    if (product.sizes && product.sizes.length && !size) {
      toast.error('Please select a size');
      return;
    }
    addItem(product);
    openCart();
    toast.success(`${product.name}${size ? ` (${size})` : ''} added to cart`);
    onClose();
  };

  return (
    <Dialog open={!!product} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-5xl p-0 gap-0 bg-mountain-white border-stone-grey overflow-hidden max-h-[92vh] overflow-y-auto">
        <DialogTitle className="sr-only">{product.name}</DialogTitle>
        <DialogDescription className="sr-only">{product.description}</DialogDescription>

        <div className="grid md:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-[3/4] md:aspect-auto bg-gradient-to-br from-snow-mist to-stone-grey">
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={`${product.name} by Sofi Crafts`}
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center kashmir-pattern">
                <span className="text-6xl text-saffron-gold/40">{product.icon}</span>
              </div>
            )}
            <div className="absolute top-4 left-4 px-3 py-1.5 bg-mountain-white/90 backdrop-blur-sm">
              <span className="text-[10px] uppercase tracking-[0.2em] text-heritage-black">
                {product.category}
              </span>
            </div>
          </div>

          {/* Details */}
          <div className="p-6 md:p-10 flex flex-col">
            {/* Story card wrapped around the name */}
            <div className="relative border border-saffron-gold/30 bg-snow-mist/60 p-6 md:p-7 mb-6">
              <div className="absolute -top-3 left-6 px-3 bg-mountain-white flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-saffron-gold" />
                <span className="text-[10px] uppercase tracking-[0.25em] text-saffron-gold">
                  The Story
                </span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl text-heritage-black leading-tight mb-3">
                {product.name}
              </h2>
              <p className="text-sm leading-relaxed text-heritage-black/75 italic">
                {product.story ?? product.longDescription}
              </p>
            </div>

            <p className="text-sm text-muted-foreground mb-6">{product.longDescription}</p>

            {/* Meta */}
            <div className="grid grid-cols-1 gap-3 mb-6 text-sm">
              {product.fabric && (
                <MetaRow label="Fabric" value={product.fabric} />
              )}
              {product.craft && (
                <MetaRow label="Craft" value={product.craft} />
              )}
              <MetaRow label="Origin" value="Kashmir Valley, India" />
              <MetaRow label="Care" value="Dry clean only. Store folded with muslin." />
            </div>

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2">
                  Size
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={`min-w-[3rem] px-3 py-2 text-sm border transition-all ${
                        size === s
                          ? 'bg-heritage-black text-mountain-white border-heritage-black'
                          : 'bg-transparent text-heritage-black border-stone-grey hover:border-heritage-black'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Price & CTA */}
            <div className="mt-auto flex items-center justify-between gap-4 pt-4 border-t border-stone-grey">
              <p className="font-display text-2xl text-chinar-burgundy">
                ₹{product.price.toLocaleString('en-IN')}
              </p>
              <button
                onClick={handleAdd}
                className="flex items-center gap-2 px-6 py-3 bg-heritage-black text-mountain-white text-xs uppercase tracking-[0.2em] hover:bg-chinar-burgundy transition-colors"
              >
                <ShoppingBag className="w-4 h-4" /> Add to Cart
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const MetaRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex gap-3 border-b border-stone-grey/60 pb-2">
    <span className="w-20 shrink-0 text-[10px] uppercase tracking-[0.2em] text-muted-foreground pt-0.5">
      {label}
    </span>
    <span className="text-sm text-heritage-black">{value}</span>
  </div>
);

export default ProductDetailDialog;