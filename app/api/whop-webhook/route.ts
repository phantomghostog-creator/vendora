import { NextRequest, NextResponse } from 'next/server';
import { verifyWhopWebhook } from '../../../../lib/whop';

export async function POST(request: NextRequest) {
  try {
    const payload = await request.text();
    const signature = request.headers.get('x-whop-signature') || '';

    // Verify webhook signature
    if (!verifyWhopWebhook(payload, signature)) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const event = JSON.parse(payload);
    console.log('Whop webhook event:', event);

    // Handle different event types
    switch (event.event) {
      case 'payment.completed':
        // Handle successful payment
        console.log('Payment completed:', event.data);
        break;
      case 'subscription.renewed':
        // Handle subscription renewal
        console.log('Subscription renewed:', event.data);
        break;
      case 'license.created':
        // Handle new license creation
        console.log('License created:', event.data);
        break;
      default:
        console.log('Unhandled Whop event:', event.event);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Whop webhook error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
