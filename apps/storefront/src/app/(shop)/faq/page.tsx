import type { Metadata } from 'next';
import { Card, CardContent } from '@xplaza/ui';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Frequently asked questions about X-Plaza.',
};

export const revalidate = 3600;

const faqs = [
  {
    question: 'How do I create an account?',
    answer:
      'Click "Sign In" in the top right corner and then "Create Account". Fill in your details and verify your email address.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept all major credit/debit cards via Stripe, as well as Cash on Delivery (COD) for eligible orders.',
  },
  {
    question: 'How can I track my order?',
    answer:
      'Go to Account → My Orders and click on your order to see real-time tracking information and delivery status.',
  },
  {
    question: 'What is your return policy?',
    answer:
      'Most products can be returned within 30 days of delivery. Items must be in original condition. Refunds are processed to your original payment method.',
  },
  {
    question: 'How do I become a seller on X-Plaza?',
    answer:
      'Visit our Vendor Portal and apply to become a seller. Our team reviews applications within 2-3 business days.',
  },
  {
    question: 'How does the loyalty program work?',
    answer:
      'Earn points on every purchase. Points accumulate and can be redeemed for discounts on future orders. Check your tier status in Account → Loyalty.',
  },
  {
    question: 'Can I use gift cards?',
    answer:
      'Yes! Gift cards can be applied during checkout. Check your balance under Account → Gift Cards.',
  },
  {
    question: 'How do I contact support?',
    answer:
      'Email us at support@xplaza.com or use the help center. We typically respond within 24 hours.',
  },
];

export default function FaqPage() {
  return (
    <div className='mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12'>
      <h1 className='text-3xl font-bold mb-2'>Frequently Asked Questions</h1>
      <p className='text-muted-foreground mb-8'>
        Find answers to common questions about shopping on X-Plaza.
      </p>

      <div className='space-y-4'>
        {faqs.map((faq, index) => (
          <Card key={index}>
            <CardContent className='p-6'>
              <h2 className='font-semibold text-lg mb-2'>{faq.question}</h2>
              <p className='text-muted-foreground'>{faq.answer}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
