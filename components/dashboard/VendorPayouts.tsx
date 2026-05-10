'use client';
import { useState } from 'react';
import { ArrowUpRight, ArrowDownLeft, Clock, CheckCircle, XCircle, AlertCircle, Wallet } from 'lucide-react';

interface Payout {
  id: string;
  amount: number;
  currency: string;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled';
  flutterwave_transfer_ref?: string;
  scheduled_at?: string;
  processed_at?: string;
  failure_reason?: string;
  created_at: string;
}

interface VendorPayoutsProps {
  payouts: Payout[];
  availableBalance: number;
  onRequestPayout: (amount: number) => void;
}

export default function VendorPayouts({ payouts, availableBalance, onRequestPayout }: VendorPayoutsProps) {
  const [amount, setAmount] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    if (numAmount >= 50 && numAmount <= availableBalance) {
      onRequestPayout(numAmount);
      setAmount('');
      setShowForm(false);
    }
  };

  const statusConfig = {
    pending: { icon: Clock, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
    processing: { icon: ArrowUpRight, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    completed: { icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-500/10' },
    failed: { icon: XCircle, color: 'text-red-500', bg: 'bg-red-500/10' },
    cancelled: { icon: AlertCircle, color: 'text-gray-500', bg: 'bg-gray-500/10' },
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Payouts</h2>
          <p className="text-sm text-gray-400">Withdraw your earnings to your Capitec bank account</p>
        </div>
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-4 py-2">
          <p className="text-xs text-emerald-400 mb-1">Available Balance</p>
          <p className="text-xl font-bold text-emerald-400">R{availableBalance.toFixed(2)}</p>
        </div>
      </div>

      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          disabled={availableBalance < 50}
          className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-medium py-3 px-4 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <Wallet className="w-4 h-4" />
          Request Withdrawal
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Amount (ZAR)</label>
            <input
              type="number"
              min="50"
              max={availableBalance}
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount (min R50)"
              className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500"
            />
            <p className="text-xs text-gray-500 mt-1">Minimum: R50 | Maximum: R100,000</p>
          </div>
          <div className="flex gap-2">
            <button type="submit" className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2 px-4 rounded-lg transition-colors">
              Confirm
            </button>
            <button type="button" onClick={() => setShowForm(false)} className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition-colors">
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">Payout History</h3>
        {payouts.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <ArrowDownLeft className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>No payouts yet</p>
          </div>
        ) : (
          payouts.map((payout) => {
            const config = statusConfig[payout.status];
            const Icon = config.icon;
            return (
              <div key={payout.id} className={`${config.bg} border border-gray-700 rounded-lg p-4 flex items-center justify-between`}>
                <div className="flex items-center gap-3">
                  <div className={`${config.color}`}><Icon className="w-5 h-5" /></div>
                  <div>
                    <p className="font-medium text-white">R{payout.amount.toFixed(2)}</p>
                    <p className="text-xs text-gray-400">{new Date(payout.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-xs font-medium ${config.color} capitalize`}>{payout.status}</span>
                  {payout.flutterwave_transfer_ref && (
                    <p className="text-xs text-gray-500 mt-1">{payout.flutterwave_transfer_ref}</p>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
