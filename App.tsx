
import React, { useState } from 'react';
import { 
  Header, 
  Hero, 
  Features, 
  Services, 
  CTASection, 
  Footer,
  ProgressBar 
} from './components/LandingPage';

const App: React.FC = () => {
  const [step] = useState(1);
  const totalSteps = 3;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="bg-white px-4 md:px-40 py-5">
           <div className="max-w-[1200px] mx-auto">
              <ProgressBar currentStep={step} totalSteps={totalSteps} />
           </div>
        </div>
        
        <Hero />
        <Features />
        <Services />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default App;
