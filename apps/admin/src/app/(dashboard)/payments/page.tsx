'use client';

import { Card } from '@xplaza/ui';
import { CreditCard } from 'lucide-react';

export default function AdminPaymentsPage() {
  return (
    <div>
      <h1 className='text-2xl font-bold mb-6'>Payments & Transactions</h1>
      <Card className='overflow-hidden'>
        <table className='w-full'>
          <thead>
            <tr className='border-b bg-muted/50'>
              <th className='text-left text-xs font-medium text-muted-foreground px-4 py-3'>Transaction ID</th>
              <th className='text-left text-xs font-medium text-muted-foreground px-4 py-3'>Order</th>
              <th className='text-left text-xs font-medium text-muted-foreground px-4 py-3'>Amount</th>
              <th className='text-left text-xs font-medium text-muted-foreground px-4 py-3'>Method</th>
              <th className='text-left text-xs font-medium text-muted-foreground px-4 py-3'>Status</th>
              <th className='text-left text-xs font-medium text-muted-foreground px-4 py-3'>Date</th>
              <th className='text-left text-xs font-medium text-muted-foreground px-4 py-3'>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={7} className='px-4 py-12 text-center text-sm text-muted-foreground'>
                <CreditCard className='h-8 w-8 mx-auto mb-2' />
                No transactions yet.
              </td>
            </tr>
          </tbody>
        </table>
      </Card>
    </div>
  );
}
