import React from 'react';
import PlatformHero from '../components/platform/Platformhero';
import IndustriesStrip from '../components/platform/IndustriesStrip';
import ProblemsGrid from '../components/platform/ProblemsGrid';
import PlatformStats from '../components/platform/PlatformStats';
import WorkflowSteps from '../components/platform/WorkflowSteps';
import ScaleImpact from '../components/platform/ScaleImpact';
import TwoWaysToWork from '../components/platform/TwoWaysToWork';
import CustomModels from '../components/platform/CustomModels';
import InActionDemos from '../components/platform/InActionDemos';
import EnterpriseFeatures from '../components/platform/EnterpriseFeatures';
import PricingPlans from '../components/platform/PricingPlans';
import PlatformFinalCTA from '../components/platform/PlatformFinalCTA';

export default function Platform() {
  return (
    <>
      <PlatformHero />
      <IndustriesStrip />
      <ProblemsGrid />
      <PlatformStats />
      <WorkflowSteps />
      <ScaleImpact />
      <TwoWaysToWork />
      <CustomModels />
      <InActionDemos />
      <EnterpriseFeatures />
      <PricingPlans />
      <PlatformFinalCTA />
    </>
  );
}