/**
 * Capitec Bank Direct Payout Integration via Flutterwave
 */
export const CAPITEC_BANK_CODE = '470010';
export const CAPITEC_BANK_NAME = 'Capitec Bank';

export function validateCapitecAccount(accountNumber: string): boolean {
  return /^\d{9}$/.test(accountNumber);
}

export function getCapitecBankDetails(): { name: string; code: string } {
  return { name: CAPITEC_BANK_NAME, code: CAPITEC_BANK_CODE };
}

export async function initiateCapitecPayout(amount: number, vendor: { id: string; email: string; first_name: string; last_name: string }, bankAccount: { account_number: string; account_holder: string; bank_name?: string; bank_code?: string }) {
  const { FLUTTERWAVE_SECRET_KEY } = process.env;
  if (!FLUTTERWAVE_SECRET_KEY) return { success: false, error: 'Flutterwave secret key not configured' };
  if (amount < 50) return { success: false, error: 'Minimum payout amount is R50' };
  if (amount > 100000) return { success: false, error: 'Maximum single payout amount is R100,000' };
  try {
    const reference = `VP-${Date.now()}-${vendor.id.substring(0, 8)}`;
    const response = await fetch('https://api.flutterwave.com/v3/transfers', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${FLUTTERWAVE_SECRET_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount, currency: 'ZAR', destination_bank_code: CAPITEC_BANK_CODE, destination_account_number: bankAccount.account_number,
        beneficiary_name: bankAccount.account_holder, recipient_bank_code: CAPITEC_BANK_CODE, recipient_account_number: bankAccount.account_number,
        recipient_name: bankAccount.account_holder, reference,
        meta: { vendor_id: vendor.id, vendor_email: vendor.email, payout_type: 'vendor_withdrawal' },
      }),
    });
    const data = await response.json();
    if (data.status === 'success') return { success: true, transfer_id: data.data.id, transfer_ref: data.data.reference, status: data.data.status };
    return { success: false, error: data.message || 'Transfer failed' };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Network error' };
  }
}
