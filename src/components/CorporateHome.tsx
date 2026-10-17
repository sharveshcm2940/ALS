import React, { useState } from 'react';
import { Navbar } from './Navbar';
import { Hero } from './Hero';
import { AboutSection } from './AboutSection';
import { ServicesSection } from './ServicesSection';
import { SignatureProcessSection } from './SignatureProcessSection';
import { CinematicBrandSection } from './CinematicBrandSection';
import { SelectedWorkSection } from './SelectedWorkSection';
import { ContactSection } from './ContactSection';
import { Footer } from './Footer';
import { ProjectEstimatorModal } from './ProjectEstimatorModal';
import { LegalModal } from './LegalModals';
import { CustomCursor } from './animations/CustomCursor';

export const CorporateHome: React.FC = () => {
  const [isEstimatorOpen, setIsEstimatorOpen] = useState(false);
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | null>(null);
  const [selectedServiceForInquiry, setSelectedServiceForInquiry] = useState<string>('');

  const handleStartProject = () => {
    setIsEstimatorOpen(true);
  };

  const handleDiscussProjectFromHero = () => {
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreServicesFromHero = () => {
    const servicesEl = document.getElementById('services');
    if (servicesEl) {
      servicesEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectServiceForInquiry = (serviceTitle: string) => {
    setSelectedServiceForInquiry(serviceTitle);
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleProceedFromEstimator = (service: string, summary: string) => {
    setIsEstimatorOpen(false);
    setSelectedServiceForInquiry(service);
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
      // Inject brief into textarea
      setTimeout(() => {
        const textarea = document.getElementById('projectDescription') as HTMLTextAreaElement | null;
        if (textarea) {
          textarea.value = summary;
          textarea.focus();
        }
      }, 500);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans antialiased selection:bg-black selection:text-white">
      {/* Restrained Monochromatic Custom Cursor */}
      <CustomCursor />

      {/* 1. Minimal & Refined Navigation */}
      <Navbar onStartProject={handleStartProject} />

      {/* Main Content Sections */}
      <main id="main-content" role="main">
        {/* 2. Apple-Inspired White Hero Section with Line-by-Line Staged Reveals */}
        <Hero
          onDiscussProject={handleDiscussProjectFromHero}
          onExploreServices={handleExploreServicesFromHero}
        />

        {/* 3. About Section with Expanding Divider and Staggered Hub Cards */}
        <AboutSection />

        {/* 4. Services Section with Interactive Contrast Invert Hover */}
        <ServicesSection
          onSelectServiceForInquiry={handleSelectServiceForInquiry}
        />

        {/* 5. Signature Experience: How We Work */}
        <SignatureProcessSection />

        {/* 6. Cinematic Dark Section: Brand Philosophy */}
        <CinematicBrandSection />

        {/* 7. Selected Work: 4 Real Interactive Commercial Software Products Showcase */}
        <SelectedWorkSection
          onDiscussSimilarProject={handleSelectServiceForInquiry}
        />

        {/* 8. Conversion-Focused Black Contact Section with Form Feedback & Inverting Submit */}
        <ContactSection
          initialService={selectedServiceForInquiry}
        />
      </main>

      {/* 9. Understated Clean Footer */}
      <Footer
        onOpenPrivacy={() => setLegalModalType('privacy')}
        onOpenTerms={() => setLegalModalType('terms')}
      />

      {/* Interactive Project Scoping Modal */}
      <ProjectEstimatorModal
        isOpen={isEstimatorOpen}
        onClose={() => setIsEstimatorOpen(false)}
        onProceedToContact={handleProceedFromEstimator}
      />

      {/* Privacy Policy & Terms Modal */}
      <LegalModal
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />
    </div>
  );
};
