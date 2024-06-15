import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useTotal from "../../hooks/useTotal";
import axios from "axios";
import "./Cart.css";
const Cart = () => {
  const [cartList, setCartList] = useState([]);
  const cart = useSelector((state) => state.cart);
  const total = useTotal(cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
 
  console.log(cart);
  useEffect(() => {
   
    setCartList(cart);
  }, []);
  
  const handleCheckOut = async () => {
    dispatch({ type: "REMOVE_ALLPRODUCT" });
    const authuser=JSON.parse(sessionStorage.getItem('authuser'))
    const order = {
      user_id:authuser._id,
      totalprice: total,
      orders: [],
      status:'preparing',
      userName:authuser.username
    };
    console.log(cartList)
    for (let x of cartList) {
      console.log(x)
      order.orders.push(x);
    }
    setCartList([]);
    console.log('finished')
    console.log(order);
    const newOrder = await axios.post(
      "http://localhost:5000/api/orders",
      order
    );
    navigate(`/orders?isAdmin=${authuser.admin}`);
  
  };
  return (
    <div className="cart-container">
      <div className="cartleft-container">
        <table className="cart-table">
          <tr>
            <th>Product</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
          {cartList.map((item) => {
            return (
              <tr>
                <td>
                  <img src={item.img} alt={item.name} />
                </td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.quantity}</td>
                <td>{item.total}</td>
              </tr>
            );
          })}
        </table>
      </div>
      <div className="cartright-container">
        <h2>Cart Total</h2>
        <span>
          <b>Subtotal :</b>
          {total} .00
        </span>
        <span>
          <b>Discount :</b> 0.00
        </span>
        <span>
          <b>Total :</b>
          {total}.00
        </span>
        <button onClick={handleCheckOut}>Check Out</button>
      </div>
    </div>
  );
};

export default Cart;
