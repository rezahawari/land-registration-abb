
import React from 'react';
import { Step } from '../types';

interface ProgressBarProps {
  currentStep: Step;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep }) => {
  const steps = [
    { label: '01 DASAR', id: Step.DASAR },
    { label: '02 LAHAN', id: Step.LAHAN },
    { label: '03 DOKUMEN', id: Step.DOKUMEN },
    { label: '04 REVIEW', id: Step.REVIEW },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
      <div className="flex items-center justify-between mb-4">
        <div className="flex flex-col">
          <span className="text-xs font-bold text-primary uppercase tracking-wider">Tahapan Pengajuan</span>
          <h3 className="text-lg font-bold">Langkah {currentStep}: Dasar Pengajuan</h3>
        </div>
        <span className="text-sm font-bold bg-primary/10 text-primary px-3 py-1 rounded-full">{currentStep} dari 4</span>
      </div>
      <div className="relative w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
        <div 
          className="absolute top-0 left-0 h-full bg-primary rounded-full transition-all duration-500" 
          style={{ width: `${(currentStep / 4) * 100}%` }}
        ></div>
      </div>
      <div className="flex justify-between mt-4 overflow-x-auto gap-4">
        {steps.map((step) => (
          <div 
            key={step.id} 
            className={`flex flex-col gap-1 items-start min-w-[120px] transition-opacity ${step.id <= currentStep ? 'opacity-100' : 'opacity-40'}`}
          >
            <span className={`text-[11px] font-bold ${step.id <= currentStep ? 'text-primary' : 'text-slate-500'}`}>
              {step.label}
            </span>
            <div className={`h-1 w-full rounded-full ${step.id <= currentStep ? 'bg-primary' : 'bg-slate-300 dark:bg-slate-700'}`}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
