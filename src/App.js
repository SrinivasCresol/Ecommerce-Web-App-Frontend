import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import AdminHome from "./Pages/AdminHome";
import Register from "./Pages/Register";
import UserHome from "./Pages/UserHome";
import ProductCreate from "./Pages/ProductCreate";
import ProductUpdate from "./Pages/ProductUpdate";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<AdminHome />}>
          <Route path="product/create" element={<ProductCreate />} />
          <Route path="product/update" element={<ProductUpdate />} />
        </Route>
        <Route path="/user" element={<UserHome />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
