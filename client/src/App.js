import React,{useState}from 'react';
import {Routes,Route} from 'react-router-dom';
import Header from './components/header/header.jsx';
import Home from './components/home/Home.jsx';
import Auth from './components/auth/Auth.jsx';
import Layout from './components/Layout/Layout.jsx';
import Cart from './components/Cart/Cart.jsx';
import FoodDetails from './components/FoodDetails/FoodDetails.jsx';
import AddProduct from './components/AddProduct/AddProduct.jsx';
import Orders from './components/Orders/Orders.jsx';
function App() {
  const authUser=sessionStorage.getItem('authuser')
  console.log(authUser)
  return (
    <div className="App">
      
        <Routes>
          <Route element={<Layout />}>
             <Route path='/home' element={authUser?<Home />:<Auth />}/>
             <Route path='/auth' element={!authUser?<Auth />:<Auth />}/>
             <Route path='/cart' element={authUser?<Cart />:<Auth />}/>
             <Route path='*' element={authUser?<Home />:<Auth />}/>
             <Route path="/:id" element={authUser?<FoodDetails />:<Auth />}/>
             <Route path="/addproducts" element={authUser && <AddProduct />}/>
             <Route path="/orders" element={authUser?<Orders />:<Auth />}/>
          </Route>
        </Routes>
      
    </div>
  );
}

export default App;
