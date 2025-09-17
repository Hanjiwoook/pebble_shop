import React, { useEffect, useState } from 'react';
import ProductCard from '@/components/products/ProductCard';
import { createClient } from '@/utils/supabase/client'; // Import the Supabase client

type Product = {
  id: number;
  name: string;
  price: number;
  image_urls?: string[];
};

const NewArrivalsSection = () => {
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      const supabase = createClient();
      try {
        // Fetch products from the 'products' table, ordered by creation date (assuming 'created_at' column)
        // Limit to 4 for new arrivals
        const { data, error } = await supabase
          .from('products')
          .select('id, name, price, image_urls')
          .order('created_at', { ascending: false }) // Assuming 'created_at' for new arrivals
          .limit(4);

        if (error) {
          throw error;
        }
        setNewArrivals(data as Product[]);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNewArrivals();
  }, []);

  if (loading) {
    return <section className="mb-8"><h2 className="text-2xl font-bold mb-4">New Arrivals</h2><p>Loading new arrivals...</p></section>;
  }

  if (error) {
    return <section className="mb-8"><h2 className="text-2xl font-bold mb-4">New Arrivals</h2><p>Error: {error}</p></section>;
  }

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4">New Arrivals</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {newArrivals.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default NewArrivalsSection;