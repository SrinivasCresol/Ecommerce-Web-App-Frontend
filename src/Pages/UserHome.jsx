import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserHome() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const logoutUser = async () => {
    sessionStorage.removeItem("userToken");
    navigate("/");
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3333/get/products");

        if (response.status === 200) {
          setProducts(response.data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const token = sessionStorage.getItem("userToken");

    if (token) {
      navigate("/user");
    } else {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <div>
        <h1>Hello From User Page</h1>
        <button onClick={logoutUser}>Logout</button>
      </div>
      <div>
        <h1>Product List</h1>
        <ul>
          {products.map((product) => (
            <li key={product._id}>
              <img src={product.imageUrl} alt={product.subCategory.Brand} />
              <p>{product.model}</p>
              <p>{product.description}</p>
              <p>{product.price}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
