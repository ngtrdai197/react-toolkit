import { RootState } from "@/store";
import { useAppSelector } from "@/store/hooks";
import {
  useAddProductMutation,
  useGetProductsQuery,
} from "@services/product.service";
import React, { FC, useEffect, useRef } from "react";
import { IProduct } from "./product.interface";

const ProductList: FC = () => {
  const [product, setProduct] = React.useState<IProduct>();
  const productInputRef = useRef({} as HTMLInputElement);

  const products = useAppSelector((state: RootState) => state.product.products);
  const { error, isLoading } = useGetProductsQuery();
  const [addProduct, { isSuccess }] = useAddProductMutation();

  const handleProductChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({
      id: products.length + 1,
      name: e.target.value,
    });
  };

  const handleResetInput = () => {
    if (!productInputRef.current) return;

    productInputRef.current.focus();
    productInputRef.current.value = "";
  };

  useEffect(() => {
    if (!isSuccess) return;

    setProduct(undefined);
    handleResetInput();
  }, [isSuccess]);

  const handleAddProduct = () => {
    if (!product) return;

    addProduct(product);
  };

  const displayProducts = () => {
    if (error) {
      return "Error";
    }
    if (isLoading) {
      return "Loading";
    }
    return (products || []).map((product) => (
      <div key={product.id}>{product.name}</div>
    ));
  };

  return (
    <>
      <input
        type="text"
        name="product"
        onChange={handleProductChange}
        ref={productInputRef}
      />

      <button onClick={handleAddProduct}>Add Product</button>
      <hr />

      <div>{displayProducts()}</div>
    </>
  );
};

export default ProductList;
