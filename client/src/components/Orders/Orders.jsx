import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./Orders.css";
const Order = () => {
  const [orders, setOrders] = useState([]);
  const authuser = JSON.parse(sessionStorage.getItem("authuser"));
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const isAdmin = queryParams.get("isAdmin");
  useEffect(() => {
    const getorders = async () => {
      const orderarray = [];
      let orderlist = {};
      if (isAdmin === "false") {
        console.log("only user orders");
        orderlist = await axios.get(
          `http://localhost:5000/api/orders/${authuser._id}`
        );
        console.log(orderlist);
      } else {
        console.log("alll orders");
        orderlist = await axios.get(`http://localhost:5000/api/orders`);
        console.log(orderlist);
      }
      console.log(orderlist.data)
      setOrders(orderlist.data);
    };
    getorders();
  }, []);

  const handleStatusClick=async(orderId,status)=>{
       try {
        const updatedOrder=await axios.post(`http://localhost:5000/api/orders/updateorder/${orderId}?status=${status}`)
        console.log(updatedOrder)
        setOrders(prev=>prev.map(order=>order._id===updatedOrder.data._id?updatedOrder.data:order))
       } catch (error) {
          console.log(error)
       }
      
  }
  
  const handleRemove=async(id)=>{
        try {
          const response=await axios.delete(`http://localhost:5000/api/orders/${id}`)
          console.log(response)
          setOrders(prev=>prev.filter(order=>order._id!==id))
        } catch (error) {
          console.log(error)
        }
  }
  
  return (
    <div className="ordertable-container">
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>OrderId</th>
            <th>Date</th>
            {isAdmin === "true" && <th>Customer</th>}
            <th>ProductName</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Status</th>
            {isAdmin==='true' && <th>StatusUpdate</th>}
          </tr>
        </thead>
        <tbody>
          {orders.map((item,index1) => {
            // console.log(item);
            return item.orders.map((order, index) => {
              let image = "";
              if (item.status === "preparing") image = "images/prepare.png";
              else image = "images/fast-delivery.png";
              return (
                <tr key={index}>
                  <td>
                    <img src={order.img} alt="" />
                  </td>
                  <td>{index1}</td>
                  <td>{item.createdAt.slice(0, 10)}</td>
                  {isAdmin==='true' && <td>{item.userName}</td>}
                  <td>{order.name}</td>
                  <td>{order.quantity}</td>
                  <td>{order.total}</td>
                  <td>
                    <img src={image} alt="preparing" />
                  </td>
                  {isAdmin==='true' && <td><button onClick={()=>handleStatusClick(item._id,item.status)}>Next</button></td>}
                  {isAdmin==='true' && <td><button onClick={()=>handleRemove(item._id)}>Remove</button></td>}
                </tr>
              );
            });
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Order;
