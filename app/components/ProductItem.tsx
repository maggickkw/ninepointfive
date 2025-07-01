<<<<<<< Updated upstream
import {Link} from 'react-router';
import {Image, Money} from '@shopify/hydrogen';
=======
import { Link } from 'react-router';
import { Image, Money } from '@shopify/hydrogen';
>>>>>>> Stashed changes
import type {
  ProductItemFragment,
  CollectionItemFragment,
  RecommendedProductFragment,
} from 'storefrontapi.generated';
<<<<<<< Updated upstream
import {useVariantUrl} from '~/lib/variants';
=======
import { useVariantUrl } from '~/lib/variants';
import { Heart } from 'lucide-react';
>>>>>>> Stashed changes

export function ProductItem({
  product,
  loading,
}: {
  product:
<<<<<<< Updated upstream
    | CollectionItemFragment
    | ProductItemFragment
    | RecommendedProductFragment;
=======
  | CollectionItemFragment
  | ProductItemFragment
  | RecommendedProductFragment;
>>>>>>> Stashed changes
  loading?: 'eager' | 'lazy';
}) {
  const variantUrl = useVariantUrl(product.handle);
  const image = product.featuredImage;
  return (
    <Link
<<<<<<< Updated upstream
      className="product-item"
=======
      className="relative group cursor-pointer"
>>>>>>> Stashed changes
      key={product.id}
      prefetch="intent"
      to={variantUrl}
    >
<<<<<<< Updated upstream
      {image && (
        <Image
          alt={image.altText || product.title}
          aspectRatio="1/1"
          data={image}
          loading={loading}
          sizes="(min-width: 45em) 400px, 100vw"
        />
      )}
      <h4>{product.title}</h4>
      <small>
        <Money data={product.priceRange.minVariantPrice} />
      </small>
=======
      <div className="overflow-hidden">
        <div className="relative aspect-[4/5] bg-gray-100 rounded-2xl overflow-hidden mb-4">
          {image && (
            <Image
              className='w-full h-full object-contain'
              alt={image.altText || product.title}
              data={image}
              loading={loading}
            />
          )}
          <button className="absolute top-4 right-4 p-2 bg-black/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors duration-200">
            <Heart className="w-5 h-5 text-white" />
          </button>

        </div>
        <div className="space-y-2">
          <h4 className="font-semibold text-gray-900 text-lg">
            {product.title}
          </h4>

          <small>
            <Money data={product.priceRange.minVariantPrice} />
          </small>



        </div>


      </div>

>>>>>>> Stashed changes
    </Link>
  );
}
