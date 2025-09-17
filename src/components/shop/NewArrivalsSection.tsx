import React from 'react';
import ProductCard from '@/components/products/ProductCard';

type Product = {
  id: number;
  name: string;
  price: number;
  image_urls?: string[];
};

const mockNewArrivals: Product[] = [
  { id: 1, name: 'Stylish Summer Dress', price: 75000, image_urls: ['https://picsum.photos/seed/new1/300/300'] },
  { id: 2, name: 'Comfortable Sneakers', price: 120000, image_urls: ['https://picsum.photos/seed/new2/300/300'] },
  { id: 3, name: 'Elegant Handbag', price: 150000, image_urls: ['https://picsum.photos/seed/new3/300/300'] },
  { id: 4, name: 'Classic Denim Jacket', price: 90000, image_urls: ['https://picsum.photos/seed/new4/300/300'] },
];

const NewArrivalsSection = () => {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4">New Arrivals</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {mockNewArrivals.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default NewArrivalsSection;