import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const craftFeatures = [
  {
    icon: '✤',
    title: 'Hand-Crafted Excellence',
    description: 'Each thread is carefully selected and woven by master artisans whose skills have been passed down through generations. No two pieces are ever identical, making your garment truly unique.',
  },
  {
    icon: '❈',
    title: 'Authentic Materials',
    description: 'We source only pure, original materials directly from Kashmir—from the finest Pashmina wool to authentic hand-dyed fabrics that capture the essence of the valley\'s natural beauty.',
  },
  {
    icon: '✦',
    title: 'Timeless Heritage',
    description: 'Our designs honor centuries-old Kashmiri traditions while embracing contemporary elegance. Each piece bridges the past and present, creating wearable art that transcends time.',
  },
];

const Craftsmanship = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="craftsmanship" className="py-24 lg:py-32 bg-snow-mist">
      <div ref={ref} className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 lg:mb-20"
        >
          <h2 className="heading-section text-heritage-black mb-6">
            The Art of <span className="italic">Kashmiri Craftsmanship</span>
          </h2>
          <p className="body-elegant text-muted-foreground max-w-3xl mx-auto">
            Every piece tells the story of generations of artisans who have perfected 
            their craft in the valleys of Kashmir. We honor their dedication by bringing 
            you only the finest, most authentic creations.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {craftFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.15,
                ease: [0.16, 1, 0.3, 1] 
              }}
              className="text-center group"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Icon */}
              <motion.div 
                className="w-20 h-20 mx-auto mb-6 rounded-full border-2 border-saffron-gold/40 flex items-center justify-center cursor-pointer transition-colors duration-500 group-hover:border-chinar-burgundy"
                animate={{ 
                  rotate: hoveredIndex === index ? 360 : 0,
                }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className={`text-3xl transition-colors duration-500 ${
                  hoveredIndex === index ? 'text-chinar-burgundy' : 'text-saffron-gold'
                }`}>
                  {feature.icon}
                </span>
              </motion.div>

              {/* Title */}
              <h3 className="font-display text-2xl text-heritage-black mb-4">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="body-elegant text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Craftsmanship;