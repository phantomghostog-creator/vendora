'use client';

import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { SectionConfig } from '@/types/builder';
import { useBuilder } from '@/context/BuilderContext';
import { Trash2, GripVertical, Settings, Grid, Star, Video, HelpCircle, MousePointer2, Code } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DraggableSectionProps {
  section: SectionConfig;
}

export default function DraggableSection({ section }: DraggableSectionProps) {
  const { activeSectionId, setActiveSectionId, removeSection } = useBuilder();
  const isActive = activeSectionId === section.id;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "group relative transition-all",
        isActive ? "ring-2 ring-indigo-500 rounded-lg shadow-2xl z-10 scale-[1.01]" : "hover:ring-2 hover:ring-indigo-300 rounded-lg",
        isDragging && "opacity-50 grayscale"
      )}
      onClick={(e) => {
        e.stopPropagation();
        setActiveSectionId(section.id);
      }}
    >
      {/* Selection Overlay & Controls */}
      <div className={cn(
        "absolute -left-12 top-0 bottom-0 flex flex-col items-center py-2 gap-2 transition-opacity",
        isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
      )}>
        <button
          {...attributes}
          {...listeners}
          className="p-2 bg-white rounded-lg shadow-md border border-gray-200 text-gray-400 hover:text-indigo-600 cursor-grab active:cursor-grabbing"
          title="Drag to reorder"
        >
          <GripVertical size={16} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            removeSection(section.id);
          }}
          className="p-2 bg-white rounded-lg shadow-md border border-gray-200 text-gray-400 hover:text-red-600"
          title="Delete Section"
        >
          <Trash2 size={16} />
        </button>
      </div>

      {/* Render the actual section component */}
      <div className="bg-white rounded-lg overflow-hidden pointer-events-none min-h-[100px] flex items-center justify-center border border-gray-100 shadow-sm">
        <SectionRenderer section={section} />
      </div>
      
      {/* Floating Active Indicator */}
      {isActive && (
        <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-indigo-600 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
          Active
        </div>
      )}
    </div>
  );
}

