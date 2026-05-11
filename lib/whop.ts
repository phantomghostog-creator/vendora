/**
 * Whop Payment Integration for Vendora
 * Handles checkout, authentication, and payment processing via Whop's API
 */

export const WHOP_APP_ID = process.env.NEXT_PUBLIC_WHOP_APP_ID || '';
export const WHOP_API_KEY = process.env.WHOP_API_KEY || '';
export const WHOP_WEBHOOK_SECRET = process.env.WHOP_WEBHOOK_SECRET || '';

export interface WhopProduct {
  id: string;
  title: string;
  price: number;
  currency: string;
  description?: string;
  image?: string;
}

export interface WhopCheckoutOptions {
  productId: string;
  email?: string;
  customData?: Record<string, string>;
  redirectUrl?: string;
}

/**
 * Initialize a Whop checkout session
 */
export async function createWhopCheckout(options: WhopCheckoutOptions): Promise<{ checkoutUrl: string; sessionId: string }> {
  if (!WHOP_API_KEY) {
    throw new Error('Whop API key not configured');
  }

  const sessionId = `whop_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  // Whop checkout URL format
  const checkoutUrl = `https://whop.com/checkout/${options.productId}?email=${options.email || ''}&redirect=${options.redirectUrl || ''}`;
  
  return { checkoutUrl, sessionId };
}

/**
 * Verify a Whop webhook signature
 */
export function verifyWhopWebhook(payload: string, signature: string): boolean {
  if (!WHOP_WEBHOOK_SECRET) return true; // Skip verification if not configured
  
  const crypto = require('crypto');
  const expectedSignature = crypto
    .createHmac('sha256', WHOP_WEBHOOK_SECRET)
    .update(payload)
    .digest('hex');
  
  return signature === expectedSignature;
}

/**
 * Get product details from Whop
 */
export async function getWhopProduct(productId: string): Promise<WhopProduct | null> {
  if (!WHOP_API_KEY) return null;

  try {
    const response = await fetch(`https://api.whop.com/v1/products/${productId}`, {
      headers: {
        'Authorization': `Bearer ${WHOP_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) return null;
    
    const data = await response.json();
    return {
      id: data.id,
      title: data.title,
      price: data.price,
      currency: data.currency || 'USD',
      description: data.description,
      image: data.image,
    };
  } catch {
    return null;
  }
}

/**
 * List all products from Whop
 */
export async function listWhopProducts(): Promise<WhopProduct[]> {
  if (!WHOP_API_KEY) return [];

  try {
    const response = await fetch('https://api.whop.com/v1/products', {
      headers: {
        'Authorization': `Bearer ${WHOP_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) return [];
    
    const data = await response.json();
    return data.products || [];
  } catch {
    return [];
  }
}

/**
 * Check if a license key is valid via Whop
 */
export async function verifyWhopLicense(licenseKey: string): Promise<{ valid: boolean; owner?: string; plan?: string }> {
  if (!WHOP_API_KEY) return { valid: false };

  try {
    const response = await fetch(`https://api.whop.com/v1/licenses/${licenseKey}/verify`, {
      headers: {
        'Authorization': `Bearer ${WHOP_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) return { valid: false };
    
    const data = await response.json();
    return {
      valid: data.valid,
      owner: data.owner_email,
      plan: data.plan_title,
    };
  } catch {
    return { valid: false };
  }
}
