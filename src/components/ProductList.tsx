import React, { useEffect, useState } from "react";
import { Product } from "../models/product.model";

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    const response = await fetch("https://localhost:7218/api/Products");
    const data = (await response.json()) as Product[];
    setProducts(data);
  }

  function loaded() {
    return products.map((element, index) => {
      return <h1 key={index}>{element.name}</h1>;
    });
  }

  return (
    <>
      {products.length != 0 ? (
        loaded()
      ) : (
        <h1 className="loading-placeholder">Loading...</h1>
      )}
    </>
  );
}
