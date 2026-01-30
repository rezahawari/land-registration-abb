
import React, { useRef } from 'react';

interface FileUploadProps {
  label: string;
  icon: string;
  accept?: string;
  onChange: (file: File | null) => void;
  value: File | null;
}

const FileUpload: React.FC<FileUploadProps> = ({ label, icon, accept = "image/*", onChange, value }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => inputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onChange(file);
  };

  return (
    <div className="flex flex-col gap-3">
      <p className="text-[#111418] dark:text-gray-200 text-sm font-semibold">{label}</p>
      <div 
        onClick={handleClick}
        className={`border-2 border-dashed ${value ? 'border-[#137fec] bg-[#137fec]/5' : 'border-[#dbe0e6] dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50'} rounded-xl p-8 flex flex-col items-center justify-center text-center hover:border-[#137fec] transition-colors group cursor-pointer`}
      >
        <input 
          type="file" 
          ref={inputRef} 
          className="hidden" 
          accept={accept} 
          onChange={handleFileChange} 
        />
        <div className={`w-12 h-12 ${value ? 'bg-[#137fec]/20' : 'bg-[#137fec]/10'} rounded-full flex items-center justify-center text-[#137fec] mb-3 group-hover:scale-110 transition-transform`}>
          <span className="material-symbols-outlined">{value ? 'check_circle' : icon}</span>
        </div>
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {value ? value.name : 'Klik untuk unggah atau seret file'}
        </p>
        <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</p>
      </div>
    </div>
  );
};

export default FileUpload;
