import { Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import AdminHome from "./Components/AdminHome";
import Register from "./Components/Register";
import UserHome from "./Components/UserHome";
import ProductCreate from "./Components/ProductCreate";
import ProductUpdate from "./Components/ProductUpdate";
import SuperAdmin from "./Components/SuperAdmin";
import Cart from "./Components/Cart";
import Success from "./Components/Success";
import Failure from "./Components/Failure";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/super-admin" element={<SuperAdmin />} />
        <Route path="/admin" element={<AdminHome />}>
          <Route path="product/create" element={<ProductCreate />} />
          <Route path="product/update" element={<ProductUpdate />} />
        </Route>
        <Route path="/user" element={<UserHome />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Failure />} />
      </Routes>
    </>
  );
}

export default App;
