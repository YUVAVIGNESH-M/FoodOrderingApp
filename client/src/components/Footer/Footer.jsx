import React from "react";
import { CgPhone } from "react-icons/cg";
import { ImAddressBook } from "react-icons/im";
import './Footer.css'
const Footer = () => {
  return (
    <div className="footer-container">
      <h1>Sivamalai Catering</h1>
      <div className="details">
        <div className="phone-details">
          <CgPhone />
          <span>9659223637</span>
        </div>
        <div className="place-details">
          <ImAddressBook />
          <span>Kangayam</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
