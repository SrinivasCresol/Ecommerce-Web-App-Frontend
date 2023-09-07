import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProductsFunction } from "../Services/Apis";
import socketIOClient from "socket.io-client";

const socket = socketIOClient(
  "https://react-io-socket-notifications.onrender.com"
);

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
  console.log(products);
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
                src={product.imageUrl}
                alt={product.subCategory.Brand}
                style={{ height: "150px" }}
              />
              <p>{product.model}</p>
              <p>{product.description}</p>
              <p>{product.price}</p>
              <button
                onClick={() =>
                  handleAction(`User Purchased ${product.model} successful`)
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
