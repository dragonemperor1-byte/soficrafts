import { motion } from 'framer-motion';
import { Instagram, Facebook, MessageCircle } from 'lucide-react';

const Footer = () => {
  const exploreLinks = [
    { name: 'Our Story', href: '#heritage' },
    { name: 'Collections', href: '#collection' },
    { name: 'Craftsmanship', href: '#craftsmanship' },
    { name: 'Testimonials', href: '#stories' },
  ];

  const supportLinks = [
    { name: 'Shipping Info', href: '#' },
    { name: 'Care Guide', href: '#' },
    { name: 'Size Guide', href: '#' },
    { name: 'Contact Us', href: '#connect' },
  ];

  return (
    <footer className="bg-heritage-black text-mountain-white py-16 lg:py-20">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h3 className="font-display text-2xl tracking-[0.1em] mb-1">SOFI CRAFTS</h3>
              <p className="text-xs uppercase tracking-[0.2em] text-saffron-gold">
                Kashmir Elegance Handcraft
              </p>
            </div>
            
            <p className="text-sm text-mountain-white/60 leading-relaxed mb-6">
              Bringing you authentic Kashmiri heritage, where every thread tells a story 
              of tradition, craftsmanship, and timeless beauty from the heart of Kashmir Valley.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4">
              <a 
                href="https://instagram.com/its_sofi_crafts_kashmir_brand" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-mountain-white/30 flex items-center justify-center hover:border-saffron-gold hover:text-saffron-gold transition-colors duration-300"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 border border-mountain-white/30 flex items-center justify-center hover:border-saffron-gold hover:text-saffron-gold transition-colors duration-300"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 border border-mountain-white/30 flex items-center justify-center hover:border-saffron-gold hover:text-saffron-gold transition-colors duration-300"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Explore Column */}
          <div>
            <h4 className="font-display text-lg mb-6">Explore</h4>
            <ul className="space-y-3">
              {exploreLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-sm text-mountain-white/60 hover:text-saffron-gold transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h4 className="font-display text-lg mb-6">Support</h4>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-sm text-mountain-white/60 hover:text-saffron-gold transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h4 className="font-display text-lg mb-6">Stay Connected</h4>
            <p className="text-sm text-mountain-white/60 mb-4">
              Subscribe to receive updates on new collections and artisan stories.
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-3 bg-transparent border border-mountain-white/30 text-sm placeholder:text-mountain-white/40 focus:outline-none focus:border-saffron-gold transition-colors duration-300"
              />
              <button
                type="submit"
                className="w-full px-4 py-3 bg-saffron-gold text-heritage-black text-sm uppercase tracking-[0.15em] hover:bg-mountain-white transition-colors duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-mountain-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-mountain-white/40">
              © 2024 Sofi Crafts. All rights reserved. Handcrafted with{' '}
              <span className="text-chinar-burgundy">❤️</span> in Kashmir
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-mountain-white/40 hover:text-mountain-white transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-mountain-white/40 hover:text-mountain-white transition-colors duration-300">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;