'use client';

import React from 'react';
import { X, Layout, Check } from 'lucide-react';
import { TEMPLATES } from '@/lib/templates/data';
import { useBuilder } from '@/context/BuilderContext';
import { cn } from '@/lib/utils';

interface TemplatesGalleryProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TemplatesGallery({ isOpen, onClose }: TemplatesGalleryProps) {
  const { pageConfig, importConfig } = useBuilder();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-4xl max-h-[80vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
              <Layout size={20} />
            </div>
            <div>
              <h2 className="text-xl font-black text-gray-900">Template Gallery</h2>
              <p className="text-xs text-gray-500 font-medium">Select a premium preset to jumpstart your store</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-900 hover:bg-white rounded-xl transition-all shadow-sm border border-transparent hover:border-gray-200"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEMPLATES.map((template) => {
              const isActive = pageConfig.id === template.id;
              
              return (
                <div 
                  key={template.id}
                  onClick={() => {
                    if (confirm('Replacing current layout with this template. Continue?')) {
                      importConfig(template);
                      onClose();
                    }
                  }}
                  className={cn(
                    "group relative bg-gray-50 rounded-2xl border-2 p-1 transition-all cursor-pointer hover:shadow-xl hover:-translate-y-1",
                    isActive ? "border-indigo-600 bg-indigo-50/30" : "border-transparent hover:border-indigo-200"
                  )}
                >
                  <div className="aspect-[4/3] bg-white rounded-xl mb-4 overflow-hidden border border-gray-100 flex flex-col items-center justify-center text-gray-300 relative">
                     <Layout size={48} strokeWidth={1} className="group-hover:scale-110 transition-transform duration-500" />
                     {isActive && (
                       <div className="absolute top-3 right-3 bg-indigo-600 text-white p-1.5 rounded-full shadow-lg">
                         <Check size={14} strokeWidth={3} />
                       </div>
                     )}
                  </div>
                  <div className="px-3 pb-3">
                    <h3 className="font-bold text-gray-900 text-sm group-hover:text-indigo-600 transition-colors">{template.title}</h3>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">
                      {template.sections.length} Sections
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 text-sm font-bold text-gray-600 hover:text-gray-900 transition-all"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
