
import React from 'react';

interface StepProgressProps {
  currentStep: number;
  totalSteps: number;
  stepTitle: string;
  stepDescription: string;
}

const StepProgress: React.FC<StepProgressProps> = ({ currentStep, totalSteps, stepTitle, stepDescription }) => {
  const percentage = (currentStep / totalSteps) * 100;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 mb-8">
      <div className="flex flex-col gap-3">
        <div className="flex gap-6 justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#137fec]">person_add</span>
            <p className="text-[#111418] dark:text-white text-base font-semibold">Langkah {currentStep}: {stepTitle}</p>
          </div>
          <p className="text-[#617589] text-sm font-medium uppercase tracking-wider">Tahap {currentStep} dari {totalSteps}</p>
        </div>
        <div className="rounded-full bg-[#dbe0e6] dark:bg-gray-700 h-2.5 overflow-hidden">
          <div 
            className="h-full rounded-full bg-[#137fec] transition-all duration-500 ease-in-out" 
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <p className="text-[#617589] dark:text-gray-400 text-sm font-normal">{stepDescription}</p>
      </div>
    </div>
  );
};

export default StepProgress;
