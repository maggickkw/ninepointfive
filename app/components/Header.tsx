<<<<<<< Updated upstream
import {Suspense} from 'react';
import {Await, NavLink, useAsyncValue} from 'react-router';
=======
import { Suspense } from 'react';
import { Await, NavLink, useAsyncValue } from 'react-router';
>>>>>>> Stashed changes
import {
  type CartViewPayload,
  useAnalytics,
  useOptimisticCart,
} from '@shopify/hydrogen';
<<<<<<< Updated upstream
import type {HeaderQuery, CartApiQueryFragment} from 'storefrontapi.generated';
import {useAside} from '~/components/Aside';
=======
import type { HeaderQuery, CartApiQueryFragment } from 'storefrontapi.generated';
import { useAside } from '~/components/Aside';
import logo from '~/assets/logo.png';
import { Heart, Menu, Search, ShoppingBag, User, X } from 'lucide-react';
>>>>>>> Stashed changes

interface HeaderProps {
  header: HeaderQuery;
  cart: Promise<CartApiQueryFragment | null>;
  isLoggedIn: Promise<boolean>;
  publicStoreDomain: string;
}

type Viewport = 'desktop' | 'mobile';

export function Header({
  header,
  isLoggedIn,
  cart,
  publicStoreDomain,
}: HeaderProps) {
<<<<<<< Updated upstream
  const {shop, menu} = header;
  return (
    <header className="header">
      <NavLink prefetch="intent" to="/" style={activeLinkStyle} end>
        <strong>{shop.name}</strong>
      </NavLink>
      <HeaderMenu
        menu={menu}
        viewport="desktop"
        primaryDomainUrl={header.shop.primaryDomain.url}
        publicStoreDomain={publicStoreDomain}
      />
      <HeaderCtas isLoggedIn={isLoggedIn} cart={cart} />
=======
  const { shop, menu } = header;
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <NavLink prefetch="intent" to="/" style={activeLinkStyle} end>
              <img src={logo} alt={shop.name} className="h-8 w-auto" />
            </NavLink>
          </div>


          <HeaderMenu
            menu={menu}
            viewport="desktop"
            primaryDomainUrl={header.shop.primaryDomain.url}
            publicStoreDomain={publicStoreDomain}
          />

          <HeaderCtas isLoggedIn={isLoggedIn} cart={cart} />
        </div>
      </div>

>>>>>>> Stashed changes
    </header>
  );
}

export function HeaderMenu({
  menu,
  primaryDomainUrl,
  viewport,
  publicStoreDomain,
}: {
  menu: HeaderProps['header']['menu'];
  primaryDomainUrl: HeaderProps['header']['shop']['primaryDomain']['url'];
  viewport: Viewport;
  publicStoreDomain: HeaderProps['publicStoreDomain'];
}) {
<<<<<<< Updated upstream
  const className = `header-menu-${viewport}`;
  const {close} = useAside();
=======
  const className = `hidden md:flex absolute left-1/2 transform -translate-x-1/2`;
  const { close } = useAside();
>>>>>>> Stashed changes

  return (
    <nav className={className} role="navigation">
      {viewport === 'mobile' && (
        <NavLink
          end
          onClick={close}
          prefetch="intent"
          style={activeLinkStyle}
          to="/"
        >
          Home
        </NavLink>
      )}
      {(menu || FALLBACK_HEADER_MENU).items.map((item) => {
        if (!item.url) return null;

        // if the url is internal, we strip the domain
        const url =
          item.url.includes('myshopify.com') ||
<<<<<<< Updated upstream
          item.url.includes(publicStoreDomain) ||
          item.url.includes(primaryDomainUrl)
=======
            item.url.includes(publicStoreDomain) ||
            item.url.includes(primaryDomainUrl)
>>>>>>> Stashed changes
            ? new URL(item.url).pathname
            : item.url;
        return (
          <NavLink
<<<<<<< Updated upstream
            className="header-menu-item"
=======
            className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors duration-200 relative group"
>>>>>>> Stashed changes
            end
            key={item.id}
            onClick={close}
            prefetch="intent"
            style={activeLinkStyle}
            to={url}
          >
            {item.title}
          </NavLink>
        );
      })}
    </nav>
  );
}

function HeaderCtas({
  isLoggedIn,
  cart,
}: Pick<HeaderProps, 'isLoggedIn' | 'cart'>) {
  return (
<<<<<<< Updated upstream
    <nav className="header-ctas" role="navigation">
      <HeaderMenuMobileToggle />
      <NavLink prefetch="intent" to="/account" style={activeLinkStyle}>
        <Suspense fallback="Sign in">
          <Await resolve={isLoggedIn} errorElement="Sign in">
            {(isLoggedIn) => (isLoggedIn ? 'Account' : 'Sign in')}
          </Await>
        </Suspense>
      </NavLink>
      <SearchToggle />
      <CartToggle cart={cart} />
=======
    <nav className="flex flex-row" role="navigation">
      <div className='hidden md:flex items-center space-x-1'>
        <SearchToggle />
        <NavLink prefetch="intent" to="/account" style={activeLinkStyle}>
          <Suspense fallback="Sign in">
            <Await resolve={isLoggedIn} errorElement="Sign in">
              {(isLoggedIn) => (isLoggedIn ? <button
                className="p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-200"
                aria-label="Account"
              >
                <User className="w-5 h-5" />
              </button> : <button
                className="p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-200"
                aria-label="Account"
              >
                <User className="w-5 h-5" />
              </button>)}
            </Await>
          </Suspense>
        </NavLink>
        <FavoritesButton />
        <CartToggle cart={cart} />
      </div>





      <div className='flex md:hidden'><HeaderMenuMobileToggle /></div>
>>>>>>> Stashed changes
    </nav>
  );
}

