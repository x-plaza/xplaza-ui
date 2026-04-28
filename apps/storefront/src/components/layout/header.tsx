'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Search,
  ShoppingBag,
  User,
  Menu,
  X,
  Heart,
} from 'lucide-react';
import { MegaMenu } from './mega-menu';
import type { Category } from '@xplaza/types';
import { useCartStore } from '@/stores/cart-store';
import { useCart } from '@/hooks/use-cart';
import { getAutocomplete, getCategories } from '@/lib/queries';

const NAV_ITEMS = [
  { key: 'women', href: '/products?gender=women', label: 'Women' },
  { key: 'men', href: '/products?gender=men', label: 'Men' },
  { key: 'kids', href: '/products?gender=kids', label: 'Kids' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [activeNav, setActiveNav] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [promoClosed, setPromoClosed] = useState(false);
  const [suggestions, setSuggestions] = useState<Array<{ text: string; type: string; id?: number; slug?: string }>>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const navTimeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const router = useRouter();
  const { open: openCartDrawer } = useCartStore();
  const { itemCount } = useCart();

  // Fetch categories for mega menu
  useEffect(() => {
    getCategories({ size: 24 })
      .then((res) => setCategories(res.data ?? []))
      .catch(() => {});
  }, []);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setSearchFocused(false);
      setSuggestions([]);
      searchInputRef.current?.blur();
    }
  }

  function handleSearchInput(value: string) {
    setSearchQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (value.trim().length >= 2) {
      debounceRef.current = setTimeout(async () => {
        try {
          const res = await getAutocomplete(value.trim(), 6);
          setSuggestions(res.data?.suggestions ?? []);
        } catch {
          setSuggestions([]);
        }
      }, 250);
    } else {
      setSuggestions([]);
    }
  }

  function handleSuggestionClick(suggestion: { text: string; type: string; id?: number; slug?: string }) {
    if (suggestion.type === 'product' && suggestion.id) {
      router.push(`/products/${suggestion.id}`);
    } else if (suggestion.type === 'brand' && suggestion.id) {
      router.push(`/products?brandId=${suggestion.id}`);
    } else if (suggestion.type === 'category' && suggestion.id) {
      router.push(`/products?categoryId=${suggestion.id}`);
    } else {
      router.push(`/search?q=${encodeURIComponent(suggestion.text)}`);
    }
    setSearchQuery('');
    setSearchFocused(false);
    setSuggestions([]);
  }

  const handleNavEnter = useCallback((key: string) => {
    if (navTimeoutRef.current) clearTimeout(navTimeoutRef.current);
    setActiveNav(key);
  }, []);

  const handleNavLeave = useCallback(() => {
    navTimeoutRef.current = setTimeout(() => setActiveNav(null), 150);
  }, []);

  // Close search dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        setSearchFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <header className='sticky top-0 z-50 w-full bg-background'>
      {/* Promo strip */}
      {!promoClosed && (
        <div className='bg-foreground text-background text-center text-[13px] py-2 px-4 relative'>
          <Link href='/products' className='hover:underline'>
            Free delivery on orders over $50* &amp; free 30-day returns
          </Link>
          <button
            className='absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:opacity-60 transition-opacity'
            onClick={() => setPromoClosed(true)}
            aria-label='Close promotional banner'
          >
            <X className='h-3.5 w-3.5 text-background' />
          </button>
        </div>
      )}

      {/* Main header */}
      <div className='border-b'>
        <div className='mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10'>
          <div className='flex h-14 items-center'>
            {/* Mobile menu */}
            <button
              className='lg:hidden p-2 -ml-2 hover:opacity-60 transition-opacity'
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label='Toggle menu'
            >
              {mobileMenuOpen ? (
                <X className='h-6 w-6' />
              ) : (
                <Menu className='h-6 w-6' />
              )}
            </button>

            {/* Logo */}
            <Link href='/' className='mr-8 shrink-0'>
              <span className='text-[22px] font-black tracking-tight text-foreground uppercase'>
                X-PLAZA
              </span>
            </Link>

            {/* Desktop Nav with mega menu */}
            <nav className='hidden lg:flex items-center gap-0 mr-4 relative'>
              {NAV_ITEMS.map((item) => (
                <div
                  key={item.key}
                  onMouseEnter={() => handleNavEnter(item.key)}
                  onMouseLeave={handleNavLeave}
                >
                  <Link
                    href={item.href}
                    className={`px-4 py-4 text-[13px] font-semibold uppercase tracking-wide border-b-2 transition-colors inline-flex items-center gap-1 ${
                      activeNav === item.key
                        ? 'border-foreground'
                        : 'border-transparent hover:border-foreground'
                    } text-foreground`}
                  >
                    {item.label}
                  </Link>
                </div>
              ))}
              <Link
                href='/brands'
                className='px-4 py-4 text-[13px] font-semibold uppercase tracking-wide border-b-2 border-transparent hover:border-foreground transition-colors text-foreground'
              >
                Brands
              </Link>
              <Link
                href='/products?sale=true'
                className='px-4 py-4 text-[13px] font-semibold uppercase tracking-wide border-b-2 border-transparent hover:border-accent transition-colors text-accent'
              >
                Sale
              </Link>
            </nav>

            {/* Search */}
            <div
              className='hidden lg:flex flex-1 max-w-lg relative'
              ref={searchContainerRef}
            >
              <form onSubmit={handleSearch} className='w-full relative'>
                <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
                <input
                  ref={searchInputRef}
                  placeholder='Search'
                  value={searchQuery}
                  onChange={(e) => handleSearchInput(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  className='w-full h-10 pl-10 pr-4 bg-secondary text-sm placeholder:text-muted-foreground focus:outline-none focus:bg-background focus:ring-1 focus:ring-foreground transition-colors'
                />
              </form>

              {/* Autocomplete suggestions dropdown */}
              {searchFocused && searchQuery.trim().length >= 2 && suggestions.length > 0 && (
                <div className='absolute top-full left-0 right-0 mt-0 bg-background border border-t-0 z-50 py-2'>
                  {suggestions.map((s, i) => (
                    <button
                      key={i}
                      className='block w-full text-left px-4 py-2 text-sm hover:bg-secondary transition-colors'
                      onMouseDown={(e) => {
                        e.preventDefault();
                        handleSuggestionClick(s);
                      }}
                    >
                      <span>{s.text}</span>
                      <span className='text-[11px] text-muted-foreground ml-2 capitalize'>
                        {s.type}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {/* Empty search — trending */}
              {searchFocused && !searchQuery && (
                <div className='absolute top-full left-0 right-0 mt-0 bg-background border border-t-0 z-50 py-4'>
                  <p className='px-4 text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-2'>
                    Popular searches
                  </p>
                  {['Sneakers', 'Summer dresses', 'T-shirts', 'Jackets', 'Bags'].map((term) => (
                    <button
                      key={term}
                      className='block w-full text-left px-4 py-2 text-sm hover:bg-secondary transition-colors'
                      onMouseDown={(e) => {
                        e.preventDefault();
                        router.push(`/search?q=${encodeURIComponent(term)}`);
                        setSearchQuery('');
                        setSearchFocused(false);
                      }}
                    >
                      {term}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right actions */}
            <div className='flex items-center gap-0.5 ml-auto'>
              {/* Mobile Search */}
              <Link
                href='/search'
                className='lg:hidden p-2.5 hover:opacity-60 transition-opacity'
                aria-label='Search'
              >
                <Search className='h-5 w-5' />
              </Link>

              <Link
                href='/login'
                className='p-2.5 hover:opacity-60 transition-opacity'
                aria-label='Account'
              >
                <User className='h-5 w-5' />
              </Link>

              <Link
                href='/account/wishlists'
                className='p-2.5 hover:opacity-60 transition-opacity'
                aria-label='Wishlist'
              >
                <Heart className='h-5 w-5' />
              </Link>

              <button
                onClick={openCartDrawer}
                className='p-2.5 hover:opacity-60 transition-opacity relative'
                aria-label='Bag'
              >
                <ShoppingBag className='h-5 w-5' />
                {itemCount > 0 && (
                  <span className='absolute top-1 right-1 bg-accent text-accent-foreground text-[9px] font-bold min-w-[16px] h-4 px-1 flex items-center justify-center'>
                    {itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mega menu */}
      {activeNav && (
        <div
          onMouseEnter={() => {
            if (navTimeoutRef.current) clearTimeout(navTimeoutRef.current);
          }}
          onMouseLeave={handleNavLeave}
        >
          <MegaMenu
            categories={categories}
            activeNav={activeNav}
            onClose={() => setActiveNav(null)}
          />
        </div>
      )}

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <nav className='lg:hidden border-b bg-background'>
          <div className='px-4 pt-3 pb-2'>
            <form onSubmit={handleSearch} className='relative'>
              <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
              <input
                placeholder='Search'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='w-full h-10 pl-10 pr-4 bg-secondary text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-foreground'
              />
            </form>
          </div>
          <div className='py-2'>
            {[
              { href: '/products?gender=women', label: 'Women' },
              { href: '/products?gender=men', label: 'Men' },
              { href: '/products?gender=kids', label: 'Kids' },
              { href: '/products', label: 'All Products' },
              { href: '/brands', label: 'Brands' },
              { href: '/categories', label: 'Categories' },
              {
                href: '/products?sale=true',
                label: 'Sale',
                accent: true,
              },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`block px-4 py-3 text-sm font-semibold uppercase tracking-wide hover:bg-secondary transition-colors ${
                  'accent' in item && item.accent
                    ? 'text-accent'
                    : ''
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
