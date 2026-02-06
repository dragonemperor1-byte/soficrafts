import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Heritage', href: '#heritage' },
    { name: 'Collection', href: '#collection' },
    { name: 'Craftsmanship', href: '#craftsmanship' },
    { name: 'Stories', href: '#stories' },
    { name: 'Connect', href: '#connect' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-mountain-white/95 backdrop-blur-md shadow-sm' 
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo */}
          <a href="#" className="flex flex-col items-start">
            <span className="font-display text-xl lg:text-2xl tracking-[0.1em] text-heritage-black">
              SOFI CRAFTS
            </span>
            <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mt-0.5">
              Kashmir Elegance
            </span>
          </a>

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
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" aria-label="Menu">
            <div className="w-6 flex flex-col gap-1.5">
              <span className="w-full h-px bg-heritage-black"></span>
              <span className="w-full h-px bg-heritage-black"></span>
              <span className="w-4 h-px bg-heritage-black"></span>
            </div>
          </button>
        </div>
      </nav>
    </motion.header>
  );
};

export default Navbar;