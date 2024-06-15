import React, { useState } from "react";
import axios from "axios";
import './AddProduct.css'
const AddProduct = () => {
  const [Product, setProduct] = useState({
    name: "",
    price: "",
    desc: "",
    img: "",
  });
  const handleChange = async (e) => {
    setProduct((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setProduct((prev) => {
        console.log(reader.result);
        return {
          ...prev,
          [e.target.name]: reader.result,
        };
      });
    };
  };
  const handleSubmit = async () => {
    console.log(Product);
    const data = await axios.post(
      "http://localhost:5000/api/product/new",
      Product
    );
    console.log(data);
  };
  return (
    <div className="addproduct-container">
      <div className="addproduct-wrapper">
        <form onSubmit={handleSubmit}>
        <label>name</label>
        <input type="text" name="name" onChange={handleChange} />
        <label>price</label>
        <input type="text" name="price" onChange={handleChange} />
        <label>desc</label>
        <input type="text" name="desc" onChange={handleChange} />
        <label>img</label>
        <input type="file" name="img" onChange={handleImageChange} />
        <button type="submit">Save</button>
        </form>
        
      </div>
    </div>
  );
};

export default AddProduct;
