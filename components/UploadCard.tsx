
import React, { useRef } from 'react';

interface UploadCardProps {
  id: string;
  title: string;
  description: string;
  uploadText: string;
  subText: string;
  bgImage: string;
  icon?: string;
  tooltip?: string;
  file: File | null;
  onChange: (file: File | null) => void;
}

export const UploadCard: React.FC<UploadCardProps> = ({
  id, title, description, uploadText, subText, bgImage, icon = 'cloud_upload', tooltip, file, onChange
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onChange(e.target.files[0]);
    }
  };

  return (
    <div className="flex flex-col gap-3 group">
      <div 
        onClick={handleClick}
        className={`relative w-full aspect-[16/9] border-2 border-dashed ${file ? 'border-primary' : 'border-[#dce0e5] dark:border-slate-700'} rounded-xl flex flex-col items-center justify-center bg-white dark:bg-slate-800 hover:border-primary dark:hover:border-primary transition-all cursor-pointer overflow-hidden group`}
      >
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10 grayscale transition-transform duration-500 group-hover:scale-105" 
          style={{ backgroundImage: `url('${bgImage}')` }}
        />
        <div className="relative z-10 flex flex-col items-center gap-2 p-6 text-center">
          <span className={`material-symbols-outlined text-4xl ${file ? 'text-primary' : 'text-[#637588] dark:text-slate-500'} group-hover:text-primary transition-colors`}>
            {file ? 'check_circle' : icon}
          </span>
          <p className="text-sm font-semibold">{file ? `Terpilih: ${file.name}` : uploadText}</p>
          <p className="text-xs text-[#637588] dark:text-slate-400">{subText}</p>
        </div>
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept=".jpg,.jpeg,.png,.pdf" 
          onChange={handleFileChange} 
        />
      </div>
      <div>
        <div className="flex items-center gap-2">
          <p className="text-base font-bold leading-normal">{title}</p>
          {tooltip && (
            <div className="group/tooltip relative">
              <span className="material-symbols-outlined text-primary text-lg cursor-help">info</span>
              <div className="absolute bottom-full mb-2 hidden group-hover/tooltip:block w-64 p-3 bg-slate-900 text-white text-xs rounded-lg shadow-xl z-20">
                {tooltip}
              </div>
            </div>
          )}
        </div>
        <p className="text-[#637588] dark:text-slate-400 text-sm font-normal leading-tight">{description}</p>
      </div>
    </div>
  );
};
