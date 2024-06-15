import React from "react";
import './FoodCard.css'
import { useNavigate } from "react-router-dom";
const FoodCard = ({ food}) => {
 
    const navigate=useNavigate()
  return (
  <div className="foodCard-container" onClick={()=>{
    navigate(`/${food._id}`)
  }}>
       <img className="foodlist-img" src={food.img.url} alt={food.name} />
       <h3>{food.name}</h3>
       <span>Price : {food.price}</span>
  </div>
  )
};

export default FoodCard;
