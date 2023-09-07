import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProductsFunction } from "../Services/Apis";
import { BASE_URL } from "../Services/Helper";
import socketIOClient from "socket.io-client";

const socket = socketIOClient("http://localhost:4000");

export default function UserHome() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const handleAction = (action) => {
    socket.emit("userAction", action); // Emit the action to the server
  };

  const logoutUser = async () => {
    sessionStorage.removeItem("userToken");
    navigate("/");
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProductsFunction();
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
  }, [handleAction]);

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
              <img
                src={`${BASE_URL}/uploads/${product.imageUrl}`}
                alt={product.subCategory.Brand}
              />
              <p>{product.model}</p>
              <p>{product.description}</p>
              <p>{product.price}</p>
              <button
                onClick={() =>
                  handleAction(
                    `User Purchased this ${product.model} successful`
                  )
                }
              >
                Book Now
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
