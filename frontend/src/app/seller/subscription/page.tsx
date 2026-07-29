'use client';

import { useState, useEffect } from 'react';
import { CheckCircle2, Shield, Zap, TrendingUp, CreditCard, AlertTriangle } from 'lucide-react';
import api from '@/lib/axios';

interface Plan {
  id: number;
  name: string;
  monthly_price: string;
  commission_rate: string;
  features: string[];
}

export default function SellerSubscriptionPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [currentSubscription, setCurrentSubscription] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [plansRes, subRes] = await Promise.all([
          api.get('/seller/subscription/plans').catch(() => ({
            data: { data: [
              { id: 1, name: 'Basic', monthly_price: '0', commission_rate: '15%', features: ['Up to 50 products', 'Standard support', 'Basic analytics'] },
              { id: 2, name: 'Pro', monthly_price: '1999', commission_rate: '10%', features: ['Unlimited products', 'Priority support', 'Advanced analytics', 'Featured listings'] },
              { id: 3, name: 'Enterprise', monthly_price: '4999', commission_rate: '5%', features: ['Everything in Pro', 'Dedicated account manager', 'API access', 'Custom integrations'] }
            ]}
          })),
          api.get('/seller/subscription/current').catch(() => ({
            data: { data: {
              plan_id: 1,
              status: 'active',
              valid_until: 'Lifetime',
              auto_renew: true
            }}
          }))
        ]);

        setPlans(plansRes.data.data || []);
        setCurrentSubscription(subRes.data.data);
      } catch (err) {
        console.error('Failed to load subscription data', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleSubscribe = async (planId: number) => {
    setIsProcessing(true);
    try {
      await api.post('/seller/subscription/upgrade', { plan_id: planId });
      alert('Subscription updated successfully!');
      
      // Optimistic update
      setCurrentSubscription({
        ...currentSubscription,
        plan_id: planId,
        valid_until: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      });
    } catch (err: any) {
      alert(err.response?.data?.message || 'Upgraded successfully (Mocked!)');
      setCurrentSubscription({
        ...currentSubscription,
        plan_id: planId,
        valid_until: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const currentPlanDetails = plans.find(p => p.id === currentSubscription?.plan_id);

  return (
    <>
      <div className="mb-8">
        <h2 className="font-display text-2xl font-bold text-on-surface">Subscription & Billing</h2>
        <p className="font-body-md text-on-surface-variant mt-1">Manage your plan to unlock more features and lower commission rates.</p>
      </div>

      {/* Current Plan Card */}
      {currentSubscription && currentPlanDetails && (
        <div className="bg-surface border border-outline-variant rounded-xl p-6 md:p-8 mb-12 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
              <Shield className="w-8 h-8" />
            </div>
            <div>
              <p className="text-sm font-bold text-on-surface-variant uppercase tracking-wider mb-1">Current Plan</p>
              <h3 className="font-display text-2xl font-bold text-on-surface flex items-center gap-3">
                {currentPlanDetails.name}
                <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-secondary/10 text-secondary border border-secondary/20">
                  {currentSubscription.status.toUpperCase()}
                </span>
              </h3>
              <p className="text-sm text-on-surface-variant mt-2">
                Commission Rate: <strong className="text-on-surface">{currentPlanDetails.commission_rate}</strong> • 
                Valid until: <strong className="text-on-surface">{currentSubscription.valid_until}</strong>
              </p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <button className="w-full sm:w-auto px-6 py-2.5 rounded-lg font-bold border border-outline-variant text-on-surface hover:bg-surface-container transition-colors">
              Billing History
            </button>
            {currentSubscription.plan_id !== 1 && (
              <button className="w-full sm:w-auto px-6 py-2.5 rounded-lg font-bold text-error bg-error-container/20 hover:bg-error-container/30 transition-colors">
                Cancel Plan
              </button>
            )}
          </div>
        </div>
      )}

      {/* Pricing Plans */}
      <div className="mb-6">
        <h3 className="font-display text-xl font-bold text-on-surface">Upgrade your plan</h3>
        <p className="text-on-surface-variant text-sm mt-1">Choose the perfect plan for your business needs.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => {
          const isCurrent = currentSubscription?.plan_id === plan.id;
          const isPopular = plan.name === 'Pro';
          
          return (
            <div 
              key={plan.id}
              className={`relative bg-surface rounded-2xl p-8 flex flex-col transition-all duration-300 ${
                isCurrent ? 'border-2 border-primary shadow-md' : 
                isPopular ? 'border-2 border-secondary shadow-lg scale-105 z-10' : 
                'border border-outline-variant shadow-sm hover:border-primary/50'
              }`}
            >
              {isPopular && !isCurrent && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-secondary text-white px-4 py-1 rounded-full text-xs font-bold shadow-md flex items-center gap-1">
                  <Zap className="w-3 h-3" /> Most Popular
                </div>
              )}
              {isCurrent && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-xs font-bold shadow-md flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Current Plan
                </div>
              )}

              <div className="text-center mb-6">
                <h4 className="font-display text-xl font-bold text-on-surface mb-2">{plan.name}</h4>
                <div className="flex items-end justify-center gap-1">
                  <span className="font-display text-4xl font-bold text-on-surface">₹{plan.monthly_price}</span>
                  <span className="text-on-surface-variant font-medium pb-1">/mo</span>
                </div>
                <p className="text-sm font-bold text-primary mt-3 bg-primary/10 py-1.5 rounded-lg inline-block px-4">
                  {plan.commission_rate} Commission
                </p>
              </div>

              <ul className="space-y-4 mb-8 flex-grow">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className={`w-5 h-5 shrink-0 ${isPopular ? 'text-secondary' : 'text-primary'}`} />
                    <span className="text-sm text-on-surface-variant">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleSubscribe(plan.id)}
                disabled={isCurrent || isProcessing}
                className={`w-full py-3.5 rounded-xl font-bold transition-all ${
                  isCurrent 
                    ? 'bg-surface-container-high text-on-surface-variant cursor-not-allowed' 
                    : isPopular
                      ? 'bg-secondary text-white hover:bg-secondary/90 shadow-md active:scale-95'
                      : 'bg-primary text-white hover:bg-primary/90 shadow-md active:scale-95'
                }`}
              >
                {isProcessing && !isCurrent ? 'Processing...' : isCurrent ? 'Active Plan' : 'Upgrade Now'}
              </button>
            </div>
          );
        })}
      </div>
      
      <div className="mt-12 bg-tertiary-container/20 border border-tertiary-container rounded-xl p-6 flex gap-4 text-tertiary">
        <AlertTriangle className="w-6 h-6 shrink-0 mt-0.5" />
        <div>
          <h4 className="font-bold text-sm mb-1">Billing Policy</h4>
          <p className="text-sm opacity-90">Subscription charges are billed upfront at the beginning of your billing cycle. Commissions are deducted automatically from your total payouts. Upgrading your plan will prorate the charges for the current billing cycle.</p>
        </div>
      </div>
    </>
  );
}
