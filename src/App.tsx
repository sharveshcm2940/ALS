import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { SignatureProcessSection } from './components/SignatureProcessSection';
import { CinematicBrandSection } from './components/CinematicBrandSection';
import { SelectedWorkSection } from './components/SelectedWorkSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectEstimatorModal } from './components/ProjectEstimatorModal';
import { LegalModal } from './components/LegalModals';
import { CustomCursor } from './components/animations/CustomCursor';

// Four dedicated interactive commercial software applications
import { BusinessSuiteApp } from './apps/business/BusinessSuiteApp';
import { InventoryControlApp } from './apps/inventory/InventoryControlApp';
import { ClientFlowApp } from './apps/crm/ClientFlowApp';
import { ProjectDeskApp } from './apps/projectDesk/ProjectDeskApp';

/**
 * Handles smooth scrolling to top on route transitions or to hash anchors
 */
function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 80);
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname, hash]);

  return null;
}

/**
 * Main ALS Infonet Corporate Website
 */
function CorporateSite() {
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

        {/* 4. Services Section (Apple Product-Style Presentation with Contrast Invert Hover) */}
        <ServicesSection
          onSelectServiceForInquiry={handleSelectServiceForInquiry}
        />

        {/* 5. Signature Experience: How We Work (Animated Continuous Progression Timeline) */}
        <SignatureProcessSection />

        {/* 6. Cinematic Dark Section: Brand Philosophy (Dramatic Clipping-Mask Text Reveals) */}
        <CinematicBrandSection />

        {/* 7. Selected Work: 4 Real Interactive Commercial Software Applications */}
        <SelectedWorkSection
          onDiscussSimilarProject={handleSelectServiceForInquiry}
        />

        {/* 8. Conversion-Focused Black Contact Section with Form Feedback & Contrast-Inverting Button */}
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
}

/**
 * Root Application Router
 */
export default function App() {
  return (
    <>
      <ScrollManager />
      <Routes>
        {/* Corporate Website */}
        <Route path="/" element={<CorporateSite />} />

        {/* Dedicated Interactive Software Product Demonstration Routes */}
        <Route path="/projects/business-management" element={<BusinessSuiteApp />} />
        <Route path="/projects/inventory-management" element={<InventoryControlApp />} />
        <Route path="/projects/crm" element={<ClientFlowApp />} />
        <Route path="/projects/project-management" element={<ProjectDeskApp />} />

        {/* Fallback */}
        <Route path="*" element={<CorporateSite />} />
      </Routes>
    </>
  );
}