<<<<<<< Updated upstream
function HeaderMenuMobileToggle() {
  const {open} = useAside();
  return (
    <button
      className="header-menu-mobile-toggle reset"
      onClick={() => open('mobile')}
    >
      <h3>☰</h3>
=======
import { useState } from 'react';

function HeaderMenuMobileToggle() {
  const { open } = useAside();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleToggle = () => {
    setIsMobileMenuOpen((prev) => !prev);
    open('mobile');
  };

  return (
    <button
      className=""
      onClick={handleToggle}
    >
      {isMobileMenuOpen ? (
        <X className="w-5 h-5" />
      ) : (
        <Menu className="w-7 h-7" />
      )}
    </button>
  );
}

function FavoritesButton() {
  return (
    <button
      className="p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-200"
      aria-label="Favorites"
    >
      <Heart className="w-5 h-5" />
>>>>>>> Stashed changes
    </button>
  );
}

function SearchToggle() {
<<<<<<< Updated upstream
  const {open} = useAside();
  return (
    <button className="reset" onClick={() => open('search')}>
      Search
    </button>
  );
}

function CartBadge({count}: {count: number | null}) {
  const {open} = useAside();
  const {publish, shop, cart, prevCart} = useAnalytics();

  return (
    <a
      href="/cart"
      onClick={(e) => {
=======
  const { open } = useAside();
  return (
    <button
      className="p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-200"
      aria-label="Search" onClick={() => open('search')}
    >
      <Search className="w-5 h-5" />
    </button>

  );
}

function CartBadge({ count }: { count: number | null }) {
  const { open } = useAside();
  const { publish, shop, cart, prevCart } = useAnalytics();
  return (
    <button
      className="p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-200 relative" onClick={(e) => {
>>>>>>> Stashed changes
        e.preventDefault();
        open('cart');
        publish('cart_viewed', {
          cart,
          prevCart,
          shop,
          url: window.location.href || '',
        } as CartViewPayload);
      }}
<<<<<<< Updated upstream
    >
      Cart {count === null ? <span>&nbsp;</span> : count}
    </a>
  );
}

function CartToggle({cart}: Pick<HeaderProps, 'cart'>) {
=======
      aria-label="Shopping cart"
    >
      <ShoppingBag className="w-5 h-5" />
      <span className="absolute -top-1 -right-1 bg-gray-900 text-white text-xs font-medium min-w-[18px] h-[18px] rounded-full flex items-center justify-center px-1 animate-pulse">
        {count === null ? <span>&nbsp;</span> : count}
      </span>
    </button>
  );
}

function CartToggle({ cart }: Pick<HeaderProps, 'cart'>) {
>>>>>>> Stashed changes
  return (
    <Suspense fallback={<CartBadge count={null} />}>
      <Await resolve={cart}>
        <CartBanner />
      </Await>
    </Suspense>
  );
}

function CartBanner() {
  const originalCart = useAsyncValue() as CartApiQueryFragment | null;
  const cart = useOptimisticCart(originalCart);
  return <CartBadge count={cart?.totalQuantity ?? 0} />;
}

const FALLBACK_HEADER_MENU = {
  id: 'gid://shopify/Menu/199655587896',
  items: [
    {
      id: 'gid://shopify/MenuItem/461609500728',
      resourceId: null,
      tags: [],
      title: 'Collections',
      type: 'HTTP',
      url: '/collections',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609533496',
      resourceId: null,
      tags: [],
      title: 'Blog',
      type: 'HTTP',
      url: '/blogs/journal',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609566264',
      resourceId: null,
      tags: [],
      title: 'Policies',
      type: 'HTTP',
      url: '/policies',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609599032',
      resourceId: 'gid://shopify/Page/92591030328',
      tags: [],
      title: 'About',
      type: 'PAGE',
      url: '/pages/about',
      items: [],
    },
  ],
};

function activeLinkStyle({
  isActive,
  isPending,
}: {
  isActive: boolean;
  isPending: boolean;
}) {
  return {
<<<<<<< Updated upstream
    fontWeight: isActive ? 'bold' : undefined,
    color: isPending ? 'grey' : 'black',
=======
    fontWeight: isActive ? 'bold' : 'normal',
    color: !isActive ? '#6C6C6C' : 'black',
>>>>>>> Stashed changes
  };
}
