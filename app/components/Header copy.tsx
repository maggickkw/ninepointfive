import React from 'react';
import { Heart } from 'lucide-react';

interface Product {
  id: string;
  title: string;
  handle: string;
  featuredImage: {
    url: string;
    altText?: string;
  };
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  compareAtPriceRange?: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  discountPercentage?: number;
}

interface ProductItemProps {
  product: Product;
  loading?: 'eager' | 'lazy';
}

export function ProductItem({ product, loading = 'lazy' }: ProductItemProps) {
  const image = product.featuredImage;
  const currentPrice = product.priceRange.minVariantPrice;
  const compareAtPrice = product.compareAtPriceRange?.minVariantPrice;
  const discountPercentage = product.discountPercentage;

  const formatPrice = (amount: string, currencyCode: string) => {
    return `${currencyCode}${parseFloat(amount).toFixed(2)}`;
  };

  return (
    <div className="relative group cursor-pointer">
      {/* Product Card with transparent background */}
      <div className="overflow-hidden">
        {/* Image Container - fully rounded */}
        <div className="relative aspect-[4/5] bg-gray-100 rounded-2xl overflow-hidden mb-4">
          {image && (
            <img
              src={image.url}
              alt={image.altText || product.title}
              loading={loading}
              className="w-full h-full object-cover"
            />
          )}

          {/* Heart Icon */}
          <button className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors duration-200">
            <Heart className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Product Info */}
        <div className="space-y-2">
          <h4 className="font-semibold text-gray-900 text-lg">
            {product.title}
          </h4>

          {/* Pricing and Discount Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-gray-600 font-medium">
                {formatPrice(currentPrice.amount, currentPrice.currencyCode)}
              </span>
              {compareAtPrice && (
                <span className="text-red-400 font-medium line-through text-sm">
                  {formatPrice(compareAtPrice.amount, compareAtPrice.currencyCode)}
                </span>
              )}
            </div>

            {/* Discount Badge at bottom right */}
            {discountPercentage && (
              <div className="bg-red-100 text-red-600 text-xs font-semibold px-2 py-1 rounded-full">
                -{discountPercentage}%
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}