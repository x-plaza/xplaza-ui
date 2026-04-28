import { Card } from '@xplaza/ui';
import { DollarSign, ShoppingCart, Users, Store, Package, Star } from 'lucide-react';

const KPI_CARDS = [
  { label: 'Total Revenue', value: '$0.00', icon: DollarSign },
  { label: 'Total Orders', value: '0', icon: ShoppingCart },
  { label: 'Customers', value: '0', icon: Users },
  { label: 'Active Shops', value: '0', icon: Store },
  { label: 'Products', value: '0', icon: Package },
  { label: 'Avg Rating', value: '—', icon: Star },
];

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className='text-2xl font-bold mb-6'>Platform Dashboard</h1>

      <div className='grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8'>
        {KPI_CARDS.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <Card key={kpi.label} className='p-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm text-muted-foreground'>{kpi.label}</p>
                  <p className='text-2xl font-bold mt-1'>{kpi.value}</p>
                </div>
                <div className='h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center'>
                  <Icon className='h-5 w-5 text-primary' />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <Card className='p-6'>
          <h2 className='font-semibold mb-4'>Revenue Overview</h2>
          <div className='h-48 flex items-center justify-center text-muted-foreground text-sm border rounded-lg'>
            Revenue chart renders here
          </div>
        </Card>
        <Card className='p-6'>
          <h2 className='font-semibold mb-4'>Recent Orders</h2>
          <div className='text-center py-8 text-sm text-muted-foreground'>
            No orders yet.
          </div>
        </Card>
      </div>
    </div>
  );
}
