
import React, { useState } from 'react';
import { 
  Header, 
  Hero, 
  Features, 
  Services, 
  CTASection, 
  Footer,
  ProgressBar 
} from '../components/LandingPage';
import Login from './Login';

const App: React.FC = () => {
  const [step] = useState(1);
  const [currentView, setCurrentView] = useState<'home' | 'login'>('home');
  const totalSteps = 3;

  const handleLoginClick = () => {
    setCurrentView('login');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header onLoginClick={handleLoginClick} />
      <main className="flex-grow">
        {currentView === 'login' ? (
          <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-950">
            <Login onBackToRegister={handleBackToHome} />
          </div>
        ) : (
          <>
            <div className="bg-white px-4 md:px-40 py-5">
               {/* <div className="max-w-[1200px] mx-auto">
                  <ProgressBar currentStep={step} totalSteps={totalSteps} />
               </div> */}
            </div>
            
            <Hero />
            <Features />
            <Services />
            <CTASection />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default App;
