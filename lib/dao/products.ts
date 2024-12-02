import { Product, ProductCategory } from '@/types/product';

const products: Product[] = [
  {
    id: '1',
    name: 'Bio-Protect Plus',
    category: ProductCategory.PHYTOSANITARY,
    price: 29.99,
    description: 'Organic pest control solution for sustainable agriculture',
    image: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=800',
    stock: 50
  },
  {
    id: '2',
    name: 'EcoShield Fungicide',
    category: ProductCategory.PHYTOSANITARY,
    price: 34.99,
    description: 'Natural fungicide for crop protection',
    image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800',
    stock: 35
  },
  {
    id: '3',
    name: 'GreenGuard Herbicide',
    category: ProductCategory.PHYTOSANITARY,
    price: 39.99,
    description: 'Selective herbicide for weed control',
    image: 'https://images.unsplash.com/photo-1615649511204-1f991873fe5b?w=800',
    stock: 40
  },
  {
    id: '4',
    name: 'NutriBoost Pro',
    category: ProductCategory.PHYTOSANITARY,
    price: 24.99,
    description: 'Advanced plant nutrition supplement',
    image: 'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?w=800',
    stock: 60
  },
  {
    id: '5',
    name: 'SoilGuard Plus',
    category: ProductCategory.PHYTOSANITARY,
    price: 44.99,
    description: 'Soil treatment and protection solution',
    image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800',
    stock: 30
  },
  {
    id: '6',
    name: 'BioDefense Max',
    category: ProductCategory.PHYTOSANITARY,
    price: 49.99,
    description: 'Complete crop protection system',
    image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800',
    stock: 25
  },
  {
    id: '7',
    name: 'Tomato Seedlings',
    category: ProductCategory.PLANTS,
    price: 12.99,
    description: 'Organic heirloom tomato seedlings',
    image: 'https://images.unsplash.com/photo-1592491438683-8f3e7a535889?w=800',
    stock: 100
  },
  {
    id: '8',
    name: 'Lavender Cuttings',
    category: ProductCategory.PLANTS,
    price: 8.99,
    description: 'Fresh lavender cuttings for propagation',
    image: 'https://images.unsplash.com/photo-1468327768560-75b778cbb551?w=800',
    stock: 75
  },
  {
    id: '9',
    name: 'Herb Garden Kit',
    category: ProductCategory.PLANTS,
    price: 29.99,
    description: 'Complete herb garden starter kit',
    image: 'https://images.unsplash.com/photo-1466195433014-30a7ea359b67?w=800',
    stock: 45
  },
  {
    id: '10',
    name: 'Rose Bush',
    category: ProductCategory.PLANTS,
    price: 19.99,
    description: 'Hardy climbing rose variety',
    image: 'https://images.unsplash.com/photo-1496062031456-07b8f162a322?w=800',
    stock: 30
  },
  {
    id: '11',
    name: 'Fruit Tree Bundle',
    category: ProductCategory.PLANTS,
    price: 89.99,
    description: 'Assorted dwarf fruit trees',
    image: 'https://images.unsplash.com/photo-1502394202744-021cfbb17454?w=800',
    stock: 15
  },
  {
    id: '12',
    name: 'Vegetable Seed Collection',
    category: ProductCategory.PLANTS,
    price: 24.99,
    description: 'Premium vegetable seed variety pack',
    image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=800',
    stock: 200
  }
];

export class ProductDAO {
  static async getAllProducts(): Promise<Product[]> {
    return products;
  }

  static async getProductById(id: string): Promise<Product | undefined> {
    return products.find(p => p.id === id);
  }

  static async getProductsByCategory(category: ProductCategory): Promise<Product[]> {
    return products.filter(p => p.category === category);
  }

  static async searchProducts(query: string): Promise<Product[]> {
    const lowercaseQuery = query.toLowerCase();
    return products.filter(p => 
      p.name.toLowerCase().includes(lowercaseQuery) || 
      p.description.toLowerCase().includes(lowercaseQuery)
    );
  }
}