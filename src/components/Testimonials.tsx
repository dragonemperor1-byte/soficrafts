import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Instagram } from 'lucide-react';

const testimonials = [
  {
    quote: "The kurti I received was absolutely stunning—the fitting was perfect, quality exceptional. Every thread truly tells a story. The craftsmanship is unmatched, and I could feel the heritage in every detail. Thank you so much!",
    author: "Anam Sabiha C Ansari",
  },
  {
    quote: "I've worn many traditional outfits, but nothing compares to the authenticity and elegance of Sofi Crafts. The attention to detail and the quality of the fabric is remarkable. I receive compliments every time I wear it.",
    author: "Valued Customer",
  },
];

const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="stories" className="py-24 lg:py-32 bg-mountain-white">
      <div ref={ref} className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <h2 className="heading-section text-heritage-black mb-4">
            Cherished by Our <span className="italic">Community</span>
          </h2>
          <p className="body-elegant text-muted-foreground">
            Stories from those who wear our heritage
          </p>
        </motion.div>

        {/* Testimonial Cards */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.15,
                ease: [0.16, 1, 0.3, 1] 
              }}
              className="bg-snow-mist p-8 lg:p-10 border border-stone-grey/50"
            >
              {/* Quote Mark */}
              <span className="text-5xl text-saffron-gold/30 font-display leading-none">
                "
              </span>
              
              {/* Quote */}
              <p className="font-body text-lg italic text-heritage-black/80 leading-relaxed mt-2 mb-6">
                {testimonial.quote}
              </p>
              
              {/* Author */}
              <p className="font-display text-lg text-chinar-burgundy">
                — {testimonial.author}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Instagram Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mt-16"
        >
          <a
            href="https://instagram.com/its_sofi_crafts_kashmir_brand"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-heritage-black hover:text-chinar-burgundy transition-colors duration-300 group"
          >
            <Instagram className="w-5 h-5" />
            <span className="text-lg underline underline-offset-4 decoration-saffron-gold/50 group-hover:decoration-chinar-burgundy transition-colors duration-300">
              @its_sofi_crafts_kashmir_brand
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;