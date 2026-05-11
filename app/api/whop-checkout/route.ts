import { NextRequest, NextResponse } from 'next/server';
import { createWhopCheckout } from '../../../../lib/whop';

export async function POST(request: NextRequest) {
  try {
    const { productId, email, redirectUrl } = await request.json();

    if (!productId) {
      return NextResponse.json({ error: 'Product ID required' }, { status: 400 });
    }

    const result = await createWhopCheckout({
      productId,
      email,
      redirectUrl: redirectUrl || `${request.headers.get('origin')}/dashboard`,
    });

    return NextResponse.json({
      success: true,
      checkoutUrl: result.checkoutUrl,
      sessionId: result.sessionId,
    });
  } catch (error) {
    console.error('Whop checkout error:', error);
    return NextResponse.json({ error: 'Failed to create checkout' }, { status: 500 });
  }
}
