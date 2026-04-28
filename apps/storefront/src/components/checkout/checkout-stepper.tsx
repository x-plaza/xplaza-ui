'use client';

import { cn } from '@xplaza/utils';

interface Step {
  label: string;
  href: string;
}

interface CheckoutStepperProps {
  steps: Step[];
  currentStep: number;
}

export function CheckoutStepper({ steps, currentStep }: CheckoutStepperProps) {
  return (
    <nav aria-label='Checkout progress' className='mb-8'>
      {/* Thin progress bar */}
      <div className='h-1 bg-border w-full mb-4'>
        <div
          className='h-full bg-foreground transition-all duration-300'
          style={{
            width: `${((currentStep + 1) / steps.length) * 100}%`,
          }}
        />
      </div>
      {/* Step labels */}
      <ol className='flex items-center justify-between'>
        {steps.map((step, index) => (
          <li key={step.label}>
            <span
              className={cn(
                'text-[13px]',
                index <= currentStep
                  ? 'font-bold text-foreground'
                  : 'text-muted-foreground'
              )}
            >
              {index + 1}. {step.label}
            </span>
          </li>
        ))}
      </ol>
    </nav>
  );
}
