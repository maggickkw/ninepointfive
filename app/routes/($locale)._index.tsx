import { type LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { Await, useLoaderData, Link, type MetaFunction } from 'react-router';
import { Suspense } from 'react';
import { Image, Money } from '@shopify/hydrogen';
import type {
  FeaturedCollectionFragment,
  RecommendedProductsQuery,
} from 'storefrontapi.generated';
import { ProductItem } from '~/components/ProductItem';
import heroimage from '~/assets/images/heroimage.png';
import { ArrowBigRight, ArrowRight, ArrowUpRight } from 'lucide-react';
import Marquee from 'react-fast-marquee';
// Removed: import { data } from 'react-router';

export const meta: MetaFunction = () => {
  return [{ title: 'NinePointFive - Home' }];
};

export async function loader(args: LoaderFunctionArgs) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return { ...deferredData, ...criticalData };
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */

async function loadCriticalData({ context }: LoaderFunctionArgs) {
  const [{ collections }] = await Promise.all([
    context.storefront.query(FEATURED_COLLECTION_QUERY),
    // Add other queries here, so that they are loaded in parallel
  ]);

  return {
    featuredCollection: collections.nodes[0],
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({ context }: LoaderFunctionArgs) {
  const recommendedProducts = context.storefront
    .query(RECOMMENDED_PRODUCTS_QUERY)
    .catch((error) => {
      // Log query errors, but don't throw them so the page can still render
      console.error(error);
      return null;
    });

  return {
    recommendedProducts,
  };
}

/* Removed duplicate Homepage function to resolve redeclaration and duplicate implementation errors */

function FeaturedCollection({
  collection,
}: {
  collection: FeaturedCollectionFragment;
}) {
  if (!collection) return null;
  const image = collection?.image;
  return (
    <Link
      className="featured-collection"
      to={`/collections/${collection.handle}`}
    >
      {image && (
        <div className="featured-collection-image">
          <Image data={image} sizes="100vw" />
        </div>
      )}
      <h1>{collection.title}</h1>
    </Link>
  );
}
// The following JSX was outside of any component and could not access loaderData.
// Move this content inside the Homepage component, after the initial featured collection and recommended products.

export default function Homepage() {
  const loaderData = useLoaderData<typeof loader>();
  return (
    <div className="">
      <FeaturedCollection collection={loaderData.featuredCollection} />
      <RecommendedProducts products={loaderData.recommendedProducts} />

      <div className="font-clash ">
        <div className="text-center pt-5 flex flex-col items-center">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            <span className="text-[#68615A]">Elevate Your Style </span>
            <span className="text-[#CECCCA]">With</span>
            <br />
            <span className="text-[#CECCCA] ml-4">Bold Fashion</span>
          </h1>

          <img
            src={heroimage}
            alt="Hero"
            className="w-auto h-1/2 mb-16 -mt-20 -mr-20"
          />

          <button className="bg-[#2B2117] -mt-20 text-white px-14 py-4 rounded-2xl flex items-center gap-3 hover:bg-black transition-all duration-300 hover:scale-105 shadow-lg cursor-pointer">
            <span className="font-medium">Explore Collection</span>
            <ArrowUpRight className="w-6 h-6" />
          </button>
        </div>
        <div className="bg-white h-14 mt-10 flex items-center overflow-hidden relative">
          {/* <Marquee>
                <span>
                  30% off &nbsp; • &nbsp; 30% off &nbsp; • &nbsp; 30% off &nbsp; • &nbsp; 30% off &nbsp; • &nbsp; 30% off
                </span>
                <span aria-hidden="true">
                  30% off &nbsp; • &nbsp; 30% off &nbsp; • &nbsp; 30% off &nbsp; • &nbsp; 30% off &nbsp; • &nbsp; 30% off
                </span>
              </Marquee> */}

        </div>

        <div className="text-left mt-10 mb-5 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className='flex items-center justify-between'>
            <h2 className="text-3xl font-bold text-[#68615A]">New Arrivals</h2>
            <button className="text-[#68615A] text-sm font-medium flex items-center gap-2 px-6 py-2 rounded-2xl hover:text-black transition-all duration-300 hover:scale-105 cursor-pointer">
              View All
              <div className='bg-black rounded-full p-2 flex items-center justify-center transition-all duration-300'>
                <ArrowUpRight className="w-5 h-5 text-white" />
              </div>
            </button>
          </div>
        </div>

        <div className="text-left mt-10 mb-5 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RecommendedProducts products={loaderData.recommendedProducts} />
        </div>

        <div className="text-left mt-10 mb-5 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className='flex items-center justify-between'>
            <h2 className="text-3xl font-bold text-[#68615A]">New Arrivals</h2>
            <button className="text-[#68615A] text-sm font-medium flex items-center gap-2 px-6 py-2 rounded-2xl hover:text-black transition-all duration-300 hover:scale-105 cursor-pointer">
              View All
              <div className='bg-black rounded-full p-2 flex items-center justify-center transition-all duration-300'>
                <ArrowUpRight className="w-5 h-5 text-white" />
              </div>
            </button>
          </div>
        </div>

        {/* Remove the following block as 'data' is not defined, or replace 'data' with 'loaderData' */}
        {/* <div className="text-left mt-10 mb-5 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RecommendedProducts products={data.recommendedProducts} />
        </div> */}

        <div className="text-center mt-10 mb-5 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-row items-center justify-center gap-3">
          <h2 className="text-3xl font-bold text-[#68615A]">About</h2>
          <h2 className="text-3xl font-bold text-[#CECCCA]">NinePointFive</h2>
        </div>

        <div className='bg-[#E6ECE5]'>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <p className="text-lg text-[#68615A]">
              NinePointFive is a fashion brand that embodies the essence of modern elegance and timeless style. Our collection features meticulously crafted pieces that seamlessly blend contemporary design with classic influences. From luxurious fabrics to intricate details, each item is a testament to our commitment to quality and sophistication. Explore our range of clothing and accessories that redefine fashion standards, offering you a unique expression of individuality and grace.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


function RecommendedProducts({
  products,
}: {
  products: Promise<RecommendedProductsQuery | null>;
}) {
  return (
    <div className="recommended-products">
      <h2>Recommended Products</h2>
      <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={products}>
          {(response) => (
            <div className="recommended-products-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {response
                ? response.products.nodes.map((product) => (
                  <ProductItem key={product.id} product={product} />
                ))
                : null}
            </div>
          )}
        </Await>
      </Suspense>
      <br />
    </div>
  );
}

const FEATURED_COLLECTION_QUERY = `#graphql
        fragment FeaturedCollection on Collection {
          id
    title
        image {
          id
      url
        altText
        width
        height
    }
        handle
  }
        query FeaturedCollection($country: CountryCode, $language: LanguageCode)
        @inContext(country: $country, language: $language) {
          collections(first: 1, sortKey: UPDATED_AT, reverse: true) {
          nodes {
          ...FeaturedCollection
        }
    }
  }
        ` as const;

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
        fragment RecommendedProduct on Product {
          id
    title
        handle
        priceRange {
          minVariantPrice {
          amount
        currencyCode
      }
    }
        featuredImage {
          id
      url
        altText
        width
        height
    }
  }
        query RecommendedProducts ($country: CountryCode, $language: LanguageCode)
        @inContext(country: $country, language: $language) {
          products(first: 4, sortKey: UPDATED_AT, reverse: true) {
          nodes {
          ...RecommendedProduct
        }
    }
  }
        ` as const;
