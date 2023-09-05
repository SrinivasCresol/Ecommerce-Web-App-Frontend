import { Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import AdminHome from "./Components/AdminHome";
import Register from "./Components/Register";
import UserHome from "./Components/UserHome";
import ProductCreate from "./Components/ProductCreate";
import ProductUpdate from "./Components/ProductUpdate";

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
