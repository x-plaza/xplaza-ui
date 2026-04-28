'use client';

import { Card } from '@xplaza/ui';
import { Warehouse, AlertTriangle } from 'lucide-react';

export default function VendorInventoryPage() {
  return (
    <div>
      <h1 className='text-2xl font-bold mb-6'>Inventory</h1>

      {/* Alerts */}
      <Card className='p-4 mb-6 flex items-center gap-3 border-yellow-200 bg-yellow-50'>
        <AlertTriangle className='h-5 w-5 text-yellow-600 flex-shrink-0' />
        <div>
          <p className='text-sm font-medium'>Low Stock Alerts</p>
          <p className='text-xs text-muted-foreground'>
            No products with low stock.
          </p>
        </div>
      </Card>

      <Card className='overflow-hidden'>
        <table className='w-full'>
          <thead>
            <tr className='border-b bg-muted/50'>
              <th className='text-left text-xs font-medium text-muted-foreground px-4 py-3'>
                Product
              </th>
              <th className='text-left text-xs font-medium text-muted-foreground px-4 py-3'>
                SKU
              </th>
              <th className='text-left text-xs font-medium text-muted-foreground px-4 py-3'>
                In Stock
              </th>
              <th className='text-left text-xs font-medium text-muted-foreground px-4 py-3'>
                Reserved
              </th>
              <th className='text-left text-xs font-medium text-muted-foreground px-4 py-3'>
                Available
              </th>
              <th className='text-left text-xs font-medium text-muted-foreground px-4 py-3'>
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                colSpan={6}
                className='px-4 py-12 text-center text-sm text-muted-foreground'
              >
                <Warehouse className='h-8 w-8 mx-auto mb-2 text-muted-foreground' />
                No inventory data. Add products to track inventory.
              </td>
            </tr>
          </tbody>
        </table>
      </Card>
    </div>
  );
}
