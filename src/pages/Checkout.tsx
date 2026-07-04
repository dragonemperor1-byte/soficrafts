import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, Wallet, Banknote, Copy } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';

const UPI_ID = '8097132801@fam';
const MERCHANT_NAME = 'Sofi Crafts';
const WHATSAPP_NUMBER = '918097132801'; // no + for wa.me

type Step = 'address' | 'payment' | 'success';
type PaymentMethod = 'cash' | 'upi';

const Checkout = () => {
  const navigate = useNavigate();
  const { items, totalAmount, totalItems, clearCart } = useCart();
  const [step, setStep] = useState<Step>('address');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cash');
  const [orderId, setOrderId] = useState('');

  const [address, setAddress] = useState({
    name: '',
    phone: '',
    email: '',
    line1: '',
    line2: '',
    city: '',
    state: '',
    pincode: '',
    notes: '',
  });

  if (items.length === 0 && step !== 'success') {
    return (
      <div className="min-h-screen bg-mountain-white">
        <Navbar />
        <div className="pt-40 pb-24 container mx-auto px-6 text-center">
          <p className="font-display text-3xl text-heritage-black mb-4">Your cart is empty</p>
          <p className="text-muted-foreground mb-8">Add some pieces before checking out.</p>
          <Link to="/collection" className="btn-hero">Browse Collection</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const required = ['name', 'phone', 'line1', 'city', 'state', 'pincode'] as const;
    for (const f of required) {
      if (!address[f].trim()) {
        toast.error('Please fill all required fields');
        return;
      }
    }
    if (!/^\d{10}$/.test(address.phone.replace(/\D/g, '').slice(-10))) {
      toast.error('Please enter a valid 10-digit phone number');
      return;
    }
    if (!/^\d{6}$/.test(address.pincode)) {
      toast.error('Please enter a valid 6-digit pincode');
      return;
    }
    setStep('payment');
  };

  const buildOrderMessage = (method: PaymentMethod, oid: string) => {
    const lines = [
      `🌿 *New Order — Sofi Crafts*`,
      `Order ID: ${oid}`,
      ``,
      `*Customer*`,
      `Name: ${address.name}`,
      `Phone: ${address.phone}`,
      address.email ? `Email: ${address.email}` : '',
      ``,
      `*Delivery Address*`,
      address.line1,
      address.line2,
      `${address.city}, ${address.state} - ${address.pincode}`,
      ``,
      `*Items (${totalItems})*`,
      ...items.map((i) => `• ${i.name} × ${i.quantity} — ₹${(i.price * i.quantity).toLocaleString('en-IN')}`),
      ``,
      `*Total: ₹${totalAmount.toLocaleString('en-IN')}*`,
      `Payment: ${method === 'cash' ? 'Cash on Delivery' : `UPI (${UPI_ID})`}`,
      address.notes ? `\nNotes: ${address.notes}` : '',
    ].filter(Boolean);
    return lines.join('\n');
  };

  const placeOrder = () => {
    const oid = 'SC-' + Date.now().toString().slice(-8);
    setOrderId(oid);
    const message = buildOrderMessage(paymentMethod, oid);
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    if (paymentMethod === 'upi') {
      const upiUrl = `upi://pay?pa=${encodeURIComponent(UPI_ID)}&pn=${encodeURIComponent(MERCHANT_NAME)}&am=${totalAmount}&cu=INR&tn=${encodeURIComponent('Order ' + oid)}`;
      // Open UPI app
      window.location.href = upiUrl;
      // Open WhatsApp confirmation shortly after so both work
      setTimeout(() => {
        window.open(waUrl, '_blank');
      }, 800);
    } else {
      window.open(waUrl, '_blank');
    }

    setStep('success');
    clearCart();
  };

  const copyUpi = () => {
    navigator.clipboard.writeText(UPI_ID);
    toast.success('UPI ID copied');
  };

  return (
    <div className="min-h-screen bg-mountain-white">
      <Navbar />

      <div className="pt-32 lg:pt-40 pb-16 container mx-auto px-6 lg:px-12">
        <Link
          to="/collection"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-chinar-burgundy transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Continue Shopping
        </Link>

        {/* Progress */}
        <div className="flex items-center justify-center gap-4 mb-12">
          {[
            { key: 'address', label: 'Address' },
            { key: 'payment', label: 'Payment' },
            { key: 'success', label: 'Confirmation' },
          ].map((s, idx) => {
            const active = step === s.key;
            const done =
              (step === 'payment' && s.key === 'address') ||
              (step === 'success' && s.key !== 'success');
            return (
              <div key={s.key} className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs border transition-colors ${
                      done
                        ? 'bg-chinar-burgundy border-chinar-burgundy text-mountain-white'
                        : active
                        ? 'bg-heritage-black border-heritage-black text-mountain-white'
                        : 'bg-transparent border-stone-grey text-muted-foreground'
                    }`}
                  >
                    {done ? <Check className="w-4 h-4" /> : idx + 1}
                  </div>
                  <span
                    className={`text-xs uppercase tracking-[0.15em] hidden sm:block ${
                      active || done ? 'text-heritage-black' : 'text-muted-foreground'
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
                {idx < 2 && <div className="w-8 sm:w-16 h-px bg-stone-grey" />}
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-[1fr_400px] gap-12">
          {/* Left: Steps */}
          <div>
            {step === 'address' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <p className="label-elegant text-saffron-gold mb-3">Step 01</p>
                <h2 className="heading-section text-heritage-black mb-8">
                  Delivery <span className="italic">Details</span>
                </h2>
                <form onSubmit={handleAddressSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field label="Full Name *" value={address.name} onChange={(v) => setAddress({ ...address, name: v })} />
                    <Field label="Phone Number *" type="tel" value={address.phone} onChange={(v) => setAddress({ ...address, phone: v })} placeholder="10-digit mobile" />
                  </div>
                  <Field label="Email (optional)" type="email" value={address.email} onChange={(v) => setAddress({ ...address, email: v })} />
                  <Field label="Address Line 1 *" value={address.line1} onChange={(v) => setAddress({ ...address, line1: v })} placeholder="House no., Street, Area" />
                  <Field label="Address Line 2" value={address.line2} onChange={(v) => setAddress({ ...address, line2: v })} placeholder="Landmark, Apartment (optional)" />
                  <div className="grid sm:grid-cols-3 gap-5">
                    <Field label="City *" value={address.city} onChange={(v) => setAddress({ ...address, city: v })} />
                    <Field label="State *" value={address.state} onChange={(v) => setAddress({ ...address, state: v })} />
                    <Field label="Pincode *" value={address.pincode} onChange={(v) => setAddress({ ...address, pincode: v })} placeholder="6 digits" />
                  </div>
                  <div>
                    <label className="label-elegant block mb-2">Order Notes (optional)</label>
                    <textarea
                      value={address.notes}
                      onChange={(e) => setAddress({ ...address, notes: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-3 bg-snow-mist border border-stone-grey text-sm focus:outline-none focus:border-saffron-gold transition-colors resize-none"
                      placeholder="Any special instructions..."
                    />
                  </div>
                  <button type="submit" className="btn-hero w-full sm:w-auto justify-center">
                    Continue to Payment
                  </button>
                </form>
              </motion.div>
            )}

            {step === 'payment' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <p className="label-elegant text-saffron-gold mb-3">Step 02</p>
                <h2 className="heading-section text-heritage-black mb-8">
                  Payment <span className="italic">Method</span>
                </h2>

                <div className="space-y-4 mb-8">
                  <button
                    onClick={() => setPaymentMethod('cash')}
                    className={`w-full text-left p-5 border-2 transition-all flex items-start gap-4 ${
                      paymentMethod === 'cash'
                        ? 'border-chinar-burgundy bg-snow-mist'
                        : 'border-stone-grey hover:border-heritage-black/40'
                    }`}
                  >
                    <div className={`w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 ${paymentMethod === 'cash' ? 'bg-chinar-burgundy text-mountain-white' : 'bg-stone-grey text-heritage-black'}`}>
                      <Banknote className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <p className="font-display text-lg text-heritage-black">Cash on Delivery</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Pay in cash when your order arrives at your doorstep.
                      </p>
                    </div>
                    {paymentMethod === 'cash' && <Check className="w-5 h-5 text-chinar-burgundy" />}
                  </button>

                  <button
                    onClick={() => setPaymentMethod('upi')}
                    className={`w-full text-left p-5 border-2 transition-all flex items-start gap-4 ${
                      paymentMethod === 'upi'
                        ? 'border-chinar-burgundy bg-snow-mist'
                        : 'border-stone-grey hover:border-heritage-black/40'
                    }`}
                  >
                    <div className={`w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 ${paymentMethod === 'upi' ? 'bg-chinar-burgundy text-mountain-white' : 'bg-stone-grey text-heritage-black'}`}>
                      <Wallet className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <p className="font-display text-lg text-heritage-black">UPI Payment</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Pay instantly via any UPI app (GPay, PhonePe, Paytm, etc.)
                      </p>
                      {paymentMethod === 'upi' && (
                        <div className="mt-3 p-3 bg-mountain-white border border-saffron-gold/30 flex items-center justify-between gap-3">
                          <div>
                            <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">UPI ID</p>
                            <p className="font-mono text-sm text-heritage-black">{UPI_ID}</p>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); copyUpi(); }}
                            className="text-xs uppercase tracking-[0.15em] text-chinar-burgundy hover:text-heritage-black flex items-center gap-1"
                          >
                            <Copy className="w-3.5 h-3.5" /> Copy
                          </button>
                        </div>
                      )}
                    </div>
                    {paymentMethod === 'upi' && <Check className="w-5 h-5 text-chinar-burgundy" />}
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => setStep('address')}
                    className="text-sm uppercase tracking-[0.15em] text-heritage-black border border-stone-grey px-6 py-4 hover:border-heritage-black transition-colors"
                  >
                    Back
                  </button>
                  <button onClick={placeOrder} className="btn-hero flex-1 justify-center">
                    {paymentMethod === 'upi'
                      ? `Pay ₹${totalAmount.toLocaleString('en-IN')} via UPI`
                      : `Place Order — ₹${totalAmount.toLocaleString('en-IN')}`}
                  </button>
                </div>
              </motion.div>
            )}

            {step === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center py-8"
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-chinar-burgundy/10 flex items-center justify-center">
                  <Check className="w-10 h-10 text-chinar-burgundy" />
                </div>
                <p className="label-elegant text-saffron-gold mb-3">Order Placed</p>
                <h2 className="heading-section text-heritage-black mb-4">
                  Thank you for <span className="italic">your order</span>
                </h2>
                <p className="body-elegant text-muted-foreground max-w-lg mx-auto mb-6">
                  Your order <span className="text-heritage-black">{orderId}</span> has been sent to us via WhatsApp.
                  {paymentMethod === 'upi' && ' Please complete the UPI payment in your app.'}
                  {' '}We'll reach out shortly to confirm the details.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button onClick={() => navigate('/collection')} className="btn-hero">
                    Continue Shopping
                  </button>
                  <button
                    onClick={() => navigate('/')}
                    className="text-sm uppercase tracking-[0.15em] text-heritage-black border border-stone-grey px-8 py-4 hover:border-heritage-black transition-colors"
                  >
                    Back to Home
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Right: Order Summary */}
          {step !== 'success' && (
            <aside className="bg-snow-mist p-6 lg:p-8 h-fit lg:sticky lg:top-32">
              <h3 className="font-display text-xl text-heritage-black mb-6 pb-4 border-b border-stone-grey">
                Order Summary
              </h3>
              <div className="space-y-4 mb-6 max-h-80 overflow-y-auto pr-2">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-14 h-20 flex-shrink-0 bg-gradient-to-br from-mountain-white to-stone-grey flex items-center justify-center">
                      <span className="text-lg text-saffron-gold/60">{item.icon}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-display text-sm text-heritage-black leading-tight">
                        {item.name}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="text-sm text-chinar-burgundy font-display">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </p>
                  </div>
                ))}
              </div>
              <div className="space-y-2 pt-4 border-t border-stone-grey">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Subtotal</span>
                  <span>₹{totalAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Shipping</span>
                  <span className="text-valley-sage">Free</span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-stone-grey mt-3">
                  <span className="label-elegant">Total</span>
                  <span className="font-display text-2xl text-chinar-burgundy">
                    ₹{totalAmount.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </aside>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

const Field = ({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}) => (
  <div>
    <label className="label-elegant block mb-2">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-4 py-3 bg-snow-mist border border-stone-grey text-sm focus:outline-none focus:border-saffron-gold transition-colors"
    />
  </div>
);

export default Checkout;