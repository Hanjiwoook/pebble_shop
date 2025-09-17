import React from 'react';
import ProductCard from '@/components/products/ProductCard';

type Product = {
  id: number;
  name: string;
  price: number;
  image_urls?: string[];
};

const mockBestSellers: Product[] = [
  { id: 5, name: 'Premium Leather Wallet', price: 80000, image_urls: ['https://picsum.photos/seed/best1/300/300'] },
  { id: 6, name: 'Wireless Earbuds', price: 110000, image_urls: ['https://picsum.photos/seed/best2/300/300'] },
  { id: 7, name: 'Smartwatch Pro', price: 250000, image_urls: ['https://picsum.photos/seed/best3/300/300'] },
  { id: 8, name: 'Portable Bluetooth Speaker', price: 60000, image_urls: ['https://picsum.photos/seed/best4/300/300'] },
];

const BestSellerSection = () => {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Best Sellers</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {mockBestSellers.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default BestSellerSection;