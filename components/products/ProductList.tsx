"use client";

import { useState } from 'react';
import { ProductCard } from '@/components/products/ProductCard';
import { ProductFilter } from '@/components/products/ProductFilter';
import { Product, ProductCategory } from '@/types/product';

interface ProductListProps {
  initialProducts: Product[];
}

export function ProductList({ initialProducts }: ProductListProps) {
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);

  const handleFilterChange = (filters: {
    search: string;
    category: ProductCategory | 'ALL';
    minPrice: number;
    maxPrice: number;
  }) => {
    const filtered = initialProducts.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        product.description.toLowerCase().includes(filters.search.toLowerCase());
      const matchesCategory = filters.category === 'ALL' || product.category === filters.category;
      const matchesPrice = product.price >= filters.minPrice && product.price <= filters.maxPrice;
      return matchesSearch && matchesCategory && matchesPrice;
    });
    setFilteredProducts(filtered);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <aside className="lg:col-span-1">
        <ProductFilter onFilterChange={handleFilterChange} />
      </aside>
      <div className="lg:col-span-3">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}