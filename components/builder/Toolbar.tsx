'use client';

import React, { useState } from 'react';
import { useBuilder } from '@/context/BuilderContext';
import { Save, Download, Upload, Eye, Undo, Redo, Layout } from 'lucide-react';
import TemplatesGallery from './TemplatesGallery';

export default function Toolbar() {
  const { pageConfig, importConfig } = useBuilder();
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(pageConfig, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `page-config-${pageConfig.id}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const config = JSON.parse(e.target?.result as string);
        importConfig(config);
      } catch (err) {
        alert('Invalid JSON file');
      }
    };
    reader.readAsText(file);
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 z-20 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
          V
        </div>
        <div>
          <h1 className="text-sm font-bold text-gray-900 leading-none">Vendora Builder</h1>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1 font-semibold">Editing: {pageConfig.title}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all" title="Undo">
          <Undo size={18} />
        </button>
        <button className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all" title="Redo">
          <Redo size={18} />
        </button>
        <div className="h-6 w-px bg-gray-200 mx-2" />
        <button className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all">
          <Eye size={18} />
          Preview
        </button>
      </div>

      <div className="flex items-center gap-3">
        <button 
          onClick={() => setIsGalleryOpen(true)}
          className="flex items-center gap-2 px-3 py-2 text-sm font-bold text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all border border-indigo-100"
        >
          <Layout size={18} />
          Templates
        </button>
        <div className="h-6 w-px bg-gray-200 mx-1" />
        <label className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all cursor-pointer">
          <Upload size={18} />
          Import
          <input type="file" className="hidden" accept=".json" onChange={handleImport} />
        </label>
        <button 
          onClick={handleExport}
          className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all"
        >
          <Download size={18} />
          Export
        </button>
        <button className="flex items-center gap-2 px-5 py-2 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-lg shadow-indigo-200 transition-all">
          <Save size={18} />
          Save Changes
        </button>
      </div>

      <TemplatesGallery isOpen={isGalleryOpen} onClose={() => setIsGalleryOpen(false)} />
    </header>
  );
}
