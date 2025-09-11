import { createClient } from "@/utils/supabase/server";
import ProductCard from "@/components/products/ProductCard";

export default async function Home() {
  // Debugging: Log environment variables on the server
  console.log("Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
  console.log("Supabase Anon Key:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  const supabase = createClient();
  const { data: products, error } = await supabase.from("products").select("*");

  if (error) {
    console.error("Error fetching products:", JSON.stringify(error, null, 2));
  } else {
    console.log("Successfully fetched products:", products);
  }

  return (
    <div>
      <section className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">"펭귄에게 완벽한 조약돌을 찾아주듯,"</h2>
        <p className="text-lg text-gray-600">당신의 남자친구를 위한 최고의 '남친룩/캐주얼룩'을 제안합니다.</p>
      </section>

      <section>
        <h3 className="text-2xl font-semibold mb-6">BEST SELLERS</h3>
        
        {error && (
          <p className="text-center text-red-500">
            상품을 불러오는 중 오류가 발생했습니다.
          </p>
        )}

        {!error && (!products || products.length === 0) && (
          <p className="text-center text-gray-500">
            등록된 상품이 없습니다.
          </p>
        )}

        {products && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              // @ts-ignore
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}