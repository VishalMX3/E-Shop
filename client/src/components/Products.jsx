import styled from "styled-components";
import { popularProducts } from "../data";
import Product from "./Product";
import { useEffect, useState } from "react";
import axios from "axios";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const LoadingMessage = styled.p`
  height: 20vh;
  width: 100vw;
  background-color: #e1dede;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
`;

const Products = ({ cat, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat ? `${BASE_URL}/products?category=${cat}` : `${BASE_URL}/products`
        );
        setProducts(res.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, [cat]);

  useEffect(() => {
    cat &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
    console.log(filteredProducts);
  }, [products, cat, filters]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
    console.log(filteredProducts);
  }, [sort]);

  return (
    <Container>
      {loading ? ( // Show loading message if products are still loading
        <LoadingMessage>
          Fetching products from database... Please wait
        </LoadingMessage>
      ) : // Render products when they are loaded
      cat ? (
        filteredProducts.map((item) => <Product item={item} key={item._id} />)
      ) : (
        products
          .slice(0, 5)
          .map((item) => <Product item={item} key={item._id} />)
      )}
    </Container>
  );
};

export default Products;
