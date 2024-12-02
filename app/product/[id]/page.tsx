import { ProductDAO } from '@/lib/dao/products';
import { ProductDetails } from '@/components/products/ProductDetails';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const products = await ProductDAO.getAllProducts();
  return products.map((product) => ({
    id: product.id,
  }));
}

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await ProductDAO.getProductById(params.id);

  if (!product) {
    notFound();
  }

  return <ProductDetails product={product} />;
}