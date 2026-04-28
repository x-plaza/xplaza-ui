import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { ProductGrid } from '@/components/product/product-grid';
import { StarRating } from '@/components/product/star-rating';
import { Badge } from '@xplaza/ui';
import { apiClient } from '@/lib/api';
import type { Product } from '@xplaza/types';

interface ShopPageProps {
  params: Promise<{ slug: string }>;
}

async function getShop(slug: string) {
  try {
    return await apiClient.get<{
      id: number;
      name: string;
      slug: string;
      description?: string;
      logoUrl?: string;
      averageRating?: number;
      productCount?: number;
    }>(`/shops/slug/${slug}`);
  } catch {
    return null;
  }
}

async function getShopProducts(shopId: number) {
  try {
    const response = await apiClient.get<{ content: Product[] }>(
      '/products',
      { params: { shopId, size: 20 } }
    );
    return response.data?.content ?? [];
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: ShopPageProps): Promise<Metadata> {
  const { slug } = await params;
  const response = await getShop(slug);
  const shop = response?.data;
  if (!shop) return { title: 'Shop Not Found' };

  return {
    title: shop.name,
    description: shop.description ?? `Shop products from ${shop.name} on X-Plaza.`,
  };
}

export default async function ShopPage({ params }: ShopPageProps) {
  const { slug } = await params;
  const response = await getShop(slug);
  const shop = response?.data;

  if (!shop) notFound();

  const products = await getShopProducts(shop.id);

  const breadcrumbs = [
    { label: 'Shops' },
    { label: shop.name },
  ];

  return (
    <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8'>
      <Breadcrumbs items={breadcrumbs} />

      {/* Shop header */}
      <div className='mt-6 mb-10 flex items-start gap-6'>
        {shop.logoUrl ? (
          <img
            src={shop.logoUrl}
            alt={shop.name}
            className='w-20 h-20 object-cover border'
          />
        ) : (
          <div className='w-20 h-20 bg-muted flex items-center justify-center text-2xl font-bold text-muted-foreground'>
            {shop.name.charAt(0)}
          </div>
        )}
        <div>
          <h1 className='text-2xl font-bold'>{shop.name}</h1>
          {shop.description && (
            <p className='text-muted-foreground mt-1 max-w-xl'>
              {shop.description}
            </p>
          )}
          <div className='flex items-center gap-4 mt-2'>
            {shop.averageRating != null && shop.averageRating > 0 && (
              <div className='flex items-center gap-1'>
                <StarRating rating={shop.averageRating} size='sm' />
                <span className='text-sm text-muted-foreground'>
                  {shop.averageRating.toFixed(1)}
                </span>
              </div>
            )}
            {shop.productCount != null && (
              <Badge variant='secondary'>
                {shop.productCount} products
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Products */}
      <h2 className='text-xl font-semibold mb-4'>Products</h2>
      {products.length > 0 ? (
        <ProductGrid products={products} />
      ) : (
        <p className='text-muted-foreground py-12 text-center'>
          This shop has no products yet.
        </p>
      )}
    </div>
  );
}
