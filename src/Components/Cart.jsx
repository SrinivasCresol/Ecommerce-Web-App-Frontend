import React from "react";
import { useSocket } from "../ContextProvider/SocketProvider";
import { makePaymentFunction } from "../Services/Apis";

export default function Cart({ products, removeFromCart }) {
  const socket = useSocket();

  const handleAction = (action) => {
    socket.emit("userAction", action); // Emit the action to the server
  };

  const calculateTotal = () => {
    const total = products.reduce((total, item) => {
      const itemTotal = item.price * item.quantity;
      return total + itemTotal;
    }, 0);
    return total;
  };

  const handlePayment = async () => {
    const userid = sessionStorage.getItem("userId");
    const username = sessionStorage.getItem("userName");
    try {
      const paymentData =
        {
          userid,
          username,
          products,
        }

      const res = await makePaymentFunction(paymentData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(res);

      if (res.data.url || res.status === 200) {
        window.open(res.data.url, "_blank");

        const notificationMessage = `${username} purchased the following items: ${products
          .map((item) => item.model)
          .join(", ")}`;
        handleAction(notificationMessage);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      <>
        {products.map((item) => (
          <div key={item._id} className="cart-item">
            <h3>{item.model}</h3>
            <p>Quantity: {item.quantity}</p>
            <p>Price: {item.price * item.quantity}/-</p>
            <button onClick={() => removeFromCart(item)}>Remove</button>
          </div>
        ))}
        <p>Total: {calculateTotal()}/-</p>
        <button onClick={handlePayment}>Place Order</button>
      </>
    </div>
  );
}
