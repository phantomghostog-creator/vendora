import { PageConfig } from '@/types/builder';

export const TEMPLATES: PageConfig[] = [
  {
    id: 'fashion-boutique',
    title: 'Fashion Boutique',
    sections: [
      {
        id: 'ann-1',
        type: 'announcement-bar',
        variant: 'gradient',
        content: { text: 'New Season Collection - Up to 40% Off!' },
        styles: {}
      },
      {
        id: 'hero-1',
        type: 'hero',
        variant: 'split',
        content: { 
          title: 'Elegance in Every Detail', 
          subtitle: 'Discover our curated collection of sustainable luxury fashion.', 
          buttonText: 'Shop New Arrivals' 
        },
        styles: {}
      },
      {
        id: 'grid-1',
        type: 'product-grid',
        variant: 'masonry',
        content: { title: 'Featured Pieces', limit: 4 },
        styles: {}
      },
      {
        id: 'test-1',
        type: 'testimonials',
        variant: 'cards',
        content: { title: 'What Our Clients Say' },
        styles: {}
      },
      {
        id: 'news-1',
        type: 'newsletter',
        variant: 'minimal',
        content: { title: 'Join the Inner Circle', subtitle: 'Get early access to drops and exclusive offers.' },
        styles: {}
      }
    ]
  },
  {
    id: 'digital-products',
    title: 'Digital Products Store',
    sections: [
      {
        id: 'hero-2',
        type: 'hero',
        variant: 'dark',
        content: { 
          title: 'Master Your Workflow', 
          subtitle: 'Premium assets for creative professionals and developers.', 
          buttonText: 'Browse Assets' 
        },
        styles: {}
      },
      {
        id: 'video-1',
        type: 'video',
        variant: 'default',
        content: { videoUrl: 'https://youtube.com/...' },
        styles: {}
      },
      {
        id: 'grid-2',
        type: 'product-grid',
        variant: 'compact',
        content: { title: 'Bestselling Bundles', limit: 3 },
        styles: {}
      },
      {
        id: 'faq-1',
        type: 'faq',
        variant: 'accordion',
        content: { title: 'Common Questions' },
        styles: {}
      }
    ]
  },
  {
    id: 'fitness-gym',
    title: 'Fitness & Gym',
    sections: [
      {
        id: 'hero-3',
        type: 'hero',
        variant: 'video-bg',
        content: { 
          title: 'Unleash Your Potential', 
          subtitle: 'High-performance gear for athletes who never settle.', 
          buttonText: 'Join the Movement' 
        },
        styles: {}
      },
      {
        id: 'count-1',
        type: 'countdown',
        variant: 'gradient',
        content: { title: 'Flash Sale: 24 Hours Left', endDate: '2024-12-31' },
        styles: {}
      },
      {
        id: 'grid-3',
        type: 'product-grid',
        variant: 'detailed',
        content: { title: 'Top Equipment', limit: 6 },
        styles: {}
      },
      {
        id: 'float-1',
        type: 'floating-cta',
        variant: 'pulse',
        content: { buttonText: 'Claim Free Trial' },
        styles: {}
      }
    ]
  },
  {
    id: 'jewelry-luxe',
    title: 'Jewelry & Luxe',
    sections: [
      {
        id: 'hero-4',
        type: 'hero',
        variant: 'centered',
        content: { 
          title: 'Timeless Beauty', 
          subtitle: 'Handcrafted jewelry that tells your unique story.', 
          buttonText: 'Explore Collections' 
        },
        styles: {}
      },
      {
        id: 'grid-4',
        type: 'product-grid',
        variant: 'featured-main',
        content: { title: 'The Diamond Series', limit: 4 },
        styles: {}
      },
      {
        id: 'test-2',
        type: 'testimonials',
        variant: 'slider',
        content: { title: 'Rave Reviews' },
        styles: {}
      }
    ]
  },
  {
    id: 'restaurant-food',
    title: 'Restaurant & Food',
    sections: [
      {
        id: 'hero-5',
        type: 'hero',
        variant: 'image-right',
        content: { 
          title: 'Taste the Passion', 
          subtitle: 'Fresh ingredients, bold flavors, and home delivery.', 
          buttonText: 'Order Online' 
        },
        styles: {}
      },
      {
        id: 'grid-5',
        type: 'product-grid',
        variant: 'list',
        content: { title: 'Our Weekly Menu', limit: 5 },
        styles: {}
      },
      {
        id: 'news-2',
        type: 'newsletter',
        variant: 'inline',
        content: { title: 'Subscribe for Recipes', subtitle: 'Get cooking tips delivered to your inbox.' },
        styles: {}
      }
    ]
  },
  {
    id: 'electronics',
    title: 'Electronics',
    sections: [
      { id: 'h-6', type: 'hero', variant: 'full-height', content: { title: 'Next-Gen Tech', subtitle: 'Pushing the boundaries of innovation.', buttonText: 'Shop Gadgets' }, styles: {} },
      { id: 'g-6', type: 'product-grid', variant: 'two-column', content: { title: 'New Arrivals', limit: 4 }, styles: {} },
      { id: 'f-6', type: 'faq', variant: 'grid', content: { title: 'Tech Support' }, styles: {} }
    ]
  },
  {
    id: 'art-design',
    title: 'Art & Design Portfolio',
    sections: [
      { id: 'h-7', type: 'hero', variant: 'minimal', content: { title: 'Visual Storytelling', subtitle: 'A collection of digital art and designs.', buttonText: 'View Portfolio' }, styles: {} },
      { id: 'g-7', type: 'product-grid', variant: 'masonry', content: { title: 'Recent Works', limit: 8 }, styles: {} }
    ]
  },
  {
    id: 'saas-software',
    title: 'SaaS Software',
    sections: [
      { id: 'h-8', type: 'hero', variant: 'gradient', content: { title: 'Scale Your Business', subtitle: 'The ultimate tool for modern teams.', buttonText: 'Get Started Free' }, styles: {} },
      { id: 'v-8', type: 'video', variant: 'glass', content: { videoUrl: '...' }, styles: {} },
      { id: 't-8', type: 'testimonials', variant: 'bubble', content: { title: 'Trusted by 10k+ Teams' }, styles: {} }
    ]
  },
  {
    id: 'print-on-demand',
    title: 'Print on Demand',
    sections: [
      { id: 'h-9', type: 'hero', variant: 'image-left', content: { title: 'Your Art, Our Canvas', subtitle: 'Unique apparel and home decor.', buttonText: 'Create Now' }, styles: {} },
      { id: 'g-9', type: 'product-grid', variant: 'grid', content: { title: 'Best Sellers', limit: 4 }, styles: {} }
    ]
  },
  {
    id: 'photography',
    title: 'Photography Studio',
    sections: [
      { id: 'h-10', type: 'hero', variant: 'dark', content: { title: 'Capturing Moments', subtitle: 'Professional photography services.', buttonText: 'Book a Session' }, styles: {} },
      { id: 'g-10', type: 'product-grid', variant: 'carousel', content: { title: 'Gallery Highlights', limit: 6 }, styles: {} }
    ]
  },
  {
    id: 'agency-freelancer',
    title: 'Agency & Freelancer',
    sections: [
      { id: 'h-11', type: 'hero', variant: 'split', content: { title: 'We Build Brands', subtitle: 'Creative solutions for startups.', buttonText: 'Our Services' }, styles: {} },
      { id: 't-11', type: 'testimonials', variant: 'minimal', content: { title: 'Clients We Work With' }, styles: {} }
    ]
  },
  {
    id: 'membership-club',
    title: 'Membership Club',
    sections: [
      { id: 'h-12', type: 'hero', variant: 'centered', content: { title: 'Join the Community', subtitle: 'Exclusive benefits and content.', buttonText: 'Become a Member' }, styles: {} },
      { id: 'f-12', type: 'faq', variant: 'boxed', content: { title: 'Membership Details' }, styles: {} }
    ]
  },
  {
    id: 'event-tickets',
    title: 'Event Tickets',
    sections: [
      { id: 'h-13', type: 'hero', variant: 'video-bg', content: { title: 'Live Experiences', subtitle: 'Book tickets for the hottest events.', buttonText: 'View Calendar' }, styles: {} },
      { id: 'c-13', type: 'countdown', variant: 'boxed', content: { title: 'Next Event Starts In', endDate: '2024-06-15' }, styles: {} }
    ]
  },
  {
    id: 'ebook-pdf',
    title: 'Ebook & PDF Store',
    sections: [
      { id: 'h-14', type: 'hero', variant: 'image-right', content: { title: 'Knowledge at Your Fingertips', subtitle: 'A curated library of digital guides.', buttonText: 'Browse Books' }, styles: {} },
      { id: 'g-14', type: 'product-grid', variant: 'compact', content: { title: 'New Releases', limit: 4 }, styles: {} }
    ]
  },
  {
    id: 'subscription-box',
    title: 'Subscription Box',
    sections: [
      { id: 'h-15', type: 'hero', variant: 'gradient', content: { title: 'Monthly Delights', subtitle: 'Curated boxes delivered to your door.', buttonText: 'Pick Your Box' }, styles: {} },
      { id: 'g-15', type: 'product-grid', variant: 'horizontal-scroll', content: { title: 'What\'s Inside', limit: 4 }, styles: {} }
    ]
  },
  {
    id: 'nft-marketplace',
    title: 'NFT Marketplace',
    sections: [
      { id: 'h-16', type: 'hero', variant: 'dark', content: { title: 'Collect Digital Art', subtitle: 'The future of ownership is here.', buttonText: 'Explore NFTs' }, styles: {} },
      { id: 'g-16', type: 'product-grid', variant: 'masonry', content: { title: 'Trending Collections', limit: 8 }, styles: {} }
    ]
  },
  {
    id: 'crypto-web3',
    title: 'Crypto & Web3',
    sections: [
      { id: 'h-17', type: 'hero', variant: 'video-bg', content: { title: 'Decentralized Finance', subtitle: 'Secure and transparent solutions.', buttonText: 'Connect Wallet' }, styles: {} },
      { id: 'f-17', type: 'faq', variant: 'dark', content: { title: 'Web3 FAQ' }, styles: {} }
    ]
  },
  {
    id: 'eco-friendly',
    title: 'Eco-Friendly Green Store',
    sections: [
      { id: 'h-18', type: 'hero', variant: 'minimal', content: { title: 'Sustainable Living', subtitle: 'Eco-friendly products for a greener home.', buttonText: 'Shop Sustainably' }, styles: {} },
      { id: 'g-18', type: 'product-grid', variant: 'grid', content: { title: 'Eco Picks', limit: 4 }, styles: {} }
    ]
  },
  {
    id: 'kids-toys',
    title: 'Kids & Toys',
    sections: [
      { id: 'h-19', type: 'hero', variant: 'gradient', content: { title: 'Play and Learn', subtitle: 'Safe and educational toys for all ages.', buttonText: 'Start Playing' }, styles: {} },
      { id: 'g-19', type: 'product-grid', variant: 'carousel', content: { title: 'Popular Toys', limit: 6 }, styles: {} }
    ]
  },
  {
    id: 'coaching-courses',
    title: 'Coaching & Courses',
    sections: [
      { id: 'h-20', type: 'hero', variant: 'centered', content: { title: 'Unlock Your Success', subtitle: 'Expert-led courses for personal growth.', buttonText: 'Enroll Now' }, styles: {} },
      { id: 'v-20', type: 'video', variant: 'default', content: { videoUrl: '...' }, styles: {} },
      { id: 't-20', type: 'testimonials', variant: 'cards', content: { title: 'Student Success Stories' }, styles: {} }
    ]
  },
  {
    id: 'minimalist-editorial',
    title: 'Minimalist Editorial',
    sections: [
      { id: 'h-21', type: 'hero', variant: 'minimal', content: { title: 'The Art of Less', subtitle: 'Curated essentials for a mindful lifestyle.', buttonText: 'Shop the Edit' }, styles: {} },
      { id: 'g-21', type: 'product-grid', variant: 'masonry', content: { title: 'The Collection', limit: 4 }, styles: {} }
    ]
  }
];