function SectionRenderer({ section }: { section: SectionConfig }) {
  const { type, content, variant } = section;

  switch (type) {
    case 'hero':
      return (
        <div className={cn(
          "w-full py-20 px-8 text-center",
          variant === 'dark' ? "bg-slate-900 text-white" : "bg-gradient-to-br from-indigo-50 to-white text-gray-900",
          variant === 'minimal' && "py-12 bg-white border-b"
        )}>
          <h2 className={cn("text-4xl font-black mb-4", variant === 'minimal' && "text-2xl")}>{content.title}</h2>
          <p className={cn("text-lg mb-8 max-w-2xl mx-auto", variant === 'dark' ? "text-slate-300" : "text-gray-500")}>{content.subtitle}</p>
          <button className={cn(
            "px-8 py-4 rounded-xl font-bold transition-all",
            variant === 'dark' ? "bg-white text-slate-900 hover:bg-slate-100" : "bg-indigo-600 text-white hover:bg-indigo-700"
          )}>
            {content.buttonText}
          </button>
        </div>
      );
    case 'product-grid':
      return (
        <div className="w-full py-16 px-8 bg-white">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-black text-gray-900">{content.title}</h2>
            <button className="text-indigo-600 font-bold text-sm hover:underline">View All</button>
          </div>
          <div className={cn(
            "grid gap-6",
            variant === 'list' ? "grid-cols-1" : "grid-cols-2 md:grid-cols-4"
          )}>
            {[...Array(content.limit)].map((_, i) => (
              <div key={i} className={cn(
                "group cursor-pointer",
                variant === 'list' ? "flex gap-6 items-center border-b pb-6" : ""
              )}>
                <div className={cn(
                  "bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-center transition-all group-hover:border-indigo-100 group-hover:shadow-lg",
                  variant === 'list' ? "w-32 h-32" : "aspect-[4/5] mb-4"
                )}>
                  <Grid className="text-gray-200" size={32} />
                </div>
                <div>
                  <div className="h-4 w-32 bg-gray-100 rounded mb-2" />
                  <div className="h-3 w-16 bg-indigo-50 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    case 'testimonials':
      return (
        <div className="w-full py-16 px-8 bg-gray-50/50">
          <h2 className="text-center text-2xl font-black text-gray-900 mb-12">What our customers say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(5)].map((_, j) => <Star key={j} size={14} fill="currentColor" />)}
                </div>
                <p className="text-gray-600 text-sm italic mb-6">&quot;This platform changed how I sell online. The setup was incredibly fast and the support is top-notch.&quot;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-100 rounded-full" />
                  <div>
                    <p className="text-xs font-bold text-gray-900">John Doe</p>
                    <p className="text-[10px] text-gray-400">CEO at TechCorp</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    case 'announcement-bar':
      return (
        <div className={cn(
          "w-full py-2.5 px-4 text-center text-[10px] font-black uppercase tracking-[0.2em] transition-all",
          variant === 'gradient' ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white" : "bg-indigo-600 text-white",
          variant === 'outline' && "bg-white border-y border-indigo-100 text-indigo-600"
        )}>
          {content.text}
        </div>
      );
    case 'video':
      return (
        <div className="w-full py-16 px-8 bg-white flex justify-center">
          <div className="w-full max-w-3xl aspect-video bg-slate-900 rounded-3xl flex items-center justify-center relative overflow-hidden group cursor-pointer shadow-2xl">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-transform group-hover:scale-110">
              <Video size={32} fill="currentColor" />
            </div>
            <div className="absolute inset-0 bg-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
      );
    case 'faq':
      return (
        <div className="w-full py-16 px-8 bg-white">
          <h2 className="text-2xl font-black text-gray-900 mb-10 text-center">Frequently Asked Questions</h2>
          <div className="max-w-2xl mx-auto space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-6 border border-gray-100 rounded-2xl flex items-center justify-between hover:border-indigo-100 transition-colors cursor-pointer group">
                <p className="font-bold text-gray-700 group-hover:text-indigo-600">Question about the service</p>
                <HelpCircle className="text-gray-300 group-hover:text-indigo-400" size={18} />
              </div>
            ))}
          </div>
        </div>
      );
    case 'newsletter':
      return (
        <div className="w-full py-16 px-8 bg-indigo-600">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-2xl font-black text-white mb-4">Join our newsletter</h2>
            <p className="text-indigo-100 mb-8">Get the latest updates and exclusive offers directly in your inbox.</p>
            <div className="flex gap-2 p-2 bg-white rounded-2xl shadow-xl">
              <input type="email" placeholder="Enter your email" className="flex-1 px-4 bg-transparent outline-none text-sm text-gray-900" />
              <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-indigo-700 transition-all">Subscribe</button>
            </div>
          </div>
        </div>
      );
    case 'countdown':
      return (
        <div className={cn(
          "w-full py-12 px-8 text-center",
          variant === 'dark' ? "bg-slate-900 text-white" : "bg-white text-gray-900",
          variant === 'gradient' && "bg-gradient-to-r from-pink-500 to-purple-600 text-white"
        )}>
          <h2 className="text-xl font-bold mb-6">Sale ends in:</h2>
          <div className="flex justify-center gap-4">
            {['02', '14', '55', '38'].map((val, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className={cn(
                  "w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black mb-2",
                  variant === 'dark' ? "bg-white/10" : "bg-gray-100",
                  variant === 'gradient' && "bg-white/20"
                )}>
                  {val}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">
                  {['Days', 'Hours', 'Mins', 'Secs'][i]}
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    case 'floating-cta':
      return (
        <div className="w-full h-32 flex items-center justify-center bg-gray-50 border-y border-dashed border-gray-200">
          <div className={cn(
            "px-6 py-3 rounded-full font-bold shadow-2xl flex items-center gap-3 transition-all",
            variant === 'gradient' ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white" : "bg-indigo-600 text-white",
            variant === 'pulse' && "animate-bounce"
          )}>
            <MousePointer2 size={18} />
            {content.buttonText || 'Special Offer'}
            <span className="bg-white/20 px-2 py-0.5 rounded text-[10px]">Limited</span>
          </div>
        </div>
      );
    case 'custom-html':
      return (
        <div className="w-full py-12 px-8 bg-white">
          <div className="p-8 border-2 border-dashed border-gray-100 rounded-3xl flex flex-col items-center text-center">
            <Code className="text-indigo-400 mb-4" size={32} />
            <h3 className="font-bold text-gray-900 mb-2">Custom HTML/Embed Block</h3>
            <p className="text-sm text-gray-500 mb-4 max-w-sm">Use this block to add external widgets, custom scripts, or unique HTML structures to your page.</p>
            <div className="bg-slate-900 rounded-xl p-4 w-full max-w-md text-left">
              <code className="text-xs text-indigo-300 font-mono block truncate">
                {content.html || '<!-- Your code here -->'}
              </code>
            </div>
          </div>
        </div>
      );
    default:
      return (
        <div className="w-full py-12 px-8 text-center">
          <div className="inline-block p-3 bg-gray-50 rounded-2xl text-gray-400 mb-2">
            <Settings size={24} />
          </div>
          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">
            {(type as string).replace('-', ' ')}
          </p>
        </div>
      );
  }
}
