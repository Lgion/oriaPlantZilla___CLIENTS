import { ProductList } from '@/components/products/ProductList';
import { ProductDAO } from '@/lib/dao/products';

export default async function Home() {
  const products = await ProductDAO.getAllProducts();
  return <ProductList initialProducts={products} />;
}