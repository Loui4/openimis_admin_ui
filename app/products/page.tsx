import { ProductList } from "./components/productsList";
import { getProducts } from "@/services/product";

export default async function Page() {
  const products = await getProducts();
  return (
    <>
      <h2>Products</h2>
      <ProductList products={products} />
    </>
  );
}
