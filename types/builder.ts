export type SectionType = 
  | 'hero' 
  | 'product-grid' 
  | 'testimonials' 
  | 'faq' 
  | 'video' 
  | 'countdown' 
  | 'announcement-bar' 
  | 'newsletter' 
  | 'floating-cta' 
  | 'custom-html';

export interface SectionConfig {
  id: string;
  type: SectionType;
  variant: string;
  content: Record<string, any>;
  styles: Record<string, any>;
}

export interface PageConfig {
  id: string;
  title: string;
  sections: SectionConfig[];
}
