import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useCart } from '@/context/CartContext';
import { Minus, Plus, X, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CartDrawer = () => {
  const { isOpen, closeCart, items, updateQuantity, removeItem, totalAmount, totalItems } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  return (
    <Sheet open={isOpen} onOpenChange={(o) => !o && closeCart()}>
      <SheetContent className="bg-mountain-white border-l border-stone-grey w-full sm:max-w-md flex flex-col p-0">
        <SheetHeader className="px-6 py-5 border-b border-stone-grey">
          <SheetTitle className="font-display text-2xl text-heritage-black text-left flex items-center gap-3">
            <ShoppingBag className="w-5 h-5 text-chinar-burgundy" />
            Your Cart
            <span className="text-sm text-muted-foreground font-body">({totalItems})</span>
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
            <div className="w-20 h-20 rounded-full border border-saffron-gold/30 flex items-center justify-center mb-6">
              <ShoppingBag className="w-8 h-8 text-saffron-gold/60" />
            </div>
            <p className="font-display text-xl text-heritage-black mb-2">Your cart awaits</p>
            <p className="text-sm text-muted-foreground mb-6">
              Discover pieces woven with heritage
            </p>
            <button
              onClick={() => { closeCart(); navigate('/collection'); }}
              className="btn-hero"
            >
              Browse Collection
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 pb-4 border-b border-stone-grey/50">
                  <div className="w-20 h-28 flex-shrink-0 bg-gradient-to-br from-snow-mist to-stone-grey flex items-center justify-center">
                    <span className="text-2xl text-saffron-gold/60">{item.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="font-display text-base text-heritage-black leading-tight">
                        {item.name}
                      </h4>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-muted-foreground hover:text-chinar-burgundy transition-colors"
                        aria-label="Remove"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.category}</p>
                    <div className="flex justify-between items-center mt-3">
                      <div className="flex items-center border border-stone-grey">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center hover:bg-snow-mist transition-colors"
                          aria-label="Decrease"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center hover:bg-snow-mist transition-colors"
                          aria-label="Increase"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <p className="font-display text-base text-chinar-burgundy">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-stone-grey px-6 py-5 bg-snow-mist/50">
              <div className="flex justify-between items-center mb-4">
                <span className="label-elegant">Subtotal</span>
                <span className="font-display text-2xl text-chinar-burgundy">
                  ₹{totalAmount.toLocaleString('en-IN')}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mb-4">
                Shipping & taxes calculated at checkout
              </p>
              <button onClick={handleCheckout} className="btn-hero w-full justify-center">
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;