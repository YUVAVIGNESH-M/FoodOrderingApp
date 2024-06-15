import  {useState} from "react";

const useTotal = (cart) => {
     let total=0;
     const res=cart.forEach(item => {
         total=total+item.total
     })
     return total;
};

export default useTotal;
