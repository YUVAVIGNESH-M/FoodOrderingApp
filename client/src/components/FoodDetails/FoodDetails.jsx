import React, { useState, useEffect } from "react";
import { foodlist } from "../../data";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import "./FoodDetails.css";
const FoodDetails = () => {
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState({});
  const [cartData, setCartData] = useState({
    product_id: "",
    name: "",
    price: "",
    quantity: 1,
    total: "",
    img: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const getproduct = async () => {
      const product = await axios.get(
        `http://localhost:5000/api/product/${id}`
      );

      setProductDetails(product.data);
      setCartData((prev) => {
        return {
          ...prev,
          product_id: product.data._id,
          name: product.data.name,
          price: product.data.price,
          total: 1 * product.data.price,
          img: product.data.img.url,
          createdAt:product.data.createdAt
        };
      });
    };
    getproduct();
  }, []);

  let handleChange = (e) => {
    setCartData((prev) => {
      return {
        ...prev,
        quantity: e.target.value,
        total: e.target.value * prev.price,
      };
    });
  };

  const hanleAddToCart = () => {
    console.log(cartData);
    dispatch({ type: "ADD_PRODUCT", payload: cartData });
    navigate("/cart");
  };
  return (
    <div className="fooddetails-container">
      <div className="left-container">
        <img src={productDetails.img?.url} alt={productDetails.name} />
      </div>
      <div className="right-container">
        <h2>Rs.{productDetails.price}</h2>
        <p>Delicious idlis in home</p>
        <label htmlFor="quantity">Select Quantity</label>
        <select
          name="quantity"
          className="quantity-selector"
          defaultValue="1"
          onChange={handleChange}
        >
          <option value="1" selected>
            1
          </option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
        </select>
        <button onClick={hanleAddToCart}>Add to Cart</button>
      </div>
    </div>
  );
};

export default FoodDetails;
