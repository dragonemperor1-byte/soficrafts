import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const { scrollY } = useScroll();
  const mountainY = useTransform(scrollY, [0, 500], [0, 150]);
  const textY = useTransform(scrollY, [0, 500], [0, 100]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-mountain-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 kashmir-pattern opacity-50" />
      
      {/* Mountain Silhouette Background */}
      <motion.div 
        style={{ y: mountainY }}
        className="absolute bottom-0 left-0 right-0 h-[40vh] pointer-events-none"
      >
        <svg 
          viewBox="0 0 1440 400" 
          className="absolute bottom-0 w-full h-full"
          preserveAspectRatio="xMidYMax slice"
        >
          {/* Far Mountains */}
          <path 
            d="M0,400 L0,250 Q180,180 360,220 Q540,260 720,200 Q900,140 1080,180 Q1260,220 1440,160 L1440,400 Z" 
            fill="hsl(140 10% 58% / 0.1)"
          />
          {/* Middle Mountains */}
          <path 
            d="M0,400 L0,280 Q240,200 480,260 Q720,320 960,240 Q1200,160 1440,220 L1440,400 Z" 
            fill="hsl(160 28% 23% / 0.08)"
          />
          {/* Near Mountains */}
          <path 
            d="M0,400 L0,320 Q360,260 720,300 Q1080,340 1440,280 L1440,400 Z" 
            fill="hsl(20 15% 8% / 0.05)"
          />
        </svg>
      </motion.div>

      {/* Content */}
      <motion.div 
        style={{ y: textY, opacity }}
        className="relative z-10 container mx-auto px-6 text-center"
      >
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="label-elegant mb-6 text-saffron-gold"
        >
          Direct from Kashmir Valley
        </motion.p>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="heading-display text-heritage-black mb-8 max-w-4xl mx-auto"
        >
          Where Every Thread
          <br />
          <span className="italic text-chinar-burgundy">Tells a Story</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="body-elegant text-muted-foreground max-w-2xl mx-auto mb-12"
        >
          Discover authentic Kashmiri craftsmanship woven with heritage, passion, 
          and the timeless beauty of the Himalayas
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link to="/collection" className="btn-hero group">
            Explore Collection
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        style={{ opacity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex flex-col items-center"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="w-4 h-4 text-muted-foreground" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;