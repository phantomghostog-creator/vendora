'use client';

import React, { useState } from 'react';
import { useBuilder } from '@/context/BuilderContext';
import { SectionType } from '@/types/builder';
import { 
  Plus, 
  Layout, 
  Grid, 
  MessageSquare, 
  HelpCircle, 
  Video, 
  Timer, 
  Megaphone, 
  Mail, 
  MousePointer2, 
  Code,
  ChevronLeft,
  Settings2,
  Trash2,
  Copy
} from 'lucide-react';

const AVAILABLE_SECTIONS: { type: SectionType; label: string; icon: any }[] = [
  { type: 'hero', label: 'Hero Banner', icon: Layout },
  { type: 'product-grid', label: 'Product Grid', icon: Grid },
  { type: 'testimonials', label: 'Testimonials', icon: MessageSquare },
  { type: 'faq', label: 'FAQ Accordion', icon: HelpCircle },
  { type: 'video', label: 'Video Embed', icon: Video },
  { type: 'countdown', label: 'Countdown Timer', icon: Timer },
  { type: 'announcement-bar', label: 'Announcement Bar', icon: Megaphone },
  { type: 'newsletter', label: 'Newsletter Popup', icon: Mail },
  { type: 'floating-cta', label: 'Floating CTA', icon: MousePointer2 },
  { type: 'custom-html', label: 'Custom HTML', icon: Code },
];

const SECTION_VARIANTS: Record<SectionType, string[]> = {
  hero: ['default', 'dark', 'minimal', 'split', 'video-bg', 'gradient', 'image-right', 'image-left', 'centered', 'full-height'],
  'product-grid': ['grid', 'list', 'carousel', 'masonry', 'compact', 'detailed', 'featured-main', 'two-column', 'horizontal-scroll', 'mini'],
  testimonials: ['cards', 'slider', 'minimal', 'grid', 'single', 'with-images', 'bubble', 'boxed', 'dark', 'light'],
  faq: ['accordion', 'grid', 'list', 'minimal', 'boxed', 'dark', 'with-search', 'two-column', 'centered', 'sidebar'],
  video: ['default', 'full-width', 'autoplay', 'muted', 'minimal', 'with-text', 'popup', 'floating', 'glass', 'rounded'],
  countdown: ['simple', 'boxed', 'circles', 'gradient', 'dark', 'minimal', 'announcement', 'hero-overlay', 'bottom-bar', 'top-bar'],
  'announcement-bar': ['default', 'gradient', 'outline', 'minimal', 'dark', 'sliding', 'marquee', 'with-button', 'glass', 'thin'],
  newsletter: ['centered', 'split', 'minimal', 'dark', 'gradient', 'popup', 'inline', 'with-image', 'boxed', 'footer'],
  'floating-cta': ['pill', 'circle', 'boxed', 'minimal', 'glass', 'gradient', 'pulse', 'with-text', 'bottom-right', 'bottom-left'],
  'custom-html': ['default', 'container', 'full-width', 'dark', 'light', 'glass', 'card', 'centered', 'minimal', 'borderless'],
};

export default function Sidebar() {
  const { 
    pageConfig, 
    activeSectionId, 
    setActiveSectionId, 
    addSection, 
    removeSection, 
    updateSection 
  } = useBuilder();

  const activeSection = pageConfig.sections.find(s => s.id === activeSectionId);

  return (
    <aside className="w-80 bg-white border-r border-gray-200 flex flex-col z-10 shadow-lg">
      {!activeSection ? (
        <div className="flex-1 flex flex-col">
          <div className="p-6 border-b border-gray-100 bg-gray-50/50">
            <h2 className="text-lg font-bold text-gray-900">Add Section</h2>
            <p className="text-xs text-gray-500 mt-1 font-medium">Click to add a section to your page</p>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4">
            <div className="grid grid-cols-2 gap-3">
              {AVAILABLE_SECTIONS.map((section) => (
                <button
                  key={section.type}
                  onClick={() => addSection(section.type)}
                  className="flex flex-col items-center justify-center p-4 border border-gray-100 rounded-2xl hover:border-indigo-200 hover:bg-indigo-50/30 transition-all group"
                >
                  <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover:text-indigo-600 group-hover:bg-white transition-colors">
                    <section.icon size={20} />
                  </div>
                  <span className="text-[10px] font-bold text-gray-700 mt-3 text-center">{section.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col">
          <div className="p-4 border-b border-gray-100 flex items-center gap-3">
            <button 
              onClick={() => setActiveSectionId(null)}
              className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all"
            >
              <ChevronLeft size={18} />
            </button>
            <h2 className="text-sm font-bold text-gray-900 flex-1 truncate capitalize">
              Edit {activeSection.type.replace('-', ' ')}
            </h2>
            <div className="flex gap-1">
              <button 
                onClick={() => removeSection(activeSection.id)}
                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                title="Delete Section"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            {/* Style Variant Selector */}
            <div className="space-y-4">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Style Variant</h3>
              <select 
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                value={activeSection.variant}
                onChange={(e) => updateSection(activeSection.id, { variant: e.target.value })}
              >
                {SECTION_VARIANTS[activeSection.type].map(variant => (
                  <option key={variant} value={variant}>{variant.replace('-', ' ')}</option>
                ))}
              </select>
            </div>

            {/* Content Tab */}
            <div className="space-y-6">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Content</h3>
              
              <div className="space-y-4">
                {Object.entries(activeSection.content).map(([key, value]) => (
                  <div key={key}>
                    <label className="block text-xs font-bold text-gray-700 mb-2 capitalize">
                      {key.replace(/([A-Z])/g, ' $1')}
                    </label>
                    {typeof value === 'string' ? (
                      key.toLowerCase().includes('text') || key.toLowerCase().includes('subtitle') ? (
                        <textarea
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          value={value}
                          onChange={(e) => updateSection(activeSection.id, {
                            content: { ...activeSection.content, [key]: e.target.value }
                          })}
                        />
                      ) : (
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          value={value}
                          onChange={(e) => updateSection(activeSection.id, {
                            content: { ...activeSection.content, [key]: e.target.value }
                          })}
                        />
                      )
                    ) : typeof value === 'number' ? (
                      <input
                        type="number"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={value}
                        onChange={(e) => updateSection(activeSection.id, {
                          content: { ...activeSection.content, [key]: parseInt(e.target.value) || 0 }
                        })}
                      />
                    ) : null}
                  </div>
                ))}
              </div>
            </div>

            {/* Styles Tab */}
            <div className="space-y-6">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Styles & Layout</h3>
              <div className="p-4 bg-gray-50 rounded-xl border border-dashed border-gray-200 text-center">
                <Settings2 className="mx-auto text-gray-300 mb-2" size={24} />
                <p className="text-[10px] text-gray-500 font-medium italic">Advanced style properties coming soon</p>
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-gray-100 bg-white">
            <button 
              onClick={() => setActiveSectionId(null)}
              className="w-full py-3 bg-gray-900 text-white rounded-xl font-bold text-sm shadow-lg shadow-gray-200 hover:bg-black transition-all"
            >
              Done Editing
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}
