import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const BrandStory = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="heritage" className="py-24 lg:py-32 bg-snow-mist overflow-hidden">
      <div ref={ref} className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="order-2 lg:order-1"
          >
            <p className="label-elegant text-saffron-gold mb-4">Our Heritage</p>
            
            <h2 className="heading-section text-heritage-black mb-8">
              Born in the Heart
              <br />
              <span className="italic">of Kashmir</span>
            </h2>

            <div className="space-y-6 body-elegant text-muted-foreground">
              <p>
                In the serene valleys where mountains kiss the clouds, Sofi Crafts was born 
                from a deep reverence for Kashmiri heritage. Each piece we create carries 
                the whispers of ancient artisan traditions, passed down through generations 
                of master craftspeople.
              </p>
              
              <p>
                From the finest Pashmina shawls to intricately embroidered suits, our 
                creations are more than garments—they are stories woven in thread, 
                celebrations of culture, and tributes to the hands that craft them with 
                love and dedication.
              </p>
              
              <p>
                We work directly with artisan families in Kashmir Valley, ensuring every 
                purchase supports these keepers of tradition and helps preserve an art 
                form that spans centuries.
              </p>
            </div>

            <p className="mt-8 font-display text-xl italic text-chinar-burgundy">
              "Made with heart, crafted with soul"
            </p>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="order-1 lg:order-2"
          >
            <div className="relative">
              {/* Decorative Frame */}
              <div className="absolute -inset-4 border border-saffron-gold/30 pointer-events-none" />
              
              {/* Image Container */}
              <div className="aspect-[3/4] bg-gradient-to-br from-stone-grey to-snow-mist overflow-hidden group">
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-valley-sage/20 to-forest-deep/20 transition-transform duration-700 group-hover:scale-105">
                  <div className="text-center p-8">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full border-2 border-saffron-gold/40 flex items-center justify-center">
                      <span className="text-3xl text-saffron-gold">✦</span>
                    </div>
                    <p className="font-display text-lg text-heritage-black/60">
                      Kashmir Valley
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Artisan Heritage
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BrandStory;