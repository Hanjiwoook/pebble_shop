import Image from 'next/image';

type Product = {
  id: number;
  name: string;
  price: number;
  image_urls?: string[]; // image_url -> image_urls 배열로 수정
  // 데이터베이스 `products` 테이블의 다른 컬럼들을 여기에 추가할 수 있습니다.
};

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  // 이미지 URL이 배열에 있고, 첫 번째 항목이 존재하는지 확인
  const imageUrl = product.image_urls && product.image_urls[0];

  return (
    <div className="border rounded-lg p-4 flex flex-col">
      <div className="relative bg-gray-200 aspect-square w-full mb-4 overflow-hidden rounded-md">
        {imageUrl ? (
          <Image
            src={imageUrl} // 배열의 첫 번째 이미지 주소를 사용
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-300 hover:scale-105"
            priority
          />
        ) : (
          <div className="w-full h-full bg-gray-200"></div>
        )}
      </div>
      <div className="flex-grow">
        <h4 className="font-semibold text-lg">{product.name}</h4>
      </div>
      <p className="text-gray-700">{product.price.toLocaleString()}원</p>
    </div>
  );
}