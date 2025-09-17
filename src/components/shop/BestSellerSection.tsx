import React, { useEffect, useState } from 'react';
import ProductCard from '@/components/products/ProductCard';
import { createClient } from '@/utils/supabase/client'; // Import the Supabase client

type Product = {
  id: number;
  name: string;
  price: number;
  image_urls?: string[];
};

const BestSellerSection = () => {
  const [bestSellers, setBestSellers] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBestSellers = async () => {
      const supabase = createClient();
      try {
        // Fetch products from the 'products' table, ordered by sales count (assuming 'sales_count' column)
        // Limit to 4 for best sellers
        const { data, error } = await supabase
          .from('products')
          .select('id, name, price, image_urls')
          .order('id', { ascending: false }) // Temporary: order by id until a proper sales_count column is available
          .limit(4);

        if (error) {
          throw error;
        }
        setBestSellers(data as Product[]);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBestSellers();
  }, []);

  if (loading) {
    return <section className="mb-8"><h2 className="text-2xl font-bold mb-4">Best Sellers</h2><p>Loading best sellers...</p></section>;
  }

  if (error) {
    return <section className="mb-8"><h2 className="text-2xl font-bold mb-4">Best Sellers</h2><p>Error: {error}</p></section>;
  }

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Best Sellers</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {bestSellers.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default BestSellerSection;