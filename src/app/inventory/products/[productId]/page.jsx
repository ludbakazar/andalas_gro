"use client";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function DetailProductPage() {
  const params = useParams();
  const { productId } = params;

  const fetchProduct = async () => {
    try {
      const response = await fetch(
        `/api/inventory/products/details?productId=${productId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);
  return <div>DetailProductPage</div>;
}
