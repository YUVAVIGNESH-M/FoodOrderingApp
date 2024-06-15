import React, { useState, useEffect } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import "./Pagination.css";

const Pagination = ({ productCount, itemsPerPage,setcurrPage}) => {
  const [totalPage, settotalPage] = useState();
  const [buttons, setbuttons] = useState([]);

  useEffect(() => {
    if(productCount/itemsPerPage>=3){
      setbuttons([1,2,3])
    }
    else{
     for(let i=1;i<=productCount/itemsPerPage;++i){
      setbuttons(prev=>[...prev,i])
     }
    }
    settotalPage(productCount/itemsPerPage)
   }, [productCount])
  
  const handleClick=(direction)=>{
    console.log(direction)
      if(direction==='left' && buttons[0]!==1){
        setcurrPage(prev=>prev-1)
        setbuttons((prev) => {
          const shifted = prev[0] - 1;
          const newButtons = [shifted, shifted + 1, shifted + 2];
          return newButtons;
        });
      }
      else if(direction==='right' && buttons[2]!==totalPage-1){
        setcurrPage(prev=>prev+1)
        setbuttons((prev) => {
          const shifted = prev[0] + 1;
          const newButtons = [shifted, shifted + 1, shifted + 2];
          return newButtons;
        });
      }
  }

  const handlePageClick=(page)=>{
    setcurrPage(page)
    console.log(page)
  }
  return (
    <div className="page-container">
      <div className="page-wrapper">
        <button className="left-button">
          <BsChevronLeft onClick={()=>handleClick('left')}/>
        </button>
        {buttons.map((button) => {
          return (
            <button key={button} className="buttons" onClick={()=>handlePageClick(button)}>
              {button}
            </button>
          );
        })}
        ...
        <button className="right-button">{totalPage}</button>
        <button>
          <BsChevronRight onClick={()=>handleClick('right')}/>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
