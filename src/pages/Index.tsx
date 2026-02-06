import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import BrandStory from '@/components/BrandStory';
import Collection from '@/components/Collection';
import Lifestyle from '@/components/Lifestyle';
import Craftsmanship from '@/components/Craftsmanship';
import Testimonials from '@/components/Testimonials';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-mountain-white">
      <Navbar />
      <Hero />
      <BrandStory />
      <Collection />
      <Lifestyle />
      <Craftsmanship />
      <Testimonials />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Index;