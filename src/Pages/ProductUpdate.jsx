import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ProductUpdate() {
  const [product, setProduct] = useState({
    model: "",
    description: "",
    price: "",
    subCategoryId: "",
  });

  const [subcategories, setSubcategories] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState("");

  const productId = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3333/get/product/${productId}`
        );
        if (response.status === 200) {
          const fetchedProduct = response.data;
          setProduct({
            model: fetchedProduct.model,
            description: fetchedProduct.description,
            price: fetchedProduct.price,
            subCategoryId: fetchedProduct.subCategory._id,
          });
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
    fetchSubcategories();
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const fetchSubcategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3333/get/subcategories"
      );

      if (response.status === 200) {
        setSubcategories(response.data);
      }
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:3333/update/product/${productId}`,
        product
      );
      if (response.status === 200) {
        navigate("/admin");
      }
    } catch (error) {
      console.error("Product update error:", error);
    }
  };

  const handleSubcategorySelect = (e) => {
    setSelectedSubcategory(e.target.value);
    setProduct({ ...product, subCategoryId: e.target.value });
  };

  return (
    <div>
      <h1>Update Product</h1>
      <form onSubmit={handleUpdateProduct}>
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
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
}
