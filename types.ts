import Stripe from 'stripe';

export interface UserDetails {
    id: string;
    firstName: string;
    lastName: string;
    fullName?: string;
    avatarUrl?: string;
    billingAddress?: string;
    paymentMethod?: string;
};

export interface Product {
    id: string;
    active?: boolean;
    description?: string;
    name?: string;
    metadata?: Stripe.Metadata;
    image?: string;
}

export interface Price {
    id: string;
    productId?: string;
    active?: boolean;
    description?: string;
    unitAmount?: number;
    currency?: string;
    type?: Stripe.Price.Type;
    interval?: Stripe.Price.Recurring.Interval;
    intervalCount?: number;
    trial_period_days?: number | null;
    metadata?: Stripe.Metadata;
    products?: Product;
}

export interface Subscription {
    id: string;
    userId: string;
    status?: string; 
    metadata?: string;
    priceId: string;
    quantity?: string;
    cancelAtPeriodEnd?: boolean;
    created: string;
    currentPeriodEnd: string;
    currentPeriodStart: string;
    endedAt?: string;
    canceledAt?: string;
    cancelAt?: string;
    trialStart?: string;
    trialEnd?: string;
    price: Price;
}