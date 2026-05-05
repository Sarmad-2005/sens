"use client"

import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/sections/hero-section"
import { AdmissionFormSection } from "@/components/sections/admission-form-section"
import { Footer } from "@/components/footer"

export default function AdmissionsPage() {
  return (
    <main className="dark relative min-h-screen bg-background text-white">
      {/* Navigation */}
      <Navigation />
      
      {/* Hero Section - Customized for Admissions */}
      <HeroSection 
        title="Admission" 
        highlightedText="Portal" 
        subtitle="Your journey to academic excellence starts here. Join Riphah International College and build a future of innovation and leadership."
      />
      
      {/* Multi-Step Admission Form */}
      <AdmissionFormSection />
      
      {/* Footer */}
      <Footer />
    </main>
  )
}
