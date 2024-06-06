import React, { useEffect } from "react";
import { Hero, ProductElement, Stats } from "../components";
import { useLoaderData, useNavigate } from "react-router-dom";
import axios from "axios";
import ClothingProducts from "../components/categories";

export const landingLoader = async () => {
  const response = await axios(
    `http://localhost:8080/products?_page=1&_limit=8`
  );
  const data = response.data;

  return { products: data };
};

const Landing = () => {
  const { products } = useLoaderData();
  const navigate = useNavigate();

  return (
    <main>
      <Hero />
      {/* <Stats /> */}
      <ClothingProducts/>

      <div className="selected-products">
        <h2 className="text-6xl text-center my-12 max-md:text-4xl text-accent-content">
          Trending Products
        </h2>
        <div className="flex overflow-x-auto p-4 space-x-4 max-w-7xl mx-auto no-scrollbar">
          {products.map((product) => (
            <div key={product.id} className="shrink-0 w-64">
              <ProductElement
                id={product.id}
                title={product.name}
                image={product.imageUrl}
                rating={product.rating}
                price={product.price.current.value}
                className="flex-none"
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Landing;
