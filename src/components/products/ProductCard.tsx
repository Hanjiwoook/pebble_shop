import Image from 'next/image';

type Product = {
  id: number;
  name: string;
  price: number;
  image_urls?: string[];
};

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const imageUrl = product.image_urls && product.image_urls[0];

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col">
      <div className="relative bg-gray-200 aspect-square w-full">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200"></div>
        )}
      </div>
      <div className="p-4 flex-grow flex flex-col">
        <div className="flex-grow">
          <h4 className="font-semibold text-lg group-hover:text-blue-600 transition-colors">{product.name}</h4>
        </div>
        <p className="text-gray-800 mt-2 text-right font-semibold">{product.price.toLocaleString()}원</p>
      </div>
    </div>
  );
}