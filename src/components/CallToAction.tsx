import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';

const CallToAction = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="connect" className="py-24 lg:py-32 bg-gradient-to-b from-heritage-black to-forest-deep relative overflow-hidden">
      {/* Animated Pattern Background */}
      <div className="absolute inset-0 pattern-overlay opacity-20" style={{
        animation: 'patternMove 30s linear infinite'
      }} />
      
      {/* Kashmir Pattern Overlay */}
      <div className="absolute inset-0 kashmir-pattern opacity-10" />

      <div ref={ref} className="container mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="heading-section text-mountain-white mb-6">
            Begin Your <span className="italic text-saffron-gold">Journey</span>
          </h2>
          
          <p className="body-elegant text-mountain-white/70 mb-10">
            Discover the timeless elegance of authentic Kashmiri craftsmanship. 
            Each piece is waiting to become part of your story.
          </p>

          <motion.a
            href="#collection"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn-light group"
          >
            Explore Collection
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;