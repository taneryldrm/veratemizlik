import Hero from '@/components/Hero';
import Services from '@/components/Services';
import WhyUs from '@/components/WhyUs';
import Projects from '@/components/Projects';
import Testimonials from '@/components/Testimonials';
import CTASection from '@/components/CTASection';
import ContactForm from '@/components/ContactForm';

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <WhyUs />
      <Projects />
      <Testimonials />
      <CTASection />
      <ContactForm />
    </>
  );
}
