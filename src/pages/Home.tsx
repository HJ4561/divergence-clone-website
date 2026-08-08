import React from 'react';
import Hero from '../components/home/Hero';
import FieldNotes from '../components/home/FieldNotes';
import Stats from '../components/home/Stats';
import Testimonials from '../components/home/Testimonials';
import ServicesOverview from '../components/home/ServicesOverview';
import CaseStudy from '../components/home/CaseStudy';
import AssetSection from '../components/home/AssetSection';
import HowWeWork from '../components/home/HowWeWork';
import WhyUs from '../components/home/WhyUs';
import PlatformSection from '../components/home/PlatformSection';
import QuestionsSection from '../components/home/QuestionsSection';
import BringUsWorkflow from '../components/home/BringUsWorkflow';

export default function Home() {
  return (
    <>
      <Hero />
      <FieldNotes />
      <Stats />
      <Testimonials />
      <ServicesOverview />
      <CaseStudy />
      <AssetSection />
      <HowWeWork />
      <WhyUs />
      <PlatformSection />
      <QuestionsSection />
      <BringUsWorkflow />
    </>
  );
}