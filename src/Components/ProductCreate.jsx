import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProductCreate() {
  const [product, setProduct] = useState({
    model: "",
    description: "",
    price: "",
    subCategoryId: "",
  });
  const [image, setImage] = useState("");

  const [subcategories, setSubcategories] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    const authToken = sessionStorage.getItem("adminToken");

    if (!authToken) {
      console.error("No authToken found.");
      return;
    }

    const headers = {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    };

    try {
      const response = await axios.post(
        "http://localhost:3333/add/products",
        product,image,
        {
          headers: headers,
        }
      );
      if (response.status === 201) {
        navigate("/admin");
      }
    } catch (error) {
      console.error("Product creation error:", error);
    }
  };

  useEffect(() => {
    fetchSubcategories();
  }, []);

  const fetchSubcategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3333/get/sub-category"
      );

      if (response.status === 200) {
        setSubcategories(response.data);
      }
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };
  console.log(subcategories)

  const handleSubcategorySelect = (e) => {
    setSelectedSubcategory(e.target.value);
    setProduct({ ...product, subCategoryId: e.target.value });
  };
  

  return (
    <div>
      <h1>Create Product</h1>
      <form onSubmit={handleCreateProduct}>
      <input
          type="file"
          name="file"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <input
          type="text"
          name="model"
          placeholder="Model"
          value={product.model}
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={product.description}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
        />
        <div>
          <label htmlFor="subCategoryId">Subcategory:</label>
          <select
            name="subCategoryId"
            id="subCategoryId"
            value={selectedSubcategory}
            onChange={handleSubcategorySelect}
          >
            <option value="">Select a subcategory</option>
            {subcategories.map((subcategory) => (
              <option key={subcategory._id} value={subcategory._id}>
                {subcategory.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Create Product</button>
      </form>
    </div>
  );
}
