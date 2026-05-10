import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { initiateCapitecPayout } from '../../../../lib/capitec';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, bank_account_id } = body;
    const authHeader = request.headers.get('authorization');
    if (!authHeader) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const vendorId = authHeader.replace('Bearer ', '');
    const { data: vendor } = await supabase.from('users').select('id, email, first_name, last_name').eq('id', vendorId).single();
    if (!vendor) return NextResponse.json({ error: 'Vendor not found' }, { status: 404 });

    const { data: bankAccount } = await supabase.from('vendor_bank_accounts').select('*').eq('id', bank_account_id).eq('vendor_id', vendorId).single();
    if (!bankAccount) return NextResponse.json({ error: 'Bank account not found' }, { status: 404 });

    const { data: pendingPayouts } = await supabase.from('payouts').select('amount').eq('vendor_id', vendorId).eq('status', 'pending');
    const pendingTotal = pendingPayouts?.reduce((sum: number, p: { amount: number }) => sum + p.amount, 0) || 0;
    const { data: completedOrders } = await supabase.from('orders').select('vendor_payout').eq('vendor_id', vendorId).eq('status', 'delivered');
    const totalEarnings = completedOrders?.reduce((sum: number, o: { vendor_payout: number }) => sum + (o.vendor_payout || 0), 0) || 0;
    const availableBalance = totalEarnings - pendingTotal;
    if (amount > availableBalance) return NextResponse.json({ error: `Insufficient balance. Available: R${availableBalance.toFixed(2)}` }, { status: 400 });

    const { data: payoutData, error: createError } = await supabase.from('payouts').insert({ vendor_id: vendorId, amount, currency: 'ZAR', bank_account_id, status: 'processing', scheduled_at: new Date().toISOString() }).select().single();
    if (createError || !payoutData) return NextResponse.json({ error: 'Failed to create payout record' }, { status: 500 });

    const result = await initiateCapitecPayout(amount, vendor, { account_number: bankAccount.account_number, account_holder: bankAccount.account_holder });
    if (result.success) {
      await supabase.from('payouts').update({ flutterwave_transfer_id: result.transfer_id, flutterwave_transfer_ref: result.transfer_ref, status: 'processing' }).eq('id', payoutData.id);
      return NextResponse.json({ success: true, payout_id: payoutData.id, transfer_id: result.transfer_id, transfer_ref: result.transfer_ref });
    } else {
      await supabase.from('payouts').update({ status: 'failed', failure_reason: result.error }).eq('id', payoutData.id);
      return NextResponse.json({ error: result.error || 'Payout failed' }, { status: 500 });
    }
  } catch (error) {
    console.error('Payout error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const vendorId = authHeader.replace('Bearer ', '');
    const { data: payouts, error } = await supabase.from('payouts').select('id, amount, currency, status, flutterwave_transfer_ref, scheduled_at, processed_at, failure_reason, created_at').eq('vendor_id', vendorId).order('created_at', { ascending: false });
    if (error) return NextResponse.json({ error: 'Failed to fetch payouts' }, { status: 500 });
    return NextResponse.json({ payouts: payouts || [] });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
