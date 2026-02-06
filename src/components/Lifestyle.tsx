import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const galleryItems = [
  { id: 1, span: 'col-span-2 row-span-2', label: 'Editorial' },
  { id: 2, span: 'col-span-1 row-span-1', label: 'Style' },
  { id: 3, span: 'col-span-1 row-span-2', label: 'Heritage' },
  { id: 4, span: 'col-span-1 row-span-1', label: 'Culture' },
  { id: 5, span: 'col-span-2 row-span-1', label: 'Campaign' },
  { id: 6, span: 'col-span-1 row-span-1', label: 'Details' },
];

const Lifestyle = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 lg:py-32 bg-heritage-black relative overflow-hidden">
      {/* Pattern Overlay */}
      <div className="absolute inset-0 pattern-overlay animate-pattern-move opacity-30" />
      
      <div ref={ref} className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 lg:mb-20"
        >
          <h2 className="heading-section text-mountain-white mb-4">
            Living the <span className="italic text-saffron-gold">Kashmir Dream</span>
          </h2>
          <p className="body-elegant text-mountain-white/60 max-w-xl mx-auto">
            Experience the elegance of Kashmiri heritage in contemporary life
          </p>
        </motion.div>

        {/* Masonry Gallery */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 auto-rows-[200px] lg:auto-rows-[250px]">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1] 
              }}
              className={`${item.span} relative group overflow-hidden cursor-pointer`}
            >
              {/* Placeholder */}
              <div className="absolute inset-0 bg-gradient-to-br from-forest-deep/40 to-heritage-black/60 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full border border-saffron-gold/30 flex items-center justify-center">
                    <span className="text-xl text-saffron-gold/50">✦</span>
                  </div>
                  <p className="text-sm uppercase tracking-[0.2em] text-mountain-white/40">
                    {item.label}
                  </p>
                </div>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-chinar-burgundy/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Zoom Effect */}
              <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Lifestyle;