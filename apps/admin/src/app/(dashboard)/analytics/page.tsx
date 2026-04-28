import { Card } from '@xplaza/ui';
import { BarChart3 } from 'lucide-react';

export default function AdminAnalyticsPage() {
  return (
    <div>
      <h1 className='text-2xl font-bold mb-6'>Analytics</h1>

      <div className='grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8'>
        <Card className='p-6'>
          <p className='text-sm text-muted-foreground'>Total Revenue</p>
          <p className='text-2xl font-bold mt-1'>$0.00</p>
        </Card>
        <Card className='p-6'>
          <p className='text-sm text-muted-foreground'>Total Orders</p>
          <p className='text-2xl font-bold mt-1'>0</p>
        </Card>
        <Card className='p-6'>
          <p className='text-sm text-muted-foreground'>New Customers</p>
          <p className='text-2xl font-bold mt-1'>0</p>
        </Card>
        <Card className='p-6'>
          <p className='text-sm text-muted-foreground'>Conversion Rate</p>
          <p className='text-2xl font-bold mt-1'>0%</p>
        </Card>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <Card className='p-6'>
          <h2 className='font-semibold mb-4'>Revenue Trend</h2>
          <div className='h-48 flex items-center justify-center text-muted-foreground text-sm border rounded-lg'>
            <BarChart3 className='h-8 w-8' />
          </div>
        </Card>
        <Card className='p-6'>
          <h2 className='font-semibold mb-4'>Top Products</h2>
          <div className='text-center py-8 text-sm text-muted-foreground'>
            No data available yet.
          </div>
        </Card>
        <Card className='p-6'>
          <h2 className='font-semibold mb-4'>Top Customers</h2>
          <div className='text-center py-8 text-sm text-muted-foreground'>
            No data available yet.
          </div>
        </Card>
        <Card className='p-6'>
          <h2 className='font-semibold mb-4'>Orders by Status</h2>
          <div className='text-center py-8 text-sm text-muted-foreground'>
            No data available yet.
          </div>
        </Card>
      </div>
    </div>
  );
}
