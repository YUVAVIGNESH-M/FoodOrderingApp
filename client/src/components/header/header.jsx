import React from "react";
import { AiFillHome } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import "./header.css";

import { NavLink } from "react-router-dom";
const Header = () => {
  const navigate=useNavigate()
  let isAdmin=JSON.parse(sessionStorage.getItem('authuser'))?.admin==="true"?"true":"false"
  let url=`/orders?isAdmin=${isAdmin}`
  return (
    <div className="header-container">
      <div className="header-wrapper">
        <h1 className="main-title">Sivamalai Mess Catering</h1>
        <AiFillHome
          style={{
            cursor: "pointer",
            fontSize:"30px"
          }}
          onClick={()=>{navigate('./home')}}
        />
        <NavLink to="/auth?type=login">Login</NavLink>
        <NavLink to="/auth?type=signup">SignUp</NavLink>
        <NavLink onClick={() => sessionStorage.clear()} to="/auth?type=login">
          Logout
        </NavLink>
        <NavLink to={url}>Orders</NavLink>
      </div>
    </div>
  );
};

export default Header;
