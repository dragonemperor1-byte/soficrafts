import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '@/context/CartContext';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { totalItems, openCart } = useCart();
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Heritage', href: isHome ? '#heritage' : '/#heritage' },
    { name: 'Collection', href: '/collection' },
    { name: 'Craftsmanship', href: isHome ? '#craftsmanship' : '/#craftsmanship' },
    { name: 'Stories', href: isHome ? '#stories' : '/#stories' },
    { name: 'Connect', href: isHome ? '#connect' : '/#connect' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || !isHome
          ? 'bg-mountain-white/95 backdrop-blur-md shadow-sm' 
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo */}
          <Link to="/" className="flex flex-col items-start">
            <span className="font-display text-xl lg:text-2xl tracking-[0.1em] text-heritage-black">
              SOFI CRAFTS
            </span>
            <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mt-0.5">
              Kashmir Elegance
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 lg:gap-12">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="nav-link text-heritage-black hover:text-chinar-burgundy"
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={openCart}
              className="relative text-heritage-black hover:text-chinar-burgundy transition-colors"
              aria-label="Open cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-chinar-burgundy text-mountain-white text-[10px] rounded-full flex items-center justify-center font-sans">
                  {totalItems}
                </span>
              )}
            </button>
          </div>

          {/* Mobile: Cart + Menu */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={openCart}
              className="relative text-heritage-black"
              aria-label="Open cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-chinar-burgundy text-mountain-white text-[10px] rounded-full flex items-center justify-center font-sans">
                  {totalItems}
                </span>
              )}
            </button>
            <Link to="/collection" className="text-xs uppercase tracking-[0.15em] text-heritage-black border border-heritage-black px-3 py-2">
              Shop
            </Link>
          </div>
        </div>
      </nav>
    </motion.header>
  );
};

export default Navbar;