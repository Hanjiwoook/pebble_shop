import NewArrivalsSection from '@/components/shop/NewArrivalsSection';
import BestSellerSection from '@/components/shop/BestSellerSection';
import ReviewSection from '@/components/shop/ReviewSection';

export default function ShopPage() {
  return (
    <div className="pt-16">
      <div className="container mx-auto px-4 py-8">
        <NewArrivalsSection />
        <BestSellerSection />
        <ReviewSection />
      </div>
    </div>
  );
}