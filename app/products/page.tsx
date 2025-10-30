import { ProductList } from "./components/productsList";
import { getProducts } from "@/services/product";

export default async function Page() {
   const products = await getProducts();
  return <ProductList products={products} />
} 