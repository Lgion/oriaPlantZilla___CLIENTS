"use client";

import { useState } from 'react';
import { ProductCategory } from '@/types/product';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';

interface ProductFilterProps {
  onFilterChange: (filters: {
    search: string;
    category: ProductCategory | 'ALL';
    minPrice: number;
    maxPrice: number;
  }) => void;
}

export function ProductFilter({ onFilterChange }: ProductFilterProps) {
  const [filters, setFilters] = useState({
    search: '',
    category: 'ALL' as ProductCategory | 'ALL',
    minPrice: 0,
    maxPrice: 1000,
  });

  const handleChange = (key: string, value: string | number) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="space-y-6 p-4 bg-card rounded-lg">
      <div className="space-y-2">
        <Label htmlFor="search">Search Products</Label>
        <Input
          id="search"
          placeholder="Search..."
          value={filters.search}
          onChange={(e) => handleChange('search', e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label>Category</Label>
        <RadioGroup
          value={filters.category}
          onValueChange={(value) => handleChange('category', value)}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="ALL" id="all" />
            <Label htmlFor="all">All Products</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value={ProductCategory.PHYTOSANITARY} id="phytosanitary" />
            <Label htmlFor="phytosanitary">Phytosanitary Products</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value={ProductCategory.PLANTS} id="plants" />
            <Label htmlFor="plants">Plants & Seeds</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label>Price Range</Label>
        <div className="pt-2">
          <Slider
            defaultValue={[filters.minPrice, filters.maxPrice]}
            max={1000}
            step={10}
            onValueChange={(value) => {
              handleChange('minPrice', value[0]);
              handleChange('maxPrice', value[1]);
            }}
          />
          <div className="flex justify-between mt-2 text-sm text-muted-foreground">
            <span>${filters.minPrice}</span>
            <span>${filters.maxPrice}</span>
          </div>
        </div>
      </div>
    </div>
  );
}