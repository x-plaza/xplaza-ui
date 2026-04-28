import { Card } from '@xplaza/ui';
import { BarChart3 } from 'lucide-react';

export default function VendorAnalyticsPage() {
  return (
    <div>
      <h1 className='text-2xl font-bold mb-6'>Analytics</h1>

      {/* Summary Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8'>
        <Card className='p-6'>
          <p className='text-sm text-muted-foreground'>Total Revenue</p>
          <p className='text-2xl font-bold mt-1'>$0.00</p>
        </Card>
        <Card className='p-6'>
          <p className='text-sm text-muted-foreground'>Total Orders</p>
          <p className='text-2xl font-bold mt-1'>0</p>
        </Card>
        <Card className='p-6'>
          <p className='text-sm text-muted-foreground'>Avg Order Value</p>
          <p className='text-2xl font-bold mt-1'>$0.00</p>
        </Card>
      </div>

      {/* Revenue Chart */}
      <Card className='p-6 mb-6'>
        <h2 className='font-semibold mb-4'>Revenue Trend</h2>
        <div className='h-64 flex items-center justify-center text-muted-foreground text-sm border rounded-lg'>
          <div className='text-center'>
            <BarChart3 className='h-10 w-10 mx-auto mb-2' />
            <p>Revenue chart will render here with Recharts</p>
          </div>
        </div>
      </Card>

      {/* Top Products */}
      <Card className='p-6'>
        <h2 className='font-semibold mb-4'>Top Products</h2>
        <div className='text-center py-8 text-sm text-muted-foreground'>
          Product performance data will appear here.
        </div>
      </Card>
    </div>
  );
}
