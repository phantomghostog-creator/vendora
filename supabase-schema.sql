-- Vendora PostgreSQL Schema for Supabase Free Tier
-- Reference: https://supabase.com/docs

-- VENDOR BANK ACCOUNTS
CREATE TABLE IF NOT EXISTS vendor_bank_accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vendor_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    bank_name TEXT NOT NULL DEFAULT 'Capitec',
    bank_code TEXT NOT NULL DEFAULT '470010',
    account_number TEXT NOT NULL,
    account_type TEXT DEFAULT 'savings',
    account_holder TEXT NOT NULL,
    is_verified BOOLEAN DEFAULT false,
    is_primary BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- PAYOUTS
CREATE TABLE IF NOT EXISTS payouts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vendor_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    amount REAL NOT NULL,
    currency TEXT DEFAULT 'ZAR',
    bank_account_id UUID REFERENCES vendor_bank_accounts(id) ON DELETE SET NULL,
    status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'processing', 'completed', 'failed', 'cancelled')),
    flutterwave_transfer_id TEXT,
    flutterwave_transfer_ref TEXT,
    scheduled_at TIMESTAMP WITH TIME ZONE,
    processed_at TIMESTAMP WITH TIME ZONE,
    failure_reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
