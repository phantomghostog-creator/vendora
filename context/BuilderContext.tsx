'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { SectionConfig, PageConfig, SectionType } from '@/types/builder';
import { v4 as uuidv4 } from 'uuid';

interface BuilderContextType {
  pageConfig: PageConfig;
  activeSectionId: string | null;
  setActiveSectionId: (id: string | null) => void;
  addSection: (type: SectionType) => void;
  removeSection: (id: string) => void;
  updateSection: (id: string, updates: Partial<SectionConfig>) => void;
  reorderSections: (startIndex: number, endIndex: number) => void;
  importConfig: (config: PageConfig) => void;
}

const BuilderContext = createContext<BuilderContextType | undefined>(undefined);

export const BuilderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pageConfig, setPageConfig] = useState<PageConfig>({
    id: 'default-page',
    title: 'New Page',
    sections: [],
  });
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);

  const addSection = useCallback((type: SectionType) => {
    const newSection: SectionConfig = {
      id: uuidv4(),
      type,
      variant: 'default',
      content: getDefaultContent(type),
      styles: {},
    };
    setPageConfig((prev) => ({
      ...prev,
      sections: [...prev.sections, newSection],
    }));
    setActiveSectionId(newSection.id);
  }, []);

  const removeSection = useCallback((id: string) => {
    setPageConfig((prev) => ({
      ...prev,
      sections: prev.sections.filter((s) => s.id !== id),
    }));
    if (activeSectionId === id) setActiveSectionId(null);
  }, [activeSectionId]);

  const updateSection = useCallback((id: string, updates: Partial<SectionConfig>) => {
    setPageConfig((prev) => ({
      ...prev,
      sections: prev.sections.map((s) => (s.id === id ? { ...s, ...updates } : s)),
    }));
  }, []);

  const reorderSections = useCallback((startIndex: number, endIndex: number) => {
    setPageConfig((prev) => {
      const newSections = Array.from(prev.sections);
      const [removed] = newSections.splice(startIndex, 1);
      newSections.splice(endIndex, 0, removed);
      return { ...prev, sections: newSections };
    });
  }, []);

  const importConfig = useCallback((config: PageConfig) => {
    setPageConfig(config);
    setActiveSectionId(null);
  }, []);

  return (
    <BuilderContext.Provider
      value={{
        pageConfig,
        activeSectionId,
        setActiveSectionId,
        addSection,
        removeSection,
        updateSection,
        reorderSections,
        importConfig,
      }}
    >
      {children}
    </BuilderContext.Provider>
  );
};

export const useBuilder = () => {
  const context = useContext(BuilderContext);
  if (!context) throw new Error('useBuilder must be used within a BuilderProvider');
  return context;
};

function getDefaultContent(type: SectionType): Record<string, any> {
  switch (type) {
    case 'hero':
      return { title: 'New Hero Section', subtitle: 'Elevate your brand with our premium Gear', buttonText: 'Shop Collection' };
    case 'product-grid':
      return { title: 'Featured Products', limit: 4 };
    case 'announcement-bar':
      return { text: 'Free shipping on orders over $100!' };
    case 'testimonials':
      return { title: 'Customer Stories' };
    case 'newsletter':
      return { title: 'Join the Community', subtitle: 'Get 10% off your first order' };
    case 'video':
      return { videoUrl: 'https://youtube.com/...' };
    case 'countdown':
      return { title: 'Limited Time Offer', endDate: '2024-12-31' };
    case 'floating-cta':
      return { buttonText: 'Chat with Us' };
    case 'custom-html':
      return { html: '<div class="custom">Hello World</div>' };
    default:
      return {};
  }
}
