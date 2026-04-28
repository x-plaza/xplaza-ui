import { Card } from '@xplaza/ui';
import { DollarSign, ShoppingCart, Package, Star } from 'lucide-react';

const KPI_CARDS = [
  {
    label: 'Revenue',
    value: '$0.00',
    change: '+0%',
    icon: DollarSign,
  },
  {
    label: 'Orders',
    value: '0',
    change: '+0%',
    icon: ShoppingCart,
  },
  {
    label: 'Products',
    value: '0',
    change: '',
    icon: Package,
  },
  {
    label: 'Avg Rating',
    value: '—',
    change: '',
    icon: Star,
  },
];

export default function VendorDashboardPage() {
  return (
    <div>
      <h1 className='text-2xl font-bold mb-6'>Dashboard</h1>

      {/* KPI Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8'>
        {KPI_CARDS.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <Card key={kpi.label} className='p-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm text-muted-foreground'>{kpi.label}</p>
                  <p className='text-2xl font-bold mt-1'>{kpi.value}</p>
                  {kpi.change && (
                    <p className='text-xs text-green-600 mt-1'>{kpi.change}</p>
                  )}
                </div>
                <div className='h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center'>
                  <Icon className='h-5 w-5 text-primary' />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Revenue Chart Placeholder */}
      <Card className='p-6 mb-8'>
        <h2 className='font-semibold mb-4'>Revenue Overview</h2>
        <div className='h-64 flex items-center justify-center text-muted-foreground text-sm border rounded-lg'>
          Revenue chart will render here with Recharts when data is available
        </div>
      </Card>

      {/* Recent Orders */}
      <Card className='p-6'>
        <h2 className='font-semibold mb-4'>Recent Orders</h2>
        <div className='text-center py-8 text-sm text-muted-foreground'>
          No orders yet. Once customers place orders, they'll appear here.
        </div>
      </Card>
    </div>
  );
}
